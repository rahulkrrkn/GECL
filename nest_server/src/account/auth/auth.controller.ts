import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterStudentDto } from './dto/registerStudent.dto';
import { RegisterFacultyDto } from './dto/registerFaculty.dto';
import { RegisterSendOtpDto } from './dto/registerSendOtp.dto';
import { RegisterVerifyOtpDto } from './dto/registerVerifyOtp.dto';

import { EmailUtil } from 'src/common/utils/email.util';
import { ApiResponse } from 'src/common/response/api-response';
import { ApiErrorCode } from 'src/common/response/api-error-codes';

// Upload
import { UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from 'src/common/pipes/file-validation.pipe';
import { SeoUploadService } from 'src/common/uploads/documentUpload.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* ==========================================================
     ✅ SEND OTP
  ========================================================== */
  @Post('registration/send-otp')
  async sendOtp(@Body() dto: RegisterSendOtpDto) {
    const cleanEmail = EmailUtil.normalize(dto.email);
    if (!cleanEmail) {
      throw new BadRequestException('Invalid email address');
    }

    await this.authService.sendOtp(cleanEmail);

    return ApiResponse.success('OTP sent successfully');
  }

  /* ==========================================================
     ✅ VERIFY OTP
  ========================================================== */
  @Post('registration/verify-otp')
  async verifyOtp(@Body() dto: RegisterVerifyOtpDto) {
    const cleanEmail = EmailUtil.normalize(dto.email);
    if (!cleanEmail) {
      throw new BadRequestException('Invalid email address');
    }

    const registrationKey = await this.authService.verifyOtp(
      cleanEmail,
      dto.otp,
    );

    return ApiResponse.success('OTP verified successfully', {
      REGISTRATION_KEY: registrationKey,
    });
  }

  /* ==========================================================
     ✅ REGISTER STUDENT (FINAL)
  ========================================================== */
  @Post('registration/student')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'profilePhoto', maxCount: 1 }]),
  )
  async registerStudent(
    @UploadedFiles(
      new FileValidationPipe([
        {
          name: 'profilePhoto',
          minCount: 1,
          maxCount: 1,
          size: 5 * 1024 * 1024,
          type: ['IMAGE'],
        },
      ]),
    )
    files: { profilePhoto?: Express.Multer.File[] },

    @Body()
    dto: RegisterStudentDto,
  ) {
    /* 1️⃣ Normalize Email */
    const cleanEmail = EmailUtil.normalize(dto.email);
    if (!cleanEmail) {
      throw new BadRequestException({
        message: 'Invalid email address',
        code: ApiErrorCode.INVALID_EMAIL,
      });
    }
    dto.email = cleanEmail;

    /* 2️⃣ Verify Registration Key (throws on failure) */
    await this.authService.verifyRegistrationKey(
      cleanEmail,
      dto.REGISTRATION_KEY,
    );

    /* 3️⃣ Upload Profile Photo */
    const uploaded = await SeoUploadService.upload(files, {
      profilePhoto: [dto.fullName, 400, 80],
    });

    const profilePicUrl = uploaded.profilePhoto?.[0]?.url ?? null;
    if (!profilePicUrl) {
      throw new InternalServerErrorException({
        message: 'Profile photo upload failed',
        code: ApiErrorCode.INTERNAL_ERROR,
      });
    }

    /* 4️⃣ Full Registration (transaction-safe) */
    await this.authService.registerStudentFull(dto, profilePicUrl);

    /* 5️⃣ Cleanup */
    await this.authService.deleteRegistrationKey(cleanEmail);

    return ApiResponse.success('Student registered successfully');
  }

  /* ==========================================================
     ✅ REGISTER FACULTY (FINAL)
  ========================================================== */
  @Post('registration/employee')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'profilePhoto', maxCount: 1 }]),
  )
  async registerFaculty(
    @UploadedFiles(
      new FileValidationPipe([
        {
          name: 'profilePhoto',
          minCount: 1,
          maxCount: 1,
          size: 5 * 1024 * 1024,
          type: ['IMAGE'],
        },
      ]),
    )
    files: { profilePhoto?: Express.Multer.File[] },

    @Body()
    dto: RegisterFacultyDto,
  ) {
    /* 1️⃣ Normalize Email */
    const cleanEmail = EmailUtil.normalize(dto.email);
    if (!cleanEmail) {
      throw new BadRequestException({
        message: 'Invalid email address',
        code: ApiErrorCode.INVALID_EMAIL,
      });
    }
    dto.email = cleanEmail;

    /* 2️⃣ Verify Registration Key */
    await this.authService.verifyRegistrationKey(
      cleanEmail,
      dto.REGISTRATION_KEY,
    );

    /* 3️⃣ Upload Profile Photo */
    const uploaded = await SeoUploadService.upload(files, {
      profilePhoto: [dto.fullName, 400, 80],
    });

    const profilePicUrl = uploaded.profilePhoto?.[0]?.url ?? null;
    if (!profilePicUrl) {
      throw new InternalServerErrorException({
        message: 'Profile photo upload failed',
        code: ApiErrorCode.INTERNAL_ERROR,
      });
    }

    /* 4️⃣ Full Registration (transaction-safe) */
    await this.authService.registerFacultyFull(dto, profilePicUrl);

    /* 5️⃣ Cleanup */
    await this.authService.deleteRegistrationKey(cleanEmail);

    return ApiResponse.success('Faculty registered successfully');
  }
}

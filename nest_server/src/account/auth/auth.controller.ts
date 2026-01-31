import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterStudentDto } from './dto/registerStudent.dto';
import { EmailUtil } from 'src/common/utils/email.util';

// Uplode image
import { UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from 'src/common/pipes/file-validation.pipe';
import { SeoUploadService } from 'src/common/uploads/documentUpload.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('test')
  async test() {
    const start = performance.now();

    const result = await this.authService.test();

    const end = performance.now();

    return {
      result,
      timeTaken: end - start,
    };
  }

  // @Post('upload')
  // @UseInterceptors(
  //   FileFieldsInterceptor([
  //     { name: 'profile_photo', maxCount: 1 },
  //     { name: 'document', maxCount: 10 },
  //   ]),
  // )
  // async uploadData(
  //   // 1. CAPTURE FILES (Validated by Pipe)
  //   @UploadedFiles(
  //     new FileValidationPipe([
  //       {
  //         name: 'profile_photo',
  //         minCount: 1,
  //         maxCount: 1,
  //         size: 2 * 1024 * 1024,
  //         type: ['IMAGE'],
  //       },
  //       {
  //         name: 'document',
  //         minCount: 0,
  //         maxCount: 10,
  //         size: 5 * 1024 * 1024,
  //         type: ['IMAGE', 'DOCUMENT'],
  //       },
  //     ]),
  //   )
  //   files: {
  //     profile_photo?: Express.Multer.File[];
  //     document?: Express.Multer.File[];
  //   },

  //   // 2. CAPTURE EXTRA DATA (Text fields from the form)
  //   @Body() extraData: any,
  // ) {
  //   const fileNames = extraData.fileNames
  //     ? JSON.parse(extraData.fileNames)
  //     : {};

  //   const uploaded = await SeoUploadService.upload(files, fileNames);

  //   return { uploaded };
  //   // --- LOGGING LOGIC ---

  //   console.log('--- UPLOAD SUCCESSFUL ---');

  //   // A. Log File Details (Clean output)
  //   const fileSummary = {};
  //   Object.keys(files).forEach((key) => {
  //     fileSummary[key] = files[key].map((f) => ({
  //       originalName: f.originalname,
  //       size: `${(f.size / 1024).toFixed(2)} KB`,
  //       mimeType: f.mimetype,
  //     }));
  //   });
  //   console.table(fileSummary); // Uses a nice table format in console

  //   // B. Log Extra Data (Text fields)
  //   if (Object.keys(extraData).length > 0) {
  //     console.log('--- EXTRA DATA RECEIVED (BODY) ---');
  //     console.log(extraData);
  //   } else {
  //     console.log('--- NO EXTRA TEXT DATA ---');
  //   }

  //   return {
  //     message: 'Success',
  //     dataReceived: {
  //       files: Object.keys(files), // Just return field names
  //       extra: extraData,
  //     },
  //   };
  // }

  /* ==========================================================
  ✅ Register Student 
  ==========================================================*/

  @Post('register-student')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'profile_photo', maxCount: 1 }]),
  )
  async registerStudent(
    // Check Profile Photo
    @UploadedFiles(
      new FileValidationPipe([
        {
          name: 'profile_photo',
          minCount: 1,
          maxCount: 1,
          size: 5 * 1024 * 1024,
          type: ['IMAGE'],
        },
      ]),
    )
    files: {
      profile_photo?: Express.Multer.File[];
      document?: Express.Multer.File[];
    },
    // Body
    @Body()
    registerStudentDto: RegisterStudentDto,
  ) {
    // Normalize email
    registerStudentDto.email = registerStudentDto.email.toLowerCase();
    const cleanEmail = EmailUtil.normalize(registerStudentDto.email);
    if (!cleanEmail) throw new Error('Invalid email');
    registerStudentDto.email = cleanEmail;
    // Check if email, mobile or reg no already exists
    const checkedUserData =
      await this.authService.checkEmailMobileRegNo(registerStudentDto);
    if (checkedUserData) {
      throw new Error('Email, Mobile or Reg No already exists');
    }
    // Upload Images
    const uploaded = await SeoUploadService.upload(files, {
      profile_photo: ['Name', 400, 80],
    });
    console.log('uploaded', uploaded);

    // Register Students
    const registeredStudent =
      await this.authService.registerUserStudent(registerStudentDto);
    if (!registeredStudent.id) {
      throw new Error('Error registering student');
    }
    const finalRegisteredStudent = await this.authService.registerStudent(
      registerStudentDto,
      registeredStudent.id,
    );
    // user

    return finalRegisteredStudent;
  }
  /*
  
  // 1. get data 
  // 2. validate data 
  3. check image
  // 4. normalize email
  4. check email, reg no, phone no
  5. hash password
  6. create user
  7. create student/
  */
}

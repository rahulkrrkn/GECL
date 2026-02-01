import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { randomInt } from 'crypto';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { RedisService } from 'src/common/redis/redis.service';
import { NotificationProducer } from 'src/jobs/producers/notification.producer';
import { StudentRegNo } from 'src/common/helpers/students/studentRegNoBreak.helper';
import { safeJsonParse } from 'src/common/helpers/safeJsonParse.helper';

import { RegisterStudentDto } from './dto/registerStudent.dto';
import { RegisterFacultyDto } from './dto/registerFaculty.dto';

/* =====================
   🔒 Types
===================== */

interface OtpPayload {
  otpHash: string;
  attempts: number;
  maxAttempts: number;
}

interface RegistrationPayload {
  REG_KEY: string;
  attempt: number;
  maxAttempt: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly notificationProducer: NotificationProducer,
  ) {}

  /* ==========================================================
     ✅ SEND OTP
  ========================================================== */
  async sendOtp(email: string): Promise<boolean> {
    const redisKey = `GECL:VERIFY_REGISTRATION:${email}`;

    if (await this.redis.get(redisKey)) {
      throw new BadRequestException(
        'OTP already sent. Please wait before requesting again.',
      );
    }

    const otp = randomInt(100000, 999999).toString();
    const otpHash = await bcrypt.hash(otp, 10);

    const payload: OtpPayload = {
      otpHash,
      attempts: 0,
      maxAttempts: 3,
    };

    await this.redis.set(redisKey, JSON.stringify(payload), 15 * 60);

    await this.notificationProducer.sendRtqJob('email', {
      to: email,
      subject: 'GEC Lakhisarai Registration OTP',
      template: 'studentRegisterOtpEmail',
      context: {
        otp,
        expiryTime: 15,
        currentYear: new Date().getFullYear(),
      },
    });

    return true;
  }

  /* ==========================================================
     ✅ VERIFY OTP
  ========================================================== */
  async verifyOtp(email: string, inputOtp: string): Promise<string> {
    const redisKey = `GECL:VERIFY_REGISTRATION:${email}`;
    const storedData = await this.redis.get(redisKey);

    if (!storedData) {
      throw new BadRequestException('OTP expired or invalid');
    }

    const payload = safeJsonParse<OtpPayload>(storedData);

    if (payload.attempts >= payload.maxAttempts) {
      await this.redis.del(redisKey);
      throw new BadRequestException('Too many incorrect attempts');
    }

    const isMatch = await bcrypt.compare(inputOtp, payload.otpHash);

    if (!isMatch) {
      payload.attempts += 1;

      await this.redis.set(
        redisKey,
        JSON.stringify(payload),
        await this.redis.ttl(redisKey),
      );

      throw new BadRequestException('Invalid OTP');
    }

    await this.redis.del(redisKey);

    const registrationKey = crypto.randomBytes(32).toString('hex');

    const registrationPayload: RegistrationPayload = {
      REG_KEY: registrationKey,
      attempt: 0,
      maxAttempt: 5,
    };

    await this.redis.set(
      `GECL:REGISTRATION:${email}`,
      JSON.stringify(registrationPayload),
      15 * 60,
    );

    return registrationKey;
  }

  /* ==========================================================
     ✅ VERIFY REGISTRATION KEY
  ========================================================== */
  async verifyRegistrationKey(email: string, regKey: string): Promise<void> {
    const redisKey = `GECL:REGISTRATION:${email}`;
    const storedData = await this.redis.get(redisKey);

    if (!storedData) {
      throw new BadRequestException('Registration key expired');
    }

    const payload = safeJsonParse<RegistrationPayload>(storedData);

    if (payload.REG_KEY !== regKey) {
      payload.attempt += 1;

      if (payload.attempt >= payload.maxAttempt) {
        await this.redis.del(redisKey);
        throw new BadRequestException('Too many incorrect attempts');
      }

      await this.redis.set(
        redisKey,
        JSON.stringify(payload),
        await this.redis.ttl(redisKey),
      );

      throw new BadRequestException('Invalid registration key');
    }
  }

  async deleteRegistrationKey(email: string) {
    await this.redis.del(`GECL:REGISTRATION:${email}`);
  }

  /* ==========================================================
     ✅ STUDENT REGISTRATION (FULLY SAFE)
  ========================================================== */
  async registerStudentFull(dto: RegisterStudentDto, profilePicUrl: string) {
    return this.prisma.$transaction(async (tx) => {
      // 🔒 Duplicate check (race-condition safe)
      const existing = await tx.user.findFirst({
        where: {
          OR: [
            { email: dto.email },
            { mobile: dto.mobile },
            { username: dto.regNo },
          ],
        },
      });

      if (existing) {
        throw new ConflictException(
          'Email, mobile number, or registration number already exists',
        );
      }

      const reg = new StudentRegNo(dto.regNo);
      if (!reg.isValidCollege(158)) {
        throw new BadRequestException('Invalid college code');
      }

      const passwordHash = await bcrypt.hash(dto.password, 10);

      const user = await tx.user.create({
        data: {
          fullName: dto.fullName,
          username: dto.regNo,
          email: dto.email,
          mobile: dto.mobile,
          password: passwordHash,
          personType: 'student',
          roles: ['student'],
          profilePicUrl,
        },
      });

      await tx.student.create({
        data: {
          regNo: dto.regNo,
          branch: reg.getBranch(),
          admissionYear: reg.getAdmissionYear(),
          passingYear: reg.getPassingYear(),
          isLateralEntry: reg.isLateralEntry(),
          userId: user.id,
        },
      });

      return user;
    });
  }

  /* ==========================================================
     ✅ FACULTY REGISTRATION (FULLY SAFE)
  ========================================================== */
  async registerFacultyFull(dto: RegisterFacultyDto, profilePicUrl: string) {
    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.user.findFirst({
        where: {
          OR: [{ email: dto.email }, { mobile: dto.mobile }],
        },
      });

      if (existing) {
        throw new ConflictException('Email or mobile number already exists');
      }

      const passwordHash = await bcrypt.hash(dto.password, 10);

      const user = await tx.user.create({
        data: {
          fullName: dto.fullName,
          email: dto.email,
          mobile: dto.mobile,
          password: passwordHash,
          personType: 'employee',
          roles: ['teacher'],
          profilePicUrl,
        },
      });

      await tx.teacher.create({
        data: {
          userId: user.id,
          designation: dto.designation,
          branches: dto.branches,
          specialization: dto.specialization,
          experienceYears: dto.experienceYears,
          officialEmail: dto.officialEmail,
        },
      });

      return user;
    });
  }
}

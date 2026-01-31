import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { RegisterStudentDto } from './dto/registerStudent.dto';
import * as bcrypt from 'bcryptjs';
import { StudentRegNo } from 'src/common/helpers/students/studentRegNoBreak.helper';
import { EmailService } from 'src/common/email/email.service';
import { RedisService } from 'src/common/redis/redis.service';
import { NotificationProducer } from 'src/jobs/producers/notification.producer';
// import {} from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private redis: RedisService,
    private readonly notificationProducer: NotificationProducer,
  ) {}

  async test() {
    for (let i = 0; i < 5; i++) {
      await this.notificationProducer.sendRtqJob('email', {
        to: 'rahulkrrkn@gmail.com',
        subject: 'Welcome to GECL',
        template: 'welcome', // template name
        context: {
          name: 'Rahul' + i,
        },
      });
      // await this.emailService.sendEmail({});
    }
  }

  // 🔍 Check existing user
  async checkEmailMobileRegNo(dto: RegisterStudentDto) {
    return this.prisma.user.findFirst({
      where: {
        OR: [
          { email: dto.email },
          { mobile: dto.mobile },
          { username: dto.regNo },
        ],
      },
    });
  }

  // 📝 Register user
  async registerUserStudent(dto: RegisterStudentDto) {
    const { regNo } = dto;

    // Create instance
    const reg = new StudentRegNo(regNo);
    if (!reg.isValidRegNo()) {
      throw new Error('Invalid registration number');
    }

    // 2️⃣ Hash password
    const passwordHash = await bcrypt.hash(dto.password, 10);
    // 3️⃣ Create user
    return this.prisma.user.create({
      data: {
        fullName: dto.FullName,
        username: dto.regNo,
        email: dto.email,
        mobile: dto.mobile,
        password: passwordHash,
        personType: 'student',
        roles: ['student'],
      },

      // 4️⃣ Return safe data only
      select: {
        id: true,
        username: true,
        email: true,
        mobile: true,
        createdAt: true,
      },
    });
  }
  async registerStudent(dto: RegisterStudentDto, userId: string) {
    const { regNo } = dto;

    // Create instance
    const reg = new StudentRegNo(regNo);

    // Optional strict college validation
    if (!reg.isValidCollege(158)) {
      throw new Error('Invalid college code');
    }

    // Extract values via methods
    const branch = reg.getBranch();
    const admissionYear = reg.getAdmissionYear();
    const passingYear = reg.getPassingYear();
    const isLateralEntry = reg.isLateralEntry();

    // Save in DB
    return this.prisma.student.create({
      data: {
        regNo,
        branch,
        admissionYear,
        passingYear,
        isLateralEntry,
        userId: userId,
      },
      select: {
        userId: true,
        regNo: true,
        branch: true,
        admissionYear: true,
        passingYear: true,
        createdAt: true,
      },
    });
  }
}

// // src/auth/auth.service.ts
// import { Injectable } from '@nestjs/common';
// import { EmailService } from '../email/email.service'; // 👈 Import Service

// @Injectable()
// export class AuthService {
//   // 1. Inject the EmailService
//   constructor(private emailService: EmailService) {}

//   async register(userData: any) {
//     // ... (Your logic to save user to database via Prisma) ...
//     const savedUser = { email: 'rahul@example.com', name: 'Rahul Sharma' }; // Dummy data

//     // 2. Call the email function
//     console.log('Sending email...');
//
//     // You typically don't await this if you want the API to be fast.
//     // Let it run in the background.
//     this.emailService.sendUserWelcome(savedUser.email, savedUser.name)
//       .then(() => console.log('✅ Email sent successfully'))
//       .catch((err) => console.error('❌ Email failed:', err));

//     return { message: 'User registered successfully' };
//   }
// }

import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { RegisterStudentDto } from './dto/registerStudent.dto';
import * as bcrypt from 'bcryptjs';
import { StudentRegNo } from 'src/common/helpers/students/studentRegNoBreak.helper';
// import {} from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

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
    // 1️⃣ Check duplicates
    const existing = await this.checkEmailMobileRegNo(dto);

    if (existing) {
      throw new BadRequestException(
        'Email, mobile, or registration number already exists',
      );
    }
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

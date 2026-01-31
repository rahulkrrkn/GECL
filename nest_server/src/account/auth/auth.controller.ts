import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterStudentDto } from './dto/registerStudent.dto';
import { EmailUtil } from 'src/common/utils/email.util';

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
  /* ==========================================================
  ✅ Register Student 
  ==========================================================*/
  @Post('register-student')
  async registerStudent(@Body() registerStudentDto: RegisterStudentDto) {
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

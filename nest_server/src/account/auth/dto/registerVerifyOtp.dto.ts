import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const RegistrationSchema = z.object({
  email: z.string().email('Invalid email address').toLowerCase().trim(),

  otp: z.string().min(6, 'OTP must be at least 6 characters').trim(),
});

export class RegisterVerifyOtpDto extends createZodDto(RegistrationSchema) {}

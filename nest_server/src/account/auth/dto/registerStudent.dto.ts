import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const RegistrationSchema = z.object({
  FullName: z.string().min(2, 'Name must be at least 2 characters').trim(),

  email: z.string().email('Invalid email address').toLowerCase().trim(),

  // 'coerce' converts the input to a string automatically even if sent as a number
  mobile: z.coerce
    .string()
    .regex(/^[6-9]\d{9}$/, 'Must be a valid 10-digit Indian mobile number'),

  // coerce used here because regNo might be too large for standard JS number math
  regNo: z.coerce.string().min(5, 'Registration number is too short'),

  password: z
    .string() // Passwords must always be strings
    .min(8, 'Password must be at least 8 characters'),

  REGISTRATION_KEY: z.string().min(1, 'Registration key is required'),
});

export class RegisterStudentDto extends createZodDto(RegistrationSchema) {}

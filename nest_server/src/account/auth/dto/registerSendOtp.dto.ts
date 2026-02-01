import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const RegistrationSchema = z.object({
  email: z.string().trim().toLowerCase().email('Invalid email address'),
});

export class RegisterSendOtpDto extends createZodDto(RegistrationSchema) {}

import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
// import { Designation, Branch } from 'generated/prisma';
import { Designation, Branch } from '@prisma/client';

const FacultyRegistrationSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').trim(),

  email: z.string().email('Invalid email address').toLowerCase().trim(),

  mobile: z.coerce
    .string()
    .regex(/^[6-9]\d{9}$/, 'Must be a valid 10-digit Indian mobile number')
    .optional(),

  employeeId: z.string().min(3, 'Employee ID is too short').trim().optional(),

  password: z.string().min(8, 'Password must be at least 8 characters'),

  joiningDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
    .optional(),

  specialization: z.string().min(2, 'Specialization is too short').optional(),

  experienceYears: z
    .number()
    .int()
    .min(0, 'Experience cannot be negative')
    .optional(),

  designation: z.nativeEnum(Designation).optional(),

  branches: z
    .array(z.nativeEnum(Branch))
    .min(1, 'At least one branch is required')
    .optional(),

  officialEmail: z
    .string()
    .email('Invalid official email')
    .toLowerCase()
    .trim()
    .optional(),

  REGISTRATION_KEY: z.string().min(1, 'Registration key is required'),
});

export class RegisterFacultyDto extends createZodDto(
  FacultyRegistrationSchema,
) {}

// const {
//   REGISTRATION_KEY,
//   email,
//   fullName,
//   password,
//   mobile,

//   role,

//   // teacher fields
//   designation,
//   joiningDate,
//   specialization,
//   experienceYears,
//   branches,
//   officialEmail,
//   isHod,
// } = data;
// const dep

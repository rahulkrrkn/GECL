// @/gecl/types/faculty.ts

export type Designation =
  | "Professor"
  | "Assistant Professor"
  | "Guest"
  | "Lab Assistant"
  | "Staff";

export interface TeacherModule {
  isHod: boolean;
  joiningDate: string | Date | null;
  officialEmail: string | null;
  designation: Designation | null;
  experienceYears: number;
  specialization: string | null;
}

export interface FacultyMember {
  _id: string;
  fullName: string;
  email: string;
  profilePicUrl: string;
  branch: string[];
  teacher: TeacherModule;
}

export interface FacultyApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: FacultyMember[];
  error: string | null;
}

import bcrypt from "bcrypt";

import { getRedis } from "../../../config/redis.config.js";
import GeclUser from "../../../models/gecl_user.model.js";
import { emailNormalization } from "../../../utils/emailNormalization.utils.js";
import { renameToR2 } from "../../../helpers/fileUploadRenameR2.helper.js";
import { BadRequestError } from "../../../errors/httpErrors.err.js";
import { Email } from "../../../library/email/index.js";

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                   */
/* -------------------------------------------------------------------------- */

function registrationKey(email: string) {
  return `GECL:VERIFY_REGISTRATION:${email}`;
}

const BRANCH: Record<number, string> = {
  101: "CE",
  102: "ME",
  103: "EE",
  104: "ECE",
  105: "CSE",
  110: "EEE",
  151: "CSE-AI",
  153: "CSE-DS",
};

function parseRegNo(regNo: string) {
  return {
    session: Number(regNo.slice(0, 2)),
    branchCode: Number(regNo.slice(2, 5)),
    collegeCode: Number(regNo.slice(5, 8)),
    rollNo: Number(regNo.slice(8, 11)),
  };
}

function getPassingYear(session: number, rollNo: number) {
  if (rollNo >= 1 && rollNo <= 99) return 2000 + session + 4;
  if (rollNo >= 100 && rollNo <= 999) return 2000 + session + 3;
  return null;
}

/* -------------------------------------------------------------------------- */
/*                                SERVICE CLASS                                */
/* -------------------------------------------------------------------------- */

export class RegisterService {
  /* ===========================
     STUDENT REGISTRATION
  =========================== */

  static async registerStudent(req: any) {
    const { REGISTRATION_KEY, email, regNo, fullName, password, mobile } =
      req.validatedBody;

    /* ---------- Email ---------- */
    const normalizedEmail = emailNormalization(email);
    if (!normalizedEmail) {
      throw new BadRequestError("Invalid email", "INVALID_EMAIL");
    }

    /* ---------- Redis key ---------- */
    const redis = getRedis();
    const redisKey = registrationKey(normalizedEmail);
    const storedKey = await redis.get(redisKey);

    if (!storedKey || storedKey !== REGISTRATION_KEY) {
      throw new BadRequestError(
        "Invalid or expired registration key",
        "INVALID_REGISTRATION_KEY",
      );
    }

    /* ---------- Registration number ---------- */
    if (!/^\d{11}$/.test(regNo)) {
      throw new BadRequestError(
        "Invalid registration number",
        "INVALID_REG_NO",
      );
    }

    const { session, branchCode, collegeCode, rollNo } = parseRegNo(regNo);

    if (collegeCode !== 158) {
      throw new BadRequestError(
        "Invalid registration number",
        "INVALID_COLLEGE_CODE",
      );
    }

    const branch = BRANCH[branchCode];
    if (!branch) {
      throw new BadRequestError("Invalid branch code", "INVALID_BRANCH");
    }

    const passingYear = getPassingYear(session, rollNo);
    if (!passingYear) {
      throw new BadRequestError("Invalid roll number", "INVALID_ROLL_NO");
    }

    /* ---------- Duplicate check (SAFE .or()) ---------- */
    const exists = await GeclUser.findOne()
      .or([{ email: normalizedEmail }, { "student.regNo": regNo }])
      .lean();

    if (exists) {
      throw new BadRequestError(
        "Email or registration number already registered",
        "USER_ALREADY_EXISTS",
      );
    }

    /* ---------- Upload profile photo ---------- */
    const uploaded = await renameToR2({
      req,
      fileNames: { profilePhoto: [`${fullName}-${regNo}`] },
    });

    if (!uploaded?.profilePhoto?.[0]?.url) {
      throw new BadRequestError(
        "Profile photo upload failed",
        "PROFILE_PHOTO_MISSING",
      );
    }

    /* ---------- Create user ---------- */
    const user = await GeclUser.create({
      fullName,
      email: normalizedEmail,
      mobile: mobile ?? null,
      passwordHash: await bcrypt.hash(password, 10),
      role: ["student"],
      personType: "student",
      userName: regNo,
      profilePicUrl: uploaded.profilePhoto[0].url,
      branch: [branch],
      student: {
        regNo,
        rollNo: String(rollNo),
        admissionYear: 2000 + session,
        passingYear,
      },
    });

    /* ---------- Cleanup ---------- */
    await redis.del(redisKey);
    await Email.sendWelcome(normalizedEmail, user.fullName);

    return {
      userId: user._id,
      email: normalizedEmail,
    };
  }

  /* ===========================
  TEACHER / EMPLOYEE REGISTRATION
  =========================== */
  static async registerTeacher(req: any) {
    const {
      REGISTRATION_KEY,
      email,
      fullName,
      password,
      mobile,
      role,
      designation,
      joiningDate,
      specialization,
      experienceYears,
      branches,
      officialEmail,
      isHod,
    } = req.validatedBody;

    /* ---------- Email ---------- */
    const normalizedEmail = emailNormalization(email);
    if (!normalizedEmail) {
      throw new BadRequestError("Invalid email", "INVALID_EMAIL");
    }

    /* ---------- Redis key ---------- */
    const redis = getRedis();
    const redisKey = registrationKey(normalizedEmail);
    const storedKey = await redis.get(redisKey);

    if (!storedKey || storedKey !== REGISTRATION_KEY) {
      throw new BadRequestError(
        "Invalid or expired registration key",
        "INVALID_REGISTRATION_KEY",
      );
    }

    /* ---------- Duplicate check (SAFE .or()) ---------- */
    const exists = await GeclUser.findOne()
      .or([{ email: normalizedEmail }, { mobile }])
      .lean();

    if (exists) {
      throw new BadRequestError(
        "Email or mobile already registered",
        "USER_ALREADY_EXISTS",
      );
    }

    /* ---------- Upload profile photo (optional) ---------- */
    let profilePicUrl: string | null = null;

    const uploaded = await renameToR2({
      req,
      fileNames: { profilePhoto: [fullName] },
    });

    if (uploaded?.profilePhoto?.[0]?.url) {
      profilePicUrl = uploaded.profilePhoto[0].url;
    }

    /* ---------- Create user ---------- */
    const user = await GeclUser.create({
      fullName,
      email: normalizedEmail,
      mobile: mobile ?? null,
      passwordHash: await bcrypt.hash(password, 10),
      role: [role],
      personType: "employee",
      branch: branches ?? [],
      profilePicUrl,
      teacher:
        role === "teacher"
          ? {
              isHod: Boolean(isHod),
              designation,
              joiningDate,
              specialization,
              experienceYears: experienceYears ?? 0,
              officialEmail,
            }
          : null,
    });

    /* ---------- Cleanup ---------- */
    await redis.del(redisKey);
    await Email.sendWelcome(normalizedEmail, user.fullName);

    return {
      userId: user._id,
      email: normalizedEmail,
      role: user.role,
    };
  }
}

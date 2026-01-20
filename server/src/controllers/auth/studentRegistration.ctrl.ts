import type { Request, Response } from "express";
import bcrypt from "bcrypt";

import getRedis from "../../config/redis.config.js";
import { getGeclUserFUIConn } from "../../models/gecl_user.model.js";
import { emailNormalization } from "../../utils/emailNormalization.utils.js";

import { sendSuccess, sendError } from "../../helpers/response.helper.js";

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

function isValidRegNoFormat(regNo: string) {
  return !!regNo && regNo.length === 11 && /^\d{11}$/.test(regNo);
}

function parseRegNo(regNo: string) {
  return {
    session: parseInt(regNo.slice(0, 2)),
    branchCode: parseInt(regNo.slice(2, 5)),
    collegeCode: parseInt(regNo.slice(5, 8)),
    rollNo: parseInt(regNo.slice(8, 11)),
  };
}

function getPassingYear(session: number, rollNo: number) {
  if (rollNo >= 1 && rollNo <= 99) return `20${session + 4}`;
  if (rollNo >= 100 && rollNo <= 999) return `20${session + 3}`;
  return null;
}

export async function studentRegistrationMainCtrl(req: Request, res: Response) {
  const data = req?.validatedBody;

  if (!data) {
    return sendError(res, "Validated body not found. Middleware missing?", {
      status: 400,
      code: "VALIDATED_BODY_MISSING",
    });
  }

  const { REGISTRATION_KEY, email, regNo, fullName, password, mobile } = data;

  // ===============================
  // 1) Email Validation
  // ===============================
  const emailId = emailNormalization(email);

  if (!emailId) {
    return sendError(res, "Invalid email", {
      status: 400,
      code: "INVALID_EMAIL",
    });
  }

  const normalizedEmail = emailId.toLowerCase();

  // ===============================
  // 2) Redis Registration Key Validation
  // ===============================
  const redis = getRedis();
  const key = registrationKey(normalizedEmail);

  const raw = await redis.get(key);

  if (!raw) {
    return sendError(res, "Invalid registration key", {
      status: 400,
      code: "INVALID_REGISTRATION_KEY",
    });
  }

  let redisRegistrationKey: string;

  try {
    redisRegistrationKey = JSON.parse(raw);
  } catch (err) {
    return sendError(res, "Invalid registration key", {
      status: 400,
      code: "REGISTRATION_KEY_PARSE_FAILED",
    });
  }

  if (REGISTRATION_KEY !== redisRegistrationKey) {
    return sendError(res, "Invalid registration key", {
      status: 400,
      code: "REGISTRATION_KEY_MISMATCH",
    });
  }

  // ===============================
  // 3) DB Connections
  // ===============================
  const User = await getGeclUserFUIConn();

  // ===============================
  // 4) Duplicate Check
  // ===============================
  const alreadyExists = await User.exists({
    $or: [{ email: normalizedEmail }, { "student.regNo": regNo }],
  });

  if (alreadyExists) {
    return sendError(res, "Email or Registration Number already registered", {
      status: 409,
      code: "USER_ALREADY_EXISTS",
    });
  }

  const alreadyExistsInAuth = await User.exists({
    $or: [{ email: normalizedEmail }, { mobile }, { "student.regNo": regNo }],
  });

  if (alreadyExistsInAuth) {
    return sendError(res, "Email or Mobile Number already registered", {
      status: 409,
      code: "AUTH_ALREADY_EXISTS",
    });
  }

  // ===============================
  // 5) Registration Number Validation
  // ===============================
  if (!isValidRegNoFormat(regNo)) {
    return sendError(res, "Invalid Registration Number", {
      status: 400,
      code: "INVALID_REG_NO_FORMAT",
    });
  }

  const { session, branchCode, collegeCode, rollNo } = parseRegNo(regNo);

  if (collegeCode !== 158) {
    return sendError(res, "Invalid Registration Number", {
      status: 400,
      code: "INVALID_COLLEGE_CODE",
    });
  }

  if (session < 18 || session > 40) {
    return sendError(res, "Invalid Registration Number", {
      status: 400,
      code: "INVALID_SESSION",
    });
  }

  if (!BRANCH[branchCode]) {
    return sendError(res, "Invalid Registration Number", {
      status: 400,
      code: "INVALID_BRANCH_CODE",
    });
  }

  const passingYear = getPassingYear(session, rollNo);
  if (!passingYear) {
    return sendError(res, "Invalid Registration Number", {
      status: 400,
      code: "INVALID_ROLL_NO",
    });
  }

  // ===============================
  // 6) Create User
  // ===============================
  const userDBData = {
    status: "unverified",
    fullName,
    mobile,
    email: normalizedEmail,
    passwordHash: await bcrypt.hash(password, 10),
    role: "student",
    personType: "student",
    uniqueId: regNo,

    student: {
      regNo,
      branch: BRANCH[branchCode],
      passingYear: parseInt(passingYear),
      admissionYear: parseInt(`20${session}`),
    },
  };

  const user = await User.create(userDBData);

  if (!user) {
    return sendError(res, "Something went wrong", {
      status: 500,
      code: "USER_CREATE_FAILED",
    });
  }

  // ===============================
  // 8) Cleanup Redis + Send Success
  // ===============================
  await redis.del(key);

  return sendSuccess(
    res,
    "Registration successful. Your application is under verification. Please wait for approval.",
    {
      userId: user._id,
      email: normalizedEmail,
    },
    {
      status: 200,
      code: "REGISTRATION_SUCCESS",
    },
  );
}

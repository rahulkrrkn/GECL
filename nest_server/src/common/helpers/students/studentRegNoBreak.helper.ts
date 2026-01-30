import { Branch } from '@prisma/client';

export class StudentRegNo {
  private regNo: string;

  private static BRANCH_MAP: Record<number, Branch> = {
    101: Branch.CE,
    102: Branch.ME,
    103: Branch.EE,
    104: Branch.ECE,
    105: Branch.CSE,
    110: Branch.EEE,
    151: Branch.CSE_AI,
    153: Branch.CSE_DS,
  };

  constructor(regNo: string) {
    if (!/^\d{11}$/.test(regNo)) {
      throw new Error('Invalid registration number format');
    }
    this.regNo = regNo;
  }

  private parse() {
    return {
      session: parseInt(this.regNo.slice(0, 2)),
      branchCode: parseInt(this.regNo.slice(2, 5)),
      collegeCode: parseInt(this.regNo.slice(5, 8)),
      rollNo: parseInt(this.regNo.slice(8, 11)),
    };
  }

  getCollegeCode() {
    return this.parse().collegeCode;
  }

  getBranch(): Branch {
    const { branchCode } = this.parse();
    const branch = StudentRegNo.BRANCH_MAP[branchCode];

    if (!branch) throw new Error('Invalid branch code');
    return branch;
  }

  getAdmissionYear() {
    return 2000 + this.parse().session;
  }

  getPassingYear() {
    const { session, rollNo } = this.parse();

    if (rollNo >= 1 && rollNo <= 99) return 2000 + session + 4;
    if (rollNo >= 100 && rollNo <= 999) return 2000 + session + 3;

    throw new Error('Invalid roll number');
  }

  isValidCollege(expected = 158) {
    return this.getCollegeCode() === expected;
  }
  isLateralEntry() {
    const { rollNo } = this.parse();
    return rollNo >= 100 && rollNo <= 999;
  }

  isValidRegNo(): boolean {
    try {
      // format already validated in constructor,
      // but re-check for safety if method used independently
      if (!/^\d{11}$/.test(this.regNo)) return false;

      const { session, branchCode, collegeCode, rollNo } = this.parse();

      // college check
      if (collegeCode !== 158) return false;

      // branch check
      if (!StudentRegNo.BRANCH_MAP[branchCode]) return false;

      // roll number check
      if (rollNo < 1 || rollNo > 999) return false;

      // optional: session sanity check
      if (session < 18 || session > 40) return false;

      return true;
    } catch {
      return false;
    }
  }
}

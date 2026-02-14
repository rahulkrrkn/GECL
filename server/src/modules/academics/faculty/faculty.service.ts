import GeclUser from "../../../models/gecl_user.model.js";
import { Types } from "mongoose";

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export class FacultyService {
  static async getAllFaculty(filters: {
    branch?: string;
    designation?: string;
    search?: string;
  }) {
    const query: any = {
      personType: "employee",
      role: "teacher",
      status: "active",
    };

    if (filters.branch) query.branch = filters.branch;
    if (filters.designation) query["teacher.designation"] = filters.designation;

    if (filters.search) {
      const safeSearch = escapeRegex(filters.search.trim().slice(0, 80));
      query.fullName = { $regex: safeSearch, $options: "i" };
    }

    return GeclUser.find(query)
      .select(
        "fullName email profilePicUrl branch teacher.designation teacher.experienceYears",
      )
      .lean();
  }

  static async getFacultyById(id: string) {
    if (!Types.ObjectId.isValid(id)) return null;

    return GeclUser.findOne({
      _id: id,
      personType: "employee",
      role: "teacher",
      status: "active",
    })
      .select("-passwordHash -allow -deny -allowExtra")
      .lean();
  }

  static async getFacultyByDepartment(branch: string) {
    return GeclUser.find({
      personType: "employee",
      role: "teacher",
      branch,
      status: "active",
    })
      .select(
        "fullName email profilePicUrl branch teacher.designation teacher.specialization",
      )
      .lean();
  }

  static async searchFaculty(queryText: string) {
    const safeSearch = escapeRegex(queryText.trim().slice(0, 80));

    return GeclUser.find({
      personType: "employee",
      role: "teacher",
      status: "active",
      $or: [
        { fullName: { $regex: queryText, $options: "i" } },
        {
          "teacher.specialization": {
            $regex: queryText,
            $options: "i",
          },
        },
      ],
    })
      .select(
        "fullName email profilePicUrl branch teacher.designation teacher.specialization",
      )
      .lean();
  }
}

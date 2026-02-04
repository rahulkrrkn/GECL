// --------------------
// Branch Type
// --------------------
export type Branch =
  | "CSE"
  | "ECE"
  | "EE"
  | "ME"
  | "CE"
  | "CSE-AI"
  | "CSE-DS"
  | "EEE"
  | "AS";

// --------------------
// Branch Map
// --------------------
const BRANCH_MAP: Record<Branch, string> = {
  CSE: "Computer Science and Engineering",
  ECE: "Electronics and Communication Engineering",
  EE: "Electrical Engineering",
  ME: "Mechanical Engineering",
  CE: "Civil Engineering",
  "CSE-AI": "Computer Science and Engineering (Artificial Intelligence)",
  "CSE-DS": "Computer Science and Engineering (Data Science)",
  EEE: "Electrical and Electronics Engineering",
  AS: "Applied Science",
};

// --------------------
// 1️⃣ Full name ONLY
// --------------------
export function getBranchFullNames(branches: Branch[]): string[] {
  return branches.map((branch) => BRANCH_MAP[branch]);
}

// --------------------
// 2️⃣ Full name + short name at last
// --------------------
export function getBranchDisplayNames(branches: Branch[]): string[] {
  return branches.map((branch) => `${BRANCH_MAP[branch]} (${branch})`);
}

// app/academics/faculty/[id]/page.tsx
import { Metadata } from "next";
import SingleFacultyView from "./SingleFacultyView";
import { apiRequest } from "@/gecl/utils/apiRequest";

type FacultyMember = {
  fullName: string;
  profilePicUrl?: string;
  teacher?: {
    designation: string;
    specialization?: string;
  };
  branch?: string[];
};

type Props = {
  params: Promise<{ id: string }>;
};

// This generates dynamic SEO tags for each professor
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  // Fetch a small subset of data for SEO
  const data = await apiRequest({
    method: "GET",
    url: `/academics/faculty/${id}`,
  });

  const member = data.data as FacultyMember;

  if (!member) return { title: "Faculty Member | GEC Lakhisarai" };

  const fullName = member.fullName;
  const designation = member.teacher?.designation || "Faculty";
  const dept = member.branch?.[0] || "Engineering";

  return {
    title: `${fullName} | ${designation} - GEC Lakhisarai`,
    description: `Official academic profile of ${fullName}, ${designation} in ${dept} at Government Engineering College, Lakhisarai. Expertise in ${member.teacher?.specialization}.`,
    openGraph: {
      title: `${fullName} - GEC Lakhisarai`,
      description: `${designation} at GEC Lakhisarai`,
      images: member.profilePicUrl ? [member.profilePicUrl] : [],
      type: "profile",
    },
  };
}

export default async function FacultyProfilePage({ params }: Props) {
  const resolvedParams = await params;

  return <SingleFacultyView id={resolvedParams.id} />;
}

export interface Attachment {
  fileUrl: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}

export interface Notice {
  _id: string;
  source: "GECL" | "BEU";
  title: string;
  slug: string;
  content: string;
  category: string; // e.g., "EXAM", "GENERAL"
  department: string;
  audience: string[];
  attachments: Attachment[];
  isPinned: boolean;
  status: string;
  publishAt: string; // ISO Date String
}

export interface NoticeResponse {
  statusCode: number;
  status: string;
  message: string;
  data: {
    data: Notice[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

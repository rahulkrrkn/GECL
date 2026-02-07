// src/security/audience.resolver.ts

import { AudienceGroup } from "../../models/gecl_announcement.model.js";

export const ROLE_TO_AUDIENCE_MAP: Record<string, AudienceGroup> = {
  student: AudienceGroup.STUDENTS,
  teacher: AudienceGroup.FACULTY,
  librarian: AudienceGroup.FACULTY,
  tpo: AudienceGroup.FACULTY,
  staff: AudienceGroup.STAFF,
  alumni: AudienceGroup.ALUMNI,
};

export function resolveAudiences(roles: string[] = []) {
  const audiences = new Set<AudienceGroup>([AudienceGroup.PUBLIC]);

  for (const role of roles) {
    const mapped = ROLE_TO_AUDIENCE_MAP[role.toLowerCase()];
    if (mapped) audiences.add(mapped);
  }

  return Array.from(audiences);
}

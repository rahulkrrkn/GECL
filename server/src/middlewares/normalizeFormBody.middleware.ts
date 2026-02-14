import type { NextFunction, Request, Response } from "express";

type PlainObject = Record<string, unknown>;

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parsePath(rawKey: string): string[] {
  return rawKey.replace(/\]/g, "").split("[").filter(Boolean);
}

function assignPathValue(
  target: PlainObject,
  path: string[],
  value: unknown,
  forceArray: boolean,
) {
  if (!path.length) return;

  let cursor: PlainObject = target;

  for (let i = 0; i < path.length - 1; i++) {
    const segment = path[i];
    if (!segment) return;

    if (!isPlainObject(cursor[segment])) {
      cursor[segment] = {};
    }

    cursor = cursor[segment] as PlainObject;
  }

  const leaf = path[path.length - 1];
  if (!leaf) return;

  const incomingValues = Array.isArray(value) ? value : [value];
  const existing = cursor[leaf];

  if (forceArray) {
    const existingArray = Array.isArray(existing)
      ? existing
      : existing === undefined
        ? []
        : [existing];

    cursor[leaf] = [...existingArray, ...incomingValues];
    return;
  }

  if (existing === undefined) {
    cursor[leaf] =
      incomingValues.length === 1 ? incomingValues[0] : incomingValues;
    return;
  }

  if (Array.isArray(existing)) {
    cursor[leaf] = [...existing, ...incomingValues];
    return;
  }

  cursor[leaf] = [existing, ...incomingValues];
}

export function normalizeFormBody(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  if (!req.body || typeof req.body !== "object") return next();

  const normalized: PlainObject = {};
  const source = req.body as PlainObject;

  for (const [rawKey, rawValue] of Object.entries(source)) {
    const isArrayKey = rawKey.endsWith("[]");
    const key = isArrayKey ? rawKey.slice(0, -2) : rawKey;
    const path = parsePath(key);

    assignPathValue(normalized, path, rawValue, isArrayKey);
  }

  req.body = normalized;
  next();
}

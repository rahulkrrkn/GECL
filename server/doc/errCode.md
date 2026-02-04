# 📘 HTTP Status Codes – API Reference (Express Friendly)

This document lists **HTTP status codes** commonly used in REST APIs, with a **short meaning** and **why/when to use them**.

---

## 🔵 1xx – Informational (Rare in APIs)

| Code | Message             | Why / When to Use                        |
| ---- | ------------------- | ---------------------------------------- |
| 100  | Continue            | Client can continue sending request body |
| 101  | Switching Protocols | WebSocket / protocol upgrade             |
| 102  | Processing          | Long-running request                     |
| 103  | Early Hints         | Preload resources                        |

> Usually not handled manually in Express APIs

---

## 🟢 2xx – Success

| Code | Message         | Why / When to Use            |
| ---- | --------------- | ---------------------------- |
| 200  | OK              | Request successful           |
| 201  | Created         | Resource created (POST)      |
| 202  | Accepted        | Accepted, processing later   |
| 204  | No Content      | Success, no response body    |
| 206  | Partial Content | Pagination / range responses |

> ❌ Never return 200 for errors

---

## 🟡 3xx – Redirection

| Code | Message            | Why / When to Use          |
| ---- | ------------------ | -------------------------- |
| 301  | Moved Permanently  | Permanent redirect         |
| 302  | Found              | Temporary redirect         |
| 303  | See Other          | Redirect to GET after POST |
| 304  | Not Modified       | Cache still valid          |
| 307  | Temporary Redirect | Same HTTP method           |
| 308  | Permanent Redirect | Same method, permanent     |

> Mostly browser-related, rarely used in APIs

---

## 🔴 4xx – Client Errors (Most Important)

| Code | Message                       | Why / When to Use              |
| ---- | ----------------------------- | ------------------------------ |
| 400  | Bad Request                   | Invalid input / missing fields |
| 401  | Unauthorized                  | Token missing or invalid       |
| 403  | Forbidden                     | No permission                  |
| 404  | Not Found                     | Resource does not exist        |
| 405  | Method Not Allowed            | Wrong HTTP method              |
| 409  | Conflict                      | Duplicate data                 |
| 410  | Gone                          | Resource permanently deleted   |
| 413  | Payload Too Large             | File/body too large            |
| 415  | Unsupported Media Type        | Wrong Content-Type             |
| 422  | Unprocessable Entity          | Validation failed              |
| 429  | Too Many Requests             | Rate limiting                  |
| 451  | Unavailable For Legal Reasons | Legal restriction              |

> Most API mistakes are wrong 4xx usage

---

## 🔥 5xx – Server Errors (Your Responsibility)

| Code | Message                         | Why / When to Use            |
| ---- | ------------------------------- | ---------------------------- |
| 500  | Internal Server Error           | Unexpected crash / bug       |
| 501  | Not Implemented                 | Feature not implemented      |
| 502  | Bad Gateway                     | DB / external service failed |
| 503  | Service Unavailable             | Server down / maintenance    |
| 504  | Gateway Timeout                 | Upstream timeout             |
| 505  | HTTP Version Not Supported      | Protocol unsupported         |
| 507  | Insufficient Storage            | Disk/storage full            |
| 508  | Loop Detected                   | Infinite recursion           |
| 511  | Network Authentication Required | Network auth required        |

> In real APIs you mostly use: **500, 502, 503, 504**

---

## ✅ Recommended Minimum Set (Production APIs)

### Client Errors

- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 409 Conflict
- 422 Validation Error
- 429 Rate Limit

### Server Errors

- 500 Internal Error
- 502 Bad Gateway
- 503 Service Unavailable
- 504 Timeout

---

## 📌 Standard API Error Response Format

```json
{
  "success": false,
  "statusCode": 404,
  "errorCode": "NOT_FOUND",
  "message": "User not found"
}
```

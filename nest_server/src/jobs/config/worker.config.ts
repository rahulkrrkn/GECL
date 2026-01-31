export const WORKER_CONFIG = {
  // Realtime: High concurrency to clear backlog instantly
  REALTIME: Number(process.env.REALTIME_CONCURRENCY || 5),

  // Priority: Moderate concurrency
  PRIORITY: Number(process.env.PRIORITY_CONCURRENCY || 2),

  // Async: Low concurrency (often limited by the rate limiter anyway)
  ASYNC: Number(process.env.ASYNC_CONCURRENCY || 1),
};

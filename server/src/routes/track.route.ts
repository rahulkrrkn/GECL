import { Router } from "express";
import fs from "fs";
import path from "path";

const track = Router();

// tracker-data.json at ../config/tracker-data.json
const DATA_FILE = path.join(
  process.cwd(),
  "src",
  "config",
  "tracker-data.json",
);

// ✅ Your frontend base URL
const FRONTEND_BASE_URL = "http://localhost:3000";

// ✅ Read JSON only (NO default pages, NO fake data)
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    return {
      error: true,
      message: `JSON file not found: ${DATA_FILE}`,
      data: [],
    };
  }

  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");

    if (!raw.trim()) {
      return { error: true, message: "JSON file is empty ❌", data: [] };
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return {
        error: true,
        message: "JSON format invalid ❌ (must be an array [])",
        data: [],
      };
    }

    return { error: false, message: "OK", data: parsed };
  } catch (err) {
    if (err instanceof SyntaxError) {
      return {
        error: true,
        message: "JSON parse error ❌ " + err.message,
        data: [],
      };
    } else {
      return {
        error: true,
        message: "Unknown error ❌ ",
        data: [],
      };
    }
  }
};

/**
 * ==========================
 * ✅ PAGE: READ ONLY DASHBOARD
 * GET /track
 * ==========================
 */
track.get("/", (req, res) => {
  const result = readData();

  // ❌ Error page if JSON missing/invalid
  if (result.error) {
    return res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Tracker Error</title>
        <style>
          body { font-family: Arial; background:#f5f6fa; padding:30px; }
          .box {
            max-width:900px; margin:auto; background:white; padding:20px;
            border-radius:10px; box-shadow:0px 2px 10px rgba(0,0,0,0.1);
            border-left: 6px solid #eb3b5a;
          }
          h1 { color:#eb3b5a; }
          code { background:#eee; padding:4px 8px; border-radius:5px; }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>❌ Tracker JSON Error</h1>
          <p><b>Reason:</b> ${result.message}</p>
          <p><b>Fix:</b> Create this file and put valid JSON array inside:</p>
          <p><code>${DATA_FILE}</code></p>
        </div>
      </body>
      </html>
    `);
  }

  // ✅ Show data page
  res.setHeader("Content-Type", "text/html");

  return res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tracker (Read Only)</title>

  <style>
    body { font-family: Arial, sans-serif; background:#f5f6fa; padding:20px; }
    h1 { text-align:center; margin-bottom:10px; }

    .container {
      max-width:1100px; margin:auto; background:white; padding:20px;
      border-radius:10px; box-shadow:0px 2px 10px rgba(0,0,0,0.1);
    }

    .page-card {
      border:2px solid #ddd;
      border-radius:10px;
      padding:15px;
      margin-bottom:15px;
      background:#fafafa;
    }

    .page-header {
      display:flex;
      justify-content:space-between;
      align-items:center;
      flex-wrap:wrap;
      gap:10px;
    }

    .page-title { font-size:18px; font-weight:bold; }

    .badge {
      padding:6px 12px;
      border-radius:20px;
      font-size:12px;
      font-weight:bold;
      color:white;
      margin-right:10px;
      display:inline-block;
    }

    /* badge colors */
    .badge-Pending { background:#778ca3; }
    .badge-Done { background:#20bf6b; }
    .badge-Fine\\ Done { background:#f7b731; color:#111; }
    .badge-Verified { background:#2d98da; }

    .grid {
      display:grid;
      grid-template-columns: repeat(2, 1fr);
      gap:10px;
      margin-top:12px;
    }

    @media (max-width: 700px) {
      .grid { grid-template-columns: 1fr; }
    }

    /* ✅ each small box */
    .item {
      padding:12px;
      border-radius:8px;
      border:2px solid #eee;
      background:white;
    }

    .label { font-size:12px; color:#666; font-weight:bold; }
    .value { margin-top:6px; font-size:14px; font-weight:bold; }

    /* ✅ box color by status */
    .box-Pending {
      border-color:#778ca3;
      background:#f1f3f6;
    }

    .box-Done {
      border-color:#20bf6b;
      background:#eafff3;
    }

    .box-Fine\\ Done {
      border-color:#f7b731;
      background:#fff8e1;
    }

    .box-Verified {
      border-color:#2d98da;
      background:#e9f4ff;
    }

    .remark {
      margin-top:10px;
      padding:10px;
      background:white;
      border:1px solid #eee;
      border-radius:6px;
    }

    .btn {
      display:inline-block;
      padding:10px 12px;
      border-radius:8px;
      text-decoration:none;
      font-weight:bold;
      background:#2d98da;
      color:white;
      font-size:14px;
    }
    .btn:hover { opacity:0.9; }

    .small {
      font-size: 12px;
      color:#444;
      margin-top: 4px;
    }

    pre {
      background:#111;
      color:#0f0;
      padding:12px;
      border-radius:8px;
      overflow:auto;
      margin-top:20px;
    }
  </style>
</head>

<body>
  <h1>📌 Tracker Dashboard (Read Only)</h1>

  <div class="container">
    <p><b>Total Pages:</b> ${result.data.length}</p>
    <p class="small"><b>Frontend Base URL:</b> ${FRONTEND_BASE_URL}</p>

    <div id="pagesList"></div>

    <h3>Raw JSON (Debug)</h3>
    <pre>${JSON.stringify(result.data, null, 2)}</pre>
  </div>

  <script>
    const FRONTEND_BASE_URL = ${JSON.stringify(FRONTEND_BASE_URL)};
    const pages = ${JSON.stringify(result.data)};

    function safe(v) {
      return (v === undefined || v === null || v === "") ? "-" : v;
    }

    function joinURL(base, pagePath) {
      if (!pagePath) return base;
      if (base.endsWith("/") && pagePath.startsWith("/")) return base.slice(0, -1) + pagePath;
      if (!base.endsWith("/") && !pagePath.startsWith("/")) return base + "/" + pagePath;
      return base + pagePath;
    }

    function normalizeStatus(status) {
      return String(status || "Pending");
    }

    function statusBoxClass(status) {
      return "box-" + normalizeStatus(status);
    }

    function render() {
      const container = document.getElementById("pagesList");
      container.innerHTML = "";

      pages.forEach((page) => {
        const pageStatus = normalizeStatus(page.pageStatus);
        const fullLink = joinURL(FRONTEND_BASE_URL, page.pageLink);

        const div = document.createElement("div");
        div.className = "page-card";

        div.innerHTML = \`
          <div class="page-header">
            <div>
              <div class="page-title">\${safe(page.pageLink)}</div>
              <div class="small">Full URL: <b>\${fullLink}</b></div>
            </div>

            <div>
              <span class="badge badge-\${pageStatus}">\${safe(page.pageStatus)}</span>
              <a class="btn" href="\${fullLink}" target="_blank">View Page</a>
            </div>
          </div>

          <div class="grid">
            <div class="item \${statusBoxClass(page.seoCheck)}">
              <div class="label">SEO Check</div>
              <div class="value">\${safe(page.seoCheck)}</div>
            </div>

            <div class="item \${statusBoxClass(page.photoUpdate)}">
              <div class="label">Photo Update</div>
              <div class="value">\${safe(page.photoUpdate)}</div>
            </div>

            <div class="item \${statusBoxClass(page.textVerify)}">
              <div class="label">Text Verify</div>
              <div class="value">\${safe(page.textVerify)}</div>
            </div>

            <div class="item \${statusBoxClass(page.dataCheck)}">
              <div class="label">Data Check</div>
              <div class="value">\${safe(page.dataCheck)}</div>
            </div>
          </div>

          <div class="remark">
            <div class="label">Remark</div>
            <div class="value">\${safe(page.remark)}</div>
          </div>
        \`;

        container.appendChild(div);
      });
    }

    render();
  </script>
</body>
</html>
  `);
});

/**
 * ==========================
 * ✅ API: READ JSON
 * GET /track/api
 * ==========================
 */
track.get("/api", (req, res) => {
  const result = readData();

  if (result.error) {
    return res.status(500).json({
      success: false,
      message: result.message,
      data: [],
    });
  }

  return res.json({ success: true, data: result.data });
});

export default track;

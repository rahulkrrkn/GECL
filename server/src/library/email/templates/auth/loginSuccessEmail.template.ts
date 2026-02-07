export function loginSuccessEmailTemplate(params: {
  name: string;
  date: string;
  ip: string;
  // FIX: Add '| undefined' to these optional fields
  device?: string | null | undefined;
  platform?: string | null | undefined;
  location?: string | null | undefined;
  logoUrl: string;
  supportEmail?: string;
}) {
  const {
    name,
    date,
    ip,
    device,
    platform,
    location,
    logoUrl,
    supportEmail = "support@geclakhisarai.ac.in",
  } = params;

  const brandName = "Government Engineering College, Lakhisarai";

  // 1. Dynamic Data Builder
  // We filter out any fields that are null, undefined, empty, or "unknown"
  const rawDetails = [
    { label: "Date & Time", value: date },
    { label: "IP Address", value: ip },
    { label: "Location", value: location },
    { label: "Device", value: device },
    { label: "Platform", value: platform },
  ];

  const validDetails = rawDetails.filter(
    (item) => item.value && item.value.trim().toLowerCase() !== "unknown",
  );

  // 2. Generate HTML Rows for Details
  const detailsHtml = validDetails
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 0;color:#94a3b8;font-size:14px;width:140px;vertical-align:top;">
            ${item.label}:
          </td>
          <td style="padding:8px 0;color:#e5e7eb;font-size:14px;font-weight:500;vertical-align:top;">
            ${item.value}
          </td>
        </tr>
      `,
    )
    .join("");

  return `
      <div style="margin:0;padding:0;background:#020617;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:24px 0;">
          <tr>
            <td align="center">
    
              <table width="600" cellpadding="0" cellspacing="0"
                style="
                  width:600px;max-width:600px;
                  background:#020617;
                  border:1px solid #1e293b;
                  border-radius:14px;
                  overflow:hidden;
                  font-family:Arial, Helvetica, sans-serif;
                  color:#e5e7eb;
                ">
    
                <tr>
                  <td style="padding:22px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="left">
                          <img
                            src="${logoUrl}"
                            alt="${brandName} Logo"
                            style="
                              height:48px;
                              width:auto;
                              display:block;
                              border-radius:8px;
                              border:1px solid #1e293b;
                            "
                          />
                        </td>
                        <td align="right">
                          <span style="
                            display:inline-block;
                            padding:6px 12px;
                            border-radius:999px;
                            background:rgba(16, 185, 129, 0.15); 
                            border:1px solid rgba(16, 185, 129, 0.35);
                            color:#e5e7eb;
                            font-size:12px;
                          ">
                            New Login
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
    
                <tr>
                  <td style="padding:0 22px;">
                    <div style="height:1px;background:#1e293b;"></div>
                  </td>
                </tr>
    
                <tr>
                  <td style="padding:22px;">
                    
                    <h1 style="
                      margin:0 0 16px 0;
                      font-size:20px;
                      line-height:1.3;
                      color:#e5e7eb;
                    ">
                      Hi ${name},
                    </h1>
    
                    <p style="
                      margin:0 0 20px 0;
                      font-size:14px;
                      line-height:1.6;
                      color:#94a3b8;
                    ">
                      We noticed a successful login to your account on the 
                      <b style="color:#e5e7eb;">${brandName}</b> portal.
                    </p>
    
                    <div style="
                      margin:0 0 24px 0;
                      padding:20px;
                      border-radius:12px;
                      background:#0f172a;
                      border:1px solid #1e293b;
                    ">
                      <div style="
                        font-size:12px;
                        color:#64748b;
                        margin-bottom:12px;
                        text-transform:uppercase;
                        letter-spacing:1px;
                        font-weight:600;
                      ">
                        Login Details
                      </div>
                      
                      <table width="100%" cellpadding="0" cellspacing="0">
                        ${detailsHtml}
                      </table>
                    </div>
    
                    <p style="
                      margin:0 0 8px 0;
                      font-size:14px;
                      line-height:1.6;
                      color:#94a3b8;
                    ">
                      <b style="color:#e5e7eb;">If this was you</b>, no action is needed.
                    </p>
    
                    <p style="
                      margin:0;
                      font-size:14px;
                      line-height:1.6;
                      color:#94a3b8;
                    ">
                      <b style="color:#f87171;">If you do not recognize this activity:</b><br/>
                      • Change your password immediately.<br/>
                      • Contact <a href="mailto:${supportEmail}" style="color:#38bdf8;text-decoration:none;">support</a>.
                    </p>
    
                  </td>
                </tr>
    
                <tr>
                  <td style="padding:0 22px 22px 22px;">
                    <div style="height:1px;background:#1e293b;margin-bottom:14px;"></div>
    
                    <p style="
                      margin:0;
                      font-size:12px;
                      line-height:1.6;
                      color:#64748b;
                    ">
                      Stay safe,<br/>
                      <b style="color:#94a3b8;">Security Team</b>
                    </p>
    
                    <p style="
                      margin:12px 0 0 0;
                      font-size:11px;
                      color:#475569;
                    ">
                      This is an automated security notification.
                      © ${new Date().getFullYear()} ${brandName}.
                    </p>
                  </td>
                </tr>
    
              </table>
              </td>
          </tr>
        </table>
      </div>
    `;
}

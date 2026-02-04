export function welcomeEmailTemplate(params: {
  fullName?: string;
  logoUrl: string; // rectangular official logo
  supportEmail?: string;
}) {
  const {
    fullName = "Student",
    logoUrl,
    supportEmail = "support@geclakhisarai.ac.in",
  } = params;

  const brandName = "Government Engineering College, Lakhisarai";

  return `
    <div style="margin:0;padding:0;background:#020617;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:24px 0;">
        <tr>
          <td align="center">
  
            <!-- Container -->
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
  
              <!-- Header -->
              <tr>
                <td style="padding:22px;">
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
              </tr>
  
              <!-- Divider -->
              <tr>
                <td style="padding:0 22px;">
                  <div style="height:1px;background:#1e293b;"></div>
                </td>
              </tr>
  
              <!-- Body -->
              <tr>
                <td style="padding:22px;">
                  <h1 style="
                    margin:0 0 12px 0;
                    font-size:22px;
                    line-height:1.3;
                    color:#e5e7eb;
                  ">
                    Welcome to ${brandName}
                  </h1>
  
                  <p style="
                    margin:0 0 14px 0;
                    font-size:14px;
                    line-height:1.6;
                    color:#94a3b8;
                  ">
                    Dear <b style="color:#e5e7eb;">${fullName}</b>,
                  </p>
  
                  <p style="
                    margin:0 0 16px 0;
                    font-size:14px;
                    line-height:1.6;
                    color:#94a3b8;
                  ">
                    Your account has been successfully created on the official
                    portal of <b style="color:#e5e7eb;">${brandName}</b>.
                  </p>
  
                  <div style="
                    margin:18px 0;
                    padding:16px;
                    border-radius:12px;
                    background:#0f172a;
                    border:1px solid #1e293b;
                  ">
                    <p style="
                      margin:0;
                      font-size:13px;
                      line-height:1.7;
                      color:#94a3b8;
                    ">
                      Using this portal, you can securely access academic services,
                      notifications, institutional updates, and other facilities
                      provided by the college administration.
                    </p>
                  </div>
  
                  <p style="
                    margin:0;
                    font-size:13px;
                    line-height:1.6;
                    color:#94a3b8;
                  ">
                    For security reasons, please keep your login credentials confidential
                    and do not share them with anyone.
                  </p>
                </td>
              </tr>
  
              <!-- Footer -->
              <tr>
                <td style="padding:0 22px 22px 22px;">
                  <div style="height:1px;background:#1e293b;margin-bottom:14px;"></div>
  
                  <p style="
                    margin:0;
                    font-size:12px;
                    line-height:1.6;
                    color:#94a3b8;
                  ">
                    This is an automated message from the official portal of
                    ${brandName}.
                  </p>
  
                  <p style="
                    margin:6px 0 0 0;
                    font-size:12px;
                    color:#94a3b8;
                  ">
                    For assistance, contact
                    <a href="mailto:${supportEmail}" style="color:#38bdf8;text-decoration:none;">
                      ${supportEmail}
                    </a>
                  </p>
  
                  <p style="
                    margin:8px 0 0 0;
                    font-size:12px;
                    color:#64748b;
                  ">
                    © ${new Date().getFullYear()} ${brandName}. All rights reserved.
                  </p>
                </td>
              </tr>
  
            </table>
            <!-- /Container -->
  
          </td>
        </tr>
      </table>
    </div>
    `;
}

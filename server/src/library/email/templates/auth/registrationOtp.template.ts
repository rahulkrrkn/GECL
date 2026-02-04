export function registrationOtpEmailTemplate(params: {
  otp: string;
  expiryMinutes?: number;
  logoUrl: string; // rectangular official logo URL
  supportEmail?: string;
}) {
  const {
    otp,
    expiryMinutes = 10,
    logoUrl,
    supportEmail = "support@geclakhisarai.ac.in",
  } = params;

  const brandName = "Government Engineering College, Lakhisarai";
  const purpose = "Account Registration";

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
                          background:rgba(16,185,129,0.15);
                          border:1px solid rgba(16,185,129,0.35);
                          color:#e5e7eb;
                          font-size:12px;
                        ">
                          ${purpose}
                        </span>
                      </td>
                    </tr>
                  </table>
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
                    Verify Your Email Address
                  </h1>
  
                  <p style="
                    margin:0 0 16px 0;
                    font-size:14px;
                    line-height:1.6;
                    color:#94a3b8;
                  ">
                    Welcome to <b style="color:#e5e7eb;">${brandName}</b>.
                    To complete your account registration on the college portal,
                    please use the One-Time Password (OTP) below.
                  </p>
  
                  <!-- OTP Box -->
                  <div style="
                    margin:20px 0;
                    padding:20px;
                    border-radius:12px;
                    background:#0f172a;
                    border:1px solid #1e293b;
                    text-align:center;
                  ">
                    <div style="
                      font-size:12px;
                      color:#94a3b8;
                      margin-bottom:10px;
                      text-transform:uppercase;
                      letter-spacing:1px;
                    ">
                      Registration OTP
                    </div>
  
                    <div style="
                      display:inline-block;
                      padding:14px 22px;
                      border-radius:12px;
                      background:rgba(16,185,129,0.18);
                      border:1px solid rgba(16,185,129,0.45);
                      font-size:28px;
                      font-weight:800;
                      letter-spacing:6px;
                      color:#e5e7eb;
                    ">
                      ${otp}
                    </div>
  
                    <div style="
                      margin-top:12px;
                      font-size:13px;
                      color:#94a3b8;
                    ">
                      Valid for ${expiryMinutes} minutes only
                    </div>
                  </div>
  
                  <p style="
                    margin:0;
                    font-size:13px;
                    line-height:1.6;
                    color:#94a3b8;
                  ">
                    If you did not request this registration, please ignore this email.
                    Do not share this OTP with anyone.
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
                    line-height:1.6;
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

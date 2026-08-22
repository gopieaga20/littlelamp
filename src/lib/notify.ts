// Notifies the counseling team when a new lead comes in.
// TODO: wire up Resend/SendGrid (see Tech_Stack.md §5) — until an API key is
// configured this just logs, so lead capture keeps working end-to-end without
// blocking on that integration.
export async function notifyNewLead(lead: { parentName: string; phone: string; childClass: string }) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.log(
      `[notify] New lead (email not configured): ${lead.parentName}, ${lead.phone}, ${lead.childClass}`
    );
    return;
  }

  // Example Resend integration once RESEND_API_KEY is set:
  // await fetch("https://api.resend.com/emails", {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${resendApiKey}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     from: "LittleLamp <leads@littlelamp.example.com>",
  //     to: siteConfig.email,
  //     subject: `New lead: ${lead.parentName}`,
  //     text: `${lead.parentName} (${lead.phone}) — ${lead.childClass}`,
  //   }),
  // });
}

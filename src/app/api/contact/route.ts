import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadFormSchema } from "@/lib/validation";
import { notifyNewLead } from "@/lib/notify";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = leadFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const { parentName, email, phone, childClass, message, source, company } = parsed.data;

  // Honeypot tripped — pretend success so bots don't learn to avoid this field.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        parentName,
        email: email || null,
        phone,
        childClass,
        message: message || null,
        source,
      },
    });

    await notifyNewLead(lead);

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (err) {
    console.error("[api/contact] Failed to save lead:", err);
    return NextResponse.json(
      { error: "We couldn't save your details right now. Please try WhatsApp or call us directly." },
      { status: 503 }
    );
  }
}

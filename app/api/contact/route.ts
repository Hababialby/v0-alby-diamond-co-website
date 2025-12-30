import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, phone, email, message, product, category, attachments } = data

    if (!name || !phone || !email) {
      return NextResponse.json({ success: false, error: "Name, phone, and email are required" }, { status: 400 })
    }

    const supabase = await createClient()

    // Save to database
    const { error: dbError } = await supabase.from("contact_submissions").insert({
      name,
      phone,
      email: email || null,
      message: message || null,
      product_name: product || null,
      product_category: category || null,
      attachments: attachments || [], // Save attachments to database along with other form data
    })

    if (dbError) {
      console.error("Database error:", dbError)
      throw new Error("Failed to save submission")
    }

    const resendApiKey = process.env.RESEND_API_KEY
    const businessEmail = process.env.BUSINESS_EMAIL

    if (!resendApiKey) {
      console.error("Resend API key not configured")
      return NextResponse.json({
        success: true,
        warning: "Form submitted but emails not sent - Resend not configured",
      })
    }

    // After verifying your domain at resend.com/domains, add RESEND_FROM_EMAIL to your environment variables
    // Example: RESEND_FROM_EMAIL=noreply@albydiamondco.com
    // Until then, it defaults to cool.alby1@gmail.com (testing mode)
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"
    const toEmail = process.env.RESEND_FROM_EMAIL ? businessEmail || "cool.alby1@gmail.com" : "cool.alby1@gmail.com"

    try {
      const resendAttachments =
        attachments?.map((att: any) => ({
          filename: att.filename,
          content: att.content,
        })) || []

      // Email to you (business owner) with submission details
      const ownerEmailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: `Alby Diamond Co <${fromEmail}>`,
          to: toEmail,
          subject: `New Contact Form Submission${product ? ` - ${product}` : ""}`,
          attachments: resendAttachments,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #1a1a1a; border-bottom: 2px solid #2C5F2D; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>
                <p style="margin: 10px 0;"><strong>Email:</strong> ${email || "Not provided"}</p>
                ${product ? `<p style="margin: 10px 0;"><strong>Product:</strong> ${product}</p>` : ""}
                ${category ? `<p style="margin: 10px 0;"><strong>Category:</strong> ${category}</p>` : ""}
                ${attachments && attachments.length > 0 ? `<p style="margin: 10px 0;"><strong>Attachments:</strong> ${attachments.length} file(s) attached</p>` : ""}
              </div>
              ${
                message
                  ? `
                <div style="margin: 20px 0;">
                  <p style="margin: 10px 0;"><strong>Message:</strong></p>
                  <p style="background: #f9f9f9; padding: 15px; border-radius: 8px; line-height: 1.6;">
                    ${message.replace(/\n/g, "<br>")}
                  </p>
                </div>
              `
                  : ""
              }
              <p style="color: #666; font-size: 12px; margin-top: 30px;">
                Submitted via Alby Diamond Co. contact form
              </p>
            </div>
          `,
        }),
      })

      if (!ownerEmailResponse.ok) {
        const errorText = await ownerEmailResponse.text()
        console.error("Failed to send owner email:", errorText)
      }

      if (email && process.env.RESEND_FROM_EMAIL) {
        const customerEmailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: `Alby Diamond Co <${fromEmail}>`,
            to: email,
            subject: "We Received Your Message - Alby Diamond Co.",
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #1a1a1a;">Thank You for Reaching Out</h2>
                <p style="color: #2a2a2a; line-height: 1.6;">
                  Hello ${name},
                </p>
                <p style="color: #2a2a2a; line-height: 1.6;">
                  We've received your message, and one of our designers will review it shortly. 
                  We'll reach out to you as soon as possible to discuss your jewelry needs.
                </p>
                <p style="color: #2a2a2a; line-height: 1.6;">
                  In the meantime, feel free to browse our Jewelry18 collection or reach out directly if you have any questions.
                </p>
                <p style="color: #2a2a2a; line-height: 1.6;">
                  Best regards,<br>
                  <strong>The Alby Diamond Co. Team</strong>
                </p>
              </div>
            `,
          }),
        })

        if (!customerEmailResponse.ok) {
          const errorText = await customerEmailResponse.text()
          console.error("Failed to send customer confirmation:", errorText)
        }
      }
    } catch (emailError) {
      console.error("Email sending error:", emailError)
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been received. We'll be in touch soon!",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit form. Please try again.",
      },
      { status: 500 },
    )
  }
}

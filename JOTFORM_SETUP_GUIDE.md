# Jotform Integration Setup Guide

This guide will walk you through setting up Jotform to receive contact form submissions from your Alby Diamond Co. website.

## What You'll Get

✅ All form submissions stored in Jotform database  
✅ Email notifications sent to you with submission details  
✅ Automatic confirmation email sent to customers  
✅ Beautiful success message on your website  
✅ Your current form design stays exactly the same

---

## Step 1: Create Jotform Account

1. Go to [jotform.com](https://www.jotform.com)
2. Sign up for a free account
3. Verify your email

---

## Step 2: Create Your Form in Jotform

1. Click "Create Form"
2. Choose "Start from Scratch"
3. Add these fields (in this order):
   - **Name** (Short Text)
   - **Phone** (Phone Number)
   - **Email** (Email)
   - **Message** (Long Text)
   - **Product** (Short Text - hidden field)
   - **Category** (Short Text - hidden field)

4. For the last two fields (Product & Category):
   - Click the field settings
   - Enable "Hide Field" option
   - These will be filled automatically from your website

---

## Step 3: Get Your Question IDs

After creating the form, you need to find the Question IDs:

1. In Jotform, go to your form
2. Click "Settings" → "Form Properties"
3. Look at the form fields - each has a Question ID (like q3_name, q4_phone, etc.)
4. Write down the numbers:
   - Name: Question __
   - Phone: Question __
   - Email: Question __
   - Message: Question __
   - Product: Question __
   - Category: Question __

---

## Step 4: Set Up Email Notifications

### For You (Business Owner):

1. In Jotform, click your form
2. Go to "Settings" → "Emails"
3. Click "Notification Email"
4. Configure:
   - **Send To:** your-email@albydiamond.com
   - **Subject:** New Contact Form Submission - {product}
   - **Email Content:** Include all fields
5. Save

### For Customer (Auto-Reply):

1. Still in "Emails" section
2. Click "Add Email" → "Autoresponder Email"
3. Configure:
   - **Send To:** Use the Email field from form
   - **Subject:** Thank you for contacting Alby Diamond Co.
   - **Message:**
     ```
     Hi {name},

     Thank you for reaching out to us! We've received your message about {product}.

     One of our expert designers will review your inquiry and get back to you as soon as possible.

     Best regards,
     Alby Diamond Co.
     ```
4. Save

---

## Step 5: Get Your API Credentials

1. Click your profile picture (top right)
2. Go to "API" or "Settings" → "API"
3. Click "Create New Key"
4. Copy your API Key (looks like: abc123def456...)
5. Go back to your form
6. Copy the Form ID (looks like: 231234567890123)

---

## Step 6: Add Credentials to Your Website

You need to add these environment variables to your Vercel project:

1. Go to [vercel.com](https://vercel.com)
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Add these two variables:

   **Variable 1:**
   - Name: `JOTFORM_API_KEY`
   - Value: [paste your API key from Step 5]

   **Variable 2:**
   - Name: `JOTFORM_FORM_ID`
   - Value: [paste your Form ID from Step 5]

5. Click "Save"
6. Redeploy your site (Vercel will do this automatically)

---

## Step 7: Update the Code with Your Question IDs

Send me the Question IDs you wrote down in Step 3, and I'll update the code to match your specific Jotform setup.

Example message to send me:
```
Here are my Jotform Question IDs:
- Name: Question 3
- Phone: Question 4
- Email: Question 5
- Message: Question 6
- Product: Question 7
- Category: Question 8
```

---

## Testing

After setup:

1. Go to your website
2. Fill out a contact form
3. Click submit
4. You should see: "Message Received!" success message
5. Check your email for the submission
6. Check Jotform dashboard for the submission
7. Customer should receive confirmation email

---

## Troubleshooting

**Form not submitting:**
- Check that environment variables are added correctly in Vercel
- Verify API key is correct
- Make sure Form ID is correct

**Not receiving emails:**
- Check Jotform email settings
- Check spam folder
- Verify email address in Jotform settings

**Customer not getting confirmation:**
- Check Autoresponder is enabled in Jotform
- Verify customer entered valid email
- Check their spam folder

---

## Need Help?

If you get stuck at any step, just tell me which step number you're on and what's happening, and I'll help you through it!

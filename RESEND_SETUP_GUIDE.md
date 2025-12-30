# Resend + Supabase Contact Form Setup Guide

Your contact form is now set up to use **Resend** (for emails) and **Supabase** (for storing submissions).

## ✅ What's Already Done

- ✅ Supabase database table created (`contact_submissions`)
- ✅ Contact form API route configured
- ✅ Form UI with success messages

## 📋 What You Need To Do

### Step 1: Sign Up for Resend (Free)

1. Go to [resend.com](https://resend.com)
2. Click "Get Started" and sign up (it's free for 3,000 emails/month)
3. Verify your email

### Step 2: Get Your Resend API Key

1. In Resend dashboard, click on "API Keys" in the sidebar
2. Click "Create API Key"
3. Give it a name like "Alby Diamond Co Production"
4. Copy the API key (starts with `re_`)

### Step 3: Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Click on "Settings" → "Environment Variables"
3. Add these two variables:

**Variable 1:**
- Name: `RESEND_API_KEY`
- Value: [paste your Resend API key from Step 2]

**Variable 2:**
- Name: `BUSINESS_EMAIL`
- Value: [your email address where you want to receive contact form submissions]

4. Click "Save" for each

### Step 4: Deploy

Push your code or redeploy from Vercel. The environment variables will be picked up automatically.

---

## 🧪 How To Test

### Test 1: Submit the Form

1. Go to your portfolio page
2. Click on any portfolio item
3. Scroll to the contact form
4. Fill it out with test data
5. Click "Contact Me"

### Test 2: Check Supabase

1. Go to your Supabase project
2. Click "Table Editor"
3. Select "contact_submissions" table
4. You should see your test submission

### Test 3: Check Your Email

1. Check the email you set as `BUSINESS_EMAIL`
2. You should receive an email with the submission details
3. If you provided an email in the form, check that inbox too for the confirmation

---

## 🎨 Customize Email Design (Optional)

The emails are currently basic HTML. To customize them:

1. Edit `app/api/contact/route.ts`
2. Find the `html:` sections
3. Update the styling and text as desired

---

## 📊 View Submissions in Supabase

**Option 1: Table Editor**
- Go to Supabase → Table Editor → contact_submissions
- View all submissions with filters and search

**Option 2: Build an Admin Panel** (I can help with this later)
- Create a custom admin page to view/manage submissions
- Add search, filters, and export features

---

## 🚀 Going Production with Custom Domain

Right now, emails come from `onboarding@resend.dev`. To use your own domain:

1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter your domain (e.g., `albydiamondco.com`)
4. Follow the DNS setup instructions
5. Update the `from:` field in the API route to use your domain:
   ```
   from: "Contact <contact@albydiamondco.com>"
   ```

---

## ❓ Troubleshooting

**Form submits but no email received:**
- Check that `RESEND_API_KEY` is set correctly
- Check Resend dashboard → Logs to see if emails were sent
- Check spam folder

**Database error:**
- Make sure the Supabase table was created successfully
- Check Supabase logs for errors

**Still having issues?**
- Check the browser console (F12) for errors
- Check Vercel function logs for server errors
- Let me know and I can help debug!

---

## 🎉 You're All Set!

Once you complete steps 1-4 above, your contact form will:
- ✅ Store submissions in Supabase
- ✅ Email you with submission details
- ✅ Send confirmation email to customers
- ✅ Show professional success messages
- ✅ Have NO watermarks or branding (unlike Jotform!)

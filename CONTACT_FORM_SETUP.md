# Contact Form Setup Instructions

The contact form is configured to use **Web3Forms** - a free, serverless form backend service that requires no backend code.

## Setup Steps (Takes 2 minutes)

### 1. Get Your Free Access Key

1. Go to [https://web3forms.com/](https://web3forms.com/)
2. Click "Get Started Free"
3. Enter your email: `shania@fromcampus2corporate.com`
4. They'll send you an access key instantly

### 2. Add the Access Key

Open `app/contact/page.tsx` and replace this line:

```typescript
access_key: "YOUR_WEB3FORMS_ACCESS_KEY", // Line 27
```

With your actual access key:

```typescript
access_key: "abc123-your-actual-key-here",
```

### 3. That's It!

The form will now:
- Send submissions directly to your email
- Show success message to users
- Have spam protection built-in
- Work with zero backend setup

## Alternative: Simple Mailto (Already Implemented)

If you prefer not to use Web3Forms, the form has a fallback that opens the user's email client with pre-filled information. This works but isn't as polished.

## Other Options

If you want more control:
- **Formspree**: Similar to Web3Forms, free tier available
- **EmailJS**: Client-side email sending
- **Supabase**: If you want to store submissions in a database
- **Resend**: Modern email API (requires backend setup)

Web3Forms is recommended for simplicity and reliability.

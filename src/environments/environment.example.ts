// Environment example configuration
// COPY this file to environment.ts and fill in your actual credentials

export const environment = {
  production: false,
  emailjs: {
    serviceId: 'REPLACE_WITH_YOUR_SERVICE_ID',
    templateId: 'REPLACE_WITH_YOUR_TEMPLATE_ID',
    publicKey: 'REPLACE_WITH_YOUR_PUBLIC_KEY'
  }
};

/*
=== HOW TO GET YOUR CREDENTIALS ===

1. Go to https://www.emailjs.com/ and sign up (free)
2. SERVICE_ID: Email Services → Your service → Copy ID
3. TEMPLATE_ID: Email Templates → Your template → Copy ID  
4. PUBLIC_KEY: Account → Copy Public Key

=== SECURITY NOTE ===
The public key is safe to expose in frontend code.
EmailJS is designed for this purpose.
*/

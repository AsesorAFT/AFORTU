// SECURITY TEMPLATE: Anti-Bot Protection for Public Forms
// Copy this template for any public forms (contact, registration, etc.)

/*
SECURITY REQUIREMENT: Anti-Bot Protection

For any publicly accessible form, implement the following security measures:

1. reCAPTCHA Integration:
```tsx
import { useRecaptcha } from '@/hooks/use-recaptcha';

const MyForm = () => {
  const { executeRecaptcha } = useRecaptcha();
  
  const handleSubmit = async (data) => {
    // Get reCAPTCHA token
    const recaptchaToken = await executeRecaptcha('form_submit');
    
    // Send with form data
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ...data, 
        recaptcha_token: recaptchaToken 
      })
    });
  };
};
```

2. Server-side verification:
```typescript
// /api/submit/route.ts
import { verifyRecaptcha } from '@/lib/recaptcha';

export async function POST(request: Request) {
  const body = await request.json();
  
  // Verify reCAPTCHA token
  const isValidRecaptcha = await verifyRecaptcha(body.recaptcha_token);
  if (!isValidRecaptcha) {
    return Response.json({ error: 'Invalid captcha' }, { status: 400 });
  }
  
  // Process form...
}
```

3. Rate Limiting:
- Implement rate limiting per IP
- Add progressive delays for repeated submissions
- Consider honeypot fields for additional protection

4. Form Validation:
- Always validate on server-side
- Sanitize all inputs
- Check for suspicious patterns

FORMS THAT NEED PROTECTION:
- [ ] Contact forms
- [ ] Registration forms  
- [ ] Login forms (after failed attempts)
- [ ] Appointment booking forms
- [ ] Any public feedback forms
- [ ] Newsletter subscription forms

*/
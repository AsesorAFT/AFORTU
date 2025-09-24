
import { NextResponse } from 'next/server';
import paypal from '@paypal/paypal-server-sdk';
// o
import { Subscriptions } from '@paypal/paypal-server-sdk';

/**
 * API endpoint to handle setting up a PayPal billing agreement/subscription.
 * In a real-world scenario, this endpoint would:
 * 1. Be authenticated to ensure only the legitimate user can create a subscription.
 * 2. Use the PayPal SDK to create a new billing plan and subscription.
 * 3. Redirect the user to a PayPal approval URL.
 * 4. Store the subscription details in the database (e.g., Firestore) associated with the user and invoice.
 */
export async function POST(request: Request) {
  const { invoiceId } = await request.json();

  if (!invoiceId) {
    return NextResponse.json({ error: 'Invoice ID is required' }, { status: 400 });
  }
  
  if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
      console.error("PayPal credentials are not set in the environment variables.");
      return NextResponse.json({ error: 'Payment gateway is not configured.' }, { status: 500 });
  }

  // 1. Configure PayPal environment (sandbox or live)
  const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID!, process.env.PAYPAL_CLIENT_SECRET!);
  const client = new paypal.core.PayPalHttpClient(environment);

  // 2. Create a subscription request
  // IMPORTANT: You need a pre-existing Plan ID from your PayPal developer account.
  // Go to your PayPal dashboard, create a billing plan, and get its ID.
  const planId = 'P-YOUR_PAYPAL_PLAN_ID'; // Replace with your actual plan ID

  const subscriptionRequest = new paypal.subscriptions.SubscriptionsCreateRequest();
  subscriptionRequest.requestBody({
      plan_id: planId,
      custom_id: invoiceId,
      application_context: {
        brand_name: 'AFORTU',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'SUBSCRIBE_NOW',
        return_url: `${process.env.NEXT_PUBLIC_URL}/billing?subscription_success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/billing?subscription_cancelled=true`,
      }
  });

  try {
    // 3. Execute the request
    const response = await client.execute(subscriptionRequest);
    const subscriptionId = response.result.id;
    const approvalUrl = response.result.links.find((link: any) => link.rel === 'approve')?.href;

    // In a real implementation, you would return the approval_url to the client.
    // The client would then redirect the user to this URL.
    return NextResponse.json({ 
        success: true, 
        approvalUrl: approvalUrl 
    });

  } catch (error: any) {
    console.error("Failed to create PayPal subscription:", error.message);
    // Return a structured error response
    return NextResponse.json({ error: 'Failed to set up recurring payment with PayPal.' }, { status: 500 });
  }
}

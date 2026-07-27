import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import crypto from 'node:crypto';

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');
const baseUrl = process.env.PUBLIC_BASE_URL || 'http://localhost:4242';
const platformPct = Number(process.env.PLATFORM_FEE_PERCENT || 10);

app.use(cors());
app.use('/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(express.static('.'));

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { name, unitAmount, quantity = 1, connectedAccountId, contractVersion = '1.0' } = req.body;
    if (!name || !Number.isInteger(unitAmount) || unitAmount < 50 || !connectedAccountId) {
      return res.status(400).json({ error: 'Valid item, amount in cents, and connected seller account are required.' });
    }
    const applicationFeeAmount = Math.max(100, Math.round(unitAmount * quantity * platformPct / 100));
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price_data: { currency: 'usd', product_data: { name }, unit_amount: unitAmount }, quantity }],
      payment_intent_data: {
        application_fee_amount: applicationFeeAmount,
        transfer_data: { destination: connectedAccountId },
        metadata: { contract_version: contractVersion }
      },
      metadata: { contract_version: contractVersion, terms_accepted: 'true' },
      success_url: `${baseUrl}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?checkout=cancelled`
    });
    res.json({ url: session.url });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.post('/webhook', async (req, res) => {
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) { return res.status(400).send(`Webhook Error: ${error.message}`); }
  if (event.type === 'checkout.session.completed' && event.data.object.payment_status === 'paid') {
    const session = event.data.object;
    const proof = crypto.createHash('sha256').update(JSON.stringify({
      session: session.id, amount: session.amount_total, currency: session.currency,
      contract: session.metadata?.contract_version, paid: true, created: session.created
    })).digest('hex');
    console.log('FULFILL_ORDER', { sessionId: session.id, proof });
    // Production: persist order, accepted terms version, timestamp, payout split, proof, and fulfillment status in a database.
  }
  res.json({ received: true });
});

const port = Number(process.env.PORT || 4242);
app.listen(port, '0.0.0.0', () => console.log(`Idea Kitchen running at ${baseUrl} on port ${port}`));

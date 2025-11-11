# Stripe Payment Setup Guide - Payment Links

This guide will help you set up Stripe to accept payments using Payment Links (the easiest option for static sites).

## Step 1: Create Your Stripe Account

1. Go to https://stripe.com
2. Click **"Start now"** and sign up
3. Complete your business information:
   - Business name: NerdbillyFab
   - Business type: Individual or LLC
   - Industry: Manufacturing/Hardware
   - Website: your domain

## Step 2: Get Your Stripe API Keys

1. In Stripe Dashboard, click **Developers** → **API keys**
2. You'll see two modes:
   - **Test mode** (for testing, uses fake cards)
   - **Live mode** (for real payments)
3. Start in **Test mode**
4. Copy your keys and add to `.env.local`:

```bash
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## Step 3: Create Payment Links for Your Products

For each product you sell, create a Stripe Payment Link:

### Creating a Payment Link:

1. In Stripe Dashboard, go to **Products** → **Product catalog**
2. Click **+ Add product**
3. Fill in:
   - **Name**: Your product name (e.g., "Peg Perego Front & Rear Wheel Kit")
   - **Description**: Short description
   - **Price**: $59.49 (or your product price)
   - **Currency**: USD
4. Click **Save product**

5. Now create a Payment Link:
   - Click on the product you just created
   - Click **Create payment link**
   - Configure:
     - **Quantity**: Allow customers to adjust (or fixed)
     - **After payment**: Redirect to success page
     - **Success URL**: `https://your-domain.com/payment-success?session_id={CHECKOUT_SESSION_ID}`
     - **Cancel URL**: `https://your-domain.com/checkout`
   - Click **Create link**

6. **Copy the Payment Link URL** (looks like: `https://buy.stripe.com/test_xxxxx`)

### Add the Payment Link to Your Product:

1. Go to your admin panel: http://localhost:3000/admin/products
2. Edit the product
3. Paste the Stripe Payment Link in the "Stripe Payment Link" field
4. Save the product

## Step 4: Test Your Payment Flow

### Test Cards (for Test Mode):

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires Auth**: `4000 0025 0000 3155`
- **Expiry**: Any future date
- **CVC**: Any 3 digits
- **ZIP**: Any 5 digits

### Testing Process:

1. Add a product to cart
2. Go to checkout
3. Click "Complete Purchase"
4. You'll be redirected to Stripe
5. Enter test card info above
6. Complete payment
7. You'll be redirected back to success page
8. Order should be created in Firestore

## Step 5: Set Up Shipping

Since you offer free shipping:

1. In Stripe Dashboard → **Settings** → **Shipping rates**
2. Add a shipping rate:
   - **Name**: Free Shipping
   - **Rate**: $0.00
   - **Delivery estimate**: 3-5 business days (after 1-2 week processing)
3. Enable this rate for all payment links

## Step 6: Set Up Tax (Optional but Recommended)

**Option A: Use Stripe Tax (Automatic)**
1. Go to **Settings** → **Tax**
2. Enable **Stripe Tax**
3. Cost: $0.50 per transaction
4. Automatically calculates tax for all US states

**Option B: Manual Tax Rates**
1. Go to **Settings** → **Tax rates**
2. Add rates for states where you have nexus
3. Example: Missouri 4.225%

**Option C: No Tax Collection**
- If you're under sales tax threshold or tax-exempt
- Note: Most states require tax collection once you hit ~$100k/year

## Step 7: Go Live (When Ready)

⚠️ **Only do this when you're ready for real orders!**

1. Complete Stripe account verification:
   - Business details
   - Bank account (for payouts)
   - Identity verification
2. Switch from **Test mode** to **Live mode** in dashboard
3. Recreate all payment links in Live mode
4. Update `.env.local` with live keys:
   ```bash
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   ```
5. Update all products with live payment links
6. Test with a real card (you can refund yourself)
7. Start selling!

## Step 8: Monitor Orders

### In Stripe Dashboard:
- **Payments** → View all transactions
- **Customers** → See customer info
- **Products** → Manage products and prices

### In Your Admin Panel:
- **Orders** → View orders from Firestore
- Track fulfillment status
- Add tracking numbers

## Common Issues & Solutions

### Issue: "No API key provided"
**Solution**: Check `.env.local` has correct Stripe keys and restart dev server

### Issue: Payment succeeded but no order created
**Solution**: Check Firestore security rules allow authenticated writes to orders

### Issue: Customer stuck on Stripe page
**Solution**: Check your Success URL is correct and accessible

### Issue: Wrong amount charged
**Solution**: Update product price in Stripe dashboard and create new payment link

## Security Checklist

✅ Never commit Stripe secret keys to GitHub
✅ Use test mode until ready to go live
✅ Set up Firestore security rules properly
✅ Use HTTPS in production (Firebase Hosting does this automatically)
✅ Test refund process
✅ Set up email notifications for failed payments

## Stripe Fees

- **2.9% + $0.30** per successful transaction
- Example: $59.49 product = $2.03 fee, you receive $57.46
- No monthly fees, no setup fees
- Payouts to your bank account: 2 business days

## Getting Help

- **Stripe Support**: https://support.stripe.com
- **Stripe Documentation**: https://stripe.com/docs
- **Test your integration**: https://stripe.com/docs/testing

---

## Quick Reference

**Test Card**: 4242 4242 4242 4242
**Dashboard**: https://dashboard.stripe.com
**Create Payment Link**: Products → Product catalog → Create payment link
**View Payments**: Payments tab
**Bank Payouts**: Balance → Payouts

---

You're ready to start accepting payments! 🎉

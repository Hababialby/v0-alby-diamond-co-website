# Shopify Integration Setup Guide

Your Jewelry18 shop is now configured to connect to Shopify! Follow these steps to complete the setup.

## Step 1: Create Your Shopify Store

1. Go to [shopify.com](https://www.shopify.com) and sign up for an account
2. Choose a store name (e.g., "alby-diamonds")
3. Your store URL will be: `alby-diamonds.myshopify.com`

## Step 2: Add Your Store Domain to Environment Variables

In your Vercel project (or local development):

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add this variable:

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com
```

**Examples:**
- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=alby-diamonds.myshopify.com`
- Or just: `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=alby-diamonds` (it will auto-add .myshopify.com)

## Step 3: Add Products in Shopify

1. Log into your Shopify admin dashboard
2. Go to "Products" → "Add product"
3. For each jewelry item, add:
   - Product title
   - Description
   - Price
   - High-quality images
   - Product type (e.g., "Earrings", "Engagement Rings", "Bracelets", "Necklaces", "Wedding Bands")
   - Inventory quantity

## Step 4: Organize with Collections (Optional)

1. Go to "Products" → "Collections"
2. Create collections like:
   - Earrings
   - Engagement Rings
   - Bracelets
   - Necklaces
   - Wedding Bands

These will automatically appear as category filters on your shop page!

## Step 5: Configure Checkout

Your checkout is already configured to use Shopify's embedded checkout:

1. Customers browse products on your beautiful Jewelry18 page
2. When they click "Buy Now" or "Add to Cart", Shopify handles the cart
3. Checkout happens through Shopify (secure and PCI compliant)
4. URL stays on your domain throughout

### Payment Setup in Shopify:

1. Go to "Settings" → "Payments"
2. Enable "Shopify Payments" (recommended - no extra transaction fees)
   - Or connect another payment processor (Stripe, PayPal, etc.)
3. Complete your business information

## How It Works

### Customer Experience:
1. Browse jewelry on `yoursite.com/shop`
2. Click on a product to view details
3. Add to cart
4. Proceed to checkout (powered by Shopify)
5. Complete purchase with Shop Pay, credit card, or other payment methods

### Your Experience:
1. Manage all products in Shopify dashboard
2. Track orders, inventory, and fulfillment in Shopify
3. Get email notifications for new orders
4. Ship products and update tracking in Shopify
5. Money automatically deposited to your bank account

## Advanced Features Available

### Variants
Add product variants in Shopify (e.g., different ring sizes, metal types):
- The integration automatically handles variants
- Customers can select options before adding to cart

### Inventory Management
- Set stock quantities in Shopify
- Products automatically show "Out of Stock" when inventory is 0
- Shopify tracks inventory as orders come in

### Shop Pay
- Customers with Shop Pay accounts get 1-click checkout
- Saves their payment and shipping info
- Faster checkout = higher conversion rates

## Testing Your Setup

1. Add at least one product in Shopify
2. Visit your `/shop` page
3. You should see your products displayed with your beautiful design
4. Click a product to view details
5. Add to cart and test checkout (use Shopify's test mode)

## Troubleshooting

**"Shopify Store Not Connected" error?**
- Make sure you added `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` as an environment variable
- Check the spelling of your store domain
- Redeploy your site after adding the variable

**Products not showing up?**
- Make sure products are set to "Active" in Shopify
- Check that products are available on "Online Store" sales channel
- Verify your store domain is correct

**Need help?**
- Shopify has 24/7 support
- Their documentation is excellent: [shopify.dev](https://shopify.dev)

## What's Already Built For You

✅ Product fetching from Shopify
✅ Collection/category filtering
✅ Product cards with images and pricing
✅ Beautiful Jewelry18 page design
✅ Responsive layout
✅ Cart integration ready
✅ Checkout flow connected
✅ Automatic currency formatting
✅ Stock status display

## Next Steps

Once your store is set up, you can:
1. Add your actual jewelry products with professional photos
2. Configure shipping rates in Shopify
3. Set up tax calculations
4. Customize email notifications
5. Add discount codes
6. Track analytics and sales

All product management happens in Shopify - your website automatically updates!

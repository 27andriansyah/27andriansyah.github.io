# 27Mart Marketplace

Production-oriented marketplace foundation using **Next.js 15 + AWS Amplify Hosting + Supabase**.

## Architecture

Visitor → AWS Amplify/CDN → Next.js → Supabase → payment / delivery / WhatsApp integrations.

## Included

- Mobile-first marketplace storefront
- Search and category filtering
- Product cards with promo pricing
- Cart with quantity controls and totals
- Checkout-ready flow
- Next.js SSR deployment configuration for AWS Amplify
- Supabase packages ready for database/auth/storage/realtime integration

## Production environment

Configure these environment variables in AWS Amplify when Supabase is connected:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`

Never expose a Supabase service-role key in browser code.

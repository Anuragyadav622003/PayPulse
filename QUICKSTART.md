# PayPulse - Quick Start Guide

Get PayPulse up and running in 5 minutes! ⚡

## 1️⃣ Prerequisites (Prepare These First)

You'll need accounts on these services:
- [Supabase](https://supabase.com) - Create free account
- [Stripe](https://stripe.com) - Create free account  
- [Node.js 18+](https://nodejs.org) - Install on your computer

## 2️⃣ Clone & Setup

```bash
# Clone or download the PayPulse project
git clone <repository-url>
cd paypulse

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

## 3️⃣ Configure Supabase

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project
3. Wait for setup to complete
4. Go to **Settings → API** to find:
   - `Project URL` → Copy to `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → Copy to `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Go to **SQL Editor** and paste the SQL from `scripts/setup-database.sql`
6. Run the SQL to create tables

## 4️⃣ Configure Stripe

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Make sure you're in **Test Mode** (toggle in top right)
3. Go to **Developers → API Keys** to find:
   - `Publishable key` → Copy to `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `Secret key` → Copy to `STRIPE_SECRET_KEY`
4. Go to **Webhooks** and create endpoint:
   - Endpoint URL: `http://localhost:3000/api/webhooks/stripe`
   - Events: `payment_intent.succeeded`, `charge.refunded`
   - Copy signing secret → `STRIPE_WEBHOOK_SECRET`

## 5️⃣ Environment Variables

Your `.env.local` should look like:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

## 6️⃣ Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser

## 🎯 First Steps in the App

### Create Account
1. Click "Get Started" or go to `/auth/signup`
2. Fill in email and password
3. Click "Sign Up"

### Explore Dashboard
- **Dashboard** - See overview and stats
- **Invoices** - Create new invoice
- **Clients** - Add your first client
- **Profile** - Update your information

### Create Test Invoice
1. Go to **Invoices** → **New Invoice**
2. Fill in client info
3. Add items/amounts
4. Set due date
5. Click "Create Invoice"

### Test Payment
1. Open invoice detail
2. Click "Pay Now"
3. Use Stripe test card: `4242 4242 4242 4242`
4. Use any future date for expiry
5. Use any 3-digit CVC
6. Payment should succeed

## 📚 Documentation

- **README.md** - Full documentation
- **FEATURES.md** - Complete feature list
- **DEPLOYMENT.md** - Deploy to production
- **ENHANCEMENTS.md** - What's new
- **QUICKSTART.md** - This guide

## 🚀 Deploy to Production

Ready to go live? Follow [DEPLOYMENT.md](./DEPLOYMENT.md)

Quick steps:
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy
5. Update Stripe webhook URL

## 🆘 Troubleshooting

### Can't login?
- Check Supabase credentials in `.env.local`
- Verify user was created in Supabase Auth
- Check browser console for errors

### Payments not working?
- Verify Stripe keys are correct
- Make sure you're using test mode
- Check webhook is configured
- Review Stripe dashboard logs

### Database error?
- Verify SQL script was executed
- Check Supabase connection
- Review RLS policies are enabled

### Need help?
- Check the full README.md
- Review FEATURES.md for feature details
- Follow DEPLOYMENT.md for deployment
- Check browser console for error messages

## 💡 Pro Tips

1. **Use Stripe Test Card**: `4242 4242 4242 4242` for testing
2. **Mock Data**: Invoice detail page has sample data
3. **Client Portal**: Visit `/portal/demo` to see client view
4. **Development**: Use `npm run dev` for hot reload
5. **Production Build**: Run `npm run build && npm start`

## 📊 What You Get

✅ Complete invoice management  
✅ Stripe payment integration  
✅ Client portal  
✅ Email reminders  
✅ Analytics dashboard  
✅ User authentication  
✅ Responsive design  
✅ Professional UI  

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

## 🔗 Quick Links

- 🏠 [Homepage](http://localhost:3000)
- 📊 [Dashboard](http://localhost:3000/dashboard)
- 📄 [Invoices](http://localhost:3000/dashboard/invoices)
- ⚙️ [Settings](http://localhost:3000/dashboard/settings)
- 👤 [Profile](http://localhost:3000/dashboard/profile)

## 📝 Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm start               # Start production server

# Code Quality
npm run lint            # Run linter
npm run format          # Format code

# Database
# Use Supabase Dashboard SQL Editor for migrations
```

## ✨ Next Steps

1. ✅ Complete this quickstart
2. Explore all features
3. Customize to your needs
4. Deploy to production
5. Start using PayPulse!

---

**Enjoy using PayPulse! 🎉**

Questions? Check the full documentation or create an issue on GitHub.

# PayPulse - Modern Invoice & Payment Management SaaS

A production-ready SaaS application for invoice management, payment processing, and business analytics built with Next.js 16, Supabase, and Stripe.

## Features

### Core Features
- **Invoice Management** - Create, send, and track invoices with customizable templates
- **Payment Processing** - Integrated Stripe payment gateway for secure transactions
- **Client Management** - Manage client information and payment history
- **Email Reminders** - Automated payment reminders for overdue invoices
- **Analytics Dashboard** - Comprehensive business insights and reporting
- **Payment Tracking** - Real-time payment status and history

### User Features
- **Professional Dashboard** - At-a-glance overview of business metrics
- **Client Portal** - Public portal for clients to view and pay invoices
- **Invoice Details** - Detailed invoice view with payment options
- **Profile Management** - User profile, password, and notification settings
- **PDF Export** - Download invoices as PDF documents
- **Email Notifications** - Send invoices and reminders via email

### Security & Reliability
- **Row Level Security (RLS)** - Database-level data isolation
- **Authentication** - Supabase Auth with secure sessions
- **Encrypted Data** - All sensitive data encrypted in transit and at rest
- **Error Handling** - Comprehensive error pages and logging
- **Form Validation** - Client and server-side validation
- **Production Ready** - Built with enterprise-grade practices

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **UI Components**: shadcn/ui, Tailwind CSS
- **Database**: Supabase PostgreSQL with RLS
- **Authentication**: Supabase Auth
- **Payments**: Stripe Checkout & Webhooks
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Hosting**: Vercel (recommended)

## Getting Started

### Prerequisites
- Node.js 18+ (Recommended 20+)
- npm or yarn
- Git

### Installation

1. **Clone or download the project**
```bash
git clone <repository-url>
cd paypulse
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── api/               # API routes for invoices, payments, webhooks
│   ├── auth/              # Authentication pages (signup, login)
│   ├── dashboard/         # Protected dashboard routes
│   ├── portal/            # Public client portal
│   ├── layout.tsx         # Root layout with Toaster
│   └── page.tsx           # Landing page
├── components/
│   ├── dashboard/         # Dashboard-specific components
│   ├── ui/                # shadcn/ui components
│   ├── payment-button.tsx # Stripe payment button
│   └── skeletons.tsx      # Loading skeletons
├── lib/
│   ├── supabase.ts        # Supabase client setup
│   ├── types.ts           # TypeScript type definitions
│   └── validation.ts      # Form validation utilities
└── scripts/
    └── setup-database.sql # Database schema setup
```

## Database Schema

The application uses the following main tables:

- **users** - User accounts (Supabase Auth)
- **clients** - Client information
- **invoices** - Invoice records with details
- **payments** - Payment transaction history
- **email_reminders** - Scheduled email reminders
- **audit_logs** - System audit trail

All tables include RLS policies for data isolation.

## Key Pages & Routes

### Public Routes
- `/` - Landing page
- `/auth/signup` - User registration
- `/auth/login` - User login
- `/portal/[token]` - Client invoice portal

### Protected Routes
- `/dashboard` - Main dashboard
- `/dashboard/invoices` - Invoice management
- `/dashboard/invoices/[id]` - Invoice detail
- `/dashboard/invoices/new` - Create invoice
- `/dashboard/clients` - Client management
- `/dashboard/payments` - Payment history
- `/dashboard/reminders` - Reminder management
- `/dashboard/analytics` - Analytics & reports
- `/dashboard/profile` - User profile
- `/dashboard/settings` - Settings

### API Routes
- `POST /api/invoices` - Create invoice
- `GET /api/invoices` - List invoices
- `POST /api/payments/create-checkout` - Create Stripe checkout
- `POST /api/webhooks/stripe` - Stripe webhook handler
- `POST /api/reminders/send` - Send email reminders
- `GET /api/invoices/[id]/pdf` - Generate invoice PDF

## Integration Guides

### Stripe Setup

1. Create a [Stripe account](https://stripe.com)
2. Get your API keys from the dashboard
3. Set up webhook endpoint pointing to `/api/webhooks/stripe`
4. Update `.env.local` with your Stripe keys

### Supabase Setup

1. Create a [Supabase project](https://supabase.com)
2. Run the SQL migration from `scripts/setup-database.sql`
3. Get your project URL and API key
4. Update `.env.local` with Supabase credentials

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel project settings
4. Deploy with a single click

```bash
vercel
```

### Deploy to Other Platforms

The application can be deployed to any platform supporting Node.js 18+:
- Railway
- Render
- DigitalOcean
- AWS
- Google Cloud

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Format code
npm run format
```

### Database Migrations

To update the database schema:

1. Create a new SQL file in `scripts/`
2. Execute via Supabase dashboard or SQL editor
3. Test changes in development

## Performance Optimizations

- Server-side rendering for faster initial loads
- Image optimization with Next.js Image component
- Tailwind CSS for minimal CSS footprint
- Recharts for efficient data visualization
- Toast notifications for real-time feedback
- Skeleton loaders for better UX during data fetching

## Security Best Practices

- ✅ Environment variables for sensitive data
- ✅ Row Level Security on all database tables
- ✅ Input validation and sanitization
- ✅ Secure session management
- ✅ HTTPS/TLS encryption
- ✅ Webhook signature verification
- ✅ Rate limiting ready (implement as needed)
- ✅ CSRF protection

## Troubleshooting

### Authentication Issues
- Verify Supabase credentials in `.env.local`
- Check that database RLS policies are enabled
- Ensure user exists in Supabase Auth table

### Payment Issues
- Verify Stripe API keys are correct
- Check webhook configuration
- Test with Stripe test mode credentials
- Monitor Stripe dashboard for errors

### Database Issues
- Ensure all migrations have run
- Check RLS policies are correctly configured
- Verify database connection string

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For support, email support@paypulse.com or open an issue on GitHub.

## License

This project is licensed under the MIT License.

## Roadmap

- [ ] Multi-currency support
- [ ] Advanced reporting and export
- [ ] Recurring invoices
- [ ] Invoice templates
- [ ] Team collaboration
- [ ] Mobile app
- [ ] API for integrations
- [ ] Advanced analytics with machine learning

## Credits

Built with [Next.js](https://nextjs.org), [Supabase](https://supabase.com), [Stripe](https://stripe.com), and [shadcn/ui](https://ui.shadcn.com).

---

**PayPulse** - Making invoicing simple, secure, and streamlined.

# PayPulse Deployment Guide

## Pre-Deployment Checklist

### Development Setup
- [ ] Clone/download the repository
- [ ] Run `npm install` to install dependencies
- [ ] Copy `.env.example` to `.env.local`
- [ ] Fill in all required environment variables
- [ ] Run `npm run dev` and verify everything works locally

### Supabase Setup
- [ ] Create a Supabase project at https://supabase.com
- [ ] Get your project URL and API key
- [ ] Create a `.sql` migration file or use the provided `scripts/setup-database.sql`
- [ ] Run the database migration in Supabase SQL editor
- [ ] Set up Row Level Security (RLS) policies
- [ ] Create a Supabase auth user for testing
- [ ] Add environment variables to `.env.local`:
  ```
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
  ```

### Stripe Setup
- [ ] Create a Stripe account at https://stripe.com
- [ ] Get your API keys from the dashboard
- [ ] Enable Stripe test mode for development
- [ ] Create a Stripe webhook endpoint:
  - Endpoint URL: `https://your-domain/api/webhooks/stripe`
  - Events to listen for:
    - `payment_intent.succeeded`
    - `charge.refunded`
- [ ] Get the webhook signing secret
- [ ] Add environment variables to `.env.local`:
  ```
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
  STRIPE_SECRET_KEY=sk_test_xxx
  STRIPE_WEBHOOK_SECRET=whsec_xxx
  ```

### Testing
- [ ] Test user signup/login flow
- [ ] Create a test invoice
- [ ] Test invoice view and edit
- [ ] Test payment flow with Stripe test card (4242 4242 4242 4242)
- [ ] Verify email reminders are sent
- [ ] Test error pages (404, 500)
- [ ] Test logout functionality
- [ ] Test responsive design on mobile
- [ ] Verify dark mode works correctly

## Deployment Steps

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial PayPulse deployment"
git push origin main
```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Select PayPulse project

3. **Configure Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add all variables from `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
     - `STRIPE_SECRET_KEY`
     - `STRIPE_WEBHOOK_SECRET`

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be available at `https://your-project.vercel.app`

5. **Update Stripe Webhook**
   - Go to Stripe Dashboard → Webhooks
   - Update webhook endpoint to: `https://your-project.vercel.app/api/webhooks/stripe`

### Deploy to Other Platforms

#### Railway
1. Sign up at https://railway.app
2. Create new project → GitHub repo
3. Add environment variables
4. Deploy

#### Render
1. Sign up at https://render.com
2. New Web Service → GitHub repo
3. Configure environment variables
4. Deploy

#### DigitalOcean App Platform
1. Sign up at https://www.digitalocean.com
2. Create App → GitHub integration
3. Add environment variables
4. Deploy

## Post-Deployment

### Production Configuration

1. **Update Stripe to Production**
   - Switch Stripe keys to production keys
   - Update webhook to production URL
   - Verify webhook in Stripe dashboard

2. **Update Supabase**
   - Verify all RLS policies are enabled
   - Enable auth email confirmations if desired
   - Set up custom email templates

3. **Domain Configuration**
   - For Vercel: Add custom domain in project settings
   - For other platforms: Update DNS records

4. **SSL/TLS**
   - Verify HTTPS is enabled (automatic on Vercel)
   - Install SSL certificate if using custom domain

5. **Monitoring**
   - Set up error tracking (optional):
     - Sentry
     - LogRocket
     - DataDog
   - Monitor Stripe transactions
   - Monitor database performance

### Security Hardening

- [ ] Enable 2FA on all accounts
- [ ] Set strong passwords
- [ ] Review database RLS policies
- [ ] Enable API rate limiting
- [ ] Set up DDoS protection (Cloudflare optional)
- [ ] Enable CORS if needed
- [ ] Set security headers:
  ```
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  ```

### Backup & Recovery

- [ ] Set up Supabase automated backups
- [ ] Test backup restoration process
- [ ] Document disaster recovery procedure
- [ ] Set up monitoring alerts

## Performance Optimization

1. **Image Optimization**
   - Ensure all images use Next.js Image component
   - Compress images before upload
   - Use WebP format where possible

2. **Database Optimization**
   - Add database indexes on frequently queried columns
   - Monitor slow queries
   - Optimize database queries

3. **CDN Configuration**
   - Enable Vercel Edge Network (automatic)
   - Configure cache headers
   - Use Cloudflare for additional optimization (optional)

## Monitoring & Maintenance

### Regular Tasks
- [ ] Monitor error logs weekly
- [ ] Review Stripe transaction reports
- [ ] Check database performance
- [ ] Update dependencies monthly
- [ ] Review and update security policies

### Alert Configuration
- [ ] High error rate alerts
- [ ] Payment processing failures
- [ ] Database connection errors
- [ ] API response time degradation

## Scaling Considerations

As your user base grows:
1. **Database Scaling**
   - Monitor Supabase usage
   - Consider upgrading plan if needed

2. **API Scaling**
   - Monitor API response times
   - Consider caching strategies
   - Implement rate limiting

3. **Storage Scaling**
   - Monitor storage usage
   - Archive old invoices if needed
   - Implement data retention policies

## Troubleshooting Deployment Issues

### Stripe Webhook Not Working
- Verify webhook URL is correct
- Check webhook signing secret
- Review Stripe logs for errors
- Ensure API route is properly configured

### Supabase Connection Issues
- Verify credentials are correct
- Check network connectivity
- Review RLS policies
- Check user permissions

### Email Reminders Not Sending
- Verify email service configuration
- Check email queue
- Review email logs
- Verify recipient email addresses

### Performance Issues
- Use Vercel Analytics
- Check database query performance
- Review application logs
- Monitor API response times

## Support & Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Supabase Documentation**: https://supabase.com/docs
- **Stripe Documentation**: https://stripe.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **PayPulse Issues**: GitHub issues

## Version Control & Updates

1. Always use version tags:
```bash
git tag -a v1.0.0 -m "Production release"
git push origin v1.0.0
```

2. Keep dependencies updated:
```bash
npm update
npm audit fix
```

3. Test updates in staging before production

## Rollback Procedure

If you need to rollback a deployment:

1. **On Vercel**
   - Go to Deployments tab
   - Click "Redeploy" on a previous deployment

2. **Manual Rollback**
   - Revert commits: `git revert <commit-hash>`
   - Push to trigger new deployment

---

**You're ready to deploy PayPulse to production!**

For questions or issues, refer to the README.md and FEATURES.md files.

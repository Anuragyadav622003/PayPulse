import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, Zap, BarChart3, Lock, Clock } from 'lucide-react'

export const metadata = {
  title: 'PayPulse - Modern Invoice & Payment Management',
  description: 'Send invoices, track payments, and manage your business finances with PayPulse. Simple, secure, and professional.',
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            PayPulse
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-slate-300 hover:text-white transition">
              Sign In
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center space-y-8">
          <h1 className="text-5xl sm:text-7xl font-bold leading-tight">
            Invoice Management,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> Simplified</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Send professional invoices, track payments in real-time, and never miss a deadline. PayPulse helps you get paid faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 px-8 bg-transparent">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-slate-600 transition">
            <Zap className="h-8 w-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quick & Easy</h3>
            <p className="text-slate-400">Create and send professional invoices in seconds. No complicated setup required.</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-slate-600 transition">
            <BarChart3 className="h-8 w-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-Time Analytics</h3>
            <p className="text-slate-400">Track your business performance with comprehensive dashboards and detailed reports.</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-slate-600 transition">
            <Lock className="h-8 w-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
            <p className="text-slate-400">Bank-level security with encrypted data and automatic backups for peace of mind.</p>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Everything you need to get paid</h2>
            <div className="space-y-4">
              {[
                'Create and customize invoices',
                'Accept payments via Stripe',
                'Automated payment reminders',
                'Client portal access',
                'Multi-currency support',
                'Tax and VAT calculations',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
            <Clock className="h-16 w-16 text-blue-400/20 mb-4" />
            <p className="text-slate-400">Average payment time reduced by 40% with automated reminders and payment tracking.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-slate-400">Choose the plan that works best for your business</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-2">Starter</h3>
            <p className="text-slate-400 mb-6">Perfect for freelancers and small businesses</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$29</span>
              <span className="text-slate-400">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-green-400" />
                Up to 50 invoices/month
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-green-400" />
                Basic analytics
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-green-400" />
                Email support
              </li>
            </ul>
            <Button className="w-full bg-slate-700 hover:bg-slate-600">Get Started</Button>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg p-8 relative">
            <div className="absolute top-4 right-4 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-sm font-semibold">
              Popular
            </div>
            <h3 className="text-2xl font-bold mb-2">Professional</h3>
            <p className="text-blue-100 mb-6">For growing businesses</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$79</span>
              <span className="text-blue-100">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                Unlimited invoices
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                Advanced analytics & reports
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                Priority support
              </li>
            </ul>
            <Button className="w-full bg-white text-blue-600 hover:bg-slate-100">Get Started</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to streamline your invoicing?</h2>
          <p className="text-lg text-blue-100 mb-8">Join thousands of businesses getting paid faster with PayPulse</p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
              Start Your Free Trial Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-20 py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                PayPulse
              </Link>
              <p className="text-slate-400 mt-2">Modern invoice management for modern businesses.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
            <p>&copy; 2024 PayPulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

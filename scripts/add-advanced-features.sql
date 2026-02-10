-- Advanced Features Database Migration for PayPulse

-- 1. RECURRING INVOICES TABLE
CREATE TABLE IF NOT EXISTS recurring_invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  template_invoice_id UUID REFERENCES invoices(id) ON DELETE SET NULL,
  frequency VARCHAR(50) NOT NULL, -- 'weekly', 'biweekly', 'monthly', 'quarterly', 'annually'
  start_date DATE NOT NULL,
  end_date DATE,
  next_invoice_date DATE,
  is_active BOOLEAN DEFAULT true,
  auto_send BOOLEAN DEFAULT false,
  auto_pay_reminder BOOLEAN DEFAULT true,
  reminder_days_before INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. INVOICE TEMPLATES TABLE
CREATE TABLE IF NOT EXISTS invoice_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  logo_url TEXT,
  brand_color VARCHAR(7), -- hex color
  font_family VARCHAR(100),
  layout_style VARCHAR(50), -- 'modern', 'classic', 'minimal'
  header_text TEXT,
  footer_text TEXT,
  terms_conditions TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. CURRENCIES TABLE
CREATE TABLE IF NOT EXISTS currencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(3) NOT NULL UNIQUE, -- 'USD', 'INR', 'EUR', etc.
  name VARCHAR(100) NOT NULL,
  symbol VARCHAR(10),
  exchange_rate DECIMAL(10, 4) DEFAULT 1.0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. USER CURRENCIES (User preferred currencies)
CREATE TABLE IF NOT EXISTS user_currencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  currency_id UUID NOT NULL REFERENCES currencies(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, currency_id)
);

-- Update invoices table to include currency support
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS currency_code VARCHAR(3) DEFAULT 'USD';
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS exchange_rate DECIMAL(10, 4) DEFAULT 1.0;

-- 5. TAX PROFILES TABLE (for GST/tax configurations)
CREATE TABLE IF NOT EXISTS tax_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  tax_type VARCHAR(50), -- 'GST', 'VAT', 'Sales Tax', etc.
  tax_id VARCHAR(50), -- GST/Tax registration number
  tax_rate DECIMAL(5, 2) NOT NULL,
  is_default BOOLEAN DEFAULT false,
  country VARCHAR(100),
  state VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Update invoices to link to tax profile
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS tax_profile_id UUID REFERENCES tax_profiles(id) ON DELETE SET NULL;

-- 6. CUSTOM EMAIL TEMPLATES TABLE
CREATE TABLE IF NOT EXISTS email_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  email_type VARCHAR(50), -- 'invoice_sent', 'payment_reminder', 'payment_received', 'late_payment'
  subject VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. CLIENT PORTAL USERS TABLE
CREATE TABLE IF NOT EXISTS client_portal_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255),
  access_token VARCHAR(500),
  token_expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. TIME TRACKING TABLE
CREATE TABLE IF NOT EXISTS time_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  project_name VARCHAR(255),
  description TEXT,
  hours DECIMAL(8, 2) NOT NULL,
  rate DECIMAL(12, 2),
  date DATE NOT NULL,
  is_billable BOOLEAN DEFAULT true,
  invoice_id UUID REFERENCES invoices(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. EXPENSE TRACKING TABLE
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  category VARCHAR(100),
  description TEXT NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  currency_code VARCHAR(3) DEFAULT 'USD',
  date DATE NOT NULL,
  receipt_url TEXT,
  is_billable BOOLEAN DEFAULT false,
  invoice_id UUID REFERENCES invoices(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. LATE FEES & FINANCE CHARGES TABLE
CREATE TABLE IF NOT EXISTS late_fee_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  fee_type VARCHAR(50), -- 'fixed' or 'percentage'
  fee_amount DECIMAL(12, 2) NOT NULL,
  days_overdue INTEGER, -- apply fee after X days
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Update invoices to track late fees
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS late_fee_applied DECIMAL(12, 2) DEFAULT 0;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS is_late BOOLEAN DEFAULT false;

-- 11. ROLES & PERMISSIONS TABLE
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  permissions JSONB DEFAULT '{}',
  is_custom BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(workspace_id, name)
);

-- 12. USER ROLES TABLE (assign roles to team members)
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  assigned_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, workspace_id)
);

-- 13. APPROVAL WORKFLOWS TABLE
CREATE TABLE IF NOT EXISTS approval_workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  requested_by UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  approved_by UUID REFERENCES users(id) ON DELETE SET NULL,
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. CASH FLOW DATA TABLE (for forecasting)
CREATE TABLE IF NOT EXISTS cash_flow_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  expected_income DECIMAL(12, 2) DEFAULT 0,
  expected_expenses DECIMAL(12, 2) DEFAULT 0,
  actual_income DECIMAL(12, 2) DEFAULT 0,
  actual_expenses DECIMAL(12, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, date)
);

-- 15. INVOICE AGING DATA TABLE
CREATE TABLE IF NOT EXISTS invoice_aging (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  days_overdue INTEGER DEFAULT 0,
  current_status VARCHAR(50),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ADD RLS POLICIES FOR NEW TABLES
ALTER TABLE recurring_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_currencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_portal_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE late_fee_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE approval_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE cash_flow_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_aging ENABLE ROW LEVEL SECURITY;

-- CREATE RLS POLICIES
CREATE POLICY "Users can view their own recurring invoices" ON recurring_invoices
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can manage their own recurring invoices" ON recurring_invoices
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view their own templates" ON invoice_templates
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can manage their own templates" ON invoice_templates
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view their currencies" ON user_currencies
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can view their tax profiles" ON tax_profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can view their email templates" ON email_templates
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can view their time entries" ON time_entries
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can view their expenses" ON expenses
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can view their late fee rules" ON late_fee_rules
  FOR SELECT USING (user_id = auth.uid());

-- INSERT DEFAULT CURRENCIES
INSERT INTO currencies (code, name, symbol) VALUES
('USD', 'US Dollar', '$'),
('EUR', 'Euro', '€'),
('GBP', 'British Pound', '£'),
('INR', 'Indian Rupee', '₹'),
('AUD', 'Australian Dollar', 'A$'),
('CAD', 'Canadian Dollar', 'C$'),
('JPY', 'Japanese Yen', '¥'),
('CHF', 'Swiss Franc', 'CHF'),
('AED', 'UAE Dirham', 'د.إ'),
('SGD', 'Singapore Dollar', 'S$')
ON CONFLICT DO NOTHING;

-- NOTE: Default roles will be created per user during app initialization
-- The roles table is set up with workspace_id (references users) for proper multi-tenant support

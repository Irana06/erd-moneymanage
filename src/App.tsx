import './App.css'

type Field = {
  tag: TagType;
  name?: string;
  type?: string;
  nullable?: boolean;
  nullLabel?: string;
  desc?: string;
};

type TableCardProps = {
  theme: keyof typeof THEMES;
  icon: string;
  name: string;
  badge: string;
  fields: Field[];
};

type WideCardProps = {
  theme: keyof typeof THEMES;
  icon: string;
  name: string;
  badge: string;
  leftFields: Field[];
  rightFields: Field[];
};

type SectionLabelProps = {
  title: string;
  highlight?: boolean;
};

type TagType = "PK" | "FK" | "UK" | "IDX" | "—";

export default function App() {

  return (
    <div className="bg-[#0d0f14] text-[#e2e8f0] font-sans min-h-screen">
      {/* Header */}
      <header className="px-4 sm:px-8 lg:px-12 py-4 sm:py-6 border-b border-[#252b38] flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 sticky top-0 bg-[#0d0f14]/95 z-50 backdrop-blur-sm">
        <div>
          <h1 className="font-mono text-sm sm:text-[1.1rem] text-[#6ee7b7] tracking-wide">
            ERD — Money Management App
          </h1>
          <p className="text-[#64748b] text-xs sm:text-sm">
            Database Schema · Laravel + MySQL · v2.0 (with Admin)
          </p>
          <p className="text-[#64748b] text-xs sm:text-sm">by Yushika</p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 sm:gap-6 sm:ml-auto text-xs">
          {[
            { color: "#6ee7b7", label: "PK — Primary Key" },
            { color: "#818cf8", label: "FK — Foreign Key" },
            { color: "#fbbf24", label: "UK — Unique Key" },
            { color: "#38bdf8", label: "IDX — Index" },
          ].map(({ color, label }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 text-[#64748b]"
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: color }}
              />
              {label}
            </span>
          ))}
        </div>
      </header>

      {/* Canvas */}
      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-[1600px] mx-auto">
        {/* ══ USER & AUTH ══ */}
        <SectionLabel title="User &amp; Auth" />

        <TableCard
          theme="user"
          icon="U"
          name="users"
          badge="Core"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "UK", name: "email", type: "varchar(191)" },
            { tag: "IDX", name: "name", type: "varchar(100)" },
            { tag: "—", name: "avatar", type: "varchar", nullable: true },
            { tag: "—", name: "password", type: "varchar" },
            { tag: "—", name: "timezone", type: "varchar(50)" },
            { tag: "—", name: "currency_code", type: "char(3)" },
            { tag: "—", name: "locale", type: "varchar(10)" },
            {
              tag: "—",
              name: "email_verified_at",
              type: "timestamp",
              nullable: true,
            },
            {
              tag: "—",
              name: "remember_token",
              type: "varchar(100)",
              nullable: true,
            },
            { tag: "—", name: "created_at", type: "timestamp" },
            { tag: "—", name: "updated_at", type: "timestamp" },
          ]}
        />

        <TableCard
          theme="user"
          icon="UP"
          name="user_profiles"
          badge="1:1"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint" },
            {
              tag: "—",
              name: "monthly_income",
              type: "decimal(15,2)",
              nullable: true,
            },
            { tag: "—", name: "income_day", type: "tinyint", nullable: true },
            {
              tag: "—",
              name: "financial_goal_text",
              type: "text",
              nullable: true,
            },
            { tag: "—", name: "onboarding_step", type: "tinyint" },
            { tag: "—", name: "notification_prefs", type: "json" },
          ]}
        />

        <TableCard
          theme="sub"
          icon="$"
          name="subscriptions"
          badge="Cashier"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint" },
            {
              tag: "FK",
              name: "plan_id",
              type: "bigint",
              desc: "→ subscription_plans",
            },
            {
              tag: "—",
              name: "status",
              type: "enum",
              desc: "active | trialing | past_due | canceled",
            },
            { tag: "—", name: "stripe_id", type: "varchar", nullable: true },
            {
              tag: "—",
              name: "trial_ends_at",
              type: "timestamp",
              nullable: true,
            },
            { tag: "—", name: "ends_at", type: "timestamp", nullable: true },
            { tag: "—", name: "created_at", type: "timestamp" },
          ]}
        />

        <TableCard
          theme="sub"
          icon="PL"
          name="payment_logs"
          badge="History"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint" },
            { tag: "FK", name: "subscription_id", type: "bigint" },
            { tag: "—", name: "amount", type: "decimal(12,2)" },
            { tag: "—", name: "currency", type: "char(3)" },
            {
              tag: "—",
              name: "gateway",
              type: "varchar(30)",
              desc: "stripe | midtrans | manual",
            },
            { tag: "—", name: "gateway_ref", type: "varchar" },
            { tag: "—", name: "status", type: "enum" },
            { tag: "—", name: "paid_at", type: "timestamp", nullable: true },
          ]}
        />

        {/* ══ FINANCE CORE ══ */}
        <SectionLabel title="Finance Core" />

        <TableCard
          theme="finance"
          icon="W"
          name="wallets"
          badge="Multi-wallet"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint" },
            { tag: "—", name: "name", type: "varchar(100)" },
            {
              tag: "—",
              name: "type",
              type: "enum",
              desc: "cash | bank | e_wallet | investment | credit_card",
            },
            { tag: "—", name: "balance", type: "decimal(15,2)" },
            { tag: "—", name: "currency_code", type: "char(3)" },
            { tag: "—", name: "color", type: "varchar(7)" },
            { tag: "—", name: "icon", type: "varchar(50)" },
            { tag: "—", name: "is_primary", type: "boolean" },
            { tag: "—", name: "is_archived", type: "boolean" },
            { tag: "—", name: "sort_order", type: "int" },
          ]}
        />

        <TableCard
          theme="finance"
          icon="C"
          name="categories"
          badge="Hierarchical"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            {
              tag: "FK",
              name: "user_id",
              type: "bigint",
              nullable: true,
              nullLabel: "null = system",
            },
            {
              tag: "FK",
              name: "parent_id",
              type: "bigint",
              nullable: true,
              desc: "Self-ref (sub-kategori)",
            },
            { tag: "—", name: "name", type: "varchar(80)" },
            {
              tag: "—",
              name: "type",
              type: "enum",
              desc: "income | expense | transfer",
            },
            { tag: "—", name: "icon", type: "varchar(50)" },
            { tag: "—", name: "color", type: "varchar(7)" },
            { tag: "—", name: "is_system", type: "boolean" },
            { tag: "—", name: "sort_order", type: "int" },
          ]}
        />

        {/* transactions - wide */}
        <WideCard
          theme="finance"
          icon="TX"
          name="transactions"
          badge="Main Table"
          leftFields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint" },
            { tag: "FK", name: "wallet_id", type: "bigint" },
            { tag: "FK", name: "category_id", type: "bigint" },
            { tag: "FK", name: "recurring_id", type: "bigint", nullable: true },
            {
              tag: "IDX",
              name: "type",
              type: "enum",
              desc: "income | expense | transfer",
            },
            { tag: "IDX", name: "date", type: "date" },
            { tag: "—", name: "amount", type: "decimal(15,2)" },
          ]}
          rightFields={[
            {
              tag: "—",
              name: "description",
              type: "varchar(255)",
              nullable: true,
            },
            { tag: "—", name: "note", type: "text", nullable: true },
            {
              tag: "—",
              name: "receipt_image",
              type: "varchar",
              nullable: true,
            },
            { tag: "—", name: "tags", type: "json", nullable: true },
            {
              tag: "FK",
              name: "transfer_to_wallet_id",
              type: "bigint",
              nullable: true,
            },
            { tag: "—", name: "is_verified", type: "boolean" },
            { tag: "—", name: "created_at", type: "timestamp" },
            { tag: "—", name: "deleted_at", type: "timestamp", nullable: true },
          ]}
        />

        {/* recurring_transactions - wide */}
        <WideCard
          theme="finance"
          icon="RC"
          name="recurring_transactions"
          badge="Auto-repeat"
          leftFields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint" },
            { tag: "FK", name: "wallet_id", type: "bigint" },
            { tag: "FK", name: "category_id", type: "bigint" },
            { tag: "—", name: "name", type: "varchar(100)" },
            { tag: "—", name: "amount", type: "decimal(15,2)" },
            { tag: "—", name: "type", type: "enum" },
          ]}
          rightFields={[
            {
              tag: "—",
              name: "frequency",
              type: "enum",
              desc: "daily | weekly | monthly | yearly",
            },
            { tag: "—", name: "day_of_month", type: "tinyint", nullable: true },
            { tag: "—", name: "next_run_at", type: "date" },
            { tag: "—", name: "ends_at", type: "date", nullable: true },
            { tag: "—", name: "is_active", type: "boolean" },
            { tag: "—", name: "remind_before_days", type: "tinyint" },
          ]}
        />

        {/* ══ PLANNING ══ */}
        <SectionLabel title="Planning &amp; Goals" />

        <TableCard
          theme="plan"
          icon="B"
          name="budgets"
          badge="Per-month"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint" },
            { tag: "FK", name: "category_id", type: "bigint" },
            { tag: "IDX", name: "period_year", type: "year" },
            { tag: "IDX", name: "period_month", type: "tinyint" },
            { tag: "—", name: "amount_limit", type: "decimal(15,2)" },
            {
              tag: "—",
              name: "alert_at_percent",
              type: "tinyint",
              desc: "Notif saat 80% terpakai",
            },
            {
              tag: "—",
              name: "rollover",
              type: "boolean",
              desc: "Sisa budget pindah bulan ini",
            },
          ]}
        />

        <TableCard
          theme="plan"
          icon="SG"
          name="saving_goals"
          badge="Target"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint" },
            { tag: "FK", name: "wallet_id", type: "bigint", nullable: true },
            { tag: "—", name: "name", type: "varchar(100)" },
            { tag: "—", name: "target_amount", type: "decimal(15,2)" },
            { tag: "—", name: "current_amount", type: "decimal(15,2)" },
            { tag: "—", name: "target_date", type: "date", nullable: true },
            { tag: "—", name: "icon", type: "varchar(50)" },
            { tag: "—", name: "color", type: "varchar(7)" },
            {
              tag: "—",
              name: "status",
              type: "enum",
              desc: "active | completed | canceled",
            },
          ]}
        />

        <TableCard
          theme="plan"
          icon="GL"
          name="saving_goal_logs"
          badge="History"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "saving_goal_id", type: "bigint" },
            {
              tag: "FK",
              name: "transaction_id",
              type: "bigint",
              nullable: true,
            },
            { tag: "—", name: "amount", type: "decimal(15,2)" },
            { tag: "—", name: "note", type: "varchar(255)", nullable: true },
            { tag: "—", name: "created_at", type: "timestamp" },
          ]}
        />

        <TableCard
          theme="plan"
          icon="FP"
          name="financial_plans"
          badge="What-if"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint" },
            { tag: "—", name: "title", type: "varchar(100)" },
            {
              tag: "—",
              name: "type",
              type: "enum",
              desc: "emergency_fund | debt_payoff | investment | retire",
            },
            {
              tag: "—",
              name: "parameters",
              type: "json",
              desc: "Simpan param kalkulasi what-if",
            },
            { tag: "—", name: "result_snapshot", type: "json", nullable: true },
            { tag: "—", name: "updated_at", type: "timestamp" },
          ]}
        />

        {/* ══ DEBT & SUPPORT ══ */}
        <SectionLabel title="Debt, Tagging &amp; Support" />

        <TableCard
          theme="debt"
          icon="D"
          name="debts"
          badge="Hutang-piutang"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint" },
            { tag: "—", name: "contact_name", type: "varchar(100)" },
            {
              tag: "—",
              name: "direction",
              type: "enum",
              desc: "lend | borrow",
            },
            { tag: "—", name: "total_amount", type: "decimal(15,2)" },
            { tag: "—", name: "paid_amount", type: "decimal(15,2)" },
            { tag: "—", name: "due_date", type: "date", nullable: true },
            {
              tag: "—",
              name: "status",
              type: "enum",
              desc: "unpaid | partial | paid",
            },
          ]}
        />

        <TableCard
          theme="debt"
          icon="DP"
          name="debt_payments"
          badge="Cicilan"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "debt_id", type: "bigint" },
            {
              tag: "FK",
              name: "transaction_id",
              type: "bigint",
              nullable: true,
            },
            { tag: "—", name: "amount", type: "decimal(15,2)" },
            { tag: "—", name: "note", type: "varchar(255)", nullable: true },
            { tag: "—", name: "paid_at", type: "timestamp" },
          ]}
        />

        <TableCard
          theme="support"
          icon="T"
          name="tags"
          badge="Label"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint" },
            { tag: "—", name: "name", type: "varchar(50)" },
            { tag: "—", name: "color", type: "varchar(7)" },
          ]}
        />

        <TableCard
          theme="support"
          icon="TT"
          name="transaction_tags"
          badge="Pivot"
          fields={[
            { tag: "FK", name: "transaction_id", type: "bigint" },
            { tag: "FK", name: "tag_id", type: "bigint" },
            {
              tag: "—",
              name: "",
              type: "",
              desc: "Composite PK: (transaction_id, tag_id)",
            },
          ]}
        />

        <TableCard
          theme="support"
          icon="N"
          name="notifications"
          badge="Alert"
          fields={[
            { tag: "PK", name: "id", type: "uuid" },
            { tag: "FK", name: "notifiable_id", type: "bigint" },
            {
              tag: "—",
              name: "type",
              type: "varchar",
              desc: "Laravel notifications table",
            },
            { tag: "—", name: "data", type: "json" },
            { tag: "—", name: "read_at", type: "timestamp", nullable: true },
            { tag: "—", name: "created_at", type: "timestamp" },
          ]}
        />

        <TableCard
          theme="support"
          icon="RE"
          name="report_exports"
          badge="Queue"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint" },
            {
              tag: "—",
              name: "format",
              type: "enum",
              desc: "pdf | xlsx | csv",
            },
            { tag: "—", name: "filters", type: "json" },
            {
              tag: "—",
              name: "status",
              type: "enum",
              desc: "pending | processing | done | failed",
            },
            { tag: "—", name: "file_path", type: "varchar", nullable: true },
            { tag: "—", name: "expires_at", type: "timestamp", nullable: true },
          ]}
        />

        {/* ══════════════════════════════════════════════
            ADMIN SECTION — TERPISAH DARI USERS
        ══════════════════════════════════════════════ */}
        <SectionLabel title="Admin Panel (Tabel Terpisah)" highlight />

        {/* Info banner */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-4 bg-[#a78bfa]/5 border border-[#a78bfa]/30 rounded-xl px-4 py-3 flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-[#a78bfa]/20 text-[#a78bfa] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
            !
          </div>
          <div>
            <p className="text-[#a78bfa] font-mono text-xs font-bold tracking-wide mb-0.5">
              Guard: auth:admin
            </p>
            <p className="text-[#64748b] text-xs leading-relaxed">
              Tabel <span className="text-[#a78bfa] font-mono">admins</span>{" "}
              sepenuhnya terpisah dari{" "}
              <span className="text-[#6ee7b7] font-mono">users</span> — Guard
              berbeda, session berbeda, login route berbeda (
              <span className="text-[#fbbf24] font-mono">/admin/login</span>).
              Admin <span className="text-white font-semibold">tidak bisa</span>{" "}
              akses via route user biasa, begitu pula sebaliknya.
            </p>
          </div>
        </div>

        {/* admins — tabel utama */}
        <TableCard
          theme="admin"
          icon="ADM"
          name="admins"
          badge="Guard: auth:admin"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            {
              tag: "FK",
              name: "role_id",
              type: "bigint",
              desc: "→ admin_roles",
            },
            { tag: "UK", name: "email", type: "varchar(191)" },
            { tag: "—", name: "name", type: "varchar(100)" },
            { tag: "—", name: "password", type: "varchar" },
            { tag: "—", name: "avatar", type: "varchar", nullable: true },
            {
              tag: "—",
              name: "is_active",
              type: "boolean",
              desc: "Nonaktifkan admin tanpa hapus",
            },
            {
              tag: "—",
              name: "two_factor_secret",
              type: "text",
              nullable: true,
              desc: "2FA — Google Authenticator",
            },
            {
              tag: "—",
              name: "two_factor_confirmed_at",
              type: "timestamp",
              nullable: true,
            },
            {
              tag: "—",
              name: "last_login_at",
              type: "timestamp",
              nullable: true,
            },
            {
              tag: "—",
              name: "last_login_ip",
              type: "varchar(45)",
              nullable: true,
            },
            {
              tag: "—",
              name: "remember_token",
              type: "varchar(100)",
              nullable: true,
            },
            { tag: "—", name: "created_at", type: "timestamp" },
            { tag: "—", name: "updated_at", type: "timestamp" },
          ]}
        />

        {/* admin_roles */}
        <TableCard
          theme="admin"
          icon="AR"
          name="admin_roles"
          badge="RBAC"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "UK", name: "slug", type: "varchar(50)" },
            {
              tag: "—",
              name: "",
              type: "",
              desc: "super_admin | admin | support | finance_viewer",
            },
            { tag: "—", name: "name", type: "varchar(80)" },
            { tag: "—", name: "description", type: "text", nullable: true },
            {
              tag: "—",
              name: "permissions",
              type: "json",
              desc: "Array string permission",
            },
            {
              tag: "—",
              name: "is_system",
              type: "boolean",
              desc: "true = tidak bisa dihapus",
            },
            { tag: "—", name: "created_at", type: "timestamp" },
          ]}
        />

        {/* admin_activity_logs */}
        <TableCard
          theme="admin"
          icon="AL"
          name="admin_activity_logs"
          badge="Audit Trail"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "admin_id", type: "bigint" },
            {
              tag: "IDX",
              name: "action",
              type: "varchar(100)",
              desc: "users.suspend | plan.edit | sub.override...",
            },
            {
              tag: "—",
              name: "target_type",
              type: "varchar(50)",
              nullable: true,
              desc: "Polymorphic: User | Subscription | Plan",
            },
            { tag: "—", name: "target_id", type: "bigint", nullable: true },
            { tag: "—", name: "old_values", type: "json", nullable: true },
            { tag: "—", name: "new_values", type: "json", nullable: true },
            { tag: "—", name: "ip_address", type: "varchar(45)" },
            { tag: "—", name: "user_agent", type: "text", nullable: true },
            { tag: "—", name: "created_at", type: "timestamp" },
          ]}
        />

        {/* subscription_plans */}
        <TableCard
          theme="admin"
          icon="SP"
          name="subscription_plans"
          badge="Plan Config"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            {
              tag: "UK",
              name: "slug",
              type: "varchar(50)",
              desc: "free | premium_monthly | premium_yearly",
            },
            { tag: "—", name: "name", type: "varchar(80)" },
            { tag: "—", name: "price", type: "decimal(10,2)" },
            { tag: "—", name: "currency", type: "char(3)" },
            {
              tag: "—",
              name: "billing_period",
              type: "enum",
              desc: "monthly | yearly | lifetime",
            },
            {
              tag: "—",
              name: "features",
              type: "json",
              desc: "Fitur yang di-unlock per plan",
            },
            {
              tag: "—",
              name: "limits",
              type: "json",
              desc: "{max_tx: 50, max_wallets: 1, ...}",
            },
            { tag: "—", name: "trial_days", type: "tinyint" },
            {
              tag: "—",
              name: "stripe_price_id",
              type: "varchar",
              nullable: true,
            },
            { tag: "—", name: "is_active", type: "boolean" },
            { tag: "—", name: "sort_order", type: "int" },
          ]}
        />

        {/* app_settings */}
        <TableCard
          theme="admin"
          icon="AS"
          name="app_settings"
          badge="Global Config"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            {
              tag: "UK",
              name: "key",
              type: "varchar(100)",
              desc: "maintenance_mode | trial_days | max_export...",
            },
            { tag: "—", name: "value", type: "text" },
            {
              tag: "—",
              name: "type",
              type: "enum",
              desc: "string | boolean | integer | json",
            },
            {
              tag: "—",
              name: "group",
              type: "varchar(50)",
              desc: "general | payment | security | email",
            },
            { tag: "—", name: "label", type: "varchar(150)" },
            {
              tag: "—",
              name: "updated_by_admin_id",
              type: "bigint",
              nullable: true,
            },
            { tag: "—", name: "updated_at", type: "timestamp" },
          ]}
        />

        {/* user_suspensions */}
        <TableCard
          theme="admin"
          icon="US"
          name="user_suspensions"
          badge="Moderation"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint" },
            {
              tag: "FK",
              name: "admin_id",
              type: "bigint",
              desc: "Yang melakukan suspend",
            },
            { tag: "—", name: "reason", type: "text" },
            {
              tag: "—",
              name: "suspended_until",
              type: "timestamp",
              nullable: true,
              desc: "null = permanent ban",
            },
            { tag: "—", name: "lifted_at", type: "timestamp", nullable: true },
            {
              tag: "FK",
              name: "lifted_by_admin_id",
              type: "bigint",
              nullable: true,
            },
            { tag: "—", name: "created_at", type: "timestamp" },
          ]}
        />

        {/* announcements */}
        <TableCard
          theme="admin"
          icon="AN"
          name="announcements"
          badge="Broadcast"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "admin_id", type: "bigint" },
            { tag: "—", name: "title", type: "varchar(150)" },
            { tag: "—", name: "content", type: "text" },
            {
              tag: "—",
              name: "type",
              type: "enum",
              desc: "info | warning | maintenance | feature",
            },
            {
              tag: "FK",
              name: "target_plan_id",
              type: "bigint",
              nullable: true,
              desc: "null = semua user",
            },
            { tag: "—", name: "starts_at", type: "timestamp" },
            { tag: "—", name: "ends_at", type: "timestamp", nullable: true },
            { tag: "—", name: "is_active", type: "boolean" },
          ]}
        />

        {/* support_tickets */}
        <TableCard
          theme="admin"
          icon="ST"
          name="support_tickets"
          badge="Helpdesk"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint" },
            {
              tag: "FK",
              name: "handled_by_admin_id",
              type: "bigint",
              nullable: true,
            },
            {
              tag: "UK",
              name: "ticket_number",
              type: "varchar(20)",
              desc: "TKT-20250001",
            },
            { tag: "—", name: "subject", type: "varchar(200)" },
            {
              tag: "—",
              name: "status",
              type: "enum",
              desc: "open | in_progress | resolved | closed",
            },
            {
              tag: "—",
              name: "priority",
              type: "enum",
              desc: "low | medium | high | urgent",
            },
            {
              tag: "—",
              name: "resolved_at",
              type: "timestamp",
              nullable: true,
            },
          ]}
        />

        {/* ticket_messages */}
        <TableCard
          theme="admin"
          icon="TM"
          name="ticket_messages"
          badge="Chat"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "ticket_id", type: "bigint" },
            {
              tag: "—",
              name: "sender_type",
              type: "enum",
              desc: "user | admin",
            },
            { tag: "—", name: "sender_id", type: "bigint" },
            { tag: "—", name: "message", type: "text" },
            { tag: "—", name: "attachment", type: "varchar", nullable: true },
            {
              tag: "—",
              name: "is_internal_note",
              type: "boolean",
              desc: "true = tidak kelihatan user",
            },
            { tag: "—", name: "created_at", type: "timestamp" },
          ]}
        />

        {/* ══ RELATIONS ══ */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-4 bg-[#13161d] border border-[#252b38] rounded-xl p-4 sm:p-5 mt-2">
          <h3 className="font-mono text-xs text-[#64748b] tracking-widest mb-4">
            // RELATIONSHIP MAP
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {[
              // User
              ["users", "──1:1──▶", "user_profiles", "hasOne"],
              ["users", "──1:1──▶", "subscriptions", "hasOne"],
              ["users", "──1:N──▶", "wallets", "hasMany"],
              ["users", "──1:N──▶", "categories", "hasMany (custom)"],
              ["users", "──1:N──▶", "transactions", "hasMany"],
              ["users", "──1:N──▶", "budgets", "hasMany"],
              ["users", "──1:N──▶", "saving_goals", "hasMany"],
              ["users", "──1:N──▶", "debts", "hasMany"],
              // Finance
              ["wallets", "──1:N──▶", "transactions", "hasMany"],
              ["categories", "──1:N──▶", "transactions", "hasMany"],
              ["categories", "──1:N──▶", "budgets", "hasMany"],
              ["categories", "──self──▶", "categories", "parent / children"],
              ["recurring_tx", "──1:N──▶", "transactions", "hasMany"],
              ["saving_goals", "──1:N──▶", "saving_goal_logs", "hasMany"],
              ["debts", "──1:N──▶", "debt_payments", "hasMany"],
              ["transactions", "──N:M──▶", "tags", "via transaction_tags"],
              ["subscriptions", "──1:N──▶", "payment_logs", "hasMany"],
              ["subscription_plans", "──1:N──▶", "subscriptions", "hasMany"],
              // Admin (TERPISAH)
              ["admins", "──N:1──▶", "admin_roles", "belongsTo"],
              ["admins", "──1:N──▶", "admin_activity_logs", "hasMany"],
              ["admins", "──1:N──▶", "user_suspensions", "hasMany (actor)"],
              ["admins", "──1:N──▶", "announcements", "hasMany"],
              ["admins", "──1:N──▶", "support_tickets", "hasMany (handler)"],
              ["users", "──1:N──▶", "user_suspensions", "hasMany (target)"],
              ["users", "──1:N──▶", "support_tickets", "hasMany"],
              ["support_tickets", "──1:N──▶", "ticket_messages", "hasMany"],
            ].map(([from, arrow, to, type], i) => {
              const isAdmin =
                [
                  "admins",
                  "admin_roles",
                  "admin_activity_logs",
                  "user_suspensions",
                  "announcements",
                  "support_tickets",
                  "ticket_messages",
                  "subscription_plans",
                ].includes(from) ||
                [
                  "admin_roles",
                  "admin_activity_logs",
                  "user_suspensions",
                  "announcements",
                  "support_tickets",
                  "ticket_messages",
                  "subscription_plans",
                  "subscriptions",
                ].includes(to);
              return (
                <div
                  key={i}
                  className={`flex items-center gap-1.5 sm:gap-2 text-xs px-2.5 py-1.5 rounded-md min-w-0 border ${isAdmin ? "bg-[#a78bfa]/5 border-[#a78bfa]/20" : "bg-[#1a1e28] border-transparent"}`}
                >
                  <span
                    className={`font-mono text-[0.7rem] truncate min-w-0 ${isAdmin ? "text-[#a78bfa]" : "text-[#818cf8]"}`}
                  >
                    {from}
                  </span>
                  <span className="text-[#64748b] shrink-0 text-[0.65rem]">
                    {arrow}
                  </span>
                  <span
                    className={`font-mono text-[0.7rem] truncate min-w-0 ${isAdmin ? "text-[#c4b5fd]" : "text-[#6ee7b7]"}`}
                  >
                    {to}
                  </span>
                  <span className="text-[#64748b] text-[0.68rem] ml-auto shrink-0 hidden md:inline">
                    {type}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Legend for admin relations */}
          <div className="mt-3 pt-3 border-t border-[#252b38] flex items-center gap-4 text-xs text-[#64748b]">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#a78bfa]/20 border border-[#a78bfa]/30 shrink-0" />{" "}
              Relasi Admin (Guard terpisah)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#1a1e28] shrink-0" /> Relasi
              User biasa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Theme config ──────────────────────────────────────────
const THEMES = {
  user: {
    bg: "bg-[#6ee7b7]/5",
    iconBg: "bg-[#6ee7b7]/20",
    iconText: "text-[#6ee7b7]",
    nameText: "text-[#6ee7b7]",
    badgeBg: "bg-[#6ee7b7]/10",
    badgeText: "text-[#6ee7b7]",
    hover: "hover:border-[#6ee7b7]",
  },
  finance: {
    bg: "bg-[#818cf8]/5",
    iconBg: "bg-[#818cf8]/20",
    iconText: "text-[#818cf8]",
    nameText: "text-[#818cf8]",
    badgeBg: "bg-[#818cf8]/10",
    badgeText: "text-[#818cf8]",
    hover: "hover:border-[#818cf8]",
  },
  plan: {
    bg: "bg-[#f472b6]/5",
    iconBg: "bg-[#f472b6]/20",
    iconText: "text-[#f472b6]",
    nameText: "text-[#f472b6]",
    badgeBg: "bg-[#f472b6]/10",
    badgeText: "text-[#f472b6]",
    hover: "hover:border-[#f472b6]",
  },
  sub: {
    bg: "bg-[#fbbf24]/5",
    iconBg: "bg-[#fbbf24]/20",
    iconText: "text-[#fbbf24]",
    nameText: "text-[#fbbf24]",
    badgeBg: "bg-[#fbbf24]/10",
    badgeText: "text-[#fbbf24]",
    hover: "hover:border-[#fbbf24]",
  },
  support: {
    bg: "bg-[#38bdf8]/5",
    iconBg: "bg-[#38bdf8]/20",
    iconText: "text-[#38bdf8]",
    nameText: "text-[#38bdf8]",
    badgeBg: "bg-[#38bdf8]/10",
    badgeText: "text-[#38bdf8]",
    hover: "hover:border-[#38bdf8]",
  },
  debt: {
    bg: "bg-[#fb923c]/5",
    iconBg: "bg-[#fb923c]/20",
    iconText: "text-[#fb923c]",
    nameText: "text-[#fb923c]",
    badgeBg: "bg-[#fb923c]/10",
    badgeText: "text-[#fb923c]",
    hover: "hover:border-[#fb923c]",
  },
  admin: {
    bg: "bg-[#a78bfa]/5",
    iconBg: "bg-[#a78bfa]/20",
    iconText: "text-[#a78bfa]",
    nameText: "text-[#a78bfa]",
    badgeBg: "bg-[#a78bfa]/10",
    badgeText: "text-[#a78bfa]",
    hover: "hover:border-[#a78bfa]",
  },
};

const TAG_STYLES = {
  PK: "bg-[#6ee7b7]/15 text-[#6ee7b7]",
  FK: "bg-[#818cf8]/15 text-[#818cf8]",
  UK: "bg-[#fbbf24]/15 text-[#fbbf24]",
  IDX: "bg-[#38bdf8]/15 text-[#38bdf8]",
  "—": "bg-[#1a1e28] text-[#64748b]",
};

function FieldRow({ tag, name, type, nullable, nullLabel, desc }: Field) {
  return (
    <>
      {name && (
        <div className="flex items-center gap-2 px-3 sm:px-4 py-[5px] text-[0.76rem] leading-snug hover:bg-[#1a1e28] transition-colors min-w-0">
          <span
            className={`font-mono text-[0.6rem] px-1.5 py-0.5 rounded min-w-[28px] text-center font-bold shrink-0 ${TAG_STYLES[tag] ?? TAG_STYLES["—"]}`}
          >
            {tag}
          </span>
          <span className="text-[#e2e8f0] flex-1 truncate">{name}</span>
          <span className="font-mono text-[0.65rem] text-[#64748b] shrink-0">
            {type}
          </span>
          {(nullable || nullLabel) && (
            <span className="text-[0.62rem] text-[#64748b] opacity-60 shrink-0 hidden sm:inline">
              {nullLabel ?? "null"}
            </span>
          )}
        </div>
      )}
      {desc && (
        <div className="text-[#64748b] text-[0.7rem] italic px-3 sm:px-4 pb-1 pl-9 sm:pl-10 truncate">
          {desc}
        </div>
      )}
    </>
  );
}

function TableCard({ theme, icon, name, badge, fields }: TableCardProps) {
  const t = THEMES[theme];
  return (
    <div
      className={`bg-[#13161d] border border-[#252b38] rounded-xl overflow-hidden transition-colors duration-200 ${t.hover}`}
    >
      <div
        className={`px-3 sm:px-4 py-2.5 flex items-center gap-2.5 border-b border-[#252b38] ${t.bg}`}
      >
        <div
          className={`w-[22px] h-[22px] rounded-md grid place-items-center text-[0.6rem] font-bold shrink-0 ${t.iconBg} ${t.iconText}`}
        >
          {icon}
        </div>
        <span
          className={`font-mono text-xs font-bold tracking-wide truncate ${t.nameText}`}
        >
          {name}
        </span>
        <span
          className={`ml-auto text-[0.65rem] px-1.5 py-0.5 rounded-full font-mono shrink-0 ${t.badgeBg} ${t.badgeText}`}
        >
          {badge}
        </span>
      </div>
      <div className="py-1">
        {fields.map((f, i) => (
          <FieldRow key={i} {...f} />
        ))}
      </div>
    </div>
  );
}

function WideCard({
  theme,
  icon,
  name,
  badge,
  leftFields,
  rightFields,
}: WideCardProps) {
  const t = THEMES[theme];
  return (
    <div
      className={`col-span-1 sm:col-span-2 bg-[#13161d] border border-[#252b38] rounded-xl overflow-hidden transition-colors duration-200 ${t.hover}`}
    >
      <div
        className={`px-3 sm:px-4 py-2.5 flex items-center gap-2.5 border-b border-[#252b38] ${t.bg}`}
      >
        <div
          className={`w-[22px] h-[22px] rounded-md grid place-items-center text-[0.6rem] font-bold shrink-0 ${t.iconBg} ${t.iconText}`}
        >
          {icon}
        </div>
        <span
          className={`font-mono text-xs font-bold tracking-wide truncate ${t.nameText}`}
        >
          {name}
        </span>
        <span
          className={`ml-auto text-[0.65rem] px-1.5 py-0.5 rounded-full font-mono shrink-0 ${t.badgeBg} ${t.badgeText}`}
        >
          {badge}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 py-1">
        <div>
          {leftFields.map((f, i) => (
            <FieldRow key={i} {...f} />
          ))}
        </div>
        <div>
          {rightFields.map((f, i) => (
            <FieldRow key={i} {...f} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ title, highlight = false }: SectionLabelProps) {
  return (
    <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex items-center gap-3 py-2 mt-2">
      {highlight && <div className="w-1.5 h-4 rounded bg-[#a78bfa] shrink-0" />}
      <span
        className={`font-mono text-[0.7rem] tracking-[0.12em] uppercase shrink-0 ${highlight ? "text-[#a78bfa]" : "text-[#64748b]"}`}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div
        className={`flex-1 h-px ${highlight ? "bg-[#a78bfa]/30" : "bg-[#252b38]"}`}
      />
    </div>
  );
}

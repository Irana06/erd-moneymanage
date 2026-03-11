import './App.css'

export default function App() {
  return (
    <div className="bg-[#0d0f14] text-[#e2e8f0] font-sans min-h-screen overflow-x-auto">
      {/* Header */}
      <header className="px-12 py-8 pb-4 border-b border-[#252b38] flex items-center gap-6 sticky top-0 bg-[#0d0f14] z-50 backdrop-blur-sm">
        <div>
          <h1 className="font-mono text-[1.1rem] text-[#6ee7b7] tracking-wide">
            ERD — Money Management App
          </h1>
          <p className="text-[#64748b] text-sm">Database Schema · Laravel + MySQL</p>
          <p className="text-[#64748b] text-sm">by Yushika</p>
        </div>
        <div className="flex gap-6 ml-auto text-xs">
          <span className="flex items-center gap-1.5 text-[#64748b]">
            <span className="w-2 h-2 rounded-full bg-[#6ee7b7] inline-block" /> PK — Primary Key
          </span>
          <span className="flex items-center gap-1.5 text-[#64748b]">
            <span className="w-2 h-2 rounded-full bg-[#818cf8] inline-block" /> FK — Foreign Key
          </span>
          <span className="flex items-center gap-1.5 text-[#64748b]">
            <span className="w-2 h-2 rounded-full bg-[#fbbf24] inline-block" /> UK — Unique Key
          </span>
          <span className="flex items-center gap-1.5 text-[#64748b]">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] inline-block" /> IDX — Index
          </span>
        </div>
      </header>

      {/* Canvas */}
      <div className="px-12 py-10 grid grid-cols-4 gap-6 max-w-[1600px] mx-auto">

        {/* ══ USER & AUTH ══ */}
        <SectionLabel title="User &amp; Auth" />

        <TableCard
          theme="user"
          icon="U" name="users" badge="Core"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "UK", name: "email", type: "varchar(191)" },
            { tag: "IDX", name: "name", type: "varchar(100)" },
            { tag: "—", name: "avatar", type: "varchar", nullable: true },
            { tag: "—", name: "password", type: "varchar" },
            { tag: "—", name: "timezone", type: "varchar(50)" },
            { tag: "—", name: "currency_code", type: "char(3)" },
            { tag: "—", name: "locale", type: "varchar(10)" },
            { tag: "—", name: "email_verified_at", type: "timestamp", nullable: true },
            { tag: "—", name: "remember_token", type: "varchar(100)", nullable: true },
            { tag: "—", name: "created_at", type: "timestamp" },
            { tag: "—", name: "updated_at", type: "timestamp" },
          ]}
        />

        <TableCard
          theme="user"
          icon="UP" name="user_profiles" badge="1:1"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint" },
            { tag: "—", name: "monthly_income", type: "decimal(15,2)", nullable: true },
            { tag: "—", name: "income_day", type: "tinyint", nullable: true },
            { tag: "—", name: "financial_goal_text", type: "text", nullable: true },
            { tag: "—", name: "onboarding_step", type: "tinyint" },
            { tag: "—", name: "notification_prefs", type: "json" },
          ]}
        />

        <TableCard
          theme="sub"
          icon="$" name="subscriptions" badge="Cashier"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint" },
            { tag: "—", name: "plan", type: "enum", desc: "free | premium_monthly | premium_yearly" },
            { tag: "—", name: "status", type: "enum", desc: "active | trialing | past_due | canceled" },
            { tag: "—", name: "stripe_id", type: "varchar", nullable: true },
            { tag: "—", name: "trial_ends_at", type: "timestamp", nullable: true },
            { tag: "—", name: "ends_at", type: "timestamp", nullable: true },
            { tag: "—", name: "created_at", type: "timestamp" },
          ]}
        />

        <TableCard
          theme="sub"
          icon="PL" name="payment_logs" badge="History"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint" },
            { tag: "FK", name: "subscription_id", type: "bigint" },
            { tag: "—", name: "amount", type: "decimal(12,2)" },
            { tag: "—", name: "currency", type: "char(3)" },
            { tag: "—", name: "gateway", type: "varchar(30)", desc: "stripe | midtrans | manual" },
            { tag: "—", name: "gateway_ref", type: "varchar" },
            { tag: "—", name: "status", type: "enum" },
            { tag: "—", name: "paid_at", type: "timestamp", nullable: true },
          ]}
        />

        {/* ══ FINANCE CORE ══ */}
        <SectionLabel title="Finance Core" />

        <TableCard
          theme="finance"
          icon="W" name="wallets" badge="Multi-wallet"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint" },
            { tag: "—", name: "name", type: "varchar(100)" },
            { tag: "—", name: "type", type: "enum", desc: "cash | bank | e_wallet | investment | credit_card" },
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
          icon="C" name="categories" badge="Hierarchical"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint", nullable: true, nullLabel: "null (system)" },
            { tag: "FK", name: "parent_id", type: "bigint", nullable: true, desc: "Self-referencing (sub-kategori)" },
            { tag: "—", name: "name", type: "varchar(80)" },
            { tag: "—", name: "type", type: "enum", desc: "income | expense | transfer" },
            { tag: "—", name: "icon", type: "varchar(50)" },
            { tag: "—", name: "color", type: "varchar(7)" },
            { tag: "—", name: "is_system", type: "boolean" },
            { tag: "—", name: "sort_order", type: "int" },
          ]}
        />

        {/* transactions — span 2 */}
        <div className="col-span-2 bg-[#13161d] border border-[#252b38] rounded-xl overflow-hidden hover:border-[#818cf8] transition-colors duration-200">
          <div className="px-4 py-2.5 flex items-center gap-2.5 border-b border-[#252b38] bg-[#818cf8]/5">
            <div className="w-[22px] h-[22px] rounded-md grid place-items-center text-xs font-bold bg-[#818cf8]/20 text-[#818cf8]">TX</div>
            <span className="font-mono text-xs font-bold tracking-wide text-[#818cf8]">transactions</span>
            <span className="ml-auto text-[0.65rem] px-1.5 py-0.5 rounded-full font-mono bg-[#818cf8]/10 text-[#818cf8]">Main Table</span>
          </div>
          <div className="grid grid-cols-2 py-1">
            <div>
              {[
                { tag: "PK", name: "id", type: "bigint" },
                { tag: "FK", name: "user_id", type: "bigint" },
                { tag: "FK", name: "wallet_id", type: "bigint" },
                { tag: "FK", name: "category_id", type: "bigint" },
                { tag: "FK", name: "recurring_id", type: "bigint", nullable: true },
                { tag: "IDX", name: "type", type: "enum", desc: "income | expense | transfer" },
                { tag: "IDX", name: "date", type: "date" },
                { tag: "—", name: "amount", type: "decimal(15,2)" },
              ].map((f, i) => <FieldRow key={i} {...f} />)}
            </div>
            <div>
              {[
                { tag: "—", name: "description", type: "varchar(255)", nullable: true },
                { tag: "—", name: "note", type: "text", nullable: true },
                { tag: "—", name: "receipt_image", type: "varchar", nullable: true },
                { tag: "—", name: "tags", type: "json", nullable: true },
                { tag: "FK", name: "transfer_to_wallet_id", type: "bigint", nullable: true },
                { tag: "—", name: "is_verified", type: "boolean" },
                { tag: "—", name: "created_at", type: "timestamp" },
                { tag: "—", name: "deleted_at", type: "timestamp", nullable: true },
              ].map((f, i) => <FieldRow key={i} {...f} />)}
            </div>
          </div>
        </div>

        {/* recurring_transactions — span 2 */}
        <div className="col-span-2 bg-[#13161d] border border-[#252b38] rounded-xl overflow-hidden hover:border-[#818cf8] transition-colors duration-200">
          <div className="px-4 py-2.5 flex items-center gap-2.5 border-b border-[#252b38] bg-[#818cf8]/5">
            <div className="w-[22px] h-[22px] rounded-md grid place-items-center text-xs font-bold bg-[#818cf8]/20 text-[#818cf8]">RC</div>
            <span className="font-mono text-xs font-bold tracking-wide text-[#818cf8]">recurring_transactions</span>
            <span className="ml-auto text-[0.65rem] px-1.5 py-0.5 rounded-full font-mono bg-[#818cf8]/10 text-[#818cf8]">Auto-repeat</span>
          </div>
          <div className="grid grid-cols-2 py-1">
            <div>
              {[
                { tag: "PK", name: "id", type: "bigint" },
                { tag: "FK", name: "user_id", type: "bigint" },
                { tag: "FK", name: "wallet_id", type: "bigint" },
                { tag: "FK", name: "category_id", type: "bigint" },
                { tag: "—", name: "name", type: "varchar(100)" },
                { tag: "—", name: "amount", type: "decimal(15,2)" },
                { tag: "—", name: "type", type: "enum" },
              ].map((f, i) => <FieldRow key={i} {...f} />)}
            </div>
            <div>
              {[
                { tag: "—", name: "frequency", type: "enum", desc: "daily | weekly | monthly | yearly" },
                { tag: "—", name: "day_of_month", type: "tinyint", nullable: true },
                { tag: "—", name: "next_run_at", type: "date" },
                { tag: "—", name: "ends_at", type: "date", nullable: true },
                { tag: "—", name: "is_active", type: "boolean" },
                { tag: "—", name: "remind_before_days", type: "tinyint" },
              ].map((f, i) => <FieldRow key={i} {...f} />)}
            </div>
          </div>
        </div>

        {/* ══ PLANNING ══ */}
        <SectionLabel title="Planning &amp; Goals" />

        <TableCard
          theme="plan"
          icon="B" name="budgets" badge="Per-month"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint" },
            { tag: "FK", name: "category_id", type: "bigint" },
            { tag: "IDX", name: "period_year", type: "year" },
            { tag: "IDX", name: "period_month", type: "tinyint" },
            { tag: "—", name: "amount_limit", type: "decimal(15,2)" },
            { tag: "—", name: "alert_at_percent", type: "tinyint", desc: "Notif saat 80% terpakai" },
            { tag: "—", name: "rollover", type: "boolean", desc: "Sisa budget bulan lalu pindah ke bulan ini" },
          ]}
        />

        <TableCard
          theme="plan"
          icon="SG" name="saving_goals" badge="Target"
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
            { tag: "—", name: "status", type: "enum", desc: "active | completed | canceled" },
          ]}
        />

        <TableCard
          theme="plan"
          icon="GL" name="saving_goal_logs" badge="History"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "saving_goal_id", type: "bigint" },
            { tag: "FK", name: "transaction_id", type: "bigint", nullable: true },
            { tag: "—", name: "amount", type: "decimal(15,2)" },
            { tag: "—", name: "note", type: "varchar(255)", nullable: true },
            { tag: "—", name: "created_at", type: "timestamp" },
          ]}
        />

        <TableCard
          theme="plan"
          icon="FP" name="financial_plans" badge="What-if"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint" },
            { tag: "—", name: "title", type: "varchar(100)" },
            { tag: "—", name: "type", type: "enum", desc: "emergency_fund | debt_payoff | investment | retire" },
            { tag: "—", name: "parameters", type: "json", desc: "Simpan parameter kalkulasi what-if" },
            { tag: "—", name: "result_snapshot", type: "json", nullable: true },
            { tag: "—", name: "updated_at", type: "timestamp" },
          ]}
        />

        {/* ══ DEBT & SUPPORT ══ */}
        <SectionLabel title="Debt, Tagging &amp; Support" />

        <TableCard
          theme="debt"
          icon="D" name="debts" badge="Hutang-piutang"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint" },
            { tag: "—", name: "contact_name", type: "varchar(100)" },
            { tag: "—", name: "direction", type: "enum", desc: "lend (aku minjemin) | borrow (aku minjem)" },
            { tag: "—", name: "total_amount", type: "decimal(15,2)" },
            { tag: "—", name: "paid_amount", type: "decimal(15,2)" },
            { tag: "—", name: "due_date", type: "date", nullable: true },
            { tag: "—", name: "status", type: "enum", desc: "unpaid | partial | paid" },
          ]}
        />

        <TableCard
          theme="debt"
          icon="DP" name="debt_payments" badge="Cicilan"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "debt_id", type: "bigint" },
            { tag: "FK", name: "transaction_id", type: "bigint", nullable: true },
            { tag: "—", name: "amount", type: "decimal(15,2)" },
            { tag: "—", name: "note", type: "varchar(255)", nullable: true },
            { tag: "—", name: "paid_at", type: "timestamp" },
          ]}
        />

        <TableCard
          theme="support"
          icon="T" name="tags" badge="Label"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint" },
            { tag: "—", name: "name", type: "varchar(50)" },
            { tag: "—", name: "color", type: "varchar(7)" },
          ]}
        />

        <TableCard
          theme="support"
          icon="TT" name="transaction_tags" badge="Pivot"
          fields={[
            { tag: "FK", name: "transaction_id", type: "bigint" },
            { tag: "FK", name: "tag_id", type: "bigint" },
            { tag: "—", name: "", type: "", desc: "Composite PK: (transaction_id, tag_id)" },
          ]}
        />

        <TableCard
          theme="support"
          icon="N" name="notifications" badge="Alert"
          fields={[
            { tag: "PK", name: "id", type: "uuid" },
            { tag: "FK", name: "notifiable_id", type: "bigint" },
            { tag: "—", name: "type", type: "varchar", desc: "Laravel default notifications table" },
            { tag: "—", name: "data", type: "json" },
            { tag: "—", name: "read_at", type: "timestamp", nullable: true },
            { tag: "—", name: "created_at", type: "timestamp" },
          ]}
        />

        <TableCard
          theme="support"
          icon="RE" name="report_exports" badge="Queue"
          fields={[
            { tag: "PK", name: "id", type: "bigint" },
            { tag: "FK", name: "user_id", type: "bigint" },
            { tag: "—", name: "format", type: "enum", desc: "pdf | xlsx | csv" },
            { tag: "—", name: "filters", type: "json" },
            { tag: "—", name: "status", type: "enum", desc: "pending | processing | done | failed" },
            { tag: "—", name: "file_path", type: "varchar", nullable: true },
            { tag: "—", name: "expires_at", type: "timestamp", nullable: true },
          ]}
        />

        {/* ══ RELATIONS ══ */}
        <div className="col-span-4 bg-[#13161d] border border-[#252b38] rounded-xl p-5 mt-2">
          <h3 className="font-mono text-xs text-[#64748b] tracking-widest mb-4">// RELATIONSHIP MAP</h3>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-2">
            {[
              ["users", "──1:1──▶", "user_profiles", "hasOne"],
              ["users", "──1:1──▶", "subscriptions", "hasOne"],
              ["users", "──1:N──▶", "wallets", "hasMany"],
              ["users", "──1:N──▶", "categories", "hasMany (custom)"],
              ["users", "──1:N──▶", "transactions", "hasMany"],
              ["users", "──1:N──▶", "budgets", "hasMany"],
              ["users", "──1:N──▶", "saving_goals", "hasMany"],
              ["users", "──1:N──▶", "debts", "hasMany"],
              ["wallets", "──1:N──▶", "transactions", "hasMany"],
              ["categories", "──1:N──▶", "transactions", "hasMany"],
              ["categories", "──1:N──▶", "budgets", "hasMany"],
              ["categories", "──self──▶", "categories", "parent / children"],
              ["recurring_transactions", "──1:N──▶", "transactions", "hasMany"],
              ["saving_goals", "──1:N──▶", "saving_goal_logs", "hasMany"],
              ["debts", "──1:N──▶", "debt_payments", "hasMany"],
              ["transactions", "──N:M──▶", "tags", "via transaction_tags"],
              ["subscriptions", "──1:N──▶", "payment_logs", "hasMany"],
            ].map(([from, arrow, to, type], i) => (
              <div key={i} className="flex items-center gap-2 text-xs px-2.5 py-1.5 bg-[#1a1e28] rounded-md">
                <span className="font-mono text-[0.7rem] text-[#818cf8]">{from}</span>
                <span className="text-[#64748b]">{arrow}</span>
                <span className="font-mono text-[0.7rem] text-[#6ee7b7]">{to}</span>
                <span className="text-[#64748b] text-[0.68rem] ml-auto">{type}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Theme config ──────────────────────────────────────────
const THEMES = {
  user:    { bg: "bg-[#6ee7b7]/5", iconBg: "bg-[#6ee7b7]/20", iconText: "text-[#6ee7b7]", nameText: "text-[#6ee7b7]", badgeBg: "bg-[#6ee7b7]/10", badgeText: "text-[#6ee7b7]", hover: "hover:border-[#6ee7b7]" },
  finance: { bg: "bg-[#818cf8]/5", iconBg: "bg-[#818cf8]/20", iconText: "text-[#818cf8]", nameText: "text-[#818cf8]", badgeBg: "bg-[#818cf8]/10", badgeText: "text-[#818cf8]", hover: "hover:border-[#818cf8]" },
  plan:    { bg: "bg-[#f472b6]/5", iconBg: "bg-[#f472b6]/20", iconText: "text-[#f472b6]", nameText: "text-[#f472b6]", badgeBg: "bg-[#f472b6]/10", badgeText: "text-[#f472b6]", hover: "hover:border-[#f472b6]" },
  sub:     { bg: "bg-[#fbbf24]/5", iconBg: "bg-[#fbbf24]/20", iconText: "text-[#fbbf24]", nameText: "text-[#fbbf24]", badgeBg: "bg-[#fbbf24]/10", badgeText: "text-[#fbbf24]", hover: "hover:border-[#fbbf24]" },
  support: { bg: "bg-[#38bdf8]/5", iconBg: "bg-[#38bdf8]/20", iconText: "text-[#38bdf8]", nameText: "text-[#38bdf8]", badgeBg: "bg-[#38bdf8]/10", badgeText: "text-[#38bdf8]", hover: "hover:border-[#38bdf8]" },
  debt:    { bg: "bg-[#fb923c]/5", iconBg: "bg-[#fb923c]/20", iconText: "text-[#fb923c]", nameText: "text-[#fb923c]", badgeBg: "bg-[#fb923c]/10", badgeText: "text-[#fb923c]", hover: "hover:border-[#fb923c]" },
} as const;

type Theme = keyof typeof THEMES;

const TAG_STYLES: Record<string, string> = {
  PK:  "bg-[#6ee7b7]/15 text-[#6ee7b7]",
  FK:  "bg-[#818cf8]/15 text-[#818cf8]",
  UK:  "bg-[#fbbf24]/15 text-[#fbbf24]",
  IDX: "bg-[#38bdf8]/15 text-[#38bdf8]",
  "—": "bg-[#1a1e28] text-[#64748b]",
};

// ── FieldRow ──────────────────────────────────────────────
interface FieldProps {
  tag: string;
  name: string;
  type: string;
  nullable?: boolean;
  nullLabel?: string;
  desc?: string;
}

function FieldRow({ tag, name, type, nullable, nullLabel, desc }: FieldProps) {
  return (
    <>
      {name && (
        <div className="flex items-center gap-2 px-4 py-[5px] text-[0.76rem] leading-snug hover:bg-[#1a1e28] transition-colors">
          <span className={`font-mono text-[0.6rem] px-1.5 py-0.5 rounded min-w-[28px] text-center font-bold shrink-0 ${TAG_STYLES[tag] ?? TAG_STYLES["—"]}`}>
            {tag}
          </span>
          <span className="text-[#e2e8f0] flex-1">{name}</span>
          <span className="font-mono text-[0.65rem] text-[#64748b]">{type}</span>
          {(nullable || nullLabel) && (
            <span className="text-[0.62rem] text-[#64748b] opacity-60">{nullLabel ?? "null"}</span>
          )}
        </div>
      )}
      {desc && (
        <div className="text-[#64748b] text-[0.7rem] italic px-4 pb-1 pl-10">{desc}</div>
      )}
    </>
  );
}

// ── TableCard ─────────────────────────────────────────────
interface TableCardProps {
  theme: Theme;
  icon: string;
  name: string;
  badge: string;
  fields: FieldProps[];
}

function TableCard({ theme, icon, name, badge, fields }: TableCardProps) {
  const t = THEMES[theme];
  return (
    <div className={`bg-[#13161d] border border-[#252b38] rounded-xl overflow-hidden transition-colors duration-200 ${t.hover}`}>
      <div className={`px-4 py-2.5 flex items-center gap-2.5 border-b border-[#252b38] ${t.bg}`}>
        <div className={`w-[22px] h-[22px] rounded-md grid place-items-center text-[0.6rem] font-bold ${t.iconBg} ${t.iconText}`}>
          {icon}
        </div>
        <span className={`font-mono text-xs font-bold tracking-wide ${t.nameText}`}>{name}</span>
        <span className={`ml-auto text-[0.65rem] px-1.5 py-0.5 rounded-full font-mono ${t.badgeBg} ${t.badgeText}`}>{badge}</span>
      </div>
      <div className="py-1">
        {fields.map((f, i) => <FieldRow key={i} {...f} />)}
      </div>
    </div>
  );
}

// ── SectionLabel ──────────────────────────────────────────
function SectionLabel({ title }: { title: string }) {
  return (
    <div className="col-span-4 flex items-center gap-3 py-2 mt-2">
      <span
        className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-[#64748b]"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className="flex-1 h-px bg-[#252b38]" />
    </div>
  );
}
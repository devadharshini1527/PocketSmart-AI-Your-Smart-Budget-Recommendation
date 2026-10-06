import { useEffect, useMemo, useState } from "react";
import { Route, Switch, useLocation, useRoute } from "wouter";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeIndianRupee,
  BarChart3,
  Bookmark,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Compass,
  FileImage,
  Gem,
  Heart,
  History,
  Home as HomeIcon,
  LayoutDashboard,
  Loader2,
  LogIn,
  LogOut,
  Menu,
  PartyPopper,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  Target,
  Upload,
  WalletCards,
  WandSparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import { startLogin } from "./const";
import { useAuth } from "./_core/hooks/useAuth";
import {
  formatCurrency,
  formatShortDate,
  generateRecommendations,
  loadHistory,
  plannerMeta,
  plannerFromPath,
  saveHistory,
  type PlannerType,
  type PlannerValues,
  type Recommendation,
  type RecommendationResult,
} from "./lib/recommendations";

type IconKey = "home" | "sparkles" | "gem";
const iconMap: Record<IconKey, LucideIcon> = {
  home: HomeIcon,
  sparkles: Sparkles,
  gem: Gem,
};

const cls = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

function Brand({ light = false }: { light?: boolean }) {
  return (
    <div
      className={cls("brand", light && "brand-light")}
      onClick={() => (window.location.href = "/")}
      role="button"
      tabIndex={0}
    >
      <span className="brand-mark" aria-hidden="true">
        <span />
      </span>
      <span className="brand-name">pocketsmart</span>
    </div>
  );
}

function AppShell({
  children,
  active = "",
}: {
  children: React.ReactNode;
  active?: string;
}) {
  const [, navigate] = useLocation();
  const { user, loading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { label: "Planners", href: "/#planners" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Testimonials", href: "/#testimonials" },
  ];
  const initials = (user?.name || user?.email || "P").slice(0, 1).toUpperCase();

  const go = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/#")) {
      window.location.href = href;
    } else {
      navigate(href);
    }
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav
            className={cls("main-nav", menuOpen && "is-open")}
            aria-label="Main navigation"
          >
            {navItems.map(item => (
              <button
                key={item.href}
                className={active === item.label ? "active" : ""}
                onClick={() => go(item.href)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="header-actions">
            {user ? (
              <button
                className="profile-chip"
                onClick={() => navigate("/dashboard")}
                aria-label="Open dashboard"
              >
                <span className="avatar">{initials}</span>
                <span className="profile-name">
                  {user.name || "Your dashboard"}
                </span>
              </button>
            ) : (
              <button
                className="text-button desktop-login"
                onClick={() => navigate("/login")}
              >
                <LogIn size={16} /> Log in
              </button>
            )}
            <button
              className="header-cta"
              onClick={() => navigate("/planner/home")}
            >
              <span className="desktop-only">Build a plan</span>
              <span className="mobile-only">Start</span>
              <ArrowUpRight size={16} />
            </button>
            <button
              className="menu-button"
              aria-label="Toggle navigation"
              onClick={() => setMenuOpen(value => !value)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <div className="footer-main">
          <div>
            <Brand light />
            <p className="footer-copy">
              A calmer way to make smart, beautiful choices with your budget.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <span className="footer-label">Explore</span>
              <button onClick={() => go("/#planners")}>Planners</button>
              <button onClick={() => go("/dashboard")}>Dashboard</button>
              <button onClick={() => go("/history")}>History</button>
            </div>
            <div>
              <span className="footer-label">Company</span>
              <button onClick={() => go("/#how-it-works")}>How it works</button>
              <button onClick={() => go("/#testimonials")}>Stories</button>
              <button onClick={() => go("/login")}>Your account</button>
            </div>
          </div>
          <div className="footer-note">
            <span className="status-dot" /> Demo mode is live
            <br />
            <span>Designed for thoughtful spending.</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 PocketSmart AI</span>
          <span>
            Built with intention ·{" "}
            <button onClick={() => user && logout()}>
              {user ? "Log out" : "Private by design"}
            </button>
          </span>
        </div>
      </footer>
    </div>
  );
}

function HomePage() {
  const [, navigate] = useLocation();
  return (
    <AppShell active="">
      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" /> SMART BUDGETING, WITHOUT THE
              SPREADSHEET
            </div>
            <h1>
              Give every
              <br />
              <em>rupee</em> a job.
            </h1>
            <p className="hero-lede">
              PocketSmart turns a budget into a plan you can actually feel good
              about — from the room you’re refreshing to the moment you’re
              making.
            </p>
            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={() => navigate("/planner/home")}
              >
                Build my first plan <ArrowRight size={18} />
              </button>
              <button
                className="secondary-button"
                onClick={() => (window.location.href = "/#how-it-works")}
              >
                See how it works <ChevronRight size={17} />
              </button>
            </div>
            <div className="trust-line">
              <div className="tiny-avatars">
                <span>R</span>
                <span>M</span>
                <span>S</span>
              </div>
              <span>
                <strong>2,400+</strong> thoughtful plans started this month
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="budget-card floating-card">
              <div className="card-kicker">
                <span>YOUR BUDGET PULSE</span>
                <span className="pulse-live">
                  <i /> live
                </span>
              </div>
              <div className="pulse-total">
                ₹50,000 <span>planned</span>
              </div>
              <div className="pulse-bar">
                <span style={{ width: "68%" }} />
              </div>
              <div className="pulse-foot">
                <span>
                  <b>₹34,100</b> allocated
                </span>
                <span>68%</span>
              </div>
              <div className="pulse-grid">
                <div>
                  <span className="pulse-icon purple">
                    <WalletCards size={15} />
                  </span>
                  <span>Home refresh</span>
                  <b>₹28,400</b>
                </div>
                <div>
                  <span className="pulse-icon mint">
                    <Sparkles size={15} />
                  </span>
                  <span>Flex fund</span>
                  <b>₹15,900</b>
                </div>
              </div>
            </div>
            <div className="mini-card mini-card-one">
              <span className="mini-check">
                <Check size={13} />
              </span>
              <span>Best value found</span>
              <b>−₹4,800</b>
            </div>
            <div className="mini-card mini-card-two">
              <span className="mini-spark">
                <Sparkles size={14} />
              </span>
              <span>Curated for you</span>
            </div>
            <div className="hero-stamp">
              <span>03</span>
              <small>
                ways to
                <br />
                plan smarter
              </small>
            </div>
          </div>
        </section>

        <section className="partner-strip">
          <span>PLAN ACROSS YOUR FAVORITES</span>
          <strong>amazon</strong>
          <strong> IKEA</strong>
          <strong>swiggy</strong>
          <strong>zomato</strong>
          <strong>OYO</strong>
          <strong>flipkart</strong>
        </section>

        <section className="section planners-section" id="planners">
          <div className="section-heading split-heading">
            <div>
              <span className="section-index">01 / PLANNERS</span>
              <h2>
                Start with what
                <br />
                <em>you’re making.</em>
              </h2>
            </div>
            <p>
              Whether it’s a space, a celebration, or a look — PocketSmart helps
              you make the big decisions first, then gets specific.
            </p>
          </div>
          <div className="planner-grid">
            {plannerMeta.map(meta => (
              <PlannerCard key={meta.type} meta={meta} />
            ))}
          </div>
        </section>

        <section className="section insight-section" id="how-it-works">
          <div className="insight-rail">
            <span className="section-index">02 / THE POCKETSMART METHOD</span>
            <h2>
              Clarity is
              <br />
              <em>the luxury.</em>
            </h2>
            <p>Not more choices. Better ones.</p>
            <button
              className="line-button"
              onClick={() => navigate("/planner/home")}
            >
              Try a planner <ArrowRight size={16} />
            </button>
          </div>
          <div className="method-list">
            <MethodStep
              number="01"
              icon={Compass}
              title="Tell us the shape of it"
              text="A few thoughtful prompts capture your budget, context, taste, and what matters most."
            />
            <MethodStep
              number="02"
              icon={SlidersHorizontal}
              title="We make the trade-offs visible"
              text="See exactly where your money goes, what’s worth stretching for, and where to keep a little air."
            />
            <MethodStep
              number="03"
              icon={WandSparkles}
              title="Leave with a plan, not a pile"
              text="Curated picks, useful alternatives, and a clearer next step — all in one calm view."
            />
          </div>
        </section>

        <section className="section stories-section" id="testimonials">
          <div className="section-heading split-heading">
            <div>
              <span className="section-index">03 / SMALL WINS</span>
              <h2>
                Good plans make
                <br />
                <em>good stories.</em>
              </h2>
            </div>
            <p>
              A few notes from people who wanted to spend well — not just spend
              less.
            </p>
          </div>
          <div className="story-grid">
            <Testimonial
              quote="I stopped doom-scrolling furniture and started making decisions. The flex fund was a tiny detail that made the whole plan feel realistic."
              name="Rhea Menon"
              detail="Living room refresh · ₹72,000"
              accent="violet"
            />
            <Testimonial
              quote="It gave our birthday dinner a budget that felt generous, not restrictive. We had money left for the thing everyone remembered."
              name="Arjun Shah"
              detail="24-person celebration · ₹38,000"
              accent="orange"
            />
            <Testimonial
              quote="The jewelry edit understood that I wanted something I could wear again. That was the difference between a recommendation and a good idea."
              name="Sana Kapoor"
              detail="Evening celebration · ₹18,000"
              accent="mint"
            />
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-orb" />
          <div>
            <span className="section-index light-index">
              A LITTLE MORE INTENTION
            </span>
            <h2>
              Ready to make
              <br />
              <em>your next choice?</em>
            </h2>
          </div>
          <button
            className="light-button"
            onClick={() => navigate("/planner/home")}
          >
            Build a plan <ArrowUpRight size={18} />
          </button>
        </section>
      </main>
    </AppShell>
  );
}

function PlannerCard({ meta }: { meta: (typeof plannerMeta)[number] }) {
  const [, navigate] = useLocation();
  const Icon = iconMap[meta.icon as IconKey];
  return (
    <button
      className={cls("planner-card", `card-${meta.accent}`)}
      onClick={() => navigate(`/planner/${meta.type}`)}
    >
      <div className="planner-card-top">
        <span className="planner-icon">
          <Icon size={20} />
        </span>
        <ArrowUpRight size={19} className="planner-arrow" />
      </div>
      <span className="planner-eyebrow">{meta.eyebrow}</span>
      <h3>{meta.label}</h3>
      <p>{meta.description}</p>
      <span className="planner-card-foot">
        {meta.short} <ArrowRight size={14} />
      </span>
    </button>
  );
}

function MethodStep({
  number,
  icon: Icon,
  title,
  text,
}: {
  number: string;
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className="method-step">
      <span className="method-number">{number}</span>
      <span className="method-icon">
        <Icon size={19} />
      </span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

function Testimonial({
  quote,
  name,
  detail,
  accent,
}: {
  quote: string;
  name: string;
  detail: string;
  accent: string;
}) {
  return (
    <article className={cls("story-card", `story-${accent}`)}>
      <div className="stars">
        {[1, 2, 3, 4, 5].map(n => (
          <Star key={n} size={13} fill="currentColor" />
        ))}
      </div>
      <p>“{quote}”</p>
      <div className="story-author">
        <span>{name.slice(0, 1)}</span>
        <div>
          <strong>{name}</strong>
          <small>{detail}</small>
        </div>
      </div>
    </article>
  );
}

function PlannerPage() {
  const [match, params] = useRoute<{ type: string }>("/planner/:type");
  const [location] = useLocation();
  const type: PlannerType =
    match && (params?.type === "party" || params?.type === "jewelry")
      ? params.type
      : "home";
  const meta = plannerMeta.find(item => item.type === type) ?? plannerMeta[0];
  const historyId = new URLSearchParams(location.split("?")[1] ?? "").get(
    "history"
  );
  const savedResult = useMemo(
    () =>
      historyId
        ? (loadHistory().find(item => item.id === historyId) ?? null)
        : null,
    [historyId]
  );
  const [values, setValues] = useState<PlannerValues>({
    budget: type === "party" ? "50000" : type === "jewelry" ? "18000" : "50000",
    room: "living room",
    style: "warm modern",
    lights: "3",
    fans: "1",
    seating: "1",
    event: "birthday dinner",
    guests: "24",
    venue: "private dining room",
    vibe: "warm and easy",
    occasion: "evening celebration",
    color: "gold tones",
    material: "gold",
    outfit: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [generating, setGenerating] = useState(false);
  const [saved, setSaved] = useState(false);
  const [outfitPreview, setOutfitPreview] = useState("");
  const Icon = iconMap[meta.icon as IconKey];

  useEffect(() => {
    setValues(
      current =>
        savedResult?.values ?? {
          ...current,
          budget:
            type === "party" ? "50000" : type === "jewelry" ? "18000" : "50000",
        }
    );
    setResult(savedResult);
    setErrors({});
    setSaved(Boolean(savedResult));
    setOutfitPreview("");
  }, [type, savedResult]);

  const setValue = (key: string, value: string) => {
    setValues(current => ({ ...current, [key]: value }));
    setErrors(current => ({ ...current, [key]: "" }));
    setSaved(false);
  };

  const validate = () => {
    const next: Record<string, string> = {};
    const budget = Number(values.budget?.replace(/,/g, ""));
    if (!Number.isFinite(budget) || budget < 1000)
      next.budget = "Start with a budget of at least ₹1,000.";
    if (
      type === "party" &&
      (!Number.isFinite(Number(values.guests)) || Number(values.guests) < 2)
    )
      next.guests = "Add at least 2 guests.";
    if (type === "home") {
      if (!Number.isFinite(Number(values.lights)) || Number(values.lights) < 0)
        next.lights = "Use 0 or more lights.";
      if (!Number.isFinite(Number(values.fans)) || Number(values.fans) < 0)
        next.fans = "Use 0 or more fans.";
      if (
        !Number.isFinite(Number(values.seating)) ||
        Number(values.seating) < 0
      )
        next.seating = "Use 0 or more seating pieces.";
    }
    if (type === "jewelry" && !values.occasion)
      next.occasion = "Choose the occasion you’re dressing for.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleGenerate = () => {
    if (!validate()) return;
    setGenerating(true);
    setSaved(false);
    window.setTimeout(() => {
      setResult(generateRecommendations(type, values));
      setGenerating(false);
      window.setTimeout(
        () =>
          document
            .getElementById("recommendations")
            ?.scrollIntoView({ behavior: "smooth", block: "start" }),
        80
      );
    }, 650);
  };

  const handleSave = () => {
    if (!result) return;
    saveHistory(result);
    setSaved(true);
  };
  const handleFile = (file?: File) => {
    if (!file) return;
    setValue("outfit", file.name);
    setOutfitPreview(URL.createObjectURL(file));
  };

  return (
    <AppShell active="Planners">
      <main className="planner-page">
        <section className="planner-hero">
          <div>
            <button
              className="back-link"
              onClick={() => (window.location.href = "/#planners")}
            >
              <ChevronRight size={15} className="back-chevron" /> All planners
            </button>
            <div className="planner-hero-kicker">
              <span
                className={cls("planner-icon small", `icon-${meta.accent}`)}
              >
                <Icon size={16} />
              </span>
              <span>{meta.eyebrow}</span>
            </div>
            <h1>{meta.title}</h1>
            <p>{meta.description}</p>
          </div>
          <div className="planner-hero-note">
            <span>
              <CircleDollarSign size={17} /> Your budget stays at the center.
            </span>
            <small>We’ll show the trade-offs, not hide them.</small>
          </div>
        </section>
        <section className="planner-workspace">
          <div className="planner-form-panel">
            <div className="panel-heading">
              <div>
                <span className="section-index">YOUR BRIEF</span>
                <h2>Let’s make it specific.</h2>
              </div>
              <span className="step-count">
                01 <i>/</i> 01
              </span>
            </div>
            <PlannerForm
              type={type}
              values={values}
              errors={errors}
              onChange={setValue}
              onFile={handleFile}
              outfitPreview={outfitPreview}
            />
            <button
              className="generate-button"
              onClick={handleGenerate}
              disabled={generating}
              aria-busy={generating}
              aria-live="polite"
            >
              {generating ? (
                <>
                  <Loader2 size={18} className="spin" /> Reading your brief…
                </>
              ) : (
                <>
                  <WandSparkles size={18} /> Build my plan{" "}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
            <p className="form-note">
              <ShieldCheck size={14} /> No accounts or card details needed to
              explore.
            </p>
          </div>
          <PlannerSidePanel type={type} values={values} />
        </section>
        {result ? (
          <RecommendationView
            result={result}
            saved={saved}
            onSave={handleSave}
          />
        ) : (
          <section className="planner-empty">
            <div className="empty-icon">
              <Target size={22} />
            </div>
            <div>
              <span className="section-index">WHAT YOU’LL GET</span>
              <h3>A plan that makes the next step feel obvious.</h3>
              <p>
                Budget allocation, curated options, and a clear view of what’s
                worth the stretch.
              </p>
            </div>
            <div className="empty-chips">
              <span>
                <Check size={14} /> Budget-fit picks
              </span>
              <span>
                <Check size={14} /> Useful alternatives
              </span>
              <span>
                <Check size={14} /> A little breathing room
              </span>
            </div>
          </section>
        )}
      </main>
    </AppShell>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cls("field", error && "has-error")}>
      <span className="field-label">
        {label}
        {hint && <small>{hint}</small>}
      </span>
      {children}
      {error && (
        <span className="field-error" role="alert" aria-live="polite">
          {error}
        </span>
      )}
    </label>
  );
}

function PlannerForm({
  type,
  values,
  errors,
  onChange,
  onFile,
  outfitPreview,
}: {
  type: PlannerType;
  values: PlannerValues;
  errors: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onFile: (file?: File) => void;
  outfitPreview: string;
}) {
  const commonBudget = (
    <Field label="Total budget" hint="INR" error={errors.budget}>
      <div className="input-prefix">
        <span>₹</span>
        <input
          value={values.budget}
          onChange={event => onChange("budget", event.target.value)}
          inputMode="numeric"
          placeholder="50,000"
        />
      </div>
    </Field>
  );
  if (type === "home")
    return (
      <div className="form-fields">
        <div className="form-row">
          {commonBudget}
          <Field label="Room to refresh">
            <select
              value={values.room}
              onChange={event => onChange("room", event.target.value)}
            >
              <option>living room</option>
              <option>bedroom</option>
              <option>kitchen</option>
              <option>balcony</option>
              <option>home office</option>
            </select>
          </Field>
        </div>
        <Field label="The look you’re after">
          <div className="choice-row">
            {["warm modern", "quiet minimal", "colorful & layered"].map(
              item => (
                <button
                  type="button"
                  key={item}
                  className={values.style === item ? "selected" : ""}
                  onClick={() => onChange("style", item)}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </Field>
        <div className="form-divider">
          <span>What should we plan for?</span>
          <i />
        </div>
        <div className="form-row three">
          <Field label="Lights" hint="qty" error={errors.lights}>
            <input
              value={values.lights}
              onChange={event => onChange("lights", event.target.value)}
              inputMode="numeric"
            />
          </Field>
          <Field label="Fans" hint="qty" error={errors.fans}>
            <input
              value={values.fans}
              onChange={event => onChange("fans", event.target.value)}
              inputMode="numeric"
            />
          </Field>
          <Field label="Seating" hint="pieces" error={errors.seating}>
            <input
              value={values.seating}
              onChange={event => onChange("seating", event.target.value)}
              inputMode="numeric"
            />
          </Field>
        </div>
        <Field label="Anything else to keep in mind?" hint="optional">
          <textarea
            value={values.notes || ""}
            onChange={event => onChange("notes", event.target.value)}
            placeholder="A little context helps us make better trade-offs…"
            rows={3}
          />
        </Field>
      </div>
    );
  if (type === "party")
    return (
      <div className="form-fields">
        <div className="form-row">
          {commonBudget}
          <Field label="Guests" error={errors.guests}>
            <input
              value={values.guests}
              onChange={event => onChange("guests", event.target.value)}
              inputMode="numeric"
              placeholder="24"
            />
          </Field>
        </div>
        <div className="form-row">
          <Field label="What are you celebrating?">
            <select
              value={values.event}
              onChange={event => onChange("event", event.target.value)}
            >
              <option>birthday dinner</option>
              <option>intimate wedding</option>
              <option>corporate offsite</option>
              <option>housewarming</option>
              <option>milestone celebration</option>
            </select>
          </Field>
          <Field label="Venue direction">
            <select
              value={values.venue}
              onChange={event => onChange("venue", event.target.value)}
            >
              <option>private dining room</option>
              <option>at home</option>
              <option>boutique hotel</option>
              <option>outdoor terrace</option>
            </select>
          </Field>
        </div>
        <Field label="The vibe in three words">
          <div className="choice-row">
            {["warm and easy", "polished and bright", "playful and bold"].map(
              item => (
                <button
                  type="button"
                  key={item}
                  className={values.vibe === item ? "selected" : ""}
                  onClick={() => onChange("vibe", item)}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </Field>
        <Field label="What should guests remember?" hint="optional">
          <textarea
            value={values.notes || ""}
            onChange={event => onChange("notes", event.target.value)}
            placeholder="A great meal, a dance floor, a beautiful table…"
            rows={3}
          />
        </Field>
      </div>
    );
  return (
    <div className="form-fields">
      <div className="form-row">
        {commonBudget}
        <Field label="Occasion" error={errors.occasion}>
          <select
            value={values.occasion}
            onChange={event => onChange("occasion", event.target.value)}
          >
            <option>evening celebration</option>
            <option>wedding guest look</option>
            <option>festive family dinner</option>
            <option>everyday polish</option>
            <option>work milestone</option>
          </select>
        </Field>
      </div>
      <div className="form-row">
        <Field label="Your style">
          <select
            value={values.style}
            onChange={event => onChange("style", event.target.value)}
          >
            <option>minimal and luminous</option>
            <option>bold and sculptural</option>
            <option>classic and romantic</option>
            <option>colorful and playful</option>
          </select>
        </Field>
        <Field label="Color story">
          <select
            value={values.color}
            onChange={event => onChange("color", event.target.value)}
          >
            <option>gold tones</option>
            <option>silver tones</option>
            <option>pearls & neutrals</option>
            <option>emerald accents</option>
            <option>ruby accents</option>
          </select>
        </Field>
      </div>
      <Field label="Preferred material">
        <div className="choice-row">
          {["gold", "silver", "gemstones", "open to ideas"].map(item => (
            <button
              type="button"
              key={item}
              className={values.material === item ? "selected" : ""}
              onClick={() => onChange("material", item)}
            >
              {item}
            </button>
          ))}
        </div>
      </Field>
      <div className="upload-field">
        <span className="field-label">
          Add your outfit <small>optional · JPG or PNG</small>
        </span>
        <label className={cls("upload-box", outfitPreview && "has-preview")}>
          <input
            type="file"
            accept="image/png,image/jpeg"
            onChange={event => onFile(event.target.files?.[0])}
          />
          {outfitPreview ? (
            <img src={outfitPreview} alt="Outfit preview" />
          ) : (
            <>
              <span className="upload-icon">
                <Upload size={18} />
              </span>
              <span>
                <b>Drop an image here</b>
                <small>or browse from your device</small>
              </span>
              <FileImage size={18} className="upload-file-icon" />
            </>
          )}
        </label>
      </div>
    </div>
  );
}

function PlannerSidePanel({
  type,
  values,
}: {
  type: PlannerType;
  values: PlannerValues;
}) {
  const meta = plannerMeta.find(item => item.type === type)!;
  const budget = Number(values.budget) || 0;
  const insights =
    type === "home"
      ? [
          "One anchor piece first",
          "Keep 16% for the flex fund",
          "Layer light, don’t flood it",
        ]
      : type === "party"
        ? [
            "Food is the memory maker",
            "Protect the last 15%",
            "Venue can do the heavy lifting",
          ]
        : [
            "Let one piece lead",
            "Choose repeatable shine",
            "Color is your easy upgrade",
          ];
  return (
    <aside className={cls("planner-side-panel", `side-${meta.accent}`)}>
      <div className="side-top">
        <span className="side-label">LIVE BRIEF</span>
        <span className="live-badge">
          <i /> updating
        </span>
      </div>
      <div className="side-illustration">
        <div className="side-orb" />
        <div className="side-ring" />
        <span className="side-icon">
          <span>
            {type === "home" ? (
              <HomeIcon size={26} />
            ) : type === "party" ? (
              <PartyPopper size={26} />
            ) : (
              <Gem size={26} />
            )}
          </span>
        </span>
      </div>
      <div className="side-budget-label">
        {budget ? "Your starting point" : "Add your budget"}
      </div>
      <div className="side-budget">
        {budget ? formatCurrency(budget) : "₹ —"}
      </div>
      <div className="side-divider" />
      <div className="side-insight-heading">
        <Sparkles size={15} /> Smart prompts
      </div>
      <div className="side-insights">
        {insights.map((item, index) => (
          <div key={item}>
            <span>0{index + 1}</span>
            <p>{item}</p>
          </div>
        ))}
      </div>
      <div className="side-foot">
        <ShieldCheck size={14} /> Recommendations are budget-aware, not
        sponsored.
      </div>
    </aside>
  );
}

function RecommendationView({
  result,
  saved,
  onSave,
}: {
  result: RecommendationResult;
  saved: boolean;
  onSave: () => void;
}) {
  const [, navigate] = useLocation();
  const [favorite, setFavorite] = useState<string[]>([]);
  const toggleFavorite = (id: string) =>
    setFavorite(current =>
      current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id]
    );
  return (
    <section className="recommendations-section" id="recommendations">
      <div className="result-header">
        <div>
          <span className="section-index">
            YOUR POCKETSMART EDIT · {formatShortDate(result.generatedAt)}
          </span>
          <h2>{result.title}</h2>
          <p>{result.subtitle}</p>
        </div>
        <div className="result-actions">
          <button
            className={cls("save-button", saved && "saved")}
            onClick={onSave}
          >
            {saved ? (
              <>
                <Check size={16} /> Saved to history
              </>
            ) : (
              <>
                <Bookmark size={16} /> Save this plan
              </>
            )}
          </button>
          <button
            className="icon-only-button"
            onClick={() => navigate(`/planner/${result.type}`)}
            aria-label="Edit plan"
          >
            <SlidersHorizontal size={17} />
          </button>
        </div>
      </div>
      <div className="result-summary">
        <div className="summary-copy">
          <span className="summary-label">
            <Sparkles size={15} /> THE POCKETSMART READ
          </span>
          <p>{result.summary}</p>
        </div>
        <div className="summary-numbers">
          <div>
            <span>Planned spend</span>
            <b>{formatCurrency(result.plannedSpend)}</b>
          </div>
          <div>
            <span>Room left</span>
            <b className="mint-text">{formatCurrency(result.savings)}</b>
          </div>
        </div>
      </div>
      <div className="result-layout">
        <div className="result-list">
          <div className="result-list-heading">
            <span>CURATED OPTIONS</span>
            <small>
              {result.recommendations.length} picks · ranked for fit
            </small>
          </div>
          {result.recommendations.map((item, index) => (
            <RecommendationCard
              key={item.id}
              item={item}
              index={index}
              favorite={favorite.includes(item.id)}
              onFavorite={() => toggleFavorite(item.id)}
            />
          ))}
        </div>
        <AllocationCard result={result} />
      </div>
    </section>
  );
}

function RecommendationCard({
  item,
  index,
  favorite,
  onFavorite,
}: {
  item: Recommendation;
  index: number;
  favorite: boolean;
  onFavorite: () => void;
}) {
  return (
    <article
      className="recommendation-card"
      style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}
    >
      <div className="rec-number">0{index + 1}</div>
      <div className="rec-main">
        <div className="rec-topline">
          <span className="rec-category">{item.category}</span>
          <span className="fit-pill">
            <i /> {item.fit}
          </span>
        </div>
        <h3>{item.name}</h3>
        <div className="rec-platform">
          <span>{item.platform}</span>
          <span className="rec-dot" /> <span>match score {item.score}%</span>
        </div>
        <p>{item.rationale}</p>
        <div className="rec-foot">
          <b>{formatCurrency(item.price)}</b>
          <span className="rec-tag">{item.tag}</span>
        </div>
      </div>
      <div className="rec-actions">
        <button
          className={cls("heart-button", favorite && "is-favorite")}
          onClick={onFavorite}
          aria-label={favorite ? "Remove favorite" : "Add favorite"}
        >
          <Heart size={17} fill={favorite ? "currentColor" : "none"} />
        </button>
        <a href={item.url} target="_blank" rel="noreferrer">
          View pick <ArrowUpRight size={14} />
        </a>
      </div>
    </article>
  );
}

function AllocationCard({ result }: { result: RecommendationResult }) {
  const total = result.allocation.reduce((sum, item) => sum + item.amount, 0);
  return (
    <aside className="allocation-card">
      <div className="allocation-heading">
        <span className="summary-label">
          <BarChart3 size={15} /> BUDGET SHAPE
        </span>
        <span>{formatCurrency(result.budget)}</span>
      </div>
      <div className="allocation-stack">
        {result.allocation.map(item => (
          <span
            key={item.label}
            style={{
              width: `${(item.amount / total) * 100}%`,
              background: item.color,
            }}
            title={`${item.label}: ${formatCurrency(item.amount)}`}
          />
        ))}
      </div>
      <div className="allocation-list">
        {result.allocation.map(item => (
          <div key={item.label}>
            <span>
              <i style={{ background: item.color }} />
              {item.label}
            </span>
            <b>{formatCurrency(item.amount)}</b>
            <small>{item.note}</small>
          </div>
        ))}
      </div>
      <div className="allocation-bottom">
        <span>
          <ShieldCheck size={14} /> Budget guardrails on
        </span>
        <span>
          {Math.round((result.plannedSpend / result.budget) * 100)}% planned
        </span>
      </div>
    </aside>
  );
}

function DashboardPage() {
  const [, navigate] = useLocation();
  const { user, loading, logout } = useAuth();
  const [history, setHistory] = useState<RecommendationResult[]>(() =>
    loadHistory()
  );
  const latest = history[0];
  const displayName = user?.name?.split(" ")[0] || "there";
  return (
    <AppShell active="">
      <main className="dashboard-page">
        <section className="dashboard-head">
          <div>
            <span className="section-index">YOUR POCKETSMART</span>
            <h1>
              A little more clarity,
              <br />
              <em>{displayName}.</em>
            </h1>
            <p>
              {user
                ? "Your plans and saved ideas, all in one calm place."
                : "Explore the dashboard view, then log in when you’re ready to keep your plans."}
            </p>
          </div>
          <div className="dashboard-head-actions">
            <button
              className="secondary-button"
              onClick={() => navigate("/history")}
            >
              <History size={16} /> View history
            </button>
            <button
              className="primary-button"
              onClick={() => navigate("/planner/home")}
            >
              New plan <PlusIcon />
            </button>
          </div>
        </section>
        {!user && !loading && (
          <section className="auth-banner">
            <div className="auth-banner-icon">
              <LockIcon />
            </div>
            <div>
              <h3>Save your good ideas.</h3>
              <p>
                Log in with your Manus account to keep your plan library close.
                Your planners stay open to explore in the meantime.
              </p>
            </div>
            <button className="dark-button" onClick={() => navigate("/login")}>
              Log in <ArrowRight size={16} />
            </button>
          </section>
        )}
        <section className="dashboard-grid">
          <div className="dashboard-main">
            <div className="dashboard-section-head">
              <div>
                <span className="section-index">RECENT PLANS</span>
                <h2>
                  {latest
                    ? "Pick up where you left off"
                    : "Your next good decision"}
                </h2>
              </div>
              <button
                className="inline-action"
                onClick={() => navigate("/history")}
              >
                See all <ArrowRight size={14} />
              </button>
            </div>
            {latest ? (
              <div className="latest-plan-card">
                <div
                  className={cls("latest-plan-icon", `latest-${latest.type}`)}
                >
                  {latest.type === "home" ? (
                    <HomeIcon size={22} />
                  ) : latest.type === "party" ? (
                    <PartyPopper size={22} />
                  ) : (
                    <Gem size={22} />
                  )}
                </div>
                <div className="latest-plan-copy">
                  <span>
                    {plannerMeta.find(item => item.type === latest.type)?.label}{" "}
                    · {formatShortDate(latest.generatedAt)}
                  </span>
                  <h3>{latest.title}</h3>
                  <p>{latest.subtitle}</p>
                </div>
                <div className="latest-plan-meta">
                  <span>Room left</span>
                  <b>{formatCurrency(latest.savings)}</b>
                  <button
                    onClick={() =>
                      navigate(`/planner/${latest.type}?history=${latest.id}`)
                    }
                  >
                    Open plan <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="dashboard-empty">
                <div className="empty-icon">
                  <Sparkles size={21} />
                </div>
                <h3>Your plan library is ready for its first page.</h3>
                <p>
                  Start with a home, party, or jewelry planner. We’ll keep the
                  thinking tidy.
                </p>
                <button
                  className="line-button"
                  onClick={() => navigate("/planner/home")}
                >
                  Start with home <ArrowRight size={16} />
                </button>
              </div>
            )}
            <div className="dashboard-section-head second-head">
              <div>
                <span className="section-index">YOUR GUIDE RAILS</span>
                <h2>Small rules, big relief.</h2>
              </div>
            </div>
            <div className="rail-cards">
              <InsightStat
                icon={BadgeIndianRupee}
                title="Give the budget a flex fund"
                text="A plan is stronger when it has somewhere for real life to land."
              />
              <InsightStat
                icon={Clock3}
                title="Decide the anchor first"
                text="One good decision makes the next five feel a lot lighter."
              />
            </div>
          </div>
          <aside className="dashboard-side">
            <div className="side-card dark-side">
              <div className="side-top">
                <span className="side-label">YOUR SNAPSHOT</span>
                <span className="side-menu-dots">•••</span>
              </div>
              <div className="snapshot-ring">
                <div>
                  <b>
                    {latest
                      ? Math.round((latest.plannedSpend / latest.budget) * 100)
                      : 0}
                    %
                  </b>
                  <span>planned</span>
                </div>
              </div>
              <h3>{latest ? "A thoughtful start." : "Ready when you are."}</h3>
              <p>
                {latest
                  ? `${formatCurrency(latest.savings)} left for the details that matter.`
                  : "Build a plan to see your budget shape come alive."}
              </p>
              <div className="snapshot-rule">
                <span>Plans created</span>
                <b>{history.length}</b>
              </div>
              <div className="snapshot-rule">
                <span>Guardrails</span>
                <b className="green-check">
                  <Check size={13} /> on
                </b>
              </div>
            </div>
            <div className="side-card quote-side">
              <span className="quote-mark">“</span>
              <p>Spend on the feeling you want to keep.</p>
              <span className="quote-by">PocketSmart note · 01</span>
            </div>
            {user && (
              <button className="logout-link" onClick={() => logout()}>
                <LogOut size={15} /> Log out of PocketSmart
              </button>
            )}
          </aside>
        </section>
      </main>
    </AppShell>
  );
}

function PlusIcon() {
  return <span className="button-plus">+</span>;
}
function LockIcon() {
  return <ShieldCheck size={22} />;
}
function InsightStat({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className="rail-card">
      <span className="rail-icon">
        <Icon size={18} />
      </span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <ArrowUpRight size={16} />
    </div>
  );
}

function HistoryPage() {
  const [, navigate] = useLocation();
  const [history, setHistory] = useState<RecommendationResult[]>(() =>
    loadHistory()
  );
  return (
    <AppShell active="">
      <main className="history-page">
        <section className="dashboard-head history-head">
          <div>
            <span className="section-index">THE ARCHIVE</span>
            <h1>
              Good thinking,
              <br />
              <em>kept close.</em>
            </h1>
            <p>Every plan you save becomes a little easier to revisit.</p>
          </div>
          <button
            className="primary-button"
            onClick={() => navigate("/planner/home")}
          >
            Start a new plan <ArrowRight size={17} />
          </button>
        </section>
        {history.length ? (
          <div className="history-list">
            {history.map((item, index) => (
              <article className="history-item" key={item.id}>
                <span className="history-index">0{index + 1}</span>
                <span
                  className={cls("history-item-icon", `latest-${item.type}`)}
                >
                  {item.type === "home" ? (
                    <HomeIcon size={19} />
                  ) : item.type === "party" ? (
                    <PartyPopper size={19} />
                  ) : (
                    <Gem size={19} />
                  )}
                </span>
                <div className="history-item-copy">
                  <span>
                    {plannerMeta.find(meta => meta.type === item.type)?.label} ·{" "}
                    {formatShortDate(item.generatedAt)}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
                <div className="history-item-numbers">
                  <span>Budget</span>
                  <b>{formatCurrency(item.budget)}</b>
                  <small>{formatCurrency(item.savings)} left</small>
                </div>
                <button
                  className="history-open"
                  onClick={() =>
                    navigate(`/planner/${item.type}?history=${item.id}`)
                  }
                >
                  <ArrowUpRight size={18} />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="full-empty">
            <div className="empty-icon">
              <History size={22} />
            </div>
            <h3>No saved plans yet.</h3>
            <p>
              Once a planner feels right, save it here and come back whenever
              you need a nudge.
            </p>
            <button
              className="line-button"
              onClick={() => navigate("/planner/home")}
            >
              Explore planners <ArrowRight size={16} />
            </button>
          </div>
        )}
        <div className="history-footnote">
          <ShieldCheck size={15} /> Your saved plans stay in this browser in
          demo mode. Connect a Manus account to make the experience personal.
        </div>
      </main>
    </AppShell>
  );
}

function AuthPage({ mode }: { mode: "login" | "register" }) {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const isRegister = mode === "register";
  const handleAuth = () => {
    setError("");
    setBusy(true);
    try {
      startLogin();
    } catch (caught) {
      setBusy(false);
      setError(
        caught instanceof Error
          ? caught.message
          : "Login is not configured yet."
      );
    }
  };
  if (user)
    return (
      <AppShell>
        <main className="auth-page">
          <div className="auth-card">
            <span className="success-icon">
              <Check size={22} />
            </span>
            <span className="section-index">YOU’RE ALREADY IN</span>
            <h1>
              Your pocket is
              <br />
              <em>open.</em>
            </h1>
            <p>Pick up your plans from the dashboard or start a fresh brief.</p>
            <div className="auth-card-actions">
              <button
                className="primary-button"
                onClick={() => navigate("/dashboard")}
              >
                Open dashboard <ArrowRight size={17} />
              </button>
              <button
                className="secondary-button"
                onClick={() => navigate("/planner/home")}
              >
                Start a plan
              </button>
            </div>
          </div>
        </main>
      </AppShell>
    );
  return (
    <AppShell>
      <main className="auth-page">
        <div className="auth-side">
          <Brand light />
          <div>
            <span className="section-index light-index">
              A SMALLER WAY TO PLAN
            </span>
            <h1>
              Spend with
              <br />
              <em>intention.</em>
            </h1>
            <p>
              Keep the good ideas close. Your planners, picks, and budget
              guardrails in one place.
            </p>
          </div>
          <div className="auth-quote">
            <span>“</span>
            <p>
              It feels like a friend who is very good at the practical stuff.
            </p>
          </div>
        </div>
        <div className="auth-panel">
          <div className="auth-panel-inner">
            <span className="section-index">
              {isRegister ? "CREATE YOUR POCKET" : "WELCOME BACK"}
            </span>
            <h2>
              {isRegister
                ? "Make room for better choices."
                : "Let’s pick up where you left off."}
            </h2>
            <p>
              {isRegister
                ? "Create an account with Manus to save your plans and return to them anytime."
                : "Log in to see your saved plans and keep building."}
            </p>
            <button
              className="oauth-button"
              onClick={handleAuth}
              disabled={busy}
            >
              {busy ? (
                <Loader2 size={18} className="spin" />
              ) : (
                <LogIn size={18} />
              )}
              {busy ? "Opening secure login…" : "Continue with Manus"}
              <ArrowUpRight size={16} />
            </button>
            {error && (
              <div className="auth-error" role="alert" aria-live="assertive">
                <X size={15} /> {error}
              </div>
            )}
            <div className="auth-divider">
              <span>or explore first</span>
            </div>
            <button
              className="explore-button"
              onClick={() => navigate("/planner/home")}
            >
              Try a planner without an account <ArrowRight size={16} />
            </button>
            <p className="auth-switch">
              {isRegister ? "Already have an account?" : "New to PocketSmart?"}{" "}
              <button
                onClick={() => navigate(isRegister ? "/login" : "/register")}
              >
                {isRegister ? "Log in" : "Create one"}
              </button>
            </p>
          </div>
        </div>
      </main>
    </AppShell>
  );
}

function NotFound() {
  const [, navigate] = useLocation();
  return (
    <AppShell>
      <main className="auth-page">
        <div className="auth-card">
          <span className="section-index">404 / NOT HERE</span>
          <h1>
            Let’s find a<br />
            <em>better path.</em>
          </h1>
          <p>This page wandered off. The planners are still right this way.</p>
          <button className="primary-button" onClick={() => navigate("/")}>
            Back to home <ArrowRight size={17} />
          </button>
        </div>
      </main>
    </AppShell>
  );
}

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/planner/:type" component={PlannerPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/history" component={HistoryPage} />
      <Route path="/login">
        <AuthPage mode="login" />
      </Route>
      <Route path="/register">
        <AuthPage mode="register" />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return <AppRouter />;
}

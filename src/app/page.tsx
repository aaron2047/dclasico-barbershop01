import { ArrowRight, ArrowUpRight, Check, Clock, Instagram, MapPin, Phone, Scissors, Star } from "lucide-react";
import { asset, BUSINESS, GALLERY, SERVICES } from "@/lib/site-data";

/**
 * D'Clasicos concept v2 — layout modeled on a calm, photo-led, appointment-first
 * service-business page. Copy is deliberately conservative: nothing here asserts
 * prices, awards, hours or policies the owner has not confirmed.
 *
 * BOOKING: set NEXT_PUBLIC_CAL_URL (a public Cal.com event or team link) to embed
 * live booking. Until then a clearly-labeled preview card is shown.
 */
const CAL_URL = process.env.NEXT_PUBLIC_CAL_URL ?? "";

const HERO_IMAGE = asset("/images/cut-hero.webp"); // 386px wide: swap for a 1600px+ original, then use full-bleed.

const HOUSE_NOTES = [
  "Appointments recommended. Call to confirm hours and availability.",
  "Kids are welcome. Call for age guidance and timing.",
  "Rates are confirmed when you book.",
  "Cuts, line-ups, beard work and shaves. Ask us about anything else.",
];

function Button({ href, children, variant = "solid", external = false }: {
  href: string; children: React.ReactNode; variant?: "solid" | "ghost" | "ghost-dark"; external?: boolean;
}) {
  const styles = {
    solid: "bg-brass text-espresso hover:bg-brass-light",
    ghost: "border border-white/35 text-white hover:border-brass-light hover:text-brass-light",
    "ghost-dark": "border border-espresso/30 text-espresso hover:border-brass hover:text-brass",
  }[variant];
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`btn inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[12px] font-bold uppercase tracking-[.14em] ${styles}`}
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="wood on-dark relative overflow-hidden text-cream">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
          <a href="#top" className="font-serif text-[28px] leading-none tracking-tight">
            D&apos;Clasicos<span className="text-brass">.</span>
          </a>
          <a href="#book" className="btn rounded-full border border-white/35 px-5 py-2.5 text-[12px] font-bold tracking-wide hover:border-brass-light hover:text-brass-light">
            Book Your Appointment
          </a>
        </header>

        <div id="top" className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-10 sm:px-8 md:grid-cols-[1.15fr_.85fr] md:pb-28 md:pt-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-[11px] font-bold uppercase tracking-[.2em] text-brass-light">
              <Scissors size={13} /> Barbershop · Olney, Philadelphia
            </p>
            <h1 className="mt-7 font-serif text-[46px] font-medium leading-[1.04] sm:text-[64px] lg:text-[76px]">
              Classic cuts.<br />Modern precision.
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-cream/75">
              D&apos;Clasicos is a neighborhood barbershop at {BUSINESS.streetAddress} where the details
              are the whole point: clean fades, sharp lines and a chair that&apos;s yours for the time it takes.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="#book">Book your appointment <ArrowRight size={15} /></Button>
              <Button href="#services" variant="ghost">View services</Button>
            </div>
            <p className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] text-cream/70">
              <span className="inline-flex items-center gap-2"><MapPin size={15} className="text-brass" /> {BUSINESS.streetAddress}, Olney</span>
              <a href={`tel:${BUSINESS.phoneHref}`} className="inline-flex items-center gap-2 hover:text-brass-light"><Phone size={15} className="text-brass" /> {BUSINESS.phoneDisplay}</a>
            </p>
          </div>

          <div className="mx-auto w-full max-w-[360px]">
            <div className="rounded-t-[999px] rounded-b-2xl border border-brass/40 p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={HERO_IMAGE}
                alt="Fresh fade and shaped beard at D'Clasicos"
                width={386}
                height={510}
                fetchPriority="high"
                className="aspect-[3/4] w-full rounded-t-[999px] rounded-b-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* RATING BAND */}
      <div className="border-b border-espresso/10 bg-cream">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-5 py-4 text-center sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-espresso px-4 py-1.5 text-[11px] font-bold uppercase tracking-[.18em] text-cream">
            <Star size={12} className="fill-brass text-brass" /> 4.6 on Google
          </span>
          <p className="font-serif text-[19px] text-espresso">
            A neighborhood shop with 80 Google reviews <span className="text-stone">(snapshot, not live)</span>
          </p>
        </div>
      </div>

      {/* THE SHOP */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-24 sm:px-8 md:grid-cols-[.8fr_1.2fr] md:gap-20">
          <div>
            <p className="eyebrow">The shop</p>
            <h2 className="mt-4 font-serif text-[40px] font-medium leading-[1.1] text-espresso sm:text-[48px]">
              A cut that takes the time it needs.
            </h2>
          </div>
          <div className="space-y-5 text-[17px] leading-relaxed text-stone">
            <p>
              Good barbering is part craft, part conversation. At D&apos;Clasicos the goal is simple:
              you leave looking sharper than you arrived, and you never feel rushed getting there.
            </p>
            <p>
              Whether it&apos;s a skin fade, a tapered cut, a beard shaped to your face or a clean line-up
              between visits, the work is built around you and your barber, not a queue.
            </p>
            <p>Pick a service, choose a time, and we&apos;ll have the chair ready.</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-y border-espresso/10 bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">What we do</p>
            <h2 className="mt-4 font-serif text-[40px] font-medium leading-[1.1] text-espresso sm:text-[48px]">A focused, no-rush menu.</h2>
            <p className="mt-4 text-[16px] text-stone">Every service is booked by appointment. Final rates and timing are confirmed with the shop.</p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <article key={service.id} className="rounded-3xl border border-espresso/10 bg-paper p-8 shadow-[0_1px_0_rgba(21,17,14,.04)]">
                <p className="font-serif text-[32px] text-brass/80">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-serif text-[26px] font-medium text-espresso">{service.label}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-stone">{service.summary}</p>
                <p className="mt-6 border-t border-espresso/10 pt-4 text-[11px] font-bold uppercase tracking-[.18em] text-stone/70">Rate confirmed at booking</p>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-6 rounded-3xl border border-espresso/10 bg-paper p-8 md:grid-cols-[.8fr_1.2fr] md:items-center">
            <div>
              <p className="eyebrow">Good to know</p>
              <h3 className="mt-2 font-serif text-[28px] font-medium text-espresso">House notes</h3>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {HOUSE_NOTES.map((note) => (
                <li key={note} className="flex items-start gap-3 text-[15px] text-espresso/85">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brass/20 text-brass"><Check size={14} strokeWidth={3} /></span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">The work</p>
            <h2 className="mt-4 font-serif text-[40px] font-medium text-espresso sm:text-[48px]">Gallery</h2>
            <p className="mt-4 text-[16px] text-stone">A look at recent cuts. More to come as the portfolio grows.</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {GALLERY.map((item) => (
              <figure key={item.src} className="aspect-square overflow-hidden rounded-2xl border border-espresso/10 bg-cream">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.alt} loading="lazy" className="h-full w-full object-cover" />
              </figure>
            ))}
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn grid aspect-square place-items-center rounded-2xl bg-espresso p-6 text-center text-cream hover:bg-walnut"
            >
              <span>
                <Instagram className="mx-auto text-brass" size={28} />
                <span className="mt-3 block font-serif text-[22px]">See more on Instagram</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="border-y border-espresso/10 bg-cream">
        <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
          <p className="eyebrow">Kind words</p>
          <h2 className="mt-4 font-serif text-[40px] font-medium text-espresso sm:text-[48px]">Reviews</h2>
          <div className="mt-10 rounded-3xl border border-espresso/10 bg-paper p-10">
            <p className="font-serif text-[88px] leading-none text-espresso">4.6</p>
            <div className="mt-3 flex justify-center gap-1 text-brass" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} className="fill-brass" />)}
            </div>
            <p className="mt-4 text-[15px] text-stone">Google rating, 80 reviews. Historical snapshot, not live.</p>
            <div className="mt-7">
              <Button href={BUSINESS.googleReviews} variant="ghost-dark" external>Read reviews on Google <ArrowUpRight size={15} /></Button>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="book" className="wood on-dark text-cream">
        <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
          <p className="eyebrow eyebrow-light">Book online</p>
          <h2 className="mt-4 font-serif text-[40px] font-medium leading-[1.1] sm:text-[52px]">Skip the wait for a reply.</h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-cream/70">
            Choose your service and a time that works. No back-and-forth, no guessing. The slot you see is the slot you get.
          </p>

          <div className="mx-auto mt-12 overflow-hidden rounded-3xl bg-cream text-left text-espresso">
            {CAL_URL ? (
              <iframe title="Book an appointment at D'Clasicos" src={CAL_URL} className="h-[680px] w-full border-0" loading="lazy" />
            ) : (
              <div className="p-8 sm:p-10">
                <p className="eyebrow">Booking preview</p>
                <h3 className="mt-2 font-serif text-[30px] font-medium">D&apos;Clasicos Appointments</h3>
                <ol className="mt-6 space-y-4">
                  {["Choose your service", "Pick your barber, or first available", "Confirm your time and get a text reminder"].map((step, i) => (
                    <li key={step} className="flex items-center gap-4 rounded-2xl border border-espresso/10 bg-paper px-5 py-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-espresso font-serif text-[18px] text-brass-light">{i + 1}</span>
                      <span className="text-[15px] font-medium">{step}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-6 text-[14px] text-stone">
                  Live scheduling connects here once the shop activates its calendar. Until then, call to book.
                </p>
                <div className="mt-6">
                  <Button href={`tel:${BUSINESS.phoneHref}`}><Phone size={15} /> Call {BUSINESS.phoneDisplay}</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOLLOW + FOOTER */}
      <section className="border-b border-espresso/10 bg-cream">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
          <p className="eyebrow">Stay close</p>
          <h2 className="mt-4 font-serif text-[38px] font-medium text-espresso sm:text-[44px]">Follow the shop</h2>
          <p className="mx-auto mt-4 max-w-lg text-[16px] text-stone">Fresh cuts and updates from the chairs, on Instagram.</p>
          <div className="mt-7">
            <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="btn inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-3.5 text-[12px] font-bold uppercase tracking-[.14em] text-cream hover:bg-walnut">
              <Instagram size={16} /> Follow us
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
          <div>
            <p className="font-serif text-[30px] text-espresso">D&apos;Clasicos<span className="text-brass">.</span></p>
            <p className="mt-3 max-w-xs text-[15px] text-stone">A neighborhood barbershop in Olney, Philadelphia.</p>
          </div>
          <div>
            <p className="eyebrow">Visit</p>
            <p className="mt-3 flex items-start gap-3 text-[15px] text-espresso"><MapPin size={16} className="mt-1 shrink-0 text-brass" />
              <span>{BUSINESS.streetAddress}<br />{BUSINESS.locality}<br />
                <a href={BUSINESS.googleDirections} target="_blank" rel="noopener noreferrer" className="text-brass underline-offset-4 hover:underline">Get directions</a>
              </span>
            </p>
          </div>
          <div>
            <p className="eyebrow">Contact &amp; hours</p>
            <p className="mt-3 flex items-start gap-3 text-[15px] text-espresso"><Phone size={16} className="mt-1 shrink-0 text-brass" /><a href={`tel:${BUSINESS.phoneHref}`}>{BUSINESS.phoneDisplay}</a></p>
            <p className="mt-3 flex items-start gap-3 text-[15px] text-stone"><Clock size={16} className="mt-1 shrink-0 text-brass" />Hours by appointment. Call to confirm availability.</p>
          </div>
        </div>
        <div className="border-t border-espresso/10">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-5 text-[12px] text-stone sm:px-8">
            <p>© 2026 D&apos;Clasicos Barber Shop.</p>
            <p>Concept preview. Not yet an official D&apos;Clasicos website.</p>
          </div>
        </div>
      </footer>

      {/* Sticky mobile booking CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 p-3 md:hidden">
        <a href="#book" className="btn flex items-center justify-center gap-2 rounded-full bg-brass py-3.5 text-[12px] font-bold uppercase tracking-[.14em] text-espresso shadow-lg">
          Book your appointment <ArrowRight size={15} />
        </a>
      </div>
    </main>
  );
}

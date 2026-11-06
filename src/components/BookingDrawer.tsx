"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, Phone, X } from "lucide-react";
import { BARBERS, BUSINESS, CAL_LINKS, SERVICES, type ServiceId } from "@/lib/site-data";

type Props = {
  open: boolean;
  onClose: () => void;
  initialBarber?: string;
  initialService?: ServiceId;
};

/**
 * Two-stage booking: (1) choose a service, (2) choose first-available or a specific barber.
 * When a public Cal.com link exists for the choice (CAL_LINKS) it opens in a new tab;
 * until then the drawer falls back to tap-to-call. It never invents availability.
 */
export function BookingDrawer({ open, onClose, initialBarber = "any", initialService = "haircut" }: Props) {
  const [stage, setStage] = useState<1 | 2>(1);
  const [serviceId, setServiceId] = useState<ServiceId>(initialService);
  const [barberId, setBarberId] = useState(initialBarber);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    setStage(1);
    setServiceId(initialService);
    setBarberId(initialBarber);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, initialBarber, initialService, onClose]);

  if (!open) return null;

  const service = SERVICES.find((s) => s.id === serviceId)!;
  const barberName = barberId === "any" ? "First available" : BARBERS.find((b) => b.id === barberId)?.name ?? "Selected barber";
  const liveLink = barberId === "any" ? CAL_LINKS[serviceId].any : CAL_LINKS[serviceId].barbers[barberId];

  const row = (active: boolean) =>
    `btn flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left ${
      active ? "border-brass bg-brass/15" : "border-espresso/15 bg-paper hover:border-brass/60"
    }`;
  const tick = (active: boolean) => (
    <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border ${active ? "border-brass bg-brass text-espresso" : "border-espresso/25"}`}>
      {active && <Check size={13} strokeWidth={3} />}
    </span>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-espresso/70 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Book an appointment"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-cream p-6 text-espresso outline-none sm:rounded-3xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Step {stage} of 2</p>
            <h3 className="mt-1 font-serif text-[30px] font-medium leading-tight">
              {stage === 1 ? "Choose your service" : "Choose your barber"}
            </h3>
          </div>
          <button type="button" onClick={onClose} aria-label="Close booking" className="btn grid h-10 w-10 shrink-0 place-items-center rounded-full border border-espresso/20 hover:border-brass">
            <X size={18} />
          </button>
        </div>

        {stage === 1 ? (
          <>
            <div className="mt-6 space-y-3">
              {SERVICES.map((s) => (
                <button key={s.id} type="button" aria-pressed={serviceId === s.id} onClick={() => setServiceId(s.id)} className={row(serviceId === s.id)}>
                  <span>
                    <span className="block font-serif text-[22px] leading-tight">{s.label}</span>
                    <span className="mt-1 block text-[13px] text-stone">Rate confirmed at booking</span>
                  </span>
                  {tick(serviceId === s.id)}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setStage(2)} className="btn mt-6 w-full rounded-full bg-espresso py-3.5 text-[12px] font-bold uppercase tracking-[.14em] text-cream hover:bg-walnut">
              Continue
            </button>
          </>
        ) : (
          <>
            <p className="mt-2 text-[14px] text-stone">{service.label}</p>
            <div className="mt-5 space-y-3">
              <button type="button" aria-pressed={barberId === "any"} onClick={() => setBarberId("any")} className={row(barberId === "any")}>
                <span>
                  <span className="block font-serif text-[22px] leading-tight">First available</span>
                  <span className="mt-1 block text-[13px] text-stone">Soonest opening with any barber</span>
                </span>
                {tick(barberId === "any")}
              </button>
              {BARBERS.map((b) => (
                <button key={b.id} type="button" aria-pressed={barberId === b.id} onClick={() => setBarberId(b.id)} className={row(barberId === b.id)}>
                  <span>
                    <span className="block font-serif text-[22px] leading-tight">{b.name}</span>
                    <span className="mt-1 block text-[13px] text-stone">{b.detail}</span>
                  </span>
                  {tick(barberId === b.id)}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-espresso/10 bg-paper p-5">
              <p className="eyebrow">Your request</p>
              <p className="mt-2 font-serif text-[22px]">{service.label}</p>
              <p className="text-[14px] text-stone">with {barberName}</p>
              {liveLink ? (
                <a href={liveLink} target="_blank" rel="noopener noreferrer" className="btn mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brass py-3.5 text-[12px] font-bold uppercase tracking-[.14em] text-espresso hover:bg-brass-light">
                  See available times <ArrowUpRight size={15} />
                </a>
              ) : (
                <>
                  <p className="mt-4 text-[14px] text-stone">
                    Live calendars connect here once the shop activates scheduling. Until then, call and mention your service and barber.
                  </p>
                  <a href={`tel:${BUSINESS.phoneHref}`} className="btn mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brass py-3.5 text-[12px] font-bold uppercase tracking-[.14em] text-espresso hover:bg-brass-light">
                    <Phone size={15} /> Call {BUSINESS.phoneDisplay}
                  </a>
                </>
              )}
            </div>
            <button type="button" onClick={() => setStage(1)} className="btn mt-4 inline-flex items-center gap-2 text-[13px] font-bold text-stone hover:text-espresso">
              <ArrowLeft size={15} /> Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}

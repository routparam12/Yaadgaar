import { PricingPlan } from '../types/yaadgaar';

export type BillingCycle = 'monthly' | 'yearly';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'self-storage',
    name: 'Self-Storage',
    hindiTag: 'Apna Drive, Hamara Mandap',
    tagline: 'Keep your raw videos & photos in your own Google Drive or cloud. We host the ceremony experience, QR card & digital album.',
    oneTimePrice: '₹199',
    billingModel: 'one-time',
    included: [
      'One-time ₹199 host pass per wedding',
      'Live ceremony page (YouTube / HLS / RTMP ready)',
      'Real-time Blessings Wall & Guestbook',
      'Custom QR code for printed shaadi cards (PNG / SVG)',
      'Page-flip Digital Photo Book connected to your Drive',
    ],
  },
  {
    id: 'we-store-it',
    name: 'We Store It',
    hindiTag: 'Yaadgaar Vault · Preserved Forever',
    tagline: 'Zero storage worry. Yaadgaar permanently hosts your full HD ceremony chapters, raw photo vault, and shareable heirloom archive.',
    monthlyPrice: '₹299 / mo',
    yearlyPrice: '₹2,999 / yr',
    billingModel: 'recurring',
    recommended: true,
    included: [
      'Everything in Self-Storage, plus managed HD vault',
      'Permanent chaptered archive (Haldi to Reception)',
      'Unlimited guest uploads & full-res PDF album exports',
      'Multi-camera stream recording & automatic backups',
      'Priority WhatsApp concierge during wedding week',
    ],
  },
];

export function formatPlanPriceDisplay(
  plan: PricingPlan,
  cycle: BillingCycle,
): { amount: string; cadence: string } {
  if (plan.billingModel === 'one-time') {
    return {
      amount: plan.oneTimePrice ?? '₹199',
      cadence: 'One-time · Per wedding',
    };
  }
  return {
    amount: cycle === 'monthly' ? (plan.monthlyPrice ?? '₹299 / mo') : (plan.yearlyPrice ?? '₹2,999 / yr'),
    cadence: cycle === 'monthly' ? 'Billed monthly · Cancel anytime' : 'Billed yearly · Save ₹589',
  };
}

class PaymentService {
  getPlans(): PricingPlan[] {
    return PRICING_PLANS;
  }

  selectPlan(planId: PricingPlan['id'], cycle: BillingCycle): {
    planId: PricingPlan['id'];
    cycle: BillingCycle;
    confirmationCode: string;
    message: string;
  } {
    const plan = PRICING_PLANS.find((p) => p.id === planId) ?? PRICING_PLANS[0];
    const display = formatPlanPriceDisplay(plan, cycle);
    return {
      planId,
      cycle,
      confirmationCode: `YDG-${planId === 'self-storage' ? '199' : cycle.toUpperCase()}-READY`,
      message: `${plan.name} (${display.amount}) selected. Ready to launch your ceremony space.`,
    };
  }
}

export const paymentService = new PaymentService();

import { Bike, Clock, Gift, ShieldCheck } from "lucide-react";

export const authPerks = [
  {
    icon: Bike,
    title: "Fastest Doorstep Delivery",
    description: "Hot food, cold drinks, and grocery essentials delivered in minutes.",
  },
  {
    icon: Gift,
    title: "Exclusive Panda Deals",
    description: "Save more every day with member vouchers, discounts, and free delivery codes.",
  },
  {
    icon: Clock,
    title: "Live GPS Order Tracking",
    description: "Watch your rider prepare and arrive in real-time on our interactive map.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Contactless Payment",
    description: "Support for Cash on Delivery, GCash, credit/debit cards, and PandaPay.",
  },
] as const;

export const demoAccounts = [
  {
    label: "Customer (customer@example.com)",
    email: "customer@example.com",
    password: "password",
  },
  {
    label: "Merchant (merchant@example.com)",
    email: "merchant@example.com",
    password: "password",
  },
] as const;

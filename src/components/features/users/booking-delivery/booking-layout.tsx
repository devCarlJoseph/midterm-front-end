import { useEffect, useMemo, useState } from "react";

import api from "@/lib/axios";
import type {
  Address,
  ApiResponse,
  Cart,
  DeliveryOption,
  Store,
} from "@/lib/api-types";
import {
  calculateDistanceKm,
  calculateTotalDeliveryFee,
  MAX_DELIVERY_DISTANCE_KM,
} from "@/lib/delivery-fee";

import { BookingFreshnessCard } from "./booking-freshness-card";
import { BookingSafetyCard } from "./booking-safety-card";
import { BookingSteps } from "./booking-steps";
import { DeliveryDetails } from "./delivery-details";
import { DeliveryOptions } from "./delivery-options";
import { DeliveryTime } from "./delivery-time";
import { OrderItems } from "./order-items";
import { OrderSummary } from "./order-summary";
import { PaymentMethod } from "./payment-method";

import { useShop } from "@/context/shop-context";

interface BookingLayoutProps {
  cart: Cart | null;
}

export function BookingLayout({ cart }: BookingLayoutProps) {
  const { clearCart } = useShop();
  const [currentStep, setCurrentStep] = useState(1);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [selectedDeliveryOptionId, setSelectedDeliveryOptionId] =
    useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<
    "cash_on_delivery" | "online"
  >("cash_on_delivery");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [storeLocation, setStoreLocation] = useState<{
    latitude: number;
    longitude: number;
    name?: string;
  } | null>(null);

  useEffect(() => {
    async function fetchCheckoutData(): Promise<void> {
      try {
        const addressesResponse = await api.get<ApiResponse<Address[]>>("/addresses");
        const loadedAddresses = addressesResponse.data.data;

        // User requested strictly single address - keep only first/default
        const singleAddressList = loadedAddresses.length > 0 ? [loadedAddresses[0]] : [];
        setAddresses(singleAddressList);
        setSelectedAddressId(singleAddressList[0]?.id ?? null);

        if (!cart?.store) {
          setDeliveryOptions([]);
          setSelectedDeliveryOptionId(null);
          return;
        }

        // Store coordinates retrieval
        if (cart.store.latitude && cart.store.longitude) {
          setStoreLocation({
            latitude: Number(cart.store.latitude),
            longitude: Number(cart.store.longitude),
            name: cart.store.name,
          });
        } else {
          try {
            const storeRes = await api.get<ApiResponse<Store>>(`/stores/${cart.store.id}`);
            if (storeRes.data.data.latitude && storeRes.data.data.longitude) {
              setStoreLocation({
                latitude: Number(storeRes.data.data.latitude),
                longitude: Number(storeRes.data.data.longitude),
                name: storeRes.data.data.name,
              });
            }
          } catch (err) {
            console.warn("Unable to fetch store coordinates:", err);
          }
        }

        const optionsResponse = await api.get<ApiResponse<DeliveryOption[]>>(
          `/stores/${cart.store.id}/delivery-options`,
        );
        const loadedOptions = optionsResponse.data.data;

        setDeliveryOptions(loadedOptions);
        setSelectedDeliveryOptionId((current) => current ?? loadedOptions[0]?.id ?? null);
      } catch (error) {
        console.error("Unable to load checkout data:", error);
        setError("Unable to load your addresses or delivery options.");
      }
    }

    void fetchCheckoutData();
  }, [cart?.store?.id]);

  const activeAddress = useMemo(() => {
    return (
      addresses.find((address) => address.id === selectedAddressId) ??
      addresses[0] ??
      null
    );
  }, [addresses, selectedAddressId]);

  const selectedDeliveryOption = useMemo(
    () =>
      deliveryOptions.find((option) => option.id === selectedDeliveryOptionId) ??
      null,
    [deliveryOptions, selectedDeliveryOptionId],
  );

  // Distance calculation based on store coordinates & address coordinates
  const distanceKm = useMemo(() => {
    if (
      !storeLocation ||
      !activeAddress ||
      activeAddress.latitude == null ||
      activeAddress.longitude == null
    ) {
      return null;
    }
    return calculateDistanceKm(
      storeLocation.latitude,
      storeLocation.longitude,
      Number(activeAddress.latitude),
      Number(activeAddress.longitude),
    );
  }, [storeLocation, activeAddress]);

  const itemCount = cart?.items.reduce((total, item) => total + item.quantity, 0) ?? 0;
  const subtotal = Number(cart?.subtotal ?? 0);

  // Total delivery fee includes base (₱30) + distance (₱10/km) + option surcharge
  const deliveryFee = useMemo(() => {
    if (!selectedDeliveryOption) return 0;
    const effectiveDistance = distanceKm ?? 1.0;
    return calculateTotalDeliveryFee(
      effectiveDistance,
      selectedDeliveryOption.additional_fee,
    );
  }, [selectedDeliveryOption, distanceKm]);

  const goToNextStep = (): void => {
    if (currentStep === 1) {
      if (!selectedAddressId) {
        setError("Please add or select a delivery address.");
        return;
      }
      if (distanceKm !== null && distanceKm > MAX_DELIVERY_DISTANCE_KM) {
        setError(
          `Your address is ${distanceKm.toFixed(1)} km away. Maximum delivery radius is ${MAX_DELIVERY_DISTANCE_KM} km.`
        );
        return;
      }
      if (!selectedDeliveryOptionId) {
        setError("Please select a delivery option.");
        return;
      }
    }
    setError(null);
    setCurrentStep((current) => Math.min(current + 1, 4));
  };

  const goToPreviousStep = (): void => {
    setError(null);
    setCurrentStep((current) => Math.max(current - 1, 1));
  };

  const handlePlaceOrder = async (): Promise<void> => {
    if (!cart?.items.length) {
      setError("Your cart is empty.");
      return;
    }

    if (!selectedAddressId || !selectedDeliveryOptionId) {
      setError("Please select a delivery address and delivery option.");
      return;
    }

    if (distanceKm !== null && distanceKm > MAX_DELIVERY_DISTANCE_KM) {
      setError(
        `This address is ${distanceKm.toFixed(1)} km away, exceeding the store's ${MAX_DELIVERY_DISTANCE_KM} km limit. Please select a closer address.`
      );
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await api.post<ApiResponse<{ order_number: string }>>(
        "/orders",
        {
          address_id: selectedAddressId,
          delivery_option_id: selectedDeliveryOptionId,
          payment_method: paymentMethod,
        },
      );

      setOrderNumber(response.data.data.order_number);
      void clearCart();
    } catch (error) {
      console.error("Unable to place order:", error);
      setError("Unable to place your order. Please review your details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddressSaved = (savedAddress: Address) => {
    // Single address: keep only this saved address
    setAddresses([savedAddress]);
    setSelectedAddressId(savedAddress.id);
  };

  return (
    <section className="px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <BookingSteps currentStep={currentStep} onStepClick={setCurrentStep} />

        <div className="mt-4">
          {currentStep === 1 ? (
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
              <main className="min-w-0 rounded-xl border border-slate-200 bg-white p-5">
                <DeliveryDetails
                  addresses={addresses}
                  selectedAddressId={selectedAddressId}
                  onSelectAddress={setSelectedAddressId}
                  onAddressSaved={handleAddressSaved}
                />
                <DeliveryOptions
                  deliveryOptions={deliveryOptions}
                  selectedDeliveryOptionId={selectedDeliveryOptionId}
                  onSelectDeliveryOption={setSelectedDeliveryOptionId}
                  distanceKm={distanceKm}
                />
                <DeliveryTime />
                <OrderItems cart={cart} />
                <div className="mt-5 flex justify-end border-t border-slate-200 pt-5">
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="rounded-lg bg-[#08a66d] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#078f5e]"
                  >
                    Continue to Order Summary →
                  </button>
                </div>
              </main>
              <CheckoutAside />
            </div>
          ) : null}

          {currentStep === 2 ? (
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
              <main className="min-w-0 rounded-xl border border-slate-200 bg-white p-5">
                <div className="mb-5">
                  <h2 className="text-lg font-bold text-[#164f45]">Review Your Order</h2>
                  <p className="mt-1 text-xs text-slate-400">
                    Check your order details before proceeding to payment.
                  </p>
                </div>
                <OrderSummary
                  itemCount={itemCount}
                  subtotal={subtotal}
                  deliveryFee={deliveryFee}
                  distanceKm={distanceKm}
                  optionName={selectedDeliveryOption?.name}
                />
                <StepNavigation onBack={goToPreviousStep} onNext={goToNextStep} />
              </main>
              <CheckoutAside />
            </div>
          ) : null}

          {currentStep === 3 ? (
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
              <main className="min-w-0 rounded-xl border border-slate-200 bg-white p-5">
                <PaymentMethod
                  selectedMethod={paymentMethod}
                  onSelectMethod={setPaymentMethod}
                />
                <StepNavigation onBack={goToPreviousStep} onNext={goToNextStep} />
              </main>
              <CheckoutAside />
            </div>
          ) : null}

          {currentStep === 4 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#dff4e9] text-2xl text-[#08a66d]">
                  ✓
                </div>
                <h2 className="mt-4 text-xl font-bold text-[#164f45]">Confirm Your Order</h2>
                <p className="mx-auto mt-1 max-w-md text-xs text-slate-500">
                  Please review your delivery and payment details before placing your order.
                </p>
              </div>

              {/* Order breakdown card */}
              <div className="mx-auto mt-6 max-w-lg divide-y divide-slate-100 rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-left text-xs">
                {cart?.store?.name && (
                  <div className="flex items-center justify-between pb-2.5">
                    <span className="text-slate-500">Store</span>
                    <span className="font-semibold text-slate-800">{cart.store.name}</span>
                  </div>
                )}
                {activeAddress && (
                  <div className="flex items-start justify-between py-2.5">
                    <span className="text-slate-500">Deliver To</span>
                    <div className="text-right font-medium text-slate-800">
                      <p className="font-semibold">{activeAddress.recipient_name} ({activeAddress.phone})</p>
                      <p className="text-[11px] text-slate-600">
                        {activeAddress.line_one}
                        {activeAddress.barangay ? `, Brgy. ${activeAddress.barangay}` : ""}, {activeAddress.city}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-slate-500">Delivery Tier</span>
                  <span className="font-semibold text-emerald-800">
                    {selectedDeliveryOption?.name ?? "Standard"}
                    {distanceKm ? ` (${distanceKm.toFixed(1)} km)` : ""}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-slate-500">Payment</span>
                  <span className="font-semibold text-slate-800">
                    {paymentMethod === "cash_on_delivery" ? "Cash on Delivery (COD)" : "Online Payment"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-slate-500">Subtotal ({itemCount} items)</span>
                  <span className="font-semibold text-slate-700">₱ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-slate-500">Delivery Fee</span>
                  <span className="font-semibold text-slate-700">₱ {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between pt-3 font-bold text-sm text-[#164f45]">
                  <span>Total Amount</span>
                  <span className="text-base text-[#087a5a]">₱ {(subtotal + deliveryFee).toFixed(2)}</span>
                </div>
              </div>

              {error ? (
                <p className="mt-4 text-center text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200 max-w-lg mx-auto">
                  {error}
                </p>
              ) : null}

              {orderNumber ? (
                <div className="mt-4 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-center">
                  <p className="text-sm font-bold text-emerald-900">
                    Order Placed Successfully!
                  </p>
                  <p className="mt-1 text-xs text-emerald-800">
                    Your order tracking number is <strong>{orderNumber}</strong>.
                  </p>
                </div>
              ) : null}

              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="rounded-lg border border-slate-200 px-5 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => void handlePlaceOrder()}
                  disabled={isSubmitting || orderNumber !== null}
                  className="rounded-lg bg-[#08a66d] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-[#078f5e] disabled:cursor-not-allowed disabled:opacity-60 shadow-xs"
                >
                  {isSubmitting ? "Placing Order..." : `Place Order (₱ ${(subtotal + deliveryFee).toFixed(2)})`}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function CheckoutAside() {
  return (
    <aside>
      <BookingSafetyCard />
      <BookingFreshnessCard />
    </aside>
  );
}

function StepNavigation({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-5">
      <button
        type="button"
        onClick={onBack}
        className="rounded-lg border border-slate-200 px-5 py-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
      >
        ← Back
      </button>
      <button
        type="button"
        onClick={onNext}
        className="rounded-lg bg-[#08a66d] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#078f5e]"
      >
        Continue →
      </button>
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

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
import { useShop } from "@/context/shop-context";

import { BookingSteps } from "../ui/booking-steps";
import { DeliveryDetails } from "../ui/delivery-details";
import { DeliveryOptions } from "../ui/delivery-options";
import { DeliveryTime } from "../ui/delivery-time";
import { OrderItems } from "../ui/order-items";
import { OrderSummary } from "../ui/order-summary";
import { PaymentMethod } from "../ui/payment-method";
import { BookingCheckoutAside } from "../ui/booking-checkout-aside";
import { BookingStepNavigation } from "../ui/booking-step-navigation";
import { BookingConfirmationStep } from "../ui/booking-confirmation-step";
import { OrderSuccessModal } from "../ui/order-success-modal";

interface BookingLayoutProps {
  cart: Cart | null;
}

export function BookingLayout({ cart }: BookingLayoutProps) {
  const navigate = useNavigate();
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
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
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
          `/stores/${cart.store.id}/delivery-options`
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

  useEffect(() => {
    if (!isSuccessModalOpen) return;

    const redirectTimer = window.setTimeout(() => navigate("/"), 2500);
    return () => window.clearTimeout(redirectTimer);
  }, [isSuccessModalOpen, navigate]);

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
    [deliveryOptions, selectedDeliveryOptionId]
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
      Number(activeAddress.longitude)
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
      selectedDeliveryOption.additional_fee
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
        }
      );

      setOrderNumber(response.data.data.order_number);
      setIsSuccessModalOpen(true);
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
      <OrderSuccessModal
        isOpen={isSuccessModalOpen}
        orderNumber={orderNumber}
        onContinue={() => navigate("/")}
      />
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
                    className="rounded-lg bg-[#08a66d] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#078f5e] cursor-pointer"
                  >
                    Continue to Order Summary
                  </button>
                </div>
              </main>
              <BookingCheckoutAside />
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
                <BookingStepNavigation
                  onBack={goToPreviousStep}
                  onNext={goToNextStep}
                />
              </main>
              <BookingCheckoutAside />
            </div>
          ) : null}

          {currentStep === 3 ? (
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
              <main className="min-w-0 rounded-xl border border-slate-200 bg-white p-5">
                <PaymentMethod
                  selectedMethod={paymentMethod}
                  onSelectMethod={setPaymentMethod}
                />
                <BookingStepNavigation
                  onBack={goToPreviousStep}
                  onNext={goToNextStep}
                />
              </main>
              <BookingCheckoutAside />
            </div>
          ) : null}

          {currentStep === 4 ? (
            <BookingConfirmationStep
              cart={cart}
              activeAddress={activeAddress}
              selectedDeliveryOption={selectedDeliveryOption}
              distanceKm={distanceKm}
              paymentMethod={paymentMethod}
              itemCount={itemCount}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              error={error}
              orderNumber={orderNumber}
              isSubmitting={isSubmitting}
              onBack={goToPreviousStep}
              onPlaceOrder={handlePlaceOrder}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

import { Plus } from "lucide-react";
import type { Address } from "@/lib/api-types";

import { AddressMethodChooser } from "./address-method-chooser";
import { AddressForm } from "../forms/address-form";
import { useAddressForm } from "../forms/use-address-form";
import { SelectedAddressCard } from "./selected-address-card";
import { EmptyAddressPrompt } from "./empty-address-prompt";

interface DeliveryDetailsProps {
  addresses: Address[];
  selectedAddressId: number | null;
  onSelectAddress: (addressId: number) => void;
  onAddressSaved?: (savedAddress: Address) => void;
}

export function DeliveryDetails({
  addresses,
  onSelectAddress,
  onAddressSaved,
}: DeliveryDetailsProps) {
  const {
    isAddingNew,
    showOptionChoice,
    editingAddressId,
    handleStartAddAddress,
    startEdit,
    chooserProps,
    formProps,
  } = useAddressForm({
    addresses,
    onSelectAddress,
    onAddressSaved,
  });

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#164f45]">Delivery Details</h2>
          <p className="mt-1 text-xs text-slate-400">
            Where should we deliver your order? (Grab-style live address select)
          </p>
        </div>
        {!isAddingNew && !editingAddressId && addresses.length === 0 && (
          <button
            type="button"
            onClick={handleStartAddAddress}
            className="flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-100 cursor-pointer"
          >
            <Plus size={14} />
            Add Address
          </button>
        )}
      </div>

      {/* Choice Prompt: Turn on Location vs Manual Input */}
      {isAddingNew && showOptionChoice && (
        <AddressMethodChooser {...chooserProps} />
      )}

      {/* Inline Address Form (Add or Edit) */}
      {((isAddingNew && !showOptionChoice) || editingAddressId) && (
        <AddressForm {...formProps} />
      )}

      {/* Empty State */}
      {addresses.length === 0 && !isAddingNew && (
        <EmptyAddressPrompt onAddAddress={handleStartAddAddress} />
      )}

      {/* Address Display (Single Address Only) */}
      {addresses.length > 0 && !isAddingNew && !editingAddressId && (
        <SelectedAddressCard
          address={addresses[0]}
          onEdit={(e) => startEdit(addresses[0], e)}
        />
      )}
    </section>
  );
}

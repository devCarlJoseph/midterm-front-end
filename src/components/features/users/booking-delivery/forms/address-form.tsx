import React from "react";
import { AddressFormHeader } from "./address-form-header";
import { AddressFormFields } from "./address-form-fields";
import { AddressFormActions } from "./address-form-actions";

export interface AddressFormProps {
  editingAddressId: number | null;
  latitude: number | null;
  longitude: number | null;
  isDetectingLocation: boolean;
  locationSuccess: string | null;
  locationError: string | null;
  formError: string | null;
  isSaving: boolean;
  label: string;
  recipientName: string;
  phone: string;
  lineOne: string;
  lineTwo: string;
  barangay: string;
  city: string;
  province: string;
  postalCode: string;
  setLabel: (val: string) => void;
  setRecipientName: (val: string) => void;
  setPhone: (val: string) => void;
  setLineOne: (val: string) => void;
  setLineTwo: (val: string) => void;
  setBarangay: (val: string) => void;
  setCity: (val: string) => void;
  setProvince: (val: string) => void;
  setPostalCode: (val: string) => void;
  onDetectLocation: () => void;
  onSave: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function AddressForm({
  editingAddressId,
  latitude,
  longitude,
  isDetectingLocation,
  locationSuccess,
  locationError,
  formError,
  isSaving,
  label,
  recipientName,
  phone,
  lineOne,
  lineTwo,
  barangay,
  city,
  province,
  postalCode,
  setLabel,
  setRecipientName,
  setPhone,
  setLineOne,
  setLineTwo,
  setBarangay,
  setCity,
  setProvince,
  setPostalCode,
  onDetectLocation,
  onSave,
  onCancel,
}: AddressFormProps) {
  return (
    <form
      onSubmit={onSave}
      className="mt-4 rounded-xl border border-emerald-200 bg-[#f9fdfa] p-4 shadow-xs"
    >
      <AddressFormHeader
        editingAddressId={editingAddressId}
        latitude={latitude}
        longitude={longitude}
        isDetectingLocation={isDetectingLocation}
        locationSuccess={locationSuccess}
        locationError={locationError}
        formError={formError}
        onDetectLocation={onDetectLocation}
        onCancel={onCancel}
      />

      <AddressFormFields
        label={label}
        recipientName={recipientName}
        phone={phone}
        lineOne={lineOne}
        lineTwo={lineTwo}
        barangay={barangay}
        city={city}
        province={province}
        postalCode={postalCode}
        setLabel={setLabel}
        setRecipientName={setRecipientName}
        setPhone={setPhone}
        setLineOne={setLineOne}
        setLineTwo={setLineTwo}
        setBarangay={setBarangay}
        setCity={setCity}
        setProvince={setProvince}
        setPostalCode={setPostalCode}
      />

      <AddressFormActions
        isSaving={isSaving}
        editingAddressId={editingAddressId}
        onCancel={onCancel}
      />
    </form>
  );
}

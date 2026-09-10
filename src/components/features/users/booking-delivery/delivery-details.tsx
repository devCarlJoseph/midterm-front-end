import { useState } from "react";
import {
  Plus,
  Edit2,
  Check,
  X,
  MapPin,
  Navigation,
  Loader2,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import type { Address, ApiResponse } from "@/lib/api-types";
import api from "@/lib/axios";

interface DeliveryDetailsProps {
  addresses: Address[];
  selectedAddressId: number | null;
  onSelectAddress: (addressId: number) => void;
  onAddressSaved?: (savedAddress: Address) => void;
}

export function DeliveryDetails({
  addresses,
  selectedAddressId: _selectedAddressId,
  onSelectAddress,
  onAddressSaved,
}: DeliveryDetailsProps) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showOptionChoice, setShowOptionChoice] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Location detection state
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Form inputs
  const [label, setLabel] = useState("Home");
  const [recipientName, setRecipientName] = useState("");
  const [phone, setPhone] = useState("");
  const [lineOne, setLineOne] = useState("");
  const [lineTwo, setLineTwo] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("Cordova");
  const [province, setProvince] = useState("Cebu");
  const [postalCode, setPostalCode] = useState("6017");
  const [latitude, setLatitude] = useState<number | null>(10.2569);
  const [longitude, setLongitude] = useState<number | null>(123.9471);

  const resetForm = () => {
    setLabel("Home");
    setRecipientName("");
    setPhone("");
    setLineOne("");
    setLineTwo("");
    setBarangay("");
    setCity("Cordova");
    setProvince("Cebu");
    setPostalCode("6017");
    setLatitude(10.2569);
    setLongitude(123.9471);
    setEditingAddressId(null);
    setIsAddingNew(false);
    setShowOptionChoice(false);
    setFormError(null);
    setLocationSuccess(null);
    setLocationError(null);
    setIsDetectingLocation(false);
  };

  const handleStartAddAddress = () => {
    resetForm();
    setIsAddingNew(true);
    setShowOptionChoice(true);
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser. Please enter your address manually.");
      setShowOptionChoice(false);
      return;
    }

    setIsDetectingLocation(true);
    setLocationError(null);
    setLocationSuccess(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lon);
        setShowOptionChoice(false);

        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 6000);
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
            {
              signal: controller.signal,
              headers: {
                Accept: "application/json",
              },
            }
          );
          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            const addr = data.address || {};
            const road =
              addr.road ||
              addr.pedestrian ||
              addr.suburb ||
              addr.neighbourhood ||
              addr.amenity ||
              "";
            const houseNumber = addr.house_number ? `${addr.house_number} ` : "";
            const street =
              (houseNumber + road).trim() ||
              data.display_name?.split(",")[0] ||
              "Pinned Location";
            const brgy =
              addr.quarter ||
              addr.suburb ||
              addr.neighbourhood ||
              addr.village ||
              "";
            const cityName =
              addr.city || addr.town || addr.municipality || "Cordova";
            const provName = addr.state || addr.region || addr.province || "Cebu";
            const postCode = addr.postcode || "6017";

            setLineOne(street);
            if (brgy) setBarangay(brgy);
            setCity(cityName);
            setProvince(provName);
            setPostalCode(postCode);
            setLocationSuccess(`Location detected: ${street}, ${cityName}`);
          } else {
            setLocationSuccess(
              `GPS coordinates pinned (${lat.toFixed(4)}, ${lon.toFixed(4)}). Please confirm address details.`
            );
          }
        } catch {
          setLocationSuccess(
            `GPS coordinates pinned (${lat.toFixed(4)}, ${lon.toFixed(4)}). Please enter street name.`
          );
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        setIsDetectingLocation(false);
        let msg = "Could not get location. Please input address manually.";
        if (error.code === error.PERMISSION_DENIED) {
          msg =
            "Location permission was denied. Please allow location access in your browser or enter your address manually.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = "Location information is unavailable on your device. Please enter manually.";
        } else if (error.code === error.TIMEOUT) {
          msg = "Location detection timed out. Please enter manually.";
        }
        setLocationError(msg);
        setShowOptionChoice(false);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
    );
  };

  const handleManualInput = () => {
    setShowOptionChoice(false);
    setLocationSuccess(null);
    setLocationError(null);
  };

  const startEdit = (address: Address, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingAddressId(address.id);
    setIsAddingNew(false);
    setShowOptionChoice(false);
    setLabel(address.label);
    setRecipientName(address.recipient_name);
    setPhone(address.phone);
    setLineOne(address.line_one);
    setLineTwo(address.line_two ?? "");
    setBarangay(address.barangay ?? "");
    setCity(address.city);
    setProvince(address.province);
    setPostalCode(address.postal_code ?? "6017");
    setLatitude(address.latitude ? Number(address.latitude) : 10.2569);
    setLongitude(address.longitude ? Number(address.longitude) : 123.9471);
    setFormError(null);
    setLocationSuccess(null);
    setLocationError(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName || !phone || !lineOne || !city || !province) {
      setFormError("Please fill in all required fields.");
      return;
    }

    setIsSaving(true);
    setFormError(null);

    const payload = {
      label,
      recipient_name: recipientName,
      phone,
      line_one: lineOne,
      line_two: lineTwo || null,
      barangay: barangay || null,
      city,
      province,
      postal_code: postalCode || null,
      latitude: latitude ?? 10.2569,
      longitude: longitude ?? 123.9471,
      is_default: addresses.length === 0,
    };

    try {
      if (editingAddressId) {
        const res = await api.patch<ApiResponse<Address>>(
          `/addresses/${editingAddressId}`,
          payload
        );
        if (onAddressSaved) {
          onAddressSaved(res.data.data);
        }
      } else {
        const res = await api.post<ApiResponse<Address>>("/addresses", payload);
        if (onAddressSaved) {
          onAddressSaved(res.data.data);
          onSelectAddress(res.data.data.id);
        }
      }
      resetForm();
    } catch (err: unknown) {
      console.error("Failed to save address:", err);
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setFormError(
        axiosErr.response?.data?.message ??
          "Unable to save address. Please check your information."
      );
    } finally {
      setIsSaving(false);
    }
  };

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
            className="flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-100"
          >
            <Plus size={14} />
            Add Address
          </button>
        )}
      </div>

      {/* Choice Prompt: Turn on Location vs Manual Input */}
      {isAddingNew && showOptionChoice && (
        <div className="mt-4 rounded-xl border-2 border-emerald-200 bg-linear-to-b from-[#f4fbf7] to-white p-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-emerald-950">
                Choose How to Set Your Delivery Address
              </h3>
              <p className="mt-0.5 text-xs text-slate-500">
                You can turn on your location to auto-detect, or type your address manually.
              </p>
            </div>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Option 1: Turn On Location */}
            <button
              type="button"
              disabled={isDetectingLocation}
              onClick={handleDetectLocation}
              className="group relative flex flex-col items-start rounded-xl border-2 border-emerald-500/40 bg-white p-4 text-left shadow-xs transition hover:border-emerald-600 hover:bg-emerald-50/50 hover:shadow-md disabled:opacity-60"
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 transition group-hover:scale-105">
                  {isDetectingLocation ? (
                    <Loader2 size={20} className="animate-spin text-emerald-700" />
                  ) : (
                    <Navigation size={20} className="text-emerald-700" />
                  )}
                </div>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  Fastest
                </span>
              </div>

              <div className="mt-3">
                <h4 className="text-sm font-bold text-slate-800 group-hover:text-emerald-900">
                  Turn On Location
                </h4>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Use your device&apos;s GPS to automatically detect your current address &amp; pin coordinates.
                </p>
              </div>

              <div className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-700 py-2 text-xs font-semibold text-white transition group-hover:bg-emerald-800">
                {isDetectingLocation ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    Detecting Location...
                  </>
                ) : (
                  <>
                    <Navigation size={13} />
                    Turn On My Location
                  </>
                )}
              </div>
            </button>

            {/* Option 2: Manually Input Address */}
            <button
              type="button"
              onClick={handleManualInput}
              className="group flex flex-col items-start rounded-xl border border-slate-200 bg-white p-4 text-left shadow-xs transition hover:border-slate-400 hover:bg-slate-50/70 hover:shadow-md"
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:scale-105">
                  <Edit2 size={18} className="text-slate-700" />
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                  Manual
                </span>
              </div>

              <div className="mt-3">
                <h4 className="text-sm font-bold text-slate-800 group-hover:text-slate-950">
                  Enter Address Manually
                </h4>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Type in your street address, barangay, city, and delivery details by hand.
                </p>
              </div>

              <div className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white py-2 text-xs font-semibold text-slate-700 transition group-hover:bg-slate-100">
                <Edit2 size={13} />
                Manually Input
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Inline Address Form (Add or Edit) */}
      {(isAddingNew && !showOptionChoice) || editingAddressId ? (
        <form
          onSubmit={handleSave}
          className="mt-4 rounded-xl border border-emerald-200 bg-[#f9fdfa] p-4 shadow-xs"
        >
          <div className="flex items-center justify-between border-b border-emerald-100 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-900">
                {editingAddressId ? "Edit Delivery Address" : "New Delivery Address"}
              </span>
              {latitude && longitude && (
                <span className="hidden items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800 sm:inline-flex">
                  <MapPin size={10} />
                  GPS: {latitude.toFixed(4)}, {longitude.toFixed(4)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              {/* Quick toggle to re-detect location */}
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={isDetectingLocation}
                title="Detect current location via GPS"
                className="flex items-center gap-1 rounded-md border border-emerald-300 bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-800 transition hover:bg-emerald-100 disabled:opacity-60"
              >
                {isDetectingLocation ? (
                  <Loader2 size={12} className="animate-spin text-emerald-700" />
                ) : (
                  <Navigation size={12} />
                )}
                <span>{isDetectingLocation ? "Detecting..." : "Detect Location"}</span>
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Location Status Notifications */}
          {locationSuccess && (
            <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs text-emerald-800">
              <Sparkles size={14} className="shrink-0 text-emerald-600" />
              <span className="flex-1">{locationSuccess}</span>
            </div>
          )}

          {locationError && (
            <div className="mt-2.5 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs text-amber-800">
              <AlertCircle size={14} className="mt-0.5 shrink-0 text-amber-600" />
              <div className="flex-1">
                <span>{locationError}</span>
              </div>
            </div>
          )}

          {formError && (
            <p className="mt-2 text-xs font-medium text-red-600">{formError}</p>
          )}

          <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-[11px] font-medium text-slate-600">
                Address Label
              </label>
              <div className="mt-1 flex items-center gap-2">
                {["Home", "Work", "Other"].map((lbl) => (
                  <button
                    key={lbl}
                    type="button"
                    onClick={() => setLabel(lbl)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                      label === lbl
                        ? "bg-emerald-700 text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
                {!["Home", "Work"].includes(label) && (
                  <input
                    type="text"
                    placeholder="Custom label"
                    value={label === "Other" ? "" : label}
                    onChange={(e) => setLabel(e.target.value || "Other")}
                    className="flex-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs outline-none focus:border-emerald-600"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600">
                Recipient Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Full name of receiver"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600">
                Contact Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 09171234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600">
                Street Address / House # <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 123 Rizal St. or P. Rodriguez St."
                value={lineOne}
                onChange={(e) => setLineOne(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600">
                Barangay / Neighborhood
              </label>
              <input
                type="text"
                placeholder="e.g. Poblacion, Bangbang, Gabi"
                value={barangay}
                onChange={(e) => setBarangay(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600">
                City / Municipality <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600">
                Province <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600">
                Unit / Floor / Landmark (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Unit 2B, Near Dali Store"
                value={lineTwo}
                onChange={(e) => setLineTwo(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600">
                Postal Code
              </label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2 border-t border-emerald-100 pt-3">
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-1.5 rounded-lg bg-[#08a66d] px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#078f5e] disabled:opacity-60"
            >
              {isSaving ? (
                <div className="h-3 w-3 animate-spin rounded-full border border-white border-t-transparent" />
              ) : (
                <Check size={14} />
              )}
              {editingAddressId ? "Update Address" : "Save Address"}
            </button>
          </div>
        </form>
      ) : null}

      {/* Address Display (Single Address Only) */}
      {addresses.length === 0 && !isAddingNew ? (
        <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
          <MapPin size={24} className="mx-auto text-slate-400" />
          <p className="mt-2 text-xs font-medium text-slate-600">
            No delivery address saved yet.
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            Please set your delivery address to proceed with the Grab booking.
          </p>
          <button
            type="button"
            onClick={handleStartAddAddress}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#08a66d] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#078f5e]"
          >
            <Plus size={14} />
            Add Address Now
          </button>
        </div>
      ) : addresses.length > 0 && !isAddingNew && !editingAddressId ? (
        <div className="mt-5 space-y-3">
          {(() => {
            const address = addresses[0];

            return (
              <div
                key={address.id}
                className="rounded-xl border border-[#08a66d] bg-[#eef9f3] p-4 transition shadow-xs"
              >
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 rounded-md bg-emerald-700 px-2 py-0.5 text-[10px] font-bold text-white">
                        <MapPin size={10} />
                        {address.label || "Delivery Address"}
                      </span>
                      {address.latitude && address.longitude && (
                        <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800">
                          GPS: {Number(address.latitude).toFixed(4)}, {Number(address.longitude).toFixed(4)}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-700">
                      <span className="font-semibold text-slate-900">
                        {address.recipient_name}
                      </span>{" "}
                      · <span className="font-medium text-slate-600">{address.phone}</span>
                      <br />
                      <span className="font-medium text-slate-800">{address.line_one}</span>
                      {address.barangay ? `, Brgy. ${address.barangay}` : ""}
                      {address.line_two ? `, ${address.line_two}` : ""},{" "}
                      {address.city}, {address.province} {address.postal_code ? `(${address.postal_code})` : ""}
                    </p>
                  </div>

                </div>

                {/* Helpful tip for users not at home */}
                <div className="mt-3 flex items-center justify-between border-t border-emerald-200/60 pt-2.5 text-xs text-emerald-800">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <Navigation size={13} className="shrink-0 text-emerald-600" />
                    Not at home right now? Update your address or auto-detect via GPS.
                  </span>
                  <button
                    type="button"
                    onClick={(e) => startEdit(address, e)}
                    className="flex items-center gap-1 rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-xs transition hover:bg-emerald-50 hover:border-emerald-500 shrink-0 ml-2"
                  >
                    <Navigation size={12} />
                    Update Location
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      ) : null}
    </section>
  );
}

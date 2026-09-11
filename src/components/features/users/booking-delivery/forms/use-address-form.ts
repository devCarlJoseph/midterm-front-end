import { useState } from "react";
import type { Address, ApiResponse } from "@/lib/api-types";
import api from "@/lib/axios";

interface UseAddressFormProps {
  addresses: Address[];
  onSelectAddress: (addressId: number) => void;
  onAddressSaved?: (savedAddress: Address) => void;
}

export function useAddressForm({
  addresses,
  onSelectAddress,
  onAddressSaved,
}: UseAddressFormProps) {
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
      setLocationError(
        "Geolocation is not supported by your browser. Please enter your address manually."
      );
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
          msg =
            "Location information is unavailable on your device. Please enter manually.";
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

  return {
    isAddingNew,
    showOptionChoice,
    editingAddressId,
    handleStartAddAddress,
    startEdit,
    resetForm,
    chooserProps: {
      isDetectingLocation,
      onDetectLocation: handleDetectLocation,
      onManualInput: handleManualInput,
      onClose: resetForm,
    },
    formProps: {
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
      onDetectLocation: handleDetectLocation,
      onSave: handleSave,
      onCancel: resetForm,
    },
  };
}

import { AddressLabelSelector } from "./address-label-selector";

interface AddressFormFieldsProps {
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
}

export function AddressFormFields({
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
}: AddressFormFieldsProps) {
  return (
    <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
      <AddressLabelSelector label={label} setLabel={setLabel} />

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
  );
}

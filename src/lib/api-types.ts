export type ApiResponse<T> = {
  data: T;
  message?: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  links?: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta?: {
    current_page: number;
    from: number | null;
    last_page: number;
    per_page: number;
    to: number | null;
    total: number;
  };
};

export type User = {
  id: number;
  name: string;
  email: string;
  role: "customer" | "merchant" | "driver" | "admin" | string;
  created_at: string | null;
};

export type AuthResponseData = {
  user: User;
  token: string;
  token_type: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type Store = {
  id: number;
  name: string;
  slug: string;
  description: string;
  address: string;
  latitude: string;
  longitude: string;
  is_active: boolean;
};

export type ProductItem = {
  id: number;
  name: string;
  description: string | null;
  price: string;
  stock_quantity: number;
  unit: string;
  is_available: boolean;
  category?: Category;
  store_id?: number;
  store?: Pick<Store, "id" | "name">;
};

export type Address = {
  id: number;
  label: string;
  recipient_name: string;
  phone: string;
  line_one: string;
  line_two: string | null;
  barangay: string | null;
  city: string;
  province: string;
  postal_code: string;
  latitude?: number | string | null;
  longitude?: number | string | null;
  is_default: boolean;
};

export type DeliveryOption = {
  id: number;
  name: string;
  description: string | null;
  additional_fee: string;
  estimated_delivery_minutes: number;
  is_active: boolean;
};

export type CartProduct = {
  id: number;
  name: string;
  price: string;
  unit: string;
};

export type CartItem = {
  id: number;
  quantity: number;
  line_total: string;
  product: CartProduct;
};

export type Cart = {
  id: number | null;
  store: {
    id: number;
    name: string;
    latitude?: string | number | null;
    longitude?: string | number | null;
  } | null;
  items: CartItem[];
  subtotal: string;
};

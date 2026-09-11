import { useEffect, useState } from "react";
import { DailyDealsSection } from "@/components/features/users/home/daily-deals-section";
import { FavoriteStoresSection } from "@/components/features/users/home/favorite-stores-section";
import api from "@/lib/axios";
import type { Store, Category, PaginatedResponse, ApiResponse } from "@/lib/api-types";
import { getCached, setCached } from "@/lib/api-cache";
import { HomeHeroSection } from "@/components/features/users/home/hero-section";

const fallbackStores: Store[] = [
  {
    id: 1,
    name: "Dali Everyday Grocery - Poblacion Cordova",
    slug: "dali-everyday-grocery-poblacion",
    description:
      "Everyday low prices on pantry staples, snacks, beverages, and household goods.",
    address: "Poblacion, Cordova, Cebu",
    latitude: "10.2520",
    longitude: "123.9510",
    is_active: true,
  },
  {
    id: 2,
    name: "Cordova Fresh Meat & Seafood Depot",
    slug: "cordova-fresh-meat-seafood",
    description:
      "Freshly dressed local pork, farm chicken, premium beef cuts, and fresh fish.",
    address: "San Miguel, Cordova, Cebu",
    latitude: "10.2545",
    longitude: "123.9480",
    is_active: true,
  },
  {
    id: 3,
    name: "Island Green Farm & Fruit Market",
    slug: "island-green-farm-fruits",
    description:
      "Organic vegetables, fresh lettuce, tomatoes, bananas, and ripe mangoes.",
    address: "Bangbang, Cordova, Cebu",
    latitude: "10.2580",
    longitude: "123.9420",
    is_active: true,
  },
  {
    id: 4,
    name: "Pan De Dali Artisan Bakery",
    slug: "pan-de-dali-artisan-bakery",
    description:
      "Hot oven pandesal, ensaymada, sliced bread, Spanish bread, and pastries.",
    address: "Catarman, Cordova, Cebu",
    latitude: "10.2610",
    longitude: "123.9550",
    is_active: true,
  },
  {
    id: 5,
    name: "Dali Dairy & Morning Essentials",
    slug: "dali-dairy-morning-essentials",
    description:
      "Farm fresh eggs, pasteurized fresh milk, butter, cheeses, and breakfast yogurts.",
    address: "Day-as, Cordova, Cebu",
    latitude: "10.2490",
    longitude: "123.9600",
    is_active: true,
  },
  {
    id: 6,
    name: "Dali Snack & Sweet Delights",
    slug: "dali-snack-sweet-delights",
    description:
      "Crispy chips, imported biscuits, chocolates, candies, and kid-friendly party treats.",
    address: "Gabi, Cordova, Cebu",
    latitude: "10.2640",
    longitude: "123.9470",
    is_active: true,
  },
  {
    id: 7,
    name: "Cordova Beverage & Chilled Drinks Hub",
    slug: "cordova-beverage-chilled-drinks",
    description:
      "Cold soft drinks, natural fruit juices, mineral water, energy drinks, and craft beers.",
    address: "Alegria, Cordova, Cebu",
    latitude: "10.2560",
    longitude: "123.9520",
    is_active: true,
  },
  {
    id: 8,
    name: "Dali Supermarket Express - Lapu-Lapu Link",
    slug: "dali-supermarket-express-lapu-lapu",
    description:
      "Comprehensive supermarket catalog with fast 20-minute delivery to your doorstep.",
    address: "Basak-Cordova boundary, Cebu",
    latitude: "10.2700",
    longitude: "123.9650",
    is_active: true,
  },
];

export default function HomePage() {
  const [stores, setStores] = useState<Store[]>(() => {
    const cached = getCached<Store[]>("home_stores");
    return cached && cached.length > 0 ? cached : fallbackStores;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    return getCached<Category[]>("home_categories") ?? [];
  });

  const [, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const [storesRes, categoriesRes] = await Promise.allSettled([
          api.get<PaginatedResponse<Store>>("/stores?per_page=30"),
          api.get<ApiResponse<Category[]>>("/categories"),
        ]);

        if (storesRes.status === "fulfilled" && storesRes.value.data.data.length > 0) {
          setStores(storesRes.value.data.data);
          setCached("home_stores", storesRes.value.data.data);
        }

        if (categoriesRes.status === "fulfilled") {
          setCategories(categoriesRes.value.data.data);
          setCached("home_categories", categoriesRes.value.data.data);
        }
      } catch (err) {
        console.error("Failed to load home page data from backend:", err);
      } finally {
        setIsLoading(false);
      }
    }

    void fetchHomeData();
  }, []);

  return (
    <div className="pb-12">

      <HomeHeroSection />

      <DailyDealsSection />

      <FavoriteStoresSection stores={stores} />

    </div>
  );
}

import { MapPin, Clock, MoveRight } from "lucide-react";

const storeData = {
  store: [
    {
      id: 1,
      storeImage: "Image 1",
      storeName: "Fresh Super Market",
      deliveryTime: "1.5 hr",
      storeDistance: 18,
    },
    {
      id: 2,
      storeImage: "Image 2",
      storeName: "Shop Grocery",
      deliveryTime: "56 mins",
      storeDistance: 18,
    },
    {
      id: 3,
      storeImage: "Image 3",
      storeName: "Dranken Service",
      deliveryTime: "56 mins",
      storeDistance: 18,
    },
    {
      id: 4,
      storeImage: "Image 4",
      storeName: "Eco Market",
      deliveryTime: "56 mins",
      storeDistance: 18,
    },
    {
      id: 5,
      storeImage: "Image 5",
      storeName: "Groceries",
      deliveryTime: "56 mins",
      storeDistance: 18,
    },
    {
      id: 6,
      storeImage: "Image 6",
      storeName: "Market",
      deliveryTime: "56 mins",
      storeDistance: 18,
    },
    {
      id: 7,
      storeImage: "Image 7",
      storeName: "Fresh Super",
      deliveryTime: "56 mins",
      storeDistance: 18,
    },
    {
      id: 7,
      storeImage: "Image 8",
      storeName: "Super Market",
      deliveryTime: "56 mins",
      storeDistance: 18,
    },
  ],
};

export function StoreSection() {
  return (
    <section>
      <div className="mb-5">
        <h1 className="text-lg font-semibold">All Stores</h1>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-6">
          {storeData.store.map((stores) => (
            <div className="flex flex-col items-center pt-4">
              <div className="flex justify-center items-center w-20 h-20 bg-gray-100 rounded-full">
                <div>{stores.storeImage}</div>
              </div>

              <div className="pt-2 text-center">
                <h1 className="text-sm font-medium">{stores.storeName}</h1>
              </div>

              <div className="flex gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <Clock size={14} className="text-emerald-800" />
                  <div className="text-xs font-medium text-emerald-700">
                    {stores.deliveryTime}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <MapPin size={14} className="text-emerald-800" />
                  <div className="text-xs font-medium text-emerald-700">
                    {stores.storeDistance} km
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-100">
            <MoveRight size={16} />
          </div>
          <div className="text-xs font-medium pt-1">
            Show All
          </div>
          <div className="text-xs font-medium">
            45 Stores
          </div>
        </div>
      </div>
    </section>
  );
}

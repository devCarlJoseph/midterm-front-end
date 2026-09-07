import { Star } from "lucide-react";


type Stores =
{
    id: number,
    storeName: string,
    storeCategory: string,
    storeStar: number,
    location: number,
}

const NearbyStores: Stores[] =
[
        {
            id: 1,
            storeName: "Sweet Crumbs Bakery",
            storeCategory: "Bakery",
            storeStar: 4.9,
            location: 0.5
        },
        {
            id: 2,
            storeName: "Crunch Corner",
            storeCategory: "Snacks",
            storeStar: 4.7,
            location: 0.6
        },
        {
            id: 3,
            storeName: "Prime Meat Shop",
            storeCategory: "Meat & Fish",
            storeStar: 4.6,
            location: 1.8
        },
        {
            id: 4,
            storeName: "Fresh Dairy Hub",
            storeCategory: "Dairy",
            storeStar: 4.8,
            location: 0.8
        },
        {
            id: 5,
            storeName: "Golden Farm Store",
            storeCategory: "Dairy & Eggs",
            storeStar: 4.4,
            location: 2.3
        },
        {
            id: 6,
            storeName: "Quick Pantry",
            storeCategory: "Packed Foods",
            storeStar: 4.6,
            location: 1.0
        },
        {
            id: 7,
            storeName: "Cheers Corner",
            storeCategory: "Alcohol",
            storeStar: 4.5,
            location: 1.6
        },
        {
            id: 8,
            storeName: "Fresh Harvest Market",
            storeCategory: "Vegetables & Fruits",
            storeStar: 4.6,
            location: 1.7
        },
        {
            id: 9,
            storeName: "Milk & More",
            storeCategory: "Dairy",
            storeStar: 4.5,
            location: 1.2
        },
        {
            id: 10,
            storeName: "Morning Bread House",
            storeCategory: "Bakery",
            storeStar: 4.7,
            location: 1.3
        },
        {
            id: 11,
            storeName: "Farm Fresh Eggs",
            storeCategory: "Dairy & Eggs",
            storeStar: 4.8,
            location: 0.7
        },
        {
            id: 12,
            storeName: "Snack Stop",
            storeCategory: "Snacks",
            storeStar: 4.4,
            location: 1.5
        },
        {
            id: 13,
            storeName: "Fresh Catch Market",
            storeCategory: "Meat & Fish",
            storeStar: 4.8,
            location: 1.1
        },
        {
            id: 14,
            storeName: "Pantry Plus",
            storeCategory: "Packed Foods",
            storeStar: 4.3,
            location: 1.9
        },
        {
            id: 15,
            storeName: "Green Basket",
            storeCategory: "Vegetables & Fruits",
            storeStar: 4.9,
            location: 0.9
        },
        {
            id: 16,
            storeName: "Bottle House",
            storeCategory: "Alcohol",
            storeStar: 4.4,
            location: 3.1
        },
        {
            id: 17,
            storeName: "Daily Dairy Store",
            storeCategory: "Dairy",
            storeStar: 4.3,
            location: 2.1
        },
        {
            id: 18,
            storeName: "Golden Oven Bakery",
            storeCategory: "Bakery",
            storeStar: 4.5,
            location: 2.0
        },
        {
            id: 19,
            storeName: "Nature's Basket",
            storeCategory: "Vegetables & Fruits",
            storeStar: 4.5,
            location: 2.8
        },
        {
            id: 20,
            storeName: "Egg & Milk Corner",
            storeCategory: "Dairy & Eggs",
            storeStar: 4.5,
            location: 1.4
        },
        {
            id: 21,
            storeName: "Happy Snacks",
            storeCategory: "Snacks",
            storeStar: 4.2,
            location: 2.4
        },
        {
            id: 22,
            storeName: "Night Owl Store",
            storeCategory: "Alcohol",
            storeStar: 4.2,
            location: 2.2
        },
        {
            id: 23,
            storeName: "Food Pack Corner",
            storeCategory: "Packed Foods",
            storeStar: 4.1,
            location: 3.0
        },
        {
            id: 24,
            storeName: "Ocean & Farm Market",
            storeCategory: "Meat & Fish",
            storeStar: 4.3,
            location: 2.6
        }
]



export function NearStores() {
    return(
        <section>
            <h2 className="text-4xl font-semibold mb-10">
                Stores Near You
                </h2>
            <div className="grid grid-cols-4 justify-center items-center gap-2 mb-10 max-width-7xl">
                {NearbyStores.map((NearbyStoresValues) => (
                    <div key={NearbyStoresValues.id} className=" justify-center items-center p-4 bg-emerald-800 rounded-lg w-70 h-60">
                        <div>
                            <img 
                            src=""
                            alt=""
                            width={100}
                            height={100} />
                            <h2 className="text-xl p-3">{NearbyStoresValues.storeName}</h2>
                        </div>
                        <div className="grid grid-cols-3">
                            <p className="flex gap-2"><Star className="text-yellow-400" />{NearbyStoresValues.storeStar}</p>
                            <p>{NearbyStoresValues.storeCategory}</p>
                            <p>{NearbyStoresValues.location} km</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
import { MoveRight } from "lucide-react";

type CategoryData = {
  name: string;
  image: string;
};

const categoriesData: CategoryData[] = [
  { name: "Fresh Produce", image: "test" },
  { name: "Fruits", image: "test" },
  { name: "Meat & Fish", image: "test" },
  { name: "Dairy & Eggs", image: "test" },
  { name: "Pantry Staples", image: "test" },
  { name: "Snacks", image: "test" },
  { name: "Beverages", image: "test" },
  { name: "Frozen Foods", image: "test" },
  { name: "Personal Care", image: "test" },
  { name: "Household", image: "test" },
];

export function HomeCategoriesSection() {
  return (
    <section className="mt-15">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-emerald-950">
            Shop by Category
          </h1>
          <p className="text-sm text-gray-500 pt-1">
            Everything you need, in one place.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-emerald-700 text-sm font-medium">View all</h1>
          <MoveRight size={14} />
        </div>
      </div>
      <div className="flex justify-center items-start gap-5">
        {categoriesData.map((category) => (
          <div key={category.name} className="w-28 mt-5 cursor-pointer">
            <div className="w-25 h-25 bg-emerald-100 rounded-xl flex justify-center items-center">
              <img
                className="w-10 h-10"
                src={category.image}
                alt={category.name}
              />
            </div>

            <div className="pt-2 text-center">
              <p className="text-sm font-medium text-emerald-900">{category.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

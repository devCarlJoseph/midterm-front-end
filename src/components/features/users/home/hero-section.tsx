export function HomeHeroSection() {
  return (
    <section className="my-10">
      <div className="flex">
        <div className="w-1/2">
          <div>
            <h1 className="text-5xl font-bold text-emerald-800">
              Direct Access to Local Inventory
              <span className="text-gray-900"> Right to your business</span>
            </h1>
          </div>
          <div className="pt-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim
              libero tenetur atque repellat animi sed asperiores numquam
              provident, eveniet cumque!
            </p>
          </div>
          <div className="pt-3">
            <button className="px-4 py-2 bg-emerald-500 text-sm text-white rounded-2xl cursor-pointer font-medium">
              Shop Now
            </button>
          </div>
        </div>

        {/* Right - 50% */}
        <div className="flex justify-center items-center w-1/2">
          <div className="flex items-center justify-center w-90 h-70 border">
            Put Image Here
          </div>
        </div>
      </div>
    </section>
  );
}

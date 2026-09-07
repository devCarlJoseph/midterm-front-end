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
            <img src="https://scontent.fceb1-5.fna.fbcdn.net/v/t39.30808-1/762803122_122180245862686120_2790777803493424708_n.jpg?stp=dst-jpg_tt6&cstp=mx1122x1122&ctp=s200x200&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeF1uHblDieHb1Ko18N86qFVn25y7M2kOKKfbnLszaQ4oqtnluAwCt493fB0Otm5tDLkhwSMhaqOMPJXXMBBXz1-&_nc_ohc=HCeP8M7exzoQ7kNvwFGCT8o&_nc_oc=AdqmKWfUHXo7QIqY4myGb-F5I3R9H19qv0ubwODGwGfY-IW8ghkBUXX9qfRHhxoRj2M&_nc_zt=24&_nc_ht=scontent.fceb1-5.fna&_nc_gid=gGOU1iETrXrORoB9z19FiA&_nc_ss=7b2a8&oh=00_AQLpyAbgt2MAcRokfdgs5Kc2BiOztLb0E5mEYgygMB6aDA&oe=6AA463CD" alt="Hero" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

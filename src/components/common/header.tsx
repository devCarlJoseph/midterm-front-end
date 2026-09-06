import { Ellipsis, MapPin, Search } from "lucide-react";

export function Header() {

  return (
    <header className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-5">
            <div>
              <Ellipsis className="text-emerald-600 cursor-pointer" />
            </div>
            <div>
              <h1 className="text-emerald-600 font-bold text-md">DALI</h1>
            </div>
            <div className="flex justify-center items-center py-2 px-2 bg-gray-200 rounded-full">
              <MapPin size={16} />
            </div>
          </div>
          <div className="flex w-full max-w-3xl overflow-hidden rounded-full border-2 border-gray-300 bg-white">
            <input
              type="text"
              placeholder="Search products and stores..."
              className="flex-1 px-5 py-2.5 text-sm outline-none"
            />

            <button className="flex items-center gap-2 cursor-pointer bg-emerald-950 px-5 py-2.5 text-sm text-white">
              <Search size={16} />
              <span>Search</span>
            </button>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex justify-center items-center py-2 px-2 bg-gray-200 rounded-full">
              <MapPin size={16} />
            </div>
            <div className="flex justify-center items-center py-2 px-2 bg-gray-200 rounded-full">
              <MapPin size={16} />
            </div>
          </div>
          <button className="py-2 px-5 bg-emerald-700 text-xs rounded-2xl text-white cursor-pointer">Sign In</button>
        </div>
      </div>
    </header>
  );
}

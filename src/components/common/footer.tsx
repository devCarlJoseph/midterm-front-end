import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Truck, Clock, RefreshCw } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-12 pb-8 mt-16 text-gray-600">
      {/* Feature Highlights Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 border-b border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Truck size={20} />
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-gray-900">Fast Delivery</h5>
              <p className="text-[11px] text-gray-400">Under 30 minutes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-gray-900">100% Organic</h5>
              <p className="text-[11px] text-gray-400">Direct from local farms</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <RefreshCw size={20} />
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-gray-900">Easy Returns</h5>
              <p className="text-[11px] text-gray-400">No questions asked</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Clock size={20} />
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-gray-900">24/7 Support</h5>
              <p className="text-[11px] text-gray-400">Dedicated assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                d
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-black tracking-tight text-[#164e3f]">
                  dali
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 ml-0.5"></span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 max-w-sm leading-relaxed">
              Your favorite local grocery partner. Fresh vegetables, handpicked fruits, and daily kitchen essentials delivered right to your doorstep.
            </p>

            <div className="space-y-1.5 text-xs text-gray-500">
              <p className="flex items-center gap-2">
                <MapPin size={14} className="text-emerald-600" />
                <span>151 3rd St, San Francisco, CA</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-emerald-600" />
                <span>+1 (800) 456-DALI</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-emerald-600" />
                <span>support@dali-grocery.com</span>
              </p>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#products" className="hover:text-emerald-700 transition-colors">Fresh Vegetables</a></li>
              <li><a href="#products" className="hover:text-emerald-700 transition-colors">Fresh Fruits</a></li>
              <li><a href="#products" className="hover:text-emerald-700 transition-colors">Dairy & Eggs</a></li>
              <li><a href="#products" className="hover:text-emerald-700 transition-colors">Meat & Seafood</a></li>
              <li><a href="#products" className="hover:text-emerald-700 transition-colors">Snacks & Beverages</a></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              About Dali
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-emerald-700 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-emerald-700 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-emerald-700 transition-colors">Our Partner Stores</a></li>
              <li><a href="#" className="hover:text-emerald-700 transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-emerald-700 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              Stay in Touch
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Get $10 off your first delivery and seasonal recipes.
            </p>
            <div className="flex rounded-full border border-gray-200 bg-gray-50 overflow-hidden p-1 shadow-2xs">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-3 text-xs outline-none"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full cursor-pointer transition-colors">
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-3">
        <p>© 2026 Dali Express Inc. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gray-600">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-gray-600">Terms of Use</a>
          <span>•</span>
          <a href="#" className="hover:text-gray-600">Cookie Preferences</a>
        </div>
      </div>
    </footer>
  );
}
import { forwardRef } from "react";

const Navbar = forwardRef(function Navbar({ searchJudul }, ref) {
  return (
    <div className="flex justify-between p-7 border-b-2">
      <div>
        <h1 className="text-3xl font-bold">Notes</h1>
      </div>
      <div className="lg:w-1/4">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            ref={ref}
            onInput={searchJudul}
            type="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Cari catatan ..."
            required
          />
        </div>
      </div>
    </div>
  );
});

export default Navbar;

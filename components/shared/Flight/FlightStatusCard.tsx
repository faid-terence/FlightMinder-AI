import Image from "next/image";
import logo from "../../public/UA.png";

const FlightStatusCard = () => {
  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="flex items-center space-x-4">
          <Image
            src="/UA.png"
            alt="Airline Logo"
            width={40}
            height={40}
            className="rounded-md"
          />
          <div>
            <h2 className="text-lg font-semibold">May 12, 2024 · BA142</h2>
            <p className="text-sm text-gray-600">San Francisco to London</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold">SFO</h3>
              <p className="text-sm text-gray-600">Terminal N · GATE D43</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-semibold">10:00 AM</p>
              <p className="text-sm text-gray-600">in 6h 50m</p>
              <p className="text-sm text-red-500 font-semibold">2h 15m late</p>
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <path d="M12 5v7l5.25 3.15.75-1.23-4.5-2.67V5z" />
            </svg>
            <span>Total 11h 30m · 5,563mi · Overnight</span>
          </div>

          <div className="mt-4 flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold">LHR</h3>
              <p className="text-sm text-gray-600">Terminal 2 · GATE 59A</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-semibold">1:00 PM</p>
              <p className="text-sm text-red-500 font-semibold">2h 15m late</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-6 py-3 flex justify-between">
        <button className="font-semibold text-sm">Change my seat</button>
        <button className=" font-semibold text-sm">Change my flight</button>
        <button className=" font-semibold text-sm">Show boarding pass</button>
      </div>
    </div>
  );
};

export default FlightStatusCard;

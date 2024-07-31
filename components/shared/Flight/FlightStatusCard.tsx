import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FlightCard = () => {
  return (
    <Card className="w-full max-w-3xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                />
              </svg>
            </div>
            <div>
              <p className="font-bold">May 12, 2024 · BA142</p>
              <p className="text-sm text-gray-500">San Francisco to London</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold">SFO</p>
              <p className="text-sm text-gray-500">SFO</p>
              <p className="text-xs text-gray-400">Terminal N · GATE D43</p>
            </div>
            <div className="text-right">
              <p className="font-bold">10:00 AM</p>
              <p className="text-sm text-gray-500">In 6h 50m</p>
              <p className="text-xs text-red-500">2h 15m late</p>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            Total 11h 30m · 5,563mi · Overnight
          </div>

          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold">LHR</p>
              <p className="text-sm text-gray-500">LHR</p>
              <p className="text-xs text-gray-400">Terminal 2 · GATE 59A</p>
            </div>
            <div className="text-right">
              <p className="font-bold">1:30 PM</p>
              <p className="text-xs text-red-500">2h 15m late</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-6 pt-0">
        <Button variant="outline">Change my seat</Button>
        <Button variant="outline">Change my flight</Button>
        <Button variant="outline">Show boarding pass</Button>
      </CardFooter>
    </Card>
  );
};

export default FlightCard;

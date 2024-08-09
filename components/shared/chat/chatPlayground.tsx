"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { CornerDownLeft, Paperclip, Mic, Menu } from "lucide-react";
import FlightSchedule from "../Flight/FlightSchedule";
import FlightStatusCard from "../Flight/FlightStatusCard";
import FlightCard from "../Flight/FlightStatusCard";
import SeatSelection from "../Seat/SeatChanger";
import FlightPicker from "../Flight/FlightPicker";
import ApiResponseDisplay from "./apiDisplat";

const flights = [
  {
    id: 1,
    departure: "8:30 PM",
    arrival: "4:20 PM+1",
    duration: "10hr 45min",
    price: "$531",
    airline: "United Airlines",
  },
  {
    id: 2,
    departure: "2:40 PM",
    arrival: "10:25 AM+1",
    duration: "10hr 50min",
    price: "$564",
    airline: "United Airlines",
  },
  {
    id: 3,
    departure: "3:00 PM",
    arrival: "10:50 AM+1",
    duration: "10hr 45min",
    price: "$611",
    airline: "United Airlines",
  },
];

export default function ChatPlayGround() {
  const [showFlightSchedule, setShowFlightSchedule] = useState(false);
  const [showFlightStatus, setShowFlightStatus] = useState(false);
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [apiResponse, setApiResponse] = useState<null | {
    flightSchedule: any[];
  }>(null);

  useEffect(() => {
    const fetchFlightSchedule = async () => {
      try {
        const response = await fetch(
          `https://flying-6d2oyn6d7q-uc.a.run.app/query_flights/${encodeURIComponent(
            ""
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setApiResponse(data);
        console.log("API Response:", data);

        // Determine which component to show based on the API response
        if (data.flightSchedule) {
          setShowFlightSchedule(true);
          setShowFlightStatus(false);
        } else if (data.flightStatus) {
          setShowFlightStatus(true);
          setShowFlightSchedule(false);
        }
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchFlightSchedule();
  }, []);

  const handleStatusClick = () => {
    setShowFlightStatus(true);
    setShowFlightSchedule(false);
  };

  const handleSeatChanger = () => {
    setShowSeatSelection(true);
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      try {
        const response = await fetch(
          `https://flying-6d2oyn6d7q-uc.a.run.app/query_flights/${encodeURIComponent(
            userInput
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setApiResponse(data);
        console.log("API Response:", data);

        setUserInput("");
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <div className="flex-grow overflow-auto">
        <div className="container mx-auto p-4">
          <header className="flex justify-between items-center mb-12 py-4">
            <div
              className="text-xl font-semibold text-gray-700 cursor-pointer"
              onClick={reloadPage}
            >
              FlightMinder AI
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center">
              <Button
                variant="outline"
                className="mr-2 border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <GithubIcon className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button className="text-white bg-black hover:bg-gray-800">
                Join Now
              </Button>
            </div>

            {/* Mobile menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col space-y-4 mt-4">
                    <Button
                      variant="outline"
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                      <GithubIcon className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                    <Button className="w-full text-white bg-black hover:bg-gray-800">
                      Join Now
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </header>

          <main className="max-w-3xl mx-auto">
            {!showFlightSchedule && !showFlightStatus && (
              <Card className="mb-12 border-none bg-transparent">
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-center text-[#000435]">
                    FlightMinder AI
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600">
                  <p>
                    FlightMinder AI is your ultimate travel companion, providing
                    real-time flight information, seamless payment options, and
                    comprehensive flight tracking. Whether you&apos;re planning
                    your next trip or staying updated on your current journey,
                    FlightMinder AI ensures you have all the information you
                    need at your fingertips. Stay informed, pay with ease, and
                    track your flights effortlessly with FlightMinder AI.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* <ApiResponseDisplay response={apiResponse} /> */}
            <FlightSchedule flights={flights} />
          </main>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white p-4">
        <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg max-w-3xl mx-auto">
          <Input
            placeholder="Type your message here..."
            className="flex-grow bg-white border-gray-300 text-gray-800 placeholder-gray-400"
            value={userInput}
            onChange={handleInputChange}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Paperclip className="size-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Attach File</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Mic className="size-4" />
                  <span className="sr-only">Use Microphone</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Use Microphone</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button className="text-white" onClick={handleSendMessage}>
            <CornerDownLeft className="mr-2 h-4 w-4" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  );
}

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

import { CornerDownLeft, Paperclip, Mic, Menu, Loader2 } from "lucide-react";
import FlightSchedule, { FlightScheduleProps } from "../Flight/FlightSchedule";
import FlightCard from "../Flight/FlightStatusCard";

export default function ChatPlayGround() {
  const [showFlightStatus, setShowFlightStatus] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [apiResponse, setApiResponse] = useState<FlightScheduleProps>({
    flights: [],
  });
  const [availableFlights, setAvailableFlights] = useState<FlightScheduleProps>(
    {
      flights: [],
    }
  );
  const [viewAvailableFlights, setViewAvailableFlights] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const reloadPage = () => {
    window.location.reload();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    const query = userInput.trim();
    if (!query) return;

    setIsLoading(true);

    try {
      // Check if the query contains "status of flight number"
      const statusRegex = /status of flight number\s*:\s*(\w+\d+)/i;
      const match = query.match(statusRegex);

      if (match && match[1]) {
        const flightNumber = match[1].toUpperCase();

        // Fetch flight status data
        const response = await fetch(
          `https://flying-6d2oyn6d7q-uc.a.run.app/query_flights/${encodeURIComponent(
            flightNumber
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
        const matchedFlight = data.flights.find(
          (flight: { flightNumber: string }) =>
            flight.flightNumber === flightNumber
        );

        if (matchedFlight) {
          setSelectedFlight(matchedFlight);
          setShowFlightStatus(true);
          setUserInput("");
          setViewAvailableFlights(false);
          setApiResponse({ flights: [] }); // Clear flight schedule
        } else {
          // If no flight status was found, show a message or handle accordingly
          setSelectedFlight(null);
          setShowFlightStatus(false);
          setViewAvailableFlights(false);
          setApiResponse({ flights: [] }); // Clear flight schedule
          setUserInput("");
        }
      } else {
        // If the query does not match the flight status pattern, proceed with fetching flight schedule
        const response = await fetch(
          `https://flying-6d2oyn6d7q-uc.a.run.app/query_flights/${encodeURIComponent(
            query
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
        setUserInput("");

        if (data.flights.length === 0) {
          const kigaliResponse = await fetch(
            `https://flying-6d2oyn6d7q-uc.a.run.app/query_flights/${encodeURIComponent(
              "flights from kigali"
            )}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!kigaliResponse.ok) {
            throw new Error("Network response was not ok for Kigali flights");
          }

          const kigaliData = await kigaliResponse.json();
          setAvailableFlights(kigaliData);
          setViewAvailableFlights(true);
          setShowFlightStatus(false);
          setSelectedFlight(null);
        } else {
          setViewAvailableFlights(false);
          setShowFlightStatus(false);
          setSelectedFlight(null);
        }
      }
    } catch (error) {
      console.error("Error fetching data from API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = () => {
    setUserInput("flights from kigali");
    handleSendMessage();
  };

  const handleStatusClick = () => {
    setUserInput("What are flights to dubai?");
    handleSendMessage();
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
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              </div>
            ) : (
              <>
                {apiResponse.flights.length === 0 &&
                  !viewAvailableFlights &&
                  !showFlightStatus && (
                    <>
                      <Card className="mb-12 border-none bg-transparent">
                        <CardHeader>
                          <CardTitle className="text-4xl font-bold text-center text-[#000435]">
                            FlightMinder AI
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-600">
                          <p>
                            FlightMinder AI is your ultimate travel companion,
                            providing real-time flight information, seamless
                            payment options, and comprehensive flight tracking.
                            Whether you&apos;re planning your next trip or
                            staying updated on your current journey,
                            FlightMinder AI ensures you have all the information
                            you need at your fingertips. Stay informed, pay with
                            ease, and track your flights effortlessly with
                            FlightMinder AI.
                          </p>
                        </CardContent>
                      </Card>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <Card
                          className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                          onClick={handleCardClick}
                        >
                          <CardContent className="p-6">
                            <p className="text-gray-600">
                              Are you looking for flights from Kigali?
                            </p>
                          </CardContent>
                        </Card>
                        <Card
                          className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                          onClick={handleStatusClick}
                        >
                          <CardContent className="p-6">
                            <p className="text-gray-600">
                              Would you like to travel to dubai ?
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </>
                  )}

                {!showFlightStatus && apiResponse.flights.length > 0 && (
                  <FlightSchedule
                    flights={apiResponse.flights}
                    message="Here are the available flights from the selected routes:"
                  />
                )}

                {viewAvailableFlights && (
                  <FlightSchedule
                    flights={availableFlights.flights}
                    message="We don't have flights to show you right now. Please check back later. Thank you! However, here are some available flights for you to choose from:"
                  />
                )}

                {showFlightStatus && selectedFlight && <FlightCard />}
              </>
            )}
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
            disabled={isLoading}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={isLoading}>
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
                <Button variant="ghost" size="icon" disabled={isLoading}>
                  <Mic className="size-4" />
                  <span className="sr-only">Use Microphone</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Use Microphone</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button
            className="text-white"
            onClick={handleSendMessage}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CornerDownLeft className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Sending..." : "Send"}
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

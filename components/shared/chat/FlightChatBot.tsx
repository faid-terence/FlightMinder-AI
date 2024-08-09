"use client";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Plane,
  MessageSquare,
  CornerDownLeft,
  Paperclip,
  Mic,
} from "lucide-react";

const FlightChatInterface = () => {
  type Message = {
    role: string;
    content: string;
    apiData?: any;
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your FlightMinder AI assistant. How can I help you with your flight inquiries today?",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const fetchInitialFlightSchedule = async () => {
      await handleSendMessage("flights from Kigali", true);
    };

    fetchInitialFlightSchedule();
  }, []);

  const handleSendMessage = async (input = userInput, isInitial = false) => {
    if (input.trim() === "") return;

    if (!isInitial) {
      setMessages((prev) => [...prev, { role: "user", content: input }]);
    }

    try {
      const response = await fetch(
        `https://flying-6d2oyn6d7q-uc.a.run.app/query_flights/${encodeURIComponent(
          input
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

      let responseMessage = "Here's what I found based on your query:\n\n";

      if (data.flightSchedule && data.flightSchedule.length > 0) {
        responseMessage += "Flight Schedule:\n";
        data.flightSchedule.forEach(
          (
            flight: {
              flightNumber: any;
              departure: any;
              arrival: any;
              departureTime: string | number | Date;
              arrivalTime: string | number | Date;
              aircraft: any;
              status: any;
            },
            index: number
          ) => {
            responseMessage += `${index + 1}. Flight ${flight.flightNumber}: ${
              flight.departure
            } to ${flight.arrival}\n`;
            responseMessage += `   Departure: ${new Date(
              flight.departureTime
            ).toLocaleString()}\n`;
            responseMessage += `   Arrival: ${new Date(
              flight.arrivalTime
            ).toLocaleString()}\n`;
            responseMessage += `   Aircraft: ${flight.aircraft}\n`;
            responseMessage += `   Status: ${flight.status}\n\n`;
          }
        );
      } else if (data.flightStatus) {
        responseMessage += `Flight Status for ${data.flightStatus.flightNumber}:\n`;
        responseMessage += `From ${data.flightStatus.departure} to ${data.flightStatus.arrival}\n`;
        responseMessage += `Scheduled Departure: ${new Date(
          data.flightStatus.scheduledDeparture
        ).toLocaleString()}\n`;
        responseMessage += `Actual Departure: ${new Date(
          data.flightStatus.actualDeparture
        ).toLocaleString()}\n`;
        responseMessage += `Status: ${data.flightStatus.status}\n`;
      } else {
        responseMessage +=
          "I couldn't find any relevant flight information for your query. Can you please try again with a different search?";
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: responseMessage, apiData: data },
      ]);
    } catch (error) {
      console.error("Error fetching data from API:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error while fetching the flight information. Please try again later.",
        },
      ]);
    }

    if (!isInitial) {
      setUserInput("");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <div className="flex-grow overflow-auto">
        <div className="container mx-auto p-4">
          <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                FlightMinder AI Chat
              </CardTitle>
              <CardDescription>
                Get real-time flight information and assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    } mb-4`}
                  >
                    <div
                      className={`flex items-start ${
                        message.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={
                            message.role === "assistant"
                              ? "/bot-avatar.png"
                              : "/user-avatar.png"
                          }
                        />
                        <AvatarFallback>
                          {message.role === "assistant" ? "AI" : "You"}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`mx-2 ${
                          message.role === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        } rounded-lg p-3 max-w-md`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        {message.apiData && message.apiData.flightSchedule && (
                          <div className="mt-2">
                            {message.apiData.flightSchedule.map(
                              (
                                flight: {
                                  flightNumber:
                                    | string
                                    | number
                                    | bigint
                                    | boolean
                                    | React.ReactElement<
                                        any,
                                        | string
                                        | React.JSXElementConstructor<any>
                                      >
                                    | Iterable<React.ReactNode>
                                    | React.ReactPortal
                                    | Promise<React.AwaitedReactNode>
                                    | null
                                    | undefined;
                                  departure:
                                    | string
                                    | number
                                    | bigint
                                    | boolean
                                    | React.ReactElement<
                                        any,
                                        | string
                                        | React.JSXElementConstructor<any>
                                      >
                                    | Iterable<React.ReactNode>
                                    | React.ReactPortal
                                    | Promise<React.AwaitedReactNode>
                                    | null
                                    | undefined;
                                  arrival:
                                    | string
                                    | number
                                    | bigint
                                    | boolean
                                    | React.ReactElement<
                                        any,
                                        | string
                                        | React.JSXElementConstructor<any>
                                      >
                                    | Iterable<React.ReactNode>
                                    | React.ReactPortal
                                    | Promise<React.AwaitedReactNode>
                                    | null
                                    | undefined;
                                  departureTime: string | number | Date;
                                  status:
                                    | string
                                    | number
                                    | bigint
                                    | boolean
                                    | React.ReactElement<
                                        any,
                                        | string
                                        | React.JSXElementConstructor<any>
                                      >
                                    | Iterable<React.ReactNode>
                                    | React.ReactPortal
                                    | Promise<React.AwaitedReactNode>
                                    | null
                                    | undefined;
                                },
                                flightIndex: React.Key | null | undefined
                              ) => (
                                <Card
                                  key={flightIndex}
                                  className="mb-2 bg-white"
                                >
                                  <CardHeader className="py-2">
                                    <CardTitle className="text-sm font-semibold flex items-center">
                                      <Plane className="w-4 h-4 mr-2" />
                                      Flight {flight.flightNumber}
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="py-2 text-xs">
                                    <p>
                                      {flight.departure} → {flight.arrival}
                                    </p>
                                    <p>
                                      Departure:{" "}
                                      {new Date(
                                        flight.departureTime
                                      ).toLocaleString()}
                                    </p>
                                    <p>Status: {flight.status}</p>
                                  </CardContent>
                                </Card>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center space-x-2">
                <Input
                  placeholder="Type your message here..."
                  className="flex-grow bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
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
                <Button
                  className="text-white"
                  onClick={() => handleSendMessage()}
                >
                  <CornerDownLeft className="mr-2 h-4 w-4" />
                  Send
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FlightChatInterface;

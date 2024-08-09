import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface Flight {
  id: number;
  from: string;
  to: string;
  date: string;
  time: string;
  price: string;
  airline: string;
}
const availableFlights = [
  {
    id: 1,
    from: "New York",
    to: "London",
    date: "2024-05-15",
    time: "10:00 AM",
    price: "$500",
    airline: "British Airways",
  },
  {
    id: 2,
    from: "London",
    to: "Paris",
    date: "2024-05-16",
    time: "2:00 PM",
    price: "$200",
    airline: "Air France",
  },
  {
    id: 3,
    from: "Paris",
    to: "Tokyo",
    date: "2024-05-17",
    time: "9:00 PM",
    price: "$800",
    airline: "Japan Airlines",
  },
];

const FlightPicker = () => {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
  };

  return (
    <div className="container mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-start space-x-4 mb-6"
      >
        <Avatar>
          <AvatarImage src="/path-to-avatar-image.jpg" alt="Avatar" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-semibold mb-2">Hello!</CardTitle>
          <p>
            We don&apos;t have flights to show you right now. Please check back
            later. Thank you!
            <br />
            However, here are some available flights for you to choose from:
          </p>
        </div>
      </motion.div>
      <h1 className="text-2xl font-bold mb-4">Available Flights</h1>
      <ScrollArea className="h-[400px]">
        {availableFlights.map((flight) => (
          <Card key={flight.id} className="mb-4">
            <CardHeader>
              <CardTitle>
                {flight.from} to {flight.to}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Date: {flight.date}</p>
              <p>Time: {flight.time}</p>
              <p>Price: {flight.price}</p>
              <p>Airline: {flight.airline}</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="mt-2"
                    onClick={() => handleSelectFlight(flight)}
                  >
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Flight Details</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <p>
                      <strong>From:</strong> {flight.from}
                    </p>
                    <p>
                      <strong>To:</strong> {flight.to}
                    </p>
                    <p>
                      <strong>Date:</strong> {flight.date}
                    </p>
                    <p>
                      <strong>Time:</strong> {flight.time}
                    </p>
                    <p>
                      <strong>Price:</strong> {flight.price}
                    </p>
                    <p>
                      <strong>Airline:</strong> {flight.airline}
                    </p>
                  </div>
                  <Button
                    className="mt-4"
                    onClick={() => console.log(`Selected flight: ${flight.id}`)}
                  >
                    Book This Flight
                  </Button>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
};

export default FlightPicker;

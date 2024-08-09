import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Plane, DollarSign, Info } from "lucide-react";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface FlightDetailsProps {
  flight: {
    id: number;
    departure: string;
    destination: string;
    date: Date;
    flight_number: string;
    price: string;
    arrival_time: string; // Corrected spelling from "arival_time"
    departure_time: string;
    duration: string;
  };
}

const FlightDetails: React.FC<FlightDetailsProps> = ({ flight }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">View Flight Details</Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold flex items-center">
            <Plane className="mr-2" /> Flight Details
          </SheetTitle>
          <SheetDescription>
            Details for flight {flight.id} with {flight.destination} Airlines
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {flight.destination}
              </h3>
              <p className="text-sm text-gray-600">Flight ID: {flight.id}</p>
            </div>
            <Badge variant="secondary" className="text-lg">
              {flight.price}
            </Badge>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Departure
              </h4>
              <p className="text-lg font-semibold">{flight.departure}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Arrival
              </h4>
              <p className="text-lg font-semibold">{flight.destination}</p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="mr-2 text-blue-600" />
              <span className="text-sm font-medium">Duration</span>
            </div>
            <span className="text-lg font-semibold">{flight.duration}</span>
          </div>
          <Separator className="my-4" />
          <div className="bg-blue-100 rounded-lg p-4 mt-4">
            <div className="flex items-start">
              <Info className="mr-2 text-blue-600 flex-shrink-0 mt-1" />
              <p className="text-sm text-blue-800">
                Please arrive at the airport at least 2 hours before your
                scheduled departure time. Don&apos;t forget to bring a valid ID
                and any necessary travel documents.
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FlightDetails;

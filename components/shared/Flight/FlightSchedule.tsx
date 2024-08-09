import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import PaymentForm from "../payment/PaymentForm";
import FlightDetails from "./FlightDetails";
import TravelerDetailsForm from "./TravelerDetailsForm";

interface Flight {
  id: number;
  departure: string;
  destination: string;
  date: Date;
  flight_number: string;
  price: string;
  arrival_time: string; // Corrected spelling from "arival_time"
  departure_time: string;
  duration: string;
}

interface Traveler {
  name: string;
  type: "adult" | "child";
}

export interface FlightScheduleProps {
  flights: Flight[];
  message?: string;
}

const FlightSchedule: React.FC<FlightScheduleProps> = ({
  flights,
  message,
}) => {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedFlight, setSelectedFlight] = useState<number | null>(null);
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showTravelerDetails, setShowTravelerDetails] =
    useState<boolean>(false);
  const [travelers, setTravelers] = useState<Traveler[]>([]);
  const [seats, setSeats] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const TravelerDetailsFormRef = useRef<HTMLDivElement>(null);
  const FlightDetailsFormRef = useRef<HTMLDivElement>(null);
  const paymentFormRef = useRef<HTMLDivElement>(null);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };
  const parsePrice = (price: string | number): number => {
    if (typeof price === "number") return price;
    return parseFloat(price.replace(/[^0-9.-]+/g, ""));
  };

  useEffect(() => {
    if (showTravelerDetails && TravelerDetailsFormRef.current) {
      TravelerDetailsFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (showDetails && FlightDetailsFormRef.current) {
      FlightDetailsFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (showCheckout && paymentFormRef.current) {
      paymentFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showTravelerDetails, showDetails, showCheckout]);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleShowTravelerDetails = () => {
    setShowTravelerDetails(true);
  };

  const handleTravelerDetailsSubmit = (
    newTravelers: Traveler[],
    newSeats: number,
    totalPrice: number
  ) => {
    setTravelers(newTravelers);
    setSeats(newSeats);
    setTotalAmount(totalPrice);
    setShowCheckout(true);
  };

  const handleTravelerDetailsCancel = () => {
    setShowTravelerDetails(false);
  };

  const handlePaymentCancel = () => {
    setShowCheckout(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex items-start space-x-4 mb-6">
        <Avatar>
          <AvatarImage src="/path-to-avatar-image.jpg" alt="Avatar" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-semibold mb-2">Hello!</CardTitle>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
      </div>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Flight Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedFlight?.toString()}
            onValueChange={(value) => setSelectedFlight(Number(value))}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Select</TableHead>
                  {["departure", "arrival", "duration", "price"].map(
                    (column) => (
                      <TableHead
                        key={column}
                        className="cursor-pointer"
                        onClick={() => handleSort(column)}
                      >
                        {column.charAt(0).toUpperCase() + column.slice(1)}
                        {sortBy === column &&
                          (sortOrder === "asc" ? " ▲" : " ▼")}
                      </TableHead>
                    )
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {flights.map((flight) => (
                  <TableRow key={flight.id}>
                    <TableCell>
                      <RadioGroupItem
                        value={flight.id.toString()}
                        id={`flight-${flight.id}`}
                      />
                    </TableCell>
                    <TableCell>
                      <Label htmlFor={`flight-${flight.id}`}>
                        <div>{flight.departure}</div>
                        <div className="text-sm text-gray-500">
                          {flight.departure_time}
                        </div>
                      </Label>
                    </TableCell>
                    <TableCell>
                      <Label htmlFor={`flight-${flight.id}`}>
                        <div>{flight.destination}</div>
                        <div className="text-sm text-gray-500">
                          {flight.arrival_time}
                        </div>
                      </Label>
                    </TableCell>
                    <TableCell>
                      <Label htmlFor={`flight-${flight.id}`}>
                        {flight.duration}
                      </Label>
                    </TableCell>
                    <TableCell>
                      <Label htmlFor={`flight-${flight.id}`}>
                        {flight.price}
                      </Label>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <AnimatePresence>
            {selectedFlight && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="space-x-2"
              >
                <FlightDetails
                  flight={flights.find((f) => f.id === selectedFlight)!}
                />
                <Button onClick={handleShowTravelerDetails}>
                  Proceed to Traveler Details
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardFooter>
      </Card>
      {selectedFlight && showDetails && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <div ref={FlightDetailsFormRef}>
            <FlightDetails
              flight={flights.find((f) => f.id === selectedFlight)!}
            />
          </div>
        </motion.div>
      )}

      {selectedFlight && showTravelerDetails && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <Card>
            <CardContent className="pt-6">
              <div ref={TravelerDetailsFormRef}>
                <TravelerDetailsForm
                  onSubmit={handleTravelerDetailsSubmit}
                  onCancel={handleTravelerDetailsCancel}
                  flightPrice={parsePrice(
                    flights.find((f) => f.id === selectedFlight)!.price
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {showCheckout && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <div ref={paymentFormRef}>
            <Card>
              <CardContent className="pt-6">
                <PaymentForm
                  totalAmount={totalAmount}
                  onCancel={handlePaymentCancel}
                />
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FlightSchedule;

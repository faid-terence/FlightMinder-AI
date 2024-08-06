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

const FlightSchedule: React.FC = () => {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedFlight, setSelectedFlight] = useState<number | null>(null);
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showTravelerDetails, setShowTravelerDetails] =
    useState<boolean>(false);
  const [travelers, setTravelers] = useState<string[]>([]);
  const [seats, setSeats] = useState<number>(0);
  const TravelerDetailsFormRef = useRef<HTMLDivElement>(null);
  const FlightDetailsFormRef = useRef<HTMLDivElement>(null);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    if (showTravelerDetails && TravelerDetailsFormRef.current) {
      TravelerDetailsFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (showDetails && FlightDetailsFormRef.current) {
      FlightDetailsFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showTravelerDetails, showDetails]);

  const sortedFlights = [...flights].sort((a, b) => {
    if (!sortBy) return 0;

    const aValue = a[sortBy as keyof typeof a];
    const bValue = b[sortBy as keyof typeof b];

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleCheckout = () => {
    // Implement checkout logic here
    console.log(`Checking out flight with ID: ${selectedFlight}`);
  };

  const handleShowCheckout = () => {
    setShowCheckout(true);
  };

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleShowTravelerDetails = () => {
    setShowTravelerDetails(true);
  };
  const handleTravelerDetailsSubmit = (
    newTravelers: string[],
    newSeats: number,
    totalPrice: number
  ) => {
    setTravelers(newTravelers);
    setSeats(newSeats);
    setShowTravelerDetails(false);
    setShowCheckout(true);
    // You might want to store the totalPrice in state if you need it later
    // setTotalPrice(totalPrice);
  };

  const handleTravelerDetailsCancel = () => {
    setShowTravelerDetails(false);
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
          <p className="text-sm text-gray-600">
            List flights flying from San Francisco to Rome today
          </p>
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
                {sortedFlights.map((flight) => (
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
                          {flight.airline}
                        </div>
                      </Label>
                    </TableCell>
                    <TableCell>
                      <Label htmlFor={`flight-${flight.id}`}>
                        {flight.arrival}
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
                <Button variant="outline" onClick={handleToggleDetails}>
                  {showDetails ? "Hide Details" : "View Details"}
                </Button>
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
                  flightPrice={parseFloat(
                    flights
                      .find((f) => f.id === selectedFlight)!
                      .price.replace("$", "")
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="mt-8">{showCheckout && <PaymentForm />}</div>
    </motion.div>
  );
};

export default FlightSchedule;

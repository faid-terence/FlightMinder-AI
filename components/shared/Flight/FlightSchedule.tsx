import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const flights = [
  {
    departure: "8:30 PM",
    arrival: "4:20 PM+1",
    duration: "10hr 45min",
    price: "$531",
    airline: "United Airlines",
  },
  {
    departure: "2:40 PM",
    arrival: "10:25 AM+1",
    duration: "10hr 50min",
    price: "$564",
    airline: "United Airlines",
  },
  {
    departure: "3:00 PM",
    arrival: "10:50 AM+1",
    duration: "10hr 45min",
    price: "$611",
    airline: "United Airlines",
  },
];

const FlightSchedule: React.FC = () => {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>
          List flights flying from San Francisco to Rome today
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Departure</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flights.map((flight, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div>{flight.departure}</div>
                  <div className="text-sm text-gray-500">{flight.airline}</div>
                </TableCell>
                <TableCell>{flight.arrival}</TableCell>
                <TableCell>{flight.duration}</TableCell>
                <TableCell>{flight.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FlightSchedule;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, Plane } from "lucide-react";

const FlightCard = ({ flightData }: any) => {
  if (!flightData) return null;
  const {
    departure,
    destination,
    date,
    departure_time,
    arrival_time,
    flight_number,
    duration,
    price,
  } = flightData;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>
            {departure} to {destination}
          </span>
          <span className="text-lg font-bold">${price}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <CalendarDays size={20} />
            <span>{date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={20} />
            <span>
              {departure_time} - {arrival_time}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Plane size={20} />
            <span>Flight {flight_number}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={20} />
            <span>Duration: {duration}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightCard;

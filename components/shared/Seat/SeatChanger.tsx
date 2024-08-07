import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

const SeatSelection = ({ isOpen }: any) => {
  const rows = [4, 3, 2, 1];
  const columns = ["A", "B", "C", "D"];
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const SeatChangerRef = useRef<HTMLDivElement>(null);
  const disabledSeats = ["4A", "3B", "2C", "1D"];

  const { toast } = useToast();

  const isSelected = (row: number, col: string) => {
    return selectedSeat === `${row}${col}`;
  };

  const isDisabled = (row: number, col: string) => {
    return disabledSeats.includes(`${row}${col}`);
  };

  const handleSeatClick = (row: number, col: string) => {
    const seatId = `${row}${col}`;
    if (!isDisabled(row, col)) {
      setSelectedSeat((prevSeat) => (prevSeat === seatId ? null : seatId));
    }
  };

  const handleConfirmClick = () => {
    if (selectedSeat) {
      toast({
        title: "Seat Confirmed",
        description: `Seat ${selectedSeat} has been confirmed!`,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="flex items-start space-x-4 mb-6">
        <Avatar>
          <AvatarImage src="/path-to-avatar-image.jpg" alt="Avatar" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-semibold mb-2">Great!</CardTitle>
          <p className="text-sm text-gray-600">
            Here are the available seats for your flight. Please select a seat
            to continue.
          </p>
        </div>
      </div>
      <Card className="w-full max-w-md mx-auto">
        <CardContent>
          <div className="grid grid-cols-4 gap-2 p-4 bg-gray-100 rounded-lg mt-8">
            {rows.map((row) => (
              <React.Fragment key={row}>
                {columns.map((col) => (
                  <Button
                    key={`${row}${col}`}
                    variant={isSelected(row, col) ? "default" : "outline"}
                    className={`w-12 h-12 p-0 ${
                      isDisabled(row, col)
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                    onClick={() => handleSeatClick(row, col)}
                    disabled={isDisabled(row, col)}
                  >
                    {row}
                    {col}
                  </Button>
                ))}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-4 text-center text-sm">
            {columns.map((col) => (
              <div key={col}>{col}</div>
            ))}
          </div>
          {selectedSeat && (
            <div className="mt-4 text-center">
              <div>Selected seat: {selectedSeat}</div>
              <Button className="mt-2" onClick={handleConfirmClick}>
                Confirm Seat
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default SeatSelection;

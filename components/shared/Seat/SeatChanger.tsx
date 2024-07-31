import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SeatSelection = () => {
  const rows = [4, 3, 2, 1];
  const columns = ["A", "B", "C", "D"];

  // State to keep track of the selected seat
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const isSelected = (row: number, col: string) => {
    return selectedSeat === `${row}${col}`;
  };

  const handleSeatClick = (row: number, col: string) => {
    const seatId = `${row}${col}`;
    setSelectedSeat((prevSeat) => (prevSeat === seatId ? null : seatId));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Great! Here are the available seats for your flight. Please select a
          seat to continue.
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Flight info section remains the same */}
        <div className="grid grid-cols-4 gap-2 p-4 bg-gray-100 rounded-lg">
          {rows.map((row) => (
            <React.Fragment key={row}>
              {columns.map((col) => (
                <Button
                  key={`${row}${col}`}
                  variant={isSelected(row, col) ? "default" : "outline"}
                  className="w-12 h-12 p-0"
                  onClick={() => handleSeatClick(row, col)}
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
          <div className="mt-4 text-center">Selected seat: {selectedSeat}</div>
        )}
      </CardContent>
    </Card>
  );
};

export default SeatSelection;

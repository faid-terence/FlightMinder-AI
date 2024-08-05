import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Minus } from "lucide-react";

interface TravelerDetailsFormProps {
  onSubmit: (travelers: string[], seats: number, totalPrice: number) => void;
  onCancel: () => void;
  flightPrice: number;
}

const TravelerDetailsForm: React.FC<TravelerDetailsFormProps> = ({
  onSubmit,
  onCancel,
  flightPrice,
}) => {
  const [travelers, setTravelers] = useState<string[]>([""]);
  const [seats, setSeats] = useState(1);
  const [totalPrice, setTotalPrice] = useState(flightPrice);

  useEffect(() => {
    setTotalPrice(flightPrice * seats);
  }, [seats, flightPrice]);

  const handleAddTraveler = () => {
    setTravelers([...travelers, ""]);
    setSeats(seats + 1);
  };

  const handleRemoveTraveler = (index: number) => {
    const newTravelers = travelers.filter((_, i) => i !== index);
    setTravelers(newTravelers);
    setSeats(seats - 1);
  };

  const handleTravelerNameChange = (index: number, name: string) => {
    const newTravelers = [...travelers];
    newTravelers[index] = name;
    setTravelers(newTravelers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(
      travelers.filter((t) => t.trim() !== ""),
      seats,
      totalPrice
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Traveler Details</h3>
      {travelers.map((traveler, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Label htmlFor={`traveler-${index}`} className="w-24">
            Traveler {index + 1}
          </Label>
          <Input
            id={`traveler-${index}`}
            value={traveler}
            onChange={(e) => handleTravelerNameChange(index, e.target.value)}
            placeholder="Full Name"
            required
          />
          {index > 0 && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => handleRemoveTraveler(index)}
            >
              <Minus className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <Button type="button" variant="outline" onClick={handleAddTraveler}>
        <Plus className="h-4 w-4 mr-2" /> Add Traveler
      </Button>
      <div className="flex justify-between items-center">
        <div>
          <Label htmlFor="seats">Number of Seats</Label>
          <Input
            id="seats"
            type="number"
            value={seats}
            onChange={(e) => setSeats(parseInt(e.target.value))}
            min={1}
            max={10}
            required
          />
        </div>
        <div className="text-right">
          <Label>Total Price</Label>
          <p className="text-lg font-semibold">${totalPrice.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Proceed to Checkout</Button>
      </div>
    </form>
  );
};

export default TravelerDetailsForm;

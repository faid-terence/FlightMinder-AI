import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Minus } from "lucide-react";

interface Traveler {
  name: string;
  type: "adult" | "child";
}

interface TravelerDetailsFormProps {
  onSubmit: (
    travelers: Traveler[],
    extraLuggage: number,
    totalPrice: number
  ) => void;
  onCancel: () => void;
  flightPrice: number;
}

const TravelerDetailsForm: React.FC<TravelerDetailsFormProps> = ({
  onSubmit,
  onCancel,
  flightPrice,
}) => {
  const [travelers, setTravelers] = useState<Traveler[]>([
    { name: "", type: "adult" },
  ]);
  const [extraLuggage, setExtraLuggage] = useState(0);
  const [totalPrice, setTotalPrice] = useState(flightPrice);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const totalTravelers = travelers.length;
      const extraCost = extraLuggage * 20;
      setTotalPrice(flightPrice * totalTravelers + extraCost);
    };
    calculateTotalPrice();
  }, [travelers, extraLuggage, flightPrice]);

  const handleAddTraveler = () => {
    setTravelers([...travelers, { name: "", type: "adult" }]);
  };

  const handleRemoveTraveler = (index: number) => {
    const newTravelers = travelers.filter((_, i) => i !== index);
    setTravelers(newTravelers);
  };

  const handleTravelerChange = (
    index: number,
    field: "name" | "type",
    value: string
  ) => {
    const newTravelers = [...travelers];
    newTravelers[index] = { ...newTravelers[index], [field]: value };
    setTravelers(newTravelers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(
      travelers.filter((t) => t.name.trim() !== ""),
      extraLuggage,
      totalPrice
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-lg font-semibold">Traveler Details</h3>
      {travelers.map((traveler, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor={`traveler-${index}`}
              className="text-sm font-medium"
            >
              Traveler {index + 1}
            </Label>
            {index > 0 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleRemoveTraveler(index)}
              >
                <Minus className="h-4 w-4 mr-1" /> Remove
              </Button>
            )}
          </div>
          <div className="flex space-x-2">
            <div className="flex-grow">
              <Label htmlFor={`traveler-name-${index}`} className="sr-only">
                Full Name
              </Label>
              <Input
                id={`traveler-name-${index}`}
                value={traveler.name}
                onChange={(e) =>
                  handleTravelerChange(index, "name", e.target.value)
                }
                placeholder="Full Name"
                required
              />
            </div>
            <div className="w-[120px]">
              <Label htmlFor={`traveler-type-${index}`} className="sr-only">
                Traveler Type
              </Label>
              <Select
                value={traveler.type}
                onValueChange={(value) =>
                  handleTravelerChange(index, "type", value)
                }
              >
                <SelectTrigger id={`traveler-type-${index}`}>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adult">Adult</SelectItem>
                  <SelectItem value="child">Child</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={handleAddTraveler}>
        <Plus className="h-4 w-4 mr-2" /> Add Traveler
      </Button>
      <div>
        <Label
          htmlFor="extraLuggage"
          className="block text-sm font-medium mb-1"
        >
          Extra Luggage
        </Label>
        <Input
          id="extraLuggage"
          type="number"
          value={extraLuggage}
          onChange={(e) => setExtraLuggage(parseInt(e.target.value))}
          min={0}
          max={10}
          required
        />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <Label className="block text-sm font-medium">Total Price</Label>
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

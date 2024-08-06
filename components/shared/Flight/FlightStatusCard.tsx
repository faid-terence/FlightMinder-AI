import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SeatSelection from "../Seat/SeatChanger";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PaymentForm from "../payment/PaymentForm";
import { motion } from "framer-motion";

const FlightCard = () => {
  const [showCard, setShowCard] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const paymentFormRef = useRef<HTMLDivElement>(null);

  const handleShowCard = () => setShowCard(true);
  const handleShowPaymentForm = () => setShowPaymentForm(true);

  useEffect(() => {
    if (showPaymentForm && paymentFormRef.current) {
      paymentFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showPaymentForm]);

  return (
    <div className="container mx-auto px-4 py-6">
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
          <p className="text-sm text-gray-600">
            Here is your flight information for BA142.
          </p>
        </div>
      </motion.div>

      <Card className="w-full max-w-3xl mx-auto mb-8 shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center justify-between mb-4"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold">May 12, 2024 · BA142</p>
                <p className="text-sm text-gray-500">San Francisco to London</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            <FlightInfo
              city="SFO"
              terminal="Terminal N"
              gate="GATE D43"
              time="10:00 AM"
              delay="In 6h 50m"
              lateInfo="2h 15m late"
            />

            <div className="text-sm text-gray-500 text-center">
              Total 11h 30m · 5,563mi · Overnight
            </div>

            <FlightInfo
              city="LHR"
              terminal="Terminal 2"
              gate="GATE 59A"
              time="1:30 PM"
              lateInfo="2h 15m late"
              delay={undefined}
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap justify-between p-6 pt-0 gap-2">
          <Button
            variant="outline"
            onClick={handleShowCard}
            className="flex-grow"
          >
            Change my seat
          </Button>
          <Button variant="outline" className="flex-grow">
            Change my flight
          </Button>
          <Button
            variant="outline"
            onClick={handleShowPaymentForm}
            className="flex-grow"
          >
            Pay for flight
          </Button>
        </CardFooter>
      </Card>

      {showCard && (
        <SeatSelection isOpen={showCard} onClose={() => setShowCard(false)} />
      )}
      {showPaymentForm && (
        <div ref={paymentFormRef}>
          <PaymentForm />
        </div>
      )}
    </div>
  );
};

interface FlightInfoProps {
  city: string;
  terminal: string;
  gate: string;
  time: string;
  delay?: string;
  lateInfo: string;
}

const FlightInfo = ({
  city,
  terminal,
  gate,
  time,
  delay,
  lateInfo,
}: FlightInfoProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex justify-between items-start"
  >
    <div>
      <p className="font-bold">{city}</p>
      <p className="text-sm text-gray-500">{city}</p>
      <p className="text-xs text-gray-400">
        {terminal} · {gate}
      </p>
    </div>
    <div className="text-right">
      <p className="font-bold">{time}</p>
      {delay && <p className="text-sm text-gray-500">{delay}</p>}
      <p className="text-xs text-red-500">{lateInfo}</p>
    </div>
  </motion.div>
);

export default FlightCard;

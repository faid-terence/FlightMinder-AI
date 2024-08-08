// "use client";

// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// import { CornerDownLeft, Paperclip, Mic, Menu } from "lucide-react";
// import FlightSchedule from "../Flight/FlightSchedule";
// import FlightStatusCard from "../Flight/FlightStatusCard";
// import FlightCard from "../Flight/FlightStatusCard";
// import SeatSelection from "../Seat/SeatChanger";
// import FlightPicker from "../Flight/FlightPicker";

// const dummyQA = [
//   {
//     question: "What are the baggage allowance rules for international flights?",
//     answer:
//       "Baggage allowance for international flights typically includes one carry-on bag and one personal item. Checked baggage allowance varies by airline and ticket class, usually ranging from 1-2 bags of 23-32 kg each. Always check with your specific airline for exact rules.",
//   },
//   {
//     question:
//       "How early should I arrive at the airport for an international flight?",
//     answer:
//       "For international flights, it's recommended to arrive at the airport at least 3 hours before your scheduled departure time. This allows sufficient time for check-in, security screening, and any potential delays.",
//   },
//   {
//     question: "What should I do if my flight is delayed?",
//     answer:
//       "If your flight is delayed, stay in contact with your airline for updates. You may be entitled to compensation or accommodations depending on the length and reason for the delay. Keep your boarding pass and any receipts for expenses incurred due to the delay.",
//   },
//   {
//     question: "How can I find the cheapest flights?",
//     answer:
//       "To find the cheapest flights, use flight comparison websites, be flexible with your travel dates, consider nearby airports, and sign up for airline newsletters for special deals. Booking in advance and traveling during off-peak seasons can also help reduce costs.",
//   },
// ];

// export default function ChatPlayGround() {
//   const [showFlightSchedule, setShowFlightSchedule] = useState(false);
//   const [showFlightStatus, setShowFlightStatus] = useState(false);
//   const [showSeatSelection, setShowSeatSelection] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");

//   const handleCardClick = () => {
//     setShowFlightSchedule(true);
//   };

//   const handleStatusClick = () => {
//     setShowFlightStatus(true);
//   };

//   const handleSeatChanger = () => {
//     setShowSeatSelection(true);
//   };

//   const reloadPage = () => {
//     window.location.reload();
//   };

//   const handleSendMessage = () => {
//     if (inputMessage.trim() === "") return;

//     const newMessages = [...messages, { type: "user", content: inputMessage }];
//     setMessages(newMessages);
//     setInputMessage("");

//     // Simulate AI response
//     setTimeout(() => {
//       const matchingQA = dummyQA.find((qa) =>
//         qa.question.toLowerCase().includes(inputMessage.toLowerCase())
//       );
//       const aiResponse = matchingQA
//         ? matchingQA.answer
//         : "I'm sorry, I don't have information about that specific query. Is there anything else I can help you with regarding flights?";
//       setMessages([...newMessages, { type: "ai", content: aiResponse }]);
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen bg-white text-gray-800 flex flex-col">
//       <div className="flex-grow overflow-auto">
//         <div className="container mx-auto p-4">
//           {/* Header remains the same */}

//           <main className="max-w-3xl mx-auto">
//             {/* Existing cards and components */}

//             {/* Chat messages */}
//             <div className="mt-6 space-y-4">
//               {messages.map((message, index) => (
//                 <div
//                   key={index}
//                   className={`flex ${
//                     message.type === "user" ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`max-w-3/4 p-3 rounded-lg ${
//                       message.type === "user" ? "bg-blue-100" : "bg-gray-100"
//                     }`}
//                   >
//                     {message.content}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </main>
//         </div>
//       </div>

//       <div className="sticky bottom-0 bg-white p-4">
//         <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg max-w-3xl mx-auto">
//           <Input
//             placeholder="Type your message here..."
//             className="flex-grow bg-white border-gray-300 text-gray-800 placeholder-gray-400"
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//           />
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Button variant="ghost" size="icon">
//                   <Paperclip className="size-4" />
//                   <span className="sr-only">Attach file</span>
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent side="top">Attach File</TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Button variant="ghost" size="icon">
//                   <Mic className="size-4" />
//                   <span className="sr-only">Use Microphone</span>
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent side="top">Use Microphone</TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//           <Button className="text-white" onClick={handleSendMessage}>
//             <CornerDownLeft className="mr-2 h-4 w-4" />
//             Send
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // GithubIcon component remains the same

// function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       {...props}
//     >
//       <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
//     </svg>
//   );
// }

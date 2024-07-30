import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
} from "lucide-react";
import FlightSchedule from "../Flight/FlightSchedule";

export default function ChatPlayGround() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-12 py-4">
          <div className="text-xl font-semibold text-gray-700">Login</div>
          <div>
            <Button
              variant="outline"
              className="mr-2 border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              <GithubIcon className="mr-2 h-2 w-4" />
              GitHub
            </Button>
            <Button className="text-white bg-black hover:bg-gray-800">
              Join Now
            </Button>
          </div>
        </header>

        <main className="max-w-3xl mx-auto">
          <Card className="mb-12 bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-center text-[#000435]">
                Next.js Gemini Chatbot
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p className="mb-4">
                This is an open source AI chatbot app template built with
                Next.js, the Vercel AI SDK, and Google Gemini.
              </p>
              <p>
                It uses React Server Components with function calling to mix
                both text with generative UI responses from Gemini. The UI state
                is synced through the AI SDK so the model is always aware of
                your stateful interactions as they happen in the browser.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <p className="text-gray-600">
                  List flights flying from San Francisco to Rome today
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <p className="text-gray-600">
                  What is the status of flight BA142?
                </p>
              </CardContent>
            </Card>
          </div>
          <FlightSchedule />

          <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg">
            <Input
              placeholder="Type your message here..."
              className="flex-grow bg-white border-gray-300 text-gray-800 placeholder-gray-400"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Paperclip className="size-4" />
                    <span className="sr-only">Attach file</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Attach File</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Mic className="size-4" />
                    <span className="sr-only">Use Microphone</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Use Microphone</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button className=" text-white">
              <CornerDownLeft className="mr-2 h-4 w-4" />
              Send
            </Button>
          </div>
        </main>

        <footer className="mt-12 text-center text-sm text-gray-500">
          Open source AI chatbot built with Google Gemini, Next.js and Vercel AI
          SDK.
        </footer>
      </div>
    </div>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  );
}

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  );
}

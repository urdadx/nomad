import BackNavigator from '@/components/utils/back-navigator';
import { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

const AskPi = () => {
  const [messages, setMessages] = useState([
    {
      role: 'agent',
      content: 'Hi, how can I help you today?',
    },
    {
      role: 'user',
      content: 'Hey, I want to plan a trip to Cape Coast',
    },
    {
      role: 'agent',
      content: 'Awesome. Should I list essentials for the trip?',
    },
    {
      role: 'user',
      content: 'Yes please',
    },
    {
      role: 'agent',
      content: 'Book your flight tickets here: https://bookings.com',
    },
    {
      role: 'user',
      content: 'Thank you',
    },
  ]);
  const [input, setInput] = useState('');
  const inputLength = input.trim().length;
  return (
    <>
      <BackNavigator name="Ask Pi" phone={true} />
      <div className="my-4 rounded-none border-t h-screen">
        <div className="my-3 flex flex-row items-center "></div>
        <CardContent>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                  message.role === 'user'
                    ? 'ml-auto bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                {message.content}
              </div>
            ))}
          </div>
        </CardContent>
        <div className="px-4 my-2 fixed inset-x-0 bottom-2 border-t pt-4">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (inputLength === 0) return;
              setMessages([
                ...messages,
                {
                  role: 'user',
                  content: input,
                },
              ]);
              setInput('');
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1 rounded-lg py-4"
              autoComplete="off"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button
              className="rounded-full bg-primary"
              type="submit"
              size="icon"
            >
              <Mic className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AskPi;

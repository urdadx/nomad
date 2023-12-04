import BackNavigator from '@/components/utils/back-navigator';
import { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mic, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { createParser } from 'eventsource-parser';

const AskPi = () => {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: 'user', message: input },
    ]);
    sendMessage(input);
    setInput('');
  };

  const sendMessage = async (message) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: message,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // This data is a ReadableStream
      const data = response.body;
      if (!data) {
        return;
      }

      const onParse = (event) => {
        if (event.type === 'event') {
          const data = event.data;
          try {
            const text = JSON.parse(data).text ?? '';
            setChatLog((prevChatLog) => [
              ...prevChatLog,
              {
                type: 'bot',
                message: text,
              },
            ]);
            console.log(text);
          } catch (e) {
            console.error(e);
          }
        }
      };

      const reader = data.getReader();
      const decoder = new TextDecoder();
      const parser = createParser(onParse);
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        parser.feed(chunkValue);
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.log('Rate limit exceeded. Please wait and try again.');
        toast.error('Rate limit exceeded.');
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputLength = input.trim().length;
  return (
    <>
      <BackNavigator name="Ask Pi" phone={true} />
      <div className="my-4 rounded-none border-t min-h-screen">
        <CardContent className="mt-4">
          <div
            style={{ scrollbarGutter: 'stable' }}
            className="space-y-4 overflow-y-scroll h-screen pb-2 no-scrollbar"
          >
            <div
              className={cn(
                'flex w-max bg-blue-100 max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm'
              )}
            >
              Hi, How can I help you today?
            </div>
            {chatLog.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                  message.type === 'user'
                    ? 'ml-auto bg-primary text-primary-foreground'
                    : 'bg-blue-100'
                )}
              >
                {message.message}
              </div>
            ))}
            {isLoading && (
              <div className="flex w-max max-w-[75%] items-center flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">
                🤖 AI is thinking...
              </div>
            )}
            <div className="h-[40px]" />
          </div>
        </CardContent>

        <div className="px-4 bg-white lg:w-[400px] mx-auto fixed inset-x-0 bottom-2 lg:bottom-0 sm:pb-2 lg:pb-4 border-x border-t pt-4 z-50">
          <form
            onSubmit={handleSubmit}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1 rounded-lg py-4"
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {inputLength === 0 ? (
              <Button
                className="rounded-full bg-primary"
                type="submit"
                size="icon"
              >
                <Mic className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                className="rounded-lg bg-primary"
                type="submit"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AskPi;

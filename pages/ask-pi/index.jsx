import BackNavigator from '@/components/utils/back-navigator';
import { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mic, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import axios from 'axios';

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
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            "You are a trip planning assistant. Based on the user's questions, provide suggestions and information for planning a trip to the location the user mentions. The user will write the details, and you will assist with relevant recommendations, tips and advice to make the trip an exciting one. Replies should focus on trip planning aspects only.",
        },
        { role: 'user', content: message },
      ],
    };

    setIsLoading(true);

    try {
      const response = await axios.post('/api/chat', data);
      console.log(response);
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type: 'bot', message: response.data.choices[0].message.content },
      ]);
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
                'flex w-max bg-muted max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm'
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
                    : 'bg-muted'
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

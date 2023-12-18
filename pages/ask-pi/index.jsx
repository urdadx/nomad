import BackNavigator from '@/components/utils/back-navigator';
import { useState, useCallback, useRef, useEffect } from 'react';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { nanoid } from 'nanoid';
import { MemoizedReactMarkdown } from '@/components/core/memoized-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

const AskPi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const isLoadingRef = useRef(isLoading);
  const messageListRef = useRef(messageList);

  const [input, setInput] = useState('');

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    messageListRef.current = messageList;
  }, [messageList]);

  const appendUserMessage = useCallback(async (content) => {
    // Prevent multiple requests at once
    if (isLoadingRef.current) return;

    const userMsg =
      typeof content === 'string'
        ? { id: nanoid(10), role: 'user', content }
        : content;
    const assMsg = {
      id: nanoid(10),
      role: 'assistant',
      content: '',
    };
    const messageListSnapshot = messageListRef.current;

    // Reset output
    setIsLoading(true);

    try {
      // Set user input immediately
      setMessageList([...messageListSnapshot, userMsg]);

      // If streaming, we need to use fetchEventSource directly
      const response = await fetch(`/api/generate`, {
        method: 'POST',
        body: JSON.stringify({
          messages: [...messageListSnapshot, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      // This data is a ReadableStream
      const data = response.body;
      if (!data) {
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedValue = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        accumulatedValue += chunkValue; // Accumulate the chunk value

        // Check if the accumulated value contains the delimiter
        const delimiter = '\n';
        const chunks = accumulatedValue.split(delimiter);

        // Process all chunks except the last one (which may be incomplete)
        while (chunks.length > 1) {
          const chunkToDispatch = chunks.shift(); // Get the first chunk
          if (chunkToDispatch && chunkToDispatch.length > 0) {
            const chunk = JSON.parse(chunkToDispatch);
            assMsg.content += chunk;
            setMessageList([...messageListSnapshot, userMsg, assMsg]);
          }
        }

        // The last chunk may be incomplete, so keep it in the accumulated value
        accumulatedValue = chunks[0];
      }

      // Process any remaining accumulated value after the loop is done
      if (accumulatedValue.length > 0) {
        assMsg.content += accumulatedValue;
        setMessageList([...messageListSnapshot, userMsg, assMsg]);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

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
                'flex w-max bg-blue-100 max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm'
              )}
            >
              Hello! How can I help plan your trip?
            </div>

            {messageList.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                  message.role === 'user'
                    ? 'ml-auto bg-primary text-primary-foreground'
                    : 'bg-blue-100'
                )}
              >
                <MemoizedReactMarkdown
                  className="prose prose-stone prose-base prose-pre:rounded-md w-full flex-1 leading-6 prose-p:leading-[1.8rem] prose-pre:bg-[#282c34] max-w-full"
                  remarkPlugins={[remarkGfm, remarkMath]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      if (children.length) {
                        if (children[0] == '▍') {
                          return (
                            <span className="mt-1 animate-pulse cursor-default">
                              ▍
                            </span>
                          );
                        }

                        children[0] = children[0].replace('`▍`', '▍');
                      }
                    },
                    table({ children }) {
                      return (
                        <table className="border-collapse border border-black px-3 py-1 ">
                          {children}
                        </table>
                      );
                    },
                    th({ children }) {
                      return (
                        <th className="break-words border border-black bg-gray-500 px-3 py-1 text-white ">
                          {children}
                        </th>
                      );
                    },
                    td({ children }) {
                      return (
                        <td className="break-words border border-black px-3 py-1">
                          {children}
                        </td>
                      );
                    },
                  }}
                >
                  {message.content}
                </MemoizedReactMarkdown>{' '}
              </div>
            ))}
            {isLoading && (
              <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-blue-100">
                AI is thinking🤖
              </div>
            )}
            <div className="h-[40px]" />
          </div>
        </CardContent>

        <div className="px-4 bg-white lg:w-[400px] mx-auto fixed inset-x-0 bottom-2 lg:bottom-0 sm:pb-2 lg:pb-4 border-x border-t pt-4 z-50">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setInput('');
              await appendUserMessage(input);
            }}
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
                disabled
                className="rounded-full bg-orange-400"
                type="submit"
                size="icon"
              >
                <Send className="h-4 w-4" />
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

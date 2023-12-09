import React from 'react';
import useChatStream from '@magicul/react-chat-stream';
import { Button } from '@/components/ui/button';

function TestAI() {
  const { messages, input, handleInputChange, handleSubmit } = useChatStream({
    options: {
      url: 'http://localhost:3000/api/chat',
      method: 'POST',
    },
    // This means that the user input will be sent as the body of the request with the key 'prompt'.
    method: {
      type: 'body',
      key: 'prompt',
    },
  });

  console.log(messages);

  return (
    <div>
      {messages.map((message, index) => (
        <div key={message.id}>
          <p>
            {message.role}: {message.content}
          </p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          className="border-2 border-primary"
          type="text"
          onChange={handleInputChange}
          value={input}
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}

export default TestAI;

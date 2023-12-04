import { OpenAIStream } from '@/components/utils/openai-stream';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const config = {
  runtime: 'edge',
};

const handler = async (req) => {
  const { prompt } = await req.json();

  if (!prompt) {
    return new Response('No prompt in the request', { status: 400 });
  }

  const payload = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          "You are a trip planning assistant. Based on the user's questions, provide suggestions and information for planning a trip to the location the user mentions. The user will write the details, and you will assist with relevant recommendations, tips and advice to make the trip an exciting one. Replies should focus on trip planning aspects only.",
      },
      { role: 'user', content: prompt },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  // return stream response (SSE)
  return new Response(stream, {
    headers: new Headers({
      // 'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    }),
  });
};

export default handler;

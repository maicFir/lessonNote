export const dynamic = "force-dynamic";

let interval;
export async function GET() {
  const encoder = new TextEncoder();

  // 创建一个 Streaming Response
  const customReadable = new ReadableStream({
    start(controller) {
      interval = setInterval(() => {
        const message = new Date().toLocaleString();
        controller.enqueue(encoder.encode(`data: ${message}\n\n`));
      }, 1000);
    },
    cancel() {
      clearInterval(interval);
    },
  });

  return new Response(customReadable, {
    // 设置 Server-Sent Events (SSE) 相关的 headers
    headers: {
      Connection: "keep-alive",
      "Content-Encoding": "none",
      "Cache-Control": "no-cache, no-transform",
      "Content-Type": "text/event-stream; charset=utf-8",
    },
  });
}

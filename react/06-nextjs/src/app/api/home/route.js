export async function GET() {
  const data = {
    data: [
      {
        symbol: "BTC",
      },
      {
        symbol: "ETH",
      },
    ],
  };
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}

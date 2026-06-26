import data from "@/data/bank-deposits.json";

export async function GET() {
  return Response.json(data);
}

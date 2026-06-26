import data from "@/data/bank-certificates.json";

export async function GET() {
  return Response.json(data);
}

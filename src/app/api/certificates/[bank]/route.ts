import data from "@/data/bank-certificates.json";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ bank: string }> }
) {
  const { bank } = await params;

  const result = data.banks.find(
    (b) => b.id === bank
  );

  if (!result) {
    return Response.json(
      { error: "Bank not found" },
      { status: 404 }
    );
  }

  return Response.json(result);
}

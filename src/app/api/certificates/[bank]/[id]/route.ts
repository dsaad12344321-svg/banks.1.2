import data from "@/data/bank-certificates.json";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      bank: string;
      id: string;
    }>;
  }
) {
  const { bank, id } = await params;

  const bankData = data.banks.find((b) => b.id === bank);

  if (!bankData) {
    return Response.json(
      { error: "Bank not found" },
      { status: 404 }
    );
  }

  const certificate = bankData.certificates.find(
    (c) => c.id === Number(id)
  );

  if (!certificate) {
    return Response.json(
      { error: "Certificate not found" },
      { status: 404 }
    );
  }

  return Response.json(certificate);
}

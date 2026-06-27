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

  let certificate;

  // إذا كان id عبارة عن رقم
  if (!isNaN(Number(id))) {
    const index = Number(id) - 1;

    certificate = bankData.certificates[index];
  } else {
    // إذا كان id عبارة عن اسم
    certificate = bankData.certificates.find(
      (c) => c.id === id
    );
  }

  if (!certificate) {
    return Response.json(
      { error: "Certificate not found" },
      { status: 404 }
    );
  }

  return Response.json(certificate);
}

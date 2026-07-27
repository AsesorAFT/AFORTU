import { disabledPublicApiResponse } from "@/lib/disabled-public-api";

export async function GET() {
  return disabledPublicApiResponse();
}

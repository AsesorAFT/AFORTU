import { disabledPublicApiResponse } from "@/lib/disabled-public-api";

export async function POST() {
  return disabledPublicApiResponse();
}

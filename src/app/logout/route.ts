import { deleteSpotifyTokens } from "@/server/deleteSpotifyTokens";
import { NextResponse } from "next/server";

export const GET = async () => {
  await deleteSpotifyTokens();
  return NextResponse.json({ ok: true });
};

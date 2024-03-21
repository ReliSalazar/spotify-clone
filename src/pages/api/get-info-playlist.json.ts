import { allPlaylists, songs as allSongs } from "@/lib/data";

export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url);
  const playlistId = url.searchParams.get("id");

  const playlist = allPlaylists.find(({ id }) => id === playlistId);
  const songs = allSongs.filter(({ albumId }) => albumId === playlist?.albumId);

  return new Response(JSON.stringify({ playlist, songs }), {
    headers: { "Content-Type": "application/json" },
  });
}

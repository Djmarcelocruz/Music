// 🔑 Suas chaves
const YOUTUBE_KEY = "AIzaSyBjP9dxFEp09DpZl5JkVMD05uaKoQTNDpE";
// Spotify e TikTok precisam backend seguro (Netlify/Vercel)

async function buscarMusicas() {
  const genre = document.getElementById("genre").value;
  const month = document.getElementById("month").value;
  const lista = document.getElementById("lista");
  lista.innerHTML = "<li>Carregando...</li>";

  // iTunes (sem autenticação)
  const itunesUrl = `https://itunes.apple.com/search?term=${genre}&entity=musicTrack&limit=5`;
  const itunesRes = await fetch(itunesUrl);
  const itunesData = await itunesRes.json();

  // YouTube (com chave)
  const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&regionCode=BR&type=video&videoCategoryId=10&maxResults=5&key=${YOUTUBE_KEY}`;
  const youtubeRes = await fetch(youtubeUrl);
  const youtubeData = await youtubeRes.json();

  lista.innerHTML = "";

  // Mostrar iTunes
  itunesData.results.forEach(track => {
    const li = document.createElement("li");
    li.innerHTML = `🎵 ${track.artistName} - ${track.trackName} 
      <a href="${track.previewUrl}" target="_blank">▶️ Ouvir</a>`;
    lista.appendChild(li);
  });

  // Mostrar YouTube
  youtubeData.items.forEach(video => {
    const li = document.createElement("li");
    li.innerHTML = `📺 ${video.snippet.title} 
      <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">▶️ Assistir</a>`;
    lista.appendChild(li);
  });

  // 🔜 Spotify e TikTok (precisam backend)
  /*
  const spotifyUrl = "https://api.spotify.com/v1/playlists/{playlist_id}";
  const tiktokUrl = "https://open.tiktokapis.com/v2/music/trending";
  */
}

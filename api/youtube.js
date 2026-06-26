export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // Pega o termo de busca (nome da música e artista) enviado pelo aplicativo
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'O parâmetro de busca "q" é obrigatório.' });
  }

  // Usa a chave que já está salva na sua Vercel com segurança
  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(q)}&type=video&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na API do YouTube: ${response.status}`);
    }

    const data = await response.json();
    
    // Verifica se encontrou algum vídeo e extrai o ID dele
    if (data.items && data.items.length > 0) {
      const videoId = data.items[0].id.videoId;
      return res.status(200).json({ videoId, videoUrl: `https://www.youtube.com/watch?v=${videoId}` });
    }

    res.status(404).json({ error: 'Nenhum vídeo encontrado.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar no YouTube.' });
  }
}

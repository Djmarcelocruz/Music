export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'O parâmetro de busca "q" é obrigatório.' });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  try {
    // 1. Faz a autenticação no Spotify para pegar o Token de Acesso
    const authResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
      },
      body: 'grant_type=client_credentials'
    });

    if (!authResponse.ok) {
      throw new Error('Falha na autenticação com o Spotify');
    }

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    // 2. Usa o Token para buscar a música de fato
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=5`;
    const searchResponse = await fetch(searchUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!searchResponse.ok) {
      throw new Error('Falha ao buscar no Spotify');
    }

    const searchData = await searchResponse.json();
    
    // Devolve os resultados formatados para o seu app
    res.status(200).json(searchData.tracks.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao conectar com a API do Spotify.' });
  }
}

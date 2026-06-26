export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    // Busca a playlist de lançamentos/tendências do Deezer Brasil
    const response = await fetch('https://api.deezer.com/playlist/1111142221/tracks?limit=50');
    
    if (!response.ok) {
      throw new Error(`Erro na API do Deezer: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar oportunidades" });
  }
}

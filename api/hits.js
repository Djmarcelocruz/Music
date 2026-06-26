export default async function handler(req, res) {
  // Permite que o seu front-end acesse este servidor
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const response = await fetch('https://api.deezer.com/chart/0?country=BR&limit=50');
    
    if (!response.ok) {
      throw new Error(`Erro na API do Deezer: ${response.status}`);
    }

    const data = await response.json();
    // Envia os dados de volta para o aplicativo com sucesso
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar os hits do Deezer" });
  }
}

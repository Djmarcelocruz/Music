// index.js
// DJ Radar PRO - Orquestrador principal

const PulseEngine = require("./engine/pulse-engine");
const ScoringEngine = require("./engine/scoring");
const DecisionEngine = require("./engine/decision-engine");

// 🧠 Inicializa motores
const pulse = new PulseEngine();
const scoring = new ScoringEngine();
const decision = new DecisionEngine(scoring);

// 🎶 Biblioteca simulada de músicas
const tracks = [
  { name: "Track A", bpm: 128, energyLevel: 80, vibe: "dance", popularity: 90, transitionRisk: "low" },
  { name: "Track B", bpm: 124, energyLevel: 70, vibe: "warmup", popularity: 80, transitionRisk: "low" },
  { name: "Track C", bpm: 130, energyLevel: 95, vibe: "peak", popularity: 95, transitionRisk: "medium" },
  { name: "Track D", bpm: 122, energyLevel: 60, vibe: "warmup", popularity: 85, transitionRisk: "low" }
];

// 🔋 Simulação de leitura da pista (input do DJ)
function getCrowdInput(step) {
  const scenarios = [
    { bpm: 118, audioIntensity: "medium", crowdReaction: "ok", vibe: "warmup", eventStage: "start" },
    { bpm: 124, audioIntensity: "high", crowdReaction: "strong", vibe: "dance", eventStage: "mid" },
    { bpm: 128, audioIntensity: "high", crowdReaction: "explosive", vibe: "peak", eventStage: "peak" }
  ];

  return scenarios[step] || scenarios[0];
}

// 🚀 Simula um set ao vivo
function runDJSet() {
  console.log("\n🎧 DJ Radar PRO - SET INICIADO\n");

  for (let i = 0; i < 3; i++) {
    console.log(`\n-----------------------------`);
    console.log(`🎛 MOMENTO ${i + 1}`);

    // 🔋 Lê pista
    const input = getCrowdInput(i);

    const energy = pulse.calculateEnergy(input);

    const pulseData = {
      energy,
      bpm: input.bpm
    };

    console.log("🔋 Energy Score:", energy);

    // 🧠 Decisão de próxima música
    const result = decision.getNextTracks(tracks, pulseData, {});

    console.log("\n🎯 Próxima música:");
    console.log("➡️", result.recommendation.name);

    console.log("\n🎧 Alternativas:");
    result.alternatives.forEach(t => console.log("➡️", t.name));

    console.log("\n🧠 Análise:");
    console.log(result.analysis);
  }

  console.log("\n\n✅ SET FINALIZADO\n");
}

// ▶️ Executa sistema
runDJSet();

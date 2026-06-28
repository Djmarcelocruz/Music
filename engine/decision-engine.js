// decision-engine.js
// DJ Radar PRO - Decision Engine v1.0

class DecisionEngine {
  constructor(scoringEngine) {
    this.scoring = scoringEngine;
  }

  // 🧠 Decide as melhores músicas para o momento
  getNextTracks(tracks, pulseData, context) {
    const targetEnergy = pulseData.energy;

    // 1. Calcula NTS para todas as músicas
    const scoredTracks = tracks.map(track => {
      const nts = this.scoring.calculateNTS(track, {
        targetEnergy,
        currentBpm: pulseData.bpm,
        crowdState: this.mapEnergyToState(targetEnergy)
      });

      return {
        ...track,
        nts
      };
    });

    // 2. Ordena por melhor score
    scoredTracks.sort((a, b) => b.nts - a.nts);

    // 3. Seleciona TOP 3
    const top1 = scoredTracks[0];
    const top2 = scoredTracks[1];
    const top3 = scoredTracks[2];

    return {
      recommendation: top1,
      alternatives: [top2, top3],
      analysis: this.generateReason(pulseData, top1)
    };
  }

  // 🔥 Converte energia em estado de pista
  mapEnergyToState(energy) {
    if (energy <= 30) return "chill";
    if (energy <= 60) return "warmup";
    if (energy <= 80) return "dance";
    return "peak";
  }

  // 🧠 Explicação da decisão (modo DJ inteligente)
  generateReason(pulseData, track) {
    const energy = pulseData.energy;

    if (energy <= 30) {
      return "Pista fria — escolhida música para aquecer e criar conexão";
    }

    if (energy <= 60) {
      return "Pista estável — mantendo groove e continuidade";
    }

    if (energy <= 80) {
      return "Pista em crescimento — aumentando energia gradualmente";
    }

    return "Pico de pista — mantendo energia alta sem quebrar fluxo";
  }
}

module.exports = DecisionEngine;

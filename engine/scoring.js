// scoring.js
// DJ Radar PRO - Next Track Score (NTS)

class ScoringEngine {
  constructor() {}

  // 🎯 Calcula o NTS de uma música
  calculateNTS(track, context) {
    const {
      bpm,
      energyLevel,
      vibe,
      popularity,
      transitionRisk
    } = track;

    const {
      targetEnergy,
      currentBpm,
      crowdState
    } = context;

    const energyMatch = this.getEnergyMatch(energyLevel, targetEnergy);
    const bpmMatch = this.getBpmMatch(bpm, currentBpm);
    const vibeMatch = this.getVibeMatch(vibe, crowdState);
    const popularityScore = this.getPopularityScore(popularity);
    const safetyScore = this.getSafetyScore(transitionRisk);

    const nts =
      (energyMatch * 0.40) +
      (bpmMatch * 0.25) +
      (vibeMatch * 0.20) +
      (popularityScore * 0.10) +
      (safetyScore * 0.05);

    return Math.round(Math.max(0, Math.min(100, nts)));
  }

  // 🔥 Compatibilidade de energia
  getEnergyMatch(trackEnergy, targetEnergy) {
    const diff = Math.abs(trackEnergy - targetEnergy);

    if (diff <= 10) return 100;
    if (diff <= 20) return 80;
    if (diff <= 30) return 60;
    if (diff <= 40) return 40;
    return 20;
  }

  // 🎚 Compatibilidade de BPM
  getBpmMatch(bpm, currentBpm) {
    const diff = Math.abs(bpm - currentBpm);

    if (diff <= 3) return 100;
    if (diff <= 6) return 80;
    if (diff <= 10) return 60;
    if (diff <= 15) return 40;
    return 20;
  }

  // 🎭 Compatibilidade de vibe
  getVibeMatch(vibe, crowdState) {
    const map = {
      chill: { chill: 100, warmup: 80, dance: 50, peak: 30 },
      warmup: { chill: 80, warmup: 100, dance: 70, peak: 40 },
      dance: { chill: 50, warmup: 80, dance: 100, peak: 80 },
      peak: { chill: 30, warmup: 50, dance: 80, peak: 100 }
    };

    return map[vibe]?.[crowdState] || 60;
  }

  // 📈 Popularidade da música
  getPopularityScore(popularity) {
    // popularity: 0–100 já
    return Math.max(0, Math.min(100, popularity));
  }

  // ⚠️ Segurança de transição
  getSafetyScore(risk) {
    switch (risk) {
      case "low": return 100;
      case "medium": return 70;
      case "high": return 40;
      default: return 60;
    }
  }
}

module.exports = ScoringEngine;

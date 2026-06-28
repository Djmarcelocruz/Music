// pulse-engine.js
// DJ Radar PRO - Pulse Engine v1.0

class PulseEngine {
  constructor() {}

  // 🎚 Calcula o Energy Score da pista
  calculateEnergy(input) {
    const {
      bpm,
      audioIntensity,
      crowdReaction,
      vibe,
      eventStage
    } = input;

    const bpmFactor = this.getBpmFactor(bpm);
    const intensityFactor = this.getIntensityFactor(audioIntensity);
    const crowdFactor = this.getCrowdFactor(crowdReaction);
    const vibeFactor = this.getVibeFactor(vibe);
    const timeFactor = this.getTimeFactor(eventStage);

    const energy =
      (bpmFactor * 0.30) +
      (intensityFactor * 0.20) +
      (crowdFactor * 0.30) +
      (vibeFactor * 0.15) +
      (timeFactor * 0.05);

    return Math.round(Math.max(0, Math.min(100, energy)));
  }

  // 🎚 BPM
  getBpmFactor(bpm) {
    if (bpm < 95) return 40;
    if (bpm <= 125) return 70;
    return 90;
  }

  // 🔊 Intensidade sonora
  getIntensityFactor(level) {
    switch (level) {
      case "low": return 30;
      case "medium": return 60;
      case "high": return 90;
      default: return 50;
    }
  }

  // 👥 Reação da pista
  getCrowdFactor(reaction) {
    switch (reaction) {
      case "weak": return 20;
      case "ok": return 50;
      case "strong": return 80;
      case "explosive": return 100;
      default: return 50;
    }
  }

  // 🎶 Vibe da música
  getVibeFactor(vibe) {
    switch (vibe) {
      case "chill": return 30;
      case "warmup": return 50;
      case "dance": return 70;
      case "peak": return 100;
      default: return 60;
    }
  }

  // ⏱ Fase do evento
  getTimeFactor(stage) {
    switch (stage) {
      case "start": return 40;
      case "mid": return 70;
      case "peak": return 100;
      case "end": return 60;
      default: return 60;
    }
  }
}

module.exports = PulseEngine;

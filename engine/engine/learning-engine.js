// learning-engine.js
// DJ Radar PRO - Learning Engine v1.0

class LearningEngine {
  constructor() {
    this.profile = {
      preferredBpmRange: [],
      favoriteEnergyLevels: [],
      acceptedRecommendations: 0,
      rejectedRecommendations: 0,
      transitionStyle: "balanced" // aggressive | balanced | smooth
    };
  }

  // 📊 Registra quando o DJ aceita uma sugestão
  recordAcceptance(track, context) {
    this.profile.acceptedRecommendations++;

    this.learnBpm(track.bpm);
    this.learnEnergy(context.energy);

    this.adjustStyle("positive", track, context);
  }

  // ❌ Registra quando o DJ rejeita sugestão
  recordRejection(track, context) {
    this.profile.rejectedRecommendations++;

    this.adjustStyle("negative", track, context);
  }

  // 🎚 Aprende BPM favorito
  learnBpm(bpm) {
    this.profile.preferredBpmRange.push(bpm);

    // mantém só últimos 20 registros
    if (this.profile.preferredBpmRange.length > 20) {
      this.profile.preferredBpmRange.shift();
    }
  }

  // 🔋 Aprende energia preferida
  learnEnergy(energy) {
    this.profile.favoriteEnergyLevels.push(energy);

    if (this.profile.favoriteEnergyLevels.length > 20) {
      this.profile.favoriteEnergyLevels.shift();
    }
  }

  // 🧠 Ajusta estilo de transição
  adjustStyle(type, track, context) {
    const avgEnergy =
      this.profile.favoriteEnergyLevels.reduce((a, b) => a + b, 0) /
      (this.profile.favoriteEnergyLevels.length || 1);

    if (type === "negative") {
      if (context.energy > avgEnergy) {
        this.profile.transitionStyle = "smooth";
      } else {
        this.profile.transitionStyle = "aggressive";
      }
    }

    if (type === "positive") {
      this.profile.transitionStyle = "balanced";
    }
  }

  // 📈 Retorna perfil atual do DJ
  getProfile() {
    return this.profile;
  }
}

module.exports = LearningEngine;

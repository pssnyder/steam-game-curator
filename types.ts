export interface Game {
  name: string;
}

export interface UserPreferences {
  preferences: string[];
}

export interface Recommendation {
  gameName: string;
  reason: string;
}

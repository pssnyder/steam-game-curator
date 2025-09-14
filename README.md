# AI Steam Game Curator

Your personal AI assistant for conquering your game backlog.

This application helps you choose a game to play from your Steam library using a personalized, AI-driven approach. Instead of generic tags, you provide your own custom preferences and your current mood, and the AI will find the perfect match from your game list.

## How It Works

The process is broken down into three simple steps:

1.  **Upload Your Data**: Provide a list of your games. You can optionally upload a list of your general gaming preferences to give the AI more context.
2.  **Define Preferences**: Review and select your general preferences for this session. You can also add new ones on the fly or save your updated list for future use. If you didn't upload a preferences file, you can create one here.
3.  **Set Your Mood**: Tell the AI what you're in the mood for right now. Based on your game list, your selected preferences, and your current request, the AI will suggest the perfect game.

## File Formats

### 1. Game Library (`.csv` or `.txt`) - Required

This should be a simple plain text or CSV file containing the names of your games, with one game title per line.

**Example (`my_games.csv`):**

```
Game
Stardew Valley
Slay the Spire
The Witcher 3: Wild Hunt
Portal 2
Factorio
```
*(Note: A header line like "Game" is acceptable and will be ignored.)*

### 2. User Preferences (`.json`) - Optional

This is a JSON file that contains a list of your high-level, general gaming preferences. These are rules or statements that help guide the AI's decision-making process across all your searches.

The file should contain a single key, `"preferences"`, with an array of strings as its value.

**Example (`my_preferences.json`):**

```json
{
  "preferences": [
    "Coding games must involve a real coding environment, not just drag-and-drop logic.",
    "I prefer games without strenuous time-based elements, allowing for more casual play.",
    "Visually stunning games with vibrant colors are a plus.",
    "Games with deep strategic elements similar to chess are highly rated.",
    "Avoid games with heavy repetitive grinding."
  ]
}
```

You can start without this file and build your preferences within the app, then save them for later!

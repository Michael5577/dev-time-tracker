# ⏱️ Dev Time Tracker CLI

A beautiful and powerful command-line time tracking application for developers. Track your coding sessions, monitor daily progress, and achieve your development goals with a simple, elegant CLI tool.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- ⏱️ **Start/Stop Sessions** - Track your coding time with simple commands
- 📁 **Project Tracking** - Organize sessions by project name
- 📊 **Daily Reports** - View today's sessions and progress
- 🎯 **Daily Goals** - Set and track your daily coding goals (default: 8 hours)
- 💾 **Persistent Storage** - All data saved automatically to `data.json`
- 🎨 **Beautiful Output** - Colored terminal output with emojis
- ⚡ **Fast & Lightweight** - No external dependencies for core functionality

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Install Dependencies

```bash
npm install
```

### Global Installation (Optional)

To use the `track` command globally:

```bash
npm link
```

After linking, you can use `track` from anywhere:

```bash
track start "My Project"
```

## 📖 Usage

### Basic Commands

#### Start a Session

Start tracking time for a coding session:

```bash
# Without project name
node index.js start

# With project name (as argument)
node index.js start "My Awesome Project"

# With project name (as option)
node index.js start --project "My Awesome Project"
```

**Output:**
```
✅ Session started successfully!
🕐 Started at: Jan 19, 2026, 4:31:13 PM
📁 Project: My Awesome Project
```

#### Stop a Session

Stop the current active session:

```bash
node index.js stop
```

**Output:**
```
✅ Session stopped successfully!
🕐 Started: Jan 19, 2026, 4:31:13 PM
🕐 Ended: Jan 19, 2026, 4:32:05 PM
⏱️  Duration: 2 hours 15 minutes (135 minutes)
📁 Project: My Awesome Project
```

#### Check Status

View current session status and daily progress:

```bash
node index.js status
```

**Output:**
```
Current Session:
Started: Jan 19, 2026, 4:31:13 PM
Elapsed: 2h 15m 30s
Project: My Awesome Project

Today's Progress: 4h 30m / 8h
Remaining: 3h 30m to reach goal
```

#### View Reports

View time tracking reports:

```bash
# Today's sessions
node index.js report --today

# All-time summary
node index.js report
```

**Today's Report Output:**
```
Today's Sessions:
  • 09:30 - 11:45 (2h 15m)
    Project: My Awesome Project
  • 14:00 - 16:30 (2h 30m)
    Project: Another Project

Total today: 4h 45m / 8h
```

#### Manage Configuration

Configure settings:

```bash
# List all configuration
node index.js config --list

# Get a specific config value
node index.js config --get dailyGoal

# Set a configuration value
node index.js config --set dailyGoal=6
```

### Command Reference

| Command | Description | Options |
|---------|-------------|---------|
| `start [project-name]` | Start a new coding session | `-p, --project <name>` |
| `stop` | Stop the current active session | - |
| `status` | Check current session status | - |
| `report` | Show time tracking reports | `-t, --today` |
| `config` | Manage configuration | `-s, --set <key=value>`, `-g, --get <key>`, `-l, --list` |

## 📁 Project Structure

```
dev-time-tracker/
├── index.js              # Main CLI entry point
├── utils/
│   └── data.js           # Data handling module
├── package.json          # Project configuration
├── data.json             # Session data storage (auto-generated)
├── README.md             # This file
└── .gitignore            # Git ignore rules
```

## 🔧 Data Module

The `utils/data.js` module provides the following functions:

- `readData()` - Reads from `data.json`, creates if doesn't exist
- `writeData(data)` - Writes to `data.json` with pretty formatting
- `getActiveSession()` - Finds session where `endTime` is null
- `getTodaySessions()` - Returns sessions from today using date-fns
- `addSession(session)` - Adds new session
- `updateSession(id, updates)` - Updates a session

## 📊 Data Format

Sessions are stored in `data.json`:

```json
{
  "sessions": [
    {
      "id": "1768858273317",
      "startTime": "2026-01-19T21:31:13.315Z",
      "endTime": "2026-01-19T21:31:35.121Z",
      "duration": 1320,
      "project": "My Awesome Project"
    }
  ],
  "config": {
    "dailyGoal": 8
  }
}
```

## 🎯 Daily Goals

Set your daily coding goal (in hours):

```bash
node index.js config --set dailyGoal=6
```

The CLI will track your progress throughout the day and show:
- Current progress vs goal
- Remaining time to reach goal
- Celebration when goal is achieved! 🎉

## 🛠️ Development

### Running Tests

Test the CLI commands:

```bash
# Test start command
node index.js start "Test Project"

# Test status
node index.js status

# Test stop
node index.js stop

# Test report
node index.js report --today
```

### Error Handling

The CLI includes comprehensive error handling:
- Prevents starting multiple sessions
- Validates date formats
- Handles corrupted data files
- Provides clear error messages

## 📝 Examples

### Example Workflow

```bash
# Start your morning coding session
node index.js start "Morning Work"

# Check status after a while
node index.js status

# Stop when done
node index.js stop

# View today's progress
node index.js report --today
```

### Setting Daily Goal

```bash
# Set goal to 6 hours
node index.js config --set dailyGoal=6

# Verify it was set
node index.js config --get dailyGoal
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Built with [Commander.js](https://github.com/tj/commander.js)
- Styled with [Chalk](https://github.com/chalk/chalk)
- Date handling with [date-fns](https://date-fns.org/)
- ASCII art with [Figlet](https://github.com/patorjk/figlet.js)

## 📧 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy Coding! ⏱️💻**

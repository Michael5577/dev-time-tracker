# ⏱️ Dev Time Tracker CLI

```
  ____               _____               _             
 |  _ \  _____   __ |_   _| __ __ _  ___| | _____ _ __ 
 | | | |/ _ \ \ / /   | || '__/ _` |/ __| |/ / _ \ '__|
 | |_| |  __/\ V /    | || | | (_| | (__|   <  __/ |   
 |____/ \___| \_/     |_||_|  \__,_|\___|_|\_\___|_|   
                                                       
```

> A beautiful and powerful command-line time tracking application for developers. Track your coding sessions, monitor daily progress, and achieve your development goals with a simple, elegant CLI tool.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Linux%20%7C%20Windows-lightgrey.svg)

---

## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Try It](#-try-it)
- [Usage Examples](#-usage-examples)
- [Command Reference](#-command-reference)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Data Format](#-data-format)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| ⏱️ **Session Tracking** | Start and stop coding sessions with simple commands |
| 📁 **Project Organization** | Organize sessions by project name for better tracking |
| 📊 **Daily Reports** | View today's sessions with detailed time breakdown |
| 🎯 **Daily Goals** | Set and track your daily coding goals (default: 8 hours) |
| 💾 **Persistent Storage** | All data automatically saved to `data.json` |
| 🎨 **Beautiful Output** | Colored terminal output with emojis for better UX |
| ⚡ **Fast & Lightweight** | Minimal dependencies, instant startup |
| 🔒 **Error Handling** | Comprehensive error handling and data validation |
| 📈 **Progress Tracking** | Real-time progress tracking towards daily goals |
| 🔄 **Session Management** | Prevent duplicate sessions, validate data integrity |

---

## 🚀 Installation

### Prerequisites

- **Node.js** v14.0.0 or higher
- **npm** (comes bundled with Node.js)

Verify your installation:

```bash
node --version  # Should be v14.0.0 or higher
npm --version   # Should be 6.0.0 or higher
```

### Local Installation

1. **Clone the repository** (or download the source code):

```bash
git clone https://github.com/YOUR_USERNAME/dev-time-tracker.git
cd dev-time-tracker
```

2. **Install dependencies**:

```bash
npm install
```

3. **Run the CLI**:

```bash
node index.js start "My Project"
```

### Global Installation

To use the `track` command from anywhere on your system:

1. **Navigate to the project directory**:

```bash
cd dev-time-tracker
```

2. **Link the package globally**:

```bash
npm link
```

3. **Verify installation**:

```bash
track --version
```

Now you can use `track` from any directory:

```bash
track start "My Awesome Project"
track status
track stop
```

### Uninstall Global Installation

If you want to remove the global command:

```bash
npm unlink -g dev-time-tracker
```

---

## 🎯 Quick Start

Get started in 3 simple steps:

```bash
# 1. Start tracking a session
track start "My Project"

# 2. Check your status
track status

# 3. Stop when done
track stop
```

That's it! Your session is automatically saved. 🎉

---

## 🧪 Try It

Want to test the CLI right away? Here are some quick commands to get you started:

### Quick Test Commands

```bash
# Test 1: Start a session
node index.js start "Test Project"
# or if globally installed:
track start "Test Project"

# Test 2: Check status (wait a few seconds first)
track status

# Test 3: Stop the session
track stop

# Test 4: View today's report
track report --today

# Test 5: Check configuration
track config --list
```

### Run All Examples

We've included a comprehensive example script that demonstrates all commands:

```bash
# Make the script executable
chmod +x examples/example-usage.sh

# Run all examples
bash examples/example-usage.sh
# or
./examples/example-usage.sh
```

This script will:
- ✅ Start multiple sessions
- ✅ Show status checks
- ✅ Demonstrate error handling
- ✅ Display reports
- ✅ Test configuration commands

### Interactive Demo

For a complete walkthrough, check out our [example usage script](examples/example-usage.sh) which runs all commands in sequence.

---

## 💻 Usage Examples

### Example 1: Starting a Session

```bash
$ track start "React Dashboard"
```

**Output:**
```
  ____               _____               _             
 |  _ \  _____   __ |_   _| __ __ _  ___| | _____ _ __ 
 | | | |/ _ \ \ / /   | || '__/ _` |/ __| |/ / _ \ '__|
 | |_| |  __/\ V /    | || | | (_| | (__|   <  __/ |   
 |____/ \___| \_/     |_||_|  \__,_|\___|_|\_\___|_|   
                                                       
✓ Session added successfully (ID: 1768858273317)
✅ Session started successfully!
🕐 Started at: Jan 19, 2026, 4:31:13 PM
📁 Project: React Dashboard
```

### Example 2: Checking Status

```bash
$ track status
```

**Output:**
```
  ____               _____               _             
 |  _ \  _____   __ |_   _| __ __ _  ___| | _____ _ __ 
 | | | |/ _ \ \ / /   | || '__/ _` |/ __| |/ / _ \ '__|
 | |_| |  __/\ V /    | || | | (_| | (__|   <  __/ |   
 |____/ \___| \_/     |_||_|  \__,_|\___|_|\_\___|_|   
                                                       
Current Session:
Started: Jan 19, 2026, 4:31:13 PM
Elapsed: 2h 15m 30s
Project: React Dashboard

Today's Progress: 4h 30m / 8h
Remaining: 3h 30m to reach goal
```

### Example 3: Stopping a Session

```bash
$ track stop
```

**Output:**
```
  ____               _____               _             
 |  _ \  _____   __ |_   _| __ __ _  ___| | _____ _ __ 
 | | | |/ _ \ \ / /   | || '__/ _` |/ __| |/ / _ \ '__|
 | |_| |  __/\ V /    | || | | (_| | (__|   <  __/ |   
 |____/ \___| \_/     |_||_|  \__,_|\___|_|\_\___|_|   
                                                       
✓ Session updated successfully (ID: 1768858273317)
✅ Session stopped successfully!
🕐 Started: Jan 19, 2026, 4:31:13 PM
🕐 Ended: Jan 19, 2026, 6:46:43 PM
⏱️  Duration: 2 hours 15 minutes (135 minutes)
📁 Project: React Dashboard
```

### Example 4: Viewing Today's Report

```bash
$ track report --today
```

**Output:**
```
  ____               _____               _             
 |  _ \  _____   __ |_   _| __ __ _  ___| | _____ _ __ 
 | | | |/ _ \ \ / /   | || '__/ _` |/ __| |/ / _ \ '__|
 | |_| |  __/\ V /    | || | | (_| | (__|   <  __/ |   
 |____/ \___| \_/     |_||_|  \__,_|\___|_|\_\___|_|   
                                                       
Today's Sessions:
  • 09:30 - 11:45 (2h 15m)
    Project: React Dashboard
  • 14:00 - 16:30 (2h 30m)
    Project: API Development
  • 19:00 - 20:15 (1h 15m)
    Project: Bug Fixes

Total today: 6h 0m / 8h
```

### Example 5: Configuring Daily Goal

```bash
$ track config --set dailyGoal=6
```

**Output:**
```
  ____               _____               _             
 |  _ \  _____   __ |_   _| __ __ _  ___| | _____ _ __ 
 | | | |/ _ \ \ / /   | || '__/ _` |/ __| |/ / _ \ '__|
 | |_| |  __/\ V /    | || | | (_| | (__|   <  __/ |   
 |____/ \___| \_/     |_||_|  \__,_|\___|_|\_\___|_|   
                                                       
✓ Configuration updated: dailyGoal = 6
```

### Example 6: Complete Workflow

```bash
# Morning session
$ track start "Morning Coding"
✅ Session started successfully!
🕐 Started at: Jan 19, 2026, 9:00:00 AM
📁 Project: Morning Coding

# Check progress after 2 hours
$ track status
Current Session:
Started: Jan 19, 2026, 9:00:00 AM
Elapsed: 2h 0m 0s
Project: Morning Coding

Today's Progress: 2h 0m / 8h
Remaining: 6h 0m to reach goal

# Stop session
$ track stop
✅ Session stopped successfully!
🕐 Started: Jan 19, 2026, 9:00:00 AM
🕐 Ended: Jan 19, 2026, 11:00:00 AM
⏱️  Duration: 2 hours (120 minutes)
📁 Project: Morning Coding

# Afternoon session
$ track start "Afternoon Work"
✅ Session started successfully!

# View today's summary
$ track report --today
Today's Sessions:
  • 09:00 - 11:00 (2h 0m)
    Project: Morning Coding
  • 14:00 - 16:30 (2h 30m)
    Project: Afternoon Work

Total today: 4h 30m / 8h
```

---

## 📚 Command Reference

### `start` - Start a New Session

Start tracking a new coding session.

| Option | Short | Description | Required |
|--------|-------|-------------|----------|
| `--project <name>` | `-p` | Project name for this session | No |
| `[project-name]` | - | Project name as argument | No |

**Examples:**

```bash
# Start without project name
track start

# Start with project as argument
track start "My Awesome Project"

# Start with project as option
track start --project "My Awesome Project"
track start -p "My Awesome Project"
```

**Behavior:**
- ✅ Creates a new session with unique ID
- ✅ Sets start time to current timestamp
- ✅ Prevents starting if another session is active
- ⚠️ Shows warning if session already running

---

### `stop` - Stop Current Session

Stop the currently active session and calculate duration.

| Option | Description |
|--------|-------------|
| None | Stops the active session |

**Examples:**

```bash
track stop
```

**Behavior:**
- ✅ Calculates duration using `date-fns`
- ✅ Updates session with end time and duration
- ✅ Shows formatted summary (start, end, duration)
- ❌ Errors if no active session found

**Output Format:**
- Human-readable duration (e.g., "2 hours 15 minutes")
- Raw minutes for reference
- Project name if set

---

### `status` - Check Current Status

View the status of your current session and daily progress.

| Option | Description |
|--------|-------------|
| None | Shows current session status |

**Examples:**

```bash
track status
```

**Displays:**
- 🕐 Session start time
- ⏱️ Elapsed time (updates in real-time)
- 📁 Project name (if set)
- 📊 Today's progress vs daily goal
- 🎯 Remaining time to reach goal

**When No Active Session:**
- Shows "No active session"
- Displays today's total if sessions exist
- Shows progress towards daily goal

---

### `report` - View Reports

Generate time tracking reports.

| Option | Short | Description |
|--------|-------|-------------|
| `--today` | `-t` | Show only today's sessions |

**Examples:**

```bash
# Today's sessions
track report --today
track report -t

# All-time summary
track report
```

**Today's Report Shows:**
- List of all sessions from today
- Start and end times
- Duration for each session
- Project names
- Total time today vs daily goal

**All-Time Report Shows:**
- Total number of completed sessions
- Total time tracked across all sessions

---

### `config` - Manage Configuration

Manage application configuration settings.

| Option | Short | Description |
|--------|-------|-------------|
| `--set <key=value>` | `-s` | Set a configuration value |
| `--get <key>` | `-g` | Get a configuration value |
| `--list` | `-l` | List all configuration values |

**Examples:**

```bash
# List all config
track config --list
track config -l

# Get a specific value
track config --get dailyGoal
track config -g dailyGoal

# Set a value
track config --set dailyGoal=6
track config -s dailyGoal=6
```

**Available Settings:**

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `dailyGoal` | Number | `8` | Daily coding goal in hours |

**Validation:**
- `dailyGoal` must be a positive number
- Invalid values show error message

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | ≥14.0.0 | Runtime environment |
| **Commander.js** | ^11.1.0 | CLI framework and argument parsing |
| **Chalk** | ^4.1.2 | Terminal string styling and colors |
| **date-fns** | ^3.0.0 | Date manipulation and formatting |
| **Figlet** | ^1.7.0 | ASCII art banner generation |

### Why These Technologies?

- **Commander.js**: Industry-standard CLI framework, easy to use, well-documented
- **Chalk**: Lightweight, performant terminal styling
- **date-fns**: Modern, tree-shakeable date library (better than Moment.js)
- **Figlet**: Adds visual appeal with ASCII art banners

---

## 📁 Project Structure

```
dev-time-tracker/
├── index.js              # Main CLI entry point (371 lines)
├── utils/
│   └── data.js          # Data handling module (299 lines)
│       ├── readData()           # Read from data.json
│       ├── writeData()           # Write to data.json
│       ├── getActiveSession()   # Find active session
│       ├── getTodaySessions()   # Get today's sessions
│       ├── addSession()          # Add new session
│       └── updateSession()      # Update existing session
├── package.json         # Project configuration
├── data.json            # Session data storage (auto-generated)
├── README.md           # This file
├── .gitignore          # Git ignore rules
└── GITHUB_SETUP.md     # GitHub setup guide
```

### File Descriptions

| File | Description | Lines |
|------|-------------|-------|
| `index.js` | Main CLI application with all commands | 371 |
| `utils/data.js` | Data persistence and session management | 299 |
| `package.json` | npm configuration and dependencies | 28 |
| `data.json` | User session data (auto-generated) | - |

---

## 💾 Data Format

Sessions are stored in `data.json` in the project root:

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

### Data Structure

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique session identifier (timestamp) |
| `startTime` | String | ISO 8601 timestamp when session started |
| `endTime` | String \| null | ISO 8601 timestamp when session ended (null if active) |
| `duration` | Number \| null | Duration in seconds (null if active) |
| `project` | String \| null | Project name (optional) |
| `config.dailyGoal` | Number | Daily coding goal in hours |

### Data Validation

The CLI includes comprehensive data validation:
- ✅ Validates date formats
- ✅ Handles corrupted JSON files
- ✅ Creates default structure if missing
- ✅ Validates session integrity
- ✅ Prevents invalid data operations

---

## 🚧 Future Enhancements

We have exciting features planned for future releases:

### Planned Features

- [ ] **📊 Weekly/Monthly Reports** - View reports for different time periods
- [ ] **📈 Statistics Dashboard** - Visual charts and graphs of your coding habits
- [ ] **🏷️ Tags System** - Tag sessions with multiple labels (e.g., "frontend", "backend", "bug-fix")
- [ ] **🔔 Notifications** - Reminders to take breaks or stop sessions
- [ ] **📤 Export Functionality** - Export data to CSV, JSON, or PDF
- [ ] **☁️ Cloud Sync** - Sync data across multiple devices
- [ ] **🔐 Privacy Mode** - Encrypt sensitive project names
- [ ] **📱 Mobile Companion** - Companion app for mobile devices
- [ ] **🤖 AI Insights** - Get insights about your coding patterns
- [ ] **🔗 Integration** - Integrate with GitHub, Jira, or other tools
- [ ] **📅 Calendar View** - Visual calendar showing your coding activity
- [ ] **🎯 Goal Templates** - Pre-defined goal templates for different scenarios
- [ ] **📝 Session Notes** - Add notes to sessions for better tracking
- [ ] **🔄 Session Editing** - Edit past sessions if needed
- [ ] **🗑️ Session Deletion** - Delete unwanted sessions

### Contributing Ideas

Have an idea? [Open an issue](https://github.com/YOUR_USERNAME/dev-time-tracker/issues) or submit a pull request!

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### How to Contribute

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/dev-time-tracker.git
   cd dev-time-tracker
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Write clean, commented code
   - Follow existing code style
   - Add tests if applicable
   - Update documentation

4. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe your changes
   - Reference any related issues
   - Add screenshots if UI changes

### Contribution Guidelines

- ✅ Write clear commit messages
- ✅ Keep code style consistent
- ✅ Add comments for complex logic
- ✅ Test your changes thoroughly
- ✅ Update README if needed
- ✅ Follow the existing code structure

### Code Style

- Use 2 spaces for indentation
- Use meaningful variable names
- Add JSDoc comments for functions
- Handle errors gracefully
- Use async/await for async operations

### Reporting Bugs

Found a bug? [Open an issue](https://github.com/YOUR_USERNAME/dev-time-tracker/issues) with:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Your environment (OS, Node version)

### Suggesting Features

Have an idea? [Open an issue](https://github.com/YOUR_USERNAME/dev-time-tracker/issues) with:
- Clear description of the feature
- Use case and benefits
- Possible implementation approach

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- Built with [Commander.js](https://github.com/tj/commander.js) - The complete solution for Node.js command-line programs
- Styled with [Chalk](https://github.com/chalk/chalk) - Terminal string styling done right
- Date handling with [date-fns](https://date-fns.org/) - Modern JavaScript date utility library
- ASCII art with [Figlet](https://github.com/patorjk/figlet.js) - Create ASCII Art from Text

---

## 📧 Support

- 📖 [Documentation](https://github.com/YOUR_USERNAME/dev-time-tracker#readme)
- 🐛 [Report a Bug](https://github.com/YOUR_USERNAME/dev-time-tracker/issues)
- 💡 [Request a Feature](https://github.com/YOUR_USERNAME/dev-time-tracker/issues)
- 💬 [Discussions](https://github.com/YOUR_USERNAME/dev-time-tracker/discussions)

---

## ⭐ Star History

If you find this project useful, please consider giving it a star! ⭐

---

<div align="center">

**Made with ❤️ by developers, for developers**

[⬆ Back to Top](#-dev-time-tracker-cli)

</div>

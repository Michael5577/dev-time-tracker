# 🚀 GitHub Setup Guide

This guide will help you push your Dev Time Tracker CLI to GitHub.

## Prerequisites

- Git installed and configured
- GitHub account
- (Optional) GitHub CLI (`gh`) for easier setup

## Step 1: Check Git Configuration

Make sure your git is configured:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 2: Stage All Files

```bash
git add .
```

This will add:
- `index.js` - Main CLI file
- `utils/data.js` - Data module
- `package.json` - Dependencies
- `README.md` - Documentation
- `.gitignore` - Git ignore rules
- `data.json` - Example data (with test sessions)
- Other project files

## Step 3: Create Initial Commit

```bash
git commit -m "Initial commit: Dev Time Tracker CLI

- Complete CLI with 5 commands (start, stop, status, report, config)
- Data module with 6 functions for session management
- Daily goal tracking
- Beautiful colored output with emojis
- Comprehensive error handling
- Full test suite passed"
```

## Step 4: Create GitHub Repository

### Option A: Using GitHub CLI (Recommended)

If you have `gh` installed:

```bash
# Login to GitHub (first time only)
gh auth login

# Create repository and push
gh repo create dev-time-tracker --public --source=. --remote=origin --push
```

### Option B: Using GitHub Website

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **+** icon in the top right → **New repository**
3. Repository name: `dev-time-tracker`
4. Description: `A beautiful CLI time tracking application for developers`
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **Create repository**

Then connect and push:

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/dev-time-tracker.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 5: Verify

After pushing, visit your repository:
```
https://github.com/YOUR_USERNAME/dev-time-tracker
```

You should see:
- ✅ All files uploaded
- ✅ README.md displayed
- ✅ data.json with example sessions
- ✅ Clean project structure

## Step 6: Add Repository Topics (Optional)

On GitHub, click the gear icon next to "About" and add topics:
- `cli`
- `time-tracker`
- `productivity`
- `nodejs`
- `developer-tools`

## Step 7: Add License (Optional)

If you want to add a license:

```bash
# Create MIT license file
cat > LICENSE << 'EOF'
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
EOF

git add LICENSE
git commit -m "Add MIT License"
git push
```

## Troubleshooting

### Authentication Issues

If you get authentication errors:

```bash
# Use Personal Access Token
# 1. Go to GitHub Settings > Developer settings > Personal access tokens
# 2. Generate new token with 'repo' scope
# 3. Use token as password when pushing
```

Or use SSH:

```bash
# Generate SSH key (if you don't have one)
ssh-keygen -t ed25519 -C "your.email@example.com"

# Add to GitHub: Settings > SSH and GPG keys > New SSH key
# Then use SSH URL:
git remote set-url origin git@github.com:YOUR_USERNAME/dev-time-tracker.git
```

### Push Rejected

If push is rejected:

```bash
# Pull first (if repo was initialized on GitHub)
git pull origin main --allow-unrelated-histories

# Then push
git push -u origin main
```

## Next Steps After GitHub Setup

1. **Add badges** to README (already included)
2. **Create releases** for version tags
3. **Add screenshots** of CLI output
4. **Set up GitHub Actions** for CI/CD (optional)
5. **Add contributing guidelines** (optional)

## Quick Reference Commands

```bash
# Check status
git status

# Stage all changes
git add .

# Commit
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# View remote
git remote -v
```

---

**Ready to push! 🚀**

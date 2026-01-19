#!/bin/bash

# ============================================
# Dev Time Tracker CLI - Example Usage Script
# ============================================
# This script demonstrates all CLI commands in sequence
# Run with: bash examples/example-usage.sh
# Or make executable: chmod +x examples/example-usage.sh && ./examples/example-usage.sh

echo "============================================"
echo "Dev Time Tracker CLI - Example Usage"
echo "============================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if track command is available
if command -v track &> /dev/null; then
    CMD="track"
elif [ -f "./index.js" ]; then
    CMD="node index.js"
else
    echo "Error: Could not find track command or index.js"
    exit 1
fi

echo -e "${BLUE}Using command: $CMD${NC}"
echo ""

# ============================================
# Example 1: Start a session with project name
# ============================================
echo -e "${GREEN}=== Example 1: Start a session with project name ===${NC}"
echo "Command: $CMD start \"Example Project\""
echo ""
$CMD start "Example Project"
echo ""
sleep 2

# ============================================
# Example 2: Check status
# ============================================
echo -e "${GREEN}=== Example 2: Check current status ===${NC}"
echo "Command: $CMD status"
echo ""
$CMD status
echo ""
sleep 2

# ============================================
# Example 3: Try to start another session (should warn)
# ============================================
echo -e "${GREEN}=== Example 3: Try to start another session (should warn) ===${NC}"
echo "Command: $CMD start \"Another Project\""
echo ""
$CMD start "Another Project"
echo ""
sleep 2

# ============================================
# Example 4: Stop the session
# ============================================
echo -e "${GREEN}=== Example 4: Stop the current session ===${NC}"
echo "Command: $CMD stop"
echo ""
$CMD stop
echo ""
sleep 2

# ============================================
# Example 5: Start session without project name
# ============================================
echo -e "${GREEN}=== Example 5: Start session without project name ===${NC}"
echo "Command: $CMD start"
echo ""
$CMD start
echo ""
sleep 2

# ============================================
# Example 6: Stop the session
# ============================================
echo -e "${GREEN}=== Example 6: Stop the session ===${NC}"
echo "Command: $CMD stop"
echo ""
$CMD stop
echo ""
sleep 2

# ============================================
# Example 7: Start session with --project option
# ============================================
echo -e "${GREEN}=== Example 7: Start session with --project option ===${NC}"
echo "Command: $CMD start --project \"CLI Demo Project\""
echo ""
$CMD start --project "CLI Demo Project"
echo ""
sleep 2

# ============================================
# Example 8: Stop the session
# ============================================
echo -e "${GREEN}=== Example 8: Stop the session ===${NC}"
echo "Command: $CMD stop"
echo ""
$CMD stop
echo ""
sleep 1

# ============================================
# Example 9: View today's report
# ============================================
echo -e "${GREEN}=== Example 9: View today's report ===${NC}"
echo "Command: $CMD report --today"
echo ""
$CMD report --today
echo ""
sleep 1

# ============================================
# Example 10: View all-time report
# ============================================
echo -e "${GREEN}=== Example 10: View all-time report ===${NC}"
echo "Command: $CMD report"
echo ""
$CMD report
echo ""
sleep 1

# ============================================
# Example 11: List configuration
# ============================================
echo -e "${GREEN}=== Example 11: List configuration ===${NC}"
echo "Command: $CMD config --list"
echo ""
$CMD config --list
echo ""
sleep 1

# ============================================
# Example 12: Get specific config value
# ============================================
echo -e "${GREEN}=== Example 12: Get specific config value ===${NC}"
echo "Command: $CMD config --get dailyGoal"
echo ""
$CMD config --get dailyGoal
echo ""
sleep 1

# ============================================
# Example 13: Set configuration
# ============================================
echo -e "${GREEN}=== Example 13: Set configuration ===${NC}"
echo "Command: $CMD config --set dailyGoal=6"
echo ""
$CMD config --set dailyGoal=6
echo ""
sleep 1

# ============================================
# Example 14: Verify config was set
# ============================================
echo -e "${GREEN}=== Example 14: Verify config was set ===${NC}"
echo "Command: $CMD config --get dailyGoal"
echo ""
$CMD config --get dailyGoal
echo ""
sleep 1

# ============================================
# Example 15: Check status with no active session
# ============================================
echo -e "${GREEN}=== Example 15: Check status with no active session ===${NC}"
echo "Command: $CMD status"
echo ""
$CMD status
echo ""

# ============================================
# Summary
# ============================================
echo -e "${YELLOW}============================================${NC}"
echo -e "${YELLOW}Example Usage Complete!${NC}"
echo -e "${YELLOW}============================================${NC}"
echo ""
echo "All commands have been demonstrated."
echo "Check your data.json file to see the saved sessions."
echo ""

#!/bin/bash

# ============================================
# Installation Test Script
# ============================================
# This script tests npm link for local development
# Run with: bash examples/install-test.sh

echo "============================================"
echo "Testing npm link Installation"
echo "============================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the project directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: Must run from project root directory${NC}"
    exit 1
fi

echo -e "${BLUE}Step 1: Installing dependencies...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: npm install failed${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}Step 2: Creating global symlink with npm link...${NC}"
npm link

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: npm link failed${NC}"
    echo -e "${YELLOW}Note: This might require sudo on some systems${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}Step 3: Testing track command...${NC}"

# Test if track command is available
if command -v track &> /dev/null; then
    echo -e "${GREEN}✅ track command is available!${NC}"
    echo ""
    echo "Testing version:"
    track --version
    echo ""
    echo "Testing help:"
    track --help | head -10
    echo ""
    echo -e "${GREEN}✅ Installation successful!${NC}"
    echo ""
    echo -e "${YELLOW}To uninstall, run: npm unlink -g dev-time-tracker${NC}"
else
    echo -e "${RED}❌ track command not found${NC}"
    echo "This might be a PATH issue. Try:"
    echo "  export PATH=\$PATH:\$(npm config get prefix)/bin"
    exit 1
fi

echo ""
echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}Installation test complete!${NC}"
echo -e "${BLUE}============================================${NC}"

#!/bin/bash

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# ASCII Art
echo -e "${CYAN}"
cat << "EOF"

╔══════════════════════════════════════════════════════════════════════════════════════╗
║                🌟🌿  N U R H A Y A T Y U R T A S L A N   🌿🌟                        ║
╚══════════════════════════════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

echo -e "${BLUE}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                    🎯 SETUP INITIATED                        ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if Node.js is installed
echo -e "${YELLOW}🔍 Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    echo -e "${CYAN}📥 Visit: https://nodejs.org/${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js and npm are installed${NC}"
echo -e "${CYAN}📊 Node.js version: $(node --version)${NC}"
echo -e "${CYAN}📦 npm version: $(npm --version)${NC}"
echo ""

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
echo -e "${PURPLE}⏳ This may take a few moments...${NC}"
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dependencies installed successfully${NC}"
else
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

# Create .env.local file if it doesn't exist
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}📝 Creating .env.local file...${NC}"
    cat > .env.local << EOF
# Environment variables for Nurlife Bio Website
NEXT_PUBLIC_SITE_URL=http://localhost:3002
EOF
    echo -e "${GREEN}✅ .env.local file created${NC}"
fi

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                    🎉 SETUP COMPLETED!                        ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${CYAN}🚀 Starting development server...${NC}"
echo -e "${PURPLE}⏳ Server will be available at: http://localhost:3002${NC}"
echo ""

# Show project structure
echo -e "${YELLOW}📁 Project Structure:${NC}"
echo -e "${WHITE}  src/${NC}"
echo -e "${WHITE}  ├── app/          # Next.js app directory${NC}"
echo -e "${WHITE}  ├── components/   # React components${NC}"
echo -e "${WHITE}  ├── data/         # JSON data files${NC}"
echo -e "${WHITE}  ├── styles/       # CSS files and design system${NC}"
echo -e "${WHITE}  ├── types/        # TypeScript type definitions${NC}"
echo -e "${WHITE}  └── utils/        # Utility functions${NC}"
echo ""

echo -e "${YELLOW}🎨 Design System Features:${NC}"
echo -e "${WHITE}  • Modern Neon Color Palette${NC}"
echo -e "${WHITE}  • Futuristic Typography${NC}"
echo -e "${WHITE}  • Glass Morphism Effects${NC}"
echo -e "${WHITE}  • Smooth Animations${NC}"
echo -e "${WHITE}  • Responsive Design${NC}"
echo ""

echo -e "${YELLOW}🔧 Customization:${NC}"
echo -e "${WHITE}  📝 Content: src/data/bio.json${NC}"
echo -e "${WHITE}  🎨 Design: src/styles/design-system.ts${NC}"
echo ""

echo -e "${CYAN}🔥 Starting development server with hot reload...${NC}"
echo -e "${PURPLE}💡 Press Ctrl+C to stop the server${NC}"
echo ""

# Start the development server
npm run dev 
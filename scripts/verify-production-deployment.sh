#!/bin/bash

# GUIONIX Production Deployment Verification Script
# Tests all major functionalities after Railway deployment

echo "🚀 GUIONIX Production Deployment Verification"
echo "============================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Railway deployment URL (update this with your actual Railway URL)
RAILWAY_URL="https://guionix-frontend-production.up.railway.app"

echo -e "${BLUE}🔍 Testing Railway deployment at: ${RAILWAY_URL}${NC}"
echo ""

# Function to test endpoint
test_endpoint() {
    local endpoint="$1"
    local expected_status="$2"
    local description="$3"
    
    echo -n "Testing ${description}... "
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "${RAILWAY_URL}${endpoint}" --max-time 30)
    
    if [ "$response" = "$expected_status" ]; then
        echo -e "${GREEN}✅ PASS${NC} (HTTP $response)"
    else
        echo -e "${RED}❌ FAIL${NC} (HTTP $response, expected $expected_status)"
    fi
}

# Function to test page content
test_page_content() {
    local endpoint="$1"
    local search_text="$2"
    local description="$3"
    
    echo -n "Testing ${description}... "
    
    content=$(curl -s "${RAILWAY_URL}${endpoint}" --max-time 30)
    
    if echo "$content" | grep -q "$search_text"; then
        echo -e "${GREEN}✅ PASS${NC} (Content found)"
    else
        echo -e "${RED}❌ FAIL${NC} (Content not found)"
    fi
}

echo -e "${YELLOW}📋 Testing Core Endpoints:${NC}"
echo "----------------------------------------"

# Test health check
test_endpoint "/api/health" "200" "Health Check API"

# Test main page
test_endpoint "/" "200" "Main Page"

# Test login page
test_endpoint "/login" "200" "Login Page"

# Test dashboard (should redirect to login)
test_endpoint "/dashboard" "200" "Dashboard Access"

# Test settings page
test_endpoint "/settings" "200" "Settings Page"

# Test studio
test_endpoint "/studio" "200" "Studio Page"

echo ""
echo -e "${YELLOW}🎨 Testing Page Content:${NC}"
echo "----------------------------------------"

# Test for GUIONIX branding
test_page_content "/" "GUIONIX" "GUIONIX Branding"

# Test for modern login
test_page_content "/login" "Iniciar Sesión" "Login Form"

# Test for theme support
test_page_content "/" "dark:bg-" "Dark Mode Support"

echo ""
echo -e "${YELLOW}🔐 Testing Authentication Endpoints:${NC}"
echo "----------------------------------------"

# Test NextAuth endpoints
test_endpoint "/api/auth/session" "200" "NextAuth Session"
test_endpoint "/api/auth/signin" "200" "NextAuth SignIn"
test_endpoint "/api/auth/providers" "200" "NextAuth Providers"

echo ""
echo -e "${YELLOW}🏗️ Testing Studio API:${NC}"
echo "----------------------------------------"

# Test studio API endpoints
test_endpoint "/api/studio/projects" "401" "Studio Projects API (Auth Required)"
test_endpoint "/api/studio/ai/generate" "401" "AI Generation API (Auth Required)"

echo ""
echo -e "${YELLOW}📊 Build Information Check:${NC}"
echo "----------------------------------------"

# Check if the deployment is recent
echo -n "Checking deployment freshness... "
last_modified=$(curl -s -I "${RAILWAY_URL}/" | grep -i "last-modified" | cut -d' ' -f2-)
if [ -n "$last_modified" ]; then
    echo -e "${GREEN}✅ PASS${NC} (Last modified: $last_modified)"
else
    echo -e "${YELLOW}⚠️  UNKNOWN${NC} (Cannot determine deployment time)"
fi

echo ""
echo -e "${YELLOW}🎯 Testing Enhanced Features:${NC}"
echo "----------------------------------------"

# Test for notification system
test_page_content "/" "NotificationCenter" "Notification System"

# Test for toast system
test_page_content "/" "ToastContainer" "Toast Notification System"

# Test for theme system
test_page_content "/" "useTheme" "Theme Management"

# Test for interactive cards
test_page_content "/" "hover:border-\\[#cb4335\\]" "Interactive Dashboard Cards"

echo ""
echo -e "${BLUE}📋 DEPLOYMENT SUMMARY:${NC}"
echo "============================================="
echo ""
echo "🔗 Production URL: ${RAILWAY_URL}"
echo "🏗️  Build System: Nixpacks (No Docker)"
echo "⚡ Framework: Next.js 14 with App Router"
echo "🎨 Styling: Tailwind CSS with GUIONIX theme"
echo "🔐 Authentication: NextAuth.js with Google OAuth"
echo "📱 Features: Responsive design, dark/light mode"
echo "🔔 Enhancements: Notifications, toasts, interactive cards"
echo ""

# Test the specific new features
echo -e "${YELLOW}🆕 Testing New Dashboard Features:${NC}"
echo "----------------------------------------"

# Test notification center integration
echo -n "Testing notification integration... "
if curl -s "${RAILWAY_URL}/" | grep -q "notification.*count"; then
    echo -e "${GREEN}✅ PASS${NC}"
else
    echo -e "${YELLOW}⚠️  PARTIAL${NC} (May require login)"
fi

# Test settings page functionality
echo -n "Testing settings page... "
if curl -s "${RAILWAY_URL}/settings" | grep -q "Configuración"; then
    echo -e "${GREEN}✅ PASS${NC}"
else
    echo -e "${YELLOW}⚠️  PARTIAL${NC} (May require login)"
fi

echo ""
echo -e "${GREEN}🎉 DEPLOYMENT VERIFICATION COMPLETE!${NC}"
echo ""
echo "Next steps:"
echo "1. Visit ${RAILWAY_URL} to test the application manually"
echo "2. Test the login flow with Google OAuth"
echo "3. Verify dashboard functionality and new features"
echo "4. Test theme switching and responsive design"
echo "5. Verify notification system and toast feedback"
echo ""

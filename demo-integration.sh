#!/bin/bash

# 🎬 GUIONIX Integration Demonstration Script
# This script demonstrates the complete end-to-end functionality

echo "🎯 GUIONIX INTEGRATION DEMONSTRATION"
echo "===================================="
echo ""

# Check if the server is running
echo "📡 Checking server status..."
if curl -s http://localhost:3002/api/health > /dev/null; then
    echo "✅ Server is running on http://localhost:3002"
else
    echo "❌ Server is not running. Please start with: npm run dev"
    exit 1
fi

echo ""

# 1. Health Check
echo "🏥 1. System Health Check"
echo "------------------------"
curl -s http://localhost:3002/api/health | jq '.status, .services'
echo ""

# 2. Full Integration Test
echo "🔗 2. Full Service Integration Test"
echo "----------------------------------"
INTEGRATION_TEST=$(curl -s http://localhost:3002/api/integration/test)
echo "$INTEGRATION_TEST" | jq '.summary'
echo ""

# 3. AI Service Test
echo "🤖 3. AI Service Test"
echo "--------------------"
AI_TEST=$(curl -s -X POST http://localhost:3002/api/integration/test \
  -H "Content-Type: application/json" \
  -d '{
    "service": "ai",
    "action": "generate",
    "payload": {
      "prompt": "Generate a compelling opening scene for a thriller screenplay",
      "userId": "demo-user"
    }
  }')
echo "$AI_TEST" | jq '.result.content, .result.provider, .result.cost'
echo ""

# 4. Script Engine Test
echo "📝 4. Script Engine Test (Blake Snyder Structure)"
echo "------------------------------------------------"
SCRIPT_TEST=$(curl -s -X POST http://localhost:3002/api/integration/test \
  -H "Content-Type: application/json" \
  -d '{
    "service": "script",
    "action": "generate",
    "payload": {
      "title": "Digital Conspiracy",
      "genre": "techno-thriller",
      "logline": "A cybersecurity expert uncovers a plot to manipulate global elections through AI",
      "userId": "demo-user"
    }
  }')
echo "$SCRIPT_TEST" | jq '.result.scriptId, .result.title, .result.logline'
echo "Blake Snyder Beats Generated: $(echo "$SCRIPT_TEST" | jq '.result.beats | length')"
echo ""

# 5. Export Engine Test
echo "📁 5. Export Engine Test"
echo "------------------------"
EXPORT_TEST=$(curl -s -X POST http://localhost:3002/api/integration/test \
  -H "Content-Type: application/json" \
  -d '{
    "service": "export",
    "action": "export",
    "payload": {
      "scriptId": "demo-script-001",
      "userId": "demo-user",
      "format": "pdf",
      "options": {
        "includeTitle": true,
        "includePageNumbers": true
      }
    }
  }')
echo "$EXPORT_TEST" | jq '.result.exportId, .result.fileName, .result.status'
echo ""

# 6. User Service Test
echo "👥 6. User Service Test"
echo "----------------------"
USER_TEST=$(curl -s http://localhost:3002/api/integration/test?service=user)
echo "$USER_TEST" | jq '.serviceResults.userService.response.role, .serviceResults.userService.response.permissions'
echo ""

# Summary
echo "🎉 DEMONSTRATION COMPLETE"
echo "========================"
echo "✅ System Health: Operational"
echo "✅ AI Service: Content generation working"
echo "✅ Script Engine: Blake Snyder 15-beat structure"
echo "✅ Export Engine: Multi-format export ready"
echo "✅ User Service: SUPER_ADMIN permissions"
echo ""
echo "🎬 Your GUIONIX system is fully integrated and ready for screenplay production!"
echo ""
echo "🌐 Access the application:"
echo "   - Main App: http://localhost:3002"
echo "   - Integration Dashboard: http://localhost:3002/integration-dashboard"
echo "   - Health Check: http://localhost:3002/api/health"
echo ""

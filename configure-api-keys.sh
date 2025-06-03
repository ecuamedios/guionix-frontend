#!/bin/bash

# GUIONIX Backend API Keys Configuration Helper
# ============================================

echo "🎯 GUIONIX BACKEND API KEYS CONFIGURATION"
echo "=========================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found!"
    echo "Please run this script from the guionix-frontend directory."
    exit 1
fi

echo "📋 Current API Key Status:"
echo ""

# Function to check if API key is configured
check_api_key() {
    local key_name=$1
    local service_name=$2
    
    if grep -q "${key_name}=your_" .env.local; then
        echo "⚠️  ${service_name}: NOT CONFIGURED"
        return 1
    elif grep -q "${key_name}=" .env.local; then
        echo "✅ ${service_name}: CONFIGURED"
        return 0
    else
        echo "❌ ${service_name}: MISSING"
        return 1
    fi
}

# Check backend services
echo "🧠 Backend Services:"
check_api_key "GUIONIX_BRAIN_API_KEY" "Brain Service"
check_api_key "GUIONIX_AI_ORCHESTRATOR_API_KEY" "AI Orchestrator"
check_api_key "GUIONIX_SCRIPT_ENGINE_API_KEY" "Script Engine"
check_api_key "GUIONIX_EXPORT_ENGINE_API_KEY" "Export Engine"

echo ""
echo "🤖 AI Providers:"
check_api_key "XAI_API_KEY" "X.AI (Grok)"
check_api_key "OPENAI_API_KEY" "OpenAI"
check_api_key "ANTHROPIC_API_KEY" "Anthropic Claude"

echo ""
echo "📖 HOW TO GET API KEYS:"
echo "======================"
echo ""
echo "1. 🧠 Brain Service API Key:"
echo "   - Access your Brain Service dashboard"
echo "   - Go to Settings > API Keys"
echo "   - Generate a new API key for frontend access"
echo ""
echo "2. 🤖 AI Orchestrator API Key:"
echo "   - Access your AI Orchestrator dashboard"
echo "   - Go to Authentication > API Keys"
echo "   - Create a key with generation permissions"
echo ""
echo "3. 📝 Script Engine API Key:"
echo "   - Access your Script Engine dashboard"
echo "   - Go to API Management > Keys"
echo "   - Generate a key with script generation rights"
echo ""
echo "4. 📁 Export Engine API Key:"
echo "   - Access your Export Engine dashboard"
echo "   - Go to API Settings > Authentication"
echo "   - Create a key with export permissions"
echo ""
echo "5. 🤖 AI Provider Keys (Optional but recommended):"
echo "   - X.AI: https://console.x.ai/api-keys"
echo "   - OpenAI: https://platform.openai.com/api-keys"
echo "   - Anthropic: https://console.anthropic.com/api-keys"
echo ""
echo "🔧 CONFIGURATION COMMANDS:"
echo "========================="
echo ""
echo "# Replace 'your_actual_key_here' with your real API keys:"
echo ""
echo "# Backend Services"
echo "sed -i '' 's/GUIONIX_BRAIN_API_KEY=your_brain_api_key_here/GUIONIX_BRAIN_API_KEY=your_actual_key_here/' .env.local"
echo "sed -i '' 's/GUIONIX_AI_ORCHESTRATOR_API_KEY=your_ai_orchestrator_api_key_here/GUIONIX_AI_ORCHESTRATOR_API_KEY=your_actual_key_here/' .env.local"
echo "sed -i '' 's/GUIONIX_SCRIPT_ENGINE_API_KEY=your_script_engine_api_key_here/GUIONIX_SCRIPT_ENGINE_API_KEY=your_actual_key_here/' .env.local"
echo "sed -i '' 's/GUIONIX_EXPORT_ENGINE_API_KEY=your_export_engine_api_key_here/GUIONIX_EXPORT_ENGINE_API_KEY=your_actual_key_here/' .env.local"
echo ""
echo "# AI Providers (Optional)"
echo "sed -i '' 's/XAI_API_KEY=your_xai_api_key_here/XAI_API_KEY=your_actual_key_here/' .env.local"
echo "sed -i '' 's/OPENAI_API_KEY=your_openai_api_key_here/OPENAI_API_KEY=your_actual_key_here/' .env.local"
echo "sed -i '' 's/ANTHROPIC_API_KEY=your_claude_api_key_here/ANTHROPIC_API_KEY=your_actual_key_here/' .env.local"
echo ""
echo "🧪 TESTING AFTER CONFIGURATION:"
echo "==============================="
echo ""
echo "# 1. Start the development server"
echo "npm run dev"
echo ""
echo "# 2. Test the integration dashboard"
echo "open http://localhost:3000/integration-dashboard"
echo ""
echo "# 3. Run integration tests"
echo "curl -X POST http://localhost:3000/api/integration/test -H 'Content-Type: application/json' -d '{\"service\": \"ai\", \"action\": \"generate\", \"payload\": {\"prompt\": \"Test\", \"tier\": \"cost-effective\", \"userId\": \"test\"}}'"
echo ""
echo "✨ Once all keys are configured, your GUIONIX frontend will be 100% integrated!"

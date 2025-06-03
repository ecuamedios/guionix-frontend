#!/bin/bash

echo "🔧 GUIONIX LOGIN FLOW DEBUGGING"
echo "================================"
echo ""

echo "📡 Testing API endpoints:"
echo ""

echo "1. Testing providers endpoint..."
curl -s http://localhost:3002/api/auth/providers | jq '.' 2>/dev/null || echo "❌ Providers endpoint failed"

echo ""
echo "2. Testing session endpoint..."
curl -s -H "Cookie: $(cat cookies.txt 2>/dev/null || echo '')" http://localhost:3002/api/auth/session | jq '.' 2>/dev/null || echo "No active session"

echo ""
echo "3. Testing CSRF endpoint..."
curl -s http://localhost:3002/api/auth/csrf | jq '.' 2>/dev/null || echo "❌ CSRF endpoint failed"

echo ""
echo "🧪 MANUAL TEST INSTRUCTIONS:"
echo "1. Open: http://localhost:3002"
echo "2. Should redirect to: http://localhost:3002/login"
echo "3. Use credentials:"
echo "   - Email: test@guionix.com"
echo "   - Password: password123"
echo "4. After successful login, should redirect to: http://localhost:3002/"
echo "5. Dashboard should display with professional layout"

echo ""
echo "🔍 Expected behavior after login:"
echo "✅ POST /api/auth/callback/credentials 200"
echo "✅ GET /api/auth/session 200 (with user data)"
echo "✅ Redirect to / (dashboard)"
echo "✅ Dashboard displays properly"

echo ""
echo "❌ Current issue symptoms:"
echo "- Users stay on /login page after successful authentication"
echo "- Need to verify session persistence and middleware logic"

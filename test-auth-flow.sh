#!/bin/bash

echo "🧪 Testing GUIONIX Authentication Flow..."
echo "========================================="
echo ""

# Check if server is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Server is not running. Please start with 'npm run dev'"
    exit 1
fi

echo "✅ Server is running at http://localhost:3000"
echo ""

echo "🔍 Testing Authentication Flow:"
echo ""

echo "1. Testing root route (/) - should redirect to /landing"
RESPONSE=$(curl -s -I -w "%{http_code}" -o /dev/null http://localhost:3000/)
if [ "$RESPONSE" -eq 302 ] || [ "$RESPONSE" -eq 307 ]; then
    echo "   ✅ Root route redirects properly"
else
    echo "   ❌ Root route response: $RESPONSE"
fi

echo ""
echo "2. Testing /landing route - should be accessible"
RESPONSE=$(curl -s -I -w "%{http_code}" -o /dev/null http://localhost:3000/landing)
if [ "$RESPONSE" -eq 200 ]; then
    echo "   ✅ Landing page accessible"
else
    echo "   ❌ Landing page response: $RESPONSE"
fi

echo ""
echo "3. Testing /login route - should be accessible"
RESPONSE=$(curl -s -I -w "%{http_code}" -o /dev/null http://localhost:3000/login)
if [ "$RESPONSE" -eq 200 ]; then
    echo "   ✅ Login page accessible"
else
    echo "   ❌ Login page response: $RESPONSE"
fi

echo ""
echo "4. Testing /dashboard route - should require authentication"
RESPONSE=$(curl -s -I -w "%{http_code}" -o /dev/null http://localhost:3000/dashboard)
if [ "$RESPONSE" -eq 302 ] || [ "$RESPONSE" -eq 307 ]; then
    echo "   ✅ Dashboard redirects unauthenticated users"
else
    echo "   ❌ Dashboard response: $RESPONSE"
fi

echo ""
echo "🎯 Manual Test Instructions:"
echo "=============================="
echo ""
echo "1. Open: http://localhost:3000"
echo "   Expected: Redirects to landing page"
echo ""
echo "2. Click 'Iniciar Sesión' or go to: http://localhost:3000/login"
echo "   Expected: Shows login form"
echo ""
echo "3. Login with:"
echo "   📧 Email: test@guionix.com"
echo "   🔑 Password: password123"
echo "   Expected: Redirects to dashboard"
echo ""
echo "4. Dashboard should show:"
echo "   ✅ Professional dashboard with statistics"
echo "   ✅ Project cards and quick actions"
echo "   ✅ User info in header"
echo ""
echo "🚀 If all steps work, the login redirect issue is FIXED!"
echo ""

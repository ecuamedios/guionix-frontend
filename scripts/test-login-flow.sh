#!/bin/bash

# Test GUIONIX Login Flow
echo "🧪 Testing GUIONIX Login Flow..."
echo "================================"

# Test if server is running
echo "1. Checking if server is running..."
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001 > /tmp/status.txt
STATUS=$(cat /tmp/status.txt)

if [ "$STATUS" = "200" ]; then
    echo "✅ Server is running on http://localhost:3001"
else
    echo "❌ Server is not responding (HTTP $STATUS)"
    exit 1
fi

# Test login page
echo "2. Testing login page..."
curl -s http://localhost:3001/login > /tmp/login_page.html
if grep -q "Iniciar sesión" /tmp/login_page.html; then
    echo "✅ Login page loads correctly"
else
    echo "❌ Login page not found or broken"
    exit 1
fi

# Test auth API
echo "3. Testing NextAuth API..."
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/api/auth/session > /tmp/auth_status.txt
AUTH_STATUS=$(cat /tmp/auth_status.txt)

if [ "$AUTH_STATUS" = "200" ]; then
    echo "✅ NextAuth API is responding"
else
    echo "❌ NextAuth API is not responding (HTTP $AUTH_STATUS)"
    exit 1
fi

# Test dashboard redirect (should redirect to login)
echo "4. Testing dashboard protection..."
curl -s -I http://localhost:3001/ | grep -i location | head -1 > /tmp/redirect.txt
if grep -q "login" /tmp/redirect.txt; then
    echo "✅ Dashboard correctly redirects to login when unauthenticated"
else
    echo "⚠️  Dashboard protection might not be working"
fi

echo ""
echo "🎯 Manual Test Instructions:"
echo "1. Open http://localhost:3001/login"
echo "2. Use credentials: test@guionix.com / password123"
echo "3. After login, you should be redirected to the dashboard"
echo ""
echo "🔍 Check browser console for detailed login logs"

# Cleanup
rm -f /tmp/status.txt /tmp/login_page.html /tmp/auth_status.txt /tmp/redirect.txt

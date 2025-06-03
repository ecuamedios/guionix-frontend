#!/bin/bash
# scripts/test-login.sh - Test login functionality

echo "🧪 Testing GUIONIX Login Functionality"
echo "======================================"

# Test credentials
EMAIL="test@guionix.com"
PASSWORD="password123"

echo "📧 Testing with: $EMAIL"
echo "🔑 Password: $PASSWORD"
echo ""

# Test the login API endpoint
echo "🔍 Testing login API endpoint..."
RESPONSE=$(curl -s -X POST http://localhost:3002/api/auth/callback/credentials \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=$EMAIL&password=$PASSWORD&csrfToken=" \
  -w "HTTP_STATUS:%{http_code}")

HTTP_STATUS=$(echo $RESPONSE | grep -o "HTTP_STATUS:[0-9]*" | cut -d: -f2)

if [ "$HTTP_STATUS" = "200" ] || [ "$HTTP_STATUS" = "302" ]; then
    echo "✅ Login API working correctly (Status: $HTTP_STATUS)"
else
    echo "❌ Login API failed (Status: $HTTP_STATUS)"
    echo "Response: $RESPONSE"
fi

echo ""
echo "🌐 Manual Test Instructions:"
echo "1. Open http://localhost:3002/login in your browser"
echo "2. Use credentials:"
echo "   Email: $EMAIL"
echo "   Password: $PASSWORD"
echo "3. Click 'Ingresar' button"
echo "4. Should redirect to /dashboard on success"
echo ""
echo "🔍 Check browser network tab for detailed debugging"

#!/bin/bash

# GUIONIX Deployment Health Check Script
# Usage: ./scripts/check-deployment.sh [RAILWAY_URL]

RAILWAY_URL=${1:-"https://your-railway-app.railway.app"}

echo "🚀 Checking GUIONIX deployment health..."
echo "URL: $RAILWAY_URL"
echo ""

# Check health endpoint
echo "📊 Testing health endpoint..."
HEALTH_RESPONSE=$(curl -s -w "%{http_code}" "$RAILWAY_URL/api/health")
HTTP_CODE=${HEALTH_RESPONSE: -3}
RESPONSE_BODY=${HEALTH_RESPONSE%???}

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Health check passed!"
    echo "Response: $RESPONSE_BODY"
else
    echo "❌ Health check failed (HTTP $HTTP_CODE)"
    echo "Response: $RESPONSE_BODY"
fi

echo ""

# Check main page
echo "🏠 Testing main page..."
MAIN_RESPONSE=$(curl -s -w "%{http_code}" "$RAILWAY_URL/")
MAIN_HTTP_CODE=${MAIN_RESPONSE: -3}

if [ "$MAIN_HTTP_CODE" = "200" ]; then
    echo "✅ Main page accessible!"
else
    echo "❌ Main page failed (HTTP $MAIN_HTTP_CODE)"
fi

echo ""

# Check API auth endpoint (should return method not allowed or similar)
echo "🔐 Testing API structure..."
API_RESPONSE=$(curl -s -w "%{http_code}" "$RAILWAY_URL/api/auth")
API_HTTP_CODE=${API_RESPONSE: -3}

if [ "$API_HTTP_CODE" = "404" ] || [ "$API_HTTP_CODE" = "405" ] || [ "$API_HTTP_CODE" = "200" ]; then
    echo "✅ API structure accessible!"
else
    echo "❌ API structure failed (HTTP $API_HTTP_CODE)"
fi

echo ""
echo "🎬 GUIONIX deployment check complete!"
echo ""
echo "Next steps:"
echo "1. Verify all environment variables are set in Railway"
echo "2. Run database migrations: railway run npx prisma migrate deploy"
echo "3. Test authentication and studio features"
echo "4. Monitor logs for any issues"

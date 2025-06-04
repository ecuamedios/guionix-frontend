#!/bin/bash

echo "🚀 Probando conectividad con GUIONIX.COM..."
echo "============================================="

# URLs principales para probar
urls=(
    "https://guionix.com/"
    "https://guionix.com/login"
    "https://guionix.com/api/health"
    "https://guionix.com/projects"
)

echo "📡 Verificando conectividad de dominio..."
for url in "${urls[@]}"; do
    echo -n "Testing $url... "
    status_code=$(curl -s -o /dev/null -w "%{http_code}" "$url" --max-time 10)
    
    if [ "$status_code" = "200" ]; then
        echo "✅ OK ($status_code)"
    elif [ "$status_code" = "302" ] || [ "$status_code" = "301" ]; then
        echo "🔄 Redirect ($status_code)"
    elif [ "$status_code" = "000" ]; then
        echo "❌ No response (timeout/connection error)"
    else
        echo "⚠️  Status: $status_code"
    fi
done

echo ""
echo "🔐 Credenciales de prueba actualizadas:"
echo "============================================="
echo "📧 Email: admin@guionix.com"
echo "🔑 Password: Guionix2025!"
echo "🎭 Role: DIRECTOR"
echo ""

echo "🔧 Verificando API Health Check..."
echo "============================================="
health_response=$(curl -s "https://guionix.com/api/health" --max-time 10)
if [ $? -eq 0 ]; then
    echo "✅ Health check response:"
    echo "$health_response" | jq . 2>/dev/null || echo "$health_response"
else
    echo "❌ Health check failed"
fi

echo ""
echo "📋 Instrucciones de prueba:"
echo "============================================="
echo "1. Visita: https://guionix.com/login"
echo "2. Usa las credenciales:"
echo "   - Email: admin@guionix.com"
echo "   - Password: Guionix2025!"
echo "3. Deberías ser redirigido a: https://guionix.com/projects"
echo ""
echo "🎬 Para probar la creación de guiones:"
echo "   - Ve a: https://guionix.com/studio?mode=new"
echo "============================================="

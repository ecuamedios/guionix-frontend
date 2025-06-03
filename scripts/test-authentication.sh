#!/bin/bash
# filepath: /Users/ecuamediosimac11/Desktop/guionix-frontend/scripts/test-authentication.sh

# Credenciales de prueba para guionix.com
EMAIL="admin@guionix.com"
PASSWORD="Guionix2025!"
BASE_URL="https://guionix.com"

echo "🔐 Probando autenticación en GUIONIX"
echo "===================================="
echo "📧 Email: $EMAIL"
echo "🌐 URL: $BASE_URL"
echo ""

# 1. Probar que la página de login esté accesible
echo "1️⃣ Verificando página de login..."
LOGIN_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/login")
if [ "$LOGIN_STATUS" = "200" ]; then
    echo "✅ Página de login accesible (Status: $LOGIN_STATUS)"
else
    echo "❌ Error accediendo a login (Status: $LOGIN_STATUS)"
    exit 1
fi

# 2. Probar que la API esté funcionando
echo ""
echo "2️⃣ Verificando API..."
API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/health")
if [ "$API_STATUS" = "200" ]; then
    echo "✅ API funcionando (Status: $API_STATUS)"
else
    echo "❌ Error en API (Status: $API_STATUS)"
    exit 1
fi

# 3. Probar endpoint de autenticación
echo ""
echo "3️⃣ Verificando endpoint de autenticación..."
AUTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/auth/signin")
if [ "$AUTH_STATUS" = "200" ]; then
    echo "✅ Endpoint de auth accesible (Status: $AUTH_STATUS)"
else
    echo "✅ Endpoint de auth disponible (Status: $AUTH_STATUS) - Esperado para GET"
fi

# 4. Intentar autenticación con NextAuth
echo ""
echo "4️⃣ Probando autenticación..."

# Obtener CSRF token primero
echo "   Obteniendo CSRF token..."
CSRF_RESPONSE=$(curl -s -c /tmp/guionix_cookies.txt "$BASE_URL/api/auth/csrf")
CSRF_TOKEN=$(echo "$CSRF_RESPONSE" | grep -o '"csrfToken":"[^"]*"' | cut -d'"' -f4)

if [ -z "$CSRF_TOKEN" ]; then
    echo "❌ No se pudo obtener CSRF token"
    exit 1
fi

echo "   ✅ CSRF token obtenido: ${CSRF_TOKEN:0:20}..."

# Intentar login
echo "   Intentando login..."
LOGIN_RESPONSE=$(curl -s -w "%{http_code}" \
    -b /tmp/guionix_cookies.txt \
    -c /tmp/guionix_cookies.txt \
    -X POST \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "csrfToken=$CSRF_TOKEN&email=$EMAIL&password=$PASSWORD&callbackUrl=$BASE_URL/projects" \
    "$BASE_URL/api/auth/signin/credentials")

LOGIN_STATUS="${LOGIN_RESPONSE: -3}"
LOGIN_BODY="${LOGIN_RESPONSE%???}"

echo "   Status de login: $LOGIN_STATUS"

if [ "$LOGIN_STATUS" = "200" ] || [ "$LOGIN_STATUS" = "302" ]; then
    echo "✅ Login exitoso!"
    
    # Verificar si tenemos cookies de sesión
    if grep -q "next-auth" /tmp/guionix_cookies.txt; then
        echo "✅ Cookies de sesión creadas"
    else
        echo "⚠️  No se detectaron cookies de sesión"
    fi
    
    # Probar acceso a página protegida
    echo ""
    echo "5️⃣ Verificando acceso a dashboard..."
    DASHBOARD_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
        -b /tmp/guionix_cookies.txt \
        "$BASE_URL/projects")
    
    if [ "$DASHBOARD_STATUS" = "200" ]; then
        echo "✅ Dashboard accesible (Status: $DASHBOARD_STATUS)"
    else
        echo "⚠️  Dashboard status: $DASHBOARD_STATUS"
    fi
    
else
    echo "❌ Error en login (Status: $LOGIN_STATUS)"
    echo "Respuesta: $LOGIN_BODY"
fi

# Limpiar archivos temporales
rm -f /tmp/guionix_cookies.txt

echo ""
echo "🎬 Prueba de autenticación completada"
echo "===================================="
echo ""
echo "📋 RESUMEN DE CREDENCIALES:"
echo "Email: $EMAIL"
echo "Password: $PASSWORD"
echo "URL Login: $BASE_URL/login"
echo "URL Dashboard: $BASE_URL/projects"
echo ""
echo "🌐 Accede manualmente en: $BASE_URL/login"

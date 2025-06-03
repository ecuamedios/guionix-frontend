// Direct test of NextAuth credentials provider

async function testNextAuthDirect() {
  console.log('🧪 Testing NextAuth credentials directly...');
  
  try {
    // First, get CSRF token
    const csrfResponse = await fetch('http://localhost:3002/api/auth/csrf');
    const csrfData = await csrfResponse.json();
    console.log('🔐 CSRF Token:', csrfData.csrfToken);

    // Test credentials submission using the exact format NextAuth expects
    const response = await fetch('http://localhost:3002/api/auth/callback/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email: 'test@guionix.com',
        password: 'password123',
        csrfToken: csrfData.csrfToken,
        callbackUrl: 'http://localhost:3002/projects',
      })
    });

    console.log('📋 Response status:', response.status);
    console.log('📋 Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('📋 Response body:', responseText);

    // Also try following redirects
    if (response.status === 302 || response.status === 301) {
      const location = response.headers.get('location');
      console.log('🔄 Redirect location:', location);
    }

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

testNextAuthDirect();

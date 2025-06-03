// Test login functionality
const testLogin = async () => {
  try {
    console.log('🧪 Testing GUIONIX Login...');
    
    // Test credentials
    const credentials = {
      email: 'test@guionix.com',
      password: 'password123'
    };
    
    console.log('📧 Using credentials:', credentials.email);
    
    // Get CSRF token first
    const csrfResponse = await fetch('http://localhost:3001/api/auth/csrf');
    const { csrfToken } = await csrfResponse.json();
    console.log('🔐 CSRF Token:', csrfToken ? 'OK' : 'MISSING');
    
    // Perform login
    const loginResponse = await fetch('http://localhost:3001/api/auth/callback/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email: credentials.email,
        password: credentials.password,
        csrfToken: csrfToken,
        redirect: 'false'
      })
    });
    
    console.log('📡 Login Response Status:', loginResponse.status);
    console.log('📡 Login Response Headers:', Object.fromEntries(loginResponse.headers.entries()));
    
    // Check session after login
    const sessionResponse = await fetch('http://localhost:3001/api/auth/session', {
      credentials: 'include'
    });
    const sessionData = await sessionResponse.json();
    
    console.log('👤 Session Data:', sessionData);
    
    if (sessionData.user) {
      console.log('✅ Login successful!');
      console.log('👤 User:', sessionData.user.email);
      console.log('🎭 Role:', sessionData.user.role);
    } else {
      console.log('❌ Login failed - no session created');
    }
    
  } catch (error) {
    console.error('❌ Login test error:', error);
  }
};

// Run test if in Node.js environment
if (typeof window === 'undefined') {
  testLogin();
}

module.exports = { testLogin };

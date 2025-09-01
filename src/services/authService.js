export async function login(username, password) {
  const token = localStorage.getItem('jwt_token');

  try {
    const res = await fetch(`https://api.zonenews.io/dev/auth/login`, {
      method: "POST",
      credentials: 'include', // Required for cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }), // Use parameters instead of hardcoded
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || "Login failed");
    }

    // Extract token from response (if using headers) or verify cookies
    const data = await res.json();
    
    // If using header-based token (alternative approach)
    if (data.access_token) {
      localStorage.setItem('jwt_token', data.access_token);
    }
    
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
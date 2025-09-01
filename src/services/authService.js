export async function login(username, password) {
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
    //console.log("Login response:", data);

    if (data.data.access_token) {
      localStorage.setItem('jwt_token', data.data.access_token);
    }
    
    return data.data;

  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
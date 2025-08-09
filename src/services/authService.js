// services/authService.js

export async function login(username, password) {
  const res = await fetch(`https://api.zonenews.io/dev/auth/login`, {
    method: "POST",
    credentials: 'include',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ "username":"admin", "password":"admin" }),
  });

  const data = await res.json();
  if (data.code !== 200) {
    throw new Error(data.msg || "Login failed");
  }
}

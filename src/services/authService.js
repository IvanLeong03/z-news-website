// services/authService.js
export async function login(username, password) {
  const res = await fetch("/dev/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // 💥 this includes cookies!
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (data.code !== 200) {
    throw new Error(data.msg || "Login failed");
  }

  return true; // cookies are now set!
}

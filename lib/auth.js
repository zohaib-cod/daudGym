// Admin Credentials & Authentication Helper for FG & S.M Fitness Gym

const DEFAULT_ADMINS = [
  {
    username: (process.env.NEXT_PUBLIC_ADMIN_USER || "admin").toLowerCase().trim(),
    password: process.env.NEXT_PUBLIC_ADMIN_PASS || "fgsm@gym2026",
    role: "Super Admin",
    displayName: "Admin Console",
  },
  {
    username: "saqib_ali",
    password: process.env.NEXT_PUBLIC_ADMIN_PASS || "fgsm@gym2026",
    role: "Gym Owner Access",
    displayName: "Saqib & Ali",
  },
];

const AUTH_STORAGE_KEY = "fgsm_admin_auth_token";

export function authenticateAdmin(username, password) {
  const cleanUser = (username || "").toLowerCase().trim();
  const cleanPass = (password || "").trim();

  const match = DEFAULT_ADMINS.find(
    (a) => a.username === cleanUser && a.password === cleanPass
  );

  if (match) {
    const sessionData = {
      username: match.username,
      displayName: match.displayName,
      role: match.role,
      authenticatedAt: new Date().toISOString(),
    };
    return { success: true, user: sessionData };
  }

  return { success: false, error: "Invalid username or password" };
}

export function saveAdminSession(userData, remember = false) {
  if (typeof window === "undefined") return;
  const serialized = JSON.stringify(userData);
  if (remember) {
    localStorage.setItem(AUTH_STORAGE_KEY, serialized);
  } else {
    sessionStorage.setItem(AUTH_STORAGE_KEY, serialized);
  }
}

export function getAdminSession() {
  if (typeof window === "undefined") return null;
  try {
    const sessionData = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (sessionData) return JSON.parse(sessionData);

    const localData = localStorage.getItem(AUTH_STORAGE_KEY);
    if (localData) return JSON.parse(localData);
  } catch (e) {
    console.warn("Auth session parse error:", e);
  }
  return null;
}

export function clearAdminSession() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (e) {
    console.warn("Logout error:", e);
  }
}


const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://daud-gym-b.vercel.app/api";

export async function registerMember(data) {
  const res = await fetch(`${API_BASE}/members/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || "Failed to register member");
  }
  return json;
}

export async function fetchMembers({ search = "", status = "" } = {}) {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (status && status !== "All") params.append("status", status);

  const res = await fetch(`${API_BASE}/members?${params.toString()}`);
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || "Failed to fetch members");
  }
  return json;
}

export async function fetchStats() {
  const res = await fetch(`${API_BASE}/members/stats`);
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || "Failed to fetch stats");
  }
  return json.stats;
}

export async function updateMemberStatus(id, status) {
  const res = await fetch(`${API_BASE}/members/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || "Failed to update status");
  }
  return json;
}

export async function deleteMember(id) {
  const res = await fetch(`${API_BASE}/members/${id}`, {
    method: "DELETE",
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || "Failed to delete member");
  }
  return json;
}


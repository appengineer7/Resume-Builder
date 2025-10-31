const API = import.meta.env.VITE_API_URL || "http://localhost:6000/api";

const handle = async (res) => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || res.statusText);
  }
  return res.json();
};

export const createCheckoutSession = async (amount = 19900) => {
  const res = await fetch(`${API}/payments/create-checkout-session`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
  return handle(res);
};

export const verifySession = async (sessionId) => {
  const res = await fetch(`${API}/payments/verify-session?session_id=${sessionId}`, {
    credentials: "include",
  });
  return handle(res);
};

export const getCurrentUser = async () => {
  const res = await fetch(`${API}/auth/current-user`, {
    credentials: "include",
  });
  return handle(res);
};

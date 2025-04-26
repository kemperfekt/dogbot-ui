// src/api/diagnoseApi.js

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Startet eine neue Diagnose-Session
export const startDiagnosis = async (symptomInput) => {
  const res = await fetch(`${BASE_URL}/diagnose_start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symptom_input: symptomInput }),
  });
  return await res.json();
};

// Setzt eine bestehende Diagnose-Session fort
export const continueDiagnosis = async (sessionId, answer) => {
  const res = await fetch(`${BASE_URL}/diagnose_continue`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, answer }),
  });
  return await res.json();
};

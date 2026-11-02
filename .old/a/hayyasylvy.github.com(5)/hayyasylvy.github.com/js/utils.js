// Funções auxiliares: normalização de texto e persistência em localStorage
const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const letterOf = (t) => { const c = norm(t).trim().charAt(0).toUpperCase(); return /[A-Z]/.test(c) ? c : "#"; };
const slug = (t) => norm(t).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "verbete";

function load(key, fallback) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; } }
function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }

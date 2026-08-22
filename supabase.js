import { createClient } from "@supabase/supabase-js";

function resolveSupabaseUrl(raw) {
  const value = (raw || "").trim();
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value.replace(/\/$/, "");
  if (/^[a-z0-9]+$/i.test(value)) return `https://${value}.supabase.co`;
  return value;
}

const supabaseUrl = resolveSupabaseUrl(import.meta.env.VITE_SUPABASE_URL);
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabaseConfigured = Boolean(
  supabaseUrl &&
    supabasePublishableKey &&
    /^https:\/\//i.test(supabaseUrl)
);

export const supabase = createClient(
  supabaseConfigured ? supabaseUrl : "https://unavailable.supabase.co",
  supabaseConfigured ? supabasePublishableKey : "unavailable"
);

export function authRedirectTo() {
  const { hostname } = window.location;
  if (hostname === "127.0.0.1" || hostname === "localhost") {
    return "http://127.0.0.1:5173";
  }
  return window.location.origin;
}

export function appData() {
  return supabase.schema("app_data");
}

import type { IpInfo } from "./ip-types";

function countryCodeToFlag(code: string): string {
  if (!code || code.length !== 2) return "";
  const offset = 127397;
  return String.fromCodePoint(
    ...code
      .toUpperCase()
      .split("")
      .map((c) => c.charCodeAt(0) + offset)
  );
}

export { countryCodeToFlag };

// Cache
const CACHE_KEY = "ip-looker-cache";

function getCached(ip: string): IpInfo | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cache = JSON.parse(raw) as Record<string, { data: IpInfo; ts: number }>;
    const entry = cache[ip];
    if (entry && Date.now() - entry.ts < 5 * 60 * 1000) return entry.data;
  } catch {}
  return null;
}

function setCache(ip: string, data: IpInfo) {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    const cache = raw ? JSON.parse(raw) : {};
    cache[ip] = { data, ts: Date.now() };
    // Keep max 20 entries
    const keys = Object.keys(cache);
    if (keys.length > 20) {
      const oldest = keys.sort((a, b) => cache[a].ts - cache[b].ts)[0];
      delete cache[oldest];
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {}
}

// Normalizers
function normalizeIpapi(data: any): IpInfo {
  return {
    ip: data.ip || "",
    city: data.city || "",
    region: data.region || "",
    country: data.country_name || "",
    countryCode: data.country_code || "",
    postalCode: data.postal || "",
    latitude: data.latitude || 0,
    longitude: data.longitude || 0,
    timezone: data.timezone || "",
    currency: data.currency_name ? `${data.currency_name} (${data.currency || ""})` : data.currency || "",
    isp: data.org || "",
    org: data.org || "",
    asn: data.asn || "",
    continent: data.continent_code || "",
    languages: data.languages || "",
    connectionType: data.connection_type || "",
    source: "ipapi.co",
  };
}

function normalizeIpwhois(data: any): IpInfo {
  return {
    ip: data.ip || "",
    city: data.city || "",
    region: data.region || "",
    country: data.country || "",
    countryCode: data.country_code || "",
    postalCode: data.postal || "",
    latitude: data.latitude || 0,
    longitude: data.longitude || 0,
    timezone: data.timezone?.utc || "",
    currency: data.currency?.name ? `${data.currency.name} (${data.currency.code || ""})` : "",
    isp: data.connection?.isp || "",
    org: data.connection?.org || "",
    asn: data.connection?.asn ? `${data.connection.asn}` : "",
    continent: data.continent || "",
    languages: "",
    connectionType: data.connection?.type || "",
    source: "ipwho.is",
  };
}

function normalizeIpinfo(data: any): IpInfo {
  const [lat, lon] = (data.loc || "0,0").split(",").map(Number);
  return {
    ip: data.ip || "",
    city: data.city || "",
    region: data.region || "",
    country: data.country || "",
    countryCode: data.country || "",
    postalCode: data.postal || "",
    latitude: lat,
    longitude: lon,
    timezone: data.timezone || "",
    currency: "",
    isp: data.org || "",
    org: data.org || "",
    asn: "",
    continent: "",
    languages: "",
    connectionType: "",
    source: "ipinfo.io",
  };
}

interface ApiSource {
  name: string;
  url: (ip: string) => string;
  normalize: (data: any) => IpInfo;
  isError: (data: any) => boolean;
}

const sources: ApiSource[] = [
  {
    name: "ipapi.co",
    url: (ip) => `https://ipapi.co/${ip}/json/`,
    normalize: normalizeIpapi,
    isError: (data) => data.error === true,
  },
  {
    name: "ipwho.is",
    url: (ip) => `https://ipwho.is/${ip}`,
    normalize: normalizeIpwhois,
    isError: (data) => data.success === false,
  },
  {
    name: "ipinfo.io",
    url: (ip) => `https://ipinfo.io/${ip}/json`,
    normalize: normalizeIpinfo,
    isError: (data) => !!data.error,
  },
];

export async function fetchPublicIp(): Promise<string> {
  const res = await fetch("https://api.ipify.org?format=json");
  if (!res.ok) throw new Error("Failed to detect IP");
  const data = await res.json();
  return data.ip;
}

export async function lookupIp(
  ip: string,
  onFallback?: (sourceName: string) => void
): Promise<IpInfo> {
  const cached = getCached(ip);
  if (cached) return cached;

  for (let i = 0; i < sources.length; i++) {
    const src = sources[i];
    try {
      if (i > 0 && onFallback) {
        onFallback(src.name);
      }
      const res = await fetch(src.url(ip));
      if (res.status === 429 || !res.ok) continue;
      const data = await res.json();
      if (src.isError(data)) continue;
      const normalized = src.normalize(data);
      setCache(ip, normalized);
      return normalized;
    } catch {
      continue;
    }
  }

  throw new Error("All IP lookup services failed. Please try again later.");
}

// Recent searches
const RECENT_KEY = "ip-looker-recent";
const MAX_RECENT = 8;

export function getRecentSearches(): { ip: string; city: string; country: string; countryCode: string; timestamp: number }[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(info: IpInfo) {
  try {
    const recent = getRecentSearches().filter((r) => r.ip !== info.ip);
    recent.unshift({
      ip: info.ip,
      city: info.city,
      country: info.country,
      countryCode: info.countryCode,
      timestamp: Date.now(),
    });
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
  } catch {}
}



# IP Looker — Implementation Plan

## Overview
A production-ready IP lookup tool with multi-API fallback, interactive Leaflet map, dark/light mode, and polished SaaS-style UI. Built with React + Vite + Tailwind CSS.

---

## 1. Layout & Navigation
- **Header** with "IP Looker" branding and dark/light mode toggle
- **Tab system**: "IP Info" (active) and "Speed Test" (placeholder tab ready for future LibreSpeed integration)
- Responsive layout — works on mobile and desktop

## 2. Auto IP Detection
- On load, fetch user's public IP via `https://api.ipify.org?format=json`
- Immediately look up details for detected IP
- Show skeleton loaders during initial fetch

## 3. Manual IP Search
- Search input with IPv4 and IPv6 validation (regex-based)
- Debounced input to avoid excessive API calls
- Clear error messages: "Invalid IP address"
- Search button triggers lookup

## 4. Multi-API Fallback System
- **Primary**: `ipapi.co/{ip}/json/`
- **Fallback 1**: `ipwho.is/{ip}`
- **Fallback 2**: `ipinfo.io/{ip}/json`
- Auto-switch on failure or rate limit (429 status)
- Normalize all responses into a unified format (location, ISP, ASN, timezone, currency, coordinates, country code)
- Show which source provided the data (e.g., "Source: ipapi.co")
- Toast notifications: "Trying backup source..." / "All services failed"

## 5. Results Grid
Four cards in a responsive grid:
- **Location**: Country (with flag emoji), region, city, postal code, timezone, currency
- **Network**: ISP, ASN, organization
- **Map**: Interactive Leaflet map with marker at lat/lon, smooth zoom, responsive container
- **Extra Info**: Continent, languages, connection type if available

## 6. Interactive Map (Leaflet)
- Fully working Leaflet map using `react-leaflet`
- Marker at coordinates from API response
- Smooth fly-to animation on new lookups
- Only renders when valid coordinates exist
- Responsive sizing

## 7. Dark/Light Mode
- Toggle in header using `next-themes` (already installed)
- All components respect the theme
- Smooth transitions between modes

## 8. Extra Features
- **Copy IP** button (clipboard API with toast confirmation)
- **Country flag** emoji derived from country code
- **Recent searches** stored in localStorage (last 5-10 lookups)
- **JSON toggle view** to see raw normalized API response
- **Cache** last result in localStorage to avoid redundant calls

## 9. Error Handling
- Invalid IP input → inline validation message
- API failure → automatic fallback with user notification
- All APIs fail → clear error state with retry button
- Network offline → appropriate messaging
- No broken/empty UI states

## 10. Performance
- Debounced search input (~500ms)
- localStorage caching of recent lookups
- Skeleton loaders during fetches
- Minimal re-renders

## 11. SEO
- `react-helmet-async` for title, meta description, and OpenGraph tags
- Meaningful page title: "IP Looker — IP Address Lookup Tool"

## 12. Speed Test Tab
- Tab UI is functional and switchable
- Content shows a "Coming Soon" placeholder ready for future LibreSpeed integration


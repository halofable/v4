export interface IpInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
  currency: string;
  isp: string;
  org: string;
  asn: string;
  continent: string;
  languages: string;
  connectionType: string;
  source: string;
}

export interface RecentSearch {
  ip: string;
  city: string;
  country: string;
  countryCode: string;
  timestamp: number;
}

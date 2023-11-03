import Config from "../services/config";
export function getUrlPath(url: string): string {
  return url.replace(Config.apiUrl, "");
}

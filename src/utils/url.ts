import * as qs from "query-string";
import { IKeyValues } from "models/base";

export function formatURL(url: string, params?: IKeyValues | null) {
  if (!params) {
    return url;
  }

  const hashtagIndex = url.indexOf("#");
  const hash = hashtagIndex > -1 ? url.slice(hashtagIndex) : "";
  const joiner = url.indexOf("?") > -1 ? "&" : "?";
  return `${hash ? url.slice(0, hashtagIndex) : url}${joiner}${qs.stringify(
    params
  )}${hash}`;
}

export function parseSearch(search: string) {
  return qs.parse(search);
}

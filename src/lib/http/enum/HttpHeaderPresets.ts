import {ContentType} from './ContentType';

export const HttpHeaderPresets = {
  CONTENT_TYPE_JSON: {'Content-Type': ContentType.APPLICATION_JSON},
} as const;

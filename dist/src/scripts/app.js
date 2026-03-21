import {
  CONTENT_MAP,
  TABS,
  AGE_PROFILES,
  SHIFTS,
  DIRECTIONS,
  TAB_TO_SECTION,
  AGE_SLIDER_POINTS
} from "./data/content-map.js";
import { ICON_MAP } from "./data/icon-map.js";
import { FAQ_DATA } from "./data/faq-data.js";
import { track } from "./features/analytics.js";
import { createAuditRuntime } from "./features/audit.js";

window.AC_DATA = {
  CONTENT_MAP,
  TABS,
  AGE_PROFILES,
  SHIFTS,
  DIRECTIONS,
  TAB_TO_SECTION,
  AGE_SLIDER_POINTS,
  ICON_MAP,
  FAQ_DATA
};

window.AC_FEATURES = {
  track,
  auditRuntime: createAuditRuntime()
};

import("./main.js");

import {
  getCLS,
  getFID,
  getFCP,
  getLCP,
  getTTFB,
  onCLS,
  onFID,
  onFCP,
  onLCP,
  onTTFB,
} from "web-vitals";
import * as Sentry from "@sentry/react";

export function reportWebVitals() {
  onCLS((metric) => {
    Sentry.addBreadcrumb({
      category: "web-vital",
      message: `CLS: ${metric.value}`,
      level: "info",
      data: metric,
    });

    if (process.env.NODE_ENV === "development") {
      console.log("CLS:", metric);
    }
  });

  onFID((metric) => {
    Sentry.addBreadcrumb({
      category: "web-vital",
      message: `FID: ${metric.value}ms`,
      level: "info",
      data: metric,
    });

    if (process.env.NODE_ENV === "development") {
      console.log("FID:", metric);
    }
  });

  onFCP((metric) => {
    Sentry.addBreadcrumb({
      category: "web-vital",
      message: `FCP: ${metric.value}ms`,
      level: "info",
      data: metric,
    });

    if (process.env.NODE_ENV === "development") {
      console.log("FCP:", metric);
    }
  });

  onLCP((metric) => {
    Sentry.addBreadcrumb({
      category: "web-vital",
      message: `LCP: ${metric.value}ms`,
      level: "info",
      data: metric,
    });

    if (process.env.NODE_ENV === "development") {
      console.log("LCP:", metric);
    }
  });

  onTTFB((metric) => {
    Sentry.addBreadcrumb({
      category: "web-vital",
      message: `TTFB: ${metric.value}ms`,
      level: "info",
      data: metric,
    });

    if (process.env.NODE_ENV === "development") {
      console.log("TTFB:", metric);
    }
  });
}

export async function getWebVitals() {
  const [cls, fid, fcp, lcp, ttfb] = await Promise.all([
    getCLS(),
    getFID(),
    getFCP(),
    getLCP(),
    getTTFB(),
  ]);

  return {
    cls: cls?.value || 0,
    fid: fid?.value || 0,
    fcp: fcp?.value || 0,
    lcp: lcp?.value || 0,
    ttfb: ttfb?.value || 0,
  };
}

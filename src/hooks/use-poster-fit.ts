"use client";

import { useCallback, useEffect, useState } from "react";
import type { RefObject } from "react";

export function usePosterFit(
  contentRef: RefObject<HTMLElement | null>,
  targetWidth: number,
  targetHeight: number
) {
  const [scale, setScale] = useState(1);

  const updateFit = useCallback(() => {
    const element = contentRef.current;

    if (!element) return;

    const width = element.scrollWidth;
    const height = element.scrollHeight;

    if (!width || !height) return;

    const horizontalScale = targetWidth / width;
    const verticalScale = targetHeight / height;

    const calculatedScale = Math.min(
      1,
      horizontalScale,
      verticalScale
    );

    if (
      Number.isFinite(calculatedScale) &&
      calculatedScale > 0
    ) {
      setScale(Number(calculatedScale.toFixed(4)));
    }
  }, [contentRef, targetWidth, targetHeight]);

  useEffect(() => {
    let frame1 = 0;
    let frame2 = 0;

    const refresh = () => {
      frame1 = requestAnimationFrame(() => {
        frame2 = requestAnimationFrame(() => {
          updateFit();
        });
      });
    };

    const element = contentRef.current;

    if (!element) return;

    const resizeObserver = new ResizeObserver(() => {
      updateFit();
    });

    resizeObserver.observe(element);

    const images = Array.from(
      element.querySelectorAll("img")
    );

    const waitForImages = async () => {
      await Promise.all(
        images.map(async (image) => {
          if (image.complete) return;

          try {
            await image.decode();
          } catch {
            // Ignore image decoding errors.
          }
        })
      );

      refresh();
    };

    const waitForFonts = async () => {
      if (document.fonts?.ready) {
        try {
          await document.fonts.ready;
        } catch {
          // Ignore font loading errors.
        }
      }

      refresh();
    };

    refresh();
    waitForImages();
    waitForFonts();

    const timer = window.setTimeout(() => {
      updateFit();
    }, 250);

    return () => {
      resizeObserver.disconnect();

      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);

      window.clearTimeout(timer);
    };
  }, [contentRef, updateFit]);

  return scale;
}
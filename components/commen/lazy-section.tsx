"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  /** Section aane se pehle itni jagah reserve rahegi (layout jump se bachne ke liye) */
  minHeight?: number;
  /** Screen se itna pehle hi load shuru ho jaye */
  rootMargin?: string;
}

export default function LazySection({
  children,
  minHeight = 400,
  rootMargin = "300px",
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Purane browsers ke liye fallback
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect(); // ek baar load ho gaya to dobara observe nahi
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}

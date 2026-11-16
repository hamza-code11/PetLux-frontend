"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { buildSearchUrl } from "@/types/search";
import { SearchIcon } from "../navbar/icons";
import styles from "./search-bar.module.css";

interface SearchBarProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchBar({ open, onClose }: SearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState("");

  // Khulte hi input par focus
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => inputRef.current?.focus(), 200);
    return () => clearTimeout(timer);
  }, [open]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.trim()) return;

    onClose();
    router.push(buildSearchUrl(query));
  };

  return (
    <div
      id="search-panel"
      className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
    >
      <div className={styles.clip}>
        <div className={styles.inner}>
          <form role="search" className={styles.form} onSubmit={handleSubmit}>
            <SearchIcon />

            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for food, toys, accessories..."
              aria-label="Search products"
              autoComplete="off"
              tabIndex={open ? 0 : -1}
            />

            <button
              type="submit"
              className={styles.submit}
              tabIndex={open ? 0 : -1}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


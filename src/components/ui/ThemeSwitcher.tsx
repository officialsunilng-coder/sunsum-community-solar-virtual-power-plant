"use client";

import { useEffect, useRef, type SVGProps } from "react";
import styles from "./ThemeSwitcher.module.css";

export type ThemePreference = "light" | "dark" | "system";

const STORAGE_KEY = "sunsum-theme";

const THEME_OPTIONS: readonly {
  readonly id: ThemePreference;
  readonly label: string;
}[] = [
  { id: "light", label: "Use light theme" },
  { id: "dark", label: "Use dark theme" },
  { id: "system", label: "Use system theme" },
];

function isThemePreference(value: string | null): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

function applyTheme(theme: ThemePreference) {
  document.documentElement.dataset.theme = theme;
}

function ThemeIcon({
  theme,
  ...props
}: SVGProps<SVGSVGElement> & { readonly theme: ThemePreference }) {
  if (theme === "light") {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        viewBox="0 0 16 16"
        {...props}
      >
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M8 1.5v1.25M8 13.25v1.25M1.5 8h1.25M13.25 8h1.25M3.4 3.4l.9.9M11.7 11.7l.9.9M12.6 3.4l-.9.9M4.3 11.7l-.9.9"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.4"
        />
      </svg>
    );
  }

  if (theme === "dark") {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        viewBox="0 0 16 16"
        {...props}
      >
        <path
          d="M12.8 10.4A5.75 5.75 0 0 1 5.6 3.2a5.75 5.75 0 1 0 7.2 7.2Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      viewBox="0 0 16 16"
      {...props}
    >
      <rect
        height="8.5"
        rx="1.25"
        stroke="currentColor"
        strokeWidth="1.4"
        width="12"
        x="2"
        y="2.25"
      />
      <path
        d="M6 13.75h4M8 10.75v3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function ThemeSwitcher() {
  const switcherRef = useRef<HTMLDivElement>(null);

  const reflectTheme = (theme: ThemePreference) => {
    applyTheme(theme);
    switcherRef.current
      ?.querySelectorAll<HTMLButtonElement>("[data-theme-option]")
      .forEach((button) => {
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.themeOption === theme),
        );
      });
  };

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial = isThemePreference(stored) ? stored : "system";
    reflectTheme(initial);
  }, []);

  const selectTheme = (theme: ThemePreference) => {
    reflectTheme(theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  };

  return (
    <div
      aria-label="Color theme"
      className={styles.switcher}
      ref={switcherRef}
      role="group"
    >
      {THEME_OPTIONS.map((option) => (
        <button
          aria-label={option.label}
          aria-pressed={option.id === "system"}
          className={styles.option}
          data-theme-option={option.id}
          key={option.id}
          onClick={() => selectTheme(option.id)}
          title={option.label}
          type="button"
        >
          <ThemeIcon className={styles.icon} theme={option.id} />
        </button>
      ))}
    </div>
  );
}

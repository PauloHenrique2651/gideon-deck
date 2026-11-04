// Arrow icon. Text arrows (↗ →) fall outside the bundled font and phones draw them as emoji.
const PATHS = {
  "up-right": "M5 11 11 5M6 5h5v5",
  right: "M3 8h10M9 4l4 4-4 4",
  down: "M8 3v10M4 9l4 4 4-4",
};

export default function Arrow({ dir = "up-right", className = "arr" }) {
  return (
    <svg className={className} width="1em" height="1em" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d={PATHS[dir]} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

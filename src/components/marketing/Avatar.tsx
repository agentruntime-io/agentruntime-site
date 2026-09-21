const PALETTE = ["#ff5a36", "#2f6f5e", "#3f5b8c", "#8c5a3f", "#5a3f8c"];

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function colorFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return PALETTE[hash % PALETTE.length];
}

type AvatarProps = {
  name: string;
  className?: string;
};

/** A stable initials avatar for a named human step in the run — no stock photography, no illustration. */
export function Avatar({ name, className }: AvatarProps) {
  return (
    <span
      className={["marketing-avatar", className].filter(Boolean).join(" ")}
      style={{ background: colorFor(name) }}
      title={name}
    >
      {initialsFor(name)}
    </span>
  );
}

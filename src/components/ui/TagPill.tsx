import "./TagPill.css";

export function TagPill({ children }: { children: string }) {
  return <span className="tag-pill mono">{children}</span>;
}

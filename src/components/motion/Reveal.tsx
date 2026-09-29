type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Staggers siblings: 0.1 starts the fade 10% later in the element's entry. */
  delay?: number;
  as?: "div" | "section" | "li";
};

/**
 * Fades and rises content in as it scrolls into view, using CSS scroll-driven
 * animations (see .reveal in globals.css). No JavaScript: browsers without
 * support, and visitors with JS off or reduced motion, simply see the content.
 */
export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: RevealProps) {
  return (
    <Tag
      className={`reveal ${className}`}
      style={
        delay
          ? ({ "--reveal-offset": `${Math.round(delay * 100)}%` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </Tag>
  );
}

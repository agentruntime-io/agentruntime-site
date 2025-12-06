import { FC, ReactNode } from "react";

interface PageSectionProps {
  id?: string;
  variant?: "default" | "muted";
  className?: string;
  children: ReactNode;
}

export const PageSection: FC<PageSectionProps> = ({
  id,
  variant = "default",
  className,
  children,
}) => {
  const classes = ["section"];
  if (variant === "muted") {
    classes.push("muted");
  }
  if (className) {
    classes.push(className);
  }

  return (
    <section id={id} className={classes.join(" ")}>
      <div className="shell">{children}</div>
    </section>
  );
};


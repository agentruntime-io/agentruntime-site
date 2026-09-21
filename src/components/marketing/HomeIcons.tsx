type IconProps = {
  className?: string;
};

const shared = {
  width: 22,
  height: 22,
  viewBox: "0 0 22 22",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function PersonIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <circle cx="11" cy="6.6" r="3.4" />
      <path d="M4.4 19c0-3.9 2.9-6.6 6.6-6.6s6.6 2.7 6.6 6.6" />
    </svg>
  );
}

export function AgentIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <rect x="5" y="6" width="12" height="10" rx="3" />
      <path d="M11 6V3.2" />
      <circle cx="11" cy="2.1" r="1" fill="currentColor" stroke="none" />
      <path d="M8.4 11h.01M13.6 11h.01" strokeWidth="2" />
      <path d="M3.2 10.5h1.8M17 10.5h1.8" />
    </svg>
  );
}

export function ToolIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="M13.9 4.4a3.6 3.6 0 0 0-4.66 4.4L4 14.1v3.5h3.5l5.3-5.24a3.6 3.6 0 0 0 4.4-4.66l-2.5 2.5-2-2z" />
    </svg>
  );
}

export function StateIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="M11 3.6a7.4 7.4 0 1 0 7.4 7.4" />
      <path d="M11 3.6 14 6.4" />
      <path d="M11 3.6 8.6 6.1" />
      <circle cx="11" cy="11" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function OwnershipIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="M11 3.4 17.6 6v5.2c0 4-2.8 6.4-6.6 7.4-3.8-1-6.6-3.4-6.6-7.4V6z" />
      <path d="M8.4 11.2 10.2 13l3.4-3.6" />
    </svg>
  );
}

export function ExceptionIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="M11 3.6 19 17.4H3z" />
      <path d="M11 8.6v4" />
      <circle cx="11" cy="14.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function HistoryIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <circle cx="10.6" cy="11" r="7" />
      <path d="M10.6 6.8V11l3 2" />
    </svg>
  );
}

export function IsolatedIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <circle cx="11" cy="11" r="6.4" />
      <path d="M11 4.6v2M11 15.4v2M4.6 11h2M15.4 11h2" opacity="0.55" />
    </svg>
  );
}

export function BreakIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="M4 11h4.2l1.6-3.4L12 15l1.7-4H18" />
    </svg>
  );
}

export function ReleaseIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="M4.6 15.4c1-4.4 4-7.8 6.4-9.8 2.4 2 5.4 5.4 6.4 9.8" />
      <path d="M8 15.4h6M6.4 18.2h9.2" />
    </svg>
  );
}

export function BuildIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="M4 15.6 11 4.6l7 11z" />
      <path d="M7.9 15.6 11 10.2l3.1 5.4" />
    </svg>
  );
}

export function RunIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="M6.4 4.6v12.8L17 11 6.4 4.6z" />
    </svg>
  );
}

export function OperateIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <rect x="4" y="4.6" width="14" height="12.8" rx="2.4" />
      <path d="M4 9.4h14" />
      <path d="M7.4 12.6h4" />
    </svg>
  );
}

export function GovernIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="M11 3.4 17.6 6v5.2c0 4-2.8 6.4-6.6 7.4-3.8-1-6.6-3.4-6.6-7.4V6z" />
    </svg>
  );
}

export function EngineeringIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="M7 5 4 11l3 6M15 5l3 6-3 6" />
      <path d="M12.6 4.6 9.4 17.4" />
    </svg>
  );
}

export function OperationsIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="M11 4.6v3.2M11 14.2v3.2M4.6 11h3.2M14.2 11h3.2" />
      <circle cx="11" cy="11" r="3.4" />
    </svg>
  );
}

export function SupportIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="M4.6 12.2v-1a6.4 6.4 0 1 1 12.8 0v1" />
      <rect x="3.4" y="12.2" width="3.2" height="4.4" rx="1" />
      <rect x="15.4" y="12.2" width="3.2" height="4.4" rx="1" />
      <path d="M16.4 16.6c0 1.7-1.6 2.4-3.4 2.4" />
    </svg>
  );
}

export function FinanceIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <path d="M11 4.4v13.2" />
      <path d="M14.8 6.8c0-1-1.4-1.6-3.2-1.6-2 0-3.6.8-3.6 2.2s1.6 1.9 3.6 2.2c2.2.3 3.6 1 3.6 2.3S13.2 13.7 11 13.7c-1.9 0-3.4-.6-3.6-1.7" />
    </svg>
  );
}

export function PartnersIcon({ className }: IconProps) {
  return (
    <svg className={className} {...shared}>
      <circle cx="7.6" cy="8" r="2.6" />
      <circle cx="14.4" cy="8" r="2.6" />
      <path d="M3.4 17.4c.4-2.8 2-4.4 4.2-4.4s3.8 1.6 4.2 4.4M10.2 17.4c.4-2.8 2-4.4 4.2-4.4s3.8 1.6 4.2 4.4" />
    </svg>
  );
}

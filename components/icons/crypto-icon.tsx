export function CryptoIcon({
  className,
  size = 24,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9.5 7V17M9.5 7H13C14.3807 7 15.5 8.11929 15.5 9.5C15.5 10.8807 14.3807 12 13 12M9.5 12H13.5C14.8807 12 16 13.1193 16 14.5C16 15.8807 14.8807 17 13.5 17H9.5M9.5 12H8M9.5 17H8M11 5.5V7M13 5.5V7M11 17V18.5M13 17V18.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
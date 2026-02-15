export function BackgroundGradient() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[463px] -translate-x-1/2 size-[1038px]"
      aria-hidden
    >
      <div
        className="size-full rounded-full opacity-50 blur-[200px]"
        style={{
          background: "radial-gradient(circle, #8F8FFF 0%, #0A0A0F 100%)",
        }}
      />
    </div>
  );
}
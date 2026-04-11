type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`rounded-xs border-2 border-zinc-950 bg-zinc-0 shadow-[-4px_4px_0_0_var(--zinc-950)] ${className}`}
    >
      {children}
    </div>
  );
}

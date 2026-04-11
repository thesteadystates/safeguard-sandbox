type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Header({ children, className = "" }: HeaderProps) {
  return (
    <div
      className={`inset-x-px flex min-h-14.25 items-center border-b-2 border-zinc-950 bg-zinc-0 px-3 py-4 text-sm font-mono uppercase tracking-normal text-zinc-950 ${className}`}
    >
      {children}
    </div>
  );
}

"use client";

export default function GhostButton({ label = "Live Project", href = "#", className = "" }: { label?: string; href?: string; className?: string }) {
  return (
    <a
      href={href}
      className={"inline-flex items-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors duration-300 " + className}
    >
      {label}
    </a>
  );
}

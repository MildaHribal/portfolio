export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800/60 py-10">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-center">
        <p className="text-xs text-zinc-600">
          © {year} Miloslav Hříbal. Crafted with Next.js &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}

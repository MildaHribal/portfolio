type Props = {
  size?: 'sm' | 'md';
  className?: string;
};

/**
 * Custom text logotype for "MONTANA CANS CZ" — purely typographic, no real Montana mark.
 * Pairs the heavy condensed display with a small monospace stamp.
 */
export function Logotype({ size = 'sm', className = '' }: Props) {
  const big = size === 'md' ? 'text-3xl md:text-4xl' : 'text-2xl';
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className={`font-display tracking-tightest leading-none ${big}`}>
        MONTANA
      </span>
      <span className="flex flex-col items-start leading-[0.95] -ml-1">
        <span className="font-display tracking-tightest text-tape text-base">
          CANS
        </span>
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ash">
          CZ ·{' '}
          <span className="text-bone">est.&nbsp;1994</span>
        </span>
      </span>
    </span>
  );
}

import { Product } from '@/lib/products';
import { asset } from '@/lib/basePath';

type Props = {
  product: Product;
  className?: string;
  /** larger padding for spray-can shots, looser for caps/markers etc. */
  variant?: 'card' | 'hero' | 'bare';
  /** load eagerly — for above-the-fold images (hero, categories). */
  eager?: boolean;
};

/**
 * Renders the product photo inside a light-bone "studio" frame.
 * Photos have white-ish backgrounds, so the bone frame blends them in.
 */
export function ProductGraphic({ product, className = '', variant = 'card', eager = false }: Props) {
  const padding =
    variant === 'hero'
      ? 'p-0'
      : variant === 'bare'
        ? 'p-0'
        : product.kind === 'cap'
          ? 'p-3 md:p-4'
          : 'p-5 md:p-7';

  const bg = variant === 'bare' ? 'bg-transparent' : 'bg-bone';

  return (
    <div className={`relative w-full h-full ${bg} ${padding} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(product.image)}
        alt={`${product.name} — ${product.line}`}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute inset-0 w-full h-full object-contain"
        style={{ padding: 'inherit' }}
      />
    </div>
  );
}

import { GridTileImage } from 'components/grid/tile';
import { PLACEHOLDER_IMAGE } from 'lib/constants';
import { getProductsByCategory } from 'lib/swell';
import { ProductFragment } from 'lib/swell/__generated__/graphql';
import Link from 'next/link';

function ThreeItemGridItem({
  item,
  size,
  background
}: {
  item: ProductFragment;
  size: 'full' | 'half';
  background: 'white' | 'pink' | 'purple' | 'black';
}) {
  return (
    <div
      className={size === 'full' ? 'lg:col-span-4 lg:row-span-2' : 'lg:col-span-2 lg:row-span-1'}
    >
      <Link className="block h-full" href={`/product/${item.slug}`}>
        <GridTileImage
          src={item.images.length === 0 ? PLACEHOLDER_IMAGE : item.images[0]?.file.url || ''}
          width={size === 'full' ? 1080 : 540}
          height={size === 'full' ? 1080 : 540}
          priority={true}
          background={background}
          alt={item.name}
          labels={{
            title: item.name as string, // TODO: Ensure correct typing
            amount: String(item.price), //TODO: Clean this up
            currencyCode: 'USD' // TODO: Clean this up
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getProductsByCategory('equipment');

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="lg:grid lg:grid-cols-6 lg:grid-rows-2" data-testid="homepage-products">
      <ThreeItemGridItem size="full" item={firstProduct} background="purple" />
      <ThreeItemGridItem size="half" item={secondProduct} background="black" />
      <ThreeItemGridItem size="half" item={thirdProduct} background="pink" />
    </section>
  );
}

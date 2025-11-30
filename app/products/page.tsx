import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function ProductsPage({
  searchParams
}: {
  searchParams: Promise<{ categoryId?: string }>;
}) {
  const { categoryId } = await searchParams;
  const where = categoryId ? { categoryId } : {};

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  const categoryName = categoryId
    ? (await prisma.category.findUnique({ where: { id: categoryId } }))?.name
    : 'All Products';

  return (
    <div>
      <h1 className='text-3xl font-bold text-gray-900 mb-8'>{categoryName}</h1>

      {products.length === 0 ? (
        <p className='text-gray-500'>No products found.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products.map((product) => {
            let images: string[] = [];
            try {
              images = JSON.parse(product.images);
            } catch (e) {
              images = [];
            }
            const mainImage = images.length > 0 ? images[0] : null;

            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className='group'
              >
                <div className='bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200'>
                  <div className='aspect-w-3 aspect-h-2 bg-gray-200 relative h-48'>
                    {mainImage ? (
                      <img
                        src={mainImage}
                        alt={product.name}
                        className='w-full h-full object-cover object-center group-hover:opacity-75'
                      />
                    ) : (
                      <div className='flex items-center justify-center h-full text-gray-400'>
                        No Image
                      </div>
                    )}
                  </div>
                  <div className='p-4'>
                    <h3 className='text-lg font-medium text-gray-900 group-hover:text-blue-600'>
                      {product.name}
                    </h3>
                    <p className='mt-1 text-sm text-gray-500 truncate'>
                      {product.description}
                    </p>
                    {product.price && (
                      <p className='mt-2 text-lg font-semibold text-gray-900'>
                        ${Number(product.price).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

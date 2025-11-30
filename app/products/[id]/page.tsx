import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Download } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true, attachments: true, brand: true }
  });

  if (!product) {
    notFound();
  }

  let images: string[] = [];
  let specs: Record<string, string> = {};

  try {
    images = JSON.parse(product.images);
  } catch (e) {
    images = [];
  }

  try {
    specs = JSON.parse(product.specs);
  } catch (e) {
    specs = {};
  }

  return (
    <div className='bg-white'>
      <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <div className='lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start'>
          {/* Image gallery */}
          <div className='flex flex-col-reverse'>
            <div className='w-full aspect-w-1 aspect-h-1'>
              {images.length > 0 ? (
                <img
                  src={images[0]}
                  alt={product.name}
                  className='w-full h-full object-center object-cover sm:rounded-lg'
                />
              ) : (
                <div className='w-full h-96 bg-gray-200 flex items-center justify-center text-gray-400 rounded-lg'>
                  No Image
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className='hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none'>
                <div className='grid grid-cols-4 gap-6'>
                  {images.slice(1).map((image, idx) => (
                    <div
                      key={idx}
                      className='relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50'
                    >
                      <img
                        src={image}
                        alt=''
                        className='w-full h-full object-center object-cover rounded-md'
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product info */}
          <div className='mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0'>
            <h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>
              {product.name}
            </h1>

            <div className='mt-3'>
              <h2 className='sr-only'>Product information</h2>
              {product.price && (
                <p className='text-3xl text-gray-900'>
                  ${Number(product.price).toFixed(2)}
                </p>
              )}
              {product.brand && (
                <div className='mt-4 flex items-center'>
                  {product.brand.logo && (
                    <img
                      src={product.brand.logo}
                      alt={product.brand.name}
                      className='h-8 w-8 rounded-full object-cover mr-2'
                    />
                  )}
                  <span className='text-lg font-medium text-gray-700'>
                    Brand: {product.brand.name}
                  </span>
                </div>
              )}
            </div>

            <div className='mt-6'>
              <h3 className='sr-only'>Description</h3>
              <div className='text-base text-gray-700 space-y-6'>
                <p>{product.description}</p>
              </div>
            </div>

            {/* Specs */}
            {Object.keys(specs).length > 0 && (
              <div className='mt-8 border-t border-gray-200 pt-8'>
                <h3 className='text-sm font-medium text-gray-900'>
                  Specifications
                </h3>
                <div className='mt-4 prose prose-sm text-gray-500'>
                  <ul role='list'>
                    {Object.entries(specs).map(([key, value]) => (
                      <li key={key} className='flex py-2'>
                        <span className='font-medium text-gray-900 w-1/3'>
                          {key}
                        </span>
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Attachments */}
            {product.attachments.length > 0 && (
              <div className='mt-8 border-t border-gray-200 pt-8'>
                <h3 className='text-sm font-medium text-gray-900'>Downloads</h3>
                <ul className='mt-4 space-y-2'>
                  {product.attachments.map((attachment) => (
                    <li key={attachment.id}>
                      <a
                        href={attachment.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center text-blue-600 hover:text-blue-800'
                      >
                        <Download className='h-5 w-5 mr-2' />
                        {attachment.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

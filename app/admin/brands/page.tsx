import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Plus, Edit } from 'lucide-react';
import DeleteBrandButton from './DeleteBrandButton';

export const dynamic = 'force-dynamic';

export default async function AdminBrandsPage() {
  const brands = await prisma.brand.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: 'asc' }
  });

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Brands</h1>
        <Link
          href='/admin/brands/new'
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center'
        >
          <Plus className='h-4 w-4 mr-2' />
          Add Brand
        </Link>
      </div>

      <div className='bg-white shadow overflow-hidden sm:rounded-md'>
        <ul className='divide-y divide-gray-200'>
          {brands.map((brand) => (
            <li key={brand.id}>
              <div className='px-4 py-4 sm:px-6 flex items-center justify-between'>
                <div className='flex items-center'>
                  {brand.logo && (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className='h-10 w-10 rounded-full object-cover mr-4'
                    />
                  )}
                  <div className='text-sm font-medium text-blue-600 truncate mr-4'>
                    {brand.name}
                  </div>
                  <div className='ml-2 flex-shrink-0 flex'>
                    <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                      {brand._count.products} Products
                    </span>
                  </div>
                </div>
                <div className='flex items-center space-x-4'>
                  <Link
                    href={`/admin/brands/${brand.id}`}
                    className='text-gray-400 hover:text-gray-500'
                  >
                    <Edit className='h-5 w-5' />
                  </Link>
                  <DeleteBrandButton id={brand.id} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

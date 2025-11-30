import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Plus, Edit, Trash } from 'lucide-react';
import DeleteProductButton from './DeleteProductButton';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Products</h1>
        <Link
          href='/admin/products/new'
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center'
        >
          <Plus className='h-4 w-4 mr-2' />
          Add Product
        </Link>
      </div>

      <div className='bg-white shadow overflow-hidden sm:rounded-md'>
        <ul className='divide-y divide-gray-200'>
          {products.map((product) => (
            <li key={product.id}>
              <div className='px-4 py-4 sm:px-6 flex items-center justify-between'>
                <div className='flex items-center'>
                  <div className='text-sm font-medium text-blue-600 truncate mr-4 w-64'>
                    {product.name}
                  </div>
                  <div className='ml-2 flex-shrink-0 flex'>
                    <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                      {product.category.name}
                    </span>
                  </div>
                </div>
                <div className='flex items-center space-x-4'>
                  <Link
                    href={`/admin/products/${product.id}`}
                    className='text-gray-400 hover:text-gray-500'
                  >
                    <Edit className='h-5 w-5' />
                  </Link>
                  <DeleteProductButton id={product.id} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

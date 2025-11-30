import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProductForm from '../ProductForm';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    notFound();
  }

  // Convert Decimal to number for the form
  const productForForm = {
    ...product,
    price: product.price ? Number(product.price) : null
  };

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Edit Product</h1>
      <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
        <ProductForm product={productForForm} />
      </div>
    </div>
  );
}

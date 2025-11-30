import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import BrandForm from '../BrandForm';

export const dynamic = 'force-dynamic';

export default async function EditBrandPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const brand = await prisma.brand.findUnique({
    where: { id }
  });

  if (!brand) {
    notFound();
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Edit Brand</h1>
      <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
        <BrandForm brand={brand} />
      </div>
    </div>
  );
}

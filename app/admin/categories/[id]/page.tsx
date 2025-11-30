import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import CategoryForm from '../CategoryForm';

export const dynamic = 'force-dynamic';

export default async function EditCategoryPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await prisma.category.findUnique({
    where: { id }
  });

  if (!category) {
    notFound();
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Edit Category</h1>
      <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
        <CategoryForm category={category} />
      </div>
    </div>
  );
}

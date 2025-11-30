'use client';

import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteBrandButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this brand?')) return;

    try {
      const res = await fetch(`/api/brands/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to delete brand');
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting brand');
    }
  };

  return (
    <button onClick={handleDelete} className='text-red-400 hover:text-red-500'>
      <Trash className='h-5 w-5' />
    </button>
  );
}

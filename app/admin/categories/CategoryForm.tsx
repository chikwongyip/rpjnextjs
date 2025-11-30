'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

interface Category {
  id?: string;
  name: string;
  image: string | null;
}

export default function CategoryForm({ category }: { category?: Category }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: category?.name || '',
    image: category?.image || ''
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      });
      const data = await res.json();
      if (data.success) {
        setFormData({ ...formData, image: data.url });
      }
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, image: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = category
        ? `/api/categories/${category.id}`
        : '/api/categories';
      const method = category ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        router.push('/admin/categories');
        router.refresh();
      } else {
        alert('Failed to save category');
      }
    } catch (error) {
      console.error(error);
      alert('Error saving category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-8 divide-y divide-gray-200'
    >
      <div className='space-y-8 divide-y divide-gray-200'>
        <div>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>
            Category Information
          </h3>
          <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
            <div className='sm:col-span-4'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                Name
              </label>
              <div className='mt-1'>
                <input
                  type='text'
                  name='name'
                  id='name'
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='pt-8'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>Image</h3>
          <div className='mt-6'>
            {formData.image ? (
              <div className='relative w-24 h-24 mb-4'>
                <img
                  src={formData.image}
                  alt=''
                  className='w-full h-full object-cover rounded'
                />
                <button
                  type='button'
                  onClick={handleRemoveImage}
                  className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600'
                >
                  <X className='h-4 w-4' />
                </button>
              </div>
            ) : null}
            <input
              type='file'
              accept='image/*'
              onChange={handleImageUpload}
              className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
            />
          </div>
        </div>
      </div>

      <div className='pt-5'>
        <div className='flex justify-end'>
          <button
            type='button'
            onClick={() => router.back()}
            className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={loading}
            className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50'
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </form>
  );
}

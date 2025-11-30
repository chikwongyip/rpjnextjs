'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface Brand {
  id: string;
  name: string;
}

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number | null;
  categoryId: string;
  brandId: string | null;
  images: string; // JSON string
  specs: string; // JSON string
}

export default function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    categoryId: product?.categoryId || '',
    brandId: product?.brandId || ''
  });

  const [images, setImages] = useState<string[]>(
    product?.images ? JSON.parse(product.images) : []
  );
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>(
    product?.specs
      ? Object.entries(JSON.parse(product.specs)).map(([key, value]) => ({
          key,
          value: value as string
        }))
      : []
  );

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));

    fetch('/api/brands')
      .then((res) => res.json())
      .then((data) => setBrands(data));
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setImages([...images, data.url]);
      }
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAddSpec = () => {
    setSpecs([...specs, { key: '', value: '' }]);
  };

  const handleSpecChange = (
    index: number,
    field: 'key' | 'value',
    value: string
  ) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const specsObj = specs.reduce((acc, curr) => {
      if (curr.key) acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    const payload = {
      ...formData,
      price: formData.price ? Number(formData.price) : null,
      brandId: formData.brandId || null,
      images: JSON.stringify(images),
      specs: JSON.stringify(specsObj)
    };

    try {
      const url = product ? `/api/products/${product.id}` : '/api/products';
      const method = product ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        alert('Failed to save product');
      }
    } catch (error) {
      console.error(error);
      alert('Error saving product');
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
            Product Information
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

            <div className='sm:col-span-6'>
              <label
                htmlFor='description'
                className='block text-sm font-medium text-gray-700'
              >
                Description
              </label>
              <div className='mt-1'>
                <textarea
                  id='description'
                  name='description'
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md'
                />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label
                htmlFor='price'
                className='block text-sm font-medium text-gray-700'
              >
                Price
              </label>
              <div className='mt-1'>
                <input
                  type='number'
                  name='price'
                  id='price'
                  step='0.01'
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md'
                />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label
                htmlFor='category'
                className='block text-sm font-medium text-gray-700'
              >
                Category
              </label>
              <div className='mt-1'>
                <select
                  id='category'
                  name='category'
                  required
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md'
                >
                  <option value=''>Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label
                htmlFor='brand'
                className='block text-sm font-medium text-gray-700'
              >
                Brand
              </label>
              <div className='mt-1'>
                <select
                  id='brand'
                  name='brand'
                  value={formData.brandId}
                  onChange={(e) =>
                    setFormData({ ...formData, brandId: e.target.value })
                  }
                  className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md'
                >
                  <option value=''>Select a brand (Optional)</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className='pt-8'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>
            Images
          </h3>
          <div className='mt-6'>
            <div className='flex items-center space-x-4 mb-4'>
              {images.map((img, idx) => (
                <div key={idx} className='relative w-24 h-24'>
                  <img
                    src={img}
                    alt=''
                    className='w-full h-full object-cover rounded'
                  />
                  <button
                    type='button'
                    onClick={() => handleRemoveImage(idx)}
                    className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600'
                  >
                    <X className='h-4 w-4' />
                  </button>
                </div>
              ))}
            </div>
            <input
              type='file'
              accept='image/*'
              onChange={handleImageUpload}
              className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
            />
          </div>
        </div>

        <div className='pt-8'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-lg leading-6 font-medium text-gray-900'>
              Specifications
            </h3>
            <button
              type='button'
              onClick={handleAddSpec}
              className='inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200'
            >
              <Plus className='h-4 w-4 mr-1' /> Add Spec
            </button>
          </div>
          <div className='space-y-4'>
            {specs.map((spec, idx) => (
              <div key={idx} className='flex gap-4 items-center'>
                <input
                  type='text'
                  placeholder='Key (e.g., Color)'
                  value={spec.key}
                  onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                  className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md'
                />
                <input
                  type='text'
                  placeholder='Value (e.g., Red)'
                  value={spec.value}
                  onChange={(e) =>
                    handleSpecChange(idx, 'value', e.target.value)
                  }
                  className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveSpec(idx)}
                  className='text-red-500 hover:text-red-700'
                >
                  <X className='h-5 w-5' />
                </button>
              </div>
            ))}
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

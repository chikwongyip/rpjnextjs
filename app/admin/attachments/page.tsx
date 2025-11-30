'use client';

import { useState, useEffect } from 'react';
import { Upload, Trash, Link as LinkIcon } from 'lucide-react';

interface Attachment {
  id: string;
  name: string;
  url: string;
  productId: string | null;
  product?: { name: string };
}

interface Product {
  id: string;
  name: string;
}

export default function AttachmentsPage() {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/attachments').then((res) => res.json()),
      fetch('/api/products').then((res) => res.json())
    ]).then(([attData, prodData]) => {
      setAttachments(attData);
      setProducts(prodData);
      setLoading(false);
    });
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        // Create attachment record
        const attRes = await fetch('/api/attachments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            url: data.url
          })
        });
        const newAtt = await attRes.json();
        setAttachments([newAtt, ...attachments]);
      }
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Attachments</h1>

      <div className='mb-6'>
        <label className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 cursor-pointer'>
          <Upload className='h-4 w-4 mr-2' />
          Upload New Attachment
          <input type='file' className='hidden' onChange={handleUpload} />
        </label>
      </div>

      <div className='bg-white shadow overflow-hidden sm:rounded-md'>
        <ul className='divide-y divide-gray-200'>
          {attachments.map((att) => (
            <li
              key={att.id}
              className='px-4 py-4 sm:px-6 flex items-center justify-between'
            >
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <LinkIcon className='h-5 w-5 text-gray-400' />
                </div>
                <div className='ml-4'>
                  <div className='text-sm font-medium text-blue-600 truncate'>
                    <a href={att.url} target='_blank' rel='noopener noreferrer'>
                      {att.name}
                    </a>
                  </div>
                  <div className='text-sm text-gray-500'>
                    {att.product
                      ? `Linked to: ${att.product.name}`
                      : 'Unlinked'}
                  </div>
                </div>
              </div>
              <div>{/* Add delete or link functionality here if needed */}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

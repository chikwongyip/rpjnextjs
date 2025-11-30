'use client';

import { useState, useEffect } from 'react';

export default function CompanyInfoPage() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/company-info?key=about')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.content) {
          setContent(data.content);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/company-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'about', content })
      });
      if (res.ok) {
        alert('Saved successfully');
      } else {
        alert('Failed to save');
      }
    } catch (error) {
      console.error(error);
      alert('Error saving');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Edit Company Info (About Us)</h1>
      <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
        <div>
          <label
            htmlFor='about'
            className='block text-sm font-medium text-gray-700'
          >
            About Us Content (HTML supported)
          </label>
          <div className='mt-1'>
            <textarea
              id='about'
              name='about'
              rows={10}
              className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <p className='mt-2 text-sm text-gray-500'>
            You can use HTML tags for formatting.
          </p>
        </div>
        <div className='mt-5'>
          <button
            type='button'
            onClick={handleSave}
            disabled={saving}
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50'
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

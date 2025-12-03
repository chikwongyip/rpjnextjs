'use client';

import { useState, useEffect } from 'react';
import CompanyForm from '@/app/admin/company-info/CompanyForm';
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
      <h1 className='text-2xl font-bold mb-6'>编辑企业信息</h1>
      <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
        <CompanyForm></CompanyForm>
      </div>
    </div>
  );
}

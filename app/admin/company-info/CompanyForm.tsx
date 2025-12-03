'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload, X } from 'lucide-react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// 表单验证 schema
const formSchema = z.object({
  companyName: z.string().min(2, '公司名称至少2个字符'),
  icp: z
    .string()
    .regex(
      /^[\u4e00-\u9fa5]*ICP[备证]?\d{8,}-?\d*$/,
      '请输入正确的ICP备案号，如：京ICP备12345678号'
    ),
  description: z.string().min(10, '公司简介至少10个字符'),
  phone: z.string().regex(/^1[3-9]\d{9}$/, '请输入正确的手机号'),
  email: z.string().email('请输入正确的邮箱'),
  logo: z.instanceof(File).optional()
});

type FormData = z.infer<typeof formSchema>;

export default function CompanyForm() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description:
        '<p>请输入公司简介，支持 <strong>加粗</strong>、<em>斜体</em>、列表等HTML标签。</p>'
    }
  });

  // TipTap 富文本编辑器（支持HTML）
  const editor = useEditor({
    extensions: [StarterKit],
    content: watch('description') || '',
    onUpdate: ({ editor }) => {
      setValue('description', editor.getHTML(), { shouldValidate: true });
    },
    immediatelyRender: false
  });

  // Logo 处理
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('logo', file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    setValue('logo', undefined);
    // 重置文件输入
    const input = document.getElementById('logo-input') as HTMLInputElement;
    if (input) input.value = '';
  };

  const onSubmit = (data: FormData) => {
    console.log('提交的数据：', data);
    // 这里可以调用 API 提交
    alert('提交成功！请查看控制台');
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='max-w mx-auto'>
        <div className='bg-white  shadow-xl overflow-hidden'>
          <form onSubmit={handleSubmit(onSubmit)} className='p-8 space-y-8'>
            <h3 className='text-lg leading-6 font-medium text-gray-900'>
              企业信息
            </h3>
            {/* 公司名称 */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                公司名称 <span className='text-red-500'>*</span>
              </label>
              <input
                {...register('companyName')}
                placeholder='北京某某科技有限公司'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
              />
              {errors.companyName && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.companyName.message}
                </p>
              )}
            </div>

            {/* ICP备案编号 */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                ICP备案编号 <span className='text-red-500'>*</span>
              </label>
              <input
                {...register('icp')}
                placeholder='京ICP备12345678号-1'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
              />
              {errors.icp && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.icp.message}
                </p>
              )}
            </div>

            {/* 公司简介 - 富文本编辑器 */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                公司简介（支持富文本） <span className='text-red-500'>*</span>
              </label>
              <div className='border border-gray-300 rounded-lg overflow-hidden'>
                <div className='bg-gray-50 border-b border-gray-200 px-3 py-2 flex gap-2 text-sm'>
                  <button
                    type='button'
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={`px-2 py-1 rounded hover:bg-gray-200 ${
                      editor?.isActive('bold') ? 'bg-gray-300' : ''
                    }`}
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    type='button'
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className={`px-2 py-1 rounded hover:bg-gray-200 ${
                      editor?.isActive('italic') ? 'bg-gray-300' : ''
                    }`}
                  >
                    <em>I</em>
                  </button>
                  <button
                    type='button'
                    onClick={() =>
                      editor?.chain().focus().toggleBulletList().run()
                    }
                    className={`px-2 py-1 rounded hover:bg-gray-200 ${
                      editor?.isActive('bulletList') ? 'bg-gray-300' : ''
                    }`}
                  >
                    • 列表
                  </button>
                </div>
                <EditorContent
                  editor={editor}
                  className='min-h-48 p-4 prose prose-sm max-w-none focus:outline-none'
                />
              </div>
              {errors.description && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* 电话 & 邮箱 */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  联系电话 <span className='text-red-500'>*</span>
                </label>
                <input
                  {...register('phone')}
                  placeholder='13812345678'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
                />
                {errors.phone && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  邮箱地址 <span className='text-red-500'>*</span>
                </label>
                <input
                  {...register('email')}
                  placeholder='example@company.com'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
                />
                {errors.email && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Logo 上传 */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                公司Logo <span className='text-red-500'>*</span>
              </label>

              {!logoPreview ? (
                <label className='flex justify-center w-full h-64 px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer hover:border-blue-400 transition'>
                  <div className='flex flex-col items-center justify-center space-y-3'>
                    <Upload className='w-12 h-12 text-gray-400' />
                    <p className='text-sm text-gray-600'>
                      <span className='font-medium text-blue-600'>
                        点击上传
                      </span>{' '}
                      或拖拽图片
                    </p>
                    <p className='text-xs text-gray-500'>
                      PNG、JPG、WEBP，小于5MB
                    </p>
                  </div>
                  <input
                    id='logo-input'
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={handleLogoChange}
                  />
                </label>
              ) : (
                <div className='relative'>
                  <img
                    src={logoPreview}
                    alt='Logo预览'
                    className='h-48 w-auto mx-auto rounded-lg border shadow'
                  />
                  <button
                    type='button'
                    onClick={removeLogo}
                    className='absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600'
                  >
                    <X className='w-5 h-5' />
                  </button>
                </div>
              )}
            </div>

            {/* 提交按钮 */}
            <div className='flex justify-end gap-4 pt-8'>
              <button
                type='button'
                className='px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition'
              >
                暂存草稿
              </button>
              <button
                type='submit'
                className='px-10 py-3 bg-linear-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-800 transition shadow-lg'
              >
                提交信息
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';

type SearchType = 'all' | 'category' | 'brand';

const options = [
  { value: 'all', label: '全部', icon: <Search className='w-4 h-4' /> },
  {
    value: 'category',
    label: '类别',
    icon: <div className='w-4 h-4 bg-purple-500 rounded-sm' />
  },
  {
    value: 'brand',
    label: '品牌',
    icon: <div className='w-4 h-4 bg-green-500 rounded-sm' />
  }
] as const;

export default function EmbeddedDropdownSearch() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 点击外部关闭下拉
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentOption = options.find((o) => o.value === searchType)!;

  const handleSearch = () => {
    console.log('搜索', { query, searchType });
    alert(`搜索：${query}（类型：${currentOption.label}）`);
  };

  return (
    <div className='w-full max-w-2xl mx-auto p-8'>
      <div className='relative' ref={dropdownRef}>
        {/* 搜索框主容器 */}
        <div className='relative flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent'>
          {/* 左侧下拉选择器 */}
          <div className='relative'>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className='flex items-center gap-1.5 px-4 py-3.5 hover:bg-gray-50 transition-colors whitespace-nowrap'
            >
              <span className='flex items-center gap-2'>
                {currentOption.icon}
                <span className='text-sm font-medium'>
                  {currentOption.label}
                </span>
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* 下拉菜单 */}
            {dropdownOpen && (
              <div className='absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden'>
                {options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSearchType(option.value);
                      setDropdownOpen(false);
                      inputRef.current?.focus();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left ${
                      searchType === option.value
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700'
                    }`}
                  >
                    {option.icon}
                    <span className='text-sm font-medium'>{option.label}</span>
                    {searchType === option.value && (
                      <svg
                        className='w-4 h-4 ml-auto'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 分隔线 */}
          <div className='w-px bg-gray-300 h-8' />

          {/* 输入框 */}
          <input
            ref={inputRef}
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder={
              searchType === 'all'
                ? '搜索商品、品牌或类别'
                : searchType === 'category'
                ? '请输入产品类别'
                : '请输入品牌名称'
            }
            className='flex-1 px-4 py-3.5 outline-none text-base'
          />

          {/* 搜索按钮 */}
          <button
            onClick={handleSearch}
            className='bg-blue-500 hover:bg-blue-600 text-white px-8 py-3.5 font-medium transition-colors'
          >
            搜索
          </button>
        </div>
      </div>

      {/* 示例：显示当前选择 */}
      <div className='mt-6 text-sm text-gray-600'>
        当前搜索模式：
        <span className='font-semibold text-blue-600'>
          {currentOption.label}
        </span>{' '}
        输入内容：
        <span className='font-mono bg-gray-100 px-2 py-1 rounded'>
          {query || '无'}
        </span>
      </div>
    </div>
  );
}

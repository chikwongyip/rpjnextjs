// components/Navbar.tsx
'use client';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Search, ChevronDown, ShoppingCart } from 'lucide-react';

const navItems = [
  { label: '首页', href: '/' },
  { label: '化学试剂', href: '/reagents', hot: true },
  { label: '标准品', href: '/standards' },
  { label: '仪器耗材', href: '/instruments' },
  { label: '技术服务', href: '/services' },
  { label: '解决方案', href: '/solutions' },
  { label: '技术支持', href: '/support' },
  { label: '关于我们', href: '/about' }
];

const searchOptions = [
  {
    value: 'all',
    label: '全部商品',
    placeholder: '搜索产品名称、货号、CAS号、分子式...'
  },
  { value: 'reagents', label: '化学试剂' },
  { value: 'standards', label: '标准品' },
  { value: 'instruments', label: '仪器耗材' }
];

const mockSuggestions = [
  '甲醇 ≥99.9% HPLC级',
  '67-56-1 Methanol',
  '1.06007.2500 Methanol EMSURE',
  '乙腈 for HPLC',
  '氢氧化钠颗粒 AR',
  '瑞谱佳 高效液相色谱柱'
];

export default function Navbar() {
  const [selectedTab, setSelectedTab] = useState('全部商品');
  const [query, setQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const currentPlaceholder =
    searchOptions.find((o) => o.label === selectedTab)?.placeholder || '';

  const filteredSuggestions = query
    ? mockSuggestions.filter((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
        setSuggestionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className='bg-white text-blue-600 fixed top-0 left-0 right-0 z-50 shadow-xl'>
      <div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <div className='flex items-center justify-between gap-6'>
          {/* Logo */}
          <Link href='/' className='shrink-0 hover:opacity-90 transition'>
            <Image
              src='/uploads/logo-rapidtech.png' // 请放在 public/logo-rapidtech.png
              alt='瑞谱佳科技 Rapid+Tech'
              width={220}
              height={80}
              className='h-14 sm:h-16 w-auto'
              priority
            />
          </Link>

          {/* 桌面导航菜单 */}
          <nav className='hidden lg:flex items-center gap-8 flex-1 justify-center'>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className='relative text-sm font-medium hover:text-blue-400 transition group'
              >
                {item.label}
                {item.hot && (
                  <span className='absolute -top-4 -right-6 bg-linear-to-br from-red-500 to-red-600 text-white text-xs px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1 animate-pulse'>
                    <span className='w-1.5 h-1.5 bg-yellow-300 rounded-full'></span>
                    HOT
                  </span>
                )}
                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300'></span>
              </a>
            ))}
          </nav>

          {/* Merck 风格搜索框 + 购物车 */}
          <div
            className='flex items-center gap-4 flex-1 lg:flex-initial'
            ref={containerRef}
          >
            {/* 搜索框（核心） */}
            <div className='flex-1 max-w-xl relative'>
              <div className='flex items-center bg-white rounded-lg shadow-xl overflow-hidden ring-1 ring-gray-300'>
                {/* 下拉选择 */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className='flex items-center gap-2 px-4 py-3 text-gray-800 font-medium hover:bg-gray-50 transition whitespace-nowrap'
                >
                  {selectedTab}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      dropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* 下拉菜单 */}
                {dropdownOpen && (
                  <div className='absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-2xl border border-gray-200 z-50'>
                    {searchOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSelectedTab(opt.label);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-gray-800 hover:bg-blue-50 transition ${
                          selectedTab === opt.label
                            ? 'bg-blue-50 font-semibold text-blue-700'
                            : ''
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* 输入框 */}
                <input
                  type='text'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => query && setSuggestionsOpen(true)}
                  placeholder={currentPlaceholder}
                  className='flex-1 px-4 py-3 text-gray-700 outline-none placeholder-gray-500 min-w-0'
                />

                {/* 搜索按钮 */}
                <button className='bg-blue-700 hover:bg-blue-800 px-6 py-3 transition'>
                  <Search className='w-5 h-5 text-white' />
                </button>
              </div>

              {/* 搜索建议 */}
              {suggestionsOpen && query && filteredSuggestions.length > 0 && (
                <div className='absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 z-40'>
                  {filteredSuggestions.slice(0, 6).map((s, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setQuery(s);
                        setSuggestionsOpen(false);
                      }}
                      className='px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between border-b border-gray-100 last:border-0'
                    >
                      <span className='text-gray-800 text-sm'>{s}</span>
                      <Search className='w-4 h-4 text-gray-400' />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 购物车 */}
            {/* <button className='relative hover:text-red-400 transition shrink-0'>
              <ShoppingCart className='w-7 h-7' />
              <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center ring-2 ring-black'>
                3
              </span>
            </button> */}
          </div>
        </div>
      </div>
    </header>
  );
}

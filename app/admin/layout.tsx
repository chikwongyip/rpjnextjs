import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  FileText,
  Paperclip,
  Home
} from 'lucide-react';

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      <div className='w-64 bg-gray-900 text-white flex flex-col'>
        <div className='p-4 border-b border-gray-800'>
          <h1 className='text-xl font-bold'>Admin Panel</h1>
        </div>
        <nav className='flex-1 p-4 space-y-2'>
          <Link
            href='/admin'
            className='flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-800'
          >
            <LayoutDashboard className='h-5 w-5' />
            <span>Dashboard</span>
          </Link>
          <Link
            href='/admin/products'
            className='flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-800'
          >
            <Package className='h-5 w-5' />
            <span>Products</span>
          </Link>
          <Link
            href='/admin/brands'
            className='flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-800'
          >
            <Package className='h-5 w-5' />
            <span>Brands</span>
          </Link>
          <Link
            href='/admin/categories'
            className='flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-800'
          >
            <Package className='h-5 w-5' />
            <span>Categories</span>
          </Link>
          <Link
            href='/admin/company-info'
            className='flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-800'
          >
            <FileText className='h-5 w-5' />
            <span>Company Info</span>
          </Link>
          <Link
            href='/admin/attachments'
            className='flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-800'
          >
            <Paperclip className='h-5 w-5' />
            <span>Attachments</span>
          </Link>
          <div className='pt-4 mt-4 border-t border-gray-800'>
            <Link
              href='/'
              className='flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-800 text-gray-400 hover:text-white'
            >
              <Home className='h-5 w-5' />
              <span>Back to Site</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className='flex-1 overflow-auto'>
        <div className='p-8'>{children}</div>
      </div>
    </div>
  );
}

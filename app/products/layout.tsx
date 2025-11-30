import ProductSidebar from '@/components/ProductSidebar';

export default function ProductsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex max-w-7xl mx-auto'>
      <ProductSidebar />
      <div className='flex-1 p-6'>{children}</div>
    </div>
  );
}

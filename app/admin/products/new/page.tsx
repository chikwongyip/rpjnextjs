import ProductForm from '../ProductForm';

export default function NewProductPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Add New Product</h1>
      <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
        <ProductForm />
      </div>
    </div>
  );
}

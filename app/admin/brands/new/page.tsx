import BrandForm from '../BrandForm';

export default function NewBrandPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Add New Brand</h1>
      <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
        <BrandForm />
      </div>
    </div>
  );
}

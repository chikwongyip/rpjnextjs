import CategoryForm from '../CategoryForm';

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Add New Category</h1>
      <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
        <CategoryForm />
      </div>
    </div>
  );
}

import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const info = await prisma.companyInfo.findUnique({
    where: { key: 'about' }
  });

  return (
    <div className='bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24'>
      <div className='relative max-w-xl mx-auto'>
        <div className='text-center'>
          <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
            About EnterpriseCorp
          </h2>
          <p className='mt-4 text-lg leading-6 text-gray-500'>
            Building the future of enterprise technology.
          </p>
        </div>
        <div className='mt-12'>
          <div className='prose prose-blue prose-lg text-gray-500 mx-auto'>
            {info?.content ? (
              <div dangerouslySetInnerHTML={{ __html: info.content }} />
            ) : (
              <p>
                EnterpriseCorp is a global leader in providing innovative
                solutions for businesses of all sizes. Founded in 2020, we have
                quickly grown to serve clients in over 50 countries. Our mission
                is to empower organizations with the tools they need to succeed
                in the digital age.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

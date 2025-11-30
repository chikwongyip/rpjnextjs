import { prisma } from '@/lib/prisma';
import { Download, FileText } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DownloadsPage() {
  const attachments = await prisma.attachment.findMany({
    include: { product: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className='bg-white py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center'>
          <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
            Downloads
          </h2>
          <p className='mt-4 text-lg leading-6 text-gray-500'>
            Access product manuals, specifications, and other resources.
          </p>
        </div>

        <div className='mt-12'>
          {attachments.length === 0 ? (
            <p className='text-center text-gray-500'>
              No downloads available at this time.
            </p>
          ) : (
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className='relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500'
                >
                  <div className='flex-shrink-0'>
                    <FileText className='h-10 w-10 text-gray-400' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <a
                      href={attachment.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='focus:outline-none'
                    >
                      <span className='absolute inset-0' aria-hidden='true' />
                      <p className='text-sm font-medium text-gray-900'>
                        {attachment.name}
                      </p>
                      {attachment.product && (
                        <p className='text-sm text-gray-500 truncate'>
                          For: {attachment.product.name}
                        </p>
                      )}
                    </a>
                  </div>
                  <div className='flex-shrink-0'>
                    <Download className='h-5 w-5 text-gray-400' />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

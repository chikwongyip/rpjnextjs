import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
export default function Home() {
  return (
    <div className='bg-white'>
      <div className='relative bg-gray-900 overflow-hidden mt-20'>
        <HeroBanner></HeroBanner>

        {/* <HeroBanner></HeroBanner> */}
      </div>
      {/* Hero Section */}
      {/* <div className='relative bg-gray-900 overflow-hidden'>
        <div className='max-w-7xl mx-auto'>
          <div className='relative z-10 pb-8 bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32'>
            <main className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
              <div className='sm:text-center lg:text-left'>
                <h1 className='text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl'>
                  <span className='block xl:inline'>Premium Solutions for</span>{' '}
                  <span className='block text-blue-600 xl:inline'>
                    Modern Enterprises
                  </span>
                </h1>
                <p className='mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
                  We provide cutting-edge technology and robust infrastructure
                  to help your business scale. Discover our range of
                  high-performance products.
                </p>
                <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
                  <div className='rounded-md shadow'>
                    <Link
                      href='/products'
                      className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10'
                    >
                      View Products
                    </Link>
                  </div>
                  <div className='mt-3 sm:mt-0 sm:ml-3'>
                    <Link
                      href='/about'
                      className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10'
                    >
                      About Us
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className='lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2'>
          <div className='h-56 w-full bg-gray-800 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center text-gray-500'>
            {/* Placeholder for Hero Image */}
      {/* <span className='text-lg'>Hero Image Placeholder</span>
          </div>
        </div>
      </div> */}

      {/* Features Section */}
      <div className='py-12 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='lg:text-center'>
            <h2 className='text-base text-blue-600 font-semibold tracking-wide uppercase'>
              Features
            </h2>
            <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
              Why Choose Us?
            </p>
            <p className='mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto'>
              Our products are designed with reliability, performance, and
              scalability in mind.
            </p>
          </div>

          <div className='mt-10'>
            <dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10'>
              {[
                {
                  name: 'High Performance',
                  description:
                    'Optimized for speed and efficiency in demanding environments.'
                },
                {
                  name: 'Secure & Reliable',
                  description:
                    'Built with security best practices to protect your data.'
                },
                {
                  name: '24/7 Support',
                  description:
                    'Our dedicated team is always available to assist you.'
                },
                {
                  name: 'Scalable Architecture',
                  description:
                    'Grow your business without worrying about infrastructure limits.'
                }
              ].map((feature) => (
                <div key={feature.name} className='relative'>
                  <dt>
                    <div className='absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white'>
                      <CheckCircle className='h-6 w-6' aria-hidden='true' />
                    </div>
                    <p className='ml-16 text-lg leading-6 font-medium text-gray-900'>
                      {feature.name}
                    </p>
                  </dt>
                  <dd className='mt-2 ml-16 text-base text-gray-500'>
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

// components/RapidTechHeroBanner.tsx
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className='relative w-full h-screen overflow-hidden'>
      {/* 背景图 - 推荐放一张深空蓝+红色光轨的科技感大图 */}
      <Image
        src='/hero-rapidtech.jpg' // 你放 public/hero-rapidtech.jpg（稍后给你配图建议）
        alt='瑞谱佳科技 领跑实验室未来'
        fill
        priority
        quality={100}
        className='object-cover object-center'
      />

      {/* 黑 → 深蓝渐变叠加层，高端科技感拉满 */}
      <div className='absolute inset-0 bg-linear-to-b from-black/80 via-blue-950/70 to-black/90' />

      {/* 主内容区 */}
      <div className='absolute inset-0 flex flex-col justify-center items-center text-center px-8'>
        {/* 左上角合作/认证卡片（可替换为资质、合作客户等） */}
        <div className='absolute top-8 left-8 bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl flex items-center gap-6'>
          <Image
            src='/uploads/logo-rapidtech.png'
            alt='瑞谱佳科技'
            width={120}
            height={120}
            className='rounded-lg'
          />
          <div className='h-20 w-px bg-gray-300' />
          <div className='text-left'>
            <div className='text-xs text-gray-600 uppercase tracking-wider'>
              Official Partner
            </div>
            <div className='text-sm font-bold text-gray-900'>
              Merck · Sigma-Aldrich · Thermo Fisher
              <br />
              授权中国区核心经销商
            </div>
          </div>
        </div>

        {/* 主标题 - 黑蓝红三色经典组合 */}
        <h1 className='text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none mb-6'>
          <span className='text-white'>领跑</span>
          <span className='text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500'>
            实验室
          </span>
          <br />
          <span className='text-white'>未来</span>
          <span className='relative ml-8'>
            <span className='text-red-500 text-8xl md:text-9xl lg:text-[10rem] absolute -top-8 -left-4 opacity-90'>
              Rapid
            </span>
            <span className='text-white'>已至</span>
          </span>
        </h1>

        {/* 副标题 */}
        <p className='text-2xl md:text-4xl font-light tracking-widest text-blue-200 mb-4'>
          一站式实验室整体解决方案提供商
        </p>
        <p className='text-lg md:text-2xl tracking-wider text-gray-300'>
          化学试剂 · 标准物质 · 仪器耗材 · 技术服务
        </p>

        {/* 行动按钮 */}
        <div className='mt-16 flex flex-col sm:flex-row gap-6'>
          <button className='px-14 py-6 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300'>
            立即选购试剂与耗材
          </button>
          <button className='px-14 py-6 border-2 border-white/50 backdrop-blur text-white font-bold text-xl rounded-full hover:bg-white/10 transition'>
            申请技术方案定制
          </button>
        </div>
      </div>

      {/* 底部品牌矩阵（瑞谱佳核心代理品牌） */}
      <div className='absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur py-10'>
        <div className='max-w-screen-2xl mx-auto px-8 flex flex-wrap justify-center items-center gap-12 lg:gap-20'>
          {[
            { src: '/brands/merck.png', name: 'Merck' },
            { src: '/brands/sigma.png', name: 'Sigma-Aldrich' },
            { src: '/brands/thermo.png', name: 'Thermo Fisher' },
            { src: '/brands/waters.png', name: 'Waters' },
            { src: '/brands/agilent.png', name: 'Agilent' }
          ].map((brand) => (
            <Image
              key={brand.name}
              src={brand.src}
              alt={brand.name}
              width={140}
              height={60}
              className='opacity-80 hover:opacity-100 transition duration-300 grayscale hover:grayscale-0'
            />
          ))}
        </div>
      </div>

      {/* 左右切换按钮 + 右侧小圆点 */}
      <button className='absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur rounded-full hover:bg-white/30 transition'>
        <ChevronLeft className='w-10 h-10 text-white' />
      </button>
      <button className='absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur rounded-full hover:bg-white/30 transition'>
        <ChevronRight className='w-10 h-10 text-white' />
      </button>

      <div className='absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4'>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full border-2 transition ${
              i === 0 ? 'bg-white border-white' : 'border-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

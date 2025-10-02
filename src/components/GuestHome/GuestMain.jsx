import React from 'react'
import Logo from '../../others/Logo'

export default function GuestMain() {
  return (
    <main className="w-full h-full flex justify-center items-center">
      <section>
        <article className='flex items-center gap-3'>
          <div>
            <Logo size={50} />
          </div>
          <span className="text-[2.7rem] md:text-[2.8rem] lg:text-[3.1rem] leading-none font-medium">
            lonas
          </span>
        </article>
      </section>
    </main>
  );
}

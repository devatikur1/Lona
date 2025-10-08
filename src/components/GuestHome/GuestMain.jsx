import React from 'react'
import Logo from '../../others/Logo'

export default function GuestMain({ chatBoxHeieht }) {
  return (
    <main
      style={{ marginBottom: `${chatBoxHeieht}px` }}
      className="w-full h-full flex justify-center items-center overflow-x-hidden touch-pan-y overflow-y-auto"
    >
      <section>
        <article className="flex items-center gap-3">
          <div>
            <Logo size={55} />
          </div>
          <span className="text-[2.5rem] md:text-[3rem] lg:text-[3.2rem] leading-none font-medium">
            Lonas
          </span>
        </article>
      </section>
    </main>
  );
}

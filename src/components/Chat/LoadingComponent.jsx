import { Loader2 } from 'lucide-react';
import React from 'react'

export default function LoadingComponent({ chatBoxHeieht }) {
  return (
    <main
      style={{ marginBottom: `${chatBoxHeieht}px` }}
      className="w-full h-full flex justify-center items-center overflow-x-hidden touch-pan-y overflow-y-auto"
    >
      <section>
        <article className="flex items-center gap-3 animate-spin">
          <Loader2 color={"#212123"} size={50} />
        </article>
      </section>
    </main>
  );
}

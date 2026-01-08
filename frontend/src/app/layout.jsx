"use client";

import React from 'react';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='bg-black'>
      <body className="bg-black text-white antialiased selection:bg-cyan-500/30 font-mono min-h-screen flex flex-col">
        
        <nav className="border-b border-cyan-500/20 bg-black/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            
            <a href='/' className="group flex items-center">
              <div className="relative w-40 h-auto"> 
                <img 
                  src="/icon.png" 
                  className="w-full h-auto transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]" 
                  alt="logo" 
                />
              </div>
            </a>

            <div className="hidden md:flex items-center space-x-10">
              <a href="/tools" className="text-[15px] text-zinc-400 hover:text-cyan-400 font-bold transition-all tracking-[0.2em] uppercase">Tools</a>
              <a href="/documentation" className="text-[15px] text-zinc-400 hover:text-cyan-400 font-bold transition-all tracking-[0.2em] uppercase">Docs</a>
              <a href="/about" className="text-[15px] text-zinc-400 hover:text-cyan-400 font-bold transition-all tracking-[0.2em] uppercase">About</a>
              <a href="/contact" className="text-[15px] text-zinc-400 hover:text-cyan-400 font-bold transition-all tracking-[0.2em] uppercase">Contact</a>
              
              <a href="/shop" className="border border-cyan-500/30 px-5 py-1.5 rounded-sm text-[13px] font-black hover:bg-cyan-500/10 hover:border-cyan-400 transition-all tracking-widest uppercase text-cyan-400">
                Support
              </a>
            </div>

            <div className="hidden lg:flex items-center gap-3 border border-zinc-800 px-4 py-1.5 rounded bg-zinc-900/50">
               <span className="text-sm">🇵🇸</span>
               <span className="text-[13px] font-bold text-zinc-400 tracking-tighter uppercase">Free Palestine</span>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="py-16 border-t border-zinc-900 bg-black mt-20 relative">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                
                <div className="space-y-6">
                  <img src="/icon.png" alt="logo" className="w-48 brightness-90" />
                  <p className="text-zinc-500 text-[12px] leading-relaxed font-medium tracking-tight uppercase">
                    Advanced passive intelligence gathering <br/> and infrastructure analysis framework.
                  </p>
                </div>

                <div>
                  <h4 className="text-cyan-500 font-black text-[12px] uppercase tracking-[0.3em] mb-6">Platform</h4>
                  <ul className="space-y-3 text-zinc-400 font-bold text-[13px]">
                    <li><a href="/tools" className="hover:text-white transition-colors">OSINT TOOLS</a></li>
                    <li><a href="/documentation" className="hover:text-white transition-colors">RESOURCES</a></li>
                    <li><a href="/about" className="hover:text-white transition-colors">CORE TEAM</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-cyan-500 font-black text-[12px] uppercase tracking-[0.3em] mb-6">Security</h4>
                  <ul className="space-y-3 text-zinc-400 font-bold text-[13px]">
                    <li><a href="/privacy" className="hover:text-white transition-colors">PRIVACY</a></li>
                    <li><a href="/terms" className="hover:text-white transition-colors">TERMS</a></li>
                    <li><a href="/disclaimer" className="hover:text-white transition-colors">LEGAL</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-cyan-500 font-black text-[12px] uppercase tracking-[0.3em] mb-6">Environment</h4>
                  <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></span>
                      <span className="text-[11px] text-zinc-300 font-black tracking-widest uppercase">System: Stable</span>
                    </div>
                    <code className="text-[10px] text-zinc-600 block">
                      NODE_STATUS: ACTIVE<br />
                    </code>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-zinc-500 font-bold text-[11px] tracking-[0.2em] uppercase">
                  &copy; 2026 AIMFROST // INFRASTRUCTURE SECURED.
                </p>
                
                <div className="flex gap-6 text-[11px] text-cyan-800 font-black uppercase tracking-widest">
                  <span>No Brute</span>
                  <span>100% Passive</span>
                  <span>Encryption: AES-256</span>
                </div>
              </div>
            </div>
          </footer>
      </body>
    </html>
  );
}
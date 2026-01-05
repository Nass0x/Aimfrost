"use client";

import React, { useState } from 'react';
import './globals.css';

export default function RootLayout({ children }) {
  const toolCategories = [
    {
      name: "Discovery & Passive",
      tools: [
        { name: "SubDomain Finder", link: "/tools/subdomain-finder", status: "active" },
        { name: "Registration Info", link: "/tools/registration-info", status: "active" },
        { name: "Deep Crawler", link: "/tools/deep-crawler", status: "active" },
        { name: "Profile Hunter", link: "/tools/profile-hunter", status: "active" },
      ]
    },
    {
      name: "Analysis & HTTP",
      tools: [
        { name: "DNS Enumeration", link: "/tools/dns-enumeration", status: "active" },
        { name: "Firewall Detector", link: "/tools/waf-scan", status: "active" },
        { name: "Cloud Provider", link: "/tools/cloud-provider", status: "active" },
        { name: "DNS Records", link: "/tools/dns-records", status: "active" },
      ]
    },
    {
      name: "Security & Infrastructure",
      tools: [
        { name: "TLS Engine (TLSx)", link: "/tools/tls-analyzer", status: "active" }, 
        { name: "Traffic Balancer", link: "/tools/lbd-detector", status: "active" },
        { name: "Port Scanner", link: "/tools/port-scanner", status: "active" },
      ]
    }
  ];

  return (
    <html lang="en" className='bg-dark'>
      <body className="bg-black text-white antialiased selection:bg-cyan-500/30 font-mono min-h-screen flex flex-col">
        
        <nav className="border-b border-cyan-500/20 bg-black/95 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7.5xl mx-auto px-10 h-28 flex items-center justify-between">
            
            <a href='/' className="group flex items-center text-4xl font-black tracking-tighter text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
              <span className="relative flex items-center justify-center w-50 h-auto"> 
                <img 
                  src="/icon.png" 
                  className="w-full h-auto transition-all duration-700 ease-in-out scale-110 rotate-[-360deg] group-hover:rotate-0 group-hover:scale-75 group-hover:drop-shadow-[0_0_30px_rgba(34,211,238,0.8)]" 
                  alt="logo" 
                />
              </span>
              
            </a>

            <div className="hidden md:flex items-center space-x-8">
              <a href="/documentation" className="text-[19px] text-white duration-300 hover:drop-shadow-[0_0_25px_rgba(0,255,255,0.8)] font-bold hover:text-cyan-400 transition-colors tracking-widest uppercase">Documentation</a>
              <a href="/contact" className="text-[19px] text-white duration-300 hover:drop-shadow-[0_0_25px_rgba(0,255,255,0.8)] font-bold hover:text-cyan-400 transition-colors tracking-widest uppercase">Contact</a>

              <div className="relative group">
                <a href='/tools' className="border text-white border-cyan-500/50 px-4 py-1.5 rounded text-[14px] font-bold hover:bg-cyan-500 hover:text-black transition-all flex items-center gap-2 tracking-widest uppercase outline-none">
                  Tools <span className="text-[19px] group-hover:rotate-180 transition-transform duration-300">▼</span>
                </a>
                
                <div className="absolute top-full right-0 mt-2 w-[620px] bg-black border border-cyan-500/30 p-8 rounded shadow-[0_20px_50px_rgba(0,0,0,1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-4">
                  <div className="grid grid-cols-3 gap-6">
                    {toolCategories.map((cat, idx) => (
                      <div key={idx} className="border-r border-cyan-500/10 last:border-0 pr-4 last:pr-0">
                        <h4 className="text-[16px] font-bold font-black text-cyan-500 mb-4 tracking-widest uppercase italic">{cat.name}</h4>
                        <ul className="space-y-3">
                          {cat.tools.map((tool, tIdx) => (
                            <li key={tIdx}>
                              <a href={tool.link} className={`text-[16px] font-bold block transition-all ${tool.status === 'active' ? 'text-gray-400 hover:text-cyan-400 hover:translate-x-1' : 'text-gray-700 cursor-not-allowed'}`}>
                                {tool.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            
              <a href="/about" className="text-[19px] text-white duration-300 hover:drop-shadow-[0_0_25px_rgba(0,255,255,0.8)] font-bold hover:text-cyan-400 transition-colors tracking-widest uppercase">About us</a>

              <div className="relative group">
                <button className="border cursor-pointer text-white border-cyan-500/50 px-4 py-1.5 rounded text-[14px] font-bold hover:bg-cyan-500 hover:text-black transition-all flex items-center gap-2 tracking-widest uppercase outline-none">
                  Support us <span className="text-[19px] group-hover:rotate-180 transition-transform duration-300">▼</span>
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-black border border-cyan-500/30 p-2 rounded shadow-[0_10px_30px_rgba(0,0,0,1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-[60]">
                  <div className="flex flex-col gap-1">
                    <a href="/shop" className="flex items-center gap-3 px-4 py-3 text-[19px] font-bold text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all rounded">SHOP</a>
                    <div className="h-[1px] bg-cyan-500/10 mx-2 my-1"></div> 
                    <a href="/donate" className="flex items-center gap-3 px-4 py-3 text-[19px] font-bold text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all rounded">DONATE</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-3 border border-cyan-900/50 px-6 py-1.5 rounded bg-cyan-950/10">
               <span className="text-lg">🇵🇸</span>
               <div className="flex flex-col">
                  <span className="text-[19px] font-bold text-cyan-400 leading-none">Free Palestine</span>
               </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="py-20 border-t border-cyan-500/10 bg-black mt-20 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

            <div className="max-w-7.5xl mx-auto px-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                
              <div className="space-y-8 flex flex-col items-start">
                <a href="/" className="block group">
                  <div className="w-60 h-auto transition-all duration-500 ease-in-out group-hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.6)] group-hover:scale-105">
                    <img 
                      src="/icon.png" 
                      alt="AIMFROST Logo" 
                      className="w-full h-auto brightness-110 object-contain" 
                    />
                  </div>
                </a>
                
                <div className="max-w-[290px]"> {/* حصر عرض النص ليتوازن مع الشعار */}
                  <p className="text-zinc-500 text-[13px] leading-relaxed font-bold italic tracking-wide">
                    High-velocity passive reconnaissance framework designed for precision infrastructure analysis.
                  </p>
                </div>
              </div>

                {/* Column 2: Platform */}
                <div>
                  <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6 italic border-l-2 border-cyan-500 pl-3">Platform</h4>
                  <ul className="space-y-4 text-zinc-400 font-bold text-sm">
                    <li><a href="/tools" className="hover:text-cyan-400 transition-colors uppercase tracking-tighter">Tools</a></li>
                    <li><a href="/documentation" className="hover:text-cyan-400 transition-colors uppercase tracking-tighter">Documentation</a></li>
                    <li><a href="/about" className="hover:text-cyan-400 transition-colors uppercase tracking-tighter">About us</a></li>
                    <li><a href="/contact" className="hover:text-cyan-400 transition-colors uppercase tracking-tighter">Contact</a></li>
                  </ul>
                </div>

                {/* Column 3: Legal */}
                <div>
                  <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6 italic border-l-2 border-cyan-500 pl-3">Legal Protocol</h4>
                  <ul className="space-y-4 text-zinc-400 font-bold text-sm">
                    <li><a href="/privacy" className="hover:text-cyan-400 transition-colors uppercase tracking-tighter">Privacy Policy</a></li>
                    <li><a href="/terms" className="hover:text-cyan-400 transition-colors uppercase tracking-tighter">Terms Of Service</a></li>
                    <li><a href="/disclaimer" className="hover:text-cyan-400 transition-colors uppercase tracking-tighter">Legal Disclaimer</a></li>
                  </ul>
                </div>

                {/* Column 4: System Status */}
                <div>
                  <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6 italic border-l-2 border-cyan-500 pl-3">Core_Status</h4>
                  <div className="p-4 bg-zinc-950 border border-white/5 rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                      <span className="text-[10px] text-cyan-500 font-black tracking-widest uppercase">System Online</span>
                    </div>
                    <p className="text-[10px] text-zinc-600 font-bold leading-tight uppercase">
                      v4.0.1 Global Node: Active <br />
                      Last Sync: 2026-01-05
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Bar: Copyright */}
              <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-white font-black text-base tracking-[0.1em] uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                  &copy; 2026 <span className="text-cyan-500">AIMFROST</span> // ALL RIGHTS RESERVED.
                </p>
                
                <div className="flex gap-8 text-[14px] text-cyan-400 font-black italic uppercase tracking-tighter">
                  <span className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                    <span className="w-1 h-1 bg-cyan-500"></span> NO BRUTEFORCE
                  </span>
                  <span className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                    <span className="w-1 h-1 bg-cyan-500"></span> 100% OSINT
                  </span>
                </div>
              </div>
            </div>
          </footer>
      </body>
    </html>
  );
}
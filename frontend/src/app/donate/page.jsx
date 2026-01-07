"use client";

import React, { useState } from 'react';

export default function DonatePage() {
  const [copied, setCopied] = useState('');

  const cryptoWallets = [
    { name: "Bitcoin (BTC)", address: "bc1qxy2kgdy6ynf3z7r1v3p...", icon: "₿" },
    { name: "Ethereum (ETH)", address: "0x71C7656EC7ab88b098defB...", icon: "Ξ" },
    { name: "Monero (XMR)", address: "44AFFq5kSiGBo3SCTo7WU8...", icon: "ɱ" }
  ];

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(address);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono py-24 px-10">
      <div className="max-w-5xl mx-auto">
        
        <header className="mb-20 border-l-4 border-cyan-500 pl-8">
          <h1 className="text-6xl font-black uppercase italic tracking-tighter">Support <span className="text-cyan-500">Operation</span></h1>
          <p className="text-zinc-500 text-xs mt-2 uppercase tracking-[0.3em] font-bold">Help us maintain global reconnaissance infrastructure</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Buy Me A Coffee / Ko-fi */}
          <a href="https://ko-fi.com" target="_blank" className="p-8 bg-zinc-950 border border-zinc-900 hover:border-cyan-500 transition-all group relative">
            <div className="text-cyan-500 mb-4 text-3xl italic">01/</div>
            <h3 className="text-xl font-black uppercase mb-2">Ko-fi / Coffee</h3>
            <p className="text-zinc-500 text-xs leading-relaxed mb-6 italic">Support the developers with a quick digital coffee to keep the code running.</p>
            <span className="text-[10px] font-black uppercase text-cyan-500 group-hover:underline">Initialize Uplink →</span>
          </a>

          

          {/* PayPal */}
          <a href="https://paypal.me" target="_blank" className="p-8 bg-zinc-950 border border-zinc-900 hover:border-cyan-500 transition-all group relative">
            <div className="text-cyan-500 mb-4 text-3xl italic">03/</div>
            <h3 className="text-xl font-black uppercase mb-2">Direct PayPal</h3>
            <p className="text-zinc-500 text-xs leading-relaxed mb-6 italic">Simple, direct financial contribution via global payment processor.</p>
            <span className="text-[10px] font-black uppercase text-cyan-500 group-hover:underline">Instant Transfer →</span>
          </a>
        </div>

        {/* Crypto Section */}
        <div className="bg-zinc-950 border border-zinc-900 p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 text-[8px] text-zinc-800 font-black tracking-widest uppercase">Encryption_Required</div>
          <h2 className="text-2xl font-black uppercase mb-10 italic border-b border-zinc-900 pb-4">Crypto Donations</h2>
          
          <div className="space-y-6">
            {cryptoWallets.map((wallet, idx) => (
              <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-zinc-900 hover:bg-zinc-900/30 transition-all">
                <div className="flex items-center gap-4">
                  <span className="text-2xl text-cyan-500">{wallet.icon}</span>
                  <div>
                    <h4 className="text-xs font-black uppercase">{wallet.name}</h4>
                    <p className="text-[10px] text-zinc-600 font-mono break-all">{wallet.address}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleCopy(wallet.address)}
                  className="px-6 py-2 border border-cyan-500/50 text-[10px] font-black uppercase hover:bg-cyan-500 hover:text-black transition-all cursor-pointer"
                >
                  {copied === wallet.address ? 'COPIED_TO_CLIPBOARD' : 'COPY_ADDRESS'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Support Palestine Footer */}
        <div className="mt-16 p-8 border border-cyan-500/20 bg-cyan-950/5 flex flex-col items-center text-center">
            <span className="text-4xl mb-4">🇵🇸</span>
            <h3 className="text-xl font-black uppercase text-cyan-400 mb-2">Solidarity Note</h3>
            <p className="text-zinc-500 text-xs max-w-2xl font-bold italic">
                A portion of all contributions received via AIMFROST will be redirected to humanitarian aid efforts in Palestine. We stand for justice and technological freedom.
            </p>
        </div>

      </div>
    </div>
  );
}
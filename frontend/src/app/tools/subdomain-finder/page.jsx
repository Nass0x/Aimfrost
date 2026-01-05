"use client";
import React, { useState } from 'react';

export default function SubDomainFinder() {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExecute = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://192.168.1.24/aimfrost-react/backend/subfinder.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain })
      });
      const result = await response.json();
      if (result.success) {
        setResults(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to connect to the discovery engine.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-cyan-500/30">
      
      {/* Header Section - المسمى المعتمد في الـ Layout */}
      <section className="relative pt-32 pb-20 px-10 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-black to-black opacity-50" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="space-y-6">
              <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter uppercase leading-none">
                SubDomain <span className="text-cyan-500 text-glow">Finder</span>
              </h1>
              <div className="max-w-3xl border-l-2 border-cyan-500 pl-8 py-2">
                <h2 className="text-cyan-400 font-bold uppercase tracking-widest mb-2">Passive Reconnaissance Module</h2>
                <p className="text-zinc-500 text-xl leading-relaxed italic">
                  Utilizes extensive passive intelligence sources to map out the organizational digital footprint and discover hidden assets.
                </p>
              </div>
            </div>
            
            {/* Tool Stats Box - تم تنظيفه من النسخ البرمجية */}
            <div className="hidden lg:grid grid-cols-2 gap-6 p-8 border border-white/10 bg-zinc-950/50 rounded-2xl backdrop-blur-xl">
              <div className="space-y-1">
                <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Type</div>
                <div className="text-cyan-500 font-bold">Passive Search</div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Priority</div>
                <div className="text-white font-bold">Discovery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Execution Area */}
      <section className="py-20 px-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-cyan-500/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
            <div className="relative bg-zinc-950 border border-white/10 p-2 rounded-2xl flex items-center shadow-2xl">
              <span className="pl-6 text-cyan-500 font-black text-xl">$</span>
              <input 
                type="text" 
                placeholder="ENTER TARGET DOMAIN"
                className="w-full bg-transparent p-6 outline-none text-xl font-bold text-cyan-400 placeholder:text-zinc-900"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
              <button 
                onClick={handleExecute}
                disabled={loading}
                className="bg-cyan-500 text-black px-12 py-5 rounded-xl font-black text-lg hover:bg-white transition-all disabled:opacity-50"
              >
                {loading ? "SEARCHING..." : "DISCOVER"}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="mt-6 p-4 border border-red-900/30 bg-red-900/10 text-red-500 text-center font-bold rounded-xl">
              {error}
            </div>
          )}
        </div>
      </section>

      {/* Results Display */}
      {results && (
        <section className="pb-40 px-10 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/5">
              <h3 className="text-3xl font-black uppercase tracking-tighter">
                Identified <span className="text-cyan-500">Assets</span>
              </h3>
              <div className="px-6 py-2 bg-zinc-900 border border-white/10 rounded-full text-cyan-500 font-black text-xs tracking-widest uppercase">
                Count: {results.count}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.subdomains.map((sub, index) => (
                <div key={index} className="group p-6 bg-zinc-950 border border-white/5 rounded-xl hover:border-cyan-500/50 transition-all hover:translate-y-[-4px]">
                  <div className="text-[10px] text-zinc-800 font-black mb-3 group-hover:text-cyan-700 transition-colors uppercase">Node_{index + 1}</div>
                  <div className="text-zinc-300 font-bold break-all group-hover:text-white transition-colors">{sub}</div>
                  <div className="mt-4 flex justify-end">
                    <a href={`http://${sub}`} target="_blank" className="text-[10px] text-cyan-500 font-black hover:text-white transition-all uppercase tracking-widest">Connect →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Documentation Section - تم إزالة التلميحات الشخصية */}
      <section className="py-32 px-10 bg-[#030303] border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-4xl font-black uppercase tracking-widest border-l-4 border-cyan-500 pl-8">Engine Specification</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h4 className="text-cyan-500 font-black uppercase tracking-widest text-sm">Operation</h4>
              <p className="text-zinc-500 leading-loose">
                Designed for high-speed passive enumeration, this module queries multiple intelligence databases to construct a complete map of public-facing subdomains without direct interaction with target infrastructure.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-cyan-500 font-black uppercase tracking-widest text-sm">Capabilities</h4>
              <ul className="text-zinc-500 space-y-3">
                <li className="flex gap-3 font-bold uppercase text-xs tracking-tighter"> <span className="text-cyan-500">■</span> Multi-source data aggregation</li>
                <li className="flex gap-3 font-bold uppercase text-xs tracking-tighter"> <span className="text-cyan-500">■</span> Automated asset validation</li>
                <li className="flex gap-3 font-bold uppercase text-xs tracking-tighter"> <span className="text-cyan-500">■</span> Structured intelligence output</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .text-glow { text-shadow: 0 0 40px rgba(34, 211, 238, 0.5); }
      `}</style>
    </div>
  );
}
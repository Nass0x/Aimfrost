"use client";
import React, { useState } from 'react';

export default function PortScanner() {
  const [target, setTarget] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);

    try {
      const response = await fetch('http://192.168.1.24/aimfrost-react/backend/naabu.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target })
      });
      const result = await response.json();
      if (result.success) setResults(result.data);
    } catch (err) {
      console.error("Connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-cyan-500/30">
      
      {/* Header with Title & Description - المسمى الجديد من الـ Layout */}
      <section className="relative pt-32 pb-20 px-10 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-black to-black opacity-50" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter uppercase leading-none mb-6">
            Port<span className="text-cyan-500 text-glow"> scanner</span>
          </h1>
          <div className="max-w-3xl border-l-2 border-cyan-500 pl-8 py-2">
            <h2 className="text-cyan-400 font-bold uppercase tracking-widest mb-2">Advanced Port Enumeration</h2>
            <p className="text-zinc-500 text-lg leading-relaxed italic">
              High-performance port scanning engine designed for rapid identification of open network services 
              and infrastructure mapping.
            </p>
          </div>
        </div>
      </section>

      {/* Action Area */}
      <section className="py-20 px-10">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleScan} className="relative group mb-20">
            <div className="absolute -inset-1 bg-cyan-500/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700" />
            <div className="relative bg-zinc-950 border border-white/10 p-2 rounded-2xl flex items-center shadow-2xl">
              <span className="pl-6 text-cyan-500 font-black text-xl">$</span>
              <input 
                type="text" 
                placeholder="TARGET DOMAIN (e.g. kick.com)"
                className="w-full bg-transparent p-6 outline-none text-xl font-bold text-cyan-400 placeholder:text-zinc-900"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-cyan-500 text-black px-12 py-5 rounded-xl font-black text-lg hover:bg-white transition-all min-w-[180px]"
              >
                {loading ? "SCANNING..." : "SCAN"}
              </button>
            </div>
          </form>

          {/* Features Section - تم إزالة النصوص الخاصة بالمطور */}
          {!results && !loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 animate-in fade-in duration-1000">
               <Feature title="Fast Execution" desc="Built for massive concurrency to ensure minimal delay during discovery." />
               <Feature title="Smart Discovery" desc="Optimized algorithms for identifying active services across network nodes." />
               <Feature title="Service Audit" desc="Accurate mapping of communication ports to verify external infrastructure exposure." />
            </div>
          )}

          {/* Clean Port Results */}
          {results && (
            <div className="animate-in slide-in-from-bottom duration-700">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-white/10 flex-grow" />
                <span className="text-cyan-500 font-black text-xs uppercase tracking-[0.4em]">Identified Open Ports</span>
                <div className="h-px bg-white/10 flex-grow" />
              </div>

              {results.ports.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {results.ports.map((port, i) => (
                    <div key={i} className="group relative">
                      <div className="absolute -inset-0.5 bg-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                      <div className="relative bg-zinc-950 border border-cyan-500/30 p-8 rounded-2xl text-center shadow-xl">
                        <div className="text-zinc-600 text-[10px] font-bold uppercase mb-2 tracking-tighter">Status: Open</div>
                        <div className="text-cyan-400 text-3xl font-black tracking-tight">{port.split(':')[1]}</div>
                        <div className="text-zinc-800 text-[9px] mt-2 font-mono">{port.split(':')[0]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 border border-dashed border-white/5 rounded-3xl">
                  <p className="text-zinc-700 font-bold uppercase italic tracking-widest">No Open Ports Discovered</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .text-glow { text-shadow: 0 0 40px rgba(34, 211, 238, 0.5); }
      `}</style>
    </div>
  );
}

function Feature({ title, desc }) {
    return (
        <div className="group p-8 border border-white/5 bg-zinc-950/20 rounded-3xl hover:border-cyan-500/20 transition-all">
            <div className="w-8 h-1 bg-cyan-500 mb-6 group-hover:w-16 transition-all duration-500" />
            <h4 className="text-white font-black uppercase text-sm mb-3 tracking-widest">{title}</h4>
            <p className="text-zinc-600 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}
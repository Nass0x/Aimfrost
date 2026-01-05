"use client";
import React, { useState } from 'react';

export default function DNSXProber() {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScan = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch('http://192.168.1.24/aimfrost-react/backend/dnsx.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: domain.trim() })
      });
      const res = await response.json();
      if (res.success) {
        setResults(res.data);
      } else {
        setError(res.error);
      }
    } catch (err) {
      setError("ENGINE_OFFLINE: Connection to DNSX resolution core failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-cyan-500/30">
      
      {/* Header Section - التنسيق الموحد */}
      <section className="relative pt-32 pb-20 px-10 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-black to-black opacity-50" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="space-y-6">
            <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter uppercase leading-none mb-6">
              DNSX<span className="text-cyan-500 text-glow"> Prober</span>
            </h1>
            <div className="max-w-3xl border-l-2 border-cyan-500 pl-8 py-2">
              <h2 className="text-cyan-400 font-bold uppercase tracking-widest mb-2">High-Density DNS Toolkit</h2>
              <p className="text-zinc-500 text-xl leading-relaxed italic">
                Advanced multi-purpose DNS resolution and probing module. Executing recursive queries to map host survival and record integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Input Area */}
      <section className="py-20 px-10">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleScan} className="relative group mb-20">
            <div className="absolute -inset-1 bg-cyan-500/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700" />
            <div className="relative bg-zinc-950 border border-white/10 p-2 rounded-2xl flex items-center shadow-2xl">
              <span className="pl-6 text-cyan-500 font-black text-xl">#</span>
              <input 
                type="text" 
                placeholder="TARGET DOMAIN (e.g. cloudflare.com)"
                className="w-full bg-transparent p-6 outline-none text-xl font-bold text-cyan-400 placeholder:text-zinc-900"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-cyan-500 text-black px-12 py-5 rounded-xl font-black text-lg hover:bg-white transition-all min-w-[180px]"
              >
                {loading ? "PROBING..." : "START RECON"}
              </button>
            </div>
          </form>
          
          {error && (
            <div className="p-4 bg-red-900/10 border border-red-900/50 text-red-500 text-center font-bold rounded-xl uppercase text-xs">
              {error}
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      {results.length > 0 && (
        <section className="pb-40 px-10 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/5">
              <h3 className="text-3xl font-black uppercase tracking-tighter">
                Resolved <span className="text-cyan-500 text-glow">Datasets</span>
              </h3>
              <div className="px-6 py-2 bg-zinc-900 border border-white/10 rounded-full text-cyan-500 font-black text-xs tracking-widest uppercase">
                Entries: {results.length}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((rec, idx) => (
                <div key={idx} className="group p-8 bg-zinc-950 border border-white/5 rounded-3xl hover:border-cyan-500/50 transition-all hover:translate-y-[-4px]">
                  <div className="flex justify-between items-center mb-6">
                    <span className="px-4 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-[10px] font-black rounded uppercase tracking-widest">
                      {rec.type || "A"}
                    </span>
                    <span className="text-[10px] text-zinc-700 font-bold tracking-[0.2em] uppercase group-hover:text-zinc-500 transition-colors">
                      TTL: {rec.ttl || 'N/A'}
                    </span>
                  </div>
                  <div className="text-zinc-600 text-[10px] mb-2 truncate font-mono uppercase tracking-tighter">{rec.host}</div>
                  <div className="text-lg font-bold text-white break-all leading-tight group-hover:text-cyan-400 transition-colors">
                    {Array.isArray(rec.a) ? rec.a.join(', ') : (rec.answer || rec.value || "NULL_VALUE")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Placeholder State */}
      {results.length === 0 && !loading && !error && (
        <section className="pb-40 px-10">
          <div className="max-w-4xl mx-auto h-64 border border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center bg-zinc-950/20 group">
            <div className="text-zinc-800 font-black uppercase tracking-[0.4em] text-xl group-hover:text-zinc-700 transition-colors">
              Await_Target_Input
            </div>
            <div className="mt-4 w-12 h-0.5 bg-zinc-900 group-hover:w-24 group-hover:bg-cyan-500 transition-all duration-700" />
          </div>
        </section>
      )}

      <style jsx>{`
        .text-glow { text-shadow: 0 0 40px rgba(34, 211, 238, 0.5); }
      `}</style>
    </div>
  );
}
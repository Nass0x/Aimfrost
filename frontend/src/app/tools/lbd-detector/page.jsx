"use client";
import React, { useState } from 'react';

export default function LBDDetector() {
  const [target, setTarget] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExecute = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); 

      const response = await fetch('http://192.168.1.24/aimfrost-react/backend/lbd.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: target.trim() }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      const result = await response.json();
      
      if (result.success) {
        setResults(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("SCAN_TIMEOUT: The infrastructure is highly resilient or the engine is offline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-cyan-500/30">
      
      {/* --- Optimized Header Section --- */}
      <section className="relative pt-32 pb-20 px-10 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-black to-black opacity-50" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1 border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-black uppercase tracking-widest">
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                Active Module: LBD_INFRA_DETECT
              </div>
              <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter uppercase leading-none">
                LOAD <span className="text-cyan-500 text-glow">BALANCER</span>
              </h1>
              <p className="text-zinc-500 text-xl md:text-2xl max-w-3xl font-medium leading-relaxed italic border-l-2 border-cyan-500 pl-8">
                Advanced infrastructure interrogation engine. Detecting server clusters by analyzing DNS patterns and session-based HTTP differentials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Execution Area --- */}
      <section className="py-20 px-10">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleExecute} className="relative group">
            <div className="absolute -inset-1 bg-cyan-500/20 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-700"></div>
            <div className="relative bg-zinc-950 border border-white/10 p-2 rounded-2xl flex items-center shadow-2xl">
              <span className="pl-6 text-cyan-500 font-black text-xl">$</span>
              <input 
                type="text" 
                placeholder="ENTER TARGET DOMAIN (e.g. exemple.com)"
                className="w-full bg-transparent p-6 outline-none text-xl font-bold text-cyan-400 placeholder:text-zinc-900"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-cyan-500 text-black px-12 py-5 rounded-xl font-black text-lg hover:bg-white transition-all min-w-[180px]"
              >
                {loading ? "PROBING..." : "DETECT"}
              </button>
            </div>
          </form>
          {loading && (
            <div className="mt-12 text-center animate-pulse">
              <p className="text-cyan-500 font-black text-[10px] uppercase tracking-[0.6em] mb-4">Interrogating Node Responses: Session Cycle 1/50</p>
              <div className="h-1 w-64 bg-zinc-900 mx-auto rounded-full overflow-hidden">
                 <div className="h-full bg-cyan-500 w-1/3 animate-[loading_2s_infinite]"></div>
              </div>
            </div>
          )}
          {error && (
            <div className="mt-8 p-4 bg-red-900/10 border border-red-900/50 text-red-500 text-center font-bold rounded-xl uppercase text-xs">
              {error}
            </div>
          )}
        </div>
      </section>

      {/* --- Visual Aid --- */}
      

      {/* --- Intelligence Explanation Section --- */}
      {!results && !loading && (
        <section className="pb-40 px-10">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                <FeatureBox 
                    title="DNS Interrogation" 
                    desc="Scans for multiple A records and CNAME flattening to identify high-availability round-robin configurations."
                />
                <FeatureBox 
                    title="Fingerprint Differential" 
                    desc="Correlates unique server fingerprints across concurrent sessions to detect hidden backend node rotation."
                />
                <FeatureBox 
                    title="Header Timing" 
                    desc="Identifies micro-fluctuations in 'Date' and 'Server' headers indicative of multi-regional cluster distribution."
                />
            </div>
        </section>
      )}

      {/* --- Results Display --- */}
      {results && (
        <section className="pb-40 px-10 animate-in fade-in slide-in-from-bottom duration-1000">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Infrastructure <span className="text-cyan-500">Pipeline</span></h3>
                <div className="px-6 py-2 bg-zinc-900 border border-white/10 rounded-full text-cyan-500 font-black text-[10px] tracking-widest uppercase">
                    Target_ID: {results.target}
                </div>
            </div>
            
            <div className="bg-zinc-950 border border-white/5 rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden group">
               <div className="space-y-2 relative z-10">
                 {results.raw_output.map((line, i) => {
                   const isHighlight = /FOUND|RESULT|DETECTION|Detected/.test(line);
                   return (
                     <div key={i} className="flex gap-8 group/line">
                       <span className="text-zinc-800 shrink-0 w-8 select-none font-bold italic">[{i.toString().padStart(2, '0')}]</span>
                       <span className={`break-words leading-relaxed transition-colors ${isHighlight ? 'text-cyan-400 font-black' : 'text-zinc-600 group-hover/line:text-zinc-300'}`}>
                         {line}
                       </span>
                     </div>
                   );
                 })}
               </div>
               
               {/* Background Watermark */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] text-[25rem] font-black select-none pointer-events-none group-hover:opacity-[0.04] transition-all duration-1000">
                 LBD
               </div>
            </div>
          </div>
        </section>
      )}
      
      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .text-glow {
          text-shadow: 0 0 40px rgba(34, 211, 238, 0.5);
        }
      `}</style>
    </div>
  );
}

function FeatureBox({ title, desc }) {
    return (
        <div className="p-10 border border-white/5 bg-zinc-950/20 rounded-[2rem] hover:border-cyan-500/30 transition-all group overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-0 bg-cyan-500 group-hover:h-full transition-all duration-500" />
            <h4 className="text-white font-black uppercase tracking-widest mb-4 group-hover:text-cyan-500 transition-colors">{title}</h4>
            <p className="text-zinc-600 text-sm leading-relaxed font-bold">{desc}</p>
        </div>
    );
}
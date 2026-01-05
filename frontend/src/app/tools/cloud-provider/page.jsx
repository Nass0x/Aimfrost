"use client";
import React, { useState } from 'react';

export default function CDNCheck() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheck = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://192.168.1.24/aimfrost-react/backend/cdncheck.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: input.trim() })
      });
      const res = await response.json();
      if (res.success) {
        setResult(res.data);
      } else {
        setError(res.error);
      }
    } catch (err) {
      setError("ENGINE_OFFLINE: Connection to infrastructure analysis core failed.");
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
              CDN <span className="text-cyan-500 text-glow">Detector</span>
            </h1>
            <div className="max-w-3xl border-l-2 border-cyan-500 pl-8 py-2">
              <h2 className="text-cyan-400 font-bold uppercase tracking-widest mb-2">Cloud Infrastructure Discovery</h2>
              <p className="text-zinc-500 text-xl leading-relaxed italic">
                Analyzing IP addresses and hostnames to identify underlying cloud providers, Content Delivery Networks, and edge security layers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Input Area */}
      <section className="py-20 px-10">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleCheck} className="relative group mb-10">
            <div className="absolute -inset-1 bg-cyan-500/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700" />
            <div className="relative bg-zinc-950 border border-white/10 p-2 rounded-2xl flex items-center shadow-2xl">
              <span className="pl-6 text-cyan-500 font-black text-xl">$</span>
              <input 
                type="text" 
                placeholder="IP ADDRESS OR HOSTNAME (e.g. 1.1.1.1)"
                className="w-full bg-transparent p-6 outline-none text-xl font-bold text-cyan-400 placeholder:text-zinc-900"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button 
                type="submit"
                disabled={loading} 
                className="bg-cyan-500 text-black px-12 py-5 rounded-xl font-black text-lg hover:bg-white transition-all min-w-[180px]"
              >
                {loading ? "ANALYZING..." : "IDENTIFY"}
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
      {result && (
        <section className="pb-40 px-10 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="max-w-6xl mx-auto">
            {result.is_protected ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatusCard label="CDN_PROVIDER" value={result.cdn_name || "NOT_DETECTED"} active={!!result.cdn} />
                  <StatusCard label="CLOUD_PROVIDER" value={result.cloud_name || "NOT_DETECTED"} active={!!result.cloud} />
                  <StatusCard label="WAF_PROTECTION" value={result.waf_name || "NOT_DETECTED"} active={!!result.waf} />
                </div>
                
                <div className="p-10 bg-zinc-950 border border-white/5 rounded-3xl relative overflow-hidden group hover:border-cyan-500/30 transition-all">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                  </div>
                  <div className="text-[10px] text-zinc-700 font-black mb-6 tracking-[0.4em] uppercase">Target_Intelligence_Block</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="text-zinc-500 text-xs mb-1 uppercase font-bold tracking-tighter">Resolution_IP</div>
                      <div className="text-2xl font-black text-cyan-500 tracking-tighter">{result.ip || input}</div>
                    </div>
                    <div>
                      <div className="text-zinc-500 text-xs mb-1 uppercase font-bold tracking-tighter">Network_CIDR</div>
                      <div className="text-2xl font-black text-white tracking-tighter">{result.item || "NULL_DATA"}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-32 border border-dashed border-white/5 rounded-[3rem] text-center bg-zinc-950/20">
                <div className="text-zinc-800 font-black text-6xl mb-6 tracking-tighter uppercase">Direct_Connection</div>
                <p className="text-zinc-600 uppercase text-xs tracking-[0.3em] font-bold">Infrastructure bypass detected. No proxy or cloud shield identified.</p>
              </div>
            )}
          </div>
        </section>
      )}

      <style jsx>{`
        .text-glow { text-shadow: 0 0 40px rgba(34, 211, 238, 0.5); }
      `}</style>
    </div>
  );
}

function StatusCard({ label, value, active }) {
  return (
    <div className={`p-10 border rounded-3xl transition-all duration-700 relative overflow-hidden group ${active ? 'bg-cyan-500/[0.03] border-cyan-500/30' : 'bg-zinc-950 border-white/5 opacity-40'}`}>
      <div className="text-[10px] text-zinc-600 font-black mb-8 tracking-widest uppercase">{label}</div>
      <div className={`text-3xl font-black tracking-tighter uppercase italic ${active ? 'text-white' : 'text-zinc-800'}`}>
        {value}
      </div>
      {active && (
        <div className="mt-6 flex items-center gap-3">
          <span className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
          <span className="text-[10px] font-black text-cyan-500 tracking-widest uppercase">Verified_Shield</span>
        </div>
      )}
    </div>
  );
}
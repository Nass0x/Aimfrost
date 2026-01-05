"use client";
import React, { useState } from 'react';

export default function TLSAnalyzer() {
  const [target, setTarget] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScan = async (e) => {
    if (e) e.preventDefault();
    if (!target) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://192.168.1.24/aimfrost-react/backend/tlsx.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: target.trim() })
      });
      const res = await response.json();
      if (res.success) {
        setResult(res.data);
      } else {
        setError(res.error);
      }
    } catch (err) {
      setError("ENGINE_OFFLINE: TLS analysis core failed to respond.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-cyan-500/30">
      
      {/* Header Section - المسمى المعتمد في الـ Layout */}
      <section className="relative pt-32 pb-20 px-10 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-black to-black opacity-50" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="space-y-6">
            <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter uppercase leading-none mb-6">
              TLS <span className="text-cyan-500 text-glow">Analyzer</span>
            </h1>
            <div className="max-w-3xl border-l-2 border-cyan-500 pl-8 py-2">
              <h2 className="text-cyan-400 font-bold uppercase tracking-widest mb-2">Cryptographic Intelligence Module</h2>
              <p className="text-zinc-500 text-xl leading-relaxed italic">
                Deep inspection of SSL/TLS handshakes, certificate chain validation, and cipher suite interrogation to identify cryptographic vulnerabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Input Area */}
      <section className="py-20 px-10">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleScan} className="relative group mb-10">
            <div className="absolute -inset-1 bg-cyan-500/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700" />
            <div className="relative bg-zinc-950 border border-white/10 p-2 rounded-2xl flex items-center shadow-2xl">
              <span className="pl-6 text-cyan-500 font-black text-xl">$</span>
              <input 
                type="text" 
                placeholder="ENTER HOSTNAME (e.g. secure-target.com)"
                className="w-full bg-transparent p-6 outline-none text-xl font-bold text-cyan-400 placeholder:text-zinc-900"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-cyan-500 text-black px-12 py-5 rounded-xl font-black text-lg hover:bg-white transition-all min-w-[180px]"
              >
                {loading ? "PROBING..." : "ANALYZE"}
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

      {/* Results Display */}
      {result && (
        <section className="pb-40 px-10 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Certificate Identity Card */}
            <div className="lg:col-span-2 bg-zinc-950 border border-white/5 p-12 rounded-[2.5rem] relative overflow-hidden group hover:border-cyan-500/30 transition-all">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                 <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              
              <h3 className="text-zinc-700 text-[10px] font-black uppercase mb-12 tracking-[0.4em]">Certificate_Chain_Identity</h3>
              
              <div className="space-y-10">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase font-black mb-3 tracking-widest">Common Name (CN)</div>
                  <div className="text-5xl md:text-6xl font-black text-white break-all tracking-tighter">
                    {result.subject_cn || result.host}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-white/5">
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase font-black mb-3 tracking-widest">Protocol Version</div>
                    <div className="text-3xl font-black text-cyan-500 italic uppercase tracking-tighter">
                        {result.tls_version || "UNKNOWN"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase font-black mb-3 tracking-widest">Cipher Configuration</div>
                    <div className="text-sm font-mono text-zinc-400 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5 font-bold">
                        {result.cipher || "UNDEFINED_CIPHER"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Integrity Status Card */}
            <div className="bg-zinc-950 border border-white/5 p-12 rounded-[2.5rem] flex flex-col justify-between hover:border-cyan-500/20 transition-all">
              <div>
                <h3 className="text-zinc-700 text-[10px] font-black uppercase mb-12 tracking-[0.4em]">Security_Flags</h3>
                <div className="space-y-4">
                  <StatusRow label="Self-Signed" value={result['self-signed']} />
                  <StatusRow label="Expired Certificate" value={result.expired} />
                  <StatusRow label="Identity Mismatch" value={result.mismatched} />
                  <StatusRow label="Revocation Check" value={result.revoked} />
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/5">
                <div className="text-[10px] text-zinc-700 font-black uppercase mb-2">Network Resolution</div>
                <div className="text-white font-bold text-sm tracking-widest">
                    {result.ip || "Direct Peer Connection"}
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      <style jsx>{`
        .text-glow { text-shadow: 0 0 40px rgba(34, 211, 238, 0.5); }
      `}</style>
    </div>
  );
}

function StatusRow({ label, value }) {
    return (
        <div className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${value ? 'border-red-500/20 bg-red-500/5 text-red-500' : 'border-green-500/20 bg-green-500/5 text-green-500'}`}>
            <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
            <span className={`text-[10px] font-black px-4 py-1 rounded-full border ${value ? 'border-red-500/30 bg-red-500/10' : 'border-green-500/30 bg-green-500/10'}`}>
                {value ? "FAILED" : "PASSED"}
            </span>
        </div>
    );
}
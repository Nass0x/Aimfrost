"use client";
import React, { useState } from 'react';

export default function ProfileHunter() {
  const [username, setUsername] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExecute = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('http://192.168.1.24/aimfrost-react/backend/sherlock.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim() })
      });
      
      const result = await response.json();
      
      if (result.success && result.data) {
        setResults(result.data);
      } else {
        setError(result.error || "OSINT_FAILURE: No social profiles detected for this handle.");
      }
    } catch (err) {
      setError("ENGINE_OFFLINE: Connection to the analysis core failed.");
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
              Profile<span className="text-cyan-500 text-glow"> Hunter</span>
            </h1>
            <div className="max-w-3xl border-l-2 border-cyan-500 pl-8 py-2">
              <h2 className="text-cyan-400 font-bold uppercase tracking-widest mb-2">Social Identity Intelligence</h2>
              <p className="text-zinc-500 text-xl leading-relaxed italic">
                Cross-platform digital identity tracking. Automated discovery of user handles across 400+ global networks to map digital footprints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Area */}
      <section className="py-20 px-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-cyan-500/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700" />
            <form onSubmit={handleExecute} className="relative bg-zinc-950 border border-white/10 p-2 rounded-2xl flex items-center shadow-2xl">
              <span className="pl-6 text-cyan-500 font-black text-xl">@</span>
              <input 
                type="text" 
                placeholder="ENTER USERNAME (e.g. john_doe)"
                className="w-full bg-transparent p-6 outline-none text-xl font-bold text-cyan-400 placeholder:text-zinc-900"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-cyan-500 text-black px-12 py-5 rounded-xl font-black text-lg hover:bg-white transition-all min-w-[180px]"
              >
                {loading ? "TRACING..." : "EXECUTE"}
              </button>
            </form>
          </div>
          {error && (
            <div className="mt-8 p-4 bg-red-900/10 border border-red-900/50 text-red-500 text-center font-bold rounded-xl uppercase text-xs">
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
                Mapped <span className="text-cyan-500 text-glow">Identities</span>
              </h3>
              <div className="px-6 py-2 bg-zinc-900 border border-white/10 rounded-full text-cyan-500 font-black text-xs tracking-widest uppercase">
                Count: {results.count}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.accounts.map((acc, index) => (
                <div key={index} className="group p-6 bg-zinc-950 border border-white/5 rounded-xl hover:border-cyan-500/50 transition-all hover:translate-y-[-4px]">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-[10px] text-zinc-700 font-black tracking-widest uppercase">Platform_{index + 1}</div>
                    <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
                  </div>
                  <div className="text-xl font-black text-white mb-1 group-hover:text-cyan-500 transition-colors uppercase">{acc.site}</div>
                  <div className="text-zinc-600 text-[10px] mb-6 truncate font-mono lowercase tracking-tighter">{acc.url}</div>
                  <a 
                    href={acc.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center py-3 bg-zinc-900 border border-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all"
                  >
                    Open Profile →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Module Specification - تم تنظيفه من المراجع البرمجية */}
      <section className="py-32 px-10 bg-[#030303] border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-4xl font-black uppercase tracking-widest border-l-4 border-cyan-500 pl-8">Module Specification</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h4 className="text-cyan-500 font-black uppercase tracking-widest text-sm">Operation Purpose</h4>
              <p className="text-zinc-500 leading-loose">
                Automated reconnaissance of digital identities across global platforms. This module uses multi-threaded verification to confirm the existence of a specific handle across a massive database of network endpoints.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-cyan-500 font-black uppercase tracking-widest text-sm">Capabilities</h4>
              <ul className="text-zinc-500 space-y-3">
                <li className="flex gap-3 text-xs uppercase font-bold tracking-tighter"> <span className="text-cyan-500">■</span> Real-time existence validation</li>
                <li className="flex gap-3 text-xs uppercase font-bold tracking-tighter"> <span className="text-cyan-500">■</span> High-speed multi-threaded scanning</li>
                <li className="flex gap-3 text-xs uppercase font-bold tracking-tighter"> <span className="text-cyan-500">■</span> 400+ Database endpoint support</li>
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
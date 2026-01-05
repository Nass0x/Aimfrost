"use client";
import React, { useState } from 'react';

export default function DNSEnumeration() {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('ALL');

  const handleExecute = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('http://192.168.1.24/aimfrost-react/backend/dnsrecon.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: domain.trim() })
      });
      
      const result = await response.json();
      
      if (result.success && result.data) {
        setResults(result.data);
      } else {
        setError(result.error || "RECON_FAILED: Target did not yield DNS records.");
      }
    } catch (err) {
      setError("ENGINE_OFFLINE: Connection to the DNS analysis core failed.");
    } finally {
      setLoading(false);
    }
  };

  const filteredResults = results?.filter(record => 
    filter === 'ALL' ? true : record.type === filter
  );

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-cyan-500/30">
      
      {/* Header Section - المسمى المعتمد في الـ Layout */}
      <section className="relative pt-32 pb-20 px-10 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-black to-black opacity-50" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="space-y-6">
            <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter uppercase leading-none mb-6">
              DNS <span className="text-cyan-500 text-glow">Records</span>
            </h1>
            <div className="max-w-3xl border-l-2 border-cyan-500 pl-8 py-2">
              <h2 className="text-cyan-400 font-bold uppercase tracking-widest mb-2">Zone Asset Interrogation</h2>
              <p className="text-zinc-500 text-xl leading-relaxed italic">
                Comprehensive extraction of MX, NS, SOA, and A records to map organizational network topology and mail routing infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Input Area */}
      <section className="py-20 px-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-cyan-500/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
            <form onSubmit={handleExecute} className="relative bg-zinc-950 border border-white/10 p-2 rounded-2xl flex items-center shadow-2xl">
              <span className="pl-6 text-cyan-500 font-black text-xl">#</span>
              <input 
                type="text" 
                placeholder="ENTER TARGET DOMAIN (e.g. microsoft.com)"
                className="w-full bg-transparent p-6 outline-none text-xl font-bold text-cyan-400 placeholder:text-zinc-900"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-cyan-500 cursor-pointer text-black px-12 py-5 rounded-xl font-black text-lg hover:bg-white transition-all min-w-[180px]"
              >
                {loading ? "MAPPING..." : "RUN RECON"}
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
            
            {/* Filter Controls */}
            <div className="flex flex-wrap gap-3 mb-12">
              {['ALL', 'A', 'MX', 'NS', 'SOA', 'TXT'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-8 py-2 rounded-full text-[10px] font-black tracking-[0.2em] transition-all border ${
                    filter === type ? 'bg-cyan-500 text-black border-cyan-500' : 'bg-transparent text-zinc-600 border-white/5 hover:border-cyan-500/30'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="bg-zinc-950 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-900/20 border-b border-white/5">
                    <th className="p-6 text-[10px] text-zinc-600 font-black uppercase tracking-widest">Type</th>
                    <th className="p-6 text-[10px] text-zinc-600 font-black uppercase tracking-widest">Record Target</th>
                    <th className="p-6 text-[10px] text-zinc-600 font-black uppercase tracking-widest">Resolution / Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredResults.map((record, index) => (
                    <tr key={index} className="group hover:bg-cyan-500/[0.02] transition-colors">
                      <td className="p-6">
                        <span className={`px-4 py-1 rounded text-[10px] font-black tracking-widest border ${
                          record.type === 'MX' ? 'border-purple-500/30 text-purple-400 bg-purple-500/5' :
                          record.type === 'A' ? 'border-green-500/30 text-green-400 bg-green-500/5' :
                          record.type === 'NS' ? 'border-blue-500/30 text-blue-400 bg-blue-500/5' :
                          'border-zinc-700 text-zinc-500 bg-zinc-800/10'
                        }`}>
                          {record.type}
                        </span>
                      </td>
                      <td className="p-6 font-bold text-zinc-400 text-sm uppercase tracking-tighter">{record.domain || record.mname || "-"}</td>
                      <td className="p-6 font-mono text-cyan-500/80 text-sm truncate max-w-md">{record.address || record.target || record.rname || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredResults.length === 0 && (
                <div className="p-20 text-center text-zinc-800 font-black uppercase tracking-widest text-xs italic border-t border-white/5">
                  No data points found for category: {filter}
                </div>
              )}
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
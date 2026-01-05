"use client";
import React, { useState } from 'react';

export default function DeepCrawler() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExecute = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    let targetUrl = url.trim();
    if (!targetUrl) {
      setError("Target URL is required");
      setLoading(false);
      return;
    }
    
    if (!targetUrl.startsWith('http')) {
      targetUrl = `https://${targetUrl}`;
    }

    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 300000); 

      const response = await fetch('http://192.168.1.24/aimfrost-react/backend/deep-crawler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl }),
        signal: controller.signal
      });
      
      clearTimeout(id);

      const text = await response.text();
      try {
        const result = JSON.parse(text);
        if (result.success && result.data) {
          setResults(result.data);
        } else {
          setError(result.error || "No assets discovered on target.");
        }
      } catch (parseError) {
        setError("Invalid response format from engine.");
      }
      
    } catch (err) {
      if (err.name === 'AbortError') {
        setError("Scan timeout: Target architecture too complex.");
      } else {
        setError("Core connection failure: Engine offline.");
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (results?.urls) {
      navigator.clipboard.writeText(results.urls.join('\n'));
      alert("Intelligence data copied to clipboard.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-cyan-500/30">
      
      {/* Header Section - المتوافق مع الـ Layout */}
      <section className="relative pt-32 pb-20 px-10 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-black to-black opacity-50" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="space-y-6">
            <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter uppercase leading-none mb-6">
              Deep<span className="text-cyan-500 text-glow"> Crawler</span>
            </h1>
            <div className="max-w-3xl border-l-2 border-cyan-500 pl-8 py-2">
              <h2 className="text-cyan-400 font-bold uppercase tracking-widest mb-2">Recursive Path Discovery Engine</h2>
              <p className="text-zinc-500 text-xl leading-relaxed italic">
                Automated mapping of web architecture to identify endpoints, hidden assets, and site structure through recursive link analysis.
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
            <div className="relative bg-zinc-950 border border-white/10 p-2 rounded-2xl flex items-center shadow-2xl">
              <span className="pl-6 text-cyan-500 font-black text-xl">$</span>
              <input 
                type="text" 
                placeholder="TARGET DOMAIN (e.g. apple.com)"
                className="w-full bg-transparent p-6 outline-none text-xl font-bold text-cyan-400 placeholder:text-zinc-900"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleExecute()}
              />
              <button 
                onClick={handleExecute}
                disabled={loading}
                className="bg-cyan-500 cursor-pointer text-black px-19 py-3 rounded-xl font-black text-lg hover:bg-white transition-all min-w-[180px]"
              >
                {loading ? "CRAWLING..." : "START SCAN"}
              </button>
            </div>
          </div>
          {error && (
            <div className="mt-8 p-4 bg-red-900/10 border border-red-900/50 text-red-500 text-center font-bold rounded-xl uppercase text-xs">
              {error}
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      {results && (
        <section className="pb-40 px-10 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/5">
              <div className="flex items-center gap-6">
                <h3 className="text-3xl font-black uppercase tracking-tighter">Mapped <span className="text-cyan-500 text-glow">Endpoints</span></h3>
                <div className="px-6 py-2 bg-zinc-900 border border-white/10 rounded-full text-cyan-500 font-black text-xs tracking-widest uppercase">
                  Identified: {results.count}
                </div>
              </div>
              <button 
                onClick={copyToClipboard}
                className="text-[10px] font-black text-zinc-500 hover:text-cyan-500 transition-all uppercase tracking-widest border border-white/10 px-6 py-2 rounded-full hover:bg-zinc-900"
              >
                [ Export Assets ]
              </button>
            </div>

            <div className="bg-[#050505] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <div className="max-h-[600px] overflow-y-auto p-8 custom-scrollbar bg-black/50">
                <div className="grid grid-cols-1 gap-2">
                  {results.urls.map((link, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-zinc-900/10 border border-white/5 rounded-lg group hover:border-cyan-500/20 transition-all">
                      <span className="text-[10px] text-zinc-700 font-bold group-hover:text-cyan-900 uppercase">
                        {String(index + 1).padStart(3, '0')}
                      </span>
                      <span className="text-zinc-400 text-sm font-medium truncate group-hover:text-white transition-colors">
                        {link}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Feature Section - إزالة التلميحات الشخصية للمطور */}
      {!results && !loading && (
        <section className="py-20 px-10">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
             <Feature title="Deep Recursion" desc="Exhaustive path discovery through multi-layered link navigation." />
             <Feature title="Asset Validation" desc="Identifying active endpoints and verifying public-facing structure." />
             <Feature title="Path Mapping" desc="Full visualization of directories and hidden application routing." />
          </div>
        </section>
      )}

      <style jsx>{`
        .text-glow { text-shadow: 0 0 40px rgba(34, 211, 238, 0.5); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #18181b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #22d3ee; }
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
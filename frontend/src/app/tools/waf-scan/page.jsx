"use client";
import { useState } from 'react';

export default function FirewallDetector() {
    const [host, setHost] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const cleanAnsi = (text) => {
        if (typeof text !== 'string') return text;
        return text.replace(/[\u001b\u009b][[()#;?]*(?:[a-zA-Z\d]*(?:;[-a-zA-Z\d/#&.:=?%@~_]*)*)?\x07/g, '')
                   .replace(/\u001b\[[0-9;]*[a-zA-Z]/g, ''); 
    };

    const handleScan = async (e) => {
        e.preventDefault();
        if (!host) return;
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('http://192.168.1.24/aimfrost-react/backend/waf_scan.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ host: host })
            });
            const data = await response.json();
            if (data.success) {
                setResult(data.data);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError("ENGINE_OFFLINE: Could not connect to the defense analysis core.");
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
                            Firewall<span className="text-cyan-500 text-glow"> Detector</span>
                        </h1>
                        <div className="max-w-3xl border-l-2 border-cyan-500 pl-8 py-2">
                            <h2 className="text-cyan-400 font-bold uppercase tracking-widest mb-2">WAF Identification Module</h2>
                            <p className="text-zinc-500 text-xl leading-relaxed italic">
                                Advanced security interrogation to identify Web Application Firewalls, Load Balancers, and edge protection vendors.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Execution Area */}
            <section className="py-20 px-10">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleScan} className="relative group mb-20">
                        <div className="absolute -inset-1 bg-cyan-500/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700" />
                        <div className="relative bg-zinc-950 border border-white/10 p-2 rounded-2xl flex items-center shadow-2xl">
                            <span className="pl-6 text-cyan-500 font-black text-xl">$</span>
                            <input 
                                type="text" 
                                placeholder="ENTER TARGET HOST (e.g. domain.com)"
                                className="w-full bg-transparent p-6 outline-none text-xl font-bold text-cyan-400 placeholder:text-zinc-900"
                                value={host}
                                onChange={(e) => setHost(e.target.value)}
                            />
                            <button 
                                type="submit"
                                disabled={loading}
                                className="bg-cyan-500 cursor-pointer text-black px-12 py-5 rounded-xl font-black text-lg hover:bg-white transition-all min-w-[180px]"
                            >
                                {loading ? "PROBING..." : "EXECUTE"}
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

            {/* Intelligence Results */}
            {result && (
                <section className="pb-40 px-10 animate-in fade-in slide-in-from-bottom duration-700">
                    <div className="max-w-[1400px] mx-auto">
                        
                        {/* Status Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <div className="group p-8 bg-zinc-950 border border-white/5 rounded-2xl hover:border-cyan-500/50 transition-all">
                                <label className="text-[10px] text-zinc-600 block mb-3 uppercase font-black tracking-widest">Detection Status</label>
                                <div className={`text-3xl font-black italic uppercase ${result.detected ? 'text-yellow-500 text-glow-yellow' : 'text-green-500'}`}>
                                    {result.detected ? "WAF Identified" : "Clear Path"}
                                </div>
                            </div>
                            
                            <div className="group p-8 bg-zinc-950 border border-white/5 rounded-2xl md:col-span-2 hover:border-cyan-500/50 transition-all">
                                <label className="text-[10px] text-zinc-600 block mb-3 uppercase font-black tracking-widest">Active Vendor</label>
                                <div className="text-3xl font-black text-cyan-500 italic uppercase">
                                    {result.firewall ? cleanAnsi(result.firewall) : "No Security Layer Detected"}
                                </div>
                            </div>
                        </div>

                        {/* Analysis Console */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between pb-4 border-b border-white/5">
                                <h3 className="text-2xl font-black uppercase tracking-tighter">
                                    Analysis <span className="text-cyan-500">Log Output</span>
                                </h3>
                                <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Interrogation Mode: Deep Scan</div>
                            </div>
                            
                            <div className="bg-[#050505] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                                <div className="p-8 max-h-[500px] overflow-y-auto custom-scrollbar bg-black/50">
                                    <pre className="text-sm text-cyan-500/60 leading-relaxed font-mono whitespace-pre-wrap">
                                        {JSON.stringify(result, (key, value) => typeof value === 'string' ? cleanAnsi(value) : value, 4)}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <style jsx>{`
                .text-glow { text-shadow: 0 0 40px rgba(34, 211, 238, 0.5); }
                .text-glow-yellow { text-shadow: 0 0 30px rgba(234, 179, 8, 0.4); }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #18181b; border-radius: 10px; }
            `}</style>
        </div>
    );
}
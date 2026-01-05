"use client";
import { useState } from 'react';

export default function RegistrationInfo() {
    const [domain, setDomain] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const cleanAnsi = (text) => {
        if (typeof text !== 'string') return text;
        return text.replace(/\u001b\[[0-9;]*[a-zA-Z]/g, ''); 
    };

    const extractInfo = (rawText) => {
        if (!rawText) return null;
        const text = cleanAnsi(rawText);
        const getField = (regex) => {
            const match = text.match(regex);
            return match ? match[1].trim() : "NOT_FOUND";
        };
        return {
            registrar: getField(/Registrar:\s*(.*)/i),
            expiry: getField(/Registry Expiry Date:\s*([^\s]*)/i),
            created: getField(/Creation Date:\s*([^\s]*)/i),
            status: getField(/Domain Status:\s*([^\s]*)/i),
        };
    };

    const handleLookup = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('http://192.168.1.24/aimfrost-react/backend/whois.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domain: domain })
            });
            const data = await response.json();
            if (data.success && data.whois_result) {
                setResult(data.whois_result);
            } else {
                setError(data.error || "RECON_FAILURE: Target domain database unreachable.");
            }
        } catch (err) {
            setError("ENGINE_OFFLINE: Connection to the analysis core failed.");
        } finally {
            setLoading(false);
        }
    };

    const info = result ? extractInfo(result) : null;

    return (
        <div className="min-h-screen bg-black text-white font-mono selection:bg-cyan-500/30">
            
            {/* Header Section - التوافق مع Layout */}
            <section className="relative pt-32 pb-20 px-10 border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-black to-black opacity-50" />
                
                <div className="max-w-[1400px] mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                        <div className="space-y-6">
                            <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter uppercase leading-none">
                                Registration <span className="text-cyan-500 text-glow">Info</span>
                            </h1>
                            <div className="max-w-3xl border-l-2 border-cyan-500 pl-8 py-2">
                                <h2 className="text-cyan-400 font-bold uppercase tracking-widest mb-2">Registry Interrogation Module</h2>
                                <p className="text-zinc-500 text-xl leading-relaxed italic">
                                    Extracts domain ownership, lifecycle timestamps, and authoritative registrar data for complete target mapping.
                                </p>
                            </div>
                        </div>
                        
                        <div className="hidden lg:grid grid-cols-2 gap-6 p-8 border border-white/10 bg-zinc-950/50 rounded-2xl backdrop-blur-xl">
                            <div className="space-y-1">
                                <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Protocol</div>
                                <div className="text-cyan-500 font-bold uppercase">Whois / Port 43</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Visibility</div>
                                <div className="text-white font-bold uppercase">Public Records</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Execution Area */}
            <section className="py-20 px-10">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleLookup} className="relative group mb-20">
                        <div className="absolute -inset-1 bg-cyan-500/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700" />
                        <div className="relative bg-zinc-950 border border-white/10 p-2 rounded-2xl flex items-center shadow-2xl">
                            <span className="pl-6 text-cyan-500 font-black text-xl">$</span>
                            <input 
                                type="text" 
                                placeholder="ENTER TARGET DOMAIN (e.g. apple.com)"
                                className="w-full bg-transparent p-6 outline-none text-xl font-bold text-cyan-400 placeholder:text-zinc-900"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                            />
                            <button 
                                type="submit"
                                disabled={loading}
                                className="bg-cyan-500 cursor-pointer text-black px-12 py-5 rounded-xl font-black text-lg hover:bg-white transition-all min-w-[180px]"
                            >
                                {loading ? "INTERROGATING..." : "ANALYZE"}
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
                        
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                            <DataCard label="REGISTRAR_ENTITY" value={info.registrar} />
                            <DataCard label="CREATION_DATE" value={info.created.split('T')[0]} color="text-green-500" />
                            <DataCard label="EXPIRY_THRESHOLD" value={info.expiry.split('T')[0]} color="text-yellow-500" />
                            <DataCard label="LIFECYCLE_STATUS" value={info.status} color="text-cyan-500" />
                        </div>

                        {/* Raw Console */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between pb-4 border-b border-white/5">
                                <h3 className="text-2xl font-black uppercase tracking-tighter">
                                    Raw <span className="text-cyan-500">Registry Data</span>
                                </h3>
                                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Encoding: UTF-8 // Status: Read-Only</div>
                            </div>
                            
                            <div className="bg-[#050505] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                                <div className="p-8 h-[600px] overflow-y-auto custom-scrollbar bg-black/50">
                                    <pre className="text-sm text-zinc-400 leading-relaxed font-mono whitespace-pre-wrap lowercase">
                                        {cleanAnsi(result)}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Specification Section - إزالة النصوص الشخصية */}
            <section className="py-32 px-10 bg-[#030303] border-t border-white/5">
                <div className="max-w-4xl mx-auto space-y-12">
                    <h2 className="text-4xl font-black uppercase tracking-widest border-l-4 border-cyan-500 pl-8">Module Specification</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                            <h4 className="text-cyan-500 font-black uppercase tracking-widest text-sm">Operation Purpose</h4>
                            <p className="text-zinc-500 leading-loose">
                                Queries authoritative databases to retrieve critical ownership and lifecycle data for Internet resources, providing essential context for infrastructure audits.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-cyan-500 font-black uppercase tracking-widest text-sm">Extracted Vectors</h4>
                            <ul className="text-zinc-500 space-y-3">
                                <li className="flex gap-3 text-xs uppercase font-bold tracking-tighter"> <span className="text-cyan-500">■</span> Domain Registrar Identification</li>
                                <li className="flex gap-3 text-xs uppercase font-bold tracking-tighter"> <span className="text-cyan-500">■</span> Lifecycle Lifecycle Timestamps</li>
                                <li className="flex gap-3 text-xs uppercase font-bold tracking-tighter"> <span className="text-cyan-500">■</span> Authoritative Name Server Records</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

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

function DataCard({ label, value, color = "text-white" }) {
    return (
        <div className="group p-6 bg-zinc-950 border border-white/5 rounded-xl hover:border-cyan-500/50 transition-all">
            <div className="text-[9px] text-zinc-600 font-black mb-3 tracking-[0.2em] group-hover:text-cyan-500 transition-colors uppercase">{label}</div>
            <div className={`font-bold truncate text-sm uppercase ${color}`}>{value}</div>
        </div>
    );
}
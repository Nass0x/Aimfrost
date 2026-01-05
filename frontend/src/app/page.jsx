"use client";
import React from 'react';

export default function HomePage() {
  const features = [
    { title: "One Click Recon", desc: "No commands needed. Just enter the URL and let AIMFROST handle the complex multi-tool execution." },
    { title: "WAF Intelligence", desc: "Instantly identify firewall providers and security layers protecting any web infrastructure." },
    { title: "DNS Visualization", desc: "Map out domain structures and subdomains with a clear, structured graphical interface." },
    { title: "Zero Setup", desc: "Forget root access or Linux dependencies. Access professional-grade tools from any browser." }
  ];

  return (
    <main className="min-h-screen bg-black text-white font-mono selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-screen  flex items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#164e63_0%,_#000000_70%)] opacity-40" />
          <div className="absolute inset-0 opacity-[0.05] grid-bg" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10 fade-in-up">
          

          <h1 className="text-7xl md:text-[13rem] font-black tracking-tighter leading-[0.8] mb-12  select-none main-title">
            AIM<span className="text-cyan-500 text-glow">FROST</span>
          </h1>

          <p className="text-zinc-500 text-xl md:text-2xl max-w-3xl mx-auto font-bold mb-16 uppercase tracking-tight">
            Deconstruct Infrastructure. <span className="text-white">Without the Terminal.</span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
            <a href="/tools" className="btn-primary">
              Launch Suite
            </a>
            <a href="#vision" className="btn-secondary">
              Protocol Log
            </a>
          </div>
        </div>

        <div className="absolute bottom-12 left-12 flex items-center gap-6 text-[9px] text-zinc-700 font-black tracking-[0.3em] hidden lg:flex">
          <div className="flex flex-col gap-1">
            <span>LAT: 34.0522 N</span>
            <span>LNG: 118.2437 W</span>
          </div>
          <div className="w-[1px] h-8 bg-zinc-900" />
          <span className="pulse-text">SIGNAL STRENGTH: 98%</span>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-32 px-6  border-y border-white/5 bg-zinc-950/40 relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group shadow-2xl reveal">
            <img 
              src="/osint.png" 
              className="w-full h-full object-cover  opacity-40 group-hover:scale-105 transition-all duration-700"
              alt="Cyber Core"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          <div className="space-y-12 reveal">
            <h2 className="text-6xl font-black uppercase tracking-tighter leading-none italic">
              Automated <br /> <span className="text-cyan-500 text-glow">Intelligence</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed font-bold max-w-xl border-l-4 border-cyan-500 pl-8 italic">
              Legacy tools require hours of configuration. AIMFROST delivers the same professional output in seconds via a unified graphical engine.
            </p>
           
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-40 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, i) => (
              <div key={i} className="feature-card">
                <div className="text-cyan-950 font-black text-5xl absolute top-4 right-4 italic opacity-20 group-hover:opacity-40 transition-opacity">0{i+1}</div>
                <h3 className="text-white text-xl font-black uppercase mb-5 tracking-tighter italic group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors font-bold">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="vision" className="py-40 px-6 border-t border-white/5 relative bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
               <h3 className="text-5xl font-black uppercase tracking-tighter italic">Comparison Log</h3>
               <div className="p-6 bg-cyan-500/5 border border-cyan-500/30 rounded-xl relative overflow-hidden">
                    <span className="text-[10px] text-cyan-500 font-black block mb-2 uppercase tracking-[0.3em]">AIMFROST Protocol</span>
                    <span className="text-white font-black text-sm italic uppercase tracking-tighter">Enter URL → Press Detect → View Visualized Assets</span>
               </div>
            </div>
            <div className="relative p-12 bg-zinc-950 border border-white/10 rounded-[2rem] shadow-glow">
                <h4 className="text-3xl font-black uppercase mb-6 italic tracking-tighter text-glow text-cyan-500">The Core Mission</h4>
                <p className="text-zinc-500 leading-loose font-bold uppercase text-[11px] tracking-widest">
                    To democratize advanced infrastructure analysis by providing an interface that prioritizes clarity over complexity.
                </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-60 px-6 text-center bg-black relative overflow-hidden">
        <h2 className="text-[12vw] font-black text-white/[0.03] uppercase tracking-tighter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none italic w-full">SECURE INTEL</h2>
        <a href="/tools" className="btn-cta relative z-10">
            Initialize Tools
        </a>
      </section>

      <style jsx>{`
        .grid-bg {
          background-image: linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .text-glow { text-shadow: 0 0 40px rgba(34, 211, 238, 0.4); }
        .main-title { transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .main-title:hover { transform: skewX(-5deg) scale(1.02); }
        
        .btn-primary {
          padding: 1.5rem 3.5rem;
          background: #22d3ee;
          color: black;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          box-shadow: 0 0 30px rgba(34, 211, 238, 0.3);
          transition: all 0.3s ease;
        }
        .btn-primary:hover { background: white; transform: translateY(-3px); box-shadow: 0 0 50px rgba(255, 255, 255, 0.2); }

        .btn-secondary {
          padding: 1.5rem 3.5rem;
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        .btn-secondary:hover { background: rgba(255,255,255,0.05); border-color: white; }

        .feature-card {
          padding: 3rem;
          background: #050505;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 1rem;
          position: relative;
          transition: all 0.4s ease;
        }
        .feature-card:hover { border-color: #22d3ee; transform: translateY(-10px); background: #0a0a0a; }

        .btn-cta {
          padding: 2.5rem 5rem;
          background: white;
          color: black;
          font-weight: 900;
          font-size: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          font-style: italic;
          transition: all 0.4s ease;
        }
        .btn-cta:hover { background: #22d3ee; letter-spacing: 0.5em; }

        .shadow-glow { box-shadow: 0 0 100px rgba(34, 211, 238, 0.05); }
        .fade-in-up { animation: fadeInUp 1s ease-out forwards; }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .pulse-text { animation: pulse 2s infinite; }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </main>
  );
}

function Stat({ label, value }) {
    return (
        <div className="hover:scale-110 transition-transform">
            <div className="text-white font-black text-5xl tracking-tighter mb-1 italic leading-none">{value}</div>
            <div className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em]">{label}</div>
        </div>
    );
}
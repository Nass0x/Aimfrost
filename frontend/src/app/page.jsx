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
    <main className="min-h-screen bg-black text-white font-mono selection:bg-cyan-500/30 overflow-x-hidden">
      
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#083344_0%,_#000000_80%)] opacity-40" />
          <div className="absolute inset-0 opacity-20 grid-bg animate-grid-drift" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="fade-in-up">
            <h1 className="text-7xl md:text-[16rem] font-black tracking-tighter leading-[0.8] mb-10 select-none main-title">
              AIM<span className="text-cyan-400 text-glow animate-pulse-glow">FROST</span>
            </h1>

            <p className="text-zinc-500 text-lg md:text-xl max-w-3xl mx-auto font-bold mb-12 uppercase tracking-[0.2em] leading-relaxed">
              Unified OSINT Intelligence <br/> <span className="text-white text-glow">The New Standard of Recon</span>
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
              <a href="/tools" className="btn-primary group">
                Launch Suite 
                <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
              </a>
              <a href='/documentation' className="btn-secondary">
                Read Protocol
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-12 flex items-center gap-6 text-[10px] text-zinc-600 font-black tracking-[0.3em] hidden lg:flex">
          <div className="flex flex-col gap-1 border-l border-cyan-500 pl-4 uppercase">
            <span>System Stable</span>
            <span>Uplink Active</span>
          </div>
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
        </div>
      </section>

      <section className="py-32 px-6 border-y border-zinc-900 bg-zinc-950/30 relative">
        <div className="max-w-9xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-video rounded-sm overflow-hidden border border-cyan-500/20 group">
            <img 
              src="/osint.png" 
              className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-all duration-1000"
              alt="Cyber Core"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
          </div>

          <div className="space-y-8">
            <h2 className="text-5xl font-black uppercase tracking-tighter italic text-white">
              Automated <br /> <span className="text-cyan-400 text-glow">Intelligence</span>
            </h2>
            <p className="text-zinc-500 text-md leading-relaxed font-bold border-l-2 border-cyan-500 pl-8 italic uppercase tracking-tighter">
              AIMFROST delivers professional reconnaissance output in seconds via a unified graphical engine
            </p>
          </div>
        </div>
      </section>

      <section className="py-40 px-6 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, i) => (
            <div key={i} className="feature-card group">
              <h3 className="text-white text-lg font-black uppercase mb-4 tracking-tighter italic group-hover:text-cyan-400 transition-colors">{item.title}</h3>
              <p className="text-zinc-500 text-xs leading-relaxed font-bold uppercase tracking-tight group-hover:text-zinc-300 transition-colors">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .grid-bg {
          background-image: linear-gradient(#164e63 1px, transparent 1px), linear-gradient(90deg, #164e63 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        @keyframes drift {
          from { background-position: 0 0; }
          to { background-position: 50px 50px; }
        }
        .animate-grid-drift {
          animation: drift 3s linear infinite;
        }

        .text-glow { text-shadow: 0 0 40px rgba(34, 211, 238, 0.6); }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; filter: brightness(1); }
          50% { opacity: 0.8; filter: brightness(1.2); }
        }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }

        .btn-primary {
          padding: 1.2rem 3rem;
          background: #22d3ee;
          color: black;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-primary:hover { background: white; transform: scale(1.05); box-shadow: 0 0 30px rgba(34, 211, 238, 0.4); }

        .btn-secondary {
          padding: 1.2rem 3rem;
          border: 1px solid #222;
          color: white;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          transition: all 0.3s ease;
        }
        .btn-secondary:hover { border-color: white; background: rgba(255,255,255,0.05); }

        .feature-card {
          padding: 2.5rem;
          background: #050505;
          border: 1px solid #111;
          position: relative;
          transition: all 0.3s ease;
        }
        .feature-card:hover { border-color: #22d3ee/50; transform: translateY(-5px); }

        .fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
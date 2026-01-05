"use client";
import React from 'react';

export default function AboutPage() {
  const corePillars = [
    {
      title: "Community Driven",
      desc: "Built by researchers for researchers. AIMFROST thrives on collective intelligence and open feedback from the cybersecurity community."
    },
    {
      title: "Automated Workflow",
      desc: "Designed to eliminate manual overhead. We automate complex OSINT tasks into a single, unified dashboard for faster decision making."
    },
    {
      title: "Passive-First Scope",
      desc: "Focused on non-intrusive reconnaissance. Our methodology ensures you gather data without leaving footprints on the target infrastructure."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-cyan-500/30">
      
      <section className="pt-24 pb-20 px-6 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center space-y-6">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic">
              AIMFROST <span className="text-cyan-500">COMMUNITY</span>
            </h1>
            <div className="h-1 w-32 bg-cyan-500"></div>
            <p className="max-w-3xl text-zinc-500 text-lg md:text-xl leading-relaxed">
              The next generation OSINT & Reconnaissance framework. Built to empower security professionals and the global community with automated intelligence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h2 className="text-3xl font-black uppercase tracking-tighter border-l-4 border-cyan-500 pl-6">
              Our Vision: <br/> Democracy of Intelligence
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                In an era where cyber threats are evolving, access to professional-grade reconnaissance tools shouldn't be limited by complex command-line interfaces or high-cost enterprise software.
              </p>
              <p>
                AIMFROST is designed as a community-first project. Our goal is to consolidate the best passive scanning techniques into a unified, web-based ecosystem that anyone can use—from students to professional red teamers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {corePillars.map((pillar, i) => (
              <div key={i} className="p-8 border border-white/5 bg-zinc-950/50 hover:border-cyan-500/50 transition-all group">
                <h3 className="text-cyan-500 font-bold uppercase mb-2 group-hover:tracking-widest transition-all tracking-normal">
                  {pillar.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed italic">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-zinc-950/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Join the Collective</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              AIMFROST is an open project. Whether you are a developer, a bug hunter, or a security analyst, there is a place for you here.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-cyan-900/20 rounded-sm">
              <h4 className="font-bold text-white uppercase mb-2">Build</h4>
              <p className="text-xs text-zinc-600">Contribute to the open-source modules and help us expand the recon capabilities.</p>
            </div>
            <div className="p-6 border border-cyan-900/20 rounded-sm">
              <h4 className="font-bold text-white uppercase mb-2">Test</h4>
              <p className="text-xs text-zinc-600">Report bugs and help us refine the accuracy of our technology fingerprinting.</p>
            </div>
            <div className="p-6 border border-cyan-900/20 rounded-sm">
              <h4 className="font-bold text-white uppercase mb-2">Suggest</h4>
              <p className="text-xs text-zinc-600">Propose new OSINT sources and integration ideas to make the tool better for everyone.</p>
            </div>
          </div>

          <div className="pt-8">
            <a href="https://github.com/xIxLinx/Aimfrost" className="inline-block px-10 py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-cyan-500 transition-colors">
              Github Repository
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-4xl">🇵🇸</span>
          <h3 className="text-xl font-bold uppercase tracking-widest text-red-600">AIMFROST Stands for Justice</h3>
          <p className="text-zinc-500 text-sm italic leading-relaxed">
            Our community believes in the ethical use of technology. We stand in solidarity with humanitarian causes globally, advocating for the protection of human rights in both digital and physical spaces.
          </p>
        </div>
      </section>

    </div>
  );
}
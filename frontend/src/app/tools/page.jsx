"use client";
import React, { useState } from 'react';

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const categories = [
    {
      title: "Discovery & Passive",
      code: "DISC-01",
      desc: "Advanced modules for subdomain discovery, registration tracking, and historical mapping.",
      tools: [
        { name: "SubDomain Finder", desc: "Passive enumeration of subdomains from 50+ high-authority sources.", link: "/tools/subdomain-finder", icon: "/tools-icons/subdomain-finder.png", status: "Active" },
        { name: "Registration Info", desc: "Retrieve domain owner details, registrar data, and expiration dates.", link: "/tools/registration-info", icon: "/tools-icons/whois.png", status: "Active" },
        { name: "Deep Crawler", desc: "In-depth web crawling to identify hidden assets and service endpoints.", link: "/tools/deep-crawler", icon: "/tools-icons/crawler.png", status: "Active" },
        { name: "Profile Hunter", desc: "Track digital footprints and social accounts across 2000+ platforms.", link: "/tools/profile-hunter", icon: "/tools-icons/profile-hunter.png", status: "Active" },
      ]
    },
    {
      title: "Analysis & HTTP",
      code: "ANALYSIS-02",
      desc: "Analyze web server technologies, identify security layers, and detect traffic patterns.",
      tools: [
        { name: "DNS Enumeration", desc: "High-speed validation and analysis of A, MX, NS, and TXT records.", link: "/tools/dns-enumeration", icon: "/tools-icons/dns-enumeration.png", status: "Active" },
        { name: "Firewall Detector", desc: "Fingerprint and identify Web Application Firewalls (WAF) and versions.", link: "/tools/waf-scan", icon: "/tools-icons/waf-scan.png", status: "Active" },
        { name: "Cloud Provider", desc: "Detect if the target is served through CDNs like Cloudflare or Akamai.", link: "/tools/cloud-provider", icon: "/tools-icons/cloud-provider.png", status: "Active" },
        { name: "DNS Records", desc: "Comprehensive DNS record lookup and infrastructure health check.", link: "/tools/dns-records", icon: "/tools-icons/dns-record.png", status: "Active" },
      ]
    },
    {
      title: "Security & Infrastructure",
      code: "SEC-03",
      desc: "Encryption auditing, load balancing detection, and port scanning modules.",
      tools: [
        { name: "TLS Engine (TLSx)", desc: "In-depth analysis of SSL/TLS configurations and certificate health.", link: "/tools/tls-analyzer", icon: "/tools-icons/tls-scan.png", status: "Active" },
        { name: "Traffic Balancer", desc: "Detect Load Balancers and analyze HTTP header routing patterns.", link: "/tools/lbd-detector", icon: "/tools-icons/lbd.png", status: "Active" },
        { name: "Port Scanner", desc: "Fast port discovery and service identification using Naabu engine.", link: "/tools/port-scanner", icon: "/tools-icons/port-scanner.png", status: "Active" },
      ]
    }
  ];

  return (
    <div className="bg-black text-white font-mono min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20">
        
        <div className="mb-12 border-l-4 border-cyan-500 pl-6">
          <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">
            System <span className="text-cyan-500">Toolkit</span>
          </h1>
          <p className="text-zinc-500 text-xs mt-2 uppercase tracking-[0.3em] font-bold">AIMFROST High-Velocity Reconnaissance Suite</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="w-full lg:w-80 flex flex-col gap-2">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`cursor-pointer flex items-center justify-between p-5 border transition-all duration-300 ${
                  activeTab === i 
                  ? 'bg-cyan-500/5 border-cyan-500 text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.1)]' 
                  : 'bg-black border-zinc-900 text-zinc-500 hover:border-zinc-700' 
                }`}
              >
                <div className="flex flex-col text-left">
                  <span className={`text-[9px] font-black uppercase mb-1 tracking-widest ${activeTab === i ? 'text-cyan-500' : 'text-zinc-600'}`}>
                    {cat.code}
                  </span>
                  <span className="text-sm font-black uppercase tracking-tighter">
                    {cat.title}
                  </span>
                </div>
                <div className={`w-1.5 h-1.5 rounded-full ${activeTab === i ? 'bg-cyan-500 animate-pulse' : 'bg-zinc-800'}`}></div>
              </button>
            ))}
          </div>

          <div className="flex-grow bg-zinc-950/50 border border-zinc-900 p-10 rounded shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 text-[8px] text-zinc-800 font-black tracking-widest">AIMFROST_SYS_V4.0.1</div>
            
            <div key={activeTab} className="transition-all duration-500">
              <div className="mb-12">
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-3 italic">
                  {categories[activeTab].title}
                </h2>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-3xl font-bold italic">
                  {categories[activeTab].desc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories[activeTab].tools.map((tool, j) => (
                  <div 
                    key={j} 
                    className="p-8 border bg-black border-zinc-900 hover:border-cyan-500/40 group transition-all relative flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <img 
                          src={tool.icon} 
                          alt={tool.name} 
                          className="w-18 h-18 object-contain brightness-110 group-hover:scale-110 transition-transform duration-500 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
                        />
                        <h3 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                          {tool.name}
                        </h3>
                      </div>
                      <span className="text-[9px] px-2 py-1 font-black uppercase border border-cyan-900 text-cyan-500 bg-cyan-950/10">
                        {tool.status}
                      </span>
                    </div>

                    <p className="text-[13px] text-zinc-500 leading-relaxed mb-8 font-bold group-hover:text-zinc-300 transition-colors italic">
                      {tool.desc}
                    </p>

                    <a 
                      href={tool.link} 
                      className="mt-auto inline-flex items-center gap-2 text-[10px] font-black text-white border-b border-cyan-500/50 pb-1 uppercase tracking-widest hover:text-cyan-400 hover:border-cyan-400 transition-all w-fit"
                    >
                      Launch Tool <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
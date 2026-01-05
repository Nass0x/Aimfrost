"use client";
import React, { useState } from 'react';

export default function DocumentationPage() {
  const [selectedTool, setSelectedTool] = useState(null);

  const docs = [
    {
      category: "Discovery & Passive Intelligence",
      tools: [
        {
          name: "SubDomain Finder",
          purpose: "Enumeration of organizational subdomains using passive reconnaissance techniques.",
          mechanism: "Aggregates data from over 50 public sources including search engine caches, rapid7 sonar, and Certificate Transparency (CT) logs via crt.sh.",
          technicalDetail: "It avoids direct interaction with the target's DNS servers to remain undetected. The module filters out duplicate entries and validates resolution status before presentation.",
          capabilities: [
            "Searches through 50+ public databases simultaneously",
            "Identifies wildcard DNS configurations automatically",
            "Historical subdomain tracking across time periods",
            "Integration with Certificate Transparency logs",
            "Detects expired subdomains with active DNS records"
          ],
          dataPoints: [
            "Total subdomains discovered",
            "Active vs inactive ratio",
            "SSL certificate coverage",
            "Response time metrics",
            "Geographic distribution of servers"
          ]
        },
        {
          name: "Registration Info (WHOIS)",
          purpose: "Retrieval of domain ownership and administrative metadata.",
          mechanism: "Queries the global WHOIS database protocol (Port 43) to extract registrar details, creation/expiration timestamps, and contact information.",
          technicalDetail: "The system parses raw WHOIS text into a structured JSON format, highlighting critical data points like domain age and privacy protection status.",
          capabilities: [
            "Extracts registrar and registrant information",
            "Identifies domain creation and expiration dates",
            "Maps administrative and technical contacts",
            "Detects privacy protection services",
            "Historical WHOIS data comparison"
          ],
          dataPoints: [
            "Domain age calculation",
            "Nameserver configurations",
            "Email patterns of contacts",
            "Registration country and jurisdiction",
            "Update history timestamps"
          ]
        },
        {
          name: "Deep Crawler",
          purpose: "Automated mapping of web application directory structures and resource endpoints.",
          mechanism: "Recursively follows internal links (HREF/SRC) to build a tree-like architecture of the target domain.",
          technicalDetail: "It identifies hidden files such as .env, .git, and backup archives. It utilizes custom user-agents to simulate various browser environments and bypass basic crawler traps.",
          capabilities: [
            "Recursive link following with depth control",
            "JavaScript-rendered content extraction",
            "Identifies exposed configuration files",
            "Detects backup and temporary files",
            "Maps API endpoints and parameters"
          ],
          dataPoints: [
            "Total pages discovered",
            "Directory depth analysis",
            "File type distribution",
            "Response code statistics",
            "Potential sensitive data exposure"
          ]
        },
        {
          name: "Profile Hunter",
          purpose: "Cross-platform digital footprint identification.",
          mechanism: "Executes asynchronous HTTP requests to check for specific username existences across 2,000+ social media, coding, and forum platforms.",
          technicalDetail: "It analyzes response status codes and page content patterns to distinguish between 'Page Not Found' and 'Active Profile' states, minimizing false positives.",
          capabilities: [
            "Searches 2000+ platforms simultaneously",
            "Machine learning for false positive reduction",
            "Profile metadata extraction",
            "Activity timeline reconstruction",
            "Cross-platform username correlation"
          ],
          dataPoints: [
            "Number of active profiles found",
            "Platform category distribution",
            "Account creation dates",
            "Public engagement metrics",
            "Linked accounts detection"
          ]
        }
      ]
    },
    {
      category: "Analysis & HTTP Interrogation",
      tools: [
        {
          name: "DNS Enumeration",
          purpose: "In-depth analysis of DNS record configurations.",
          mechanism: "Directly queries nameservers for A, AAAA, MX, TXT, CNAME, and NS records to identify underlying infrastructure.",
          technicalDetail: "It specifically looks for misconfigured SPF/DMARC records that could lead to email spoofing and checks for CNAME entries pointing to expired external services (Subdomain Takeover).",
          capabilities: [
            "Complete DNS record type enumeration",
            "Zone transfer attempt detection",
            "DNS security extension (DNSSEC) validation",
            "Mail server configuration analysis",
            "Reverse DNS lookup verification"
          ],
          dataPoints: [
            "All record types and values",
            "TTL configurations",
            "SPF/DKIM/DMARC policy strength",
            "Nameserver response times",
            "Geographic IP distribution"
          ]
        },
        {
          name: "Firewall Detector (WAF)",
          purpose: "Detection and fingerprinting of Web Application Firewalls.",
          mechanism: "Injects benign payloads into HTTP requests and analyzes the response headers and body for specific firewall signatures.",
          technicalDetail: "Can identify over 100 WAF solutions including Cloudflare, AWS WAF, and ModSecurity by correlating unique server-side rejection patterns.",
          capabilities: [
            "Identifies 100+ WAF vendors and versions",
            "Tests rule effectiveness with safe payloads",
            "Detects rate limiting configurations",
            "Maps blocking patterns and triggers",
            "Identifies bypass opportunities"
          ],
          dataPoints: [
            "WAF vendor and version",
            "Protection level assessment",
            "Response delay patterns",
            "Custom rule indicators",
            "CDN integration status"
          ]
        },
        {
          name: "Cloud Provider Identification",
          purpose: "Determining the hosting environment and cloud service provider.",
          mechanism: "Performs IP-to-ASN mapping and cross-references results with known IP ranges belonging to major cloud vendors.",
          technicalDetail: "Identifies if the target is behind a CDN/Proxy or hosted on Virtual Private Servers (VPS) within AWS, GCP, Azure, or DigitalOcean.",
          capabilities: [
            "Detects major cloud platforms automatically",
            "Identifies CDN and proxy layers",
            "Maps regional data center locations",
            "Determines hosting architecture type",
            "Discovers multi-cloud configurations"
          ],
          dataPoints: [
            "Cloud provider name and region",
            "ASN and IP range details",
            "CDN presence and vendor",
            "Server instance types",
            "Network topology insights"
          ]
        }
      ]
    },
    {
      category: "Security & Infrastructure Auditing",
      tools: [
        {
          name: "TLS Engine (TLSx)",
          purpose: "Cryptographic health and SSL/TLS configuration auditing.",
          mechanism: "Initiates a full TLS handshake to extract certificate chain details, supported cipher suites, and protocol versions.",
          technicalDetail: "Checks for vulnerabilities such as Heartbleed, expired certificates, weak DH keys, and lack of HSTS headers. It validates the trust chain against global Root CAs.",
          capabilities: [
            "Full certificate chain validation",
            "Tests for 50+ known TLS vulnerabilities",
            "Cipher suite strength assessment",
            "Protocol version compatibility check",
            "HSTS and security header analysis"
          ],
          dataPoints: [
            "Certificate validity and issuer",
            "Supported protocol versions",
            "Cipher suite rankings",
            "Vulnerability scores",
            "Security header presence"
          ]
        },
        {
          name: "Traffic Balancer (LBD)",
          purpose: "Detection of Load Balancing infrastructure and server clusters.",
          mechanism: "Analyzes HTTP response differentials and 'Date' header fluctuations across multiple concurrent sessions.",
          technicalDetail: "Detects DNS Round Robin, Hardware Load Balancers, and Application Delivery Controllers by identifying micro-variations in server fingerprints.",
          capabilities: [
            "Identifies load balancing algorithms",
            "Maps backend server pool size",
            "Detects session persistence methods",
            "Health check endpoint discovery",
            "Failover configuration analysis"
          ],
          dataPoints: [
            "Number of backend servers",
            "Load balancing method type",
            "Response time variance",
            "Server affinity patterns",
            "Infrastructure redundancy level"
          ]
        },
        {
          name: "Port Scanner",
          purpose: "Identification of open network ports and running services.",
          mechanism: "Utilizes high-speed SYN scanning to probe common ports (Top 1000) and identify active services.",
          technicalDetail: "Attempts service version detection by analyzing banners returned by the port. It provides a map of the attack surface beyond standard web ports (80/443).",
          capabilities: [
            "Scans top 1000 common ports rapidly",
            "Service version fingerprinting",
            "Operating system detection",
            "Banner grabbing and analysis",
            "Vulnerability correlation by service"
          ],
          dataPoints: [
            "Open ports and services list",
            "Service versions detected",
            "Operating system estimation",
            "Non-standard port services",
            "Potential security exposures"
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-mono">
      <div className="max-w-7xl mx-auto p-8 md:p-20">
        <header className="mb-32">
          <div className="border-l-4 border-cyan-500 pl-6">
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter">
              System <span className="text-cyan-500">Manual</span>
            </h1>
            <p className="mt-4 text-zinc-600 font-bold uppercase tracking-[0.4em] text-xs">
              Infrastructure & Reconnaissance Protocol // v2.1
            </p>
          </div>
        </header>

        <div className="space-y-24">
          {docs.map((cat, catIdx) => (
            <section key={catIdx}>
              <div className="flex items-center gap-6 mb-16">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-4xl font-black uppercase tracking-widest text-cyan-500">
                  {cat.category}
                </h2>
                <div className="flex-grow h-px bg-zinc-900"></div>
              </div>

              <div className="space-y-6">
                {cat.tools.map((tool, toolIdx) => (
                  <div key={toolIdx}>
                    <div 
                      onClick={() => setSelectedTool(selectedTool === `${catIdx}-${toolIdx}` ? null : `${catIdx}-${toolIdx}`)}
                      className="cursor-pointer"
                    >
                      <div className="p-8 border border-cyan-500/20 bg-zinc-950/40 rounded-2xl hover:border-cyan-500/40 transition-all duration-300 group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-black text-xl">
                              {toolIdx + 1}
                            </div>
                            <div>
                              <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                                {tool.name}
                              </h3>
                              <p className="text-sm text-zinc-500 mt-1">{tool.purpose}</p>
                            </div>
                          </div>
                          <div className={`transition-transform duration-300 ${selectedTool === `${catIdx}-${toolIdx}` ? 'rotate-90' : ''}`}>
                            <svg className="w-6 h-6 text-cyan-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`overflow-hidden transition-all duration-300 ${selectedTool === `${catIdx}-${toolIdx}` ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="mt-6 p-8 border border-zinc-900 bg-black/60 rounded-2xl space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-sm font-black uppercase tracking-widest text-cyan-400 mb-4">
                              Technical Mechanism
                            </h4>
                            <p className="text-zinc-400 leading-relaxed text-sm italic">
                              {tool.mechanism}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-black uppercase tracking-widest text-zinc-500 mb-4">
                              Architectural Logic
                            </h4>
                            <p className="text-zinc-500 leading-relaxed text-sm font-bold">
                              {tool.technicalDetail}
                            </p>
                          </div>
                        </div>

                        <div className="h-px bg-zinc-900"></div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-sm font-black uppercase tracking-widest text-cyan-400 mb-4">
                              Core Capabilities
                            </h4>
                            <ul className="space-y-2">
                              {tool.capabilities.map((cap, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm">
                                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mt-2"></div>
                                  <span className="text-zinc-300 flex-1">{cap}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-black uppercase tracking-widest text-zinc-500 mb-4">
                              Data Points Extracted
                            </h4>
                            <ul className="space-y-2">
                              {tool.dataPoints.map((point, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm">
                                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 border border-zinc-700 mt-2"></div>
                                  <span className="text-zinc-400 flex-1">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-40 py-20 border-t border-zinc-900 flex flex-col items-center gap-6">
          <div className="flex gap-10">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
            <div className="w-2 h-2 bg-zinc-800 rounded-full" />
            <div className="w-2 h-2 bg-zinc-800 rounded-full" />
          </div>
          <p className="text-[10px] text-zinc-800 tracking-[0.8em] uppercase font-black">
            System Synchronized // Aimfrost Global
          </p>
        </footer>
      </div>
    </div>
  );
}
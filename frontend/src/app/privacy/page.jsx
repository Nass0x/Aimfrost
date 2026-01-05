"use client";

export default function PrivacyPage() {
	return (
		<div className="bg-black min-h-screen text-zinc-300 font-mono py-24 px-10">
		<div className="max-w-5xl mx-auto">
		<header className="border-b border-cyan-500/20 pb-10 mb-16">
		<h1 className="text-6xl font-black text-white uppercase italic tracking-tighter mb-4">Privacy Policy</h1>
		<p className="text-cyan-500 font-bold tracking-[0.2em] text-sm">LAST UPDATED: JANUARY 05, 2026</p>
		</header>
		
		<article className="prose prose-invert max-w-none space-y-12">
		<section>
		<h2 className="text-2xl font-black text-white uppercase mb-6 tracking-tight italic border-l-4 border-cyan-500 pl-4">01. Overview of Data Processing</h2>
		<p className="leading-relaxed text-lg mb-4">
		AIMFROST operate as a passive reconnaissance framework. Unlike traditional platforms, we prioritize the "Privacy by Design" principle. This document outlines our rigorous standards for data handling and the boundaries of our information gathering processes.
		</p>
		<p className="leading-relaxed text-lg">
		Our core mission is to provide transparency into public infrastructure without compromising the privacy of individual users or creating persistent data footprints.
		</p>
		</section>
		
		<section>
		<h2 className="text-2xl font-black text-white uppercase mb-6 tracking-tight italic border-l-4 border-cyan-500 pl-4">02. Information We Do Not Collect</h2>
		<p className="leading-relaxed text-lg mb-4">
		The most critical aspect of our privacy policy is the absence of data retention. AIMFROST does not maintain databases of:
		</p>
		<ul className="list-disc pl-6 space-y-3 text-zinc-400">
		<li>Search queries or target identifiers processed through our tools.</li>
		<li>User IP addresses or geolocation metadata during active sessions.</li>
		<li>Result sets generated from DNS, WHOIS, or Subdomain discovery modules.</li>
		</ul>
		</section>
		
		<section>
		<h2 className="text-2xl font-black text-white uppercase mb-6 tracking-tight italic border-l-4 border-cyan-500 pl-4">03. Third-Party API Integration</h2>
		<p className="leading-relaxed text-lg">
		While AIMFROST aggregates data from high-authority OSINT sources, your interaction with these sources is proxied through our secure headers to ensure that your local environment remains shielded from direct exposure to third-party trackers.
		</p>
		</section>
		</article>
		</div>
		</div>
	);
}

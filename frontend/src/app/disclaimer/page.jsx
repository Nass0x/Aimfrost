"use client";

export default function DisclaimerPage() {
	return (
		<div className="bg-black min-h-screen text-zinc-300 font-mono py-24 px-10">
		<div className="max-w-5xl mx-auto">
		<header className="border-b border-red-500/30 pb-10 mb-16">
		<h1 className="text-6xl font-black text-white uppercase italic tracking-tighter mb-4">Legal Disclaimer</h1>
		<p className="text-red-500 font-bold tracking-[0.2em] text-sm">WARNING: READ BEFORE PROCEEDING</p>
		</header>
		
		<div className="space-y-12">
		<p className="text-2xl font-bold text-white leading-snug">
		THE INFORMATION AND TOOLS PROVIDED BY AIMFROST ARE FOR EDUCATIONAL, EXPERIMENTAL, AND AUTHORIZED RESEARCH PURPOSES ONLY.
		</p>
		
		<section className="bg-zinc-950 p-10 border-l-8 border-red-500">
		<h2 className="text-white font-black text-xl mb-4 uppercase italic tracking-widest">Non-Liability Clause</h2>
		<p className="leading-relaxed text-lg">
		In no event shall AIMFROST, its developers, or contributors be held liable for any direct, indirect, incidental, or consequential damages (including, but not limited to, unauthorized access, loss of data, or legal actions) arising in any way out of the use of this framework.
		</p>
		</section>
		
		<section className="space-y-6">
		<h2 className="text-2xl font-black text-white uppercase italic">Zero-Trace Acknowledgment</h2>
		<p className="leading-relaxed text-lg italic text-zinc-500">
		"Passive reconnaissance" by definition involves gathering information without sending traffic directly to the target system. However, the user acknowledges that certain API interactions may be logged by third-party providers outside of our control.
		</p>
		<p className="leading-relaxed text-lg">
		It is the user's responsibility to verify the legality of their reconnaissance activities within their specific jurisdiction before initiating any search.
		</p>
		</section>
		
		<footer className="pt-20 border-t border-zinc-900 opacity-50">
		<p className="text-[10px] tracking-[0.4em] uppercase font-black">Secure_Protocol_End // AIMFROST_DISCLAIMER_RECORD</p>
		</footer>
		</div>
		</div>
		</div>
	);
}
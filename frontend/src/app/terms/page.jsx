"use client";

export default function TermsPage() {
	return (
		<div className="bg-black min-h-screen text-zinc-300 font-mono py-24 px-10">
		<div className="max-w-5xl mx-auto">
		<header className="border-b border-cyan-500/20 pb-10 mb-16">
		<h1 className="text-6xl font-black text-white uppercase italic tracking-tighter mb-4">Terms of Service</h1>
		<p className="text-cyan-500 font-bold tracking-[0.2em] text-sm">OPERATIONAL PROTOCOL V4.0</p>
		</header>
		
		<div className="space-y-16">
		<section>
		<h2 className="text-3xl font-black text-white uppercase mb-8 italic">I. Acceptance of Terms</h2>
		<p className="text-xl leading-relaxed">
		By initializing any module within the AIMFROST suite, you enter into a binding agreement to adhere to these operational protocols. If you do not agree with the high-velocity reconnaissance standards set herein, you must terminate your session immediately.
		</p>
		</section>
		
		<section className="space-y-6">
		<h2 className="text-3xl font-black text-white uppercase italic">II. Ethical Use & Conduct</h2>
		<p className="leading-relaxed text-lg">
		AIMFROST is designed for authorized security professionals, researchers, and system administrators. Users are strictly prohibited from:
		</p>
		<div className="grid grid-cols-1 gap-4 border-y border-zinc-900 py-8">
		<div className="flex gap-4 items-start">
		<span className="text-cyan-500 font-bold">01/</span>
		<p>Engaging in any form of active exploitation or disruptive behavior against private networks.</p>
		</div>
		<div className="flex gap-4 items-start">
		<span className="text-cyan-500 font-bold">02/</span>
		<p>Using the framework to harass, stalk, or gather non-public personal information (Pii).</p>
		</div>
		<div className="flex gap-4 items-start">
		<span className="text-cyan-500 font-bold">03/</span>
		<p>Automating queries in a manner that exceeds the rate limits of our upstream data providers.</p>
		</div>
		</div>
		</section>
		
		<section>
		<h2 className="text-3xl font-black text-white uppercase mb-8 italic">III. Intellectual Property</h2>
		<p className="leading-relaxed text-lg">
		The architecture, custom UI components, and integrated logic of AIMFROST remain the exclusive property of the development group. Redistribution of modified core binaries is only permitted under explicit open-source licenses.
		</p>
		</section>
		</div>
		</div>
		</div>
	);
}
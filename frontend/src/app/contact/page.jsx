"use client";
import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', msg: 'INITIALIZING_UPLINK...' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ type: 'success', msg: 'TRANSMISSION_SUCCESSFUL_STORED_IN_DB' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('FAILED_TO_CONNECT_TO_DB');
      }
    } catch (error) {
      setStatus({ type: 'error', msg: 'ERR: UPLINK_INTERRUPTED' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-cyan-500 font-mono py-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-16 border-l-4 border-cyan-500 pl-8">
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase mb-4 italic">Establish <span className="text-cyan-500">Contact</span></h1>
          <p className="text-zinc-500 text-sm tracking-widest uppercase font-bold">
            Secure Communications // AIMFROST Core Team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase text-cyan-900 font-black mb-2 block tracking-widest italic">Source_Identity</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="NAME / ALIAS" 
                  className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors uppercase text-xs"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] uppercase text-cyan-900 font-black mb-2 block tracking-widest italic">Return Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="USER@DOMAIN.COM" 
                  className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors uppercase text-xs"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] uppercase text-cyan-900 font-black mb-2 block tracking-widest italic">Encrypted Payload</label>
                <textarea 
                  rows="5" 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="TYPE YOUR MESSAGE..." 
                  className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none uppercase text-xs"
                  required
                ></textarea>
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full py-4 bg-cyan-500 text-black font-black cursor-pointer uppercase tracking-widest hover:bg-white transition-all transform active:scale-95"
            >
              Execute Transmission
            </button>

            {status.msg && (
              <div className={`text-[10px] font-black uppercase mt-4 animate-pulse ${status.type === 'error' ? 'text-red-500' : 'text-cyan-500'}`}>
                {`> ${status.msg}`}
              </div>
            )}
          </form>

          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-white font-black uppercase tracking-widest text-sm italic">Direct Channels</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Email Uplink</p>
                  <p className="text-cyan-400 font-bold hover:text-white transition-colors cursor-pointer">aimfrost-osint@proton.me.com</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Source Code</p>
                  <p className="text-cyan-400 font-bold hover:text-white cursor-pointer transition-colors">github.com/Nass0x/Aimfrost</p>
                </div>
              </div>
            </div>

            <div className="p-8 border border-cyan-900/30 bg-cyan-950/5 relative group">
              <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-500 animate-pulse"></div>
              <h4 className="text-white text-[10px] font-black uppercase mb-4 italic tracking-widest">Operational Notice</h4>
              <p className="text-xs text-zinc-500 leading-relaxed font-bold italic">
                Our support node is active 24/7. Response times for non-critical inquiries may vary. Expect encryption overhead.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
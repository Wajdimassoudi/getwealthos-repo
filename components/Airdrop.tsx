
import React, { useState, useEffect } from 'react';
import { 
  Coins, 
  ArrowLeft, 
  ChevronRight, 
  Zap, 
  Globe, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  User, 
  Copy, 
  ExternalLink,
  Cpu,
  Gem,
  CheckCircle2,
  Rocket
} from 'lucide-react';

interface AirdropProps {
  onBack: () => void;
}

const BUYERS = [
  { name: "Ahmed_DXB", location: "UAE", amount: "250 USDT", time: "2m ago" },
  { name: "Li_Wei", location: "China", amount: "1,200 USDT", time: "5m ago" },
  { name: "Sarah_London", location: "UK", amount: "50 USDT", time: "8m ago" },
  { name: "Khalid_KSA", location: "Saudi Arabia", amount: "800 USDT", time: "12m ago" },
  { name: "Yuki_Tokyo", location: "Japan", amount: "300 USDT", time: "15m ago" },
  { name: "Moe_Lebanon", location: "Lebanon", amount: "150 USDT", time: "20m ago" },
  { name: "Chen_Shanghai", location: "China", amount: "2,500 USDT", time: "25m ago" }
];

const Airdrop: React.FC<AirdropProps> = ({ onBack }) => {
  const [price, setPrice] = useState(0.0364);
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(74);
  const walletAddress = "0x9eb989d94300c1a7a8a2f2ba03201ed3395ffff3";

  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.45) * 0.0001; // Slightly biased upward
      setPrice(prev => Number((prev + change).toFixed(6)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 pb-20 relative overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <nav className="border-b border-white/5 bg-slate-950/40 backdrop-blur-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-xl transition-all flex items-center gap-2 text-xs font-black uppercase text-slate-400">
            <ArrowLeft size={18} /> Back
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
               <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Live: ${price}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-12 space-y-12">
        
        {/* Hero Section / Logo */}
        <section className="text-center space-y-6 relative">
          <div className="inline-block relative">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-[2.5rem] flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.3)] border-4 border-white/10 relative z-10 overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)]"></div>
               <Coins size={48} className="text-white drop-shadow-lg md:hidden" />
               <Coins size={64} className="text-white drop-shadow-lg hidden md:block" />
            </div>
            {/* Logo Sub-elements */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center border-2 border-slate-950 z-20">
               <Zap size={14} className="text-white fill-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="font-orbitron text-4xl md:text-6xl font-black text-white tracking-tighter">
              WEALTH <span className="text-amber-500">$WOS</span> TOKEN
            </h1>
            <p className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-[0.4em]">The Future of AI-Driven Liquidity</p>
          </div>
        </section>

        {/* Token Progress */}
        <section className="glass-panel p-8 rounded-[2.5rem] border border-white/10 space-y-6">
          <div className="flex justify-between items-end">
             <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Public Sale Progress</span>
                <div className="text-2xl font-orbitron text-white">{progress}% Claimed</div>
             </div>
             <div className="text-right">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Supply</span>
                <div className="text-xl font-orbitron text-amber-500">1,000,000,000 WOS</div>
             </div>
          </div>
          <div className="h-4 bg-slate-950 rounded-full border border-white/5 p-1 relative overflow-hidden">
             <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)]" style={{ width: `${progress}%` }}></div>
             <div className="absolute inset-0 shimmer-effect opacity-30"></div>
          </div>
          <div className="flex justify-between text-[8px] font-black text-slate-600 uppercase tracking-[0.2em]">
             <span>Phase 1: Seed</span>
             <span className="text-amber-500">Active Phase: Presale</span>
             <span>Phase 3: DEX Listing</span>
          </div>
        </section>

        {/* Info Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 space-y-4">
             <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/20 text-cyan-400">
                <Rocket size={24} />
             </div>
             <h3 className="text-lg font-orbitron font-black text-white uppercase">Ecosystem Utility</h3>
             <p className="text-xs text-slate-400 leading-relaxed font-medium">
               $WOS serves as the governance and reward token for the WealthOS ecosystem. Holders receive 2% of all network transaction fees automatically redistributed to their wallets.
             </p>
          </div>
          <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 space-y-4">
             <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20 text-purple-400">
                <ShieldCheck size={24} />
             </div>
             <h3 className="text-lg font-orbitron font-black text-white uppercase">Security Protocol</h3>
             <p className="text-xs text-slate-400 leading-relaxed font-medium">
               Liquidity is locked for 24 months. Contract audited by QuantStamp. Anti-whale mechanism limits single transactions to 0.5% of total supply.
             </p>
          </div>
        </section>

        {/* Investment Portal */}
        <section className="glass-panel p-10 rounded-[3rem] border-2 border-amber-500/30 bg-gradient-to-b from-amber-500/5 to-transparent relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Cpu size={150} /></div>
          
          <div className="relative z-10 flex flex-col items-center space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-orbitron font-black text-white uppercase tracking-widest">Join Private Sale</h2>
              <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">Min Buy: 5 USDT • Network: BEP20 (BNB Smart Chain)</p>
            </div>

            <div className="w-full max-w-md space-y-4">
               <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Payment Address (BEP20)</span>
                    {copied && <span className="text-[8px] font-black text-emerald-500 uppercase">Copied!</span>}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 font-mono text-xs text-cyan-400 truncate bg-black/50 p-3 rounded-xl border border-white/5">
                      {walletAddress}
                    </div>
                    <button onClick={handleCopy} className="p-3.5 bg-white text-slate-950 rounded-xl hover:scale-110 active:scale-95 transition-all">
                       <Copy size={18} />
                    </button>
                  </div>
               </div>
               
               <div className="flex items-start gap-4 p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
                  <AlertCircle size={20} className="text-amber-500 shrink-0" />
                  <p className="text-[9px] font-bold text-slate-400 uppercase leading-relaxed">
                    Tokens will be automatically distributed to your sender wallet within 24 hours of confirmation. Make sure to use <span className="text-white">BEP20</span> network only.
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full text-center">
               <div className="p-4 bg-slate-950 rounded-2xl border border-white/5">
                  <div className="text-[8px] font-black text-slate-500 uppercase mb-1">Price</div>
                  <div className="text-xs font-orbitron text-white">${price}</div>
               </div>
               <div className="p-4 bg-slate-950 rounded-2xl border border-white/5">
                  <div className="text-[8px] font-black text-slate-500 uppercase mb-1">Network</div>
                  <div className="text-xs font-orbitron text-white">BEP20</div>
               </div>
               <div className="p-4 bg-slate-950 rounded-2xl border border-white/5">
                  <div className="text-[8px] font-black text-slate-500 uppercase mb-1">Symbol</div>
                  <div className="text-xs font-orbitron text-white">$WOS</div>
               </div>
            </div>
          </div>
        </section>

        {/* Global Activity Feed */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-3">
              <Globe size={14} className="text-cyan-400" /> Recent Global Adoptions
            </h2>
            <div className="flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
               <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Verified Purchases</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {BUYERS.map((buyer, idx) => (
              <div key={idx} className="glass-panel p-4 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-cyan-500/30 transition-all">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500">
                      <User size={18} />
                   </div>
                   <div>
                      <div className="text-xs font-bold text-white uppercase tracking-wider">{buyer.name}</div>
                      <div className="text-[8px] font-black text-slate-600 uppercase tracking-tighter">{buyer.location} • {buyer.time}</div>
                   </div>
                </div>
                <div className="text-right">
                   <div className="text-[10px] font-black text-emerald-400 uppercase">Purchased</div>
                   <div className="text-xs font-orbitron text-white">{buyer.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer info */}
        <section className="pt-10 text-center pb-20">
           <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em]">
             $WOS Smart Contract: {walletAddress}
           </p>
        </section>

      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-xs px-6">
         <button 
           onClick={handleCopy}
           className="w-full bg-amber-500 text-slate-950 py-4.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_10px_40px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
         >
           {copied ? <CheckCircle2 size={18} /> : <Coins size={18} />}
           {copied ? "COPIED" : "INVEST NOW"}
         </button>
      </div>
    </div>
  );
};

export default Airdrop;

const AlertCircle = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);


import React, { useState, useEffect, useCallback } from 'react';
import { 
  DollarSign, 
  Zap, 
  Cpu, 
  Wallet, 
  Activity,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  Maximize2,
  Terminal,
  LogOut,
  CheckCircle2,
  ArrowUpRight,
  Clock,
  Lock,
  Unlock,
  Users,
  Share2,
  Copy,
  ExternalLink,
  MessageCircle,
  UserPlus,
  Star,
  Coins,
  Gem
} from 'lucide-react';
import { ViewLog, UserRecord } from '../types';
import FakeNotifications from './FakeNotifications';
import { supabase } from '../services/supabase';

const DAILY_LIMIT = 21; 
const REF_REWARD = 0.10;
const MIN_WITHDRAW = 5.0;

interface DashboardProps {
  username: string;
  onLogout: () => void;
  onNavigateAirdrop: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ username, onLogout, onNavigateAirdrop }) => {
  const [userData, setUserData] = useState<UserRecord | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [viewedToday, setViewedToday] = useState<number>(0);
  const [wallet, setWallet] = useState<string>('');
  const [viewLog, setViewLog] = useState<ViewLog[]>([]);
  
  const [loadingNode, setLoadingNode] = useState<number | null>(null);
  const [flashNotify, setFlashNotify] = useState<ViewLog | null>(null);
  const [withdrawError, setWithdrawError] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const isWithdrawalDay = new Date().getDate() === 7;
  const isWalletLocked = !!wallet && !isWithdrawalDay;
  const referralLink = `${window.location.origin}?ref=${userData?.referral_code || ''}`;

  const syncFromCloud = useCallback(async () => {
    setIsSyncing(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .maybeSingle();
      
      if (data && !error) {
        const lastReset = new Date(data.last_reset);
        const today = new Date();
        const isNewDay = lastReset.toDateString() !== today.toDateString();

        let currentViewed = data.viewed_today || 0;
        if (isNewDay) {
          currentViewed = 0;
          await supabase.from('users').update({ 
            viewed_today: 0, 
            last_reset: today.toISOString() 
          }).eq('id', data.id);
        }

        setUserData(data);
        setBalance(data.earnings || 0);
        setViewedToday(currentViewed);
        
        const local = localStorage.getItem(`wealth_settings_${username}`);
        if (local) {
          const p = JSON.parse(local);
          setWallet(p.wallet || '');
          setViewLog(p.viewLog || []);
        }
      }
    } catch (e) {
      console.error("Sync error:", e);
    } finally {
      setIsSyncing(false);
    }
  }, [username]);

  useEffect(() => {
    syncFromCloud();
  }, [syncFromCloud]);

  const handleClaim = async (reward: number) => {
    if (viewedToday >= DAILY_LIMIT) return;
    if (!userData) return;

    const newBalance = balance + reward;
    const newViewed = viewedToday + 1;

    setBalance(newBalance);
    setViewedToday(newViewed);
    const log: ViewLog = { timestamp: new Date().toISOString(), reward, id: Date.now() };
    const newLogs = [log, ...viewLog].slice(0, 10);
    setViewLog(newLogs);
    setFlashNotify(log);

    // Update Cloud
    await supabase.from('users').update({ 
      earnings: newBalance,
      viewed_today: newViewed 
    }).eq('id', userData.id);

    localStorage.setItem(`wealth_settings_${username}`, JSON.stringify({
      wallet, viewLog: newLogs
    }));

    setTimeout(() => setFlashNotify(null), 2000);
  };

  const triggerQualiClick = () => {
    // @ts-ignore
    (function(i,n,t,s,p,l){
      // @ts-ignore
      i.intstl = i.intstl || function() {
        // @ts-ignore
        (i.intstl.q=(i.intstl.q||[])).push(arguments)
      };
      var head=n.getElementsByTagName('head')[0];
      var q=n.createElement('script'); q.async=true;
      q.src='https://static.qualiclicks.com/intstl/intstl.js';
      head.appendChild(q);
      // @ts-ignore
      i.intstl('init', {
        host: 'xml.qualiclicks.com',
        feed: 1036040,
        auth : 'Yfzb',
        logo: 'https://adk.ezmob.com/images/icoLogo.png',
        color1: '#3c8dbc', color2: '#307196',
        textColor: 'white', background: '#f7f7f6',
        engagementPeriod: 11,
        interval: 5,
        defer: 4
      });
      // @ts-ignore
      i.intstl('show');
    })(window, document);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setFlashNotify({ id: 1, reward: 0, timestamp: '' });
    setTimeout(() => setFlashNotify(null), 1000);
  };

  const handleWithdrawRequest = () => {
    if (balance < MIN_WITHDRAW) setWithdrawError(`Min balance required: $${MIN_WITHDRAW} USDT`);
    else if (!isWithdrawalDay) setWithdrawError(`Window opens on the 7th of the month.`);
    else if (!wallet.trim()) setWithdrawError(`Enter USDT TRC20 address.`);
    else {
      setWithdrawError(null);
      alert("Withdrawal protocol initiated!");
      setBalance(0);
    }
    setTimeout(() => setWithdrawError(null), 5000);
  };

  const AD_POOL = [
    { type: 'quali', icon: <Star className="text-amber-400 fill-amber-400" />, label: 'PREMIUM NODE' },
    { url: 'https://repulsive-stock.com/O463gU', icon: <Cpu className="text-cyan-400" />, label: 'CORE NODE' },
    { url: 'https://repulsive-stock.com/O463gU', icon: <Zap className="text-amber-400" />, label: 'VOLT NODE' },
    { url: 'https://repulsive-stock.com/O463gU', icon: <Activity className="text-emerald-400" />, label: 'PULSE NODE' },
    { url: 'https://faucetpay.io/?r=42423', icon: <Maximize2 className="text-blue-400" />, label: 'GLOBAL NODE' }
  ];

  const TICKER_TEXT = "INITIALIZING ECOSYSTEM: $WOS TOKEN LAUNCHING SOON • QUANTUM DEFI INTEGRATION IN PROGRESS • SECURE YOUR NODE FOR EARLY AIRDROP ELIGIBILITY • ";

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans pb-20">
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-ticker {
          display: inline-block;
          white-space: nowrap;
          animation: ticker 60s linear infinite;
        }
        .ticker-container:hover .animate-ticker {
          animation-play-state: paused;
        }
      `}</style>

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.08)_0%,transparent_50%)] pointer-events-none"></div>
      <FakeNotifications />
      
      <nav className="border-b border-white/5 bg-slate-950/40 backdrop-blur-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/30">
              <Terminal size={18} className="text-cyan-400" />
            </div>
            <div>
              <h1 className="font-orbitron text-sm md:text-lg font-black text-white tracking-widest uppercase">
                WEALTH <span className="text-cyan-500">OS</span>
              </h1>
              <div className="flex items-center gap-2 text-[8px] font-bold text-slate-500 uppercase">
                <span className={`w-1.5 h-1.5 rounded-full ${isSyncing ? 'bg-amber-500 animate-spin' : 'bg-emerald-500 animate-pulse'}`}></span> 
                {isSyncing ? 'Syncing...' : 'Connected'}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={onNavigateAirdrop}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-xl text-[10px] font-black uppercase text-amber-500 hover:bg-amber-500/20 transition-all active:scale-95 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
            >
              <Gem size={14} className="animate-pulse" /> $WOS TOKEN
            </button>
            <button onClick={onLogout} className="p-2.5 bg-white/5 hover:bg-red-500/10 hover:text-red-400 rounded-xl border border-white/10 transition-all">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* Crypto Ticker Announcement */}
      <div className="w-full bg-cyan-950/20 border-b border-cyan-500/10 py-2.5 overflow-hidden ticker-container relative z-40">
        <div className="max-w-7xl mx-auto flex items-center relative">
          <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#020617] to-transparent w-12 z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-[#020617] to-transparent w-12 z-10"></div>
          
          <div className="flex items-center gap-4 bg-cyan-500/10 px-4 py-1.5 rounded-r-lg border-r border-cyan-500/30 z-20 shrink-0">
             <Coins size={14} className="text-cyan-400 animate-bounce" />
             <span className="text-[9px] font-black text-cyan-400 uppercase tracking-tighter">Live Alert</span>
          </div>

          <div className="animate-ticker">
            <span className="text-[11px] md:text-sm font-bold text-slate-400 uppercase tracking-[0.25em] px-8">
              {TICKER_TEXT} {TICKER_TEXT}
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-6 space-y-6">
        
        {/* Stats Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-panel p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5"><DollarSign size={120} /></div>
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Available Yield</h3>
                <button 
                  onClick={onNavigateAirdrop}
                  className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1 rounded-full text-[9px] font-black uppercase flex items-center gap-2 hover:bg-amber-500/20"
                >
                  <Coins size={12} /> Claim Airdrop
                </button>
              </div>
              <div className="text-5xl md:text-7xl font-orbitron font-black text-white tracking-tighter">${balance.toFixed(4)}</div>
              <div className="flex gap-4">
                <div className="bg-slate-900/50 px-3 py-1 rounded-full text-[9px] font-black text-slate-400 border border-white/5">USDT TRC20</div>
                <div className="bg-slate-900/50 px-3 py-1 rounded-full text-[9px] font-black text-slate-400 border border-white/5">NODE: {userData?.referral_code || '...'}</div>
              </div>
              <button onClick={handleWithdrawRequest} className="w-full sm:w-auto bg-cyan-500 text-slate-950 px-8 py-4.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:scale-105 transition-all flex items-center justify-center gap-3 mt-4">Withdraw Now <ArrowUpRight size={18} /></button>
              {withdrawError && <p className="text-red-400 text-[10px] font-bold uppercase animate-pulse mt-2">{withdrawError}</p>}
            </div>
          </div>

          <div className="glass-panel p-8 rounded-[2.5rem] border border-white/10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Payout Wallet</h3>
                <span className={`text-[8px] font-black px-2 py-1 rounded-lg border ${isWalletLocked ? 'text-amber-500 border-amber-500/20' : 'text-emerald-500 border-emerald-500/20'}`}>
                  {isWalletLocked ? 'LOCKED' : 'ACTIVE'}
                </span>
              </div>
              <input 
                type="text" 
                value={wallet} 
                disabled={isWalletLocked} 
                onChange={(e) => setWallet(e.target.value)} 
                placeholder="TRC20 ADDRESS" 
                className="w-full bg-slate-950 border border-white/5 rounded-xl py-4 px-5 text-xs font-mono text-cyan-400 focus:border-cyan-500/40 outline-none" 
              />
              <p className="text-[8px] text-slate-600 font-bold uppercase">Locked until payout day (7th).</p>
            </div>
          </div>
        </section>

        {/* Referrals Section */}
        <section className="glass-panel p-8 rounded-[2.5rem] border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-amber-500">
                <Users size={24} />
                <h2 className="text-xl font-orbitron font-black uppercase">Network Nodes</h2>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Invite verified operators to gain <span className="text-amber-500">$0.10</span> per node.</p>
              <div className="flex gap-4">
                <div className="p-4 bg-slate-950 rounded-2xl border border-white/5 flex-1">
                  <div className="text-[9px] font-black text-slate-500 uppercase">Total Nodes</div>
                  <div className="text-xl font-orbitron text-white">{userData?.referrals || 0}</div>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl border border-white/5 flex-1">
                  <div className="text-[9px] font-black text-slate-500 uppercase">Referral Bonus</div>
                  <div className="text-xl font-orbitron text-amber-500">${((userData?.referrals || 0) * REF_REWARD).toFixed(2)}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-white/5 text-[10px] font-mono text-slate-500 truncate max-w-xs">{referralLink}</div>
              <div className="flex gap-2">
                <button onClick={handleCopyLink} className="flex-1 bg-amber-500 text-slate-950 py-3.5 rounded-xl font-black text-[10px] uppercase hover:scale-105 active:scale-95 transition-all">Copy Link</button>
                <button onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=Join+WealthOS`, '_blank')} className="bg-[#229ED9] p-3.5 rounded-xl text-white"><Share2 size={16} /></button>
              </div>
            </div>
          </div>
        </section>

        {/* Earning Nodes */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-orbitron font-black text-white flex items-center gap-3 uppercase"><Zap className="text-cyan-400 animate-pulse" /> Profit Nodes</h2>
            <div className="text-[10px] font-black text-slate-500">DAILY: <span className="text-cyan-400">{viewedToday}</span>/{DAILY_LIMIT}</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {AD_POOL.map((ad, idx) => (
              <button 
                key={idx} 
                disabled={loadingNode !== null || viewedToday >= DAILY_LIMIT} 
                onClick={() => { 
                  setLoadingNode(idx); 
                  if (ad.type === 'quali') {
                    triggerQualiClick();
                  } else if (ad.url) {
                    window.open(ad.url, '_blank'); 
                  }
                  setTimeout(() => { 
                    handleClaim(0.002 + Math.random() * 0.005); 
                    setLoadingNode(null); 
                  }, 4000); 
                }} 
                className={`glass-panel aspect-[4/5] rounded-[2rem] border border-white/5 flex flex-col items-center justify-center gap-4 transition-all hover:border-cyan-500/40 active:scale-95 disabled:opacity-30 ${ad.type === 'quali' ? 'border-amber-500/30 bg-amber-500/5 shadow-[0_0_20px_rgba(245,158,11,0.1)]' : ''}`}
              >
                {loadingNode === idx ? (
                  <RefreshCw size={24} className="text-cyan-400 animate-spin" />
                ) : (
                  <>
                    <div className={`p-4 rounded-2xl border border-white/5 ${ad.type === 'quali' ? 'bg-amber-500/10' : 'bg-slate-950'}`}>{ad.icon}</div>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${ad.type === 'quali' ? 'text-amber-400' : 'text-slate-500'}`}>{ad.label || 'Connect'}</span>
                  </>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Ledger */}
        <section className="pb-10">
           <h2 className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4 flex items-center gap-2"><Terminal size={14} /> Ledger Log</h2>
           <div className="glass-panel rounded-[2rem] border border-white/5 divide-y divide-white/5">
             {viewLog.length === 0 ? (
               <div className="p-10 text-center text-[9px] font-bold text-slate-700 uppercase">Awaiting node synchronization...</div>
             ) : viewLog.map((log) => (
               <div key={log.id} className="p-5 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                     <Activity size={16} className="text-emerald-500" />
                   </div>
                   <div>
                     <div className="text-[10px] font-black text-white uppercase tracking-widest">Yield_Confirmed</div>
                     <div className="text-[8px] font-bold text-slate-600 uppercase">{new Date(log.timestamp).toLocaleTimeString()}</div>
                   </div>
                 </div>
                 <div className="text-sm font-orbitron font-black text-emerald-400">+${log.reward.toFixed(4)}</div>
               </div>
             ))}
           </div>
        </section>
      </main>

      {flashNotify && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-12 px-6 py-4 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase shadow-2xl flex items-center gap-3">
          <CheckCircle2 size={16} className="text-emerald-500" /> 
          {flashNotify.reward > 0 ? `Captured +$${flashNotify.reward.toFixed(4)}` : 'Protocol Copied'}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

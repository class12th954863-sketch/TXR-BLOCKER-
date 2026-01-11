
import React, { useState } from 'react';
import { Language, AppInfo } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StudyAssistant from './StudyAssistant';

interface Props {
  language: Language;
  onLogout: () => void;
}

const MOCK_USAGE_DATA = [
  { name: '08:00', minutes: 12 },
  { name: '10:00', minutes: 45 },
  { name: '12:00', minutes: 30 },
  { name: '14:00', minutes: 80 },
  { name: '16:00', minutes: 40 },
  { name: '18:00', minutes: 95 },
  { name: '20:00', minutes: 20 },
];

const INITIAL_APPS: AppInfo[] = [
  { id: '1', name: 'Instagram', icon: 'fab fa-instagram', blocked: true, usageMinutes: 45 },
  { id: '2', name: 'YouTube', icon: 'fab fa-youtube', blocked: false, usageMinutes: 120 },
  { id: '3', name: 'WhatsApp', icon: 'fab fa-whatsapp', blocked: true, usageMinutes: 30 },
  { id: '4', name: 'Snapchat', icon: 'fab fa-snapchat', blocked: true, usageMinutes: 15 },
  { id: '5', name: 'Reddit', icon: 'fab fa-reddit', blocked: false, usageMinutes: 65 },
];

const AVAILABLE_ICONS = [
  'fab fa-instagram', 'fab fa-youtube', 'fab fa-whatsapp', 'fab fa-snapchat', 
  'fab fa-reddit', 'fab fa-facebook', 'fab fa-twitter', 'fab fa-tiktok', 
  'fab fa-discord', 'fab fa-linkedin', 'fas fa-book', 'fas fa-graduation-cap', 
  'fas fa-pencil', 'fas fa-clock', 'fas fa-brain', 'fas fa-gamepad', 'fas fa-music'
];

const Dashboard: React.FC<Props> = ({ language, onLogout }) => {
  const [apps, setApps] = useState<AppInfo[]>(INITIAL_APPS);
  const [activeTab, setActiveTab] = useState<'overview' | 'apps' | 'assistant'>('overview');
  const [editingIconAppId, setEditingIconAppId] = useState<string | null>(null);

  const toggleBlock = (id: string) => {
    setApps(prev => prev.map(app => app.id === id ? { ...app, blocked: !app.blocked } : app));
  };

  const updateIcon = (id: string, newIcon: string) => {
    setApps(prev => prev.map(app => app.id === id ? { ...app, icon: newIcon } : app));
    setEditingIconAppId(null);
  };

  const translations = {
    overview: language === Language.HINDI ? 'अवलोकन' : 'Overview',
    apps: language === Language.HINDI ? 'एप्प्स' : 'Apps',
    assistant: language === Language.HINDI ? 'सहायक' : 'Assistant',
    focusTime: language === Language.HINDI ? 'फोकस समय' : 'Focus Time',
    appsBlocked: language === Language.HINDI ? 'ब्लॉक एप्प्स' : 'Apps Blocked',
    usageTrends: language === Language.HINDI ? 'उपयोग का रुझान' : 'Usage Trends',
    welcome: language === Language.HINDI ? 'स्वागत है!' : 'Welcome back!',
    logout: language === Language.HINDI ? 'लॉगआउट' : 'Logout',
    customize: language === Language.HINDI ? 'आइकन बदलें' : 'Change Icon'
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0b1120]">
      {/* Sidebar */}
      <nav className="w-full md:w-64 glass-panel border-r border-slate-800 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <i className="fas fa-lock text-white"></i>
          </div>
          <span className="text-xl font-bold tracking-tight">StudyLock</span>
        </div>

        <div className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-emerald-500/10 text-emerald-500' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <i className="fas fa-chart-line w-5"></i>
            <span className="font-medium">{translations.overview}</span>
          </button>
          <button 
            onClick={() => setActiveTab('apps')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'apps' ? 'bg-emerald-500/10 text-emerald-500' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <i className="fas fa-th-large w-5"></i>
            <span className="font-medium">{translations.apps}</span>
          </button>
          <button 
            onClick={() => setActiveTab('assistant')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'assistant' ? 'bg-emerald-500/10 text-emerald-500' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <i className="fas fa-brain w-5"></i>
            <span className="font-medium">{translations.assistant}</span>
          </button>
        </div>

        <button 
          onClick={onLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-400 transition-colors"
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>{translations.logout}</span>
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">{translations.welcome}</h2>
            <p className="text-slate-400 text-sm">{new Date().toLocaleDateString(language === Language.HINDI ? 'hi-IN' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex gap-4">
             <div className="hidden sm:flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
               <span className="text-xs font-medium text-slate-300">Live Focus Mode Active</span>
             </div>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard icon="fa-hourglass-half" color="text-blue-400" label={translations.focusTime} value="4h 12m" subValue="+12% from yesterday" />
              <StatCard icon="fa-shield-halved" color="text-emerald-400" label={translations.appsBlocked} value={apps.filter(a => a.blocked).length.toString()} subValue="Currently active" />
              <StatCard icon="fa-fire" color="text-orange-400" label="Current Streak" value="7 Days" subValue="Master Level" />
              <StatCard icon="fa-brain" color="text-purple-400" label="Study Score" value="88/100" subValue="Excellent progress" />
            </div>

            <div className="glass-panel rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-6">{translations.usageTrends}</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_USAGE_DATA}>
                    <defs>
                      <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                      itemStyle={{ color: '#10b981' }}
                    />
                    <Area type="monotone" dataKey="minutes" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div className="glass-panel rounded-2xl p-6">
                 <h3 className="text-lg font-semibold mb-4">Top Distractions</h3>
                 <div className="space-y-4">
                   {apps.sort((a, b) => b.usageMinutes - a.usageMinutes).slice(0, 3).map(app => (
                     <div key={app.id} className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
                            <i className={`${app.icon} text-slate-400`}></i>
                         </div>
                         <span className="font-medium">{app.name}</span>
                       </div>
                       <div className="text-right">
                         <div className="text-sm font-semibold text-slate-200">{app.usageMinutes} mins</div>
                         <div className="text-xs text-slate-500">Today</div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
               <div className="glass-panel rounded-2xl p-6 bg-gradient-to-br from-emerald-500/10 to-transparent">
                  <h3 className="text-lg font-semibold mb-2">Did you know?</h3>
                  <p className="text-slate-400 text-sm mb-4">Taking short breaks every 50 minutes can increase your productivity by up to 20%.</p>
                  <button onClick={() => setActiveTab('assistant')} className="text-emerald-500 font-medium text-sm flex items-center gap-2 hover:gap-3 transition-all">
                    Ask Study Assistant <i className="fas fa-arrow-right"></i>
                  </button>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'apps' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {apps.map(app => (
              <div key={app.id} className="glass-panel p-6 rounded-2xl flex flex-col items-center gap-4 text-center group relative overflow-hidden">
                <button 
                  onClick={() => setEditingIconAppId(app.id)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-emerald-400 transition-colors opacity-0 group-hover:opacity-100"
                  title={translations.customize}
                >
                  <i className="fas fa-pencil-alt text-sm"></i>
                </button>

                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all ${app.blocked ? 'bg-red-500/20 text-red-500 scale-110 shadow-lg shadow-red-500/10' : 'bg-slate-800 text-slate-400'}`}>
                  <i className={`${app.icon}`}></i>
                </div>
                <div>
                  <h4 className="text-xl font-bold">{app.name}</h4>
                  <p className="text-slate-500 text-sm">Used for {app.usageMinutes}m today</p>
                </div>
                <button 
                  onClick={() => toggleBlock(app.id)}
                  className={`mt-2 w-full py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${app.blocked ? 'bg-red-500 hover:bg-red-400 text-white shadow-lg shadow-red-900/20' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
                >
                  <i className={`fas ${app.blocked ? 'fa-lock' : 'fa-unlock'}`}></i>
                  {app.blocked ? 'Blocked' : 'Unblocked'}
                </button>

                {/* Icon Selection Overlay */}
                {editingIconAppId === app.id && (
                  <div className="absolute inset-0 bg-slate-900/95 z-10 p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-bold">{translations.customize}</span>
                      <button onClick={() => setEditingIconAppId(null)} className="text-slate-400 hover:text-white">
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-2 overflow-y-auto pr-1">
                      {AVAILABLE_ICONS.map(iconClass => (
                        <button 
                          key={iconClass}
                          onClick={() => updateIcon(app.id, iconClass)}
                          className={`p-2 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center ${app.icon === iconClass ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400'}`}
                        >
                          <i className={`${iconClass} text-xl`}></i>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'assistant' && (
          <StudyAssistant language={language} />
        )}
      </main>
    </div>
  );
};

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  subValue: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, subValue, color }) => (
  <div className="glass-panel p-6 rounded-2xl shadow-lg hover:border-slate-600 transition-colors">
    <div className={`w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-4 ${color}`}>
      <i className={`fas ${icon} text-xl`}></i>
    </div>
    <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">{label}</div>
    <div className="text-2xl font-bold mb-1">{value}</div>
    <div className="text-[10px] text-slate-500">{subValue}</div>
  </div>
);

export default Dashboard;

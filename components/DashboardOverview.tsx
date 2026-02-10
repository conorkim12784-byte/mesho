
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Shield, MessageSquare, Zap } from 'lucide-react';

const data = [
  { name: 'Mon', messages: 400, actions: 24 },
  { name: 'Tue', messages: 300, actions: 13 },
  { name: 'Wed', messages: 200, actions: 98 },
  { name: 'Thu', messages: 278, actions: 39 },
  { name: 'Fri', messages: 189, actions: 48 },
  { name: 'Sat', messages: 239, actions: 38 },
  { name: 'Sun', messages: 349, actions: 43 },
];

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg bg-${color}-500/10 text-${color}-500`}>
        <Icon size={24} />
      </div>
      <span className="text-xs font-medium text-emerald-500">+12%</span>
    </div>
    <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-white mt-1">{value}</p>
  </div>
);

const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value="12,458" icon={Users} color="blue" />
        <StatCard title="Spam Prevented" value="1,240" icon={Shield} color="emerald" />
        <StatCard title="AI Interactions" value="854" icon={MessageSquare} color="purple" />
        <StatCard title="System Load" value="12ms" icon={Zap} color="orange" />
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h3 className="text-lg font-semibold text-white mb-6">Activity Trends</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorMsg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                itemStyle={{ color: '#10b981' }}
              />
              <Area type="monotone" dataKey="messages" stroke="#10b981" fillOpacity={1} fill="url(#colorMsg)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-white font-semibold mb-4">Live Logs</h3>
          <div className="space-y-3">
            {[
              { time: '12:45:01', action: 'Anti-Spam', user: 'User_492', msg: 'Message deleted' },
              { time: '12:44:52', action: 'Rank Change', user: 'Admin_X', msg: 'Promoted User_12' },
              { time: '12:43:10', action: 'AI Reply', user: 'Bot', msg: 'Handled !ai prompt' },
            ].map((log, i) => (
              <div key={i} className="flex gap-4 items-center text-sm border-b border-slate-800/50 pb-2">
                <span className="text-slate-500 tabular-nums">{log.time}</span>
                <span className="text-emerald-500 font-medium w-24">{log.action}</span>
                <span className="text-slate-300 flex-1">{log.msg}</span>
                <span className="text-slate-500 text-xs italic">@{log.user}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-white font-semibold mb-4">Bot Status</h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Connection</span>
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">Active</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Webhook URL</span>
                    <code className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300 underline cursor-pointer">tlashany.vercel.app/api/webhook</code>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Runtime</span>
                    <span className="text-slate-300">Node.js 18.x (Vercel)</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;

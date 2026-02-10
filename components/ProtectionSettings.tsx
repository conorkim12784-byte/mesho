
import React, { useState } from 'react';
import { Shield, Ban, AlertTriangle, Zap, CheckCircle2 } from 'lucide-react';

const ProtectionSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    antiSpam: true,
    antiFlood: true,
    blockLinks: false,
    aiFilter: true,
    muteNewUsers: false,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const SettingRow = ({ title, description, icon: Icon, state, onToggle }: any) => (
    <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors">
      <div className="flex items-start gap-4">
        <div className={`mt-1 p-2 rounded-lg ${state ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
          <Icon size={20} />
        </div>
        <div>
          <h4 className="font-semibold text-slate-200">{title}</h4>
          <p className="text-sm text-slate-500 max-w-md">{description}</p>
        </div>
      </div>
      <button 
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${state ? 'bg-emerald-600' : 'bg-slate-700'}`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${state ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="text-emerald-500" />
        <h2 className="text-2xl font-bold text-white">Security & Protection</h2>
      </div>

      <div className="grid gap-4">
        <SettingRow 
          title="Anti-Spam Engine" 
          description="Detects and removes repetitive messages and common spam patterns automatically."
          icon={Ban}
          state={settings.antiSpam}
          onToggle={() => toggle('antiSpam')}
        />
        <SettingRow 
          title="Flood Protection" 
          description="Restricts users from sending more than 5 messages per 10 seconds."
          icon={Zap}
          state={settings.antiFlood}
          onToggle={() => toggle('antiFlood')}
        />
        <SettingRow 
          title="Link Filtering" 
          description="Automatically removes external links sent by members below Moderator rank."
          icon={Shield}
          state={settings.blockLinks}
          onToggle={() => toggle('blockLinks')}
        />
        <SettingRow 
          title="AI Sentiment Analysis" 
          description="Uses Gemini AI to detect toxic behavior or inappropriate content in real-time."
          icon={CheckCircle2}
          state={settings.aiFilter}
          onToggle={() => toggle('aiFilter')}
        />
        <SettingRow 
          title="New Member Restriction" 
          description="Newly joined members are automatically muted for the first 24 hours."
          icon={AlertTriangle}
          state={settings.muteNewUsers}
          onToggle={() => toggle('muteNewUsers')}
        />
      </div>

      <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex gap-4 items-start">
        <AlertTriangle className="text-amber-500 shrink-0 mt-1" />
        <div>
          <h5 className="text-amber-500 font-semibold text-sm uppercase tracking-wider">Warning</h5>
          <p className="text-amber-200/80 text-sm">Strict protection settings may occasionally affect legitimate users. Moderators can bypass all filters.</p>
        </div>
      </div>
    </div>
  );
};

export default ProtectionSettings;

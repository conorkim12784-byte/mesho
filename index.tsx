
import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  const botToken = "5715894811:AAEn1rgGrt98NbqlkcGPyz0As4mLv_I65qw";
  const appUrl = "https://tlashany.vercel.app";
  const webhookUrl = `${appUrl}/api/webhook`;
  const activationLink = `https://api.telegram.org/bot${botToken}/setWebhook?url=${webhookUrl}`;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-8 text-center">
      <div className="bg-emerald-500/10 p-10 rounded-[2.5rem] border border-emerald-500/20 max-w-3xl shadow-2xl shadow-emerald-500/5 backdrop-blur-xl">
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3 shadow-lg shadow-emerald-500/20">
          <span className="text-5xl font-black text-slate-950 underline decoration-white/30">T</span>
        </div>
        
        <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent tracking-tighter">
          Tlashany Source
        </h1>
        
        <p className="text-slate-400 mb-10 text-xl font-medium leading-relaxed max-w-xl mx-auto">
          إذا توقف البوت، تأكد من إضافة BOT_TOKEN و API_KEY في إعدادات Vercel.
        </p>

        <div className="space-y-6 text-right bg-slate-900/80 p-8 rounded-[2rem] border border-slate-800 shadow-inner">
          <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full uppercase tracking-widest animate-pulse">
              System Update
            </span>
            <h2 className="text-2xl font-bold text-white">إعادة التفعيل 🔄</h2>
          </div>

          <p className="text-slate-300 mb-4 leading-relaxed">
            بعد تحديث الكود، يجب الضغط على الزر أدناه مرة أخرى للتأكد من ربط التحديث الجديد بتليجرام:
          </p>

          <a 
            href={activationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-5 rounded-2xl text-xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl shadow-emerald-500/10 active:scale-95 text-center"
          >
            تفعيل الويب هوك الآن 🚀
          </a>

          <div className="mt-8 pt-6 border-t border-slate-800 space-y-4">
             <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-right">
                <p className="text-red-400 text-sm">💡 **تنبيه هام:**</p>
                <p className="text-slate-400 text-xs mt-1">
                  تأكد أنك أضفت `API_KEY` الخاص بـ Google Gemini في Vercel ليعمل الذكاء الاصطناعي.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);

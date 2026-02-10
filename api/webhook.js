
import { Telegraf, Markup } from 'telegraf';
import { handleCommands } from './commands.js';
import { protectionMiddleware } from './protection.js';
import { aiReply } from './ai.js';

if (!process.env.BOT_TOKEN) {
  console.error('BOT_TOKEN is missing!');
}

const bot = new Telegraf(process.env.BOT_TOKEN || '');
const SOURCE_GIF = 'https://i.postimg.cc/wxV3PspQ/1756574872401.gif';

// 1.middlewares
bot.use(protectionMiddleware);

// 2. Actions (Inline Buttons)
bot.action('help_main', async (ctx) => {
  try {
    await ctx.editMessageCaption(`🛡️ **أوامر الحماية والإدارة:**\n━━━━━━━━━━━━━\n• كتم / حظر / تقييد (بالرد)\n• منع الروابط / منع التوجيه\n• مسح + عدد (مسح رسائل)\n• رفع مشرف / تنزيل مشرف`, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([[Markup.button.callback('🔙 رجوع', 'main_menu')]])
    });
  } catch (e) {}
});

bot.action('help_games', async (ctx) => {
  try {
    await ctx.editMessageCaption(`🎮 **أوامر الألعاب والترفيه:**\n━━━━━━━━━━━━━\n• (صراحه / تويت / لغز)\n• (مشاهير / اعلام / لاعبين)\n• (لو خيروك / تحدي / اسئله)\n\nأرسل اسم اللعبة فقط للبدء!`, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([[Markup.button.callback('🔙 رجوع', 'main_menu')]])
    });
  } catch (e) {}
});

bot.action('main_menu', async (ctx) => {
  try {
    await ctx.editMessageCaption(`🔥 **سورس تلاشاني المتطور**\n━━━━━━━━━━━━━\nاستخدم الأزرار للتنقل في النظام 👇`, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
          [Markup.button.callback('📜 الأوامر', 'help_main'), Markup.button.callback('🎮 الألعاب', 'help_games')],
          [Markup.button.url('📢 القناة', 'https://t.me/Tlashany_Source')],
      ])
    });
  } catch (e) {}
});

// 3. Main Message Handler
bot.on('text', async (ctx) => {
  try {
    // حاول أولاً تنفيذ الأوامر الثابتة
    const commandHandled = await handleCommands(ctx);
    
    // إذا لم يكن أمراً ثابتاً، اذهب للذكاء الاصطناعي
    if (!commandHandled) {
      await aiReply(ctx);
    }
  } catch (err) {
    console.error('Error in message handling:', err);
  }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).send(`Bot is active. Token: ${process.env.BOT_TOKEN ? '✅ SET' : '❌ MISSING'}`);
  }
  try {
    await bot.handleUpdate(req.body);
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    res.status(200).json({ ok: true }); // Always return 200 to Telegram
  }
}

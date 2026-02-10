
import { Markup } from 'telegraf';
import { getUserRank, canExecute, UserRank, getRankName, setUserRank, addCustomRank, deleteCustomRank } from './ranks.js';
import { setPrevention, muteUser, unmuteUser, clearMessages } from './protection.js';
import { getGameMessage } from './games.js';
import { addCustomResponse, checkResponses } from './responses.js';

const SOURCE_GIF = 'https://i.postimg.cc/wxV3PspQ/1756574872401.gif';
const CHANNEL_URL = 'https://t.me/Tlashany_Source';

export async function handleCommands(ctx) {
  const msg = ctx.message?.text;
  if (!msg) return false;

  const chatId = ctx.chat.id;
  const senderId = ctx.from.id;
  const senderRank = getUserRank(chatId, senderId);

  // --- فحص حالة البوت ---
  if (msg === "فحص" || msg === "/ping") {
    await ctx.reply("🚀 البوت شغال وعال العال! ناديني بكلمة 'بوت' لو محتاج حاجة.");
    return true;
  }

  // --- 1. أوامر البداية ---
  if (["/start", "سورس", "تلاشاني"].includes(msg)) {
    await ctx.replyWithAnimation(SOURCE_GIF, {
      caption: `🔥 **أهلاً بك في سورس تلاشاني v2.5**\n━━━━━━━━━━━━━\nأنا بوت الإدارة والحماية الأذكى على تليجرام.\n\n🎭 رتبتك: ${getRankName(senderRank)}\n━━━━━━━━━━━━━\nاستخدم القائمة أدناه 👇`,
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('📜 الأوامر', 'help_main'), Markup.button.callback('🎮 الألعاب', 'help_games')],
        [Markup.button.url('📢 القناة', CHANNEL_URL), Markup.button.url('👨‍💻 المطور', 'https://t.me/Tlashany')],
      ])
    });
    return true;
  }

  // --- 2. أوامر المساعدة ---
  if (["الاوامر", "اوامر", "help"].includes(msg)) {
    await sendFullHelp(ctx);
    return true;
  }

  // --- 3. نظام الألعاب ---
  const gamesList = ["صراحه", "تويت", "اعلام", "لغز", "مشاهير", "ممثلين", "مغنين", "لاعبين", "لو خيروك", "تحدي", "مختلف", "امثله", "تفكيك", "فزوره", "اسئله"];
  if (gamesList.includes(msg)) {
    await ctx.reply(getGameMessage(msg), { reply_to_message_id: ctx.message.message_id });
    return true;
  }

  // --- 4. أوامر الرتب المخصصة ---
  if (msg.startsWith("اضف رتبه")) {
    if (!canExecute(senderRank, UserRank.OWNER)) return true;
    const parts = msg.split(" ");
    const type = parts[2]; 
    const name = parts.slice(3).join(" ");
    if (!name) {
      await ctx.reply("⚠️ استخدم: اضف رتبه (عامه/خاصه) + الاسم");
      return true;
    }
    addCustomRank(chatId, name, type === "عامه");
    await ctx.reply(`✅ تم إضافة رتبة ${name} (${type})`);
    return true;
  }

  // --- 5. أوامر المنع ---
  if (msg.startsWith("منع ") || msg.startsWith("فتح ")) {
    if (!canExecute(senderRank, UserRank.MODERATOR)) return true;
    const type = msg.split(" ")[1];
    const isEnable = msg.startsWith("منع");
    const map = { "الروابط": "links", "الاسائه": "insults", "الاباحي": "porn", "التوجيه": "forward" };
    if (map[type]) {
      setPrevention(chatId, map[type], isEnable);
      await ctx.reply(`✅ تم ${isEnable ? 'تفعيل منع' : 'إلغاء منع'} ${type}`);
      return true;
    }
  }

  // التحقق من الردود المخصصة
  const customResp = checkResponses(chatId, msg);
  if (customResp) {
    await ctx.reply(customResp);
    return true;
  }

  return false; // لم يتم التعامل معه كأمر ثابت
}

async function sendFullHelp(ctx) {
  const helpText = `📜 **قائمة أوامر سورس تلاشاني:**\n━━━━━━━━━━━━━\n⚡ **أوامر الرتب:**\n• اضف رتبه (عامه/خاصه) + الاسم\n• حذف رتبه + الاسم\n• ترقيه + الاسم (بالرد)\n\n🛡️ **أوامر المنع:**\n• منع/فتح (الروابط، الاسائه، الاباحي، التوجيه)\n\n🎮 **أوامر الترفيه:**\n• (صراحه، تويت، لغز، اعلام، مشاهير)\n━━━━━━━━━━━━━`;
  await ctx.reply(helpText, {
    parse_mode: 'Markdown',
    ...Markup.inlineKeyboard([[Markup.button.callback('🔙 رجوع', 'main_menu')]])
  });
}

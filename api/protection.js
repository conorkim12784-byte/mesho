
import { getSetting, setSetting } from './settings.js';

export async function protectionMiddleware(ctx, next) {
  if (!ctx.chat || !ctx.from) return next();
  const chatId = ctx.chat.id;
  const text = ctx.message?.text || "";

  // منع الروابط
  if (getSetting(chatId, "links") && (text.includes("t.me") || text.includes("http"))) {
    try { await ctx.deleteMessage(); } catch (e) {}
    return;
  }

  // منع التوجيه
  if (getSetting(chatId, "forward") && ctx.message.forward_from_chat) {
    try { await ctx.deleteMessage(); } catch (e) {}
    return;
  }

  await next();
}

export function setPrevention(chatId, type, value) {
  setSetting(chatId, type, value);
}

export async function clearMessages(ctx, count) {
  for (let i = 0; i < count; i++) {
    try {
      await ctx.deleteMessage(ctx.message.message_id - i);
    } catch (e) { break; }
  }
}

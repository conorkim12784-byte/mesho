
import { GoogleGenAI } from "@google/genai";

export async function aiReply(ctx) {
  const text = ctx.message?.text;
  if (!text) return;

  const isBotCalled = text.includes("بوت") || text.toLowerCase().includes("bot");
  const isReplyToBot = ctx.message.reply_to_message?.from?.id === ctx.botInfo.id;
  const isAskingHelp = text.includes("ازاي") || text.includes("اوامر") || text.includes("شرح") || text.includes("بيعمل ايه");

  // التدخل التلقائي للذكاء الاصطناعي
  if (isBotCalled || isReplyToBot || text.startsWith("!ai")) {
    if (!process.env.API_KEY) {
      return ctx.reply("⚠️ عذراً، لم يتم ضبط مفتاح الذكاء الاصطناعي (API_KEY) في Vercel.");
    }

    const aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
    let prompt = text.replace("!ai", "").replace("بوت", "").trim();
    
    // إذا كان يسأل عن الأوامر
    if (isAskingHelp) {
      prompt = `المستخدم يسأل عن كيفية عمل البوت. اشرح له بلهجة مصرية أن سورس تلاشاني هو بوت حماية وترفيه. الأوامر تشمل منع الروابط، الألعاب (صراحة، لغز)، والرتب. قل له يكتب كلمة 'اوامر' لرؤية القائمة.`;
    }

    try {
      await ctx.sendChatAction('typing');
      const response = await aiClient.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt || "نعم؟ أنا سامعك، محتاج مساعدة في المجموعة؟",
        config: {
          systemInstruction: `
          أنت 'تلاشاني AI'، مساعد ذكي لسورس 'تلاشاني'.
          لهجتك: مصرية شبابية، خفيفة الظل، ومحترمة.
          مهمتك:
          1. الرد على من يناديك بـ 'بوت'.
          2. الرد على من يعمل Reply لرسائلك.
          3. شرح الأوامر (حماية، ترفيه، رتب) إذا سئلت عنها.
          4. أنت تحب سورس تلاشاني وتفتخر به.
          5. إذا كان الكلام غير مفهوم، رد برد طريف.
          `
        }
      });

      const reply = response.text || "دماغي مشغولة شوية، جرب تكلمني كمان شوية!";
      await ctx.reply(reply, { reply_to_message_id: ctx.message.message_id });
    } catch (error) {
      console.error('AI Error:', error);
      if (error.message.includes('API_KEY')) {
        await ctx.reply("⚠️ مشكلة في مفتاح الـ AI، يرجى التأكد منه في إعدادات Vercel.");
      }
    }
  }
}


const customResponses = {}; // { chatId: { keyword: { response, type } } }

export function addCustomResponse(chatId, keyword, response, type = "عام") {
  if (!customResponses[chatId]) customResponses[chatId] = {};
  
  // الرد المتعدد يتم تخزينه كمصفوفة
  if (type === "متعدد") {
    if (!customResponses[chatId][keyword]) customResponses[chatId][keyword] = { responses: [], type };
    customResponses[chatId][keyword].responses.push(response);
  } else {
    customResponses[chatId][keyword] = { response, type };
  }
}

export function checkResponses(chatId, text) {
  if (!customResponses[chatId]) return null;

  // 1. التحقق من الردود المميزة (كلمة داخل جملة)
  for (const [key, data] of Object.entries(customResponses[chatId])) {
    if (data.type === "مميز" && text.includes(key)) {
      return data.response;
    }
  }

  // 2. التحقق من الردود العادية والمتعددة
  const match = customResponses[chatId][text];
  if (match) {
    if (match.type === "متعدد") {
      return match.responses[Math.floor(Math.random() * match.responses.length)];
    }
    return match.response;
  }

  return null;
}

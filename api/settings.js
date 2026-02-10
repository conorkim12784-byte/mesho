
const settings = {}; 

export function setSetting(chatId, key, value) {
  if (!settings[chatId]) settings[chatId] = {};
  settings[chatId][key] = value;
}

export function getSetting(chatId, key) {
  return settings[chatId]?.[key] ?? false;
}

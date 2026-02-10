
const ranks = {}; 
const customChatRanks = {}; // { chatId: { rankName: { isGeneral } } }

export const UserRank = {
  MEMBER: 0,
  ADMIN: 1,
  MODERATOR: 2,
  OWNER: 3,
  DEVELOPER: 4,
  MAIN_DEVELOPER: 5
};

const rankNames = {
  [UserRank.MEMBER]: "عضو 👤",
  [UserRank.ADMIN]: "أدمن 🛠️",
  [UserRank.MODERATOR]: "مشرف 👮",
  [UserRank.OWNER]: "مالك المجموعة 👑",
  [UserRank.DEVELOPER]: "مطور السورس 💻",
  [UserRank.MAIN_DEVELOPER]: "المطور الأساسي ⚡"
};

export function getUserRank(chatId, userId) {
  const sudoId = process.env.SUDO_ID;
  if (sudoId && userId.toString() === sudoId.toString()) return UserRank.MAIN_DEVELOPER;

  if (ranks[chatId] && ranks[chatId][userId]) return ranks[chatId][userId];
  return UserRank.MEMBER; 
}

export function setUserRank(chatId, userId, rankValue) {
  if (!ranks[chatId]) ranks[chatId] = {};
  ranks[chatId][userId] = rankValue;
}

export function addCustomRank(chatId, name, isGeneral) {
  if (!customChatRanks[chatId]) customChatRanks[chatId] = {};
  customChatRanks[chatId][name] = { isGeneral };
}

export function deleteCustomRank(chatId, name) {
  if (customChatRanks[chatId]) delete customChatRanks[chatId][name];
}

export function getRankName(rankValue) {
  return rankNames[rankValue] || "رتبة مخصصة ✨";
}

export function canExecute(userRank, requiredRank) {
  return userRank >= requiredRank;
}

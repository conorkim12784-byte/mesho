
export enum UserRank {
  VISITOR = 'Visitor',
  MEMBER = 'Member',
  MODERATOR = 'Moderator',
  OWNER = 'Owner'
}

export interface BotSettings {
  antiSpam: boolean;
  welcomeMessage: boolean;
  aiResponse: boolean;
  strictMode: boolean;
}

export interface User {
  id: string;
  username: string;
  rank: UserRank;
  isMuted: boolean;
  joinDate: string;
}

export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isBot: boolean;
}


import React, { useState } from 'react';
import { UserRank, User } from '../types';
import { ShieldCheck, MoreVertical, UserPlus, Search } from 'lucide-react';

const RankManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', username: 'tlashany_dev', rank: UserRank.OWNER, isMuted: false, joinDate: '2023-01-01' },
    { id: '2', username: 'admin_sophie', rank: UserRank.MODERATOR, isMuted: false, joinDate: '2023-05-15' },
    { id: '3', username: 'regular_user_99', rank: UserRank.MEMBER, isMuted: true, joinDate: '2023-11-20' },
    { id: '4', username: 'newbie_01', rank: UserRank.VISITOR, isMuted: false, joinDate: '2024-03-01' },
  ]);

  const updateRank = (userId: string, newRank: UserRank) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, rank: newRank } : u));
  };

  const getRankBadge = (rank: UserRank) => {
    switch(rank) {
      case UserRank.OWNER: return 'bg-red-500/10 text-red-500 border-red-500/20';
      case UserRank.MODERATOR: return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case UserRank.MEMBER: return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Member Ranks</h2>
          <p className="text-slate-500 text-sm">Assign roles and manage permissions for group members.</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl transition-colors font-medium text-sm">
          <UserPlus size={18} />
          Add Admin
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
        <input 
          type="text" 
          placeholder="Search members by username or ID..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50">
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Join Date</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                      {user.username[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-200">@{user.username}</p>
                      <p className="text-[10px] text-slate-500">ID: {user.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getRankBadge(user.rank)}`}>
                    {user.rank}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">{user.joinDate}</td>
                <td className="px-6 py-4">
                  {user.isMuted ? (
                    <span className="text-amber-500 text-xs font-medium flex items-center gap-1">
                      <Ban size={12} /> Muted
                    </span>
                  ) : (
                    <span className="text-emerald-500 text-xs font-medium flex items-center gap-1">
                      <CheckCircle2 size={12} /> Active
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                    <select 
                      className="bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-lg px-2 py-1 mr-2 focus:outline-none"
                      value={user.rank}
                      onChange={(e) => updateRank(user.id, e.target.value as UserRank)}
                    >
                      {Object.values(UserRank).map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  <button className="p-1 hover:bg-slate-700 rounded transition-colors text-slate-400">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

import { Ban, CheckCircle2 } from 'lucide-react';
export default RankManagement;

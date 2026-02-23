interface BetStatsProps {
  totalBet: number;
  totalWon: number;
  winRate: number;
  profit: number;
}

export const BetStats = ({
  totalBet,
  totalWon,
  winRate,
  profit,
}: BetStatsProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      <div className="bg-[#141414] border border-[#252525] rounded-2xl p-4">
        <div className="text-gray-400 text-xs mb-1">Apostado</div>
        <div className="text-white text-2xl font-black">€{totalBet}</div>
      </div>
      <div className="bg-[#141414] border border-[#252525] rounded-2xl p-4">
        <div className="text-gray-400 text-xs mb-1">Ganado</div>
        <div className="text-[#FFE600] text-2xl font-black">
          €{totalWon.toFixed(0)}
        </div>
      </div>
      <div className="bg-[#141414] border border-[#252525] rounded-2xl p-4">
        <div className="text-gray-400 text-xs mb-1">% Acierto</div>
        <div className="text-[#FFE600] text-2xl font-black">{winRate}%</div>
      </div>
      <div className="bg-[#141414] border border-[#252525] rounded-2xl p-4">
        <div className="text-gray-400 text-xs mb-1">Balance</div>
        <div
          className={`text-2xl font-black ${profit >= 0 ? "text-[#FFE600]" : "text-[#F44336]"}`}
        >
          {profit >= 0 ? "+" : ""}€{profit.toFixed(0)}
        </div>
      </div>
    </div>
  );
};

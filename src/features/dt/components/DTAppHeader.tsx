import { useDTStore } from '../store/dtStore';
import { getNationInfo } from '../data/players';
import { Bell, ChevronLeft } from 'lucide-react';

interface DTAppHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function DTAppHeader({ title, showBack, onBack }: DTAppHeaderProps) {
  const { currentCareer, setView } = useDTStore();

  if (!currentCareer) return null;

  const nation = getNationInfo(currentCareer.nationId)?.nation;

  return (
    <header className="sticky top-0 z-40">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-[#0a0a14]/95 backdrop-blur-xl border-b border-white/[0.06]" />
      
      <div className="relative px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBack ? (
              <button 
                onClick={onBack || (() => setView('home'))}
                className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center active:scale-95 transition-all hover:bg-white/[0.1]"
              >
                <ChevronLeft size={22} className="text-white" strokeWidth={2.5} />
              </button>
            ) : (
              <button className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                <div className="w-5 h-0.5 bg-white rounded-full mb-1" />
                <div className="w-3 h-0.5 bg-white rounded-full" />
              </button>
            )}
            
            {title && (
              <h1 className="text-white font-black text-lg tracking-tight">{title}</h1>
            )}
          </div>

          {/* Notification */}
          <button className="relative w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.1] transition-all">
            <Bell size={18} className="text-gray-400" strokeWidth={2} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0a14]" />
          </button>
        </div>

        {/* Team Info (only when no title) */}
        {!title && (
          <div className="flex items-center justify-between mt-4 pt-2">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-[#FFE600]/30 rounded-xl blur" />
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFE600] to-[#0047AB] flex items-center justify-center text-2xl shadow-lg">
                  {nation?.flag || '🏳️'}
                </div>
              </div>
              <div>
                <div className="text-white font-bold">{nation?.name || 'Mi Equipo'}</div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] animate-pulse" />
                  <span>En línea</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="text-right">
                <div className="text-[#FFE600] font-black text-xl">{currentCareer.stats.won}</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Victorias</div>
              </div>
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <div className="text-right">
                <div className="text-white font-black text-xl">{currentCareer.stats.played}</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Jugados</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

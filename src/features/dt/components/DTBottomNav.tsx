import { useDTStore } from '../store/dtStore';
import { Trophy, Users, Target, Award } from 'lucide-react';

export function DTBottomNav() {
  const { currentView, setView, currentCareer } = useDTStore();

  if (!currentCareer || currentView === 'landing' || currentView === 'nation-select' || currentView === 'squad-selection') {
    return null;
  }

  const navItems = [
    { id: 'home', icon: Trophy, label: 'Inicio' },
    { id: 'stats', icon: Target, label: 'Stats' },
    { id: 'lineup', icon: Users, label: 'Equipo' },
    { id: 'badges', icon: Award, label: 'Logros' },
    { id: 'standings', icon: Trophy, label: 'Torneo' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d1117] border-t border-[#30363d]/50 w-full">
      <div className="w-full flex items-center justify-around py-2 sm:py-3">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id as any)}
              className="flex flex-col items-center justify-center py-2 px-4 sm:px-6 min-w-[60px] sm:min-w-[80px]"
            >
              {/* Active indicator line */}
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-[2px] bg-[#FFE600] rounded-full" />
              )}
              
              {/* Icon */}
              <Icon 
                size={22} 
                className={`transition-colors duration-200 ${isActive ? 'text-[#FFE600]' : 'text-[#8b949e]'}`}
              />
              
              {/* Label */}
              <span className={`text-[10px] sm:text-xs font-bold uppercase mt-1 transition-colors duration-200 ${
                isActive ? 'text-[#FFE600]' : 'text-[#8b949e]'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Safe area */}
      <div className="h-safe-area-inset-bottom bg-[#0d1117]" />
    </div>
  );
}

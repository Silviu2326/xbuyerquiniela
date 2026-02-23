import type { ReactNode } from "react";
import { useDTStore } from "../store/dtStore";
import { getNationInfo } from "../data/players";
import { Bell, ChevronLeft } from "lucide-react";

interface DTPageLayoutProps {
  children?: ReactNode;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showHeader?: boolean;
}

export function DTPageLayout({
  children,
  title,
  showBack = false,
  onBack,
  showHeader = true,
}: DTPageLayoutProps) {
  const { currentCareer, setView } = useDTStore();
  const canTrain = currentCareer?.canTrain;

  const userInfo = currentCareer ? getNationInfo(currentCareer.nationId) : null;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1a1a24] to-[#0047AB]/30 overflow-y-auto overflow-x-hidden"
      style={{ maxHeight: "100vh" }}
    >
      <div className="w-full min-h-screen bg-[#0D0D0D]/50 backdrop-blur-sm pb-28">
        {/* Header */}
        {showHeader && (
          <header className="relative overflow-hidden pt-8 pb-6">
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a24] via-[#15151c] to-[#0D0D0D]"></div>
            <div className="absolute inset-0 opacity-40">
              <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#0047AB]/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#0047AB]/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 px-4">
              <div className="flex items-center justify-between">
                {/* Left: Back button or empty space */}
                <div className="w-10">
                  {showBack && (
                    <button
                      onClick={
                        onBack ||
                        (() => {
                          // Si hay una carrera activa, ir a home, si no, ir a landing
                          if (currentCareer) {
                            setView("home");
                          } else {
                            setView("landing");
                          }
                        })
                      }
                      className="w-10 h-10 rounded-xl bg-[#2a2a3a]/50 hover:bg-[#2a2a3a] backdrop-blur-md flex items-center justify-center transition-all shadow-md border border-[#2a2a3a]/50 group"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-white" />
                    </button>
                  )}
                </div>

                {/* Center: Title or Nation name */}
                <div className="flex flex-col items-center">
                  {title ? (
                    <h1 className="text-2xl font-black tracking-tight text-white">
                      {title.toUpperCase()}
                    </h1>
                  ) : (
                    <>
                      <h1 className="text-2xl font-black tracking-tight text-white">
                        {userInfo?.nation.name.toUpperCase() || "MI EQUIPO"}
                      </h1>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-[#FFE600] rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold text-[#FFE600]">
                          EN LÍNEA
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Right: Notification bell */}
                <button className="relative w-10 h-10 rounded-xl bg-[#2a2a3a]/50 hover:bg-[#2a2a3a] backdrop-blur-md flex items-center justify-center transition-all shadow-md border border-[#2a2a3a]/50 group">
                  <Bell className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  {canTrain && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FFE600] rounded-full animate-pulse"></span>
                  )}
                </button>
              </div>
            </div>
          </header>
        )}

        {/* Main Content */}
        <main className="px-4 pt-4 space-y-5">{children}</main>
      </div>
    </div>
  );
}

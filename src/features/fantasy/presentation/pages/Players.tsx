import { useState } from 'react';
import { Search, ArrowLeft, Plus, Check } from 'lucide-react';
import { Card } from '../components/ui/Card';

import { PlayerDetailModal } from '../components/PlayerDetailModal';

import { useFantasyStore } from '../../application/store/fantasyStore';
import type { PlayerPosition } from '../../domain/types';
import { getPositionLabel } from '../../domain/rules';

interface PlayersPageProps {
  onNavigate?: (view: string) => void;
}

const NATION_FLAGS: Record<string, string> = {
  arg: '🇦🇷',
  bra: '🇧🇷',
  fra: '🇫🇷',
  esp: '🇪🇸',
  eng: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  ger: '🇩🇪',
  por: '🇵🇹',
  ned: '🇳🇱',
  bel: '🇧🇪',
  uru: '🇺🇾',
  cro: '🇭🇷',
  mar: '🇲🇦',
  usa: '🇺🇸',
  mex: '🇲🇽',
  col: '🇨🇴',
  ita: '🇮🇹',
  arg2: '🇦🇷',
  fra2: '🇫🇷',
};

const MOCK_NATIONS = [
  { id: 'ger', name: 'Alemania', players: 5, myPlayers: 1, isFavorite: false },
  { id: 'arg', name: 'Argentina', players: 10, myPlayers: 2, isFavorite: true },
  { id: 'bra', name: 'Brasil', players: 8, myPlayers: 2, isFavorite: true },
  { id: 'col', name: 'Colombia', players: 5, myPlayers: 0, isFavorite: false },
  { id: 'cro', name: 'Croacia', players: 4, myPlayers: 0, isFavorite: false },
  { id: 'usa', name: 'EE.UU.', players: 4, myPlayers: 0, isFavorite: false },
  { id: 'esp', name: 'España', players: 8, myPlayers: 2, isFavorite: true },
  { id: 'fra', name: 'Francia', players: 8, myPlayers: 2, isFavorite: true },
  { id: 'eng', name: 'Inglaterra', players: 8, myPlayers: 2, isFavorite: false },
  { id: 'ita', name: 'Italia', players: 4, myPlayers: 0, isFavorite: false },
  { id: 'jpn', name: 'Japón', players: 4, myPlayers: 0, isFavorite: false },
  { id: 'mar', name: 'Marruecos', players: 4, myPlayers: 1, isFavorite: false },
  { id: 'mex', name: 'México', players: 4, myPlayers: 0, isFavorite: false },
  { id: 'ned', name: 'Países Bajos', players: 4, myPlayers: 1, isFavorite: false },
  { id: 'por', name: 'Portugal', players: 6, myPlayers: 1, isFavorite: false },
  { id: 'sen', name: 'Senegal', players: 4, myPlayers: 0, isFavorite: false },
  { id: 'uru', name: 'Uruguay', players: 4, myPlayers: 1, isFavorite: false },
];

const MOCK_PLAYERS_BY_NATION: Record<string, Array<{
  id: string;
  name: string;
  initials: string;
  club: string;
  position: PlayerPosition;
  points: number;
  price: number;
  goals: number;
  assists: number;
  isInTeam?: boolean;
}>> = {
  ger: [
    { id: 'ger1', name: 'Musiala', initials: 'MU', club: 'Bayern', position: 'MID', points: 58, price: 12.5, goals: 5, assists: 8, isInTeam: true },
    { id: 'ger2', name: 'Wirtz', initials: 'WI', club: 'Leverkusen', position: 'MID', points: 56, price: 11.0, goals: 5, assists: 5 },
    { id: 'ger3', name: 'Havertz', initials: 'HA', club: 'Arsenal', position: 'FWD', points: 44, price: 9.5, goals: 5, assists: 2 },
    { id: 'ger4', name: 'Neuer', initials: 'NE', club: 'Bayern', position: 'GK', points: 38, price: 7.0, goals: 0, assists: 0 },
    { id: 'ger5', name: 'Rüdiger', initials: 'RÜ', club: 'Real Madrid', position: 'DEF', points: 34, price: 6.5, goals: 1, assists: 0 },
    { id: 'ger6', name: 'Kroos', initials: 'KR', club: 'Real Madrid', position: 'MID', points: 42, price: 8.0, goals: 1, assists: 4 },
    { id: 'ger7', name: 'Goretzka', initials: 'GO', club: 'Bayern', position: 'MID', points: 36, price: 7.5, goals: 2, assists: 1 },
    { id: 'ger8', name: 'Ter Stegen', initials: 'TS', club: 'Barcelona', position: 'GK', points: 40, price: 7.0, goals: 0, assists: 0 },
  ],
  arg: [
    { id: 'arg1', name: 'Messi', initials: 'ME', club: 'Inter Miami', position: 'FWD', points: 72, price: 14.0, goals: 8, assists: 6 },
    { id: 'arg2', name: 'Martínez', initials: 'MA', club: 'Aston Villa', position: 'GK', points: 42, price: 7.0, goals: 0, assists: 0, isInTeam: true },
    { id: 'arg3', name: 'Romero', initials: 'RO', club: 'Tottenham', position: 'DEF', points: 38, price: 6.5, goals: 1, assists: 0, isInTeam: true },
    { id: 'arg4', name: 'Álvarez', initials: 'ÁL', club: 'Man City', position: 'FWD', points: 52, price: 10.5, goals: 6, assists: 3 },
    { id: 'arg5', name: 'De Paul', initials: 'DP', club: 'Atlético', position: 'MID', points: 44, price: 8.5, goals: 2, assists: 4 },
    { id: 'arg6', name: 'Mac Allister', initials: 'MA', club: 'Liverpool', position: 'MID', points: 46, price: 9.0, goals: 3, assists: 3 },
    { id: 'arg7', name: 'Otamendi', initials: 'OT', club: 'Benfica', position: 'DEF', points: 32, price: 5.5, goals: 1, assists: 0 },
    { id: 'arg8', name: 'Lautaro', initials: 'LA', club: 'Inter', position: 'FWD', points: 54, price: 11.0, goals: 7, assists: 2 },
  ],
  bra: [
    { id: 'bra1', name: 'Vinicius Jr', initials: 'VJ', club: 'Real Madrid', position: 'FWD', points: 64, price: 13.0, goals: 7, assists: 5, isInTeam: true },
    { id: 'bra2', name: 'Rodrygo', initials: 'RD', club: 'Real Madrid', position: 'FWD', points: 48, price: 9.5, goals: 4, assists: 3 },
    { id: 'bra3', name: 'Alisson', initials: 'AL', club: 'Liverpool', position: 'GK', points: 46, price: 7.5, goals: 0, assists: 0, isInTeam: true },
    { id: 'bra4', name: 'Marquinhos', initials: 'MQ', club: 'PSG', position: 'DEF', points: 36, price: 6.0, goals: 1, assists: 0 },
    { id: 'bra5', name: 'Casemiro', initials: 'CA', club: 'Man United', position: 'MID', points: 38, price: 7.0, goals: 1, assists: 1 },
    { id: 'bra6', name: 'Gabriel Jesus', initials: 'GJ', club: 'Arsenal', position: 'FWD', points: 42, price: 8.5, goals: 4, assists: 2 },
    { id: 'bra7', name: 'Paquetá', initials: 'PA', club: 'West Ham', position: 'MID', points: 40, price: 7.5, goals: 2, assists: 3 },
    { id: 'bra8', name: 'Militão', initials: 'MI', club: 'Real Madrid', position: 'DEF', points: 34, price: 6.0, goals: 0, assists: 0 },
  ],
  fra: [
    { id: 'fra1', name: 'Mbappé', initials: 'MB', club: 'PSG', position: 'FWD', points: 68, price: 14.0, goals: 9, assists: 4, isInTeam: true },
    { id: 'fra2', name: 'Griezmann', initials: 'GR', club: 'Atlético', position: 'FWD', points: 54, price: 10.5, goals: 5, assists: 5 },
    { id: 'fra3', name: 'Koundé', initials: 'KO', club: 'Barcelona', position: 'DEF', points: 36, price: 6.0, goals: 0, assists: 1, isInTeam: true },
    { id: 'fra4', name: 'Dembelé', initials: 'DE', club: 'PSG', position: 'FWD', points: 46, price: 9.0, goals: 3, assists: 4 },
    { id: 'fra5', name: 'Tchouaméni', initials: 'TC', club: 'Real Madrid', position: 'MID', points: 38, price: 7.0, goals: 1, assists: 1 },
    { id: 'fra6', name: 'Hernández', initials: 'HE', club: 'PSG', position: 'DEF', points: 34, price: 5.5, goals: 0, assists: 0 },
    { id: 'fra7', name: 'Camavinga', initials: 'CA', club: 'Real Madrid', position: 'MID', points: 36, price: 6.5, goals: 0, assists: 2 },
    { id: 'fra8', name: 'Maignan', initials: 'MA', club: 'Milan', position: 'GK', points: 40, price: 6.5, goals: 0, assists: 0 },
  ],
  esp: [
    { id: 'esp1', name: 'Yamal', initials: 'YA', club: 'Barcelona', position: 'FWD', points: 56, price: 11.0, goals: 4, assists: 5, isInTeam: true },
    { id: 'esp2', name: 'Rodri', initials: 'RO', club: 'Man City', position: 'MID', points: 50, price: 9.5, goals: 3, assists: 2, isInTeam: true },
    { id: 'esp3', name: 'Pedri', initials: 'PE', club: 'Barcelona', position: 'MID', points: 48, price: 9.0, goals: 2, assists: 4 },
    { id: 'esp4', name: 'Williams', initials: 'WI', club: 'Athletic', position: 'FWD', points: 46, price: 8.5, goals: 3, assists: 3 },
    { id: 'esp5', name: 'Morata', initials: 'MO', club: 'Atlético', position: 'FWD', points: 42, price: 8.0, goals: 4, assists: 1 },
    { id: 'esp6', name: 'Carvajal', initials: 'CA', club: 'Real Madrid', position: 'DEF', points: 38, price: 6.0, goals: 0, assists: 2 },
    { id: 'esp7', name: 'Unai Simón', initials: 'US', club: 'Athletic', position: 'GK', points: 36, price: 5.5, goals: 0, assists: 0 },
    { id: 'esp8', name: 'Olmo', initials: 'OL', club: 'RB Leipzig', position: 'MID', points: 44, price: 8.0, goals: 3, assists: 2 },
  ],
  eng: [
    { id: 'eng1', name: 'Bellingham', initials: 'BE', club: 'Real Madrid', position: 'MID', points: 62, price: 12.5, goals: 6, assists: 4, isInTeam: true },
    { id: 'eng2', name: 'Kane', initials: 'KA', club: 'Bayern', position: 'FWD', points: 64, price: 13.0, goals: 8, assists: 3, isInTeam: true },
    { id: 'eng3', name: 'Foden', initials: 'FO', club: 'Man City', position: 'MID', points: 54, price: 10.5, goals: 4, assists: 4 },
    { id: 'eng4', name: 'Saka', initials: 'SA', club: 'Arsenal', position: 'FWD', points: 52, price: 10.0, goals: 4, assists: 3 },
    { id: 'eng5', name: 'Rice', initials: 'RI', club: 'Arsenal', position: 'MID', points: 42, price: 7.5, goals: 1, assists: 2 },
    { id: 'eng6', name: 'Walker', initials: 'WA', club: 'Man City', position: 'DEF', points: 36, price: 5.5, goals: 0, assists: 1 },
    { id: 'eng7', name: 'Pickford', initials: 'PI', club: 'Everton', position: 'GK', points: 34, price: 5.0, goals: 0, assists: 0 },
    { id: 'eng8', name: 'Palmer', initials: 'PA', club: 'Chelsea', position: 'MID', points: 50, price: 9.0, goals: 5, assists: 2 },
  ],
  ned: [
    { id: 'ned1', name: 'Van Dijk', initials: 'VD', club: 'Liverpool', position: 'DEF', points: 40, price: 6.5, goals: 2, assists: 0, isInTeam: true },
    { id: 'ned2', name: 'Gakpo', initials: 'GA', club: 'Liverpool', position: 'FWD', points: 46, price: 8.5, goals: 4, assists: 2 },
    { id: 'ned3', name: 'De Jong', initials: 'DJ', club: 'Barcelona', position: 'MID', points: 44, price: 8.0, goals: 1, assists: 3 },
    { id: 'ned4', name: 'Dumfries', initials: 'DU', club: 'Inter', position: 'DEF', points: 36, price: 5.5, goals: 1, assists: 1 },
    { id: 'ned5', name: 'Depay', initials: 'DE', club: 'Atlético', position: 'FWD', points: 38, price: 7.0, goals: 3, assists: 1 },
    { id: 'ned6', name: 'Ake', initials: 'AK', club: 'Man City', position: 'DEF', points: 34, price: 5.0, goals: 0, assists: 0 },
  ],
  por: [
    { id: 'por1', name: 'Ronaldo', initials: 'CR', club: 'Al-Nassr', position: 'FWD', points: 58, price: 11.5, goals: 7, assists: 1 },
    { id: 'por2', name: 'Félix', initials: 'FX', club: 'Barcelona', position: 'FWD', points: 44, price: 8.5, goals: 3, assists: 2 },
    { id: 'por3', name: 'Silva', initials: 'BS', club: 'Man City', position: 'MID', points: 48, price: 9.0, goals: 2, assists: 4 },
    { id: 'por4', name: 'Dias', initials: 'RD', club: 'Man City', position: 'DEF', points: 38, price: 6.0, goals: 0, assists: 0 },
    { id: 'por5', name: 'Fernandes', initials: 'BF', club: 'Man United', position: 'MID', points: 46, price: 8.5, goals: 3, assists: 3 },
    { id: 'por6', name: 'Leão', initials: 'RL', club: 'Milan', position: 'FWD', points: 42, price: 8.0, goals: 2, assists: 3 },
  ],
  mar: [
    { id: 'mar1', name: 'Hakimi', initials: 'HA', club: 'PSG', position: 'DEF', points: 42, price: 6.5, goals: 1, assists: 2, isInTeam: true },
    { id: 'mar2', name: 'Ziyech', initials: 'ZI', club: 'Galatasaray', position: 'MID', points: 40, price: 7.0, goals: 2, assists: 3 },
    { id: 'mar3', name: 'Amrabat', initials: 'AM', club: 'Man United', position: 'MID', points: 36, price: 6.0, goals: 0, assists: 1 },
    { id: 'mar4', name: 'En-Nesyri', initials: 'EN', club: 'Fenerbahçe', position: 'FWD', points: 44, price: 7.5, goals: 5, assists: 0 },
    { id: 'mar5', name: 'Saïss', initials: 'SA', club: 'Al-Shabab', position: 'DEF', points: 32, price: 5.0, goals: 0, assists: 0 },
  ],
  uru: [
    { id: 'uru1', name: 'Valverde', initials: 'VA', club: 'Real Madrid', position: 'MID', points: 54, price: 10.0, goals: 4, assists: 3, isInTeam: true },
    { id: 'uru2', name: 'Darwin', initials: 'NU', club: 'Liverpool', position: 'FWD', points: 48, price: 8.5, goals: 5, assists: 2 },
    { id: 'uru3', name: 'Giménez', initials: 'GI', club: 'Atlético', position: 'DEF', points: 34, price: 5.5, goals: 0, assists: 0 },
    { id: 'uru4', name: 'Araujo', initials: 'AR', club: 'Barcelona', position: 'DEF', points: 36, price: 6.0, goals: 0, assists: 0 },
    { id: 'uru5', name: 'De Arrascaeta', initials: 'DA', club: 'Flamengo', position: 'MID', points: 42, price: 7.5, goals: 3, assists: 2 },
  ],
};

export function PlayersPage({ onNavigate: _onNavigate }: PlayersPageProps) {
  const { mySquad, addPlayer, removePlayer } = useFantasyStore();
  const [view, setViewState] = useState<'nations' | 'players'>('nations');
  const [selectedNation, setSelectedNation] = useState<typeof MOCK_NATIONS[0] | null>(null);
  const [filterPosition, setFilterPosition] = useState<PlayerPosition | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSelectNation = (nation: typeof MOCK_NATIONS[0]) => {
    setSelectedNation(nation);
    setViewState('players');
  };

  const handleBack = () => {
    setViewState('nations');
    setSelectedNation(null);
    setFilterPosition(null);
    setSearchQuery('');
    setErrorMessage(null);
  };

  const handlePlayerClick = (player: any) => {
    const isInTeam = mySquad.players.some((p: any) => p.id === player.id);
    setSelectedPlayer({
      ...player,
      nation: selectedNation?.id || 'ger',
      nationName: selectedNation?.name || '',
      ppg: (player.points / 6).toFixed(1),
      cleanSheets: Math.floor(Math.random() * 3),
      matches: 6,
      isInTeam,
    });
    setIsModalOpen(true);
    setErrorMessage(null);
  };

  const handleAddToTeam = (player: any) => {
    // Validar límites por posición según formación
    const positionCount = mySquad.players.filter((p: any) => p.position === player.position).length;
    const maxByPosition: Record<string, number> = {
      ['GK']: 2,
      ['DEF']: 5,
      ['MID']: 5,
      ['FWD']: 3,
    };
    
    if (positionCount >= maxByPosition[player.position]) {
      setErrorMessage(`Ya tienes el máximo de ${getPositionLabel(player.position)}s (${maxByPosition[player.position]}/${maxByPosition[player.position]})`);
      return;
    }

    const result = addPlayer({
      ...player,
      nationId: player.nation || selectedNation?.id,
    });
    
    if (result.success) {
      setIsModalOpen(false);
      setErrorMessage(null);
    } else {
      setErrorMessage(result.message || 'No se pudo añadir el jugador');
    }
  };

  const handleRemoveFromTeam = (playerId: string) => {
    removePlayer(playerId);
    setIsModalOpen(false);
  };

  const players = selectedNation ? (MOCK_PLAYERS_BY_NATION[selectedNation.id] || []) : [];
  
  // Marcar jugadores que ya están en el equipo
  const playersWithTeamStatus = players.map(p => ({
    ...p,
    isInTeam: mySquad.players.some((sp: any) => sp.id === p.id),
  }));
  
  const filteredPlayers = playersWithTeamStatus.filter(p => {
    if (filterPosition && p.position !== filterPosition) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#12121a' }}>
      {view === 'nations' ? (
        <NationsView onSelectNation={handleSelectNation} squadPlayers={mySquad.players} />
      ) : (
        <PlayersListView
          nation={selectedNation!}
          players={filteredPlayers}
          filterPosition={filterPosition}
          setFilterPosition={setFilterPosition}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onBack={handleBack}
          onPlayerClick={handlePlayerClick}
          nationPlayerCount={mySquad.players.filter((p: any) => p.nationId === selectedNation?.id || p.nation === selectedNation?.id).length}
        />
      )}
      
      {/* Mensaje de error */}
      {errorMessage && (
        <div style={{
          position: 'fixed',
          bottom: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#EF4444',
          color: '#fff',
          padding: 'var(--space-3) var(--space-4)',
          borderRadius: 'var(--radius-lg)',
          zIndex: 300,
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-bold)',
          maxWidth: '90%',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
        }}>
          {errorMessage}
        </div>
      )}

      <PlayerDetailModal
        player={selectedPlayer}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setErrorMessage(null);
        }}
        onAddToTeam={handleAddToTeam}
        onRemoveFromTeam={handleRemoveFromTeam}
        nationPlayerCount={selectedNation ? mySquad.players.filter((p: any) => p.nationId === selectedNation.id || p.nation === selectedNation.id).length : 0}
      />
    </div>
  );
}

function NationsView({ 
  onSelectNation,
  squadPlayers,
}: { 
  onSelectNation: (n: typeof MOCK_NATIONS[0]) => void;
  squadPlayers: any[];
}) {
  // Contar jugadores por selección en tiempo real
  const getPlayerCount = (nationId: string) => {
    return squadPlayers.filter((p: any) => p.nationId === nationId || p.nation === nationId).length;
  };
  
  return (
    <div style={{ padding: 'var(--space-4)' }}>
      {/* TÍTULO */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        marginBottom: 'var(--space-4)',
      }}>
        <span style={{ fontSize: 'var(--text-lg)' }}>🌍</span>
        <span style={{
          fontSize: 'var(--text-md)',
          fontWeight: 'var(--font-bold)',
          color: '#f3f4f6',
        }}>
          Selecciones
        </span>
      </div>

      {/* GRID DE SELECCIONES */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'var(--space-3)',
      }}>
        {MOCK_NATIONS.map((nation) => {
          const myCount = getPlayerCount(nation.id);
          const isFull = myCount >= 2;
          
          return (
            <button
              key={nation.id}
              onClick={() => onSelectNation(nation)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--space-3)',
                background: isFull ? 'rgba(239, 68, 68, 0.1)' : '#1a1a24',
                border: `1px solid ${isFull ? '#EF4444' : '#2a2a3a'}`,
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-1)',
                  marginBottom: '4px',
                }}>
                  <span style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-bold)',
                    color: isFull ? '#EF4444' : '#f3f4f6',
                  }}>
                    {nation.name}
                  </span>
                  {nation.isFavorite && (
                    <span style={{
                      fontSize: '10px',
                      color: '#FFE600',
                    }}>
                      ★
                    </span>
                  )}
                </div>
                <span style={{
                  fontSize: 'var(--text-xs)',
                  color: '#6b7280',
                }}>
                  {nation.players} jugadores
                </span>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '2px',
              }}>
                {myCount > 0 && (
                  <span style={{
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-bold)',
                    color: isFull ? '#EF4444' : '#FFE600',
                    background: isFull ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 230, 0, 0.1)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                  }}>
                    {isFull ? '✓ 2/2' : `${myCount}/2`}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface PlayersListViewProps {
  nation: typeof MOCK_NATIONS[0];
  players: typeof MOCK_PLAYERS_BY_NATION[string];
  filterPosition: PlayerPosition | null;
  setFilterPosition: (p: PlayerPosition | null) => void;
  searchQuery: string;
  setSearchQuery: (s: string) => void;
  onBack: () => void;
  onPlayerClick: (player: any) => void;
  nationPlayerCount: number;
}

function PlayersListView({
  nation,
  players,
  filterPosition,
  setFilterPosition,
  searchQuery,
  setSearchQuery,
  onBack,
  onPlayerClick,
  nationPlayerCount,
}: PlayersListViewProps) {
  const positionFilters = [
    { id: null, label: 'Todos' },
    { id: 'GK', label: 'POR' },
    { id: 'DEF', label: 'DEF' },
    { id: 'MID', label: 'MED' },
    { id: 'FWD', label: 'DEL' },
  ];

  return (
    <div style={{ padding: 'var(--space-4)' }}>
      {/* HEADER DE NACIÓN */}
      <button
        onClick={onBack}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          background: 'transparent',
          border: 'none',
          color: '#9ca3af',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-bold)',
          cursor: 'pointer',
          marginBottom: 'var(--space-4)',
        }}
      >
        <ArrowLeft size={18} />
        Volver a selecciones
      </button>

      {/* INFO NACIÓN */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        marginBottom: nationPlayerCount >= 2 ? 'var(--space-2)' : 'var(--space-4)',
      }}>
        <div style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: '#1a1a24',
          border: nationPlayerCount >= 2 ? '2px solid #EF4444' : '2px solid #2a2a3a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
        }}>
          {NATION_FLAGS[nation.id] || '🏳️'}
        </div>
        <div>
          <h2 style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-black)',
            color: nationPlayerCount >= 2 ? '#EF4444' : '#f3f4f6',
          }}>
            {nation.name}
          </h2>
          <p style={{
            fontSize: 'var(--text-xs)',
            color: '#6b7280',
          }}>
            Ranking FIFA #6 • Grupo H • DT: J. Nagelsmann
          </p>
        </div>
        {nationPlayerCount > 0 && (
          <div style={{
            marginLeft: 'auto',
            padding: 'var(--space-2) var(--space-3)',
            background: nationPlayerCount >= 2 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 230, 0, 0.1)',
            borderRadius: 'var(--radius-lg)',
            border: `1px solid ${nationPlayerCount >= 2 ? '#EF4444' : '#FFE600'}`,
          }}>
            <span style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-black)',
              color: nationPlayerCount >= 2 ? '#EF4444' : '#FFE600',
            }}>
              {nationPlayerCount}/2
            </span>
          </div>
        )}
      </div>
      
      {/* MENSAJE DE LÍMITE ALCANZADO */}
      {nationPlayerCount >= 2 && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid #EF4444',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-3)',
          marginBottom: 'var(--space-4)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}>
          <span style={{ fontSize: 'var(--text-lg)' }}>⚠️</span>
          <span style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-bold)',
            color: '#EF4444',
          }}>
            Ya tienes 2 jugadores de esta selección. No puedes añadir más.
          </span>
        </div>
      )}

      {/* FILTROS DE POSICIÓN */}
      <div style={{
        display: 'flex',
        gap: 'var(--space-2)',
        marginBottom: 'var(--space-3)',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}>
        {positionFilters.map((filter) => (
          <button
            key={filter.label}
            onClick={() => setFilterPosition(filter.id as PlayerPosition | null)}
            style={{
              padding: 'var(--space-2) var(--space-3)',
              background: filterPosition === filter.id ? '#FFE600' : '#1a1a24',
              border: `1px solid ${filterPosition === filter.id ? '#FFE600' : '#2a2a3a'}`,
              borderRadius: 'var(--radius-full)',
              color: filterPosition === filter.id ? '#12121a' : '#9ca3af',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-bold)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* BARRA DE BÚSQUEDA */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        background: '#1a1a24',
        border: '1px solid #2a2a3a',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-3)',
        marginBottom: 'var(--space-4)',
      }}>
        <Search size={18} style={{ color: '#6b7280' }} />
        <input
          type="text"
          placeholder="Buscar jugador..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: '#f3f4f6',
            fontSize: 'var(--text-sm)',
            outline: 'none',
          }}
        />
      </div>

      {/* LISTA DE JUGADORES */}
      <Card variant="elevated" style={{ padding: 0 }}>
        {players.map((player, idx) => (
          <div
            key={player.id}
            onClick={() => onPlayerClick(player)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-3)',
              borderBottom: idx < players.length - 1 ? '1px solid #2a2a3a' : 'none',
              background: player.isInTeam ? 'rgba(255, 230, 0, 0.05)' : 'transparent',
              cursor: 'pointer',
            }}
          >
            {/* INICIALES */}
            <div style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-black)',
              color: '#fff',
              border: player.isInTeam ? '2px solid #FFE600' : 'none',
            }}>
              {player.initials}
            </div>

            {/* INFO */}
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                marginBottom: '2px',
              }}>
                <span style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-bold)',
                  color: '#f3f4f6',
                }}>
                  {player.name}
                </span>
                <span style={{
                  fontSize: '9px',
                  background: player.position === 'GK' ? '#F59E0B' : 
                             player.position === 'DEF' ? '#FFE600' :
                             player.position === 'MID' ? '#10B981' : '#EF4444',
                  color: '#12121a',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 'var(--font-bold)',
                }}>
                  {getPositionLabel(player.position).toUpperCase()}
                </span>
                {player.isInTeam && (
                  <span style={{
                    fontSize: '9px',
                    background: '#FFE600',
                    color: '#12121a',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 'var(--font-bold)',
                  }}>
                    EN EQUIPO
                  </span>
                )}
              </div>
              <span style={{
                fontSize: 'var(--text-xs)',
                color: '#6b7280',
              }}>
                {player.club} • {player.goals} goles • {player.assists} asist.
              </span>
            </div>

            {/* PUNTOS */}
            <div style={{ textAlign: 'right' }}>
              <span style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-black)',
                color: '#FFE600',
              }}>
                {player.points}
              </span>
              <span style={{
                display: 'block',
                fontSize: '10px',
                color: '#6b7280',
              }}>
                {player.price}M
              </span>
            </div>

            {/* BOTÓN AÑADIR */}
            <button
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: player.isInTeam ? '#FFE600' : '#1a1a24',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {player.isInTeam ? (
                <Check size={16} style={{ color: '#12121a' }} />
              ) : (
                <Plus size={16} style={{ color: '#9ca3af' }} />
              )}
            </button>
          </div>
        ))}
      </Card>
    </div>
  );
}

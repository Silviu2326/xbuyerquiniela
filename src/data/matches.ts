import type { Match } from '../types/index.ts';

export const MATCHES: Match[] = [
  // Jueves, 11 de junio 2026
  { id: 1, h: 'México', a: 'Sudáfrica', date: '11 Jun', time: '15:00', g: 'A', venue: 'Estadio Ciudad de México', city: 'CDMX' },
  { id: 2, h: 'Corea del Sur', a: 'Por definir (A2)', date: '11 Jun', time: '22:00', g: 'A', venue: 'Estadio Guadalajara', city: 'Guadalajara' },
  
  // Viernes, 12 de junio 2026
  { id: 3, h: 'Canadá', a: 'Por definir (B2)', date: '12 Jun', time: '15:00', g: 'B', venue: 'Estadio Toronto', city: 'Toronto' },
  { id: 4, h: 'Estados Unidos', a: 'Paraguay', date: '12 Jun', time: '21:00', g: 'D', venue: 'Estadio Los Ángeles', city: 'Los Ángeles' },
  
  // Sábado, 13 de junio 2026
  { id: 5, h: 'Catar', a: 'Suiza', date: '13 Jun', time: '15:00', g: 'B', venue: 'Estadio Bahía de San Francisco', city: 'San Francisco' },
  { id: 6, h: 'Brasil', a: 'Marruecos', date: '13 Jun', time: '18:00', g: 'C', venue: 'Estadio Nueva York Nueva Jersey', city: 'Nueva York' },
  { id: 7, h: 'Haití', a: 'Escocia', date: '13 Jun', time: '21:00', g: 'C', venue: 'Estadio Boston', city: 'Boston' },
  { id: 8, h: 'Australia', a: 'Por definir (D2)', date: '14 Jun', time: '00:00', g: 'D', venue: 'Estadio BC Place Vancouver', city: 'Vancouver' },
  
  // Domingo, 14 de junio 2026
  { id: 9, h: 'Alemania', a: 'Curazao', date: '14 Jun', time: '13:00', g: 'E', venue: 'Estadio Houston', city: 'Houston' },
  { id: 10, h: 'Países Bajos', a: 'Japón', date: '14 Jun', time: '16:00', g: 'F', venue: 'Estadio Dallas', city: 'Dallas' },
  { id: 11, h: 'Costa de Marfil', a: 'Ecuador', date: '14 Jun', time: '19:00', g: 'E', venue: 'Estadio Filadelfia', city: 'Filadelfia' },
  { id: 12, h: 'Por definir (F2)', a: 'Túnez', date: '14 Jun', time: '22:00', g: 'F', venue: 'Estadio Monterrey', city: 'Monterrey' },
  
  // Lunes, 15 de junio 2026
  { id: 13, h: 'España', a: 'Cabo Verde', date: '15 Jun', time: '12:00', g: 'H', venue: 'Estadio Atlanta', city: 'Atlanta' },
  { id: 14, h: 'Bélgica', a: 'Egipto', date: '15 Jun', time: '15:00', g: 'G', venue: 'Estadio Seattle', city: 'Seattle' },
  { id: 15, h: 'Arabia Saudí', a: 'Uruguay', date: '15 Jun', time: '18:00', g: 'H', venue: 'Estadio Miami', city: 'Miami' },
  { id: 16, h: 'Irán', a: 'Nueva Zelanda', date: '15 Jun', time: '21:00', g: 'G', venue: 'Estadio Los Ángeles', city: 'Los Ángeles' },
  
  // Martes, 16 de junio 2026
  { id: 17, h: 'Francia', a: 'Senegal', date: '16 Jun', time: '15:00', g: 'I', venue: 'Estadio Nueva York Nueva Jersey', city: 'Nueva York' },
  { id: 18, h: 'Por definir (I2)', a: 'Noruega', date: '16 Jun', time: '18:00', g: 'I', venue: 'Estadio Boston', city: 'Boston' },
  { id: 19, h: 'Argentina', a: 'Argelia', date: '16 Jun', time: '21:00', g: 'J', venue: 'Estadio Kansas City', city: 'Kansas City' },
  { id: 20, h: 'Austria', a: 'Jordania', date: '17 Jun', time: '00:00', g: 'J', venue: 'Estadio Bahía de San Francisco', city: 'San Francisco' },
  
  // Miércoles, 17 de junio 2026
  { id: 21, h: 'Portugal', a: 'Por definir (K2)', date: '17 Jun', time: '13:00', g: 'K', venue: 'Estadio Houston', city: 'Houston' },
  { id: 22, h: 'Inglaterra', a: 'Croacia', date: '17 Jun', time: '16:00', g: 'L', venue: 'Estadio Dallas', city: 'Dallas' },
  { id: 23, h: 'Ghana', a: 'Panamá', date: '17 Jun', time: '19:00', g: 'L', venue: 'Estadio Toronto', city: 'Toronto' },
  { id: 24, h: 'Uzbekistán', a: 'Colombia', date: '17 Jun', time: '22:00', g: 'K', venue: 'Estadio Ciudad de México', city: 'CDMX' },
  
  // Jueves, 18 de junio 2026
  { id: 25, h: 'Por definir (A3)', a: 'Sudáfrica', date: '18 Jun', time: '12:00', g: 'A', venue: 'Estadio Atlanta', city: 'Atlanta' },
  { id: 26, h: 'Suiza', a: 'Por definir (B3)', date: '18 Jun', time: '15:00', g: 'B', venue: 'Estadio Los Ángeles', city: 'Los Ángeles' },
  { id: 27, h: 'Canadá', a: 'Catar', date: '18 Jun', time: '18:00', g: 'B', venue: 'Estadio BC Place Vancouver', city: 'Vancouver' },
  { id: 28, h: 'México', a: 'Corea del Sur', date: '18 Jun', time: '21:00', g: 'A', venue: 'Estadio Guadalajara', city: 'Guadalajara' },
  
  // Viernes, 19 de junio 2026
  { id: 29, h: 'Estados Unidos', a: 'Australia', date: '19 Jun', time: '15:00', g: 'D', venue: 'Estadio Seattle', city: 'Seattle' },
  { id: 30, h: 'Escocia', a: 'Marruecos', date: '19 Jun', time: '18:00', g: 'C', venue: 'Estadio Boston', city: 'Boston' },
  { id: 31, h: 'Brasil', a: 'Haití', date: '19 Jun', time: '21:00', g: 'C', venue: 'Estadio Filadelfia', city: 'Filadelfia' },
  { id: 32, h: 'Por definir (D2)', a: 'Paraguay', date: '20 Jun', time: '00:00', g: 'D', venue: 'Estadio Bahía de San Francisco', city: 'San Francisco' },
  
  // Sábado, 20 de junio 2026
  { id: 33, h: 'Países Bajos', a: 'Por definir (F2)', date: '20 Jun', time: '13:00', g: 'F', venue: 'Estadio Houston', city: 'Houston' },
  { id: 34, h: 'Alemania', a: 'Costa de Marfil', date: '20 Jun', time: '16:00', g: 'E', venue: 'Estadio Toronto', city: 'Toronto' },
  { id: 35, h: 'Ecuador', a: 'Curazao', date: '20 Jun', time: '22:00', g: 'E', venue: 'Estadio Kansas City', city: 'Kansas City' },
  { id: 36, h: 'Túnez', a: 'Japón', date: '21 Jun', time: '00:00', g: 'F', venue: 'Estadio Monterrey', city: 'Monterrey' },
  
  // Domingo, 21 de junio 2026
  { id: 37, h: 'España', a: 'Arabia Saudí', date: '21 Jun', time: '12:00', g: 'H', venue: 'Estadio Atlanta', city: 'Atlanta' },
  { id: 38, h: 'Bélgica', a: 'Irán', date: '21 Jun', time: '15:00', g: 'G', venue: 'Estadio Los Ángeles', city: 'Los Ángeles' },
  { id: 39, h: 'Uruguay', a: 'Cabo Verde', date: '21 Jun', time: '18:00', g: 'H', venue: 'Estadio Miami', city: 'Miami' },
  { id: 40, h: 'Nueva Zelanda', a: 'Egipto', date: '21 Jun', time: '21:00', g: 'G', venue: 'Estadio BC Place Vancouver', city: 'Vancouver' },
  
  // Lunes, 22 de junio 2026
  { id: 41, h: 'Argentina', a: 'Austria', date: '22 Jun', time: '13:00', g: 'J', venue: 'Estadio Dallas', city: 'Dallas' },
  { id: 42, h: 'Francia', a: 'Por definir (I2)', date: '22 Jun', time: '17:00', g: 'I', venue: 'Estadio Filadelfia', city: 'Filadelfia' },
  { id: 43, h: 'Noruega', a: 'Senegal', date: '22 Jun', time: '20:00', g: 'I', venue: 'Estadio Nueva York Nueva Jersey', city: 'Nueva York' },
  { id: 44, h: 'Jordania', a: 'Argelia', date: '22 Jun', time: '23:00', g: 'J', venue: 'Estadio Bahía de San Francisco Bay', city: 'San Francisco' },
  
  // Martes, 23 de junio 2026
  { id: 45, h: 'Portugal', a: 'Uzbekistán', date: '23 Jun', time: '13:00', g: 'K', venue: 'Estadio Houston', city: 'Houston' },
  { id: 46, h: 'Inglaterra', a: 'Ghana', date: '23 Jun', time: '16:00', g: 'L', venue: 'Estadio Boston', city: 'Boston' },
  { id: 47, h: 'Panamá', a: 'Croacia', date: '23 Jun', time: '19:00', g: 'L', venue: 'Estadio Toronto', city: 'Toronto' },
  { id: 48, h: 'Colombia', a: 'Por definir (K3)', date: '23 Jun', time: '22:00', g: 'K', venue: 'Estadio Guadalajara', city: 'Guadalajara' },
  
  // Miércoles, 24 de junio 2026
  { id: 49, h: 'Suiza', a: 'Canadá', date: '24 Jun', time: '15:00', g: 'B', venue: 'Estadio BC Place Vancouver', city: 'Vancouver' },
  { id: 50, h: 'Por definir (B4)', a: 'Catar', date: '24 Jun', time: '15:00', g: 'B', venue: 'Estadio Seattle', city: 'Seattle' },
  { id: 51, h: 'Brasil', a: 'Escocia', date: '24 Jun', time: '18:00', g: 'C', venue: 'Estadio Miami', city: 'Miami' },
  { id: 52, h: 'Marruecos', a: 'Haití', date: '24 Jun', time: '18:00', g: 'C', venue: 'Estadio Atlanta', city: 'Atlanta' },
  { id: 53, h: 'Por definir (A4)', a: 'México', date: '24 Jun', time: '21:00', g: 'A', venue: 'Estadio Ciudad de México', city: 'CDMX' },
  { id: 54, h: 'Sudáfrica', a: 'Corea del Sur', date: '24 Jun', time: '21:00', g: 'A', venue: 'Estadio Monterrey', city: 'Monterrey' },
  
  // Jueves, 25 de junio 2026
  { id: 55, h: 'Curazao', a: 'Costa de Marfil', date: '25 Jun', time: '16:00', g: 'E', venue: 'Estadio Filadelfia', city: 'Filadelfia' },
  { id: 56, h: 'Ecuador', a: 'Alemania', date: '25 Jun', time: '16:00', g: 'E', venue: 'Estadio Nueva York Nueva Jersey', city: 'Nueva York' },
  { id: 57, h: 'Japón', a: 'Por definir (F2)', date: '25 Jun', time: '19:00', g: 'F', venue: 'Estadio Dallas', city: 'Dallas' },
  { id: 58, h: 'Túnez', a: 'Países Bajos', date: '25 Jun', time: '19:00', g: 'F', venue: 'Estadio Kansas City', city: 'Kansas City' },
  { id: 59, h: 'Por definir (D2)', a: 'Estados Unidos', date: '25 Jun', time: '22:00', g: 'D', venue: 'Estadio Los Ángeles', city: 'Los Ángeles' },
  { id: 60, h: 'Paraguay', a: 'Australia', date: '25 Jun', time: '22:00', g: 'D', venue: 'Estadio Bahía de San Francisco', city: 'San Francisco' },
  
  // Viernes, 26 de junio 2026
  { id: 61, h: 'Noruega', a: 'Francia', date: '26 Jun', time: '15:00', g: 'I', venue: 'Estadio Boston', city: 'Boston' },
  { id: 62, h: 'Senegal', a: 'Por definir (I2)', date: '26 Jun', time: '15:00', g: 'I', venue: 'Estadio Toronto', city: 'Toronto' },
  { id: 63, h: 'Cabo Verde', a: 'Arabia Saudí', date: '26 Jun', time: '20:00', g: 'H', venue: 'Estadio Houston', city: 'Houston' },
  { id: 64, h: 'Uruguay', a: 'España', date: '26 Jun', time: '20:00', g: 'H', venue: 'Estadio Guadalajara', city: 'Guadalajara' },
  { id: 65, h: 'Egipto', a: 'Irán', date: '26 Jun', time: '23:00', g: 'G', venue: 'Estadio Seattle', city: 'Seattle' },
  { id: 66, h: 'Nueva Zelanda', a: 'Bélgica', date: '26 Jun', time: '23:00', g: 'G', venue: 'Estadio BC Place Vancouver', city: 'Vancouver' },
  
  // Sábado, 27 de junio 2026
  { id: 67, h: 'Panamá', a: 'Inglaterra', date: '27 Jun', time: '17:00', g: 'L', venue: 'Estadio Nueva York Nueva Jersey', city: 'Nueva York' },
  { id: 68, h: 'Croacia', a: 'Ghana', date: '27 Jun', time: '17:00', g: 'L', venue: 'Estadio Filadelfia', city: 'Filadelfia' },
  { id: 69, h: 'Colombia', a: 'Portugal', date: '27 Jun', time: '19:30', g: 'K', venue: 'Estadio Miami', city: 'Miami' },
  { id: 70, h: 'Por definir (K3)', a: 'Uzbekistán', date: '27 Jun', time: '19:30', g: 'K', venue: 'Estadio Atlanta', city: 'Atlanta' },
  { id: 71, h: 'Argelia', a: 'Austria', date: '27 Jun', time: '22:00', g: 'J', venue: 'Estadio Kansas City', city: 'Kansas City' },
  { id: 72, h: 'Jordania', a: 'Argentina', date: '27 Jun', time: '22:00', g: 'J', venue: 'Estadio Dallas', city: 'Dallas' },
];

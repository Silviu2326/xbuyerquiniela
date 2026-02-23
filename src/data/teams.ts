import type { TeamsData } from '../types/index.ts';

export const TEAMS: TeamsData = {
  // ============================================
  // GRUPO A
  // ============================================
  "México": {
    c: "mx",
    g: "A",
    rk: 15,
    coach: "Javier Aguirre",
    schema: "5-4-1",
    form: ["W", "W", "D", "L", "W"],
    squad: [
      { id: 1, n: "G. Ochoa", p: "POR", club: "Salernitana", v: 5, s: 72 },
      { id: 2, n: "L. Malagón", p: "POR", club: "América", v: 7, s: 74 },
      { id: 3, n: "J. Sánchez", p: "DEF", club: "Ajax", v: 22, s: 78, h: 1 },
      { id: 4, n: "C. Montes", p: "DEF", club: "Besiktas", v: 14, s: 76 },
      { id: 5, n: "J. Gallardo", p: "DEF", club: "Toluca", v: 8, s: 73 },
      { id: 6, n: "G. Arteaga", p: "DEF", club: "Genk", v: 11, s: 75 },
      { id: 7, n: "E. Álvarez", p: "MED", club: "América", v: 12, s: 76, h: 1 },
      { id: 8, n: "L. Romo", p: "MED", club: "Monterrey", v: 10, s: 74 },
      { id: 9, n: "C. Rodríguez", p: "MED", club: "Cruz Azul", v: 8, s: 72 },
      { id: 10, n: "S. Giménez", p: "DEL", club: "Feyenoord", v: 30, s: 83, h: 1 },
      { id: 11, n: "H. Lozano", p: "DEL", club: "PSV", v: 18, s: 79, h: 1 },
    ]
  },
  "Sudáfrica": {
    c: "za",
    g: "A",
    rk: 58,
    coach: "Hugo Broos",
    schema: "4-4-2",
    form: ["W", "D", "W", "L", "D"],
    squad: [
      { id: 20, n: "R. Williams", p: "POR", club: "Mamelodi", v: 3, s: 70 },
      { id: 21, n: "K. Maela", p: "DEF", club: "Orlando Pirates", v: 4, s: 68 },
      { id: 22, n: "G. Kekana", p: "DEF", club: "Mamelodi", v: 3, s: 67 },
      { id: 23, n: "T. Modiba", p: "MED", club: "Mamelodi", v: 5, s: 69, h: 1 },
      { id: 24, n: "T. Zwane", p: "MED", club: "Mamelodi", v: 4, s: 68 },
      { id: 25, n: "P. Tau", p: "DEL", club: "Egyptian", v: 8, s: 72, h: 1 },
    ]
  },
  "Corea del Sur": {
    c: "kr",
    g: "A",
    rk: 23,
    coach: "Hong Myung-bo",
    schema: "4-2-3-1",
    form: ["W", "L", "W", "W", "D"],
    squad: [
      { id: 30, n: "Kim Seung-gyu", p: "POR", club: "Al Shabab", v: 4, s: 71 },
      { id: 31, n: "Kim Min-jae", p: "DEF", club: "Bayern", v: 50, s: 84, h: 1 },
      { id: 32, n: "Kim Young-gwon", p: "DEF", club: "Ulsan", v: 3, s: 69 },
      { id: 33, n: "Lee Kang-in", p: "MED", club: "PSG", v: 45, s: 81, h: 1 },
      { id: 34, n: "Son Heung-min", p: "DEL", club: "Tottenham", v: 60, s: 87, h: 1 },
      { id: 35, n: "Hwang Hee-chan", p: "DEL", club: "Wolves", v: 25, s: 78 },
    ]
  },
  "Por definir (A)": {
    c: "xx",
    g: "A",
    rk: 50,
    coach: "Por definir",
    schema: "4-4-2",
    form: ["D", "D", "D", "D", "D"],
    squad: []
  },

  // ============================================
  // GRUPO B
  // ============================================
  "Canadá": {
    c: "ca",
    g: "B",
    rk: 31,
    coach: "Jesse Marsch",
    schema: "4-3-3",
    form: ["W", "D", "W", "L", "W"],
    squad: [
      { id: 40, n: "M. Crépeau", p: "POR", club: "Portland", v: 5, s: 72 },
      { id: 41, n: "A. Davies", p: "DEF", club: "Bayern", v: 70, s: 86, h: 1 },
      { id: 42, n: "I. Koné", p: "MED", club: "Marseille", v: 12, s: 75 },
      { id: 43, n: "S. Eustáquio", p: "MED", club: "Porto", v: 15, s: 76 },
      { id: 44, n: "J. David", p: "DEL", club: "Lille", v: 55, s: 84, h: 1 },
      { id: 45, n: "C. Larin", p: "DEL", club: "R. Mallorca", v: 18, s: 77 },
    ]
  },
  "Catar": {
    c: "qa",
    g: "B",
    rk: 55,
    coach: "Tintín Márquez",
    schema: "5-3-2",
    form: ["W", "W", "L", "D", "W"],
    squad: [
      { id: 50, n: "M. Barsham", p: "POR", club: "Al Sadd", v: 3, s: 68 },
      { id: 51, n: "B. Al-Rawi", p: "DEF", club: "Al Duhail", v: 4, s: 69 },
      { id: 52, n: "A. Madibo", p: "MED", club: "Al Duhail", v: 5, s: 70 },
      { id: 53, n: "A. Afif", p: "DEL", club: "Al Sadd", v: 15, s: 77, h: 1 },
      { id: 54, n: "M. Ali", p: "DEL", club: "Al Duhail", v: 12, s: 76 },
    ]
  },
  "Suiza": {
    c: "ch",
    g: "B",
    rk: 20,
    coach: "Murat Yakin",
    schema: "4-2-3-1",
    form: ["D", "W", "L", "D", "W"],
    squad: [
      { id: 60, n: "Y. Sommer", p: "POR", club: "Inter", v: 8, s: 80 },
      { id: 61, n: "M. Akanji", p: "DEF", club: "Man City", v: 45, s: 84, h: 1 },
      { id: 62, n: "R. Rodríguez", p: "DEF", club: "Betis", v: 10, s: 76 },
      { id: 63, n: "G. Xhaka", p: "MED", club: "Leverkusen", v: 35, s: 83, h: 1 },
      { id: 64, n: "F. Freuler", p: "MED", club: "Bologna", v: 12, s: 75 },
      { id: 65, n: "B. Embolo", p: "DEL", club: "Monaco", v: 25, s: 79 },
    ]
  },
  "Por definir (B)": {
    c: "xx",
    g: "B",
    rk: 50,
    coach: "Por definir",
    schema: "4-4-2",
    form: ["D", "D", "D", "D", "D"],
    squad: []
  },

  // ============================================
  // GRUPO C
  // ============================================
  "Brasil": {
    c: "br",
    g: "C",
    rk: 5,
    coach: "Dorival Jr.",
    schema: "4-2-3-1",
    form: ["W", "L", "W", "D", "W"],
    squad: [
      { id: 70, n: "Alisson", p: "POR", club: "Liverpool", v: 50, s: 87 },
      { id: 71, n: "Marquinhos", p: "DEF", club: "PSG", v: 35, s: 83 },
      { id: 72, n: "G. Magalhães", p: "DEF", club: "Arsenal", v: 55, s: 84, h: 1 },
      { id: 73, n: "B. Guimarães", p: "MED", club: "Newcastle", v: 70, s: 86, h: 1 },
      { id: 74, n: "Rodrygo", p: "MED", club: "R. Madrid", v: 90, s: 87 },
      { id: 75, n: "Vinicius Jr", p: "DEL", club: "R. Madrid", v: 150, s: 93, h: 1 },
      { id: 76, n: "Endrick", p: "DEL", club: "R. Madrid", v: 60, s: 82, h: 1 },
    ]
  },
  "Marruecos": {
    c: "ma",
    g: "C",
    rk: 14,
    coach: "Walid Regragui",
    schema: "4-1-4-1",
    form: ["W", "W", "D", "W", "L"],
    squad: [
      { id: 80, n: "Y. Bounou", p: "POR", club: "Al Hilal", v: 12, s: 79 },
      { id: 81, n: "A. Hakimi", p: "DEF", club: "PSG", v: 60, s: 85, h: 1 },
      { id: 82, n: "N. Aguerd", p: "DEF", club: "R. Sociedad", v: 22, s: 78 },
      { id: 83, n: "S. Amrabat", p: "MED", club: "Fenerbahçe", v: 18, s: 77 },
      { id: 84, n: "A. Ziyech", p: "DEL", club: "Galatasaray", v: 20, s: 78, h: 1 },
      { id: 85, n: "Y. En-Nesyri", p: "DEL", club: "Fenerbahçe", v: 28, s: 80 },
    ]
  },
  "Haití": {
    c: "ht",
    g: "C",
    rk: 85,
    coach: "Sébastien Migné",
    schema: "4-4-2",
    form: ["L", "W", "L", "D", "L"],
    squad: [
      { id: 90, n: "J. Placide", p: "POR", club: "Red Star", v: 2, s: 65 },
      { id: 91, n: "D. Étienne", p: "MED", club: "Charleston", v: 4, s: 68 },
      { id: 92, n: "C. Bassett", p: "MED", club: "Sporting KC", v: 5, s: 69 },
    ]
  },
  "Escocia": {
    c: "gb-sct",
    g: "C",
    rk: 42,
    coach: "Steve Clarke",
    schema: "3-4-2-1",
    form: ["W", "L", "D", "W", "D"],
    squad: [
      { id: 95, n: "A. Gunn", p: "POR", club: "Norwich", v: 5, s: 71 },
      { id: 96, n: "A. Robertson", p: "DEF", club: "Liverpool", v: 35, s: 82, h: 1 },
      { id: 97, n: "S. McTominay", p: "MED", club: "Napoli", v: 40, s: 83, h: 1 },
      { id: 98, n: "J. McGinn", p: "MED", club: "Aston Villa", v: 20, s: 78 },
    ]
  },

  // ============================================
  // GRUPO D
  // ============================================
  "EE. UU.": {
    c: "us",
    g: "D",
    rk: 11,
    coach: "Mauricio Pochettino",
    schema: "4-3-3",
    form: ["W", "D", "W", "L", "W"],
    squad: [
      { id: 100, n: "M. Turner", p: "POR", club: "Nottingham", v: 10, s: 75 },
      { id: 101, n: "A. Dest", p: "DEF", club: "PSV", v: 15, s: 77 },
      { id: 102, n: "T. Adams", p: "MED", club: "Bournemouth", v: 25, s: 79 },
      { id: 103, n: "G. Reyna", p: "MED", club: "Dortmund", v: 30, s: 80 },
      { id: 104, n: "C. Pulisic", p: "DEL", club: "AC Milan", v: 52, s: 84, h: 1 },
      { id: 105, n: "F. Balogun", p: "DEL", club: "Monaco", v: 35, s: 81 },
    ]
  },
  "Paraguay": {
    c: "py",
    g: "D",
    rk: 36,
    coach: "Gustavo Alfaro",
    schema: "4-4-2",
    form: ["L", "W", "D", "L", "W"],
    squad: [
      { id: 110, n: "G. Gómez", p: "POR", club: "Olimpia", v: 5, s: 71 },
      { id: 111, n: "O. Alderete", p: "DEF", club: "Getafe", v: 12, s: 75 },
      { id: 112, n: "M. Villasanti", p: "MED", club: "Grêmio", v: 15, s: 76 },
      { id: 113, n: "A. Sosa", p: "DEL", club: "Toluca", v: 8, s: 72 },
    ]
  },
  "Australia": {
    c: "au",
    g: "D",
    rk: 24,
    coach: "Tony Popovic",
    schema: "4-2-3-1",
    form: ["W", "W", "D", "W", "D"],
    squad: [
      { id: 120, n: "M. Ryan", p: "POR", club: "Roma", v: 8, s: 75 },
      { id: 121, n: "H. Souttar", p: "DEF", club: "Leicester", v: 12, s: 75 },
      { id: 122, n: "R. Irankunda", p: "MED", club: "Sturm Graz", v: 15, s: 76, h: 1 },
      { id: 123, n: "M. Duke", p: "DEL", club: "Machida", v: 5, s: 71 },
    ]
  },
  "Por definir (D)": {
    c: "xx",
    g: "D",
    rk: 50,
    coach: "Por definir",
    schema: "4-4-2",
    form: ["D", "D", "D", "D", "D"],
    squad: []
  },

  // ============================================
  // GRUPO E
  // ============================================
  "Alemania": {
    c: "de",
    g: "E",
    rk: 8,
    coach: "Julian Nagelsmann",
    schema: "4-2-3-1",
    form: ["W", "D", "W", "W", "D"],
    squad: [
      { id: 130, n: "M. Neuer", p: "POR", club: "Bayern", v: 12, s: 82 },
      { id: 131, n: "J. Kimmich", p: "DEF", club: "Barcelona", v: 65, s: 87, h: 1 },
      { id: 132, n: "A. Rüdiger", p: "DEF", club: "R. Madrid", v: 40, s: 83 },
      { id: 133, n: "J. Musiala", p: "MED", club: "Bayern", v: 120, s: 90, h: 1 },
      { id: 134, n: "F. Wirtz", p: "MED", club: "Leverkusen", v: 130, s: 91, h: 1 },
      { id: 135, n: "K. Havertz", p: "DEL", club: "Arsenal", v: 55, s: 83 },
      { id: 136, n: "N. Füllkrug", p: "DEL", club: "West Ham", v: 25, s: 79 },
    ]
  },
  "Curazao": {
    c: "cw",
    g: "E",
    rk: 82,
    coach: "Dick Advocaat",
    schema: "4-2-3-1",
    form: ["L", "D", "W", "L", "D"],
    squad: [
      { id: 140, n: "E. Room", p: "POR", club: "Twente", v: 3, s: 68 },
      { id: 141, n: "J. Gaari", p: "DEF", club: "Almere", v: 4, s: 67 },
      { id: 142, n: "K. Leerdam", p: "MED", club: "Cincinnati", v: 5, s: 69 },
      { id: 143, n: "R. Koolwijk", p: "DEL", club: "Viktoria", v: 3, s: 66 },
    ]
  },
  "Costa de Marfil": {
    c: "ci",
    g: "E",
    rk: 38,
    coach: "Emerse Faé",
    schema: "4-3-3",
    form: ["W", "W", "D", "L", "W"],
    squad: [
      { id: 145, n: "Y. Fofana", p: "POR", club: "Monaco", v: 25, s: 79 },
      { id: 146, n: "S. Aurier", p: "DEF", club: "Galatasaray", v: 8, s: 74 },
      { id: 147, n: "F. Kessié", p: "MED", club: "Al Ahli", v: 35, s: 82, h: 1 },
      { id: 148, n: "S. Haller", p: "DEL", club: "Leganés", v: 15, s: 76 },
    ]
  },
  "Ecuador": {
    c: "ec",
    g: "E",
    rk: 24,
    coach: "Félix Sánchez",
    schema: "4-3-3",
    form: ["W", "L", "W", "D", "W"],
    squad: [
      { id: 150, n: "H. Galíndez", p: "POR", club: "Sao Paulo", v: 5, s: 72 },
      { id: 151, n: "P. Estupiñán", p: "DEF", club: "Brighton", v: 25, s: 79 },
      { id: 152, n: "M. Caicedo", p: "MED", club: "Chelsea", v: 80, s: 86, h: 1 },
      { id: 153, n: "K. Páez", p: "MED", club: "Independiente", v: 20, s: 77, h: 1 },
      { id: 154, n: "E. Valencia", p: "DEL", club: "LDU", v: 8, s: 74 },
    ]
  },

  // ============================================
  // GRUPO F
  // ============================================
  "Países Bajos": {
    c: "nl",
    g: "F",
    rk: 7,
    coach: "Ronald Koeman",
    schema: "3-4-1-2",
    form: ["W", "W", "D", "W", "L"],
    squad: [
      { id: 160, n: "B. Verbruggen", p: "POR", club: "Brighton", v: 15, s: 78 },
      { id: 161, n: "V. van Dijk", p: "DEF", club: "Liverpool", v: 45, s: 86, h: 1 },
      { id: 162, n: "N. Aké", p: "DEF", club: "Man City", v: 35, s: 83 },
      { id: 163, n: "D. Dumfries", p: "DEF", club: "Inter", v: 25, s: 80 },
      { id: 164, n: "F. de Jong", p: "MED", club: "Barcelona", v: 70, s: 86, h: 1 },
      { id: 165, n: "C. Gakpo", p: "DEL", club: "Liverpool", v: 55, s: 84, h: 1 },
      { id: 166, n: "M. Depay", p: "DEL", club: "Corinthians", v: 12, s: 77 },
    ]
  },
  "Japón": {
    c: "jp",
    g: "F",
    rk: 17,
    coach: "Hajime Moriyasu",
    schema: "4-2-3-1",
    form: ["W", "W", "W", "W", "D"],
    squad: [
      { id: 170, n: "S. Suzuki", p: "POR", club: "Feyenoord", v: 10, s: 75 },
      { id: 171, n: "T. Tomiyasu", p: "DEF", club: "Arsenal", v: 22, s: 79 },
      { id: 172, n: "W. Endo", p: "MED", club: "Liverpool", v: 18, s: 78 },
      { id: 173, n: "T. Kubo", p: "MED", club: "R. Sociedad", v: 40, s: 82, h: 1 },
      { id: 174, n: "K. Mitoma", p: "MED", club: "Brighton", v: 35, s: 81, h: 1 },
      { id: 175, n: "D. Kamada", p: "DEL", club: "C. Palace", v: 18, s: 77 },
    ]
  },
  "Túnez": {
    c: "tn",
    g: "F",
    rk: 41,
    coach: "Montasser Louhichi",
    schema: "4-3-3",
    form: ["L", "W", "D", "L", "W"],
    squad: [
      { id: 180, n: "M. Hassen", p: "POR", club: "Club Africain", v: 3, s: 69 },
      { id: 181, n: "Y. Meriah", p: "DEF", club: "Espérance", v: 4, s: 70 },
      { id: 182, n: "E. Skhiri", p: "MED", club: "Frankfurt", v: 12, s: 76 },
      { id: 183, n: "Y. Msakni", p: "DEL", club: "Espérance", v: 5, s: 71 },
    ]
  },
  "Por definir (F)": {
    c: "xx",
    g: "F",
    rk: 50,
    coach: "Por definir",
    schema: "4-4-2",
    form: ["D", "D", "D", "D", "D"],
    squad: []
  },

  // ============================================
  // GRUPO G
  // ============================================
  "Bélgica": {
    c: "be",
    g: "G",
    rk: 8,
    coach: "Domenico Tedesco",
    schema: "4-2-3-1",
    form: ["W", "D", "L", "W", "D"],
    squad: [
      { id: 190, n: "T. Courtois", p: "POR", club: "R. Madrid", v: 40, s: 85 },
      { id: 191, n: "T. Castagne", p: "DEF", club: "Fulham", v: 15, s: 77 },
      { id: 192, n: "K. De Bruyne", p: "MED", club: "Man City", v: 80, s: 90, h: 1 },
      { id: 193, n: "Y. Tielemans", p: "MED", club: "Aston Villa", v: 30, s: 80 },
      { id: 194, n: "R. Lukaku", p: "DEL", club: "Napoli", v: 45, s: 84, h: 1 },
      { id: 195, n: "J. Doku", p: "DEL", club: "Man City", v: 55, s: 85 },
    ]
  },
  "Egipto": {
    c: "eg",
    g: "G",
    rk: 33,
    coach: "Hossam Hassan",
    schema: "4-2-3-1",
    form: ["W", "W", "D", "W", "W"],
    squad: [
      { id: 200, n: "M. El Shenawy", p: "POR", club: "Al Ahly", v: 5, s: 74 },
      { id: 201, n: "M. Abdelmonem", p: "DEF", club: "Al Ahly", v: 8, s: 74 },
      { id: 202, n: "M. Elneny", p: "MED", club: "Al Jazira", v: 6, s: 73 },
      { id: 203, n: "M. Salah", p: "DEL", club: "Liverpool", v: 100, s: 90, h: 1 },
      { id: 204, n: "O. Marmoush", p: "DEL", club: "Man City", v: 60, s: 85, h: 1 },
    ]
  },
  "Irán": {
    c: "ir",
    g: "G",
    rk: 18,
    coach: "Amir Ghalenoei",
    schema: "4-4-2",
    form: ["W", "W", "D", "W", "L"],
    squad: [
      { id: 210, n: "A. Beiranvand", p: "POR", club: "Persepolis", v: 4, s: 72 },
      { id: 211, n: "M. Mohammadi", p: "DEF", club: "AEK", v: 6, s: 73 },
      { id: 212, n: "S. Ezatolahi", p: "MED", club: "Vejle", v: 8, s: 74 },
      { id: 213, n: "M. Taremi", p: "DEL", club: "Inter", v: 35, s: 81, h: 1 },
      { id: 214, n: "S. Azmoun", p: "DEL", club: "Shabab", v: 20, s: 78 },
    ]
  },
  "Nueva Zelanda": {
    c: "nz",
    g: "G",
    rk: 89,
    coach: "Darren Bazeley",
    schema: "4-4-2",
    form: ["W", "D", "W", "D", "W"],
    squad: [
      { id: 220, n: "M. Woud", p: "POR", club: "Waalwijk", v: 3, s: 67 },
      { id: 221, n: "L. Pijnaker", p: "DEF", club: "Auckland", v: 2, s: 66 },
      { id: 222, n: "M. Stamenic", p: "MED", club: "Celtic", v: 8, s: 72 },
      { id: 223, n: "C. Wood", p: "DEL", club: "Nottingham", v: 12, s: 76, h: 1 },
    ]
  },

  // ============================================
  // GRUPO H
  // ============================================
  "España": {
    c: "es",
    g: "H",
    rk: 1,
    coach: "Luis de la Fuente",
    schema: "4-3-3",
    form: ["W", "W", "W", "W", "D"],
    squad: [
      { id: 230, n: "Unai Simón", p: "POR", club: "Athletic", v: 30, s: 83 },
      { id: 231, n: "D. Carvajal", p: "DEF", club: "R. Madrid", v: 25, s: 82 },
      { id: 232, n: "Pedri", p: "MED", club: "Barcelona", v: 90, s: 89, h: 1 },
      { id: 233, n: "Rodri", p: "MED", club: "Man City", v: 110, s: 93, h: 1 },
      { id: 234, n: "Lamine Yamal", p: "DEL", club: "Barcelona", v: 150, s: 92, h: 1 },
      { id: 235, n: "N. Williams", p: "DEL", club: "Athletic", v: 70, s: 86, h: 1 },
      { id: 236, n: "Á. Morata", p: "DEL", club: "AC Milan", v: 20, s: 79 },
    ]
  },
  "Cabo Verde": {
    c: "cv",
    g: "H",
    rk: 65,
    coach: "Bubista",
    schema: "4-3-3",
    form: ["W", "D", "W", "L", "D"],
    squad: [
      { id: 240, n: "Vozinha", p: "POR", club: "Nacional", v: 2, s: 68 },
      { id: 241, n: "R. Andrade", p: "DEF", club: "Estrela", v: 3, s: 69 },
      { id: 242, n: "K. Tavares", p: "MED", club: "Kocaelispor", v: 4, s: 70 },
      { id: 243, n: "R. Rodrigues", p: "DEL", club: "Estoril", v: 6, s: 72, h: 1 },
    ]
  },
  "Arabia Saudita": {
    c: "sa",
    g: "H",
    rk: 59,
    coach: "Hervé Renard",
    schema: "4-2-3-1",
    form: ["L", "W", "D", "W", "L"],
    squad: [
      { id: 250, n: "M. Al Owais", p: "POR", club: "Al Hilal", v: 5, s: 72 },
      { id: 251, n: "S. Al Ghannam", p: "DEF", club: "Al Nassr", v: 6, s: 72 },
      { id: 252, n: "S. Al Faraj", p: "MED", club: "Al Hilal", v: 7, s: 73 },
      { id: 253, n: "S. Al Dawsari", p: "DEL", club: "Al Hilal", v: 15, s: 77, h: 1 },
      { id: 254, n: "F. Al-Buraikan", p: "DEL", club: "Al Ahli", v: 10, s: 75 },
    ]
  },
  "Uruguay": {
    c: "uy",
    g: "H",
    rk: 9,
    coach: "Marcelo Bielsa",
    schema: "4-3-3",
    form: ["W", "D", "W", "L", "W"],
    squad: [
      { id: 260, n: "S. Rochet", p: "POR", club: "Inter", v: 10, s: 75 },
      { id: 261, n: "R. Araújo", p: "DEF", club: "Barcelona", v: 55, s: 84, h: 1 },
      { id: 262, n: "F. Valverde", p: "MED", club: "R. Madrid", v: 100, s: 89, h: 1 },
      { id: 263, n: "F. De la Cruz", p: "MED", club: "Flamengo", v: 15, s: 77 },
      { id: 264, n: "D. Núñez", p: "DEL", club: "Liverpool", v: 60, s: 84, h: 1 },
      { id: 265, n: "L. Suárez", p: "DEL", club: "Inter Miami", v: 8, s: 76 },
    ]
  },

  // ============================================
  // GRUPO I
  // ============================================
  "Francia": {
    c: "fr",
    g: "I",
    rk: 3,
    coach: "Didier Deschamps",
    schema: "4-2-3-1",
    form: ["W", "D", "W", "W", "L"],
    squad: [
      { id: 270, n: "M. Maignan", p: "POR", club: "AC Milan", v: 45, s: 85 },
      { id: 271, n: "W. Saliba", p: "DEF", club: "Arsenal", v: 70, s: 86, h: 1 },
      { id: 272, n: "J. Koundé", p: "DEF", club: "Barcelona", v: 55, s: 84 },
      { id: 273, n: "A. Tchouaméni", p: "MED", club: "R. Madrid", v: 75, s: 85 },
      { id: 274, n: "K. Mbappé", p: "DEL", club: "R. Madrid", v: 180, s: 94, h: 1 },
      { id: 275, n: "O. Dembélé", p: "DEL", club: "PSG", v: 70, s: 85 },
    ]
  },
  "Senegal": {
    c: "sn",
    g: "I",
    rk: 16,
    coach: "Aliou Cissé",
    schema: "4-3-3",
    form: ["W", "W", "D", "W", "W"],
    squad: [
      { id: 280, n: "E. Mendy", p: "POR", club: "Al Ahli", v: 12, s: 79 },
      { id: 281, n: "K. Koulibaly", p: "DEF", club: "Al Hilal", v: 15, s: 80 },
      { id: 282, n: "I. Sarr", p: "MED", club: "Crystal Palace", v: 30, s: 81, h: 1 },
      { id: 283, n: "N. Jackson", p: "DEL", club: "Chelsea", v: 55, s: 84, h: 1 },
      { id: 284, n: "S. Mané", p: "DEL", club: "Al Nassr", v: 25, s: 80 },
    ]
  },
  "Noruega": {
    c: "no",
    g: "I",
    rk: 43,
    coach: "Ståle Solbakken",
    schema: "4-3-3",
    form: ["W", "L", "W", "D", "W"],
    squad: [
      { id: 290, n: "Ø. Nyland", p: "POR", club: "Sevilla", v: 8, s: 75 },
      { id: 291, n: "J. Ryerson", p: "DEF", club: "Dortmund", v: 15, s: 77 },
      { id: 292, n: "M. Ødegaard", p: "MED", club: "Arsenal", v: 90, s: 89, h: 1 },
      { id: 293, n: "E. Haaland", p: "DEL", club: "Man City", v: 180, s: 93, h: 1 },
    ]
  },
  "Por definir (I)": {
    c: "xx",
    g: "I",
    rk: 50,
    coach: "Por definir",
    schema: "4-4-2",
    form: ["D", "D", "D", "D", "D"],
    squad: []
  },

  // ============================================
  // GRUPO J
  // ============================================
  "Argentina": {
    c: "ar",
    g: "J",
    rk: 2,
    coach: "Lionel Scaloni",
    schema: "4-3-3",
    form: ["W", "W", "W", "D", "W"],
    squad: [
      { id: 300, n: "E. Martínez", p: "POR", club: "Aston Villa", v: 35, s: 86 },
      { id: 301, n: "C. Romero", p: "DEF", club: "Tottenham", v: 55, s: 85 },
      { id: 302, n: "E. Fernández", p: "MED", club: "Chelsea", v: 75, s: 87, h: 1 },
      { id: 303, n: "A. Mac Allister", p: "MED", club: "Liverpool", v: 70, s: 86, h: 1 },
      { id: 304, n: "L. Messi", p: "DEL", club: "Inter Miami", v: 50, s: 90, h: 1 },
      { id: 305, n: "J. Álvarez", p: "DEL", club: "Atlético", v: 80, s: 87, h: 1 },
      { id: 306, n: "L. Martínez", p: "DEL", club: "Inter", v: 85, s: 88 },
    ]
  },
  "Argelia": {
    c: "dz",
    g: "J",
    rk: 40,
    coach: "Vladimir Petković",
    schema: "4-3-3",
    form: ["W", "D", "W", "L", "D"],
    squad: [
      { id: 310, n: "A. Mandrea", p: "POR", club: "Damac", v: 5, s: 72 },
      { id: 311, n: "R. Bensebaini", p: "DEF", club: "Dortmund", v: 18, s: 77 },
      { id: 312, n: "I. Bennacer", p: "MED", club: "Marseille", v: 35, s: 82, h: 1 },
      { id: 313, n: "R. Mahrez", p: "DEL", club: "Al Ahli", v: 20, s: 79 },
      { id: 314, n: "M. Amoura", p: "DEL", club: "Sporting", v: 25, s: 80 },
    ]
  },
  "Austria": {
    c: "at",
    g: "J",
    rk: 22,
    coach: "Ralf Rangnick",
    schema: "4-2-3-1",
    form: ["W", "W", "D", "W", "L"],
    squad: [
      { id: 320, n: "P. Pentz", p: "POR", club: "Leverkusen", v: 8, s: 75 },
      { id: 321, n: "P. Wimmer", p: "DEF", club: "Wolfsburg", v: 15, s: 77 },
      { id: 322, n: "K. Onisiwo", p: "MED", club: "Mainz", v: 12, s: 76 },
      { id: 323, n: "M. Sabitzer", p: "MED", club: "Dortmund", v: 25, s: 80, h: 1 },
      { id: 324, n: "M. Arnautović", p: "DEL", club: "Inter", v: 10, s: 76 },
    ]
  },
  "Jordania": {
    c: "jo",
    g: "J",
    rk: 68,
    coach: "Jamal Sellami",
    schema: "4-4-2",
    form: ["L", "W", "D", "W", "L"],
    squad: [
      { id: 330, n: "Y. Al Shatnawi", p: "POR", club: "Al Wehdat", v: 2, s: 67 },
      { id: 331, n: "M. Hanteer", p: "DEF", club: "Al Faisaly", v: 3, s: 68 },
      { id: 332, n: "M. Al-Rashdan", p: "MED", club: "Al Wehdat", v: 4, s: 69 },
      { id: 333, n: "Y. Naimat", p: "DEL", club: "Al Ahli", v: 8, s: 72, h: 1 },
    ]
  },

  // ============================================
  // GRUPO K
  // ============================================
  "Portugal": {
    c: "pt",
    g: "K",
    rk: 6,
    coach: "Roberto Martínez",
    schema: "4-3-3",
    form: ["W", "W", "W", "D", "W"],
    squad: [
      { id: 340, n: "D. Costa", p: "POR", club: "Porto", v: 35, s: 83 },
      { id: 341, n: "R. Dias", p: "DEF", club: "Man City", v: 60, s: 86, h: 1 },
      { id: 342, n: "J. Cancelo", p: "DEF", club: "Barcelona", v: 40, s: 82 },
      { id: 343, n: "B. Fernandes", p: "MED", club: "Man Utd", v: 70, s: 87, h: 1 },
      { id: 344, n: "B. Silva", p: "MED", club: "Man City", v: 70, s: 86 },
      { id: 345, n: "Cristiano R.", p: "DEL", club: "Al Nassr", v: 30, s: 82 },
      { id: 346, n: "R. Leão", p: "DEL", club: "AC Milan", v: 70, s: 86, h: 1 },
    ]
  },
  "Colombia": {
    c: "co",
    g: "K",
    rk: 12,
    coach: "Néstor Lorenzo",
    schema: "4-2-3-1",
    form: ["W", "W", "D", "W", "L"],
    squad: [
      { id: 350, n: "C. Vargas", p: "POR", club: "Atlas", v: 8, s: 74 },
      { id: 351, n: "D. Sánchez", p: "DEF", club: "Tottenham", v: 30, s: 80 },
      { id: 352, n: "J. Arias", p: "MED", club: "Zenit", v: 25, s: 80, h: 1 },
      { id: 353, n: "J. Rodríguez", p: "MED", club: "Rayo", v: 12, s: 78 },
      { id: 354, n: "L. Díaz", p: "DEL", club: "Liverpool", v: 70, s: 86, h: 1 },
      { id: 355, n: "J. Durán", p: "DEL", club: "Aston Villa", v: 35, s: 81 },
    ]
  },
  "Uzbekistán": {
    c: "uz",
    g: "K",
    rk: 58,
    coach: "Timur Kapadze",
    schema: "4-2-3-1",
    form: ["W", "W", "D", "W", "D"],
    squad: [
      { id: 360, n: "U. Yusupov", p: "POR", club: "Navbahor", v: 3, s: 68 },
      { id: 361, n: "F. Ashurmatov", p: "DEF", club: "Navbahor", v: 4, s: 69 },
      { id: 362, n: "O. Shukurov", p: "MED", club: "Fatih", v: 8, s: 72 },
      { id: 363, n: "E. Shomurodov", p: "DEL", club: "Roma", v: 15, s: 76, h: 1 },
    ]
  },
  "Por definir (K)": {
    c: "xx",
    g: "K",
    rk: 50,
    coach: "Por definir",
    schema: "4-4-2",
    form: ["D", "D", "D", "D", "D"],
    squad: []
  },

  // ============================================
  // GRUPO L
  // ============================================
  "Inglaterra": {
    c: "gb-eng",
    g: "L",
    rk: 4,
    coach: "Thomas Tuchel",
    schema: "4-3-3",
    form: ["W", "W", "D", "W", "W"],
    squad: [
      { id: 370, n: "J. Pickford", p: "POR", club: "Everton", v: 25, s: 80 },
      { id: 371, n: "J. Stones", p: "DEF", club: "Man City", v: 35, s: 82 },
      { id: 372, n: "D. Rice", p: "MED", club: "Arsenal", v: 100, s: 88, h: 1 },
      { id: 373, n: "J. Bellingham", p: "MED", club: "R. Madrid", v: 150, s: 92, h: 1 },
      { id: 374, n: "P. Foden", p: "MED", club: "Man City", v: 110, s: 89 },
      { id: 375, n: "B. Saka", p: "DEL", club: "Arsenal", v: 120, s: 90, h: 1 },
      { id: 376, n: "H. Kane", p: "DEL", club: "Bayern", v: 80, s: 88 },
    ]
  },
  "Croacia": {
    c: "hr",
    g: "L",
    rk: 10,
    coach: "Zlatko Dalić",
    schema: "4-3-3",
    form: ["L", "W", "D", "W", "W"],
    squad: [
      { id: 380, n: "D. Livaković", p: "POR", club: "Fenerbahçe", v: 15, s: 79 },
      { id: 381, n: "J. Gvardiol", p: "DEF", club: "Man City", v: 70, s: 86, h: 1 },
      { id: 382, n: "L. Modrić", p: "MED", club: "R. Madrid", v: 20, s: 80, h: 1 },
      { id: 383, n: "M. Kovačić", p: "MED", club: "Man City", v: 40, s: 83 },
      { id: 384, n: "A. Kramarić", p: "DEL", club: "Hoffenheim", v: 18, s: 78 },
    ]
  },
  "Ghana": {
    c: "gh",
    g: "L",
    rk: 68,
    coach: "Otto Addo",
    schema: "4-2-3-1",
    form: ["L", "D", "W", "L", "D"],
    squad: [
      { id: 390, n: "L. Ati-Zigi", p: "POR", club: "St. Gallen", v: 5, s: 72 },
      { id: 391, n: "M. Salisu", p: "DEF", club: "Monaco", v: 20, s: 77 },
      { id: 392, n: "T. Partey", p: "MED", club: "Arsenal", v: 25, s: 80, h: 1 },
      { id: 393, n: "M. Kudus", p: "DEL", club: "West Ham", v: 45, s: 83, h: 1 },
      { id: 394, n: "J. Ayew", p: "DEL", club: "Leicester", v: 12, s: 76 },
    ]
  },
  "Panamá": {
    c: "pa",
    g: "L",
    rk: 35,
    coach: "Thomas Christiansen",
    schema: "4-4-2",
    form: ["W", "D", "L", "W", "D"],
    squad: [
      { id: 400, n: "O. Mosquera", p: "POR", club: "Tijuana", v: 5, s: 72 },
      { id: 401, n: "F. Escobar", p: "DEF", club: "NYRB", v: 6, s: 72 },
      { id: 402, n: "A. Carrasquilla", p: "MED", club: "Houston", v: 15, s: 77, h: 1 },
      { id: 403, n: "J. Fajardo", p: "DEL", club: "L.D. Alajuelense", v: 8, s: 73 },
    ]
  },
};

// Función helper para obtener todos los jugadores de todos los equipos
export const getAllPlayers = () => {
  const players: any[] = [];
  Object.entries(TEAMS).forEach(([teamName, team]) => {
    team.squad.forEach(player => {
      players.push({
        ...player,
        nation: teamName,
        flag: team.c
      });
    });
  });
  return players;
};

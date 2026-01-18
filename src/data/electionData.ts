// Uganda 2026 Election Data - Comprehensive results for Presidential and Parliamentary elections

export interface Candidate {
  id: string;
  name: string;
  party: string;
  partyColor: string;
  votes: number;
  percentage: number;
  image?: string;
}

export interface PresidentialResults {
  totalVotes: number;
  registeredVoters: number;
  turnout: number;
  candidates: Candidate[];
}

export interface MPResult {
  name: string;
  party: string;
  partyColor: string;
  votes: number;
  percentage: number;
}

export interface ConstituencyResult {
  id: string;
  name: string;
  district: string;
  region: string;
  registeredVoters: number;
  totalVotes: number;
  turnout: number;
  winner: MPResult;
  candidates: MPResult[];
  presidentialResults: {
    candidateId: string;
    votes: number;
    percentage: number;
  }[];
}

export interface District {
  id: string;
  name: string;
  region: string;
  constituencies: string[];
  totalVotes: number;
  registeredVoters: number;
  turnout: number;
  presidentialWinner: string;
  presidentialResults: {
    candidateId: string;
    votes: number;
    percentage: number;
  }[];
}

export interface Region {
  id: string;
  name: string;
  districts: string[];
  color: string;
  totalVotes: number;
  registeredVoters: number;
}

// Party colors
export const partyColors: Record<string, string> = {
  NRM: "#FFD700",
  NUP: "#DC2626",
  FDC: "#3B82F6",
  DP: "#22C55E",
  UPC: "#F97316",
  ANT: "#8B5CF6",
  IND: "#6B7280",
};

// Presidential Candidates
export const presidentialCandidates: Candidate[] = [
  {
    id: "museveni",
    name: "Yoweri Kaguta Museveni",
    party: "NRM",
    partyColor: partyColors.NRM,
    votes: 6042898,
    percentage: 58.64,
  },
  {
    id: "kyagulanyi",
    name: "Robert Kyagulanyi Ssentamu",
    party: "NUP",
    partyColor: partyColors.NUP,
    votes: 3475298,
    percentage: 33.73,
  },
  {
    id: "muntu",
    name: "Mugisha Muntu",
    party: "ANT",
    partyColor: partyColors.ANT,
    votes: 380954,
    percentage: 3.70,
  },
  {
    id: "mao",
    name: "Nobert Mao",
    party: "DP",
    partyColor: partyColors.DP,
    votes: 204891,
    percentage: 1.99,
  },
  {
    id: "tumukunde",
    name: "Henry Tumukunde",
    party: "IND",
    partyColor: partyColors.IND,
    votes: 200125,
    percentage: 1.94,
  },
];

export const presidentialResults: PresidentialResults = {
  totalVotes: 10304166,
  registeredVoters: 18103603,
  turnout: 56.92,
  candidates: presidentialCandidates,
};

// Regions of Uganda
export const regions: Region[] = [
  {
    id: "central",
    name: "Central Region",
    districts: ["kampala", "wakiso", "mukono", "luwero", "masaka", "mpigi", "kayunga", "buikwe", "mityana", "gomba"],
    color: "#EF4444",
    totalVotes: 3245678,
    registeredVoters: 5234567,
  },
  {
    id: "western",
    name: "Western Region",
    districts: ["mbarara", "kabale", "bushenyi", "kasese", "fortportal", "hoima", "rukungiri", "ntungamo", "ibanda", "kiruhura"],
    color: "#F59E0B",
    totalVotes: 2456789,
    registeredVoters: 3876543,
  },
  {
    id: "eastern",
    name: "Eastern Region",
    districts: ["jinja", "mbale", "soroti", "tororo", "busia", "kapchorwa", "iganga", "kamuli", "bugiri", "pallisa"],
    color: "#10B981",
    totalVotes: 2134567,
    registeredVoters: 3567890,
  },
  {
    id: "northern",
    name: "Northern Region",
    districts: ["gulu", "lira", "arua", "kitgum", "nebbi", "moyo", "adjumani", "koboko", "yumbe", "apac"],
    color: "#3B82F6",
    totalVotes: 2467132,
    registeredVoters: 4424603,
  },
];

// Districts with detailed data
export const districts: District[] = [
  // Central Region
  {
    id: "kampala",
    name: "Kampala",
    region: "central",
    constituencies: ["kampala-central", "makindye-east", "makindye-west", "rubaga-north", "rubaga-south", "kawempe-north", "kawempe-south", "nakawa"],
    totalVotes: 567890,
    registeredVoters: 987654,
    turnout: 57.5,
    presidentialWinner: "kyagulanyi",
    presidentialResults: [
      { candidateId: "kyagulanyi", votes: 312456, percentage: 55.02 },
      { candidateId: "museveni", votes: 198765, percentage: 35.00 },
      { candidateId: "muntu", votes: 34567, percentage: 6.09 },
      { candidateId: "mao", votes: 12345, percentage: 2.17 },
      { candidateId: "tumukunde", votes: 9757, percentage: 1.72 },
    ],
  },
  {
    id: "wakiso",
    name: "Wakiso",
    region: "central",
    constituencies: ["entebbe", "busiro-north", "busiro-south", "kyadondo-east", "kyadondo-north", "makindye-ssabagabo", "nansana"],
    totalVotes: 489234,
    registeredVoters: 876543,
    turnout: 55.8,
    presidentialWinner: "kyagulanyi",
    presidentialResults: [
      { candidateId: "kyagulanyi", votes: 264789, percentage: 54.13 },
      { candidateId: "museveni", votes: 176543, percentage: 36.09 },
      { candidateId: "muntu", votes: 29876, percentage: 6.11 },
      { candidateId: "mao", votes: 11234, percentage: 2.30 },
      { candidateId: "tumukunde", votes: 6792, percentage: 1.39 },
    ],
  },
  {
    id: "mukono",
    name: "Mukono",
    region: "central",
    constituencies: ["mukono-north", "mukono-south", "mukono-municipality"],
    totalVotes: 234567,
    registeredVoters: 445678,
    turnout: 52.6,
    presidentialWinner: "kyagulanyi",
    presidentialResults: [
      { candidateId: "kyagulanyi", votes: 117890, percentage: 50.26 },
      { candidateId: "museveni", votes: 98765, percentage: 42.10 },
      { candidateId: "muntu", votes: 11234, percentage: 4.79 },
      { candidateId: "mao", votes: 4567, percentage: 1.95 },
      { candidateId: "tumukunde", votes: 2111, percentage: 0.90 },
    ],
  },
  {
    id: "luwero",
    name: "Luwero",
    region: "central",
    constituencies: ["luwero-county", "katikamu-north", "katikamu-south", "bamunanika"],
    totalVotes: 187654,
    registeredVoters: 345678,
    turnout: 54.3,
    presidentialWinner: "museveni",
    presidentialResults: [
      { candidateId: "museveni", votes: 112345, percentage: 59.87 },
      { candidateId: "kyagulanyi", votes: 56789, percentage: 30.26 },
      { candidateId: "muntu", votes: 12345, percentage: 6.58 },
      { candidateId: "mao", votes: 4567, percentage: 2.43 },
      { candidateId: "tumukunde", votes: 1608, percentage: 0.86 },
    ],
  },
  {
    id: "masaka",
    name: "Masaka",
    region: "central",
    constituencies: ["masaka-municipality", "bukoto-central", "bukoto-east", "bukoto-west"],
    totalVotes: 198765,
    registeredVoters: 356789,
    turnout: 55.7,
    presidentialWinner: "kyagulanyi",
    presidentialResults: [
      { candidateId: "kyagulanyi", votes: 109876, percentage: 55.28 },
      { candidateId: "museveni", votes: 69876, percentage: 35.16 },
      { candidateId: "muntu", votes: 11234, percentage: 5.65 },
      { candidateId: "mao", votes: 5678, percentage: 2.86 },
      { candidateId: "tumukunde", votes: 2101, percentage: 1.06 },
    ],
  },
  // Western Region
  {
    id: "mbarara",
    name: "Mbarara",
    region: "western",
    constituencies: ["mbarara-city-north", "mbarara-city-south", "kashari-north", "kashari-south", "rwampara"],
    totalVotes: 298765,
    registeredVoters: 456789,
    turnout: 65.4,
    presidentialWinner: "museveni",
    presidentialResults: [
      { candidateId: "museveni", votes: 224567, percentage: 75.16 },
      { candidateId: "kyagulanyi", votes: 52345, percentage: 17.52 },
      { candidateId: "muntu", votes: 13456, percentage: 4.50 },
      { candidateId: "mao", votes: 5678, percentage: 1.90 },
      { candidateId: "tumukunde", votes: 2719, percentage: 0.91 },
    ],
  },
  {
    id: "kabale",
    name: "Kabale",
    region: "western",
    constituencies: ["kabale-municipality", "ndorwa-east", "ndorwa-west", "rubanda-east", "rubanda-west"],
    totalVotes: 234567,
    registeredVoters: 378901,
    turnout: 61.9,
    presidentialWinner: "museveni",
    presidentialResults: [
      { candidateId: "museveni", votes: 175678, percentage: 74.89 },
      { candidateId: "kyagulanyi", votes: 42345, percentage: 18.05 },
      { candidateId: "muntu", votes: 10234, percentage: 4.36 },
      { candidateId: "mao", votes: 4567, percentage: 1.95 },
      { candidateId: "tumukunde", votes: 1743, percentage: 0.74 },
    ],
  },
  {
    id: "bushenyi",
    name: "Bushenyi",
    region: "western",
    constituencies: ["bushenyi-ishaka-municipality", "igara-east", "igara-west"],
    totalVotes: 187654,
    registeredVoters: 298765,
    turnout: 62.8,
    presidentialWinner: "museveni",
    presidentialResults: [
      { candidateId: "museveni", votes: 143210, percentage: 76.32 },
      { candidateId: "kyagulanyi", votes: 31234, percentage: 16.64 },
      { candidateId: "muntu", votes: 8765, percentage: 4.67 },
      { candidateId: "mao", votes: 3234, percentage: 1.72 },
      { candidateId: "tumukunde", votes: 1211, percentage: 0.65 },
    ],
  },
  {
    id: "kasese",
    name: "Kasese",
    region: "western",
    constituencies: ["kasese-municipality", "bukonjo-east", "bukonjo-west", "busongora-north", "busongora-south"],
    totalVotes: 267890,
    registeredVoters: 423456,
    turnout: 63.3,
    presidentialWinner: "museveni",
    presidentialResults: [
      { candidateId: "museveni", votes: 167890, percentage: 62.67 },
      { candidateId: "kyagulanyi", votes: 78901, percentage: 29.45 },
      { candidateId: "muntu", votes: 13456, percentage: 5.02 },
      { candidateId: "mao", votes: 5432, percentage: 2.03 },
      { candidateId: "tumukunde", votes: 2211, percentage: 0.83 },
    ],
  },
  // Eastern Region
  {
    id: "jinja",
    name: "Jinja",
    region: "eastern",
    constituencies: ["jinja-city-east", "jinja-city-west", "kagoma-north", "kagoma-south"],
    totalVotes: 234567,
    registeredVoters: 398765,
    turnout: 58.8,
    presidentialWinner: "kyagulanyi",
    presidentialResults: [
      { candidateId: "kyagulanyi", votes: 126789, percentage: 54.05 },
      { candidateId: "museveni", votes: 89765, percentage: 38.27 },
      { candidateId: "muntu", votes: 11234, percentage: 4.79 },
      { candidateId: "mao", votes: 4567, percentage: 1.95 },
      { candidateId: "tumukunde", votes: 2212, percentage: 0.94 },
    ],
  },
  {
    id: "mbale",
    name: "Mbale",
    region: "eastern",
    constituencies: ["mbale-city-industrial", "mbale-city-northern", "bungokho-central", "bungokho-north", "bungokho-south"],
    totalVotes: 287654,
    registeredVoters: 456789,
    turnout: 62.9,
    presidentialWinner: "museveni",
    presidentialResults: [
      { candidateId: "museveni", votes: 152345, percentage: 52.96 },
      { candidateId: "kyagulanyi", votes: 112345, percentage: 39.05 },
      { candidateId: "muntu", votes: 14567, percentage: 5.06 },
      { candidateId: "mao", votes: 5678, percentage: 1.97 },
      { candidateId: "tumukunde", votes: 2719, percentage: 0.95 },
    ],
  },
  {
    id: "soroti",
    name: "Soroti",
    region: "eastern",
    constituencies: ["soroti-city-east", "soroti-city-west", "soroti-county"],
    totalVotes: 176543,
    registeredVoters: 287654,
    turnout: 61.4,
    presidentialWinner: "museveni",
    presidentialResults: [
      { candidateId: "museveni", votes: 98765, percentage: 55.94 },
      { candidateId: "kyagulanyi", votes: 61234, percentage: 34.69 },
      { candidateId: "muntu", votes: 10234, percentage: 5.80 },
      { candidateId: "mao", votes: 4567, percentage: 2.59 },
      { candidateId: "tumukunde", votes: 1743, percentage: 0.99 },
    ],
  },
  {
    id: "tororo",
    name: "Tororo",
    region: "eastern",
    constituencies: ["tororo-municipality", "tororo-north", "tororo-south", "west-budama-north", "west-budama-south"],
    totalVotes: 245678,
    registeredVoters: 398765,
    turnout: 61.6,
    presidentialWinner: "museveni",
    presidentialResults: [
      { candidateId: "museveni", votes: 142345, percentage: 57.94 },
      { candidateId: "kyagulanyi", votes: 82345, percentage: 33.52 },
      { candidateId: "muntu", votes: 13456, percentage: 5.48 },
      { candidateId: "mao", votes: 5432, percentage: 2.21 },
      { candidateId: "tumukunde", votes: 2100, percentage: 0.85 },
    ],
  },
  // Northern Region
  {
    id: "gulu",
    name: "Gulu",
    region: "northern",
    constituencies: ["gulu-city-east", "gulu-city-west", "aswa-county", "omoro-county", "nwoya-county"],
    totalVotes: 298765,
    registeredVoters: 498765,
    turnout: 59.9,
    presidentialWinner: "museveni",
    presidentialResults: [
      { candidateId: "museveni", votes: 178901, percentage: 59.88 },
      { candidateId: "kyagulanyi", votes: 89765, percentage: 30.05 },
      { candidateId: "muntu", votes: 19234, percentage: 6.44 },
      { candidateId: "mao", votes: 7654, percentage: 2.56 },
      { candidateId: "tumukunde", votes: 3211, percentage: 1.07 },
    ],
  },
  {
    id: "lira",
    name: "Lira",
    region: "northern",
    constituencies: ["lira-city-east", "lira-city-west", "erute-north", "erute-south"],
    totalVotes: 267890,
    registeredVoters: 432156,
    turnout: 62.0,
    presidentialWinner: "museveni",
    presidentialResults: [
      { candidateId: "museveni", votes: 165432, percentage: 61.76 },
      { candidateId: "kyagulanyi", votes: 78901, percentage: 29.45 },
      { candidateId: "muntu", votes: 15678, percentage: 5.85 },
      { candidateId: "mao", votes: 5432, percentage: 2.03 },
      { candidateId: "tumukunde", votes: 2447, percentage: 0.91 },
    ],
  },
  {
    id: "arua",
    name: "Arua",
    region: "northern",
    constituencies: ["arua-city-central", "arua-city-east", "arua-city-west", "ayivu-east", "ayivu-west", "terego-north", "terego-east", "terego-west"],
    totalVotes: 345678,
    registeredVoters: 567890,
    turnout: 60.9,
    presidentialWinner: "museveni",
    presidentialResults: [
      { candidateId: "museveni", votes: 198765, percentage: 57.50 },
      { candidateId: "kyagulanyi", votes: 112345, percentage: 32.50 },
      { candidateId: "muntu", votes: 21234, percentage: 6.14 },
      { candidateId: "mao", votes: 8765, percentage: 2.54 },
      { candidateId: "tumukunde", votes: 4569, percentage: 1.32 },
    ],
  },
  {
    id: "kitgum",
    name: "Kitgum",
    region: "northern",
    constituencies: ["kitgum-municipality", "chua-east", "chua-west", "lamwo-county"],
    totalVotes: 187654,
    registeredVoters: 312456,
    turnout: 60.1,
    presidentialWinner: "museveni",
    presidentialResults: [
      { candidateId: "museveni", votes: 112345, percentage: 59.86 },
      { candidateId: "kyagulanyi", votes: 54321, percentage: 28.94 },
      { candidateId: "muntu", votes: 13456, percentage: 7.17 },
      { candidateId: "mao", votes: 5432, percentage: 2.89 },
      { candidateId: "tumukunde", votes: 2100, percentage: 1.12 },
    ],
  },
];

// Sample MP/Constituency Results
export const constituencyResults: ConstituencyResult[] = [
  {
    id: "kampala-central",
    name: "Kampala Central",
    district: "kampala",
    region: "central",
    registeredVoters: 98765,
    totalVotes: 56789,
    turnout: 57.5,
    winner: {
      name: "Muhammad Nsereko",
      party: "IND",
      partyColor: partyColors.IND,
      votes: 25678,
      percentage: 45.21,
    },
    candidates: [
      { name: "Muhammad Nsereko", party: "IND", partyColor: partyColors.IND, votes: 25678, percentage: 45.21 },
      { name: "Charles Musoke", party: "NUP", partyColor: partyColors.NUP, votes: 18765, percentage: 33.04 },
      { name: "James Okello", party: "NRM", partyColor: partyColors.NRM, votes: 8765, percentage: 15.43 },
      { name: "Others", party: "IND", partyColor: partyColors.IND, votes: 3581, percentage: 6.31 },
    ],
    presidentialResults: [
      { candidateId: "kyagulanyi", votes: 32456, percentage: 57.15 },
      { candidateId: "museveni", votes: 18765, percentage: 33.04 },
      { candidateId: "muntu", votes: 3456, percentage: 6.09 },
      { candidateId: "mao", votes: 1234, percentage: 2.17 },
      { candidateId: "tumukunde", votes: 878, percentage: 1.55 },
    ],
  },
  {
    id: "rubaga-north",
    name: "Rubaga North",
    district: "kampala",
    region: "central",
    registeredVoters: 112345,
    totalVotes: 67890,
    turnout: 60.4,
    winner: {
      name: "Moses Kasibante",
      party: "NUP",
      partyColor: partyColors.NUP,
      votes: 34567,
      percentage: 50.91,
    },
    candidates: [
      { name: "Moses Kasibante", party: "NUP", partyColor: partyColors.NUP, votes: 34567, percentage: 50.91 },
      { name: "Sarah Nalule", party: "NRM", partyColor: partyColors.NRM, votes: 21234, percentage: 31.28 },
      { name: "David Ssemwanga", party: "FDC", partyColor: partyColors.FDC, votes: 8765, percentage: 12.91 },
      { name: "Others", party: "IND", partyColor: partyColors.IND, votes: 3324, percentage: 4.90 },
    ],
    presidentialResults: [
      { candidateId: "kyagulanyi", votes: 38901, percentage: 57.30 },
      { candidateId: "museveni", votes: 21234, percentage: 31.28 },
      { candidateId: "muntu", votes: 4567, percentage: 6.73 },
      { candidateId: "mao", votes: 2234, percentage: 3.29 },
      { candidateId: "tumukunde", votes: 954, percentage: 1.41 },
    ],
  },
  {
    id: "mbarara-city-north",
    name: "Mbarara City North",
    district: "mbarara",
    region: "western",
    registeredVoters: 89765,
    totalVotes: 58901,
    turnout: 65.6,
    winner: {
      name: "Jackson Byarugaba",
      party: "NRM",
      partyColor: partyColors.NRM,
      votes: 38765,
      percentage: 65.81,
    },
    candidates: [
      { name: "Jackson Byarugaba", party: "NRM", partyColor: partyColors.NRM, votes: 38765, percentage: 65.81 },
      { name: "Grace Tumwebaze", party: "NUP", partyColor: partyColors.NUP, votes: 12345, percentage: 20.96 },
      { name: "Others", party: "IND", partyColor: partyColors.IND, votes: 7791, percentage: 13.23 },
    ],
    presidentialResults: [
      { candidateId: "museveni", votes: 43210, percentage: 73.36 },
      { candidateId: "kyagulanyi", votes: 11234, percentage: 19.07 },
      { candidateId: "muntu", votes: 2765, percentage: 4.69 },
      { candidateId: "mao", votes: 1234, percentage: 2.09 },
      { candidateId: "tumukunde", votes: 458, percentage: 0.78 },
    ],
  },
  {
    id: "gulu-city-east",
    name: "Gulu City East",
    district: "gulu",
    region: "northern",
    registeredVoters: 78901,
    totalVotes: 47234,
    turnout: 59.9,
    winner: {
      name: "Charles Onen",
      party: "NRM",
      partyColor: partyColors.NRM,
      votes: 24567,
      percentage: 52.02,
    },
    candidates: [
      { name: "Charles Onen", party: "NRM", partyColor: partyColors.NRM, votes: 24567, percentage: 52.02 },
      { name: "Lucy Akello", party: "FDC", partyColor: partyColors.FDC, votes: 14567, percentage: 30.84 },
      { name: "Patrick Odong", party: "NUP", partyColor: partyColors.NUP, votes: 5678, percentage: 12.02 },
      { name: "Others", party: "IND", partyColor: partyColors.IND, votes: 2422, percentage: 5.13 },
    ],
    presidentialResults: [
      { candidateId: "museveni", votes: 27890, percentage: 59.05 },
      { candidateId: "kyagulanyi", votes: 13456, percentage: 28.49 },
      { candidateId: "muntu", votes: 3765, percentage: 7.97 },
      { candidateId: "mao", votes: 1456, percentage: 3.08 },
      { candidateId: "tumukunde", votes: 667, percentage: 1.41 },
    ],
  },
  {
    id: "jinja-city-east",
    name: "Jinja City East",
    district: "jinja",
    region: "eastern",
    registeredVoters: 87654,
    totalVotes: 52345,
    turnout: 59.7,
    winner: {
      name: "Paul Mwiru",
      party: "FDC",
      partyColor: partyColors.FDC,
      votes: 26789,
      percentage: 51.18,
    },
    candidates: [
      { name: "Paul Mwiru", party: "FDC", partyColor: partyColors.FDC, votes: 26789, percentage: 51.18 },
      { name: "Samuel Kigundu", party: "NRM", partyColor: partyColors.NRM, votes: 18765, percentage: 35.85 },
      { name: "Mary Nabirye", party: "NUP", partyColor: partyColors.NUP, votes: 4567, percentage: 8.72 },
      { name: "Others", party: "IND", partyColor: partyColors.IND, votes: 2224, percentage: 4.25 },
    ],
    presidentialResults: [
      { candidateId: "kyagulanyi", votes: 28901, percentage: 55.22 },
      { candidateId: "museveni", votes: 18765, percentage: 35.85 },
      { candidateId: "muntu", votes: 2876, percentage: 5.49 },
      { candidateId: "mao", votes: 1234, percentage: 2.36 },
      { candidateId: "tumukunde", votes: 569, percentage: 1.09 },
    ],
  },
];

// Parliamentary seats summary by party
export const parliamentarySummary = {
  totalSeats: 529,
  parties: [
    { party: "NRM", name: "National Resistance Movement", seats: 316, color: partyColors.NRM },
    { party: "NUP", name: "National Unity Platform", seats: 57, color: partyColors.NUP },
    { party: "FDC", name: "Forum for Democratic Change", seats: 32, color: partyColors.FDC },
    { party: "DP", name: "Democratic Party", seats: 9, color: partyColors.DP },
    { party: "UPC", name: "Uganda People's Congress", seats: 9, color: partyColors.UPC },
    { party: "IND", name: "Independents", seats: 74, color: partyColors.IND },
    { party: "OTHERS", name: "Other Parties", seats: 32, color: "#94A3B8" },
  ],
};

// Get winner for a region
export function getRegionWinner(regionId: string): string {
  const regionDistricts = districts.filter(d => d.region === regionId);
  const totals: Record<string, number> = {};
  
  regionDistricts.forEach(district => {
    district.presidentialResults.forEach(result => {
      totals[result.candidateId] = (totals[result.candidateId] || 0) + result.votes;
    });
  });
  
  let maxVotes = 0;
  let winner = "";
  Object.entries(totals).forEach(([candidateId, votes]) => {
    if (votes > maxVotes) {
      maxVotes = votes;
      winner = candidateId;
    }
  });
  
  return winner;
}

// Get candidate by ID
export function getCandidateById(id: string): Candidate | undefined {
  return presidentialCandidates.find(c => c.id === id);
}

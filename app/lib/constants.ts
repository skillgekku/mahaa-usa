// Updated constants.ts - Extended Conference Organizations

import { ChannelConfig, YouTubeVideo, ScheduleDay } from './types';

// TANA Conference Playlist
export const TANA_PLAYLIST: YouTubeVideo[] = [
  {
    id: 'tana-24th-conference',
    title: 'TANA 24th Conference - Opening Ceremony',
    description: 'Telugu Association of North America 24th Annual Conference - Grand Opening',
    youtubeId: 'Izd-SLokbPY',
    duration: '2:45:30',
    category: 'Opening Ceremony',
    scheduledTime: '09:00'
  },
  {
    id: 'tana-cultural-program',
    title: 'TANA Cultural Night',
    description: 'Spectacular cultural performances showcasing Telugu heritage',
    youtubeId: 'kS9L0lz0EWM',
    duration: '3:20:15',
    category: 'Cultural',
    scheduledTime: '19:00'
  },
  {
    id: 'tana-youth-conference-2025',
    title: 'TANA Youth Conference 2025',
    description: 'Young Telugu professionals gathering, networking and leadership sessions',
    youtubeId: 'kS9L0lz0EWM',
    duration: '1:30:45',
    category: 'Youth Event',
    scheduledTime: '14:00'
  },
  {
    id: 'tana-business-summit',
    title: 'TANA Business & Entrepreneurs Summit',
    description: 'Business networking and entrepreneurship discussions with Telugu business leaders',
    youtubeId: 'Izd-SLokbPY',
    duration: '2:15:20',
    category: 'Business',
    scheduledTime: '11:00'
  }
];

// NATS Conference Playlist
export const NATS_PLAYLIST: YouTubeVideo[] = [
  {
    id: 'nats-8th-conference',
    title: 'NATS 8th Annual Conference',
    description: 'North American Telugu Society 8th annual conference highlights and cultural programs',
    youtubeId: 'UTArkqpGGCw',
    duration: '2:00:30',
    category: 'Conference',
    scheduledTime: '10:00'
  },
  {
    id: 'nats-cultural-showcase',
    title: 'NATS Cultural Showcase',
    description: 'Traditional Telugu arts and cultural performances',
    youtubeId: 'UTArkqpGGCw',
    duration: '2:30:15',
    category: 'Cultural',
    scheduledTime: '18:00'
  },
  {
    id: 'nats-community-awards',
    title: 'NATS Community Excellence Awards',
    description: 'Recognizing outstanding contributions to Telugu community development',
    youtubeId: 'tq6kVYunCTk',
    duration: '1:45:30',
    category: 'Awards',
    scheduledTime: '20:00'
  }
];

// Telangana Association Playlist
export const TELANGANA_PLAYLIST: YouTubeVideo[] = [
  {
    id: 'ktr-dallas',
    title: 'KTR in Dallas - Community Meet',
    description: 'KT Rama Rao visit to Dallas - Political discussions and community interaction',
    youtubeId: 'wf8tDgoCuX4',
    duration: '2:15:20',
    category: 'Political',
    scheduledTime: '15:00'
  },
  {
    id: 'telangana-diaspora-meet',
    title: 'Telangana Diaspora Leadership Summit',
    description: 'Global Telugu leadership summit and policy discussions',
    youtubeId: 'wf8tDgoCuX4',
    duration: '1:50:45',
    category: 'Political',
    scheduledTime: '17:30'
  },
  {
    id: 'telangana-formation-day',
    title: 'Telangana Formation Day Celebrations',
    description: 'Celebrating Telangana statehood with cultural programs and community events',
    youtubeId: 'UTArkqpGGCw',
    duration: '2:30:00',
    category: 'Cultural',
    scheduledTime: '18:00'
  }
];

// American Telugu Association Playlist
export const ATA_PLAYLIST: YouTubeVideo[] = [
  {
    id: 'ata-annual-convention',
    title: 'ATA Annual Convention Highlights',
    description: 'American Telugu Association annual convention with cultural and social programs',
    youtubeId: 'kS9L0lz0EWM',
    duration: '2:00:45',
    category: 'Convention',
    scheduledTime: '16:00'
  },
  {
    id: 'ata-youth-leadership',
    title: 'ATA Youth Leadership Program',
    description: 'Empowering next generation Telugu-American leaders',
    youtubeId: 'InVguI9nIW4',
    duration: '1:25:30',
    category: 'Youth Event',
    scheduledTime: '14:30'
  },
  {
    id: 'ata-community-service',
    title: 'ATA Community Service Awards',
    description: 'Recognizing outstanding community service by Telugu Americans',
    youtubeId: 'tq6kVYunCTk',
    duration: '1:40:15',
    category: 'Awards',
    scheduledTime: '19:30'
  }
];

// AAA (Association of Andhra Americans) Playlist
export const AAA_PLAYLIST: YouTubeVideo[] = [
  {
    id: 'aaa-medical-conference',
    title: 'AAA Medical Professionals Conference',
    description: 'Association of Andhra Americans medical professionals summit',
    youtubeId: '3erbr7GN3UI',
    duration: '2:20:30',
    category: 'Professional',
    scheduledTime: '10:30'
  },
  {
    id: 'aaa-educational-summit',
    title: 'AAA Educational Excellence Summit',
    description: 'Focus on education and academic achievements in Telugu community',
    youtubeId: '-A_xRPsKSWg',
    duration: '1:55:45',
    category: 'Education',
    scheduledTime: '13:00'
  },
  {
    id: 'aaa-cultural-night',
    title: 'AAA Cultural Night Extravaganza',
    description: 'Grand cultural performances celebrating Andhra heritage',
    youtubeId: 'InVguI9nIW4',
    duration: '3:10:20',
    category: 'Cultural',
    scheduledTime: '19:00'
  }
];

// Mahaa ICON Exclusive Interviews Playlist
export const MAHAA_ICON_PLAYLIST: YouTubeVideo[] = [
  {
    id: 'mahaa-icon-awards-main',
    title: 'Mahaa ICON Awards 2025 - Complete Ceremony',
    description: 'Celebrating excellence in Telugu entertainment and community service',
    youtubeId: 'tq6kVYunCTk',
    duration: '3:20:15',
    category: 'Awards Ceremony',
    scheduledTime: '19:30'
  },
  {
    id: 'rana-daggubati-exclusive',
    title: 'Rana Daggubati - Exclusive Interview',
    description: 'Popular Telugu actor Rana Daggubati in exclusive interview about his journey',
    youtubeId: '-A_xRPsKSWg',
    duration: '1:20:45',
    category: 'Celebrity Interview',
    scheduledTime: '21:00'
  },
  {
    id: 'manchu-vishnu-kannappa',
    title: 'Manchu Vishnu - Kannappa Movie Special',
    description: 'Actor Manchu Vishnu discusses his upcoming mythological film Kannappa',
    youtubeId: '3erbr7GN3UI',
    duration: '1:45:30',
    category: 'Movie Promotion',
    scheduledTime: '16:00'
  },
  {
    id: 'miss-telugu-usa-winner',
    title: 'Miss Telugu USA 2025 - Winner Interview',
    description: 'Exclusive interview with Miss Telugu USA 2025 winner about her journey',
    youtubeId: 'InVguI9nIW4',
    duration: '45:20',
    category: 'Beauty Pageant',
    scheduledTime: '20:15'
  },
  {
    id: 'telugu-entrepreneurs-special',
    title: 'Telugu Entrepreneurs in America - Success Stories',
    description: 'Inspiring stories of successful Telugu business leaders in America',
    youtubeId: 'wf8tDgoCuX4',
    duration: '2:10:30',
    category: 'Business Interview',
    scheduledTime: '15:30'
  }
];

// Entertainment Events Playlist (Updated)
export const ENTERTAINMENT_PLAYLIST: YouTubeVideo[] = [
  {
    id: 'miss-telugu-usa-2025',
    title: 'Miss Telugu USA 2025 Pageant',
    description: 'Beauty pageant celebrating Telugu culture and heritage in America',
    youtubeId: 'InVguI9nIW4',
    duration: '2:30:15',
    category: 'Pageant',
    scheduledTime: '19:00'
  },
  {
    id: 'tollywood-night-usa',
    title: 'Tollywood Night in USA',
    description: 'Star-studded evening with Telugu cinema celebrities',
    youtubeId: '3erbr7GN3UI',
    duration: '3:15:45',
    category: 'Entertainment',
    scheduledTime: '20:00'
  },
  {
    id: 'telugu-music-festival',
    title: 'Telugu Music Festival - USA',
    description: 'Celebrating Telugu music with renowned artists and singers',
    youtubeId: 'kS9L0lz0EWM',
    duration: '2:45:30',
    category: 'Music Festival',
    scheduledTime: '18:30'
  },
  {
    id: 'comedy-night-telugu',
    title: 'Telugu Comedy Night Special',
    description: 'Hilarious comedy performances by Telugu comedians',
    youtubeId: '-A_xRPsKSWg',
    duration: '1:35:20',
    category: 'Comedy',
    scheduledTime: '21:30'
  }
];

// Updated channel configurations for conferences
export const CONFERENCES: ChannelConfig[] = [
  {
    id: 'tana-conference',
    name: 'TANA',
    description: 'Telugu Association of North America',
    color: 'blue',
    bgGradient: 'from-blue-600 to-blue-800',
    icon: '🏛️',
    isYoutube: true,
    youtubeVideoId: 'Izd-SLokbPY',
    youtubePlaylist: TANA_PLAYLIST
  },
  {
    id: 'nats-conference',
    name: 'NATS',
    description: 'North American Telugu Society',
    color: 'green',
    bgGradient: 'from-green-600 to-green-800',
    icon: '🌟',
    isYoutube: true,
    youtubeVideoId: 'UTArkqpGGCw',
    youtubePlaylist: NATS_PLAYLIST
  },
  {
    id: 'telangana-association',
    name: 'Telangana Association',
    description: 'My Telangana - US Chapter',
    color: 'pink',
    bgGradient: 'from-pink-600 to-pink-800',
    icon: '🏛️',
    isYoutube: true,
    youtubeVideoId: 'wf8tDgoCuX4',
    youtubePlaylist: TELANGANA_PLAYLIST
  },
  {
    id: 'ata-association',
    name: 'ATA',
    description: 'American Telugu Association',
    color: 'indigo',
    bgGradient: 'from-indigo-600 to-indigo-800',
    icon: '🇺🇸',
    isYoutube: true,
    youtubeVideoId: 'kS9L0lz0EWM',
    youtubePlaylist: ATA_PLAYLIST
  },
  {
    id: 'aaa-association',
    name: 'AAA',
    description: 'Association of Andhra Americans',
    color: 'teal',
    bgGradient: 'from-teal-600 to-teal-800',
    icon: '🎓',
    isYoutube: true,
    youtubeVideoId: '3erbr7GN3UI',
    youtubePlaylist: AAA_PLAYLIST
  },
  {
    id: 'mahaa-icon-exclusive',
    name: 'Mahaa ICON Exclusive',
    description: 'Exclusive Interviews & Special Content',
    color: 'amber',
    bgGradient: 'from-amber-600 to-amber-800',
    icon: '⭐',
    isYoutube: true,
    youtubeVideoId: 'tq6kVYunCTk',
    youtubePlaylist: MAHAA_ICON_PLAYLIST
  },
  {
    id: 'entertainment-events',
    name: 'Entertainment',
    description: 'Movies, Music & Cultural Shows',
    color: 'purple',
    bgGradient: 'from-purple-600 to-purple-800',
    icon: '🎬',
    isYoutube: true,
    youtubeVideoId: 'InVguI9nIW4',
    youtubePlaylist: ENTERTAINMENT_PLAYLIST
  }
];

// Main Mahaa News Channel (kept as primary)
export const MAHAA_NEWS_CHANNEL: ChannelConfig = {
  id: 'mahaa-news',
  name: 'Mahaa News',
  description: '24×7 Telugu News Channel',
  color: 'red',
  bgGradient: 'from-red-600 to-red-800',
  icon: '📺',
  streamUrl: 'https://distro.legitpro.co.in/mahaanews/index.m3u8'
};

// Legacy export for backward compatibility (using original playlist data)
export const MAHAA_USA_PLAYLIST: YouTubeVideo[] = [
  {
    id: 'nats-8th-conference',
    title: 'NATS 8th Conference',
    description: 'North American Telugu Society 8th annual conference highlights and cultural programs',
    youtubeId: 'UTArkqpGGCw',
    duration: '2:00:30',
    category: 'Conference',
    scheduledTime: '06:00'
  },
  {
    id: 'tana-24th-conference',
    title: 'TANA 24th Conference',
    description: 'Telugu Association of North America 24th Annual Conference - Complete coverage',
    youtubeId: 'Izd-SLokbPY',
    duration: '2:45:30',
    category: 'Conference',
    scheduledTime: '09:00'
  },
  {
    id: 'tana-youth-conference-2025',
    title: 'TANA Youth Conference 2025',
    description: 'Young Telugu professionals gathering, networking event and cultural programs',
    youtubeId: 'kS9L0lz0EWM',
    duration: '1:30:45',
    category: 'Youth Event',
    scheduledTime: '11:45'
  },
  {
    id: 'ktr-dallas',
    title: 'KTR in Dallas',
    description: 'KT Rama Rao visit to Dallas - Political discussions and community interaction',
    youtubeId: 'wf8tDgoCuX4',
    duration: '2:15:20',
    category: 'Political',
    scheduledTime: '14:00'
  },
  {
    id: 'mahaa-icon',
    title: 'Mahaa ICON',
    description: 'Annual awards recognizing excellence in Telugu cinema and arts',
    youtubeId: 'tq6kVYunCTk',
    duration: '3:20:15',
    category: 'Awards',
    scheduledTime: '16:30'
  },
  {
    id: 'miss-telugu-usa-2025',
    title: 'Miss Telugu USA 2025',
    description: 'Beauty pageant celebrating Telugu culture and heritage in America',
    youtubeId: 'InVguI9nIW4',
    duration: '2:30:15',
    category: 'Pageant',
    scheduledTime: '19:00'
  },
  {
    id: 'kannappa-manchu-vishnu',
    title: 'Kannappa - Manchu Vishnu in USA',
    description: 'Actor Manchu Vishnu promotes his upcoming mythological film Kannappa',
    youtubeId: '3erbr7GN3UI',
    duration: '1:45:30',
    category: 'Entertainment',
    scheduledTime: '20:00'
  },
  {
    id: 'rana-daggubati-loca-loka',
    title: 'Rana Daggubati - Loca Loka',
    description: 'Popular Telugu actor Rana Daggubati in exclusive interview and interaction',
    youtubeId: '-A_xRPsKSWg',
    duration: '1:20:45',
    category: 'Interview',
    scheduledTime: '22:00'
  }
];

// Legacy CHANNELS export (kept for backward compatibility but not used in new app)
export const CHANNELS: ChannelConfig[] = [
  MAHAA_NEWS_CHANNEL,
  {
    id: 'mahaa-usa',
    name: 'Mahaa USA',
    description: 'US Telugu Content',
    color: 'red',
    bgGradient: 'from-red-600 to-red-800',
    icon: '📺',
    isYoutube: true,
    youtubeVideoId: 'Izd-SLokbPY',
    youtubePlaylist: MAHAA_USA_PLAYLIST
  }
];

export const THEME_CLASSES = {
  light: {
    body: "bg-gradient-to-br from-gray-50 via-white to-gray-100",
    header: "bg-gradient-to-r from-red-500 to-red-700",
    card: "bg-white border-gray-200 hover:border-gray-300 shadow-lg",
    title: "text-gray-900",
    subtitle: "text-gray-600",
    description: "text-gray-500",
    footer: "bg-gray-900 text-gray-300 border-gray-700"
  },
  dark: {
    body: "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
    header: "bg-gradient-to-r from-red-600 to-red-800",
    card: "bg-gray-800 border-gray-700 hover:border-gray-600",
    title: "text-white",
    subtitle: "text-gray-300",
    description: "text-gray-400",
    footer: "bg-black text-gray-400 border-gray-800"
  }
};

// News schedule data (simplified)
export const NEWS_SCHEDULE_DATA: ScheduleDay[] = [
  {
    day: 'Today',
    date: 'Today_Placeholder',
    programs: [
      { time: '06:00', title: 'Morning Headlines', genre: 'Breaking News', duration: '60 min', rating: 4.8, isLive: false },
      { time: '07:00', title: 'News Breakfast', genre: 'News', duration: '90 min', rating: 4.5, isLive: false },
      { time: '08:30', title: 'Political Roundtable', genre: 'Politics', duration: '60 min', rating: 4.3, isLive: false },
      { time: '09:30', title: 'Business Today', genre: 'Business', duration: '30 min', rating: 4.1, isLive: false },
      { time: '10:00', title: 'Live Press Conference', genre: 'Live Event', duration: '60 min', rating: 4.6, isLive: true },
      { time: '11:00', title: 'Regional Updates', genre: 'Regional', duration: '30 min', rating: 4.2, isLive: false },
      { time: '12:30', title: 'Noon Bulletin', genre: 'News', duration: '30 min', rating: 4.4, isLive: false },
      { time: '14:00', title: 'Health Report', genre: 'Health', duration: '30 min', rating: 4.2, isLive: false },
      { time: '16:00', title: 'Evening News', genre: 'News', duration: '60 min', rating: 4.6, isLive: false },
      { time: '17:00', title: 'Prime Time Debate', genre: 'Debate', duration: '90 min', rating: 4.8, isLive: false },
      { time: '20:00', title: 'Night News', genre: 'News', duration: '60 min', rating: 4.9, isLive: false },
      { time: '21:00', title: 'Late Night Analysis', genre: 'Analysis', duration: '90 min', rating: 4.4, isLive: false }
    ]
  },
  {
    day: 'Tomorrow',
    date: 'Tomorrow_Placeholder',
    programs: [
      { time: '06:00', title: 'Weekend Morning News', genre: 'News', duration: '120 min', rating: 4.5, isLive: false },
      { time: '08:00', title: 'Week in Review', genre: 'Review', duration: '60 min', rating: 4.3, isLive: false },
      { time: '09:00', title: 'Special Report', genre: 'Documentary', duration: '90 min', rating: 4.6, isLive: false },
      { time: '10:30', title: 'Interview Series', genre: 'Interview', duration: '60 min', rating: 4.4, isLive: false },
      { time: '11:30', title: 'Global Update', genre: 'International', duration: '30 min', rating: 4.1, isLive: false },
      { time: '12:00', title: 'Technology News', genre: 'Technology', duration: '60 min', rating: 4.2, isLive: false }
    ]
  }
];
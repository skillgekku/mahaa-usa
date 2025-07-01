// Updated constants.ts - Conference-focused channels

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
    description: 'Business networking and entrepreneurship discussions',
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
    description: 'Recognizing outstanding contributions to Telugu community',
    youtubeId: 'tq6kVYunCTk',
    duration: '1:45:30',
    category: 'Awards',
    scheduledTime: '20:00'
  }
];

// Political Events Playlist
export const POLITICAL_PLAYLIST: YouTubeVideo[] = [
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
    title: 'Telangana Diaspora Leadership Meet',
    description: 'Global Telugu leadership summit and policy discussions',
    youtubeId: 'wf8tDgoCuX4',
    duration: '1:50:45',
    category: 'Political',
    scheduledTime: '17:30'
  }
];

// Entertainment Events Playlist
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
    id: 'kannappa-manchu-vishnu',
    title: 'Kannappa Movie Promotion - Manchu Vishnu',
    description: 'Actor Manchu Vishnu promotes his upcoming mythological film Kannappa',
    youtubeId: '3erbr7GN3UI',
    duration: '1:45:30',
    category: 'Entertainment',
    scheduledTime: '16:00'
  },
  {
    id: 'rana-daggubati-loca-loka',
    title: 'Rana Daggubati Exclusive Interview',
    description: 'Popular Telugu actor Rana Daggubati in exclusive interview and interaction',
    youtubeId: '-A_xRPsKSWg',
    duration: '1:20:45',
    category: 'Interview',
    scheduledTime: '21:00'
  },
  {
    id: 'mahaa-icon-awards',
    title: 'Mahaa ICON Awards Ceremony',
    description: 'Annual awards recognizing excellence in Telugu cinema and arts',
    youtubeId: 'tq6kVYunCTk',
    duration: '3:20:15',
    category: 'Awards',
    scheduledTime: '20:30'
  }
];

// Awards & Recognition Playlist
export const AWARDS_PLAYLIST: YouTubeVideo[] = [
  {
    id: 'mahaa-icon-main',
    title: 'Mahaa ICON Awards 2025',
    description: 'Celebrating excellence in Telugu entertainment and community service',
    youtubeId: 'tq6kVYunCTk',
    duration: '3:20:15',
    category: 'Awards',
    scheduledTime: '19:30'
  },
  {
    id: 'community-excellence-awards',
    title: 'Telugu Community Excellence Awards',
    description: 'Honoring outstanding achievements in North American Telugu community',
    youtubeId: 'InVguI9nIW4',
    duration: '2:10:30',
    category: 'Awards',
    scheduledTime: '18:00'
  }
];

// Updated channel configurations for conferences
export const CONFERENCES: ChannelConfig[] = [
  {
    id: 'tana-conference',
    name: 'TANA Conference',
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
    name: 'NATS Conference',
    description: 'North American Telugu Society',
    color: 'green',
    bgGradient: 'from-green-600 to-green-800',
    icon: '🌟',
    isYoutube: true,
    youtubeVideoId: 'UTArkqpGGCw',
    youtubePlaylist: NATS_PLAYLIST
  },
  {
    id: 'political-events',
    name: 'Political Events',
    description: 'Political Discussions & Meetings',
    color: 'red',
    bgGradient: 'from-red-600 to-red-800',
    icon: '🏛️',
    isYoutube: true,
    youtubeVideoId: 'wf8tDgoCuX4',
    youtubePlaylist: POLITICAL_PLAYLIST
  },
  {
    id: 'entertainment-events',
    name: 'Entertainment',
    description: 'Movies, Interviews & Shows',
    color: 'purple',
    bgGradient: 'from-purple-600 to-purple-800',
    icon: '🎬',
    isYoutube: true,
    youtubeVideoId: 'InVguI9nIW4',
    youtubePlaylist: ENTERTAINMENT_PLAYLIST
  },
  {
    id: 'awards-ceremonies',
    name: 'Awards & Recognition',
    description: 'Award Ceremonies & Recognition Events',
    color: 'yellow',
    bgGradient: 'from-yellow-600 to-yellow-800',
    icon: '🏆',
    isYoutube: true,
    youtubeVideoId: 'tq6kVYunCTk',
    youtubePlaylist: AWARDS_PLAYLIST
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
export type AppScreen =
  | 'landing'
  | 'event'
  | 'archive'
  | 'qr'
  | 'album'
  | 'dashboard';

export type LanguageMode = 'hinglish' | 'en' | 'hi';

export type CeremonyType =
  | 'Haldi'
  | 'Mehendi'
  | 'Sangeet'
  | 'Pheras'
  | 'Vidaai'
  | 'Reception'
  | 'Roka'
  | 'Griha Pravesh'
  | 'Naamkaran';

export interface ScheduleItem {
  id: string;
  ceremony: CeremonyType;
  time: string;
  dateLabel: string;
  venueNote: string;
  iconKind: 'ceremony' | 'arrival' | 'feast' | 'music' | 'fire' | 'blessing';
}

export interface CeremonyChapter {
  id: string;
  ceremony: CeremonyType;
  title: string;
  duration: string;
  timestampLabel: string;
  description: string;
  thumbnail: string;
  highlightQuote: string;
}

export interface BlessingWish {
  id: string;
  eventId: string;
  author: string;
  relation: string;
  city: string;
  message: string;
  createdAt: string;
  ceremonyTag?: CeremonyType;
}

export interface GuestbookEntry {
  id: string;
  eventId: string;
  familyName: string;
  city: string;
  attendingFrom: 'Remote' | 'In Person';
  note: string;
  signedAt: string;
}

export interface WeddingEvent {
  id: string;
  code: string;
  coupleNames: string;
  brideName: string;
  groomName: string;
  city: string;
  venue: string;
  monthLabel: string;
  yearLabel: string;
  highlightedDays: number[];
  dateFormatted: string;
  status: 'live' | 'upcoming' | 'archived';
  activeCeremony: CeremonyType;
  viewerCount: number;
  streamUrlPlaceholder: string;
  youtubeEmbedIdPlaceholder?: string;
  storyNote: string;
  schedule: ScheduleItem[];
  chapters: CeremonyChapter[];
}

export type StorageProviderId = 'google-drive' | 'dropbox' | 'local';

export interface AlbumPhoto {
  id: string;
  src: string;
  caption: string;
  ceremony: CeremonyType;
  source: StorageProviderId;
  dateTaken: string;
}

export interface AlbumSpread {
  id: string;
  kind: 'cover' | 'dedication' | 'spread';
  title: string;
  subtitle?: string;
  dedicationText?: string;
  leftPhoto?: AlbumPhoto;
  rightPhoto?: AlbumPhoto;
  pageNumbers: [number, number];
}

export interface PricingPlan {
  id: 'self-storage' | 'we-store-it';
  name: string;
  hindiTag: string;
  tagline: string;
  oneTimePrice?: string;
  monthlyPrice?: string;
  yearlyPrice?: string;
  billingModel: 'one-time' | 'recurring';
  included: string[];
  recommended?: boolean;
}

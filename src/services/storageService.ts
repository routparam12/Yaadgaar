import { AlbumPhoto, StorageProviderId } from '../types/yaadgaar';
import { ASSET_IMAGES } from './streamService';

export interface CloudFolderOption {
  provider: StorageProviderId;
  providerLabel: string;
  folderName: string;
  photoCount: number;
  connected: boolean;
}

const INITIAL_ALBUM_PHOTOS: AlbumPhoto[] = [
  {
    id: 'ph-1',
    src: ASSET_IMAGES.haldi,
    caption: 'Haldi morning laughter in Surya Courtyard — turmeric, marigolds, and Dadi Maa’s dholki.',
    ceremony: 'Haldi',
    source: 'google-drive',
    dateTaken: 'Nov 22, 2026 · 10:15 AM',
  },
  {
    id: 'ph-2',
    src: ASSET_IMAGES.mehendi,
    caption: 'Green glass bangles and intricate bridal henna glistening before sunset.',
    ceremony: 'Mehendi',
    source: 'google-drive',
    dateTaken: 'Nov 22, 2026 · 04:10 PM',
  },
  {
    id: 'ph-3',
    src: ASSET_IMAGES.sangeet,
    caption: 'Brass lanterns lit above Darbar Lawn as both families danced together.',
    ceremony: 'Sangeet',
    source: 'dropbox',
    dateTaken: 'Nov 22, 2026 · 08:40 PM',
  },
  {
    id: 'ph-4',
    src: ASSET_IMAGES.pheras,
    caption: 'Seven sacred vows around the havan fire, bound by the saffron-red gathbandhan.',
    ceremony: 'Pheras',
    source: 'google-drive',
    dateTaken: 'Nov 23, 2026 · 11:45 AM',
  },
  {
    id: 'ph-5',
    src: ASSET_IMAGES.mandapCouple,
    caption: 'Under the marigold mandap — Nayana & Aarav smiling toward everyone watching from afar.',
    ceremony: 'Vidaai',
    source: 'google-drive',
    dateTaken: 'Nov 23, 2026 · 01:30 PM',
  },
  {
    id: 'ph-6',
    src: ASSET_IMAGES.sangeet,
    caption: 'Evening reception toast shared with relatives joining live across six time zones.',
    ceremony: 'Reception',
    source: 'dropbox',
    dateTaken: 'Nov 23, 2026 · 08:15 PM',
  },
];

const EXTRA_CLOUD_BATCH: Record<'google-drive' | 'dropbox', AlbumPhoto[]> = {
  'google-drive': [
    {
      id: 'ph-gd-1',
      src: ASSET_IMAGES.haldi,
      caption: 'Imported from Google Drive · Cousins tossing marigold petals over the brass urli.',
      ceremony: 'Haldi',
      source: 'google-drive',
      dateTaken: 'Nov 22, 2026 · 10:42 AM',
    },
    {
      id: 'ph-gd-2',
      src: ASSET_IMAGES.pheras,
      caption: 'Imported from Google Drive · Close-up of the sacred gathbandhan knot and altar flowers.',
      ceremony: 'Pheras',
      source: 'google-drive',
      dateTaken: 'Nov 23, 2026 · 12:05 PM',
    },
  ],
  dropbox: [
    {
      id: 'ph-db-1',
      src: ASSET_IMAGES.mehendi,
      caption: 'Imported from Dropbox · Bridal hands holding jasmine buds at Champa Verandah.',
      ceremony: 'Mehendi',
      source: 'dropbox',
      dateTaken: 'Nov 22, 2026 · 04:45 PM',
    },
    {
      id: 'ph-db-2',
      src: ASSET_IMAGES.mandapCouple,
      caption: 'Imported from Dropbox · First portrait together after the varmala exchange.',
      ceremony: 'Reception',
      source: 'dropbox',
      dateTaken: 'Nov 23, 2026 · 02:10 PM',
    },
  ],
};

class StorageService {
  private connectedProviders: Set<StorageProviderId> = new Set(['google-drive']);

  getCloudFolders(): CloudFolderOption[] {
    return [
      {
        provider: 'google-drive',
        providerLabel: 'Google Drive',
        folderName: '/Shaadi-2026/Nayana-Aarav-Raw',
        photoCount: 148,
        connected: this.connectedProviders.has('google-drive'),
      },
      {
        provider: 'dropbox',
        providerLabel: 'Dropbox',
        folderName: '/Family-Uploads/Udaipur-Mandap',
        photoCount: 92,
        connected: this.connectedProviders.has('dropbox'),
      },
    ];
  }

  getInitialPhotos(): AlbumPhoto[] {
    return [...INITIAL_ALBUM_PHOTOS];
  }

  connectProvider(provider: 'google-drive' | 'dropbox'): AlbumPhoto[] {
    this.connectedProviders.add(provider);
    return EXTRA_CLOUD_BATCH[provider].map((item) => ({
      ...item,
      id: `${item.id}-${Date.now().toString(36)}`,
    }));
  }

  readLocalFiles(files: FileList): Promise<AlbumPhoto[]> {
    const readers = Array.from(files)
      .slice(0, 8)
      .map(
        (file, idx) =>
          new Promise<AlbumPhoto>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({
                id: `local-${Date.now().toString(36)}-${idx}`,
                src: typeof reader.result === 'string' ? reader.result : ASSET_IMAGES.mandapCouple,
                caption: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
                ceremony: 'Reception',
                source: 'local',
                dateTaken: 'Uploaded from device',
              });
            };
            reader.onerror = () => {
              resolve({
                id: `local-fallback-${idx}`,
                src: ASSET_IMAGES.mandapCouple,
                caption: file.name,
                ceremony: 'Reception',
                source: 'local',
                dateTaken: 'Uploaded from device',
              });
            };
            reader.readAsDataURL(file);
          }),
      );
    return Promise.all(readers);
  }
}

export const storageService = new StorageService();

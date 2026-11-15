import { AlbumPhoto, StorageProviderId } from '../types/yaadgaar';
import { ASSET_IMAGES } from './streamService';

export interface CloudFolderOption {
  provider: StorageProviderId;
  providerLabel: string;
  folderName: string;
  photoCount: number;
  connected: boolean;
}

export interface StoryChapterMeta {
  step: number;
  roman: string;
  ceremony: AlbumPhoto['ceremony'];
  label: string;
  subtitle: string;
}

export const STORY_CHAPTER_ORDER: StoryChapterMeta[] = [
  {
    step: 1,
    roman: 'I',
    ceremony: 'First Meeting',
    label: '01 · First Meeting',
    subtitle: 'Where warm chai & quiet walks began a lifelong promise',
  },
  {
    step: 2,
    roman: 'II',
    ceremony: 'Ring Ceremony',
    label: '02 · Ring Ceremony',
    subtitle: 'Two golden bands, rose petals & applause from both families',
  },
  {
    step: 3,
    roman: 'III',
    ceremony: 'Haldi',
    label: '03 · Haldi',
    subtitle: 'Jasmine dawn braids, turmeric laughter & marigold showers',
  },
  {
    step: 4,
    roman: 'IV',
    ceremony: 'Mehendi',
    label: '04 · Mehndi',
    subtitle: 'Henna swirls, glass bangles & courtyard lantern melodies',
  },
  {
    step: 5,
    roman: 'V',
    ceremony: 'Marriage',
    label: '05 · Marriage',
    subtitle: 'Baraat, Varmala, Kanyadaan, Saat Pheras & Sindoor Daan',
  },
  {
    step: 6,
    roman: 'VI',
    ceremony: 'Hath Ganthi',
    label: '06 · Hath Ganthi',
    subtitle: 'Sacred crimson & pink knot binding two souls together',
  },
  {
    step: 7,
    roman: 'VII',
    ceremony: 'Vidaai',
    label: '07 · Vidai',
    subtitle: 'Handfuls of rice tossed in gratitude & tearful blessings',
  },
  {
    step: 8,
    roman: 'VIII',
    ceremony: 'Bride Entry in Sasural',
    label: '08 · Bride Entry in Sasural',
    subtitle: 'Alta footprints, rice kalash threshold & rose-milk ring games',
  },
];

const INITIAL_ALBUM_PHOTOS: AlbumPhoto[] = [
  // ── Chapter 01 · First Meeting (4) ───────────────────────────────────────────
  {
    id: 'ph-1',
    storyStep: 1,
    storyTitle: 'Chapter I · Welcome to Our Forever',
    ceremony: 'First Meeting',
    src: '/assets/aistudio/image_1e4b5d46.png',
    caption:
      '“Welcome to the beginning of our forever — one quiet meeting that turned into a lifetime walk together.”',
    storyNarrative:
      'What began with two strangers smiling softly over family introductions grew effortlessly into our very first chapter.',
    source: 'google-drive',
    dateTaken: 'Chapter 01 · First Meeting',
  },
  {
    id: 'ph-2',
    storyStep: 1,
    storyTitle: 'Chapter I · Courtyard Masala Chai',
    ceremony: 'First Meeting',
    src: '/assets/images/story_first_meeting_chai_1794731621447.jpg',
    caption:
      '“Hours melted away over two clay cups of cardamom chai beneath warm sunlit stone arches.”',
    storyNarrative:
      'Before any camera ever rolled, they spent an entire afternoon laughing about old music, hometown streets, and favorite books.',
    source: 'google-drive',
    dateTaken: 'Chapter 01 · Jaipur Courtyard',
  },
  {
    id: 'ph-3',
    storyStep: 1,
    storyTitle: 'Chapter I · Meadow Bouquet & Morning Light',
    ceremony: 'First Meeting',
    src: '/assets/aistudio/image_0636666f.png',
    caption:
      '“Standing side by side with yellow and white blooms — the sunny afternoon both knew this was home.”',
    storyNarrative:
      'Blue skies, rolling hills, and easy smiles made their earliest engagement afternoon feel timeless.',
    source: 'dropbox',
    dateTaken: 'Chapter 01 · Golden Meadow',
  },
  {
    id: 'ph-4',
    storyStep: 1,
    storyTitle: 'Chapter I · Sunset Walk by the Lake',
    ceremony: 'First Meeting',
    src: '/assets/images/story_first_meeting_walk_1794731622342.jpg',
    caption:
      '“Walking hand-in-hand beside golden water reflections as Udaipur turned amber at dusk.”',
    storyNarrative:
      'That walk along the ghat sealed the quiet certainty we carried back to both our parents.',
    source: 'google-drive',
    dateTaken: 'Chapter 01 · Lakefront Dusk',
  },

  // ── Chapter 02 · Ring Ceremony (4) ───────────────────────────────────────────
  {
    id: 'ph-5',
    storyStep: 2,
    storyTitle: 'Chapter II · The Engraved Brass Platter',
    ceremony: 'Ring Ceremony',
    src: '/assets/images/story_ring_closeup_platter_1794731622662.jpg',
    caption:
      '“Two gold rings resting on velvet amid fresh pink rose petals and mogra buds before the vows.”',
    storyNarrative:
      'Kept carefully beside Dada Ji’s heirloom thali until the auspicious evening muhurat arrived.',
    source: 'google-drive',
    dateTaken: 'Chapter 02 · Ring Platter',
  },
  {
    id: 'ph-6',
    storyStep: 2,
    storyTitle: 'Chapter II · Two Rings, One Promise',
    ceremony: 'Ring Ceremony',
    src: '/assets/aistudio/image_df2ac206.png',
    caption:
      '“Two golden bands held with smiling hearts — sealing our promise surrounded by cheering loved ones.”',
    storyNarrative:
      'Hands met amid applause from cousins and aunts joining in person and over video.',
    source: 'google-drive',
    dateTaken: 'Chapter 02 · Engagement Seal',
  },
  {
    id: 'ph-7',
    storyStep: 2,
    storyTitle: 'Chapter II · Exchange Under Fairy Lights',
    ceremony: 'Ring Ceremony',
    src: '/assets/images/story_ring_ceremony_stage_1794731622083.jpg',
    caption:
      '“Slipping rings onto each other’s fingers under chandelier light while relatives showered petals.”',
    storyNarrative:
      'The hall echoed with cheers from both families as Nayana and Aarav became officially engaged.',
    source: 'dropbox',
    dateTaken: 'Chapter 02 · Sagai Stage',
  },
  {
    id: 'ph-8',
    storyStep: 2,
    storyTitle: 'Chapter II · Dance Beneath Sunlit Trees',
    ceremony: 'Ring Ceremony',
    src: '/assets/aistudio/image_19d0da92.png',
    caption:
      '“Spinning under sunlit blossoms beside the swan lake right after exchanging engagement vows.”',
    storyNarrative:
      'A serene portrait celebrating our engagement countdown shared with family across five time zones.',
    source: 'google-drive',
    dateTaken: 'Chapter 02 · Woodland Celebration',
  },

  // ── Chapter 03 · Haldi (4) ───────────────────────────────────────────────────
  {
    id: 'ph-9',
    storyStep: 3,
    storyTitle: 'Chapter III · Ammamma’s Dawn Floral Braid',
    ceremony: 'Haldi',
    src: '/assets/aistudio/image_6963b37c.png',
    caption:
      '“Dawn blessings at home as grandmother weaves fresh jasmine and orange blossoms before Haldi begins.”',
    storyNarrative:
      'In quiet morning sunlight, three generations shared old songs before the courtyard erupted in laughter.',
    source: 'google-drive',
    dateTaken: 'Chapter 03 · Haldi Morning',
  },
  {
    id: 'ph-10',
    storyStep: 3,
    storyTitle: 'Chapter III · Golden Courtyard Laughter',
    ceremony: 'Haldi',
    src: ASSET_IMAGES.haldi,
    caption:
      '“Every elder and child dabbing haldi amid dangling marigold strings and singing blessings.”',
    storyNarrative:
      'Saffron kurta, yellow saree, and a courtyard sparkling with warmth as relatives streamed live from abroad.',
    source: 'google-drive',
    dateTaken: 'Chapter 03 · Haldi Courtyard',
  },
  {
    id: 'ph-11',
    storyStep: 3,
    storyTitle: 'Chapter III · Shower of Marigold Petals',
    ceremony: 'Haldi',
    src: '/assets/images/story_haldi_petal_shower_1794731623524.jpg',
    caption:
      '“Woven baskets lifted high — raining golden genda petals while cousins cheered in bright yellows.”',
    storyNarrative:
      'Nobody left the marble veranda untouched by turmeric or laughter that unforgettable morning.',
    source: 'dropbox',
    dateTaken: 'Chapter 03 · Phoolon Ki Haldi',
  },
  {
    id: 'ph-12',
    storyStep: 3,
    storyTitle: 'Chapter III · Brass Urlis & Sacred Sandalwood',
    ceremony: 'Haldi',
    src: '/assets/images/watercolor_haldi_ceremony_1794672921766.jpg',
    caption:
      '“Sunlight dancing on brass urlis of rosewater and haldi paste prepared by both grandmothers.”',
    storyNarrative:
      'An heirloom ritual blending turmeric, sandalwood, and whispered blessings for a bright home.',
    source: 'google-drive',
    dateTaken: 'Chapter 03 · Brass Urli',
  },

  // ── Chapter 04 · Mehendi (6) ─────────────────────────────────────────────────
  {
    id: 'ph-13',
    storyStep: 4,
    storyTitle: 'Chapter IV · Springs of Mehndi',
    ceremony: 'Mehendi',
    src: '/assets/aistudio/image_ba0e2349.png',
    caption:
      '“Bridal henna palms cradling pink blossoms above an heirloom brass thali in afternoon breeze.”',
    storyNarrative:
      'Delicate paisleys traced down to her fingertips while cousins hummed classic wedding folk songs.',
    source: 'dropbox',
    dateTaken: 'Chapter 04 · Mehndi Thali',
  },
  {
    id: 'ph-14',
    storyStep: 4,
    storyTitle: 'Chapter IV · Emerald Bangles & Fresh Mogra',
    ceremony: 'Mehendi',
    src: '/assets/images/story_mehndi_bangles_tray_1794731624460.jpg',
    caption:
      '“Green glass choodiyan, golden latkans, and scented mogra garlands waiting on velvet linen.”',
    storyNarrative:
      'Every guest received fresh floral gajras as they gathered around the Verandah swing.',
    source: 'google-drive',
    dateTaken: 'Chapter 04 · Shagun Tray',
  },
  {
    id: 'ph-15',
    storyStep: 4,
    storyTitle: 'Chapter IV · Finding Aarav’s Name in Henna',
    ceremony: 'Mehendi',
    src: ASSET_IMAGES.mehendi,
    caption:
      '“Garden afternoon filled with emerald lehengas, folk tunes, and playful teasing over dark mehndi.”',
    storyNarrative:
      'They say the deeper the mehndi stains, the warmer the welcome in her new home.',
    source: 'dropbox',
    dateTaken: 'Chapter 04 · Garden Verandah',
  },
  {
    id: 'ph-16',
    storyStep: 4,
    storyTitle: 'Chapter IV · Lotus & Peacock Trails',
    ceremony: 'Mehendi',
    src: '/assets/images/watercolor_mehendi_hands_1794672923170.jpg',
    caption:
      '“Close-up of traditional lotus vines and tiny doli motifs painted delicately along her wrists.”',
    storyNarrative:
      'Three hours of serene storytelling with sisters while the afternoon cooled into dusk.',
    source: 'google-drive',
    dateTaken: 'Chapter 04 · Bridal Motifs',
  },
  {
    id: 'ph-17',
    storyStep: 4,
    storyTitle: 'Chapter IV · Courtyard Lanterns & Dholak',
    ceremony: 'Mehendi',
    src: ASSET_IMAGES.sangeet,
    caption:
      '“As evening fell, brass lamps lit the courtyard and both families danced beneath marigold drapes.”',
    storyNarrative:
      'Choreographed medleys, impromptu uncles’ steps, and live cheers flashing across the Blessing Wall.',
    source: 'dropbox',
    dateTaken: 'Chapter 04 · Sangeet Eve',
  },
  {
    id: 'ph-18',
    storyStep: 4,
    storyTitle: 'Chapter IV · Starlit Mehndi Rhythm',
    ceremony: 'Mehendi',
    src: '/assets/images/watercolor_sangeet_night_1794672922613.jpg',
    caption:
      '“Drums, twinkling diyas, and swirling dupattas keeping the courtyard humming long past midnight.”',
    storyNarrative:
      'Music carried straight out over Lake Pichola to family watching from Toronto and London.',
    source: 'google-drive',
    dateTaken: 'Chapter 04 · Night Courtyard',
  },

  // ── Chapter 05 · Marriage (7) ────────────────────────────────────────────────
  {
    id: 'ph-19',
    storyStep: 5,
    storyTitle: 'Chapter V · Royal Baraat Welcome',
    ceremony: 'Marriage',
    src: '/assets/images/story_marriage_baraat_arrival_1794731623836.jpg',
    caption:
      '“Lantern-lit Baraat processions, joyful brothers dancing, and the groom arriving under marigold gates.”',
    storyNarrative:
      'Warm hugs at the Milni ritual united uncles and fathers before leading Aarav to the mandap.',
    source: 'google-drive',
    dateTaken: 'Chapter 05 · Baraat Gate',
  },
  {
    id: 'ph-20',
    storyStep: 5,
    storyTitle: 'Chapter V · The Rose & Mogra Varmala',
    ceremony: 'Marriage',
    src: '/assets/images/story_marriage_varmala_stage_1794731626998.jpg',
    caption:
      '“Exchanging fresh rose garlands amid showered petals while cousins playfully lifted the groom high.”',
    storyNarrative:
      'That split second of eye contact before placing the garland brought tears and smiles at once.',
    source: 'dropbox',
    dateTaken: 'Chapter 05 · Varmala Moment',
  },
  {
    id: 'ph-21',
    storyStep: 5,
    storyTitle: 'Chapter V · Seated Beneath the Mandap',
    ceremony: 'Marriage',
    src: ASSET_IMAGES.mandapCouple,
    caption:
      '“Framed by vermilion pillars and cascading mogra — two hearts calm at the centre of the celebration.”',
    storyNarrative:
      'With grandmothers smiling from the front row and live cameras capturing every mantra clearly.',
    source: 'google-drive',
    dateTaken: 'Chapter 05 · Mandap Canopy',
  },
  {
    id: 'ph-22',
    storyStep: 5,
    storyTitle: 'Chapter V · Kanyadaan & Holy Jal',
    ceremony: 'Marriage',
    src: '/assets/aistudio/image_ecee2428.png',
    caption:
      '“Sacred water poured from a golden kamandal over the conch shell as parents entrust their blessing.”',
    storyNarrative:
      'A deeply moving silence fell over the courtyard as both families bowed in reverence.',
    source: 'google-drive',
    dateTaken: 'Chapter 05 · Kanyadaan',
  },
  {
    id: 'ph-23',
    storyStep: 5,
    storyTitle: 'Chapter V · Agni & Saat Pheras',
    ceremony: 'Marriage',
    src: '/assets/aistudio/image_c4a8cb20.png',
    caption:
      '“Hands joined above the sacred havan flame, speaking seven vows of friendship, strength, and warmth.”',
    storyNarrative:
      'Seven circles around the Vedic fire — each vow binding mind, spirit, and family.',
    source: 'google-drive',
    dateTaken: 'Chapter 05 · Saat Pheras',
  },
  {
    id: 'ph-24',
    storyStep: 5,
    storyTitle: 'Chapter V · Sindoor Daan',
    ceremony: 'Marriage',
    src: '/assets/aistudio/image_4baebaab.png',
    caption:
      '“A gentle pinch of vermilion sindoor adorning her maang — two lives stepping cleanly into one destiny.”',
    storyNarrative:
      'Shehnai melodies rose alongside cheering blessings from every loved one present and online.',
    source: 'google-drive',
    dateTaken: 'Chapter 05 · Sindoor Moment',
  },
  {
    id: 'ph-25',
    storyStep: 5,
    storyTitle: 'Chapter V · Elder Blessings Under the Canopy',
    ceremony: 'Marriage',
    src: '/assets/images/watercolor_mandap_couple_1794672921270.jpg',
    caption:
      '“Flower petals drifting down after the final vow as both families folded hands in gratitude.”',
    storyNarrative:
      'A serene portrait preserving the timeless grace of their wedding morning.',
    source: 'dropbox',
    dateTaken: 'Chapter 05 · After Vows',
  },

  // ── Chapter 06 · Hath Ganthi (4) ─────────────────────────────────────────────
  {
    id: 'ph-26',
    storyStep: 6,
    storyTitle: 'Chapter VI · Hath Ganthi (The Sacred Knot)',
    ceremony: 'Hath Ganthi',
    src: '/assets/aistudio/image_2f653503.png',
    caption:
      '“Silken pink and crimson stoles knotted together beside clasped hennaed hands — bound for seven lifetimes.”',
    storyNarrative:
      'Tied by Aarav’s sister amidst Vedic chants, uniting her veil to his stole forever.',
    source: 'dropbox',
    dateTaken: 'Chapter 06 · Hath Ganthi',
  },
  {
    id: 'ph-27',
    storyStep: 6,
    storyTitle: 'Chapter VI · Turmeric, Supari & Heirloom Coin',
    ceremony: 'Hath Ganthi',
    src: '/assets/images/story_hath_ganthi_knot_1794731625585.jpg',
    caption:
      '“Inside the silk knot rest betel nut, turmeric root, and an ancestral silver coin for lifelong prosperity.”',
    storyNarrative:
      'Every traditional emblem woven softly into the gathbandhan for peace, abundance, and joy.',
    source: 'google-drive',
    dateTaken: 'Chapter 06 · Gathbandhan Detail',
  },
  {
    id: 'ph-28',
    storyStep: 6,
    storyTitle: 'Chapter VI · Bound Shoulder to Shoulder',
    ceremony: 'Hath Ganthi',
    src: ASSET_IMAGES.pheras,
    caption:
      '“Stepping around the sacred fire tethered by the crimson-gold sash and family prayers.”',
    storyNarrative:
      'Warm embers glowed as they promised to walk every season in unity.',
    source: 'google-drive',
    dateTaken: 'Chapter 06 · Sacred Vow Walk',
  },
  {
    id: 'ph-29',
    storyStep: 6,
    storyTitle: 'Chapter VI · Glow of the Havan Samidha',
    ceremony: 'Hath Ganthi',
    src: '/assets/images/watercolor_pheras_fire_1794672924717.jpg',
    caption:
      '“Rose petals framing the glowing hearth where their gathbandhan vows took eternal witness.”',
    storyNarrative:
      'The warmth of that fire lives on every time this album is opened.',
    source: 'dropbox',
    dateTaken: 'Chapter 06 · Sacred Hearth',
  },

  // ── Chapter 07 · Vidaai (3) ──────────────────────────────────────────────────
  {
    id: 'ph-30',
    storyStep: 7,
    storyTitle: 'Chapter VII · Tossing Puffed Rice Backwards',
    ceremony: 'Vidaai',
    src: '/assets/images/story_vidaai_rice_toss_1794731741633.jpg',
    caption:
      '“Gently tossing kheel over her shoulder toward misty-eyed parents — wishing her childhood home endless plenty.”',
    storyNarrative:
      'A bittersweet moment of gratitude: honoring everyone who raised her as she steps toward her new home.',
    source: 'google-drive',
    dateTaken: 'Chapter 07 · Vidaai Ritual',
  },
  {
    id: 'ph-31',
    storyStep: 7,
    storyTitle: 'Chapter VII · Alta Palms & Tender Promises',
    ceremony: 'Vidaai',
    src: '/assets/aistudio/image_1c48b836.png',
    caption:
      '“Alta-painted palms held with quiet reassurance at the gate as she bids farewell to childhood walls.”',
    storyNarrative:
      'No words needed — just one gentle squeeze of the hand promising she will always be cherished.',
    source: 'google-drive',
    dateTaken: 'Chapter 07 · Farewell Touch',
  },
  {
    id: 'ph-32',
    storyStep: 7,
    storyTitle: 'Chapter VII · The Marigold-Draped Departure',
    ceremony: 'Vidaai',
    src: '/assets/images/story_vidaai_flower_car_1794731626477.jpg',
    caption:
      '“Waving through falling rose petals as siblings held her door open beside the decorated vintage car.”',
    storyNarrative:
      'Misty eyes blended with proud smiles as two families stood close together watching them drive off.',
    source: 'dropbox',
    dateTaken: 'Chapter 07 · Courtyard Departure',
  },

  // ── Chapter 08 · Bride Entry in Sasural (4) ──────────────────────────────────
  {
    id: 'ph-33',
    storyStep: 8,
    storyTitle: 'Chapter VIII · Auspicious Alta Footprints',
    ceremony: 'Bride Entry in Sasural',
    src: '/assets/images/story_sasural_alta_steps_1794731627965.jpg',
    caption:
      '“Stepping from crimson alta onto spotless marble — stamping prosperity across every corridor of her new home.”',
    storyNarrative:
      'Every step left delicate crimson impressions celebrated as Goddess Lakshmi’s graceful arrival.',
    source: 'google-drive',
    dateTaken: 'Chapter 08 · Griha Pravesh Steps',
  },
  {
    id: 'ph-34',
    storyStep: 8,
    storyTitle: 'Chapter VIII · Tipping the Rice Kalash',
    ceremony: 'Bride Entry in Sasural',
    src: '/assets/aistudio/image_8d129615.png',
    caption:
      '“Stepping across the threshold, gently tipping the brass kalash overflowing with rice and rose petals.”',
    storyNarrative:
      'Welcomed with lamps, dholki songs, and marigold torans framing the sasural doorway.',
    source: 'google-drive',
    dateTaken: 'Chapter 08 · Kalash Entry',
  },
  {
    id: 'ph-35',
    storyStep: 8,
    storyTitle: 'Chapter VIII · Mother-in-Law’s Aarti Welcome',
    ceremony: 'Bride Entry in Sasural',
    src: '/assets/images/story_sasural_aarti_welcome_1794731627660.jpg',
    caption:
      '“Warm brass aarti glow and a mother’s tender smile welcoming Nayana right at the front porch.”',
    storyNarrative:
      'In that single embrace, any nervousness vanished — replaced by instant family warmth.',
    source: 'google-drive',
    dateTaken: 'Chapter 08 · Sasural Aarti',
  },
  {
    id: 'ph-36',
    storyStep: 8,
    storyTitle: 'Chapter VIII · Ring Game in Rose Milk',
    ceremony: 'Bride Entry in Sasural',
    src: '/assets/aistudio/image_2e961906.png',
    caption:
      '“Laughter echoing around a silver platter of milk and rose petals as both hands race to find the ring.”',
    storyNarrative:
      'Playful cheering from new sisters-in-law turned her first evening in sasural into a room full of belonging.',
    source: 'dropbox',
    dateTaken: 'Chapter 08 · Mooh Dikhai & Ring Game',
  },
];

const EXTRA_CLOUD_BATCH: Record<'google-drive' | 'dropbox', AlbumPhoto[]> = {
  'google-drive': [
    {
      id: 'ph-gd-1',
      storyStep: 3,
      storyTitle: 'Chapter III · Cousins’ Haldi Bouquet',
      src: '/assets/images/story_haldi_petal_shower_1794731623524.jpg',
      caption: 'Imported from Google Drive · Cousins tossing marigold petals over the courtyard.',
      ceremony: 'Haldi',
      source: 'google-drive',
      dateTaken: 'Nov 22, 2026 · 10:42 AM',
    },
    {
      id: 'ph-gd-2',
      storyStep: 5,
      storyTitle: 'Chapter V · Evening Pheras Frame',
      src: '/assets/images/story_marriage_varmala_stage_1794731626998.jpg',
      caption: 'Imported from Google Drive · Floral mandap garlands above the couple.',
      ceremony: 'Marriage',
      source: 'google-drive',
      dateTaken: 'Nov 23, 2026 · 12:05 PM',
    },
  ],
  dropbox: [
    {
      id: 'ph-db-1',
      storyStep: 4,
      storyTitle: 'Chapter IV · Bangles & Henna Detail',
      src: '/assets/images/story_mehndi_bangles_tray_1794731624460.jpg',
      caption: 'Imported from Dropbox · Emerald bangles beside fresh jasmine.',
      ceremony: 'Mehendi',
      source: 'dropbox',
      dateTaken: 'Nov 22, 2026 · 04:45 PM',
    },
    {
      id: 'ph-db-2',
      storyStep: 8,
      storyTitle: 'Chapter VIII · Welcome Lamp Glow',
      src: '/assets/images/story_sasural_aarti_welcome_1794731627660.jpg',
      caption: 'Imported from Dropbox · Evening aarti at the sasural doorway.',
      ceremony: 'Bride Entry in Sasural',
      source: 'dropbox',
      dateTaken: 'Nov 23, 2026 · 08:15 PM',
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
                ceremony: 'Bride Entry in Sasural',
                storyStep: 8,
                source: 'local',
                dateTaken: 'Uploaded from device',
              });
            };
            reader.onerror = () => {
              resolve({
                id: `local-fallback-${idx}`,
                src: ASSET_IMAGES.mandapCouple,
                caption: file.name,
                ceremony: 'Bride Entry in Sasural',
                storyStep: 8,
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

import { LanguageMode } from '../types/yaadgaar';

export interface SectionCopy {
  numeral: string;
  ceremonyMood: 'haldi' | 'mehendi' | 'sangeet' | 'pheras' | 'vidaai' | 'reception' | 'blessing';
  ceremonyTag: string;
  headline: string;
  subcopy: string;
  quote?: string;
  ctaLabel: string;
}

export interface TranslationBundle {
  nav: {
    live: string;
    archive: string;
    photoBook: string;
    pricing: string;
    dashboard: string;
    scanQr: string;
  };
  intro: {
    mantra: string;
    title: string;
    subtitle: string;
    enterCta: string;
    skipCta: string;
  };
  sections: {
    s01: SectionCopy;
    s02: SectionCopy;
    s03: SectionCopy;
    s04: SectionCopy;
    s05: SectionCopy;
    s06: SectionCopy;
    s07: SectionCopy;
  };
  pricing: {
    toggleMonthly: string;
    toggleYearly: string;
    selectPlan: string;
    selectedNote: string;
    lapsePolicy: string;
  };
  footer: {
    contactTitle: string;
    contactSubtitle: string;
    copyright: string;
  };
}

export const TRANSLATIONS: Record<LanguageMode, TranslationBundle> = {
  hinglish: {
    nav: {
      live: 'Live',
      archive: 'Archive',
      photoBook: 'Photo Book',
      pricing: 'Pricing',
      dashboard: 'Host Studio',
      scanQr: 'Scan QR',
    },
    intro: {
      mantra: '॥ श्री गणेशाय नमः ॥',
      title: 'Shubh Aarambh',
      subtitle: 'Jo door hain, unhe bhi saath bitha lo.',
      enterCta: 'Andar aaiye',
      skipCta: 'Seedha dekho',
    },
    sections: {
      s01: {
        numeral: '01',
        ceremonyMood: 'pheras',
        ceremonyTag: 'Live Mandap · Abhi Live',
        headline: 'Aap nahi aa paaye?\nShaadi aap tak aayegi.',
        subcopy:
          'Jo door hain, unhe bhi saath bitha lo. Chahe London ho, Toronto ho, ya ghar — mandap ka har mantra aur har muskaan aapki screen par live pahunchegi.',
        quote: 'Dooriyaan sirf shehron ki hoti hain, dilon ka aashirwad toh ek saath mandap mein baith-ta hai.',
        ctaLabel: 'Watch Live',
      },
      s02: {
        numeral: '02',
        ceremonyMood: 'haldi',
        ceremonyTag: 'Blessings Wall · Dil Se Dua',
        headline: 'Dulha-dulhan ke liye\ndua likho',
        subcopy:
          'Haldi ki khushboo aur shehnai ke beech, apna pyaar bhara sandesh aur aashirwad real-time mein mandap ki deewar par bhejein.',
        ctaLabel: 'Dua bhejo',
      },
      s03: {
        numeral: '03',
        ceremonyMood: 'mehendi',
        ceremonyTag: 'Forever Archive · Hamesha Ke Liye',
        headline: 'Stream khatam,\nyaadein nahi',
        subcopy:
          'Pheras ek baar hote hain. Dekhna jitni baar chaho. Haldi, Mehendi, Sangeet, Pheras, Vidaai aur Reception — har rasam alag chapter mein mehfooz rehti hai.',
        quote: 'Waqt guzar jaata hai, par pheras ke geet aur apno ki hansi sada saath rehti hai.',
        ctaLabel: 'Purani shaadiyan dekho',
      },
      s04: {
        numeral: '04',
        ceremonyMood: 'sangeet',
        ceremonyTag: 'QR Shagun Card · Scan & Join',
        headline: 'Ek QR card par.\nPoora parivaar mandap mein.',
        subcopy:
          'Card par ek chhota QR. Poora parivaar mandap mein. Mehmaan phone se scan karein aur seedha livestream, schedule aur blessings wall par pahunch jaayein.',
        ctaLabel: 'Card dekho, QR scan karo',
      },
      s05: {
        numeral: '05',
        ceremonyMood: 'reception',
        ceremonyTag: 'Digital Photo Book · Page-Flip Album',
        headline: 'Aapki yaadein,\nek kitaab ki tarah',
        subcopy:
          'Sab photos ek album mein, bilkul asli kitaab jaisi. Google Drive, Dropbox ya gallery se tasveerein jodein aur panna palat kar PDF mein save karein.',
        ctaLabel: 'Album kholo',
      },
      s06: {
        numeral: '06',
        ceremonyMood: 'blessing',
        ceremonyTag: 'Apni Suvidha Se · Transparent Plans',
        headline: 'Apne hisaab se chuno',
        subcopy:
          'Chahe media apne Google Drive mein rakhein (₹199 ek baar) ya Yaadgaar Vault mein store karein — har parivaar ke liye saaf keemat.',
        ctaLabel: 'Ye plan lo',
      },
      s07: {
        numeral: '06',
        ceremonyMood: 'pheras',
        ceremonyTag: 'Roka se Reception Tak',
        headline: 'Har shaadi. Har pal.\nHamesha ke liye.',
        subcopy:
          'Roka, Haldi, Mehendi, Sangeet, Pheras, Vidaai, Griha Pravesh ya Naamkaran — apni parivaarik kahani aaj shuru karein.',
        quote: 'Bandhan sirf do logon ka nahi, do parivaaron ki saari yaadon ka hota hai.',
        ctaLabel: 'Apni shaadi yahan dikhao',
      },
    },
    pricing: {
      toggleMonthly: 'Monthly',
      toggleYearly: 'Yearly',
      selectPlan: 'Ye plan lo',
      selectedNote: 'Selected for your ceremony',
      lapsePolicy:
        'Plan chalta rahe toh archive hamesha safe. Band karein toh 12 mahine pehle poore videos aur PDF album download karne ka option milta hai.',
    },
    footer: {
      contactTitle: 'Parivaar Support & Concierge',
      contactSubtitle: 'Kisi bhi rasam ya card printing mein madad ke liye: namaste@yaadgaar.in',
      copyright: '© 2026 Yaadgaar. Har shaadi, har pal, hamesha ke liye.',
    },
  },
  en: {
    nav: {
      live: 'Live',
      archive: 'Archive',
      photoBook: 'Photo Book',
      pricing: 'Pricing',
      dashboard: 'Host Studio',
      scanQr: 'Scan QR',
    },
    intro: {
      mantra: '॥ SHRI GANESHAYA NAMAH ॥',
      title: 'Shubh Aarambh',
      subtitle: 'Bring every distant loved one right beside the sacred mandap.',
      enterCta: 'Step Inside',
      skipCta: 'Skip Intro',
    },
    sections: {
      s01: {
        numeral: '01',
        ceremonyMood: 'pheras',
        ceremonyTag: 'Live Mandap · Now Streaming',
        headline: "Couldn't make it?\nYou still belong.",
        subcopy:
          'Whether across oceans or unable to travel, watch every mantra, varmala, and tear of joy unfold live with the entire family.',
        quote: 'Distance separates cities, never the warmth of a blessing spoken at the sacred fire.',
        ctaLabel: 'Watch Live',
      },
      s02: {
        numeral: '02',
        ceremonyMood: 'haldi',
        ceremonyTag: 'Real-Time Blessings Wall',
        headline: 'Every blessing,\nin real time',
        subcopy:
          'Write heartfelt duas and warm wishes for the bride and groom as Haldi and shehnai fill the courtyard.',
        ctaLabel: 'Send a Blessing',
      },
      s03: {
        numeral: '03',
        ceremonyMood: 'mehendi',
        ceremonyTag: 'Forever Archive · Preserved Always',
        headline: 'Their day,\nkept forever',
        subcopy:
          'When the livestream concludes, every ritual stays organized across Haldi, Mehendi, Sangeet, Pheras, Vidaai, and Reception chapters.',
        quote: 'Ceremonies pass in hours, yet family laughter belongs to every generation after.',
        ctaLabel: 'Explore Archive',
      },
      s04: {
        numeral: '04',
        ceremonyMood: 'sangeet',
        ceremonyTag: 'QR on the Shaadi Card',
        headline: 'A QR on the card.\nEveryone at the mandap.',
        subcopy:
          'Print one clean QR code onto your invitation card. Guests scan on their phone to open the live stream and ceremony schedule.',
        ctaLabel: 'Preview Card & Scan QR',
      },
      s05: {
        numeral: '05',
        ceremonyMood: 'reception',
        ceremonyTag: 'Digital Wedding Photo Book',
        headline: 'Your memories,\nbound like a real book',
        subcopy:
          'Connect Google Drive, Dropbox, or local photos and turn them into a tactile page-flip wedding album ready to download as PDF.',
        ctaLabel: 'Open Photo Book',
      },
      s06: {
        numeral: '06',
        ceremonyMood: 'blessing',
        ceremonyTag: 'Simple, Honest Pricing',
        headline: 'Choose what fits your family',
        subcopy:
          'Keep media in your own Drive for a ₹199 one-time pass, or let Yaadgaar host your high-definition archive.',
        ctaLabel: 'Choose This Plan',
      },
      s07: {
        numeral: '06',
        ceremonyMood: 'pheras',
        ceremonyTag: 'From Roka to Naamkaran',
        headline: 'Every wedding.\nEvery moment. Forever.',
        subcopy:
          'Built for Roka, Haldi, Mehendi, Sangeet, Pheras, Vidaai, Reception, Griha Pravesh, and Naamkaran.',
        quote: 'A wedding unites not just two souls, but every memory shared by two families.',
        ctaLabel: 'Host Your Ceremony',
      },
    },
    pricing: {
      toggleMonthly: 'Monthly',
      toggleYearly: 'Yearly',
      selectPlan: 'Choose Plan',
      selectedNote: 'Selected for your ceremony',
      lapsePolicy:
        'Your archive stays hosted while the plan is active. If you ever cancel, you have a 12-month window to download all chapters & PDF albums.',
    },
    footer: {
      contactTitle: 'Family Concierge & Support',
      contactSubtitle: 'Need help setting up your stream or print QR? Write to namaste@yaadgaar.in',
      copyright: '© 2026 Yaadgaar. Every ceremony, preserved forever.',
    },
  },
  hi: {
    nav: {
      live: 'लाइव',
      archive: 'संग्रह',
      photoBook: 'एल्बम',
      pricing: 'शुल्क',
      dashboard: 'होस्ट मंच',
      scanQr: 'QR स्कैन',
    },
    intro: {
      mantra: '॥ श्री गणेशाय नमः ॥',
      title: 'शुभ आरम्भ',
      subtitle: 'जो दूर हैं, उन्हें भी मंडप के पास बिठा लें।',
      enterCta: 'अंदर आइए',
      skipCta: 'सीधे देखें',
    },
    sections: {
      s01: {
        numeral: '01',
        ceremonyMood: 'pheras',
        ceremonyTag: 'जीवंत प्रसारण · अभी लाइव',
        headline: 'आप नहीं आ पाए?\nशादी आप तक आएगी।',
        subcopy:
          'चाहे आप विदेश में हों या यात्रा न कर सकें — मंडप का हर मंत्र और हर मुस्कान आपके पास लाइव पहुंचेगी।',
        quote: 'दूरियाँ शहरों की होती हैं, अपनों का आशीर्वाद तो सदा मंडप में साथ होता है।',
        ctaLabel: 'लाइव देखें',
      },
      s02: {
        numeral: '02',
        ceremonyMood: 'haldi',
        ceremonyTag: 'आशीर्वाद दीवार · दिल से दुआ',
        headline: 'दूल्हा-दुल्हन के लिए\nदुआ लिखो',
        subcopy:
          'हल्दी और शहनाई के बीच, अपना स्नेह भरा संदेश और आशीर्वाद तुरंत समारोह की दीवार पर भेजें।',
        ctaLabel: 'दुआ भेजो',
      },
      s03: {
        numeral: '03',
        ceremonyMood: 'mehendi',
        ceremonyTag: 'सदा के लिए सुरक्षित · अमर संग्रह',
        headline: 'प्रसारण ख़त्म,\nयादें नहीं',
        subcopy:
          'फेरे एक बार होते हैं, पर आप जितनी बार चाहें देख सकते हैं। हल्दी, मेहंदी, संगीत, फेरे, विदाई और रिसेप्शन हमेशा के लिए सुरक्षित।',
        quote: 'समय बीत जाता है, पर फेरों के गीत और अपनों की हँसी पीढ़ियों तक साथ रहती है।',
        ctaLabel: 'पुरानी शादियाँ देखें',
      },
      s04: {
        numeral: '04',
        ceremonyMood: 'sangeet',
        ceremonyTag: 'निमंत्रण पत्र पर QR कोड',
        headline: 'एक QR कार्ड पर।\nपूरा परिवार मंडप में।',
        subcopy:
          'कार्ड पर एक छोटा QR छपवाएँ। मेहमान फोन से स्कैन करके सीधे मंडप और समय-सारिणी देख सकते हैं।',
        ctaLabel: 'कार्ड देखें, QR स्कैन करें',
      },
      s05: {
        numeral: '05',
        ceremonyMood: 'reception',
        ceremonyTag: 'डिजिटल विवाह एल्बम',
        headline: 'आपकी यादें,\nएक किताब की तरह',
        subcopy:
          'Google Drive, Dropbox या गैलरी से तस्वीरें जोड़ें — असली किताब जैसे पन्ने पलटने वाले एल्बम में सहेजें और PDF डाउनलोड करें।',
        ctaLabel: 'एल्बम खोलें',
      },
      s06: {
        numeral: '06',
        ceremonyMood: 'blessing',
        ceremonyTag: 'सरल और स्पष्ट योजना',
        headline: 'अपने हिसाब से चुनो',
        subcopy:
          'अपनी तस्वीरें अपने ड्राइव में रखें (₹199 एक बार) या यादगार के सुरक्षित संग्रह का विकल्प चुनें।',
        ctaLabel: 'यह प्लान चुनें',
      },
      s07: {
        numeral: '06',
        ceremonyMood: 'pheras',
        ceremonyTag: 'रोका से नामकरण तक',
        headline: 'हर शादी। हर पल।\nहमेशा के लिए।',
        subcopy:
          'रोका, हल्दी, मेहंदी, संगीत, फेरे, विदाई, गृह प्रवेश या नामकरण — अपने परिवार की कहानी आज सहेजें।',
        quote: 'विवाह केवल दो हृदयों का नहीं, दो परिवारों की स्मृतियों का मिलन है।',
        ctaLabel: 'अपनी शादी यहाँ दिखाएँ',
      },
    },
    pricing: {
      toggleMonthly: 'मासिक',
      toggleYearly: 'वार्षिक',
      selectPlan: 'यह प्लान चुनें',
      selectedNote: 'आपके समारोह के लिए चयनित',
      lapsePolicy:
        'प्लान चालू रहने तक संग्रह सुरक्षित रहता है। बंद करने पर भी 12 महीने तक सभी वीडियो और PDF एल्बम डाउनलोड करने का विकल्प मिलता है।',
    },
    footer: {
      contactTitle: 'परिवार सहायता केंद्र',
      contactSubtitle: 'प्रसारण या प्रिंट QR सहायता के लिए लिखें: namaste@yaadgaar.in',
      copyright: '© 2026 यादगार। हर शादी, हर पल, हमेशा के लिए।',
    },
  },
};

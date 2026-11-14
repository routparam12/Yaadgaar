import { LanguageMode } from '../types/yaadgaar';

export interface SectionCopy {
  numeral: string;
  ceremonyMood: 'haldi' | 'mehendi' | 'sangeet' | 'pheras' | 'vidaai' | 'reception' | 'blessing';
  ceremonyTag: string;
  headline: string;
  subcopy: string;
  quote: string;
  quoteAuthor: string;
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
      subtitle: 'Door baithe apno ko bhi mandap ki roshni mein shaamil kijiye.',
      enterCta: 'Mandap Mein Pravesh Karein',
      skipCta: 'Seedha Dekhein',
    },
    sections: {
      s01: {
        numeral: '01',
        ceremonyMood: 'pheras',
        ceremonyTag: 'Live Mandap · Abhi Live',
        headline: 'AAP NAHI AA PAYE? SHAADI AAP TAK AAYEGI.',
        subcopy:
          'Chahe aap London mein hon, Toronto mein, ya ghar par — mandap ka har mantra, har muskaan aapke screen par live pahunchegi.',
        quote: 'Dooriyaan sirf shehron ki hoti hain, dilon ka aashirwad toh ek saath mandap mein baith-ta hai.',
        quoteAuthor: 'Dadi Maa ka Aashirwad',
        ctaLabel: 'Watch Live',
      },
      s02: {
        numeral: '02',
        ceremonyMood: 'haldi',
        ceremonyTag: 'Blessings Wall · Dil Se Dua',
        headline: 'DULHA-DULHAN KE LIYE DUA LIKHO',
        subcopy:
          'Haldi ki khushboo aur shehnai ke beech, apna pyaar bhara sandesh aur aashirwad real-time mein mandap ki deewar par bhejein.',
        quote: 'Jitne haathon se haldi lagti hai, utni hi duaon se naya ghar sajta hai.',
        quoteAuthor: 'Parivaar ki Parampara',
        ctaLabel: 'Dua Bhejein',
      },
      s03: {
        numeral: '03',
        ceremonyMood: 'mehendi',
        ceremonyTag: 'Forever Archive · Preserved Forever',
        headline: 'HAMESHA KE LIYE',
        subcopy:
          'Stream khatam hone ke baad bhi yaadein dhundhli nahi hotin. Haldi, Mehendi, Sangeet, Pheras, Vidaai aur Reception — har rasam ek chapter mein hamesha ke liye mehfooz.',
        quote: 'Waqt guzar jaata hai, par pheras ke geet aur apno ki hansi sada saath rehti hai.',
        quoteAuthor: 'Yaadgaar Sangrah',
        ctaLabel: 'Explore Archive',
      },
      s04: {
        numeral: '04',
        ceremonyMood: 'sangeet',
        ceremonyTag: 'QR Shagun Card · Scan & Join',
        headline: 'EK QR CARD PAR. POORA PARIVAAR MANDAP MEIN.',
        subcopy:
          'Shaadi ke card par ek chhota sa QR code chhapein. Mehmaan phone se scan karein aur seedha mandap, schedule, aur blessings wall par pahunch jaayein.',
        quote: 'Ek chhota sa chhapa hua nishaan, jo saath samundar paar se bhi apno ko bula laaye.',
        quoteAuthor: 'Nimantran Kala',
        ctaLabel: 'Preview Card & Scan QR',
      },
      s05: {
        numeral: '05',
        ceremonyMood: 'reception',
        ceremonyTag: 'Digital Photo Book · Page-Flip Album',
        headline: 'AAPKI YAADEIN, EK KITAAB KI TARAH.',
        subcopy:
          'Google Drive, Dropbox ya gallery se tasveerein chunein — hum unhe ek royal hardbound digital album mein saja dete hain, jisey aap panna palat kar dekh aur PDF mein save kar sakte hain.',
        quote: 'Tasveerein jab pannon mein bandhti hain, toh har rasam phir se saans lene lagti hai.',
        quoteAuthor: 'Almari ki Kitaab',
        ctaLabel: 'Open Photo Book',
      },
      s06: {
        numeral: '06',
        ceremonyMood: 'blessing',
        ceremonyTag: 'Transparent Plans · Apni Suvidha Se',
        headline: 'APNE HISAAB SE CHUNO',
        subcopy:
          'Chahe aap apni media apne Google Drive mein rakhein ya humare vault mein mehfooz karein — har shaadi ke liye saaf aur imaandaar keemat.',
        quote: 'Khushiyaan baantne ka zariya saadhaaran aur bharosemand hona chahiye.',
        quoteAuthor: 'Yaadgaar Wada',
        ctaLabel: 'Create Wedding Event',
      },
      s07: {
        numeral: '07',
        ceremonyMood: 'pheras',
        ceremonyTag: 'Har Rasam Pavitra · Roka se Reception Tak',
        headline: 'YAADGAAR: HAR SHAADI, HAR PAL, HAMESHA KE LIYE.',
        subcopy:
          'Roka, Haldi, Mehendi, Sangeet, Pheras, Vidaai, Griha Pravesh ya Naamkaran — apni parivaarik kahani aaj shuru karein.',
        quote: 'Bandhan sirf do logon ka nahi, do parivaaron ki saari yaadon ka hota hai.',
        quoteAuthor: 'Shubh Kaamna',
        ctaLabel: 'Host Your Ceremony',
      },
    },
    pricing: {
      toggleMonthly: 'Monthly',
      toggleYearly: 'Yearly',
      selectPlan: 'Chunein (Select)',
      selectedNote: 'Selected for your ceremony',
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
      enterCta: 'Enter the Ceremony',
      skipCta: 'Skip Intro',
    },
    sections: {
      s01: {
        numeral: '01',
        ceremonyMood: 'pheras',
        ceremonyTag: 'Live Mandap · Now Streaming',
        headline: "YOU COULDN'T MAKE IT. YOU STILL BELONG.",
        subcopy:
          'Whether across oceans or unable to travel, watch every mantra, varmala, and tear of joy unfold live with the entire family.',
        quote: 'Distance separates cities, never the warmth of a blessing spoken at the sacred fire.',
        quoteAuthor: "Grandmother's Blessing",
        ctaLabel: 'Watch Live',
      },
      s02: {
        numeral: '02',
        ceremonyMood: 'haldi',
        ceremonyTag: 'Real-Time Blessings Wall',
        headline: 'EVERY BLESSING, IN REAL TIME.',
        subcopy:
          'Write heartfelt duas and warm wishes for the bride and groom as Haldi and shehnai fill the courtyard.',
        quote: 'A new home is built as much by spoken blessings as by marigold garlands.',
        quoteAuthor: 'Family Tradition',
        ctaLabel: 'Send a Blessing',
      },
      s03: {
        numeral: '03',
        ceremonyMood: 'mehendi',
        ceremonyTag: 'Forever Archive · Preserved Forever',
        headline: 'THEIR DAY, KEPT FOREVER.',
        subcopy:
          'When the livestream concludes, it becomes a permanent chaptered keepsake across Haldi, Mehendi, Sangeet, Pheras, Vidaai, and Reception.',
        quote: 'Ceremonies pass in hours, yet family laughter belongs to every generation after.',
        quoteAuthor: 'Yaadgaar Keepsake',
        ctaLabel: 'Explore Archive',
      },
      s04: {
        numeral: '04',
        ceremonyMood: 'sangeet',
        ceremonyTag: 'QR on the Shaadi Card',
        headline: 'A QR ON THE CARD. A WORLD AT THE CEREMONY.',
        subcopy:
          'Print one graceful QR code onto your physical invitation card. Guests scan it on their phone to open the live mandap and schedule instantly.',
        quote: 'One ink-stamped emblem that invites the whole world to your courtyard.',
        quoteAuthor: 'Art of Invitation',
        ctaLabel: 'Preview Card & Scan QR',
      },
      s05: {
        numeral: '05',
        ceremonyMood: 'reception',
        ceremonyTag: 'Digital Wedding Photo Book',
        headline: 'YOUR MEMORIES, BOUND LIKE A BOOK.',
        subcopy:
          'Connect Google Drive, Dropbox, or local photos and watch them lay out into a tactile page-flip wedding album ready to download as PDF.',
        quote: 'When photographs are bound in sequence, every ritual breathes anew.',
        quoteAuthor: 'Heirloom Binding',
        ctaLabel: 'Open Photo Book',
      },
      s06: {
        numeral: '06',
        ceremonyMood: 'blessing',
        ceremonyTag: 'Simple, Honest Pricing',
        headline: 'CHOOSE WHAT FITS YOUR FAMILY.',
        subcopy:
          'Keep media in your own Drive for a ₹199 one-time host pass, or let Yaadgaar store your high-definition archive permanently.',
        quote: 'Preserving sacred family milestones should be effortless and transparent.',
        quoteAuthor: 'Yaadgaar Promise',
        ctaLabel: 'Create Wedding Event',
      },
      s07: {
        numeral: '07',
        ceremonyMood: 'pheras',
        ceremonyTag: 'From Roka to Naamkaran',
        headline: 'YAADGAAR: EVERY WEDDING, EVERY MOMENT, FOREVER.',
        subcopy:
          'Built for Roka, Haldi, Mehendi, Sangeet, Pheras, Vidaai, Reception, Griha Pravesh, and Naamkaran.',
        quote: 'A wedding unites not just two souls, but every memory shared by two families.',
        quoteAuthor: 'With Warmth',
        ctaLabel: 'Host Your Ceremony',
      },
    },
    pricing: {
      toggleMonthly: 'Monthly',
      toggleYearly: 'Yearly',
      selectPlan: 'Select Plan',
      selectedNote: 'Selected for your ceremony',
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
      subtitle: 'दूर बैठे अपनों को भी मंडप के पावन दर्शन और उत्सव में शामिल करें।',
      enterCta: 'मंडप में प्रवेश करें',
      skipCta: 'सीधे देखें',
    },
    sections: {
      s01: {
        numeral: '01',
        ceremonyMood: 'pheras',
        ceremonyTag: 'जीवंत प्रसारण · अभी लाइव',
        headline: 'आप नहीं आ पाए? शादी आप तक आएगी।',
        subcopy:
          'चाहे आप विदेश में हों या यात्रा न कर सकें — मंडप का हर मंत्र, हर मुस्कान आपके पास लाइव पहुंचेगी।',
        quote: 'दूरियाँ शहरों की होती हैं, अपनों का आशीर्वाद तो सदा मंडप में साथ होता है।',
        quoteAuthor: 'दादी माँ का आशीष',
        ctaLabel: 'लाइव देखें',
      },
      s02: {
        numeral: '02',
        ceremonyMood: 'haldi',
        ceremonyTag: 'आशीर्वाद दीवार · सच्चे मन से',
        headline: 'दूल्हा-दुल्हन के लिए दुआ लिखो',
        subcopy:
          'हल्दी और शहनाई के बीच, अपना स्नेह भरा संदेश और आशीर्वाद तुरंत समारोह की दीवार पर भेजें।',
        quote: 'जितने हाथों से हल्दी लगती है, उतनी ही दुआओं से नया आँगन सजता है।',
        quoteAuthor: 'पारिवारिक परंपरा',
        ctaLabel: 'आशीर्वाद भेजें',
      },
      s03: {
        numeral: '03',
        ceremonyMood: 'mehendi',
        ceremonyTag: 'सदा के लिए सुरक्षित · अमर संग्रह',
        headline: 'हमेशा के लिए',
        subcopy:
          'समारोह के बाद हर रस्म — हल्दी, मेहंदी, संगीत, फेरे, विदाई और रिसेप्शन — अध्यायों में सदा के लिए सहेजी जाती है।',
        quote: 'समय बीत जाता है, पर फेरों के गीत और अपनों की हँसी पीढ़ियों तक साथ रहती है।',
        quoteAuthor: 'यादगार संग्रह',
        ctaLabel: 'संग्रह देखें',
      },
      s04: {
        numeral: '04',
        ceremonyMood: 'sangeet',
        ceremonyTag: 'निमंत्रण पत्र पर QR कोड',
        headline: 'एक QR कार्ड पर। पूरा परिवार मंडप में।',
        subcopy:
          'शादी के निमंत्रण पत्र पर एक सुंदर QR कोड छपवाएँ। मेहमान स्कैन करके सीधे मंडप और समय-सारिणी देख सकते हैं।',
        quote: 'कागज़ पर अंकित एक छोटा चिन्ह, जो सात समंदर पार से भी अपनों को जोड़ दे।',
        quoteAuthor: 'निमंत्रण कला',
        ctaLabel: 'कार्ड व QR देखें',
      },
      s05: {
        numeral: '05',
        ceremonyMood: 'reception',
        ceremonyTag: 'डिजिटल विवाह एल्बम',
        headline: 'आपकी यादें, एक किताब की तरह।',
        subcopy:
          'Google Drive, Dropbox या गैलरी से तस्वीरें जोड़ें — पन्ना पलटने वाले डिजिटल एल्बम में सहेजें और PDF डाउनलोड करें।',
        quote: 'तस्वीरें जब पन्नों में बंधती हैं, तो हर रस्म फिर से जीवंत हो उठती है।',
        quoteAuthor: 'स्मृति ग्रंथ',
        ctaLabel: 'एल्बम खोलें',
      },
      s06: {
        numeral: '06',
        ceremonyMood: 'blessing',
        ceremonyTag: 'सरल और स्पष्ट योजना',
        headline: 'अपने हिसाब से चुनो',
        subcopy:
          'अपनी तस्वीरें अपने ड्राइव में रखें (₹199 एक बार) या यादगार के सुरक्षित संग्रह का विकल्प चुनें।',
        quote: 'खुशियाँ बाँटने का माध्यम सरल और विश्वसनीय होना चाहिए।',
        quoteAuthor: 'यादगार वचन',
        ctaLabel: 'समारोह बनाएँ',
      },
      s07: {
        numeral: '07',
        ceremonyMood: 'pheras',
        ceremonyTag: 'रोका से नामकरण तक',
        headline: 'यादगार: हर शादी, हर पल, हमेशा के लिए।',
        subcopy:
          'रोका, हल्दी, मेहंदी, संगीत, फेरे, विदाई, गृह प्रवेश या नामकरण — अपने परिवार की कहानी आज सहेजें।',
        quote: 'विवाह केवल दो हृदयों का नहीं, दो परिवारों की स्मृतियों का मिलन है।',
        quoteAuthor: 'शुभकामना',
        ctaLabel: 'अपना समारोह शुरू करें',
      },
    },
    pricing: {
      toggleMonthly: 'मासिक',
      toggleYearly: 'वार्षिक',
      selectPlan: 'चुनें',
      selectedNote: 'आपके समारोह के लिए चयनित',
    },
    footer: {
      contactTitle: 'परिवार सहायता केंद्र',
      contactSubtitle: 'प्रसारण या प्रिंट QR सहायता के लिए लिखें: namaste@yaadgaar.in',
      copyright: '© 2026 यादगार। हर शादी, हर पल, हमेशा के लिए।',
    },
  },
};

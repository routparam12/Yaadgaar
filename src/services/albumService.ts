import { AlbumPhoto, AlbumSpread } from '../types/yaadgaar';

export function buildAlbumSpreads(input: {
  coupleNames: string;
  dateFormatted: string;
  venue: string;
  dedication: string;
  photos: AlbumPhoto[];
}): AlbumSpread[] {
  const spreads: AlbumSpread[] = [
    {
      id: 'spread-cover',
      kind: 'cover',
      title: input.coupleNames,
      subtitle: `${input.dateFormatted} · ${input.venue}`,
      pageNumbers: [1, 2],
    },
    {
      id: 'spread-dedication',
      kind: 'dedication',
      title: 'Samarpit · Dedication',
      dedicationText: input.dedication,
      leftPhoto: input.photos[0],
      pageNumbers: [3, 4],
    },
  ];

  // Pair remaining photos into two-page editorial spreads
  let pageCursor = 5;
  for (let i = 0; i < input.photos.length; i += 2) {
    const left = input.photos[i];
    const right = input.photos[i + 1];
    spreads.push({
      id: `spread-photos-${i}`,
      kind: 'spread',
      title: left ? `${left.ceremony} Memories` : 'Wedding Memories',
      subtitle: right ? `${left.ceremony} & ${right.ceremony}` : left?.ceremony,
      leftPhoto: left,
      rightPhoto: right,
      pageNumbers: [pageCursor, pageCursor + 1],
    });
    pageCursor += 2;
  }

  return spreads;
}

class AlbumService {
  buildSpreads(input: {
    coupleNames: string;
    dateFormatted: string;
    venue: string;
    dedication: string;
    photos: AlbumPhoto[];
  }): AlbumSpread[] {
    return buildAlbumSpreads(input);
  }

  async exportAlbumPdf(input: {
    coupleNames: string;
    dateFormatted: string;
    venue: string;
    dedication: string;
    photos: AlbumPhoto[];
  }): Promise<{ ok: boolean; fileName: string }> {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    // Cover page
    doc.setFillColor(62, 18, 48); // #3E1230 plum
    doc.rect(0, 0, 297, 210, 'F');
    doc.setDrawColor(201, 163, 91); // #C9A35B gold border
    doc.setLineWidth(0.8);
    doc.rect(12, 12, 273, 186);

    doc.setTextColor(201, 163, 91);
    doc.setFontSize(12);
    doc.text('YAADGAAR · HAR SHAADI, HAR PAL, HAMESHA KE LIYE', 148.5, 58, {
      align: 'center',
    });

    doc.setTextColor(246, 235, 221); // #F6EBDD cream
    doc.setFontSize(34);
    doc.text(input.coupleNames, 148.5, 96, { align: 'center' });

    doc.setFontSize(13);
    doc.text(`${input.dateFormatted}  |  ${input.venue}`, 148.5, 114, {
      align: 'center',
    });

    doc.setFontSize(11);
    doc.setTextColor(181, 118, 124);
    doc.text(input.dedication, 148.5, 145, {
      align: 'center',
      maxWidth: 190,
    });

    // Photo spreads
    for (let i = 0; i < input.photos.length; i += 2) {
      doc.addPage();
      doc.setFillColor(246, 235, 221);
      doc.rect(0, 0, 297, 210, 'F');
      doc.setDrawColor(181, 118, 124);
      doc.setLineWidth(0.4);
      doc.rect(10, 10, 277, 190);
      doc.line(148.5, 14, 148.5, 196);

      const pair = [input.photos[i], input.photos[i + 1]];
      for (let side = 0; side < pair.length; side++) {
        const photo = pair[side];
        if (!photo) continue;
        const xBase = side === 0 ? 20 : 158;
        doc.setTextColor(62, 18, 48);
        doc.setFontSize(10);
        doc.text(`${photo.ceremony.toUpperCase()} · ${photo.dateTaken}`, xBase, 26);

        try {
          const imgData = await this.loadImageAsDataUrl(photo.src);
          doc.addImage(imgData, 'JPEG', xBase, 34, 118, 88, undefined, 'FAST');
        } catch {
          doc.setDrawColor(201, 163, 91);
          doc.rect(xBase, 34, 118, 88);
        }

        doc.setFontSize(11);
        doc.setTextColor(62, 18, 48);
        doc.text(photo.caption, xBase, 136, { maxWidth: 118 });
      }
    }

    const safeName = `${input.coupleNames.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-yaadgaar-album.pdf`;
    doc.save(safeName);
    return { ok: true, fileName: safeName };
  }

  private loadImageAsDataUrl(src: string): Promise<string> {
    if (src.startsWith('data:')) return Promise.resolve(src);
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 800;
        canvas.height = img.naturalHeight || 600;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('No 2d context'));
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.86));
      };
      img.onerror = reject;
      img.src = src;
    });
  }
}

export const albumService = new AlbumService();

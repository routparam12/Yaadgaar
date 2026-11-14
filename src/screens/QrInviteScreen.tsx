import React, { useEffect, useRef, useState } from 'react';
import {
  Camera,
  CheckCircle2,
  Download,
  Printer,
  QrCode,
  ScanLine,
  StopCircle,
} from 'lucide-react';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { WeddingEvent } from '../types/yaadgaar';
import { formatInvitationPipeDate } from '../services/streamService';
import { MughalArchFrame } from '../components/MughalArchFrame';

interface QrInviteScreenProps {
  event: WeddingEvent;
  onResolveEventCode: (rawPayload: string) => WeddingEvent | null;
  onEnterEvent: (evt: WeddingEvent) => void;
}

export const QrInviteScreen: React.FC<QrInviteScreenProps> = ({
  event,
  onResolveEventCode,
  onEnterEvent,
}) => {
  const [qrSvg, setQrSvg] = useState<string>('');
  const [qrPngUrl, setQrPngUrl] = useState<string>('');
  const [manualCode, setManualCode] = useState(event.code);
  const [scanStatus, setScanStatus] = useState<string | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number>(0);

  const joinUrl = `https://yaadgaar.in/join/${event.code}`;
  const pipeDate = formatInvitationPipeDate(event.dateFormatted);

  useEffect(() => {
    setManualCode(event.code);
    QRCode.toString(joinUrl, {
      type: 'svg',
      margin: 1,
      width: 220,
      color: { dark: '#1E1E1E', light: '#FAF6F0' },
    })
      .then(setQrSvg)
      .catch(() => {});

    QRCode.toDataURL(joinUrl, {
      margin: 2,
      width: 512,
      color: { dark: '#1E1E1E', light: '#FAF6F0' },
    })
      .then(setQrPngUrl)
      .catch(() => {});
  }, [event.code, joinUrl]);

  const stopCamera = () => {
    cancelAnimationFrame(rafRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const startCameraScanner = async () => {
    setScanError(null);
    setScanStatus(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setScanError(
        'Camera access is unavailable in this browser. Use the Event Code field below.',
      );
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;
      setCameraActive(true);
      window.setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
          scanFrameLoop();
        }
      }, 100);
    } catch {
      setScanError(
        'Camera permission was denied or no camera was detected. You can enter the printed Event Code below instead.',
      );
      setCameraActive(false);
    }
  };

  const scanFrameLoop = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !streamRef.current) return;

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth || 320;
      canvas.height = video.videoHeight || 240;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const decoded = jsQR(imageData.data, imageData.width, imageData.height);
        if (decoded?.data) {
          const found = onResolveEventCode(decoded.data);
          if (found) {
            stopCamera();
            setScanStatus(`QR matched: ${found.coupleNames}. Opening mandap...`);
            window.setTimeout(() => onEnterEvent(found), 600);
            return;
          }
        }
      }
    }
    rafRef.current = requestAnimationFrame(scanFrameLoop);
  };

  const handleDownloadSvg = () => {
    if (!qrSvg) return;
    const blob = new Blob([qrSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.code.toLowerCase()}-yaadgaar-qr.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPng = () => {
    if (!qrPngUrl) return;
    const a = document.createElement('a');
    a.href = qrPngUrl;
    a.download = `${event.code.toLowerCase()}-yaadgaar-qr.png`;
    a.click();
  };

  const handleManualResolve = (e: React.FormEvent) => {
    e.preventDefault();
    setScanError(null);
    const found = onResolveEventCode(manualCode);
    if (!found) {
      setScanError(
        `No ceremony found for "${manualCode}". Try ${event.code} or RIDHIMA-AMAN-26.`,
      );
      return;
    }
    setScanStatus(`Ceremony found: ${found.coupleNames}! Opening live mandap...`);
    onEnterEvent(found);
  };

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 py-8 sm:py-12">
      <div className="no-print border-b border-[#3E1230]/15 pb-6">
        <p className="font-ui text-[13px] sm:text-[14px] text-[#8A2E52] font-semibold">
          Shagun Card &amp; In-App Scanner
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl font-semibold tracking-[-0.01em] leading-[1.08] text-[#3E1230]">
          Card par ek chhota QR. Poora parivaar mandap mein.
        </h1>
        <p className="mt-2 max-w-2xl font-ui text-base sm:text-lg text-[#4A2A3E]">
          Download the custom QR code as PNG or SVG for your printed shaadi card, or test scanning an invitation right inside Yaadgaar.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Printable Shaadi Card Preview + Downloads */}
        <div className="lg:col-span-6 space-y-5">
          <div className="print-card-only">
            <MughalArchFrame variant="shaadi-card" accentColor="#E8467C">
              <div className="bg-[#FAF6F0] p-7 sm:p-10 text-center paper-grain">
                <p className="font-display text-sm sm:text-base uppercase tracking-[0.22em] text-[#3E1230]">
                  SAVE
                </p>
                <p className="font-couple text-2xl sm:text-3xl text-[#1E1E1E] -my-1">
                  the
                </p>
                <p className="font-editorial text-sm sm:text-base uppercase tracking-[0.22em] text-[#1E1E1E]">
                  DATE
                </p>

                <p className="mt-5 font-couple text-4xl sm:text-5xl text-[#1E1E1E] tracking-wide">
                  {event.coupleNames}
                </p>

                <p className="mt-4 font-editorial text-xs sm:text-sm uppercase tracking-[0.2em] text-[#1E1E1E] flex items-center justify-center gap-2.5">
                  <span>{pipeDate.month}</span>
                  <span aria-hidden="true" className="text-[#1E1E1E]/60">|</span>
                  <span className="text-base sm:text-lg font-medium">{pipeDate.day}</span>
                  <span aria-hidden="true" className="text-[#1E1E1E]/60">|</span>
                  <span>{pipeDate.year}</span>
                </p>

                <p className="mt-2 font-editorial text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#1E1E1E]/85">
                  {event.venue} · {event.city}
                </p>

                <div className="my-6 mx-auto flex h-40 w-40 items-center justify-center border border-[#C9A35B]/70 bg-[#FAF6F0] p-2.5">
                  {qrSvg ? (
                    <div
                      className="h-full w-full [&>svg]:h-full [&>svg]:w-full"
                      dangerouslySetInnerHTML={{ __html: qrSvg }}
                      aria-label={`Printable invitation QR code for ${event.coupleNames}`}
                    />
                  ) : (
                    <QrCode className="h-24 w-24 text-[#1E1E1E]" />
                  )}
                </div>

                <p className="font-editorial italic text-sm sm:text-base text-[#1E1E1E]/85">
                  Formal Invitation to follow · Scan to join live
                </p>
                <p className="mt-1 font-editorial text-xs uppercase tracking-[0.18em] text-[#3E1230]/70">
                  {event.code}
                </p>
              </div>
            </MughalArchFrame>
          </div>

          {/* Print & Export Actions */}
          <div className="no-print font-ui flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={handleDownloadPng}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 bg-[#3E1230] text-[#FAF6F0] text-sm font-medium hover:bg-[#571A43] cursor-pointer whitespace-nowrap shrink-0"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Download PNG</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadSvg}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 border-[1.5px] border-[#3E1230] bg-transparent text-[#3E1230] text-sm font-medium hover:bg-[#3E1230]/8 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Download SVG</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 border-[1.5px] border-[#3E1230] bg-transparent text-[#3E1230] text-sm font-medium hover:bg-[#3E1230]/8 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Printer className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Print Card Snippet</span>
            </button>
          </div>
        </div>

        {/* Right: Camera QR Scanner + Accessible Event Code Fallback */}
        <div className="no-print lg:col-span-6 rounded-2xl border border-[#3E1230]/15 bg-white p-6 space-y-6">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-[#3E1230]">
              In-App QR Scanner
            </h2>
            <p className="mt-1 text-xs text-[#3E1230]/75">
              Point your phone camera at any Yaadgaar shaadi card, or enter the printed Event Code below.
            </p>
          </div>

          {/* Camera Preview Area */}
          <div className="relative aspect-[4/3] overflow-hidden border border-[#3E1230]/25 bg-[#3E1230] text-[#F6EBDD] flex flex-col items-center justify-center p-6 text-center">
            {cameraActive ? (
              <>
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="relative z-10 pointer-events-none h-44 w-44 border-2 border-[#C9A35B]" />
                <button
                  type="button"
                  onClick={stopCamera}
                  className="relative z-10 mt-4 inline-flex items-center gap-2 bg-[#3E1230]/90 px-4 py-2 text-xs uppercase tracking-wider text-[#F6EBDD] border border-[#C9A35B] cursor-pointer"
                >
                  <StopCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Stop Camera</span>
                </button>
              </>
            ) : (
              <div className="space-y-4">
                <ScanLine
                  className="mx-auto h-12 w-12 text-[#C9A35B]"
                  aria-hidden="true"
                />
                <p className="text-sm text-[#F6EBDD]/85 max-w-xs mx-auto">
                  Start camera scanning to read a printed invitation QR code in real time.
                </p>
                <div className="font-ui flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    type="button"
                    onClick={startCameraScanner}
                    className="inline-flex items-center gap-2 rounded-full bg-[#C9A35B] text-[#3E1230] px-5 py-2 text-[13px] font-semibold hover:bg-[#D7B36C] cursor-pointer"
                  >
                    <Camera className="h-4 w-4" aria-hidden="true" />
                    <span>Open Camera Scanner</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const matched = onResolveEventCode(joinUrl);
                      if (matched) {
                        setScanStatus(`Simulated scan matched ${matched.coupleNames}`);
                        onEnterEvent(matched);
                      }
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-[#F6EBDD]/45 px-4 py-2 text-[13px] font-medium text-[#F6EBDD] hover:border-[#C9A35B] cursor-pointer"
                  >
                    <span>Simulate QR Scan</span>
                  </button>
                </div>
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
          </div>

          {/* Accessible Text Alternative */}
          <form
            onSubmit={handleManualResolve}
            className="border-t border-[#B5767C]/30 pt-5 space-y-3"
          >
            <label
              htmlFor="event-code-input"
              className="font-ui block text-xs uppercase tracking-[0.14em] font-medium text-[#3E1230]"
            >
              Accessible Event Code Entry (Alternative to Camera)
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="event-code-input"
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="Enter code e.g. NAYANA-AARAV-26"
                className="flex-1 rounded-full border border-[#B5767C]/50 bg-[#FFFDF9] px-4 py-2 text-sm font-mono text-[#3E1230] focus:border-[#3E1230] focus:outline-none"
              />
              <button
                type="submit"
                className="font-ui rounded-full px-5 py-2 bg-[#3E1230] text-[#FAF6F0] text-sm font-medium hover:bg-[#571A43] cursor-pointer whitespace-nowrap shrink-0"
              >
                Open Ceremony
              </button>
            </div>

            {scanStatus && (
              <p
                role="status"
                className="inline-flex items-center gap-1.5 text-xs text-[#3E7B3A] font-medium"
              >
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                <span>{scanStatus}</span>
              </p>
            )}
            {scanError && (
              <p role="alert" className="text-xs text-[#D9482B] font-medium">
                {scanError}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

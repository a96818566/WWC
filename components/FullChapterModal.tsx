import React from 'react';
import { Chapter, BrandingConfig } from '../types';
import { generateChapterPDF } from '../utils/pdfGenerator';
import { BrandLogo } from './BrandLogo';
import { 
  X, 
  Download, 
  FileText, 
  CheckCircle2, 
  FileDown, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Folder, 
  FolderOpen, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Copy,
  ExternalLink
} from 'lucide-react';

interface FullChapterModalProps {
  chapter: Chapter;
  branding: BrandingConfig;
  clientName: string;
  initialConceptTab?: string;
  onClose: () => void;
}

export const FullChapterModal: React.FC<FullChapterModalProps> = ({
  chapter,
  branding,
  clientName,
  initialConceptTab,
  onClose,
}) => {
  const isStoryboard =
    chapter.id === 'storyboards' ||
    chapter.number === '06' ||
    chapter.id === 'art-talent' ||
    chapter.number === '07';
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [activeFolderId, setActiveFolderId] = React.useState<string>(
    isStoryboard
      ? 'all'
      : (chapter.folders && chapter.folders.length > 0 ? chapter.folders[0].id : '')
  );
  const [activeConceptTabId, setActiveConceptTabId] = React.useState<string>(
    initialConceptTab || (chapter.conceptTabs && chapter.conceptTabs.length > 0 ? chapter.conceptTabs[0].id : 'all')
  );
  const [enlargedIndex, setEnlargedIndex] = React.useState<number | null>(null);
  const [zoomScale, setZoomScale] = React.useState<number>(1);
  const [panPosition, setPanPosition] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [copiedContract, setCopiedContract] = React.useState(false);
  const dragStartRef = React.useRef<{ startX: number; startY: number; initialPanX: number; initialPanY: number }>({
    startX: 0,
    startY: 0,
    initialPanX: 0,
    initialPanY: 0,
  });

  const handleCopyContract = () => {
    if (chapter.fullText) {
      navigator.clipboard.writeText(chapter.fullText);
      setCopiedContract(true);
      setTimeout(() => setCopiedContract(false), 2500);
    }
  };

  // Determine active concept tab content
  const activeConceptTab = chapter.conceptTabs?.find((t) => t.id === activeConceptTabId) || chapter.conceptTabs?.[0];
  const activeConceptContent = activeConceptTab ? activeConceptTab.content : chapter.fullText;

  // Determine active list of images based on active folder or default galleryImages
  const currentFolder = activeFolderId === 'all'
    ? null
    : (chapter.folders?.find((f) => f.id === activeFolderId) || (chapter.folders && chapter.folders.length > 0 ? chapter.folders[0] : null));
  const galleryList = currentFolder
    ? currentFolder.images
    : (chapter.folders && chapter.folders.length > 0
      ? chapter.folders.flatMap((f) => f.images)
      : (chapter.galleryImages || []));
  const enlargedImage = enlargedIndex !== null && galleryList[enlargedIndex] ? galleryList[enlargedIndex] : null;

  const renderFormattedText = (rawText: string) => {
    if (!rawText) return null;
    const lines = rawText.split('\n');

    return (
      <div className="space-y-2">
        {lines.map((line, idx) => {
          const trimmed = line.trim();

          // Separator line: e.g. "___________________" or "===================" or "..................."
          if (/^([_=.-])\1{4,}$/.test(trimmed)) {
            return (
              <div key={idx} className="my-6 py-2">
                <div className="h-1 bg-gradient-to-r from-zinc-800 via-[#b8860b] to-zinc-800 rounded-full shadow-sm w-full opacity-90"></div>
              </div>
            );
          }

          // Final Concepts Main Banner Header
          const isFinalConceptsMainHeader = /^(FINAL CONCEPTS\s*—|FINAL CONCEPTS$)/i.test(trimmed);
          if (isFinalConceptsMainHeader) {
            return (
              <div
                key={idx}
                className="mt-6 mb-4 p-4 sm:p-5 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white rounded-2xl border border-amber-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </span>
                  <div>
                    <span className="text-[10px] font-extrabold text-[#c69a53] uppercase tracking-widest block">
                      Client Selected Execution
                    </span>
                    <h3 className="font-extrabold text-lg sm:text-xl text-amber-300 font-heading">
                      {trimmed}
                    </h3>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-black bg-gradient-to-r from-amber-400 to-amber-300 px-3 py-1 rounded-full shadow-sm">
                  ⭐ Final Recommendation
                </span>
              </div>
            );
          }

          // Final Concept Titles: e.g. "FINAL CONCEPT 1:", "FINAL CONCEPT 2:", etc.
          const isFinalConceptCard = /^(FINAL CONCEPT\s+[0-9]+[A-Z]?)/i.test(trimmed);
          if (isFinalConceptCard) {
            return (
              <div
                key={idx}
                className="mt-7 mb-3 p-4 bg-gradient-to-r from-[#1c2024] to-[#252a30] text-white rounded-xl border-l-4 border-amber-400 border-y border-r border-zinc-700/80 shadow-lg flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-amber-400 flex-shrink-0 animate-pulse"></span>
                  <span className="font-extrabold text-base sm:text-lg tracking-wide uppercase text-amber-200">
                    {trimmed}
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300/80 bg-black/40 px-2.5 py-1 rounded-md border border-amber-400/20 hidden sm:inline">
                  Approved Route
                </span>
              </div>
            );
          }

          // Standard Concept Titles: e.g. "Concept 1", "Concept 1A", "Concept 2", "Concept 3", "Concept 3A", "CONCEPT 1:", "CONCEPT 3A:", etc.
          const isConceptTitle = /^(CONCEPT\s+([0-9]+[A-Z]?)|Concept\s+([0-9]+[A-Z]?))/i.test(trimmed);
          if (isConceptTitle) {
            return (
              <div
                key={idx}
                className="mt-6 mb-3 p-3.5 bg-[#1c2024] text-white rounded-xl border border-zinc-700/80 shadow-md flex items-center gap-3"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#c69a53] flex-shrink-0 animate-pulse"></span>
                <span className="font-extrabold text-base sm:text-lg tracking-wide uppercase text-amber-300">
                  {trimmed}
                </span>
              </div>
            );
          }

          // Major Route / Chapter Banner
          const isRouteHeader = /^((WORLDWIDE CABLES|WWC)\s*[:—–-]\s*TVC ROUTE|TVC ROUTE [0-9]|CAMPAIGN FILM CONCEPTS|PRODUCTION & EXECUTION MASTERPLAN|CAMPAIGN ROLLOUT)/i.test(trimmed);
          if (isRouteHeader) {
            return (
              <div
                key={idx}
                className="mt-7 mb-3 px-4 py-2.5 bg-zinc-200/90 text-zinc-900 rounded-lg border-l-4 border-[#b8860b] font-bold text-sm sm:text-base tracking-tight uppercase"
              >
                {trimmed}
              </div>
            );
          }

          // Subheaders, Section Headers, Jingle Options & Scene Markers
          const isSubhead = /^(OPEN|THE NISHANA|THE CONFESSION|THE LESSON|THE PRODUCT STORY|SPLIT SCREEN|WORLDWIDE REVEAL|PRODUCT PROOF|THE COSTUME|THE GURU|THE EXPERT TEST|THE PHELWAN TEST|THE Pehlwan ARRIVAL|\(THE ARRIVAL\)|RESOLUTION|THE PROBLEM|THE TWIST|\(Twist\)|WWC REVEAL|\(WWC REVEAL\)|THE SECOND BATTERY|JINGLE|COMPLETE JINGLE|COMPLETE MASTER JINGLE|Jingle & Dialogue Options|& Dialogue Options|Ending Dialogues|Option-\s*[A-C]|THE ENERGY BUILDS|RETURN TO THE WORKSHOP|PRODUCT REVEAL|END FRAME|END SLIDE|End Logo|End Tail|CORE IDEA|CORE IDEA & HOOK|THE MASTER SCRIPT|THE FILM|PART 01|PART 02|PRODUCT SCOPE|CURRENT PRESENTATION|FUTURE EXPANSION|LIGHTS OUT|EXECUTIVE CREATIVE SUMMARY|NARRATIVE HIGHLIGHTS|SEGMENT BREAKDOWN|PRODUCTION & EXECUTION)\b/i.test(trimmed);
          if (isSubhead) {
            const isOptionOrJingle = /^(Jingle & Dialogue Options|& Dialogue Options|Option-\s*[A-C]|Ending Dialogues)/i.test(trimmed);
            return (
              <div
                key={idx}
                className={`font-bold text-sm sm:text-base mt-5 mb-2 flex items-center gap-2 ${
                  isOptionOrJingle
                    ? 'text-amber-800 bg-amber-50/80 border border-amber-300/80 px-3.5 py-1.5 rounded-lg w-fit'
                    : 'text-[#b8860b]'
                }`}
              >
                {isOptionOrJingle && <Sparkles className="w-4 h-4 text-[#b8860b]" />}
                <span>{trimmed}</span>
              </div>
            );
          }

          // Empty lines
          if (!trimmed) {
            return <div key={idx} className="h-2"></div>;
          }

          // Check if line contains Urdu/Arabic characters
          const containsUrdu = /[\u0600-\u06FF]/.test(line);

          // Dialogue Speaker lines (e.g. "POLICE THAKUR: بیٹری", "Thakur:", "Phelwan I.T.:", "FARMER:", "Interview Boy (excited):", etc.)
          const speakerMatch = line.match(/^([A-Za-z0-9.\s&—/()–-]+):\s*(.*)$/);
          if (speakerMatch && speakerMatch[1].length <= 35 && !speakerMatch[1].toLowerCase().includes('http')) {
            const speaker = speakerMatch[1].trim();
            const dialogue = speakerMatch[2].trim();

            if (!dialogue) {
              return (
                <div key={idx} className="mt-3 mb-1 text-left">
                  <span className="font-bold text-xs uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300/80 px-2.5 py-0.5 rounded-md inline-flex items-center gap-1 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    {speaker}:
                  </span>
                </div>
              );
            }

            const isDialogueUrdu = /[\u0600-\u06FF]/.test(dialogue);
            return (
              <div key={idx} className="my-2 pl-3 border-l-2 border-amber-400 text-left">
                <span className="font-bold text-zinc-900 mr-2 text-xs uppercase tracking-wide bg-zinc-200/80 px-2 py-0.5 rounded text-[#b8860b] inline-block">
                  {speaker}:
                </span>
                <span className={`${isDialogueUrdu ? 'font-semibold text-zinc-950 text-base sm:text-lg inline-block' : 'text-zinc-800 font-medium'}`}>
                  {dialogue}
                </span>
              </div>
            );
          }

          // Regular narrative / Urdu poetry line (aligned vertically with English on the left)
          if (containsUrdu) {
            return (
              <div key={idx} className="text-left py-0.5 pl-3 border-l-2 border-amber-300/30">
                <p className="text-zinc-950 leading-loose text-base sm:text-lg font-medium tracking-normal">
                  {line}
                </p>
              </div>
            );
          }

          // Regular narrative line (Left-aligned)
          return (
            <div key={idx} className="text-left py-0.5">
              <p className="text-zinc-700 leading-relaxed text-sm sm:text-base">
                {line}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (enlargedIndex === null || galleryList.length <= 1) return;
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
    setEnlargedIndex((prev) => (prev !== null ? (prev - 1 + galleryList.length) % galleryList.length : 0));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (enlargedIndex === null || galleryList.length <= 1) return;
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
    setEnlargedIndex((prev) => (prev !== null ? (prev + 1) % galleryList.length : 0));
  };

  const handleZoomIn = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoomScale((prev) => Math.min(prev + 0.35, 3.5));
  };

  const handleZoomOut = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoomScale((prev) => {
      const next = Math.max(prev - 0.35, 1.0);
      if (next === 1.0) setPanPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  };

  // Mouse & Touch Dragging Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale <= 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialPanX: panPosition.x,
      initialPanY: panPosition.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomScale <= 1) return;
    const deltaX = e.clientX - dragStartRef.current.startX;
    const deltaY = e.clientY - dragStartRef.current.startY;
    setPanPosition({
      x: dragStartRef.current.initialPanX + deltaX,
      y: dragStartRef.current.initialPanY + deltaY,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoomScale <= 1 || e.touches.length !== 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      initialPanX: panPosition.x,
      initialPanY: panPosition.y,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || zoomScale <= 1 || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStartRef.current.startX;
    const deltaY = e.touches[0].clientY - dragStartRef.current.startY;
    setPanPosition({
      x: dragStartRef.current.initialPanX + deltaX,
      y: dragStartRef.current.initialPanY + deltaY,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Keyboard navigation for lightbox (Left, Right, Escape, +, -)
  React.useEffect(() => {
    if (enlargedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        setEnlargedIndex(null);
        setZoomScale(1);
      } else if (e.key === '+' || e.key === '=') {
        setZoomScale((prev) => Math.min(prev + 0.35, 3.0));
      } else if (e.key === '-' || e.key === '_') {
        setZoomScale((prev) => Math.max(prev - 0.35, 1.0));
      } else if (e.key === '0') {
        setZoomScale(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enlargedIndex, galleryList.length]);

  const handleDownload = async () => {
    setIsGenerating(true);
    // Pass along active gallery images or active concept tab to make sure exported PDF matches the current view
    const isConceptTabActive = chapter.conceptTabs && activeConceptTab && activeConceptTab.id !== 'all';
    const exportChapter: Chapter = {
      ...chapter,
      title: isConceptTabActive
        ? `${chapter.title} — ${activeConceptTab.name}`
        : currentFolder
        ? `${chapter.title} — ${currentFolder.name}`
        : chapter.title,
      fullText: isConceptTabActive ? activeConceptTab.content : (chapter.fullText || ''),
      pdfFullText: isConceptTabActive ? undefined : chapter.pdfFullText,
      galleryImages: galleryList,
      folders: currentFolder ? [currentFolder] : chapter.folders
    };
    await generateChapterPDF(exportChapter, branding, clientName);
    setIsGenerating(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-zinc-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/80">
          <div className="flex items-center gap-3">
            <BrandLogo src={branding.blackLogo} alt="Nasharz" className="h-6 w-auto object-contain" fallbackColor="#1a1c1e" />
            <span className="h-3.5 w-px bg-zinc-300"></span>
            <div>
              <span className="text-[10px] font-bold text-[#c69a53] uppercase tracking-widest block">
                Chapter {chapter.number}
              </span>
              <h3 className="text-base font-bold text-zinc-900 leading-tight">
                {chapter.title} — <span className="text-zinc-500 font-medium">{chapter.category}</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="px-4 py-2 bg-zinc-900 hover:bg-black text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isGenerating ? (
                <span>Generating PDF...</span>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-full transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-zinc-800">
          {/* Summary Box */}
          <div className="bg-[#faf8f5] border-l-4 border-[#c69a53] p-5 rounded-r-xl">
            <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-1">
              Executive Summary
            </div>
            <p className="text-base font-semibold text-zinc-900 leading-relaxed italic">
              "
              {chapter.summary.split(/(\([^)]+\))/g).map((part, idx) => {
                if (part.startsWith('(') && part.endsWith(')')) {
                  return (
                    <span
                      key={idx}
                      className="font-semibold not-italic text-amber-900 bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-xs tracking-normal inline-flex items-center gap-1.5 ml-1.5 align-middle font-sans shadow-2xs"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block animate-pulse"></span>
                      {part}
                    </span>
                  );
                }
                return <span key={idx}>{part}</span>;
              })}
              "
            </p>
          </div>

          {/* Visual Banner */}
          {chapter.visualImage && (
            <div className="relative rounded-2xl overflow-hidden w-full aspect-[16/9] sm:aspect-[21/9] min-h-[210px] sm:min-h-[260px] max-h-[380px] bg-zinc-950 shadow-md">
              <img
                src={chapter.visualImage}
                alt={chapter.title}
                className="w-full h-full object-cover"
                style={{
                  objectPosition:
                    chapter.visualImagePosition ||
                    (chapter.id === 'market'
                      ? 'center 12%'
                      : chapter.id === 'big-idea'
                      ? 'center 15%'
                      : 'center center')
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end items-end text-right p-5 sm:p-7 pointer-events-none">
                <span className="w-6 h-0.5 bg-[#b8860b] rounded-full mb-1.5 self-end"></span>
                <p className="text-white text-xl sm:text-2xl font-extrabold font-heading tracking-tight">
                  {chapter.title}
                </p>
              </div>
            </div>
          )}

          {/* Full Text Details & Custom Rich Views for Market Chapter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 border-b border-zinc-100 pb-2 flex items-center justify-between">
              <span>Full Chapter Documentation</span>
              {chapter.title === 'Market' && (
                <span className="text-[10px] text-[#c69a53] font-semibold bg-[#c69a53]/10 px-2.5 py-0.5 rounded-full border border-[#c69a53]/20">
                  Interactive Market Matrix
                </span>
              )}
            </h4>

            {chapter.id === 'brief' ? (
              <div className="space-y-6 my-4">

                {/* Header Card */}
                <div className="bg-zinc-900 text-white p-5 sm:p-6 rounded-2xl border border-zinc-800 shadow-sm space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#c69a53]">
                        Worldwide Cables: TVC Creative Brief
                      </span>
                      <h5 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                        Naam Se Nahi, Kaam Se Pehchaan
                      </h5>
                    </div>
                    <span className="text-xs text-zinc-300 bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700">
                      Draft v1 • November 2026
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-zinc-800 text-xs text-zinc-300">
                    <div><strong className="text-[#c69a53]">Lead talent:</strong> Javed Sheikh (signed by client)</div>
                    <div><strong className="text-[#c69a53]">Prepared by:</strong> Nasharz Films | Craft Advertising</div>
                    <div className="sm:col-span-2"><strong className="text-[#c69a53]">Status:</strong> Draft v1, November 2026. Confidential, for review only.</div>
                  </div>
                </div>

                {/* 1 & 2: Executive Overview + Strategic Assignment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2.5">
                    <h5 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                      1. Executive overview and objectives
                    </h5>
                    <p className="text-xs text-zinc-700 leading-relaxed">
                      Worldwide Cables (WWC), Lahore, has built a credible product range, competitive value and institutional approvals. What it lacks is mental availability: most buyers, electricians and dealers still reach for the names they already know.
                    </p>
                    <p className="text-xs font-semibold text-zinc-900">The task is WWC's first national television idea. It must:</p>
                    <ul className="space-y-1 text-xs text-zinc-700 leading-relaxed list-disc pl-4">
                      <li>make a young brand feel established, dependable and unmistakably Pakistani;</li>
                      <li>turn quality, safety and performance into a culturally memorable story;</li>
                      <li>create distinctive brand assets WWC can own for years (the line, the character device, the split-screen proof);</li>
                      <li>shift the buying question from "Which cable do you recommend?" to "Give me Worldwide Cables."</li>
                    </ul>
                    <p className="text-xs text-zinc-700 leading-relaxed">
                      This is not a launch announcement. It is the start of building a popular Pakistani cable brand.
                    </p>
                    <div className="p-3 bg-white border border-zinc-200 rounded-xl text-[11px] text-zinc-700 space-y-1">
                      <div><strong>Current state:</strong> quality, value, institutional approvals, availability.</div>
                      <div><strong>Desired state:</strong> quality leadership, customer preference, trade recommendation, loyalty.</div>
                      <div><strong>First TV campaign goals:</strong> awareness, differentiation, trust, and customers asking dealers and electricians for WWC by name.</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-5 bg-zinc-900 text-white border border-zinc-800 rounded-2xl space-y-2.5">
                      <h5 className="text-sm font-bold text-[#c69a53] uppercase tracking-wider">
                        2. Strategic assignment
                      </h5>
                      <p className="text-xs font-semibold text-white">
                        Create awareness for WWC. Make WWC trusted. Make customers ask for WWC.
                      </p>
                      <ul className="space-y-1.5 text-xs text-zinc-200 leading-relaxed list-disc pl-4">
                        <li>Electrician or dealer recommends WWC, so the customer asks for WWC.</li>
                        <li>WWC becomes the default trusted choice, not one more box on the shelf.</li>
                        <li>Turn WWC's "no legacy" position into a virtue: in a market built on big names, WWC asks people to judge the work, not the name.</li>
                      </ul>
                    </div>

                    <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2">
                      <h5 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                        4. The communications challenge
                      </h5>
                      <p className="text-xs font-bold text-[#b8860b]">
                        Built (approvals, range, product) → Known → Trusted → Asked for → Recommended by the trade
                      </p>
                      <p className="text-xs text-zinc-700 leading-relaxed">
                        <strong>The insight:</strong> cable is a blind purchase. It disappears behind walls and ceilings, so buyers fall back on the only signal they have: the name. WWC's argument is that the name tells you nothing about what is inside. Quality, performance and real value do.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Brand layer and direction */}
                <div className="space-y-3">
                  <h5 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                    3. Brand layer and direction
                  </h5>
                  <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-zinc-900 text-white">
                          <th className="p-3 font-bold border-b border-zinc-800 w-44">Layer</th>
                          <th className="p-3 font-bold border-b border-zinc-800">Direction</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700">
                        <tr><td className="p-2.5 font-bold text-zinc-900">Category</td><td className="p-2.5">Wires and cables: building wire, fire alarm, solar PV, LAN, CCTV, optical fibre</td></tr>
                        <tr className="bg-zinc-50/70"><td className="p-2.5 font-bold text-zinc-900">Functional core</td><td className="p-2.5">Safe, durable, pure-copper performance</td></tr>
                        <tr><td className="p-2.5 font-bold text-zinc-900">Commercial advantage</td><td className="p-2.5">Premium safety technology (LSZH) at PVC-level pricing, subject to client confirmation</td></tr>
                        <tr className="bg-zinc-50/70"><td className="p-2.5 font-bold text-zinc-900">Market advantage</td><td className="p-2.5">Institutional approvals and credibility with developers and industry</td></tr>
                        <tr><td className="p-2.5 font-bold text-zinc-900">Emotional pay-off</td><td className="p-2.5">Peace of mind: what is behind my wall cannot hurt my family</td></tr>
                        <tr className="bg-zinc-50/70"><td className="p-2.5 font-bold text-zinc-900">Brand character</td><td className="p-2.5">Confident, dependable, hardworking, contemporary, with a sense of humour</td></tr>
                        <tr><td className="p-2.5 font-bold text-[#b8860b]">Campaign line</td><td className="p-2.5 font-bold text-zinc-900">Naam Se Nahi, Kaam Se Pehchaan</td></tr>
                        <tr className="bg-zinc-50/70"><td className="p-2.5 font-bold text-[#b8860b]">Support line</td><td className="p-2.5 font-bold text-zinc-900">Aap ka Hifazti Current</td></tr>
                        <tr><td className="p-2.5 font-bold text-zinc-900">Core VO line</td><td className="p-2.5 italic">Cable jis mein current taqat ban kar dorre, khauf ban kar nahi</td></tr>
                        <tr className="bg-zinc-50/70"><td className="p-2.5 font-bold text-zinc-900">Desired response</td><td className="p-2.5 font-semibold text-zinc-900">"Cable? Give me Worldwide Cables."</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 5. Brand ambassador: Javed Sheikh (signed) */}
                <div className="space-y-3">
                  <h5 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                    5. Brand ambassador: Javed Sheikh (signed)
                  </h5>
                  <p className="text-xs text-zinc-700 leading-relaxed">
                    <strong>Why he works:</strong> mass trust across SEC A to D, credibility with an older decision-maker audience, comic range, and a voice that can carry an authoritative line like "main samjhauta nahi karta."
                  </p>
                  <p className="text-xs text-zinc-700">
                    <strong>How we use him:</strong> one man, many characters, one punchline.
                  </p>
                  <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-zinc-900 text-white">
                          <th className="p-3 font-bold border-b border-zinc-800 w-32">Film</th>
                          <th className="p-3 font-bold border-b border-zinc-800">Character</th>
                          <th className="p-3 font-bold border-b border-zinc-800">Class reached</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700">
                        <tr><td className="p-2.5 font-bold text-[#b8860b]">Nishana</td><td className="p-2.5">Chaudhry Sb, flamboyant retired general and zamindar</td><td className="p-2.5">Rural, landowners, mass</td></tr>
                        <tr className="bg-zinc-50/70"><td className="p-2.5 font-bold text-[#b8860b]">Guru Ji</td><td className="p-2.5">Spiritual master in a palace drawing room</td><td className="p-2.5">Middle-class homeowners</td></tr>
                        <tr><td className="p-2.5 font-bold text-[#b8860b]">Chamkila</td><td className="p-2.5">Flashy boutique owner with a bill-paper costume for his electrician</td><td className="p-2.5">Traders, urban homeowners, shop owners</td></tr>
                        <tr className="bg-zinc-50/70"><td className="p-2.5 font-bold text-[#b8860b]">Client film</td><td className="p-2.5">Javed Sheikh as himself, a market walk-through</td><td className="p-2.5">All classes, hero film</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-zinc-700 bg-zinc-50 border border-zinc-200 rounded-xl p-3">
                    <strong>Guardrail:</strong> he never boasts. He teaches, questions and corrects, which keeps the tone confident without being boastful.
                  </p>
                </div>

                {/* 6. Target Audience + 7. Client Script (Urdu) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2.5">
                    <h5 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                      6. Target audience
                    </h5>
                    <ul className="space-y-2 text-xs text-zinc-700 leading-relaxed list-disc pl-4">
                      <li><strong>Primary:</strong> SEC A, B, C, D males, 20 to 55. The decision-maker for home wiring, shop and office fit-outs, and renovations, or the person who delegates the job to an electrician.</li>
                      <li><strong>Secondary:</strong> electricians and mistris, contractors, dealers and retailers, developers, builders and consultants.</li>
                    </ul>
                    <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-950">
                      <strong>Note for the client:</strong> women strongly influence home-safety decisions. The Guru Ji and family-safety executions can be cut to speak to them in digital.
                    </div>
                  </div>

                  <div className="p-5 bg-amber-50/60 border border-amber-300/70 rounded-2xl space-y-2.5">
                    <h5 className="text-sm font-bold text-amber-950 uppercase tracking-wider">
                      7. Client script (Urdu)
                    </h5>
                    <div className="text-right text-zinc-950 text-sm sm:text-base font-semibold leading-relaxed space-y-0.5" dir="rtl">
                      <p className="text-amber-900 font-bold">جاوید شیخ:</p>
                      <p>"مارکیٹ میں بڑے بڑے نام ہیں...</p>
                      <p>کوئی اپنے نام پر بیچتا ہے، کوئی اپنی شہرت پر۔</p>
                      <p>لیکن میرا ایک سوال ہے...</p>
                      <p>نام بڑا ہونے سے کیبل بھی بہتر ہو جاتی ہے؟</p>
                      <p>میں نام نہیں دیکھتا۔ میں دیکھتا ہوں کوالٹی، پرفارمنس اور پیسے کی اصل ویلیو۔</p>
                      <p>کیونکہ جب بات ہو گھر کی سیفٹی اور سالوں کے اعتماد کی...</p>
                      <p>تو میں سمجھوتہ نہیں کرتا!</p>
                      <p>میرا انتخاب ہے...</p>
                      <p>ورلڈ وائیڈ کیبلز!</p>
                      <p className="text-amber-900 font-bold">نام سے نہیں، کام سے پہچان!"</p>
                    </div>
                  </div>
                </div>

                {/* Observations on the script */}
                <div className="p-4 sm:p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2">
                  <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider block">
                    Observations on the script:
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-700 leading-relaxed list-disc pl-4">
                    <li>It is a strong brand-belief film: a question, a refusal and a pledge. It does not show a problem, so it needs visual proof.</li>
                    <li>It is about 40 seconds read at a measured pace. A 25-second cut means trimming to: market line, the question, "main naam nahi dekhta", "samjhauta nahi", brand name, line.</li>
                    <li>It works as the hero film. The three comedy films are the series that dramatise the same idea.</li>
                    <li>Storyboard for this script (3 frames: showroom tracking shot, box-weighing close-up, cut-cable macro) is already drawn in the A4 sheet format. Remaining frames (04 to 07) follow the client's own shot list.</li>
                  </ul>
                </div>

                {/* 8. Reference analysis: Aditya Birla Ultravolt */}
                <div className="space-y-3">
                  <h5 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                    8. Reference analysis: Aditya Birla Ultravolt
                  </h5>
                  <p className="text-xs text-zinc-700 leading-relaxed">
                    <strong>What the client said:</strong> Ultravolt is a reference because it is a cable brand with a big name behind it, while WWC has no such legacy.
                  </p>
                  <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1.5 text-xs text-zinc-700">
                    <strong className="text-zinc-900 block">What the coverage shows:</strong>
                    <ul className="space-y-1 list-disc pl-4 leading-relaxed">
                      <li>Ultravolt is itself a new brand. It was launched in September 2026 by the Aditya Birla Group, housed under UltraTech Cement, with a Rs 1,800 crore investment, a new plant in Gujarat and Shah Rukh Khan as ambassador.</li>
                      <li>It does not rely on a cable legacy. It borrows parent credibility, a celebrity, a one-line emotional promise ("Power, ek zimmedari") and hard proof (TruePure copper, 99.97% purity, sourced from the group's own Hindalco).</li>
                      <li>It pairs the campaign with trade visibility (6,000+ touchpoints) and an electrician training programme.</li>
                      <li>The campaign was created by Ogilvy, with brand identity by Interbrand.</li>
                    </ul>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-zinc-900 text-white">
                          <th className="p-3 font-bold border-b border-zinc-800 w-56">Ultravolt move</th>
                          <th className="p-3 font-bold border-b border-zinc-800">WWC equivalent</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700">
                        <tr><td className="p-2.5 font-semibold text-zinc-900">Parent-group legacy</td><td className="p-2.5">No parent legacy. Replace with institutional proof: DHA Lahore and DHA Burki approvals, PEC certificate, MES, UET and C&W clients, TÜV Austria partnership</td></tr>
                        <tr className="bg-zinc-50/70"><td className="p-2.5 font-semibold text-zinc-900">Celebrity ambassador</td><td className="p-2.5">Javed Sheikh</td></tr>
                        <tr><td className="p-2.5 font-semibold text-zinc-900">One emotional line</td><td className="p-2.5">Naam Se Nahi, Kaam Se Pehchaan</td></tr>
                        <tr className="bg-zinc-50/70"><td className="p-2.5 font-semibold text-zinc-900">Copper purity proof (99.97%)</td><td className="p-2.5">99.99% pure copper (site claim) and LSZH, which most competitors do not lead with</td></tr>
                        <tr><td className="p-2.5 font-semibold text-zinc-900">Electrician programme</td><td className="p-2.5">Opportunity: a WWC electrician loyalty or demo programme, tied to the "Give me WWC" trade goal</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 bg-zinc-900 text-white border border-zinc-800 rounded-2xl text-xs text-zinc-200 leading-relaxed">
                    <strong className="text-[#c69a53]">Where we deliberately differ:</strong> Ultravolt owns "responsibility" (zimmedari). WWC should not enter that territory. WWC's territory is judging by performance, not by name, which suits a challenger brand and is difficult for a legacy brand to copy without undermining itself.
                  </div>
                </div>

                {/* 9 & 10: Creative Concept Cues + Tone of Voice */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2.5">
                    <h5 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                      9. Creative concept cues
                    </h5>
                    <ol className="space-y-2 text-xs text-zinc-700 leading-relaxed list-decimal pl-4">
                      <li><strong>The invisible protector:</strong> safety lives behind walls and above ceilings. Make the unseen visible (x-ray ceiling cutaway, split-screen proof).</li>
                      <li><strong>The moment of truth:</strong> a short circuit, smoke, a shock of a bill. Tension resolves when WWC is the choice.</li>
                      <li><strong>The Javed Sheikh device:</strong> one man, many costumes, one lesson. Distinctive, repeatable, easy to cut into short digital content.</li>
                    </ol>
                  </div>

                  <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2.5">
                    <h5 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                      10. Tone of voice
                    </h5>
                    <ul className="space-y-2 text-xs text-zinc-700 leading-relaxed list-disc pl-4">
                      <li><strong className="text-emerald-800">Yes:</strong> confident, genuinely Pakistani, human, mass, technically credible, warm, playful.</li>
                      <li><strong className="text-red-800">No:</strong> boastful, stereotyped, industrial, cheap, technical for the sake of technical, noisy, imported-looking, fear-mongering, sentimental.</li>
                    </ul>
                    <p className="text-xs text-zinc-600 pt-1 border-t border-zinc-200">
                      <strong>Note:</strong> comedy must make the competitor choice look foolish, not the audience. Never show injury or real tragedy.
                    </p>
                  </div>
                </div>

                {/* 11. Visual cues and film architecture */}
                <div className="space-y-3">
                  <h5 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                    11. Visual cues and film architecture
                  </h5>
                  <p className="text-xs text-zinc-700">
                    <strong>Visual memory:</strong> the cut-open cable (copper strands), the LSZH vs PVC split screen, the Worldwide pack shot with coils.
                  </p>
                  <p className="text-xs font-semibold text-zinc-900">25-second architecture (series films):</p>
                  <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-zinc-900 text-white">
                          <th className="p-3 font-bold border-b border-zinc-800 w-36">Beat</th>
                          <th className="p-3 font-bold border-b border-zinc-800 w-24">Time</th>
                          <th className="p-3 font-bold border-b border-zinc-800">Content</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700">
                        <tr><td className="p-2.5 font-bold text-zinc-900">Interruption</td><td className="p-2.5 font-bold text-[#b8860b]">0 to 5 s</td><td className="p-2.5">Unmistakable opening (rifle, smoking karahi, bill suit)</td></tr>
                        <tr className="bg-zinc-50/70"><td className="p-2.5 font-bold text-zinc-900">Hook and tension</td><td className="p-2.5 font-bold text-[#b8860b]">5 to 12 s</td><td className="p-2.5">Cheap choice made visible and funny</td></tr>
                        <tr><td className="p-2.5 font-bold text-zinc-900">Lesson</td><td className="p-2.5 font-bold text-[#b8860b]">12 to 17 s</td><td className="p-2.5">Javed Sheikh: judge by the work, not the name</td></tr>
                        <tr className="bg-zinc-50/70"><td className="p-2.5 font-bold text-zinc-900">Product proof</td><td className="p-2.5 font-bold text-[#b8860b]">17 to 22 s</td><td className="p-2.5">Ceiling cutaway, PVC vs LSZH split screen, copper macro</td></tr>
                        <tr><td className="p-2.5 font-bold text-zinc-900">Close</td><td className="p-2.5 font-bold text-[#b8860b]">22 to 25 s</td><td className="p-2.5">Pack shot, VO line, "Pehchaan naam se nahi, kaam se", logo</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-zinc-600">
                    <strong>Storyboard style:</strong> hand-drawn black and white pencil and charcoal, A4 sheets with the Nasharz header and footer, three frames per row set.
                  </p>
                </div>

                {/* 12. Films in the campaign */}
                <div className="space-y-3">
                  <h5 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                    12. Films in the campaign
                  </h5>
                  <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-zinc-900 text-white">
                          <th className="p-3 font-bold border-b border-zinc-800 w-10">#</th>
                          <th className="p-3 font-bold border-b border-zinc-800">Film</th>
                          <th className="p-3 font-bold border-b border-zinc-800">Product focus</th>
                          <th className="p-3 font-bold border-b border-zinc-800">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700">
                        <tr><td className="p-2.5 font-bold text-[#b8860b]">H</td><td className="p-2.5 font-semibold text-zinc-900">Client script: market walk-through</td><td className="p-2.5">Brand belief, whole range</td><td className="p-2.5">Storyboard frames 01 to 03 drawn</td></tr>
                        <tr className="bg-zinc-50/70"><td className="p-2.5 font-bold text-[#b8860b]">1</td><td className="p-2.5 font-semibold text-zinc-900">Nishana (Chaudhry Sb)</td><td className="p-2.5">Building wire, LSZH</td><td className="p-2.5">Script and 3 board pages done</td></tr>
                        <tr><td className="p-2.5 font-bold text-[#b8860b]">2</td><td className="p-2.5 font-semibold text-zinc-900">Guru Ji</td><td className="p-2.5">LSZH</td><td className="p-2.5">Script and 3 board pages done</td></tr>
                        <tr className="bg-zinc-50/70"><td className="p-2.5 font-bold text-[#b8860b]">3</td><td className="p-2.5 font-semibold text-zinc-900">Chamkila (Bill-Couture)</td><td className="p-2.5">LSZH and pure copper</td><td className="p-2.5">Script done. Boards, talent card and location pending</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 13. Segmentation and need states */}
                <div className="space-y-3">
                  <h5 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                    13. Segmentation and need states
                  </h5>
                  <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-zinc-900 text-white">
                          <th className="p-3 font-bold border-b border-zinc-800">Segment</th>
                          <th className="p-3 font-bold border-b border-zinc-800">Need state</th>
                          <th className="p-3 font-bold border-b border-zinc-800">Product</th>
                          <th className="p-3 font-bold border-b border-zinc-800">Reason to believe</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700">
                        <tr><td className="p-2.5 font-semibold text-zinc-900">Homeowners</td><td className="p-2.5">"What is inside my walls must not hurt my family"</td><td className="p-2.5">LSZH building wire</td><td className="p-2.5">Low smoke, zero halogen, flame retardant</td></tr>
                        <tr className="bg-zinc-50/70"><td className="p-2.5 font-semibold text-zinc-900">Shop and office owners (SME)</td><td className="p-2.5">"I can't afford a fire or an outage"</td><td className="p-2.5">LSZH, fire alarm</td><td className="p-2.5">Fire alarm cable to BS 7629, LSZH option</td></tr>
                        <tr><td className="p-2.5 font-semibold text-zinc-900">Developers, builders, institutions</td><td className="p-2.5">"I need approved, auditable material"</td><td className="p-2.5">Full range</td><td className="p-2.5">DHA Lahore and DHA Burki approvals, PEC, MES, UET, C&amp;W</td></tr>
                        <tr className="bg-zinc-50/70"><td className="p-2.5 font-semibold text-zinc-900">Solar owners</td><td className="p-2.5">"My panels need cable that lasts the sun"</td><td className="p-2.5">Solar PV cable</td><td className="p-2.5">Tinned copper, UV resistant, XLPO to 120 degrees C, TÜV certified</td></tr>
                        <tr><td className="p-2.5 font-semibold text-zinc-900">Security and IT users</td><td className="p-2.5">"My camera and network must be clear and reliable"</td><td className="p-2.5">CCTV RG-59, LAN</td><td className="p-2.5">Sub-line: Hifazti Connection (these carry signal, not current)</td></tr>
                        <tr className="bg-zinc-50/70"><td className="p-2.5 font-semibold text-zinc-900">Rural and agri users</td><td className="p-2.5">"My tubewell must not blow"</td><td className="p-2.5">Building and flexible wire</td><td className="p-2.5">Pure copper conductor</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 14. Reason-to-believe and claims register */}
                <div className="space-y-3">
                  <h5 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                    14. Reason-to-believe and claims register
                  </h5>
                  <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-zinc-900 text-white">
                          <th className="p-3 font-bold border-b border-zinc-800">Claim</th>
                          <th className="p-3 font-bold border-b border-zinc-800">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700">
                        <tr><td className="p-2.5 font-semibold text-zinc-900">LSZH: low smoke, zero halogen, flame retardant</td><td className="p-2.5">Supported by site and standards (IEC 60754, 61034, 60332)</td></tr>
                        <tr className="bg-zinc-50/70"><td className="p-2.5 font-semibold text-zinc-900">99.99% pure copper</td><td className="p-2.5">Stated on the site and product pack. Keep a lab certificate on file</td></tr>
                        <tr><td className="p-2.5 font-semibold text-zinc-900">DHA Lahore and DHA Burki approvals, PEC certificate, TÜV Austria partnership</td><td className="p-2.5">Stated on the site. Use the exact wording and logos the client approves</td></tr>
                        <tr className="bg-zinc-50/70"><td className="p-2.5 font-semibold text-zinc-900">Solar PV: UV resistant, XLPO 120 degrees C, TÜV certified</td><td className="p-2.5">Stated on the site</td></tr>
                        <tr><td className="p-2.5 font-semibold text-zinc-900">"Na aag, na dhuan, na zehrili gas"</td><td className="p-2.5">Client wording. Keep "Low Smoke Zero Halogen" on screen. Test reports must be ready</td></tr>
                        <tr className="bg-zinc-50/70"><td className="p-2.5 font-semibold text-zinc-900">"Same price as PVC"</td><td className="p-2.5">Not on the site. Needs written confirmation</td></tr>
                        <tr><td className="p-2.5 font-semibold text-zinc-900">Lower bills</td><td className="p-2.5">Not claimed. Joke only</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 15 & 16: Deliverables + Success Measures */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2.5">
                    <h5 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                      15. Deliverables
                    </h5>
                    <ul className="space-y-1.5 text-xs text-zinc-700 leading-relaxed list-disc pl-4">
                      <li>Strategic thought and cracked insight</li>
                      <li>Key frames and storyboards (A4 sheets, 9 frames per film)</li>
                      <li>Scripts (Roman Urdu and Urdu) and end frames</li>
                      <li>Talent cards and location art direction for each film</li>
                      <li>Brand ambassador costs and detailed production cost quotes</li>
                    </ul>
                    <p className="text-xs text-zinc-600 pt-2 border-t border-zinc-200 leading-relaxed">
                      Also planned, once concepts are locked: market research (Pakistan cable market, same structure as the Alaska chapter), brand foundation, Big Idea territories, and the marketing strategy for the first phase.
                    </p>
                  </div>

                  <div className="p-5 bg-zinc-900 text-white border border-zinc-800 rounded-2xl space-y-2.5">
                    <h5 className="text-sm font-bold text-[#c69a53] uppercase tracking-wider">
                      16. Success measures
                    </h5>
                    <ul className="space-y-1.5 text-xs text-zinc-200 leading-relaxed list-disc pl-4">
                      <li>Aided and unaided brand awareness among target homeowners, shop owners and electricians</li>
                      <li>Dealer and electrician recommendation: "Which cable?" answered with "Worldwide"</li>
                      <li>Trade enquiries and WhatsApp or website leads from campaign cutdowns</li>
                      <li>Digital: views and completion on 10-second and 6-second cutdowns</li>
                    </ul>
                  </div>
                </div>

                {/* 17. Open questions for the client */}
                <div className="p-5 bg-amber-50/60 border border-amber-300/70 rounded-2xl space-y-2.5">
                  <h5 className="text-sm font-bold text-amber-950 uppercase tracking-wider">
                    17. Open questions for the client
                  </h5>
                  <ol className="space-y-1.5 text-xs text-zinc-800 leading-relaxed list-decimal pl-4">
                    <li>Confirm cables only, or are batteries also part of this campaign?</li>
                    <li>Contract scope for Javed Sheikh: TV, digital, print, OOH, term and territory.</li>
                    <li>Written confirmation of price parity with PVC and access to LSZH and copper test reports.</li>
                    <li>Approval of the name "Chamkila" and a fictional bill header (no real utility branding).</li>
                    <li>Appetite for a firearm-prop gag (Nishana) on Pakistani broadcast.</li>
                    <li>Which part of the Ultravolt page do they want us to echo: tone, production value, or the celebrity-plus-proof structure?</li>
                    <li>Is a trade programme (electrician demos, training or rewards) in scope?</li>
                  </ol>
                </div>

              </div>
            ) : chapter.title === 'Market' ? (
              <div className="space-y-6 my-4">
                
                {/* 1. Worldwide Cables Overview & Proof Points */}
                <div className="bg-zinc-900 text-white p-5 sm:p-6 rounded-2xl border border-zinc-800 shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#c69a53]">
                        Brand Background & Proof Points
                      </span>
                      <h5 className="text-lg font-bold text-white font-heading">
                        Worldwide Cables — Two Decades & Solar Approvals
                      </h5>
                    </div>
                    <span className="text-xs text-zinc-300 bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700">
                      Source: enggpost
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-zinc-200 leading-relaxed">
                    Worldwide Cables has been around for two decades. It started with tape-recorder leads, then moved into battery cables as UPS demand grew (per its CEO’s interview). It now also makes ethernet cables and LSZH cables. The strongest proof point I found is that its solar cables were approved for the CM Punjab Free Solar Program and the Lahore Electric Bus Terminal project. That fits your plan to lead with solar.
                  </p>
                </div>

                {/* 2. Competitor Landscape */}
                <div className="space-y-3">
                  <h5 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                    Competitor landscape
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {/* Fast Cables */}
                    <div className="p-4 sm:p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <h6 className="text-sm font-extrabold text-zinc-900">
                          Fast Cables (Lahore, founded 1985)
                        </h6>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#b8860b] bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md shrink-0">
                          Most Active
                        </span>
                      </div>
                      <p className="text-xs font-medium text-zinc-700">
                        Probably the most active brand in the category.
                      </p>
                      <ul className="space-y-1.5 text-xs text-zinc-600 leading-relaxed list-disc pl-4">
                        <li>
                          Its recent campaign “Bina Bataey, Bina Jataey, Sath Nibhaey” is an emotional, purpose-driven approach that sells care and unity rather than product. <span className="text-zinc-400">(propakistani)</span>
                        </li>
                        <li>
                          It has sponsored Islamabad United in the PSL for eight consecutive seasons. <span className="text-zinc-400">(isbunited)</span>
                        </li>
                        <li>
                          It runs a consumer authentication and prize scheme called Fast Tasdeeq. <span className="text-zinc-400">(sproxil)</span>
                        </li>
                        <li>
                          Its positioning is “Real Quality”. <span className="text-zinc-400">(propakistani)</span>
                        </li>
                      </ul>
                    </div>

                    {/* Pakistan Cables */}
                    <div className="p-4 sm:p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <h6 className="text-sm font-extrabold text-zinc-900">
                          Pakistan Cables (founded 1953)
                        </h6>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 bg-zinc-200/70 border border-zinc-300 px-2 py-0.5 rounded-md shrink-0">
                          Heritage Brand
                        </span>
                      </div>
                      <p className="text-xs font-medium text-zinc-700">
                        This is the heritage brand.
                      </p>
                      <ul className="space-y-1.5 text-xs text-zinc-600 leading-relaxed list-disc pl-4">
                        <li>
                          It is the oldest listed cable maker on the PSX, with the largest geographic footprint and a two-decade electrician loyalty club. <span className="text-zinc-400">(pakistancables)</span>
                        </li>
                        <li>
                          Its creative has been insight-led. One TVC was praised because it had no celebrity and focused purely on a relatable insight. <span className="text-zinc-400">(dawn)</span>
                        </li>
                        <li>
                          It has also run a counterfeit-awareness campaign, “Is Your Cable Authentic?”, promoting SMS verification, and a direct “Choose Pakistan Cables” comparison campaign. <span className="text-zinc-400">(adsoftheworld)</span>
                        </li>
                      </ul>
                    </div>

                    {/* Newage Cables */}
                    <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1.5">
                      <h6 className="text-sm font-extrabold text-zinc-900">
                        Newage Cables (Lahore, 1956)
                      </h6>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        It positions on scale and certification: the largest manufacturer in Pakistan and the first in its category with ISO 9000. <span className="text-zinc-400">(dev)</span>
                      </p>
                    </div>

                    {/* Smaller and regional players */}
                    <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1.5">
                      <h6 className="text-sm font-extrabold text-zinc-900">
                        Smaller and regional players
                      </h6>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Coppergat leans on a portfolio of large projects such as CPEC, Kartarpur and the Punjab Assembly. Burq Cables sells on heritage since 1975. <span className="text-zinc-400">(ensun / google)</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Market Context */}
                <div className="space-y-3">
                  <h5 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                    Market context
                  </h5>
                  <div className="space-y-2.5">
                    <div className="p-4 bg-amber-50/50 border border-amber-200/70 rounded-xl text-xs text-zinc-700 leading-relaxed">
                      <strong className="text-zinc-900">Solar is the growth story.</strong> One report estimates 51 GW of solar deployed by March 2026, against 54 GW of module imports. <span className="text-zinc-500">(nukta)</span>
                    </div>
                    <div className="p-4 bg-amber-50/50 border border-amber-200/70 rounded-xl text-xs text-zinc-700 leading-relaxed">
                      <strong className="text-zinc-900">Quality is a live consumer fear.</strong> Coverage notes substandard equipment flooding the market, and one report says cheap solar installations use low-quality cable, including copper-coated aluminum, which causes power loss. Solar buyers are already worried about what’s inside the wire. <span className="text-zinc-500">(thefridaytimes / loksujag)</span>
                    </div>
                    <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-700 leading-relaxed">
                      <strong className="text-zinc-900">Celebrity cable ads are established in India.</strong> Examples include KEI with Irrfan Khan, Finolex with Kartik Aaryan and Kiara Advani and KEI again with Rashmika Mandanna. In the Pakistani sources I found, none of the major cable brands used a celebrity, though that isn’t exhaustive. <span className="text-zinc-500">(KEI Wires + Leo Burnett India’s campaign stars Irrfan Khan as the neighbourhood’s ‘lifeline’ +2)</span>
                    </div>
                  </div>
                </div>

                {/* 4. What this means for the brief (my read) */}
                <div className="p-5 bg-zinc-900 text-white rounded-2xl border border-zinc-800 space-y-3">
                  <h5 className="text-sm font-bold text-[#c69a53] uppercase tracking-wider">
                    What this means for the brief (my read)
                  </h5>
                  <ul className="space-y-2.5 text-xs text-zinc-200 leading-relaxed list-disc pl-4">
                    <li>
                      Everyone claims “quality” and “trust,” so it has stopped meaning anything. Fast, Pakistan Cables and Newage all use versions of it. The client’s script, “Naam se nahi, kaam se pehchaan,” makes the same claim with a famous face. The cable cross-section in the storyboard is what turns it into proof.
                    </li>
                    <li>
                      Fast owns emotion and sport, and Pakistan Cables owns heritage and electricians. Neither owns solar safety or “what’s inside the wire.” That is open ground for Worldwide, backed by its government solar approvals.
                    </li>
                    <li>
                      Authentication is already claimed by Fast and Pakistan Cables, so avoid a counterfeit-verification message.
                    </li>
                    <li>
                      Javed Sheikh is a differentiator in this category, but only if the ads show proof.
                    </li>
                    <li>
                      Check overlap with Waves. Its long-running line is “Waves ka Tou Naam Hi Kaafi”. It’s a different category, but “naam” is the opposite of Worldwide’s argument, so the script’s “naam” line could be heard against it. <span className="text-zinc-400">(dawn)</span>
                    </li>
                  </ul>
                </div>

                {/* 5. Gaps to fill with the client */}
                <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2.5">
                  <h5 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                    Gaps to fill with the client
                  </h5>
                  <ul className="space-y-1.5 text-xs text-zinc-700 leading-relaxed list-disc pl-4">
                    <li>Their current customers: contractors, electricians, solar installers or homeowners.</li>
                    <li>Prices relative to Fast and Pakistan Cables.</li>
                    <li>Their media budget and channels.</li>
                    <li>Any past ads or social accounts.</li>
                    <li>Whether they have test certificates or standards approvals we can show on camera.</li>
                  </ul>
                </div>

              </div>
            ) : chapter.id === 'big-idea' ? (
              <div className="space-y-6 my-4">

                {/* 1. Hero Big Idea Card */}
                <div className="bg-zinc-900 text-white p-5 sm:p-6 rounded-2xl border border-zinc-800 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#c69a53]">
                        The Big Idea
                      </span>
                      <h5 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                        “Hifazti Current” <span className="text-[#c69a53] font-semibold">(حفاظتی کرنٹ)</span>
                      </h5>
                    </div>
                    <span className="text-xs text-zinc-300 bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700">
                      Naam se nahi, kaam se pehchaan
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs sm:text-[13px] text-zinc-200 leading-relaxed">
                    <p>
                      <strong className="text-[#c69a53]">One line:</strong> Javed Sheikh plays the loudest, most colourful characters in Pakistan. Each one is stuck in a problem, and each one learns that the answer is not a big name but the wire behind the wall. LSZH technology comes at the PVC price, and the current runs as power, not fear.
                    </p>
                    <p>
                      <strong className="text-[#c69a53]">The irony that drives it:</strong> Javed Sheikh’s characters are themselves “big names”: a guru, a chaudhary, a fashion designer. Each of them is dazzled by show and status. The film makes the point that you shouldn’t buy a cable on name, and it makes it through the biggest name on screen. This is your own tagline, “Naam se nahi, kaam se pehchaan,” played for comedy.
                    </p>
                  </div>
                </div>

                {/* 2. The Three Strategic Lines */}
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                      The three strategic lines
                    </h5>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Every film proves one thing and then lands on the same three lines:
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#b8860b] block mb-1">01 • Proof</span>
                      <p className="text-xs font-semibold text-zinc-900 leading-relaxed">
                        PVC vs LSZH technology, same price. This is the proof.
                      </p>
                    </div>
                    <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#b8860b] block mb-1">02 • Feeling</span>
                      <p className="text-xs font-semibold text-zinc-900 leading-relaxed">
                        No fear, just real power. This is the feeling.
                      </p>
                    </div>
                    <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#b8860b] block mb-1">03 • Sign-off</span>
                      <p className="text-xs font-semibold text-zinc-900 leading-relaxed">
                        No big name, see the results first, then the Hifazti Current. This is the sign-off.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Film Structure Table + Locked End Sequence */}
                <div className="space-y-3">
                  <h5 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                    The structure of every 20–25 second film
                  </h5>
                  <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-zinc-900 text-white">
                          <th className="p-3 font-bold border-b border-zinc-800 w-28">Time</th>
                          <th className="p-3 font-bold border-b border-zinc-800">Beat</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700">
                        <tr>
                          <td className="p-3 font-bold text-[#b8860b] whitespace-nowrap">0–5 sec</td>
                          <td className="p-3">A colourful character, a colourful setting and a funny problem</td>
                        </tr>
                        <tr className="bg-zinc-50/70">
                          <td className="p-3 font-bold text-[#b8860b] whitespace-nowrap">5–12 sec</td>
                          <td className="p-3">The side-by-side: PVC vs LSZH, with the same price tag on both</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-[#b8860b] whitespace-nowrap">12–20 sec</td>
                          <td className="p-3">Voice-over and a brand pack shot, with the character delighted and no one frightened</td>
                        </tr>
                        <tr className="bg-zinc-50/70">
                          <td className="p-3 font-bold text-[#b8860b] whitespace-nowrap">20–25 sec</td>
                          <td className="p-3">Locked end sequence, identical in every film</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Locked Urdu End Sequence */}
                  <div className="p-5 bg-amber-50/60 border border-amber-300/70 rounded-2xl space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 block">
                      The locked end sequence (Urdu, exactly as you wrote it):
                    </span>
                    <div className="space-y-1.5 text-right text-zinc-950 text-base sm:text-lg font-semibold leading-loose" dir="rtl">
                      <p>اب پی وی سی کی قیمت میں ایل ایس زیڈ ایچ ٹیکنالوجی، نہ آگ، نہ دھواں اور نہ ہی زہریلی گیس۔</p>
                      <p>کیبل جس میں کرنٹ طاقت بن کر دوڑے، خوف بن کر نہیں...</p>
                      <p>ورلڈ وائیڈ کیبلز۔ آپ کا حفاظتی کرنٹ۔</p>
                      <p className="text-[#92400e] font-bold">پہچان نام سے نہیں، کام سے!</p>
                    </div>
                    <p className="text-xs text-zinc-600 pt-2 border-t border-amber-200/70">
                      The timings above are a guide, and the full VO needs about 12 seconds on its own. The character beats before it have to stay very short to fit.
                    </p>
                  </div>
                </div>

                {/* 4. The Three Films */}
                <div className="space-y-3">
                  <h5 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                    The three films
                  </h5>
                  <div className="grid grid-cols-1 gap-3.5">
                    <div className="p-4 sm:p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2">
                      <h6 className="text-sm font-extrabold text-zinc-900">
                        Film 1: The Guru <span className="text-zinc-500 font-medium">(orange robes, palace)</span>
                      </h6>
                      <ul className="space-y-1.5 text-xs text-zinc-700 leading-relaxed">
                        <li><strong className="text-zinc-900">The problem:</strong> An electrician comes to the guru for wisdom, and the guru teaches by demonstration.</li>
                        <li><strong className="text-zinc-900">The proof:</strong> He holds up two cable pieces and burns them. The PVC one gives a theatrical cloud of thick smoke, so thick the electrician flaps his hands and coughs. The LSZH one gives none. Both pieces carry the same price tag.</li>
                        <li><strong className="text-zinc-900">The punchline:</strong> The guru gestures calmly at the clear air, sets down the Worldwide box and says the line.</li>
                      </ul>
                    </div>

                    <div className="p-4 sm:p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2">
                      <h6 className="text-sm font-extrabold text-zinc-900">
                        Film 2: The Costume Designer <span className="text-zinc-500 font-medium">(pink tracksuit, boutique)</span>
                      </h6>
                      <ul className="space-y-1.5 text-xs text-zinc-700 leading-relaxed">
                        <li><strong className="text-zinc-900">The problem:</strong> He waves a huge electricity bill and complains about everything that costs more and more.</li>
                        <li><strong className="text-zinc-900">The connection to the product:</strong> The bill is the expensive pain. The cable is the one thing in his shop that costs no extra. He gets the LSZH technology at the PVC price.</li>
                        <li><strong className="text-zinc-900">The side-by-side:</strong> He holds up the two cables with their price tags and shows they match.</li>
                      </ul>
                    </div>

                    <div className="p-4 sm:p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2">
                      <h6 className="text-sm font-extrabold text-zinc-900">
                        Film 3: The Chaudhary <span className="text-zinc-500 font-medium">(pink jacket, courtyard)</span>
                      </h6>
                      <ul className="space-y-1.5 text-xs text-zinc-700 leading-relaxed">
                        <li><strong className="text-zinc-900">The problem:</strong> His tubewell wiring, and a house full of people who all swear by different big brands.</li>
                        <li><strong className="text-zinc-900">The proof:</strong> He stages the PVC vs LSZH comparison in the courtyard, then dismisses the big-name arguments with a flourish.</li>
                        <li><strong className="text-zinc-900">The punchline:</strong> The Worldwide box and the end sequence.</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-600 italic">
                    More characters can slot into the same template later for the other segments you mentioned (malls, corporate projects), as long as each one keeps the same three-line landing.
                  </p>
                </div>

                {/* 5. Tone Rules & Pre-Shoot Checks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-zinc-900 text-white rounded-2xl border border-zinc-800 space-y-2.5">
                    <h5 className="text-sm font-bold text-[#c69a53] uppercase tracking-wider">
                      Tone rules (colourful, alive, not haunting)
                    </h5>
                    <ul className="space-y-2 text-xs text-zinc-200 leading-relaxed list-disc pl-4">
                      <li>Saturated palettes, warm light and generous comedy.</li>
                      <li>The smoke is a comic prop. Nobody is ever frightened, and the cable is the calm answer.</li>
                      <li>The LSZH side is bright and clean, never a “before and after” horror.</li>
                    </ul>
                  </div>

                  <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2.5">
                    <h5 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                      Three things to check before shooting
                    </h5>
                    <ul className="space-y-2 text-xs text-zinc-700 leading-relaxed list-disc pl-4">
                      <li>
                        <strong className="text-zinc-900">"نہ آگ" (no fire):</strong> LSZH cables are typically described as low-smoke and flame-retardant rather than fireproof. Confirm the wording against your test certificates before the voice-over is locked, since Pakistani advertising clearances may ask you to substantiate it.
                      </li>
                      <li>
                        <strong className="text-zinc-900">Same price as PVC:</strong> This is the central claim, so the client has to be able to stand behind it. It matches what the CEO said in their interview, that LSZH options would come without an extra price burden for customers. <span className="text-zinc-400">(enggpost)</span>
                      </li>
                      <li>
                        <strong className="text-zinc-900">References in your images:</strong> The boutique bill shows KE Electricity branding, so use a fictional utility on the real shoot. The shotgun in the chaudhary frame is a comic prop but sits awkwardly with “no fear,” and it may need broadcast clearance.
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            ) : chapter.id === 'foundation' ? (
              <div className="space-y-6 my-4">

                {/* Header Banner + 5. Brand Idea */}
                <div className="bg-zinc-900 text-white p-5 sm:p-6 rounded-2xl border border-zinc-800 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#c69a53]">
                        Worldwide Cables: Brand Foundation
                      </span>
                      <h5 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                        5. The brand idea: <span className="text-[#c69a53]">حفاظتی کرنٹ (Hifazti Current)</span>
                      </h5>
                    </div>
                    <span className="text-xs text-zinc-300 bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700">
                      Single Campaign Thought
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-zinc-200 leading-relaxed">
                    This is the single thought behind every film. It is both the product promise and the sign-off line.
                  </p>
                </div>

                {/* 1-4: Category Problem, Brand Truth, Consumer Insight, Positioning */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="p-4 sm:p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#b8860b] block">
                      1. The category problem
                    </span>
                    <p className="text-xs text-zinc-700 leading-relaxed">
                      Every major cable brand says “quality” and “trust.” Fast Cables stands on “Real Quality” and Pakistan Cables on heritage and the largest footprint, while Newage claims the largest manufacturer title. Buyers are being asked to choose on a name. No one in the category has made a safety technology the point. <span className="text-zinc-400">(propakistani.pk +2)</span>
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 bg-amber-50/60 border border-amber-200/80 rounded-2xl space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 block">
                      2. The brand truth
                    </span>
                    <p className="text-xs font-semibold text-zinc-900 leading-relaxed">
                      Worldwide Cables gives you LSZH technology at the price of ordinary PVC. The safer cable doesn’t cost more.
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#b8860b] block">
                      3. The consumer insight
                    </span>
                    <p className="text-xs text-zinc-700 leading-relaxed">
                      People assume the safer, better cable is the premium one, so they default to the big name or the cheapest. They never think about what’s inside the wire until something goes wrong.
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 bg-zinc-900 text-white border border-zinc-800 rounded-2xl space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#c69a53] block">
                      4. The positioning statement
                    </span>
                    <p className="text-xs text-zinc-200 leading-relaxed">
                      For anyone who buys cable on a name or a price, Worldwide Cables is the one that puts LSZH safety technology at the PVC price, so current runs as power, never as fear. Judge the results first, and the name comes after.
                    </p>
                  </div>
                </div>

                {/* 6. The three-line message hierarchy */}
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                      6. The three-line message hierarchy
                    </h5>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      The locked hierarchy, in order of priority:
                    </p>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-zinc-900 text-white">
                          <th className="p-3 font-bold border-b border-zinc-800 w-28">Level</th>
                          <th className="p-3 font-bold border-b border-zinc-800">Line</th>
                          <th className="p-3 font-bold border-b border-zinc-800">Role</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700">
                        <tr>
                          <td className="p-3 font-bold text-[#b8860b] whitespace-nowrap">Proof</td>
                          <td className="p-3 font-semibold text-zinc-900">PVC vs LSZH technology, same price</td>
                          <td className="p-3">The rational reason to choose us</td>
                        </tr>
                        <tr className="bg-zinc-50/70">
                          <td className="p-3 font-bold text-[#b8860b] whitespace-nowrap">Feeling</td>
                          <td className="p-3 font-semibold text-zinc-900">No fear, just real power</td>
                          <td className="p-3">The emotional payoff</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-[#b8860b] whitespace-nowrap">Signature</td>
                          <td className="p-3 font-semibold text-zinc-900">No big name, results first, then the Hifazti Current</td>
                          <td className="p-3">The tagline and the sign-off</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-zinc-600 italic">
                    The Urdu lines you wrote carry all three, and they end every film.
                  </p>
                </div>

                {/* 7. Who we're talking to & 8. Role of Javed Sheikh */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2.5">
                    <h5 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                      7. Who we’re talking to
                    </h5>
                    <p className="text-xs text-zinc-500">These come straight from your characters:</p>
                    <ul className="space-y-2 text-xs text-zinc-700 leading-relaxed list-disc pl-4">
                      <li>The electrician or installer, who recommends and buys the cable (the Guru’s student).</li>
                      <li>The shop or business owner, who pays the bills and wants no extra cost (the Costume Designer).</li>
                      <li>The land and farm owner, who runs the tubewell and trusts big names (the Chaudhary).</li>
                    </ul>
                  </div>

                  <div className="p-5 bg-zinc-900 text-white border border-zinc-800 rounded-2xl space-y-2.5">
                    <h5 className="text-sm font-bold text-[#c69a53] uppercase tracking-wider">
                      8. Role of Javed Sheikh
                    </h5>
                    <p className="text-xs text-zinc-200 leading-relaxed">
                      He is the biggest name in the ad, and he spends it arguing that names don’t matter. He plays characters who are fond of show and status, and the film wins by showing him change his mind in front of a result. The brand speaks calmly through the product and the voice-over, while the characters bring the colour and the noise.
                    </p>
                  </div>
                </div>

                {/* 9, 10, 11: Personality & Tone, Rules for Every Film, What We Will Not Do */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  <div className="p-4 sm:p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2">
                    <h5 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                      9. Personality and tone
                    </h5>
                    <ul className="space-y-1.5 text-xs text-zinc-700 leading-relaxed list-disc pl-4">
                      <li>Colourful, warm and alive. Saturated palettes, generous comedy and affection for the characters.</li>
                      <li>Calm confidence. The brand never shouts or scares.</li>
                      <li>Never haunting or deadly. The smoke demo is theatre. Nobody is ever afraid.</li>
                    </ul>
                  </div>

                  <div className="p-4 sm:p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2">
                    <h5 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                      10. The rules for every film
                    </h5>
                    <ul className="space-y-1.5 text-xs text-zinc-700 leading-relaxed list-disc pl-4">
                      <li>A colourful character and a funny problem first.</li>
                      <li>The PVC vs LSZH side-by-side, with the same price on both.</li>
                      <li>The locked end sequence, ending on “Aap ka hifazti current. Pehchaan naam se nahi, kaam se!”</li>
                      <li>20 to 25 seconds, with no extra claims beyond the three lines.</li>
                    </ul>
                  </div>

                  <div className="p-4 sm:p-5 bg-red-50/50 border border-red-200/70 rounded-2xl space-y-2">
                    <h5 className="text-xs font-bold text-red-950 uppercase tracking-wider">
                      11. What we will not do
                    </h5>
                    <ul className="space-y-1.5 text-xs text-zinc-700 leading-relaxed list-disc pl-4">
                      <li>Use fear to sell, because the promise is the opposite.</li>
                      <li>Argue on heritage or size, which belongs to the competitors.</li>
                      <li>Run an authenticity or verification message, which Fast and Pakistan Cables already own.</li>
                      <li>Add any new selling idea beyond the three lines.</li>
                    </ul>
                  </div>
                </div>

                {/* 12. Phase 1 goal & Two claims to lock */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-zinc-900 text-white border border-zinc-800 rounded-2xl space-y-2">
                    <h5 className="text-sm font-bold text-[#c69a53] uppercase tracking-wider">
                      12. Phase 1 goal and what to measure
                    </h5>
                    <p className="text-xs text-zinc-200 leading-relaxed">
                      Phase 1 is one clear message in the market. The two measures that matter are whether people remember “Hifazti Current” and whether they understand that LSZH comes at the PVC price.
                    </p>
                  </div>

                  <div className="p-5 bg-amber-50/70 border border-amber-300/70 rounded-2xl space-y-2">
                    <h5 className="text-sm font-bold text-amber-950 uppercase tracking-wider">
                      Two claims to lock before this is final
                    </h5>
                    <ul className="space-y-2 text-xs text-zinc-800 leading-relaxed list-disc pl-4">
                      <li>
                        <strong>“Same price as PVC”:</strong> It must hold across the product range the ads feature. If it applies to only some products, the films should name them.
                      </li>
                      <li>
                        <strong>“No fire, no smoke, no toxic gas”:</strong> Confirm the exact wording against the test certificates before it appears in print or voice-over.
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            ) : (chapter.folders && chapter.folders.length > 0) || (chapter.galleryImages && chapter.galleryImages.length > 0) ? (
              <div className="space-y-6 my-2">
                
                {/* Folders Tab Bar (if chapter has multiple storyboard folders) */}
                {chapter.folders && chapter.folders.length > 0 && (
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-200">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mr-1 flex items-center gap-1.5">
                        <Folder className="w-3.5 h-3.5" /> Storyboards:
                      </span>
                      {isStoryboard && (
                        <button
                          onClick={() => {
                            setActiveFolderId('all');
                            setEnlargedIndex(null);
                          }}
                          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
                            activeFolderId === 'all'
                              ? 'bg-black text-white shadow-sm ring-1 ring-black'
                              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                          }`}
                        >
                          <span>
                            {chapter.id === 'art-talent' ? "All (Client's Concept & Modified)" : 'All (Concept 1 & 2)'}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeFolderId === 'all' ? 'bg-white/20 text-white' : 'bg-zinc-200 text-zinc-600'}`}>
                            {chapter.folders.reduce((acc, f) => acc + f.images.length, 0)}
                          </span>
                        </button>
                      )}
                      {chapter.folders.map((folder) => {
                        const isActive = folder.id === activeFolderId;
                        return (
                          <button
                            key={folder.id}
                            onClick={() => {
                              setActiveFolderId(folder.id);
                              setEnlargedIndex(null);
                            }}
                            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
                              isActive
                                ? 'bg-zinc-900 text-white shadow-sm ring-1 ring-zinc-900'
                                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                            }`}
                          >
                            {isActive ? (
                              <FolderOpen className="w-3.5 h-3.5 text-[#c69a53]" />
                            ) : (
                              <Folder className="w-3.5 h-3.5 text-zinc-400" />
                            )}
                            <span>{folder.name}</span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-zinc-200 text-zinc-600'}`}>
                              {folder.images.length}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <span className="text-[11px] text-[#b8860b] font-medium hidden sm:flex items-center gap-1">
                      <ZoomIn className="w-3.5 h-3.5" /> Click any slide to zoom &amp; inspect
                    </span>
                  </div>
                )}

                {/* For Storyboards: Top-to-Bottom Vertical Scroll Feed with Bold Reverse Headings */}
                {isStoryboard ? (
                  <div className="space-y-10">
                    {(() => {
                      const sectionsToRender = currentFolder
                        ? [currentFolder]
                        : chapter.folders && chapter.folders.length > 0
                        ? chapter.folders
                        : [{ id: 'storyboard', name: 'Concept 1', conceptName: 'Storyboard 1', images: galleryList }];

                      let runningOffset = 0;

                      return sectionsToRender.map((sec, secIdx) => {
                        const sectionStartIdx = runningOffset;
                        runningOffset += sec.images.length;

                        return (
                          <div
                            key={sec.id}
                            className={secIdx > 0 ? 'pt-10 border-t-4 border-zinc-900 space-y-6' : 'space-y-6'}
                          >
                            {/* Bold Reverse White-on-Black Strip Heading */}
                            <div className="bg-black text-white px-5 sm:px-7 py-4 rounded-xl border-l-4 border-[#c69a53] shadow-md flex items-center justify-between gap-3">
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c69a53] block">
                                  {sec.conceptName || `Storyboard ${secIdx + 1}`}
                                </span>
                                <h4 className="text-lg sm:text-xl font-black uppercase tracking-wider text-white font-heading">
                                  {sec.name}
                                </h4>
                              </div>
                              <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-200 bg-zinc-900 border border-zinc-700 px-3 py-1 rounded-full shrink-0">
                                {sec.images.length} Slides
                              </span>
                            </div>

                            <div className="flex flex-col gap-7">
                              {sec.images.map((img, idx) => {
                                const globalIdx = sectionStartIdx + idx;
                                return (
                                  <div
                                    key={idx}
                                    onClick={() => {
                                      setEnlargedIndex(globalIdx);
                                      setZoomScale(1.4);
                                    }}
                                    className="group cursor-pointer flex flex-col bg-white rounded-2xl border border-zinc-200/90 shadow-sm hover:shadow-xl hover:border-zinc-300 transition-all duration-300 overflow-hidden"
                                  >
                                    {/* Slide Top Bar */}
                                    <div className="px-5 py-3 bg-zinc-50 border-b border-zinc-100 flex items-center justify-between">
                                      <div className="flex items-center gap-2.5">
                                        <span className="w-6 h-6 rounded-full bg-black text-white text-[11px] font-bold flex items-center justify-center font-mono">
                                          {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <h5 className="text-sm font-bold text-zinc-900 group-hover:text-[#b8860b] transition-colors">
                                          {img.title}
                                        </h5>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-[11px] font-semibold text-zinc-500 bg-white border border-zinc-200 px-2.5 py-1 rounded-full flex items-center gap-1.5 group-hover:border-[#c69a53] group-hover:text-[#b8860b] transition-all">
                                          <ZoomIn className="w-3.5 h-3.5" /> Click to Zoom &amp; Read
                                        </span>
                                      </div>
                                    </div>

                                    {/* Large High-Res Storyboard Frame */}
                                    <div className="relative w-full bg-zinc-950 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                                      <img
                                        src={img.url}
                                        alt={img.title}
                                        className="w-full h-auto max-h-[650px] object-contain rounded-lg transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                                      />
                                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                                        <span className="px-4 py-2 bg-zinc-900/90 text-white rounded-full text-xs font-semibold tracking-wide shadow-xl backdrop-blur-md flex items-center gap-2">
                                          <ZoomIn className="w-4 h-4 text-[#c69a53]" />
                                          <span>Enlarge with Magnifying Glass</span>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                ) : (
                  /* Standard 2-Column Gallery Grid (e.g. Art & Talent) */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {galleryList.map((img, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => {
                          setEnlargedIndex(idx);
                          setZoomScale(1);
                        }}
                        className="group cursor-pointer flex flex-col transition-all duration-300"
                      >
                        {/* Apple-aesthetic Image Container */}
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100/80 border border-zinc-200/80 shadow-sm transition-all duration-500 ease-out group-hover:shadow-xl group-hover:border-zinc-300 group-hover:-translate-y-1">
                          <img
                            src={img.url}
                            alt={img.title}
                            style={{ objectPosition: img.objectPosition || 'center center' }}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          
                          {/* Hover Overlay with Apple-like frosted glass zoom button */}
                          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                            <span className="px-4 py-2 bg-white/90 text-zinc-900 rounded-full text-xs font-semibold tracking-wide shadow-lg backdrop-blur-md flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                              <ZoomIn className="w-3.5 h-3.5 text-[#b8860b]" />
                              <span>Click to Enlarge</span>
                            </span>
                          </div>
                        </div>

                        {/* Minimalist Apple-style caption */}
                        <div className="pt-3.5 px-1 flex items-baseline justify-between gap-2">
                          <h5 className="text-sm font-semibold text-zinc-900 group-hover:text-[#b8860b] transition-colors duration-200">
                            {img.title}
                          </h5>
                          <span className="text-[11px] font-medium text-zinc-400 whitespace-nowrap">
                            Artwork {idx + 1}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {chapter.fullText ? (
                  <div className="font-sans mt-6 p-6 sm:p-8 bg-zinc-50 rounded-2xl border border-zinc-200 shadow-xs">
                    {renderFormattedText(chapter.fullText)}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="font-sans space-y-4">
                {/* Concept Tabs Navigation Bar (if chapter has conceptTabs) */}
                {chapter.conceptTabs && chapter.conceptTabs.length > 0 && (
                  <div className="mb-6 pb-4 border-b border-zinc-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#c69a53]" /> Concepts Navigation:
                      </span>
                      {activeConceptTab && (
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full w-fit ${
                          activeConceptTab.isFinal
                            ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs'
                            : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                        }`}>
                          {activeConceptTab.badge || activeConceptTab.name}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {chapter.conceptTabs.map((tab) => {
                        const isActive = tab.id === activeConceptTabId;
                        const isFinal = tab.isFinal || tab.id === 'final-concepts' || tab.name.toLowerCase().includes('final');
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveConceptTabId(tab.id)}
                            className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                              isActive
                                ? isFinal
                                  ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white shadow-md ring-2 ring-amber-400 font-extrabold'
                                  : 'bg-zinc-900 text-white shadow-sm ring-1 ring-zinc-900'
                                : isFinal
                                ? 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300 font-bold'
                                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                            }`}
                          >
                            {isFinal ? (
                              <Sparkles className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-amber-600'}`} />
                            ) : (
                              <FileText className="w-3.5 h-3.5 text-zinc-400" />
                            )}
                            <span>{tab.name}</span>
                            {tab.badge && (
                              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                isActive
                                  ? 'bg-white/20 text-white'
                                  : isFinal
                                  ? 'bg-amber-200/90 text-amber-900 font-bold'
                                  : 'bg-zinc-200 text-zinc-600'
                              }`}>
                                {tab.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {activeConceptTab?.summary && (
                      <div className={`mt-3 p-3 rounded-xl border text-xs leading-relaxed ${
                        activeConceptTab.isFinal
                          ? 'bg-amber-500/10 border-amber-300/60 text-amber-950 font-medium'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-600'
                      }`}>
                        {activeConceptTab.summary.split(/(\([^)]+\))/g).map((part, idx) => {
                          if (part.startsWith('(') && part.endsWith(')')) {
                            return (
                              <span
                                key={idx}
                                className="font-semibold text-amber-900 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full text-[11px] tracking-normal inline-flex items-center gap-1 ml-1.5 align-middle font-sans shadow-2xs"
                              >
                                <span className="w-1 h-1 rounded-full bg-amber-600 inline-block animate-pulse"></span>
                                {part}
                              </span>
                            );
                          }
                          return <span key={idx} className="font-bold">{part}</span>;
                        })}
                      </div>
                    )}
                  </div>
                )}

                {renderFormattedText(activeConceptContent || chapter.fullText || '')}
              </div>
            )}
          </div>

          {/* Key Deliverables */}
          {chapter.keyPoints && chapter.keyPoints.length > 0 && (
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c69a53]" />
                Key Deliverables & Specs
              </h4>
              <ul className="space-y-2">
                {chapter.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c69a53] mt-2 flex-shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Attached Files */}
          {chapter.attachedFiles && chapter.attachedFiles.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                Attached Documents
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {chapter.attachedFiles.map((file, i) => {
                  const isExternal = file.url && file.url.startsWith('http');
                  return (
                    <a
                      key={i}
                      href={file.url && file.url !== '#' ? file.url : undefined}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      onClick={(e) => {
                        if (!file.url || file.url === '#') {
                          e.preventDefault();
                          handleDownload();
                        }
                      }}
                      className="p-3 bg-white border border-zinc-200 rounded-lg flex items-center justify-between hover:border-[#c69a53] hover:shadow-xs transition-all cursor-pointer group text-left no-underline"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-2 bg-zinc-100 group-hover:bg-amber-50 rounded-md text-zinc-600 group-hover:text-[#c69a53] transition-colors">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-xs font-semibold text-zinc-900 truncate group-hover:text-[#b8860b] transition-colors">
                            {file.name}
                          </div>
                          {file.size && (
                            <div className="text-[10px] text-zinc-400">{file.size}</div>
                          )}
                        </div>
                      </div>
                      <div className="p-1.5 text-zinc-400 group-hover:text-[#b8860b] group-hover:bg-amber-50/50 rounded-md transition-all">
                        {isExternal ? (
                          <ExternalLink className="w-4 h-4" />
                        ) : (
                          <FileDown className="w-4 h-4" />
                        )}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
          <span>{branding.producedBy}</span>
          <div className="flex items-center gap-3">
            <span>
              {clientName && clientName.toLowerCase() !== 'worldwide cables' && clientName.toLowerCase() !== 'wwc' ? (
                <>Prepared by: <strong className="text-zinc-900">{clientName}</strong> for <strong className="text-zinc-900">Worldwide Cables</strong></>
              ) : (
                <>Prepared for: <strong className="text-zinc-900">Worldwide Cables</strong></>
              )}
            </span>
            <img src={branding.nasharzIcon} alt="Nasharz Films" className="h-6 w-auto opacity-80" />
          </div>
        </div>

      </div>

      {/* Lightbox / Enlarged View Modal with Next / Prev Navigation */}
      {enlargedImage && (
        <div 
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 select-none animate-fadeIn"
          onClick={() => setEnlargedIndex(null)}
        >
          {/* Top Bar */}
          <div 
            className="w-full max-w-5xl flex items-center justify-between py-2 px-2 text-white mb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#c69a53] block font-heading">
                {currentFolder?.name ? `${currentFolder.name} • ` : ''}{chapter.title} • Page {(enlargedIndex ?? 0) + 1} of {galleryList.length}
              </span>
              <h4 className="text-sm sm:text-base font-semibold text-white">
                {enlargedImage.title}
              </h4>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Magnifier / Zoom Bar */}
              <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/15">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomScale <= 1.0}
                  className="p-1.5 hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-transparent rounded-full text-white transition-all cursor-pointer"
                  title="Zoom Out (-)"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono px-2 text-zinc-300 min-w-[44px] text-center">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomScale >= 3.0}
                  className="p-1.5 hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-transparent rounded-full text-white transition-all cursor-pointer"
                  title="Zoom In (+)"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                {zoomScale > 1 && (
                  <button
                    onClick={handleResetZoom}
                    className="p-1.5 hover:bg-white/20 rounded-full text-[#c69a53] transition-all cursor-pointer ml-0.5"
                    title="Reset Zoom (0)"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <span className="text-xs text-zinc-400 bg-white/10 px-3 py-1 rounded-full font-mono">
                {(enlargedIndex ?? 0) + 1} / {galleryList.length}
              </span>
              <button
                onClick={() => {
                  setEnlargedIndex(null);
                  setZoomScale(1);
                }}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-all cursor-pointer backdrop-blur-sm"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Stage with Carousel Nav Buttons */}
          <div 
            className="relative max-w-5xl w-full flex-1 max-h-[82vh] flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button */}
            {galleryList.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 hover:border-white/40 shadow-2xl backdrop-blur-md transition-all duration-200 transform hover:scale-110 active:scale-95 cursor-pointer"
                title="Previous Image (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Enlarged Image Display with Magnifier Zoom & Pan Drag container */}
            <div 
              className={`relative w-full h-full flex items-center justify-center p-2 select-none ${
                zoomScale > 1 
                  ? isDragging 
                    ? 'cursor-grabbing' 
                    : 'cursor-grab' 
                  : 'cursor-default'
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="transition-transform duration-75 ease-out origin-center"
                style={{ 
                  transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomScale})` 
                }}
              >
                <img
                  src={enlargedImage.url}
                  alt={enlargedImage.title}
                  className="max-w-full max-h-[78vh] object-contain rounded-xl shadow-2xl border border-white/10 bg-zinc-950 block select-none pointer-events-none"
                  draggable={false}
                />
              </div>
            </div>

            {/* Next Button */}
            {galleryList.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 hover:border-white/40 shadow-2xl backdrop-blur-md transition-all duration-200 transform hover:scale-110 active:scale-95 cursor-pointer"
                title="Next Image (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails / Indicator Dots */}
          {galleryList.length > 1 && (
            <div 
              className="flex items-center gap-2 mt-3 p-1.5 bg-white/10 rounded-full backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setEnlargedIndex(i);
                    setZoomScale(1);
                  }}
                  className={`transition-all rounded-full cursor-pointer ${
                    i === enlargedIndex 
                      ? 'w-6 h-2 bg-[#c69a53]' 
                      : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                  }`}
                  title={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}

          <p className="text-zinc-400 text-[11px] mt-2 select-none flex items-center gap-3">
            <span>Use arrow keys <span className="font-mono text-zinc-300">← →</span> to navigate</span>
            <span>•</span>
            <span>Zoom: <span className="font-mono text-zinc-300">+ / -</span> (or click magnifier buttons above)</span>
            <span>•</span>
            <span>Press <span className="font-mono text-zinc-300">Esc</span> to exit</span>
          </p>
        </div>
      )}

    </div>
  );
};

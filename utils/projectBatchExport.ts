import JSZip from 'jszip';
import { DeckData, Chapter, BrandingConfig } from '../types';
import { generateChapterPDF } from './pdfGenerator';

export interface ExportItemConfig {
  id: string;
  chapterId: string;
  chapterNumber: string;
  title: string;
  category: string;
  section?: 'all' | 'wardrobe' | 'vehicles' | 'locations' | 'talent' | 'complete_art';
  folder: string;
  filename: string;
  description: string;
  pageCountEst: string;
  isSubItem?: boolean;
}

export const ALL_EXPORTABLE_ITEMS: ExportItemConfig[] = [
  {
    id: 'ch01_overview',
    chapterId: 'brief',
    chapterNumber: '01',
    title: 'Chapter 01: Worldwide Cables TVC Creative Brief',
    category: 'The Ask & Strategic Scope',
    folder: 'Chapter_01_Campaign_Overview',
    filename: 'Nasharz_WWC_Chapter01_Campaign_Overview.pdf',
    description: 'Naam Se Nahi, Kaam Se Pehchaan ft. Javed Sheikh: positioning, Ultravolt benchmark, segmentation, claims register & open questions.',
    pageCountEst: '10 Pages'
  },
  {
    id: 'ch02_creative_concept',
    chapterId: 'big-idea',
    chapterNumber: '02',
    title: 'Chapter 02: Creative Concept & Campaign Narratives',
    category: 'Big Idea & Core Message',
    folder: 'Chapter_02_Creative_Concepts',
    filename: 'Nasharz_WWC_Chapter02_Creative_Concepts.pdf',
    description: '"Hifazti Current" big idea, 3 strategic lines, 20–25s film structure, 3 Javed Sheikh films & pre-shoot checks.',
    pageCountEst: '6 Pages'
  },
  {
    id: 'ch03_scripts',
    chapterId: 'concepts',
    chapterNumber: '03',
    title: 'Chapter 03: Route 1 Film Concepts (Naam Se Nahi, Kaam Se Pehchaan)',
    category: '3 Hero TVCs ft. Javed Sheikh',
    folder: 'Chapter_03_Master_Scripts',
    filename: 'Nasharz_WWC_Chapter03_Master_Scripts.pdf',
    description: 'Campaign Film Concepts Route 1: Nishana (Chaudhry Sb), Guru Ji (LSZH), and Chamkila (Bill-Couture), 3 commercials, 25 sec each.',
    pageCountEst: '9 Pages'
  },
  {
    id: 'ch04_storyboards',
    chapterId: 'storyboards',
    chapterNumber: '04',
    title: 'Chapter 04: Visual Storyboards (Concept 1 & Concept 2)',
    category: 'Concept 1 & Concept 2 (12 Slides)',
    folder: 'Chapter_04_Storyboards',
    filename: 'Nasharz_WWC_Chapter04_Visual_Storyboards.pdf',
    description: 'Concept 1 (Slides 1–6) & Concept 2 (Slides 1–6) high-resolution visual storyboards with bold reverse section headings.',
    pageCountEst: '16 Pages'
  },
  {
    id: 'ch05_treatment',
    chapterId: 'production',
    chapterNumber: '05',
    title: "Chapter 05: Director's Visual Treatment & Cinematography",
    category: 'Director Vision & Aesthetic',
    folder: 'Chapter_05_Visual_Treatment',
    filename: 'Nasharz_WWC_Chapter05_Visual_Treatment.pdf',
    description: 'ARRI Alexa LF camera package, anamorphic lenses, lighting cues & color grading palette.',
    pageCountEst: '6 Pages'
  },
  {
    id: 'ch06_schedule',
    chapterId: 'execution',
    chapterNumber: '06',
    title: 'Chapter 06: Production Schedule, Crew & Technical Plan',
    category: 'Schedule & Logistics',
    folder: 'Chapter_06_Production_Plan',
    filename: 'Nasharz_WWC_Chapter06_Production_Plan.pdf',
    description: '4-day multi-city shoot schedule, unit management, crew roster & post-production milestones.',
    pageCountEst: '5 Pages'
  },
  {
    id: 'ch07_clients_concept',
    chapterId: 'art-talent',
    chapterNumber: '07',
    title: "Chapter 07: Client's Concept Storyboards (Original & Modified)",
    category: "Client's Concept (13 Slides)",
    folder: 'Chapter_07_Clients_Concept',
    filename: 'Nasharz_WWC_Chapter07_Clients_Concept_Storyboards.pdf',
    description: "Client's Concept (Slides 1–6) & Client's Concept Modified (Slides 1–7) high-resolution storyboards with bold reverse section headings.",
    pageCountEst: '17 Pages'
  }
];

export interface BatchProgress {
  current: number;
  total: number;
  currentItemTitle: string;
  status: 'idle' | 'generating' | 'zipping' | 'completed' | 'error';
  errorMessage?: string;
}

/**
 * Triggers a browser download of a Blob
 */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/**
 * Executes batch export for all selected item IDs
 */
export async function executeBatchExport(
  selectedIds: string[],
  data: DeckData,
  clientName: string,
  mode: 'zip' | 'individual',
  onProgress?: (progress: BatchProgress) => void
): Promise<void> {
  const selectedConfigs = ALL_EXPORTABLE_ITEMS.filter((item) => selectedIds.includes(item.id));
  if (selectedConfigs.length === 0) return;

  const total = selectedConfigs.length;
  const zip = mode === 'zip' ? new JSZip() : null;

  try {
    for (let i = 0; i < selectedConfigs.length; i++) {
      const item = selectedConfigs[i];
      if (onProgress) {
        onProgress({
          current: i + 1,
          total,
          currentItemTitle: item.title,
          status: 'generating'
        });
      }

      // Find the corresponding chapter data
      const chapter = data.chapters.find((c) => c.id === item.chapterId) || {
        id: item.chapterId,
        number: item.chapterNumber,
        title: item.title,
        category: item.category,
        summary: item.description,
        fullText: '',
        keyPoints: [],
        pageCount: 6
      } as Chapter;

      let resultBlob: Blob | null = null;

      const res = await generateChapterPDF(chapter, data.branding, clientName, { returnBlob: true });
      if (res && 'blob' in res && res.blob) resultBlob = res.blob;

      if (resultBlob) {
        if (mode === 'zip' && zip) {
          zip.folder(item.folder)?.file(item.filename, resultBlob);
        } else {
          // Download individual file with small delay to avoid browser throttle
          downloadBlob(resultBlob, item.filename);
          await new Promise((r) => setTimeout(r, 600));
        }
      }
    }

    if (mode === 'zip' && zip) {
      if (onProgress) {
        onProgress({
          current: total,
          total,
          currentItemTitle: 'Packaging into organized ZIP archive...',
          status: 'zipping'
        });
      }

      const zipBlob = await zip.generateAsync(
        { type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } },
        (meta) => {
          if (onProgress) {
            onProgress({
              current: Math.round((meta.percent / 100) * total),
              total,
              currentItemTitle: `Compressing files (${Math.round(meta.percent)}%)...`,
              status: 'zipping'
            });
          }
        }
      );

      const timestamp = new Date().toISOString().slice(0, 10);
      downloadBlob(zipBlob, `Nasharz_Worldwide_Cables_Production_Package_${timestamp}.zip`);
    }

    if (onProgress) {
      onProgress({
        current: total,
        total,
        currentItemTitle: 'All documents generated successfully!',
        status: 'completed'
      });
    }
  } catch (err: any) {
    console.error('Batch export failed:', err);
    if (onProgress) {
      onProgress({
        current: 0,
        total,
        currentItemTitle: 'Export encountered an error',
        status: 'error',
        errorMessage: err?.message || 'An unexpected error occurred during PDF generation.'
      });
    }
  }
}

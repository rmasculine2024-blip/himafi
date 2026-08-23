import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const news = defineCollection({
  loader: glob({ base: "src/content/news", pattern: "*.mdx" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    author: z.string(),
    authorTag: z.string(),
    authorPic: z.string(),
    produced: z.string(),
    Description: z.string(),
    img: z.string(),
  }),
});



// schema baru untuk departments
const memberSchema = z.object({
  name: z.string(),
  role: z.string(),
  profilePic: z.string(),
  angkatan: z.string().optional(),
  instagramUsn: z.string().optional().default(""),
  instagramUrl: z.string().optional().default(""),
  bio: z.string(),
});

const programSchema = z.object({
  name: z.string(),
  programDesc: z.string().optional().default(""),
  date: z.string().optional().default(""),
  programPic: z.string().optional().default(""),
});

const departments = defineCollection({
  loader: glob({ base: "src/content/departments", pattern: "*.json" }),
  schema: z.object({
    name: z.string(),
    fullName: z.string(),
    photo: z.string(),
    secondPhoto: z.string(),
    description: z.string(),
    members: z.array(memberSchema),
    programs: z.array(programSchema).optional().default([]),
  }),
});

const historyItemSchema = z.object({
  era: z.string(),
  title: z.string(),
  description: z.string(),
  highlight: z.boolean(),
  photo: z.string().optional().default(""),
});

const history = defineCollection({
  loader: glob({ base: "src/content/history", pattern: "*.json" }),
  schema: z.object({
    items: z.array(historyItemSchema),
  }),
});

// Riset — showcase riset & thesis mahasiswa per peminatan.
const PEMINATAN = ["Geofisika", "Instrumentasi", "Material Sains"] as const;
const TIPE_ARTEFAK_RISET = ["kristal", "geofisika-profil", "geofisika-mesh", "tidak-ada"] as const;

const riset = defineCollection({
  loader: glob({ base: "src/content/riset", pattern: "*.mdx" }),
  schema: z.object({
    judul: z.string(),
    peminatan: z.enum(PEMINATAN),
    tahun: z.number(),
    penulis: z.array(z.string()),
    dosenPembimbing: z.string(),
    abstrak: z.string(),
    metodologi: z.string(),
    tautanNaskah: z.string().url().optional(),
    dataset: z
      .object({
        caraPengumpulan: z.string(),
        ukuran: z.string(),
        lisensi: z.string(),
        tautanUnduh: z.string().url().optional(),
      })
      .optional(),
    tipeArtefak: z.enum(TIPE_ARTEFAK_RISET).default("tidak-ada"),
    artefakUrl: z.string().optional(),
  }),
});

// Proyek — showcase klub robotik & embedded.
const LEVEL_ROBOT = ["Foundry", "Builder", "Frontier", "Master"] as const;
const TIPE_ARTEFAK_PROYEK = ["part-cad", "skematik", "pcb", "tidak-ada"] as const;

const proyek = defineCollection({
  loader: glob({ base: "src/content/proyek", pattern: "*.mdx" }),
  schema: z.object({
    nama: z.string(),
    levelBadge: z.enum(LEVEL_ROBOT),
    tahun: z.number(),
    status: z.enum(["aktif", "selesai", "arsip"]).default("aktif"),
    deskripsi: z.string(),
    repoUrl: z.string().url().optional(),
    videoUrl: z.string().url().optional(),
    bom: z
      .array(
        z.object({
          nama: z.string(),
          jumlah: z.number(),
          catatan: z.string().optional(),
        }),
      )
      .optional(),
    tipeArtefak: z.enum(TIPE_ARTEFAK_PROYEK).default("tidak-ada"),
    artefakUrl: z.string().optional(),
  }),
});

// Phypath — mini-LMS fisika: course > modul > lesson (+ kuis opsional per modul).
const phypath = defineCollection({
  loader: glob({ base: "src/content/phypath", pattern: "*.mdx" }),
  schema: z.object({
    judul: z.string(),
    deskripsi: z.string(),
    peminatanTag: z.enum(PEMINATAN).optional(),
    modul: z.array(
      z.object({
        judul: z.string(),
        lesson: z.array(
          z.object({
            slug: z.string(),
            judul: z.string(),
            tipe: z.enum(["video", "reading"]),
            videoUrl: z.string().url().optional(),
            konten: z.string().optional(),
          }),
        ),
        kuis: z
          .object({
            pertanyaan: z.array(
              z.object({
                soal: z.string(),
                pilihan: z.array(z.string()),
                jawabanIndex: z.number(),
              }),
            ),
          })
          .optional(),
      }),
    ),
  }),
});

export const collections = { news, departments, history, riset, proyek, phypath };
export { PEMINATAN, LEVEL_ROBOT };

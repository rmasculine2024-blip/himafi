// Urutan tampil departemen mengikuti struktur organisasi, bukan urutan file
// (glob mengembalikannya alfabetis). Dipakai oleh direktori anggota di /about
// dan navigasi antar-departemen di /about/[dept].
export const DEPARTMENT_ORDER = [
  "bph",
  "litbang",
  "kaderisasi",
  "adkesma",
  "kominfo",
  "msdo",
  "minbak",
  "sosro",
  "mpkpo",
] as const;

function rank(id: string) {
  const i = DEPARTMENT_ORDER.indexOf(id as (typeof DEPARTMENT_ORDER)[number]);
  // id yang belum terdaftar ditaruh paling belakang, bukan dibuang
  return i === -1 ? DEPARTMENT_ORDER.length : i;
}

// Menyalin dulu — getCollection mengembalikan array yang dipakai bersama,
// jadi .sort() langsung di atasnya akan mengubah urutan untuk pemanggil lain.
export function sortDepartments<T extends { id: string }>(list: T[]): T[] {
  return [...list].sort((a, b) => rank(a.id) - rank(b.id));
}

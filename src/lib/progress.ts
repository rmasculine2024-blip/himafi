// Progress tracker Phypath — "Opsi A": statis, tanpa akun, tersimpan di
// localStorage perangkat ini saja. Kalau nanti perlu progress lintas
// perangkat/akun ("Opsi B"), tinggal ganti isi getDone/setDone jadi call ke
// backend (mis. Supabase, tabel lesson_progress keyed by user_id/course_id/
// lesson_slug) — signature isDone/setDone di bawah ini tidak perlu berubah.

const STORAGE_KEY = "phypath-progress";

function readStore(): Record<string, boolean> {
  if (typeof localStorage === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function writeStore(store: Record<string, boolean>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function key(courseId: string, lessonSlug: string) {
  return `${courseId}/${lessonSlug}`;
}

export function isDone(courseId: string, lessonSlug: string): boolean {
  return Boolean(readStore()[key(courseId, lessonSlug)]);
}

export function setDone(courseId: string, lessonSlug: string, done: boolean): void {
  const store = readStore();
  store[key(courseId, lessonSlug)] = done;
  writeStore(store);
}

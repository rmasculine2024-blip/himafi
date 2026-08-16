export function parseDate(str: string) {
  const [d, m, y] = str.split("-");
  return new Date(`${y}-${m}-${d}`);
}

export function formatDate(str: string) {
  const date = parseDate(str);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Menyalin dulu: getCollection mengembalikan array yang dipakai bersama, jadi
// .sort() langsung di atasnya mengubah urutan untuk semua pemanggil lain di
// render yang sama.
export function sortNewsByDate<T extends { data: { date: string } }>(
  newsArray: T[],
): T[] {
  return [...newsArray].sort(
    (a, b) => parseDate(b.data.date).getTime() - parseDate(a.data.date).getTime(),
  );
}
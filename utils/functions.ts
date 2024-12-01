export const formatPathname = (pathname: string) => {
  // İlk slash'i kaldır
  const withoutSlash = pathname.replace(/^\//, '');

  // Tire işaretlerini boşluğa çevir
  const withSpaces = withoutSlash.replace(/-/g, ' ');

  // Her kelimenin ilk harfini büyük yap
  const capitalized = withSpaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return capitalized;
};

export function convertToLatinSlug(text: string): string {
  // Türkçe karakterler için dönüşüm haritası
  const charMap: { [key: string]: string } = {
    'ı': 'i',
    'ğ': 'g',
    'ü': 'u',
    'ş': 's',
    'ö': 'o',
    'ç': 'c',
    'İ': 'I',
    'Ğ': 'G',
    'Ü': 'U',
    'Ş': 'S',
    'Ö': 'O',
    'Ç': 'C'
  };

  return text
    // Türkçe karakterleri dönüştür
    .replace(/[ıİğĞüÜşŞöÖçÇ]/g, letter => charMap[letter])
    // Harfler ve rakamlar dışındaki karakterleri tireyele değiştir
    .replace(/[^a-zA-Z0-9]/g, '-')
    // Birden fazla tireyi tek tireye indir
    .replace(/-+/g, '-')
    // Baştaki ve sondaki tireleri kaldır
    .replace(/^-+|-+$/g, '')
    // Tüm metni küçük harfe çevir
    .toLowerCase();
}
 
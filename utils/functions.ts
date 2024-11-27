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
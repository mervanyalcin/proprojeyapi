import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface PhotoGalleryProps {
  photos: string[];
}

const PhotoGallery = ({ photos }: PhotoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrevious();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPhoto]);

  const handlePhotoClick = (photo: string, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedPhoto(photos[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedPhoto(photos[currentIndex - 1]);
    }
  };

  return (
    <div className="relative">
      {/* Fotoğraf Grid'i */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div
            key={photo}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => handlePhotoClick(photo, index)}
          >
            <Image
              src={photo}
              alt={`Gallery photo ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Kapatma Butonu */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-4 top-4 bg-black/50 p-2 rounded-full hover:bg-black/70 z-10"
            >
              <span className="text-2xl">&times;</span>
            </button>

            {/* Önceki Buton */}
            {currentIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70"
              >
                <span className="text-2xl">&larr;</span>
              </button>
            )}

            {/* Görsel */}
            <div className="relative w-full h-full p-4">
              <Image
                src={selectedPhoto}
                alt={`Gallery photo ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Sonraki Buton */}
            {currentIndex < photos.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70"
              >
                <span className="text-2xl">&rarr;</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
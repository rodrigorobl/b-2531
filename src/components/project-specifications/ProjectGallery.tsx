
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProjectGalleryProps {
  images: string[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openGallery = (index: number) => {
    setActiveImageIndex(index);
    setIsGalleryOpen(true);
  };

  return (
    <>
      <div 
        className="rounded-lg overflow-hidden cursor-pointer hover-scale"
        onClick={() => openGallery(0)}
      >
        <AspectRatio ratio={16 / 9}>
          <img 
            src={images[0]} 
            alt="Perspective du projet" 
            className="w-full h-full object-cover"
          />
        </AspectRatio>
        <div className="bg-black/50 text-white text-xs py-1 px-2 absolute bottom-0 right-0 rounded-tl-md">
          {images.length} photos
        </div>
      </div>

      {/* Image Gallery Dialog */}
      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-black/95">
          <div className="relative h-[80vh] flex flex-col">
            <div className="absolute top-2 right-2 z-10">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsGalleryOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X size={24} />
              </Button>
            </div>
            
            <div className="flex-1 flex items-center justify-center p-4">
              <img 
                src={images[activeImageIndex]} 
                alt={`Perspective du projet ${activeImageIndex + 1}`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            
            <div className="p-4 bg-black/80">
              <Carousel>
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index} className="basis-1/5 md:basis-1/6">
                      <div 
                        className={`
                          h-16 md:h-20 cursor-pointer p-1 rounded-md overflow-hidden
                          ${activeImageIndex === index ? 'ring-2 ring-primary' : ''}
                        `}
                        onClick={() => setActiveImageIndex(index)}
                      >
                        <img 
                          src={image} 
                          alt={`Miniature ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

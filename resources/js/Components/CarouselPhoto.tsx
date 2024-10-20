import * as React from "react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel";
import Photo from "@/interfaces/Photo";

export function CarouselPhoto({ photos }: { photos: Photo[] }) {
    return (
        <Carousel className="w-full max-w-sm p-4 rounded-md bg-slate-50 dark:bg-slate-600">
            <CarouselContent>
                {photos.map((photo) => (
                    <CarouselItem key={photo.id}>
                        <img
                            src={`http://localhost:8000/storage/${photo.photo}`}
                            alt="Product photo"
                            className="object-contain w-full h-full"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="dark:bg-white dark:text-slate-800" />
            <CarouselNext className="dark:bg-white dark:text-slate-800" />
        </Carousel>
    );
}

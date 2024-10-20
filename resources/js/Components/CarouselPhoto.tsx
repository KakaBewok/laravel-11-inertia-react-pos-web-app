import * as React from "react";

import { Card, CardContent } from "@/Components/ui/card";
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
        <Carousel className="w-full max-w-xs">
            <CarouselContent>
                {photos.map((photo) => (
                    <CarouselItem key={photo.id}>
                        <img
                            src={`http://localhost:8000/storage/${photo.photo}`}
                            alt=""
                            className="object-contain w-full h-full"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}

{
    /* <CarouselContent>
                {photos.map((photo) => (
                    <CarouselItem key={photo.id}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex items-center justify-center p-6 aspect-square">
                                    <span className="text-4xl font-semibold">
                                        <img
                                            src={`http://localhost:8000/storage/${photo.photo}`}
                                            alt=""
                                            className="object-cover w-full h-full"
                                        />
                                    </span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent> */
}

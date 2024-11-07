import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel";
import Photo from "@/interfaces/Photo";
import ImageNotFound from "../../../public/images/image-not-found.jpg";

export function CarouselPhoto({ photos }: { photos: Photo[] }) {
    return (
        <Carousel className="w-full max-w-sm p-4 rounded-md bg-slate-50 dark:bg-slate-600">
            <CarouselContent>
                {photos.length > 0 ? (
                    photos.map((photo) => (
                        <CarouselItem key={photo.id}>
                            <img
                                src={`${import.meta.env.APP_URL}/storage/${
                                    photo.photo
                                }`}
                                alt="Product photo"
                                className="object-contain w-full h-full"
                            />
                        </CarouselItem>
                    ))
                ) : (
                    <CarouselItem>
                        <img
                            src={ImageNotFound}
                            alt="Product photo not found"
                            className="object-contain w-full h-full"
                        />
                    </CarouselItem>
                )}
            </CarouselContent>
            {photos.length > 1 && (
                <>
                    <CarouselPrevious className="dark:bg-white dark:text-slate-800" />
                    <CarouselNext className="dark:bg-white dark:text-slate-800" />
                </>
            )}
        </Carousel>
    );
}

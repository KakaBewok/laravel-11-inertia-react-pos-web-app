export const MAX_FILE_SIZE = 300; // in kilobytes
export const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];
export const BASE_URL =
    import.meta.env.MODE == "production"
        ? "https://pos-kkbwk.xyz"
        : "http://localhost:8000";

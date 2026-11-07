import ImageKit, { toFile } from "@imagekit/nodejs";
import { config } from "../config/config.js";

const client = new ImageKit({
    privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

export const uploadImage = async ({ buffer, filename }) => {
    try {
        const file = await toFile(buffer, filename);

        const response = await client.files.upload({
            file,
            fileName: filename,
            folder: "/tactyqal",
        });

        return response;
    } catch (error) {
        console.error("ImageKit upload failed:", {
            status: error.status,
            message: error.message,
            error: error.error,
            requestId: error.headers?.get?.("x-ik-requestid"),
        });

        throw error;
    }
};
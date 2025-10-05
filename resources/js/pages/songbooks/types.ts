import { type Song } from "@/types.js";

export interface Songbook {
    id: number;
    title: string;
    songs: Song[];
}

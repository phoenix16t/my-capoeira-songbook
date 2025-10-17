import { type IconKeys, type Song } from "@/types.js";

export interface Songbook {
    id: number;
    title: string;
    songs: Song[];
    icon?: IconKeys;
    color?: string;
}

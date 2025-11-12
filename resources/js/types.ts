import type { Icons } from "@/lib/icons.js";

interface Group {
    id: number;
    name: string;
}

interface Type {
    id: number;
    name: string;
}

interface Link {
    id: number;
    song_id: number;
    url: string;
    start_time: string;
    end_time: string;
}

export interface SongTitle {
    title: string;
}

export interface Song {
    id: number;
    titles: SongTitle[];
    lyrics: string;
    links: Link[];
    translation: string;
    group_id: number;
    group?: Group;
    beat: string;
    type_id: number;
    type: Type;
    author: string;
    songbooks?: Songbook[];
}

export type IconKeys = keyof typeof Icons;

export interface Songbook {
    id: number;
    title: string;
    songs: Song[];
    icon?: IconKeys;
    color?: string;
}

export interface Settings {
    id: number;
    song_list_columns_number: number;
    song_list_show_full_songs: boolean;
    song_show_details: boolean;
    song_show_songbooks: boolean;
    song_show_translation: boolean;
    translation_type: "inline" | "side";
}

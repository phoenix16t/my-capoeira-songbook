interface SongTitle {
    title: string;
}

interface Song {
    id: number;
    titles: SongTitle[];
    lyrics: string;
    translation: string;
    groupId: number;
    count: string;
    typeId: number;
}

export interface Songbook {
    id: number;
    title: string;
    songs: Song[];
}

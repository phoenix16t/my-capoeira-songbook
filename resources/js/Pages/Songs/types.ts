interface SongTitle {
    title: string;
}

export interface Song {
    id: number;
    titles: SongTitle[];
    lyrics: string;
    translation: string;
    groupId: number;
    count: string;
    typeId: number;
}

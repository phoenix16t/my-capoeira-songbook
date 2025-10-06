interface SongTitle {
    title: string;
}

interface Group {
    id: number;
    name: string;
}

interface Type {
    id: number;
    name: string;
}

export interface Song {
    id: number;
    titles: SongTitle[];
    lyrics: string;
    translation: string;
    groupId: number;
    group?: Group;
    count: string;
    typeId: number;
    type?: Type;
    author: string;
}

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

interface Link {
    id: number;
    song_id: number;
    url: string;
    start_time: string;
    end_time: string;
}

export interface Song {
    id: number;
    titles: SongTitle[];
    lyrics: string;
    links: Link[];
    translation: string;
    groupId: number;
    group?: Group;
    beat: string;
    typeId: number;
    type?: Type;
    author: string;
}

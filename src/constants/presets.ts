export interface Preset {
    id: string;
    label: string;
    width: number;
    height: number;
    group: 'Instagram' | 'X (Twitter)' | 'Facebook' | 'YouTube' | 'Web' | 'Common';
}

export const PRESETS: Preset[] = [
    // Instagram
    { id: 'ig-square', label: 'Square (1:1)', width: 1080, height: 1080, group: 'Instagram' },
    { id: 'ig-portrait', label: 'Portrait (4:5)', width: 1080, height: 1350, group: 'Instagram' },
    { id: 'ig-story', label: 'Story (9:16)', width: 1080, height: 1920, group: 'Instagram' },

    // X (Twitter)
    { id: 'tw-post', label: 'Post (16:9)', width: 1200, height: 675, group: 'X (Twitter)' },
    { id: 'tw-header', label: 'Header (3:1)', width: 1500, height: 500, group: 'X (Twitter)' },

    // Facebook
    { id: 'fb-post', label: 'Post / OGP', width: 1200, height: 630, group: 'Facebook' },

    // YouTube
    { id: 'yt-thumb', label: 'Thumbnail (16:9)', width: 1280, height: 720, group: 'YouTube' },

    // Web / Common
    { id: 'web-fhd', label: 'Full HD', width: 1920, height: 1080, group: 'Web' },
    { id: 'web-hd', label: 'HD', width: 1280, height: 720, group: 'Web' },
];

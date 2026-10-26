import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type YouTubePlaylistItem = {
  snippet?: {
    title?: string;
    description?: string;
    resourceId?: {
      videoId?: string;
    };
    thumbnails?: {
      medium?: { url?: string };
      high?: { url?: string };
      default?: { url?: string };
    };
  };
};

type YouTubePlaylistResponse = {
  nextPageToken?: string;
  items?: YouTubePlaylistItem[];
};

type YouTubeChannelResponse = {
  items?: Array<{
    contentDetails?: {
      relatedPlaylists?: {
        uploads?: string;
      };
    };
  }>;
};

const categories = ['Pedagogy', 'Biology', 'Physics', 'Chemistry', 'Ecology', 'Test Prep', 'General'];

const categoryMatchers: Record<string, string[]> = {
  Pedagogy: ['pedagogy', 'teaching', 'methodology', 'assessment', 'lecture method', 'team teaching', 'case stud'],
  Biology: ['biology', 'brain', 'nerve', 'nervous', 'kidney', 'excretory', 'blood', 'vaccine', 'vaccination', 'tuberculosis', 'hypertension', 'medical'],
  Physics: ['physics', 'refraction', 'critical angle', 'internal reflection', 'light', 'breeze', 'radiation', 'heat'],
  Chemistry: ['chemistry', 'acid', 'chemical', 'reaction'],
  Ecology: ['ecology', 'environment', 'consumer', 'feeding', 'diurnal', 'nocturnal', 'food chain'],
  'Test Prep': ['mcq', 'test prep', 'preparation', 'nts', 'sts', 'iba', 'spsc', 'bsn', 'jst', 'jobs test'],
};

function inferCategory(title: string, description: string) {
  const haystack = `${title} ${description}`.toLowerCase();

  return (
    categories.find((category) =>
      categoryMatchers[category]?.some((keyword) => haystack.includes(keyword))
    ) ?? 'General'
  );
}

function buildTags(title: string, description: string, category: string) {
  const haystack = `${title} ${description}`.toLowerCase();
  const tags = new Set<string>([category]);

  [
    ['JST', 'jst'],
    ['Science 4', 'science 4'],
    ['Science 7', 'science 7'],
    ['Science 8', 'science 8'],
    ['MCQs', 'mcq'],
    ['STBB', 'stbb'],
    ['Sindhi', 'sindhi'],
    ['NTS', 'nts'],
    ['STS', 'sts'],
    ['IBA', 'iba'],
  ].forEach(([label, keyword]) => {
    if (haystack.includes(keyword)) {
      tags.add(label);
    }
  });

  return Array.from(tags).slice(0, 5);
}

async function getUploadsPlaylistId(apiKey: string) {
  if (process.env.YOUTUBE_UPLOADS_PLAYLIST_ID) {
    return process.env.YOUTUBE_UPLOADS_PLAYLIST_ID;
  }

  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!channelId) {
    return null;
  }

  const params = new URLSearchParams({
    part: 'contentDetails',
    id: channelId,
    key: apiKey,
  });

  const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?${params}`);

  if (!response.ok) {
    throw new Error('Unable to load YouTube channel details.');
  }

  const data = (await response.json()) as YouTubeChannelResponse;

  return data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? null;
}

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { videos: [], error: 'YOUTUBE_API_KEY is not configured.' },
      { status: 200 }
    );
  }

  try {
    const playlistId = await getUploadsPlaylistId(apiKey);

    if (!playlistId) {
      return NextResponse.json(
        { videos: [], error: 'Set YOUTUBE_UPLOADS_PLAYLIST_ID or YOUTUBE_CHANNEL_ID.' },
        { status: 200 }
      );
    }

    const videos = [];
    let pageToken = '';

    do {
      const params = new URLSearchParams({
        part: 'snippet',
        playlistId,
        maxResults: '50',
        key: apiKey,
      });

      if (pageToken) {
        params.set('pageToken', pageToken);
      }

      const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?${params}`, {
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error('Unable to load YouTube playlist videos.');
      }

      const data = (await response.json()) as YouTubePlaylistResponse;

      for (const item of data.items ?? []) {
        const id = item.snippet?.resourceId?.videoId;
        const title = item.snippet?.title;

        if (!id || !title || title === 'Private video' || title === 'Deleted video') {
          continue;
        }

        const description = item.snippet?.description?.split('\n').find(Boolean) ?? 'Watch this lesson from Dreams Science Academy.';
        const category = inferCategory(title, description);

        videos.push({
          id,
          title,
          category,
          description,
          tags: buildTags(title, description, category),
          thumbnail:
            item.snippet?.thumbnails?.high?.url ??
            item.snippet?.thumbnails?.medium?.url ??
            item.snippet?.thumbnails?.default?.url ??
            `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
        });
      }

      pageToken = data.nextPageToken ?? '';
    } while (pageToken);

    return NextResponse.json({ videos });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load YouTube videos.';

    return NextResponse.json({ videos: [], error: message }, { status: 200 });
  }
}

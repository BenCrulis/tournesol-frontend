import { VideoService } from 'src/services/openapi';

export function extractVideoId(idOrUrl: string) {
  const matchUrl = idOrUrl.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu.be\/)([A-Za-z0-9-_]+)/
  );
  if (matchUrl) {
    return matchUrl[1];
  }
  return idOrUrl;
}

export async function ensureVideoExistOrCreate(video_id: string) {
  // FIXME: should the video be created automatically?
  // And if so, shouldn't the backend be responsible for it?
  // It's currently impractical to check if the API error
  // is blocking or not.
  try {
    await VideoService.videoCreate({ video_id });
  } catch (err) {
    if (
      err.status === 400 &&
      err.body?.video_id?.[0]?.includes('already exists')
    ) {
      console.debug(
        'Video already exists in the database: API error can be ignored'
      );
    } else {
      throw err;
    }
  }
}

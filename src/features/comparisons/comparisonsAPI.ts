import { ensureVideoExistOrCreate } from 'src/utils/video';
import { UsersService } from '../../services/openapi';
import type { Comparison } from '../../services/openapi/models/Comparison';
import { OpenAPI } from '../../services/openapi/core/OpenAPI';

const api_url = process.env.REACT_APP_API_URL;

export const fetchComparisons = (
  access_token: string,
  limit: number,
  offset: number
) => {
  OpenAPI.TOKEN = access_token;
  OpenAPI.BASE = api_url ?? '';
  return UsersService.usersMeComparisonsList(limit, offset);
};

export const createComparison = async (
  access_token: string,
  comparison: Comparison
) => {
  OpenAPI.TOKEN = access_token;
  OpenAPI.BASE = api_url ?? '';

  await ensureVideoExistOrCreate(comparison.video_a.video_id);
  await ensureVideoExistOrCreate(comparison.video_b.video_id);

  return UsersService.usersMeComparisonsCreate(comparison);
};

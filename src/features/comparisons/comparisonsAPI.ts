import { ComparisonService } from '../../services/openapi';
import type { Comparison } from '../../services/openapi/models/Comparison';
import { OpenAPI } from '../../services/openapi/core/OpenAPI';

const api_url = process.env.REACT_APP_API_URL;

export const fetchComparisons = (access_token: string) => {
  OpenAPI.TOKEN = access_token;
  OpenAPI.BASE = api_url ?? '';
  return ComparisonService.comparisonList();
};

export const createComparison = (
  access_token: string,
  comparison: Comparison
) => {
  OpenAPI.TOKEN = access_token;
  OpenAPI.BASE = api_url ?? '';
  return ComparisonService.comparisonCreate(comparison);
};

// export const fetchComparisons = async (access_token: string) => {
//   const response = await fetch(api_url + '/comparison/', {
//     headers: {
//       Authorization: 'Bearer ' + access_token,
//     },
//   });
//   console.log(response);
//   return response.json();
// };

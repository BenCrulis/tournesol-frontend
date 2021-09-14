import type { PaginatedVideoList } from 'src/services/openapi/models/PaginatedVideoList';

const api_url = process.env.REACT_APP_API_URL;
const client_id = process.env.REACT_APP_OAUTH_CLIENT_ID || '';
const client_secret = process.env.REACT_APP_OAUTH_CLIENT_SECRET || '';

export const getRecommendedVideos = (
  searchString: string,
  callback: (m: PaginatedVideoList) => void
) => {
  const dayInMillisecondes = 1000 * 60 * 60 * 24;
  const conversionTime = new Map();
  const params = new URLSearchParams(searchString);
  conversionTime.set('Any', 1);
  conversionTime.set('Today', dayInMillisecondes);
  conversionTime.set('Week', dayInMillisecondes * 7);
  conversionTime.set('Month', dayInMillisecondes * 31);
  conversionTime.set('Year', dayInMillisecondes * 365);
  const dateNow = Date.now();

  if (params.get('date')) {
    const date = params.get('date');
    console.log(date);
    params.delete('date');
    if (date != 'Any') {
      const limitPublicationDateMilliseconds =
        dateNow - conversionTime.get(date) + dayInMillisecondes * 31; // issue with a gap of one month
      const param_date = new Date(limitPublicationDateMilliseconds);
      params.append(
        'date_gte',
        addZero(param_date.getDate().toString()) +
          '-' +
          addZero(param_date.getMonth().toString()) +
          '-' +
          param_date.getFullYear().toString().slice(2) +
          '-' +
          addZero(param_date.getHours().toString()) +
          '-' +
          addZero(param_date.getMinutes().toString()) +
          '-' +
          addZero(param_date.getSeconds().toString())
      );
    }
  }

  function addZero(str: string) {
    if (str.length == 1) {
      return '0'.concat(str);
    } else {
      return str;
    }
  }
  searchString = params.toString();
  fetch(`${api_url}/video/?`.concat(searchString), {
    // /?language=` + language + '&date=' + date if you wan to add parameters
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      callback(data);
    })
    .catch((err) => {
      console.log(err);
      callback({
        results: [],
        count: 0,
      });
    });
};

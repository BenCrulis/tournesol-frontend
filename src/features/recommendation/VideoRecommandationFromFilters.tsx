import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { PaginatedVideoList } from 'src/services/openapi';

import { CircularProgress } from '@material-ui/core';
import { getRecommendedVideos } from './RecommendationApi';
import VideoRecommendationCard from './VideoRecommendationCard';

function VideoRecommendationFromFilters() {
  const prov: PaginatedVideoList = { count: 0, results: [] };
  const [videos, setVideos] = useState(prov);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useLocation().search;

  useEffect(() => {
    setIsLoading(true);
    getRecommendedVideos(searchParams, (videos: PaginatedVideoList) => {
      setVideos(videos);
    });
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  console.log(videos);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <VideoRecommendationCard videos={videos} />
  );
}
export default VideoRecommendationFromFilters;

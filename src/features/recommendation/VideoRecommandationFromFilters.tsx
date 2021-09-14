import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { PaginatedVideoList } from 'src/services/openapi';

import { getRecommendedVideos } from './RecommendationApi';
import VideoRecommendationCard from './VideoRecommendationCard';

function VideoRecommendationFromFilters() {
  const prov: PaginatedVideoList = { count: 0, results: [] };
  const [videos, setVideos] = useState(prov);
  const searchParams = useLocation().search;

  useEffect(() => {
    getRecommendedVideos(searchParams, (videos: PaginatedVideoList) => {
      setVideos(videos);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return <VideoRecommendationCard videos={videos} />;
}

export default VideoRecommendationFromFilters;

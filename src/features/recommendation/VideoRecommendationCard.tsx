import React from 'react';

import type { PaginatedVideoList } from 'src/services/openapi';
import VideoList from '../videos/VideoList';
import SearchFilter from './SearchFilter';

function VideoRecommendationCard(props: { videos: PaginatedVideoList }) {
  return (
    <div className="main">
      <SearchFilter />
      <VideoList videos={props.videos} />
    </div>
  );
}

export default VideoRecommendationCard;

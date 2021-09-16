import React, { useState, useEffect } from 'react';

import type { Comparison } from 'src/services/openapi';
import { selectLogin } from 'src/features/login/loginSlice';
import { fetchComparisons } from 'src/features/comparisons/comparisonsAPI';
import ComparisonList from 'src/features/comparisons/ComparisonList';

import { useAppSelector } from '../../app/hooks';

function ComparisonsPage() {
  const token = useAppSelector(selectLogin);
  const [comparisons, setComparisons]: [
    Comparison[] | undefined,
    (l: Comparison[] | undefined) => void
  ] = useState();

  useEffect(() => {
    if (comparisons == undefined) {
      fetchComparisons(token?.access_token ?? '').then((data) => {
        setComparisons(data.results);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Runs only once

  return <ComparisonList comparisons={comparisons} />;
}

export default ComparisonsPage;

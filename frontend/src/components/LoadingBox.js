import React from 'react';
import { useLoading, Puff } from '@agney/react-loading';

export default function LoadingBox() {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Puff className="px-4" width="30" />,
  });

  return (
    <div className="loading">
      {indicatorEl}
    </div>
  );
}

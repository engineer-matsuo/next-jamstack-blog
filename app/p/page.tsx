'use client';

import { getSearchList } from '@/libs/dynamic';
import { LIMIT } from '@/constants';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'

type Props = {
  params: {
    current: string;
  };
};

// export const revalidate = 60;

export default function Page() {
  const [data, setData] = useState<any>({});
  const params = useSearchParams();
  const pageParam = params.get("p");
  const currentNumber = parseInt(pageParam as string, 10);
  // 以下のuseEffectはページが切り変わるたびに実行される
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getSearchList({
          limit: LIMIT,
          offset: LIMIT * (currentNumber - 1),
        });
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [pageParam]);

  // dataが更新されるまで表示しない
  if (!data.contents || !data.totalCount) {
    return null;
  }
  
  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} current={currentNumber} />
    </>
  );
}

'use client';
import { useEffect, useState } from 'react';
import ArticleList from '@/components/ArticleList';
import Pagination from '@/components/Pagination';
import { getSearchList } from '@/libs/dynamic';
import { LIMIT } from '@/constants';
import { useSearchParams } from 'next/navigation';

type Props = {
  searchParams: {
    q?: string;
  };
};

export default function Page() {
  const params = useSearchParams();
  const searchParam = params.get("q"); // クエリパラメータを取得
  const [data, setData] = useState<any>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getSearchList({
          q: searchParam || undefined,
          limit: LIMIT,
        });
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    if (searchParam) {
      fetchData();
    }
  }, [searchParam]);

  // dataが更新されるまで表示しない
  if (!data.contents || !data.totalCount) {
    return null;
  }

  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} basePath="/search" q={searchParam || undefined} />
    </>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { LIMIT } from '@/constants';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';
import { getSearchList } from '@/libs/dynamic';
import { useSearchParams } from 'next/navigation'

// export const revalidate = 60;

export default function Page() {
  const [data, setData] = useState<any>({});
  const params = useSearchParams();
  const searchParam = params.get("q"); // クエリパラメータを取得
  const pageParam = params.get("p");
  const currentNumber = parseInt(pageParam as string, 10);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getSearchList({
          limit: LIMIT,
          offset: LIMIT * (currentNumber - 1),
          q: searchParam || undefined,
        });
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [searchParam, pageParam]);

  // dataが更新されるまで表示しない
  if (!data.contents || !data.totalCount) {
    return null;
  }

  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination
        totalCount={data.totalCount}
        current={currentNumber}
        basePath="/search"
        q={searchParam || undefined}
      />
    </>
  );
}

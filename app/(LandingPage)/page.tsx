import { getList } from '@/libs/microcms';
import Link from 'next/link';
import { LIMIT } from '@/constants';
import ArticleList from '@/components/ArticleList';
import Card from '@/components/Card';
import styles from './page.module.css';

// export const revalidate = 0;

export default async function Page() {
  const data = await getList({
    limit: 6,
    orders: '-publishedAt',
  });
  const pickupData = getList({
    limit: LIMIT,
    filters: `pickup_flg[equals]true`,
  });
  return (
    <>
      <Link href={`/list`}>
        <div>aaaaaaaa</div>
      </Link>
      <section className={styles.articles}>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </section>
      {/* <section className={styles.articles}>
        <ArticleList articles={data.contents} />
        <Pagination totalCount={data.totalCount} />
      </section> */}
    </>
  );
}

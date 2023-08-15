import { getList } from '@/libs/microcms';
import Link from 'next/link';
import LandingArticleList from '@/components/LandingArticleList';
import styles from './layout.module.css';
import SearchField from '@/components/SearchField';

// export const revalidate = 0;

export default async function Page() {
  const data = await getList({
    limit: 6,
    orders: '-publishedAt',
  });
  const pickupData = await getList({
    limit: 6,
    filters: `pickup_flg[equals]true`,
  });
  return (
    <>
      <div className={styles.search}>
        <SearchField />
      </div>
      <div className={styles.center}>
        <h1 className={`${styles.landing_title} ${styles.h1}`}>
          New Posts
          <small className={styles.small}>新着記事</small>
        </h1>
      </div>
      <LandingArticleList articles={data.contents} />
      <div className={styles.center}>
        <h1 className={`${styles.landing_title} ${styles.h1}`}>
          PICK UP
          <small className={styles.small}>注目記事</small>
        </h1>
      </div>
      <LandingArticleList articles={pickupData.contents} />
    </>
  );
}

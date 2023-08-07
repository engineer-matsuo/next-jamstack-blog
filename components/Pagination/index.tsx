import Link from 'next/link';
import styles from './index.module.css';
import { LIMIT } from '@/constants';

type Props = {
  totalCount: number;
  current?: number;
  basePath?: string;
  q?: string;
};

export default function Pagination({ totalCount, current = 1, basePath = '', q }: Props) {
  const pages = Array.from({ length: Math.ceil(totalCount / LIMIT) }).map((_, i) => i + 1);
  return (
    <ul className={styles.container}>
      {pages.map((p) => (
        <li className={styles.list} key={p}>
          {current !== p ? (
            // クエリパラメータのパターンによって? か & をつける
            // basePathにtagsが含まれている場合パスパラメータ方式にする
            basePath.includes('tags') ? (
              // tagsがパスに含まれる場合
              <Link href={`${basePath}/p/${p}` + (q ? `?q=${q}` : '')} className={styles.item}>
                {p}
              </Link>
            ) : (
              <Link href={`${basePath}/p` + (p ? `?p=${p}` : '') + (p && q ? `&q=${q}` : !p && q ? `?q=${q}`: '' )} className={styles.item}>
                {p}
              </Link>
            )
          ) : (
            <span className={`${styles.item} ${styles.current}`}>{p}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

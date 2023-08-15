import '@splidejs/react-splide/css';
import { Article } from '@/libs/microcms';
import styles from './index.module.css';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  article: Article;
};

export default function Page({ article }: Props) {
  return (
    <div className={styles.article}>
      <div className={styles.article_wrapper }>
        <div className={styles.figure}>
          {/* <img src={article.thumbnail?.url} alt="" /> */}
          <Image 
            src={article.thumbnail?.url + `?width=400` || `/noimage.png`}
            alt="article thumbnail"
            fill
            style={{
              objectFit: 'cover',
            }}
            className={styles.image}
          />
        </div>
        <div className={styles.article_body}>
          <h2 className={styles.h2}>{article.title}</h2>
          <p>
            {article.description}
          </p>
          <div className={styles.in_readmore}>
            <Link href={`/articles/${article.id}`}>
              Read more
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className={`${styles.article_footer} ${styles.out_readmore}`}>
        <Link href={`/articles/${article.id}`}>
          Read more
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
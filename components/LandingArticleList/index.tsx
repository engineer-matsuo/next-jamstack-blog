import { Article } from '@/libs/microcms';
import LandingArticleListItem from '../LandingArticleListItem';
import styles from './index.module.css';

type Props = {
  articles?: Article[];
};

export default function ArticleList({ articles }: Props) {
  if (!articles) {
    return null;
  }
  if (articles.length === 0) {
    return <p>記事がありません。</p>;
  }
  return (
    <section className={styles.articles}>
      {articles.map((article) => (
        <LandingArticleListItem key={article.id} article={article} />
      ))}
    </section>
  );
}

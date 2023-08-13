import '@splidejs/react-splide/css';
import { Article } from '@/libs/microcms';
import styles from './index.module.css';

type Props = {
  article: Article;
};

export default function Page() {
  return (
    <div className={styles.article}>
      <div className={styles.article_wrapper }>
        <div className={styles.figure}>
          <img src="https://picsum.photos/id/1011/800/450" alt="" />
        </div>
        <div className={styles.article_body}>
          <h2>This is some title</h2>
          <p>
            Curabitur convallis ac quam vitae laoreet. Nulla mauris ante, euismod sed lacus sit amet, congue bibendum eros. Etiam mattis lobortis porta. Vestibulum ultrices iaculis enim imperdiet egestas.
          </p>
          <a href="#" className={`read-more`}>
            Read more <span className={styles.sr_only}>about this is some title</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
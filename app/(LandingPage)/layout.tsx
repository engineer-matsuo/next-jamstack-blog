import { getList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Slider from '@/components/Slider';
import '../globals.css';
import styles from './layout.module.css';

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const data = await getList({
    limit: LIMIT
  });

  return (
    <>
      <Header />
      <div className={styles.slider_big}>
        <Slider articles={data.contents} perPage={3}/>
      </div>
      <div className={styles.slider_middle}>
        <Slider articles={data.contents} perPage={2}/>
      </div>
      <div className={styles.slider_small}>
        <Slider articles={data.contents} perPage={1}/>
      </div>
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}

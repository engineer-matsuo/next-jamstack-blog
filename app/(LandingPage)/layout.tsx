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
      <Slider articles={data.contents} perPage={3}/>
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}

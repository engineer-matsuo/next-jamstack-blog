import { getTagList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import '../globals.css';
import styles from '../layout.module.css';

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const tags = await getTagList({
    limit: LIMIT,
  });
  return (
    <>
      <Header />
      <Nav tags={tags.contents} />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}

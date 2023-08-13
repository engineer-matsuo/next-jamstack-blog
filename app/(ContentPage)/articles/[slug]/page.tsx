import { getDetail } from '@/libs/microcms';
import Article from '@/components/Article';
import { getAllBlogs } from '@/libs/dynamic';

type Blog = {
  id: string;
}

// export const revalidate = 60;

export default async function Page({ params } : {params: {slug: string}}) {
  const data = await getDetail(params.slug);
  return <Article data={data} />;
}

export async function generateStaticParams() {
  const data = await getAllBlogs();
  const paths = data.map((blog: Blog) => ({
    slug: blog.id,
  }));
  return paths
}

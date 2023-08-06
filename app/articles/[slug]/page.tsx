import { Metadata } from 'next';
import { getDetail } from '@/libs/microcms';
import Article from '@/components/Article';
import { getAllBlogs } from '@/libs/dynamic';

type Blog = {
  id: string;
}

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    dk: string;
  };
};

// export const revalidate = 60;

export default async function Page({ params } : {params: {slug: string}}) {
  const data = await getDetail(params.slug);
  return <Article data={data} />;
}

// export async function Page(props:any) {
//   return {
//     title: props.title,
//     description: props.description,
//     openGraph: {
//       title: props.title,
//       description: props.description,
//       images: [props?.thumbnail?.url || ''],
//     },
//   };
// }

export async function generateStaticParams() {
  const data = await getAllBlogs();
  const paths = data.map((blog: Blog) => ({
    slug: blog.id,
  }));
  console.log(paths);
  return paths
}

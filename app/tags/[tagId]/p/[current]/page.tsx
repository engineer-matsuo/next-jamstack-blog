import { getList, getTagList, Tag, Blog } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';

type Props = {
  params: {
    tagId: string;
    current: string;
  };
};

type Paths = {
  tagId: string;
  current: string;
}

const GET_TAGS_LIMIT = 50;

// export const revalidate = 60;

export default async function Page({ params }: Props) {
  const { tagId } = params;
  const current = parseInt(params.current as string, 10);
  const data = await getList({
    limit: LIMIT,
    offset: LIMIT * (current - 1),
    filters: `tags[contains]${tagId}`,
  });
  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} current={current} basePath={`/tags/${tagId}`} />
    </>
  );
}

export async function generateStaticParams() {
  let paths:Paths[] = []
  const tagData = await getTagList({
    limit: GET_TAGS_LIMIT,
  });
  const tagIds = tagData.contents.map((tag: Tag) => ({
    tagId: tag.id, 
  }));
  for (const tagId of tagIds) {
    const pageDatas = await getList({
      limit: GET_TAGS_LIMIT,
      fields: 'id',
      filters: `tags[contains]${tagId.tagId}`,
      offset: GET_TAGS_LIMIT,
    });
    const pages = Array.from({ length: Math.ceil(pageDatas.totalCount / LIMIT) }).map((_, i) => i + 1);
    pages.forEach((page) => {
      paths.push({tagId: tagId.tagId, current: page.toString()})
    });
  }
  return paths
}

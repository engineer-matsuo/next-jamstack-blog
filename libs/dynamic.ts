import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSDate,
  MicroCMSContentId,
} from 'microcms-js-sdk';
import { notFound } from 'next/navigation';

// タグの型定義
export type Tag = {
  name: string;
} & MicroCMSContentId &
  MicroCMSDate;

// ライターの型定義
export type Writer = {
  name: string;
  profile: string;
  image?: MicroCMSImage;
} & MicroCMSContentId &
  MicroCMSDate;

// ブログの型定義
export type Blog = {
  id: any;
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  tags?: Tag[];
  writer?: Writer;
};

export type Article = Blog & MicroCMSContentId & MicroCMSDate;

// ブログ一覧を取得
// 引数に使えるのはqのパラメータのみ
// サーバー側できっちり処理する
export const getSearchList = async (queries?: MicroCMSQueries) => {
  // listDataが変数
  // 同期処理で外部APIを叩く
  // GETリクエストを送る
  // search.engineer-matsuo.workers.dev/api/search?q=${queries}
  const searchWord = queries?.q;
  // limitの値があれば、その値ないならデフォルト10を使う
  const limit = queries?.limit || 10;
  // offsetの値があれば、その値ないならデフォルト0を使う
  const offset = queries?.offset || 0;

  const listData = await fetch(
    `${process.env.NEXT_PUBLIC_SEARCH_API_DOMAIN}/api/search?${searchWord ? "q=" + searchWord + "&": ""}limit=${limit}&offset=${offset}`,
    {
      cache: 'no-store',
    },
  );
  return listData;
};

/**
 * /api/blog-allというエンドポイントにアクセスする
 * 戻り値はブログの一覧
 * @returns
 */
export const getAllBlogs = async () => {
  const allBlogs = await fetch(`${process.env.NEXT_PUBLIC_SEARCH_API_DOMAIN}/api/blog-all`,
    {
      cache: 'no-store',
    });
  const allBlogsJson = await allBlogs.json();
  return allBlogsJson;
};

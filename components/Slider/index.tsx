'use client'
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import { Article } from '@/libs/microcms';
import styles from './index.module.css';
import Image from 'next/image';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

type Props = {
  articles: Article[];
  perPage?: number;
};

export default function Page({ articles, perPage }: Props) {
  return (
    <Splide
      aria-label="私のお気に入りの画像集"
      options={{
        // autoplay: true, // 自動再生を有効
        // interval: 5000, // 自動再生の間隔を3秒に設定
        type: 'loop', // ループの種類を設定
        // cover: true, // コンテンツの幅をスライダーの幅に合わせる
        pauseOnHover: true, // ホバー時に自動再生を停止しない
        pauseOnFocus: false, // フォーカス時に自動再生を停止しない
        // speed: 2000, // スライドの切り替わりの速度を設定
        padding: "1rem", // スライド間の余白を設定
        arrows: false,
        gap: '1rem',
        perPage: perPage,
        height: '15rem',
        // loopAdditionalSlides: 1,
        autoScroll: {
          speed: .1,
          autoStart: true,
        },
      }}
      extensions={{AutoScroll}}
    >
      {articles.map((data) => (
        <SplideSlide key={data.id}>
          <Image
            src={data.thumbnail?.url + `?width=400` || ''}
            alt="top image"
            layout="fill"
            objectFit="cover"
          >
          </Image>
        </SplideSlide>
      ))}
    </Splide>
  )
}
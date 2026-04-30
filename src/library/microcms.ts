import { createClient, type MicroCMSQueries } from "microcms-js-sdk";

// ローカル(import.meta.env)とCloudflare本番(process.env)の両方から安全に取得する
const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN || (typeof process !== 'undefined' ? process.env.MICROCMS_SERVICE_DOMAIN : '');
const apiKey = import.meta.env.MICROCMS_API_KEY || (typeof process !== 'undefined' ? process.env.MICROCMS_API_KEY : '');

// ここで「client」という名前で作成しています
export const client = createClient({
  serviceDomain: serviceDomain as string,
  apiKey: apiKey as string,
});

// イベント（Event）の型定義
export type Event = {
  id: string;
  content: string;
  date: string;
  tags: string[];
  title?: string;
  english_title?: string;
  photo_gallery?: {
    fieldId: "photo_item";
    image: { url: string; width: number; height: number };
    photo_title: string;
  }[];
};

// 実績（Work）の型定義
export type Work = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;

  // 新しいAPIスキーマ
  title: string;
  category?: string | string[]; // セレクトフィールドは設定によって配列で返ることもあるため、両対応にします
  location?: string;
  "top-image"?: { url: string; width: number; height: number }; // ハイフン付きのフィールドID
  content?: string;
};

// 実績一覧を取得する関数
export const getWorks = async (queries?: MicroCMSQueries) => {
  // microcmsClient ではなく client を使います
  return await client.getList<Work>({ endpoint: "works", queries });
};

// 特定の実績（1件）を取得する関数
export const getWorkDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  // こちらも client を使います
  return await client.getListDetail<Work>({ endpoint: "works", contentId, queries });
};
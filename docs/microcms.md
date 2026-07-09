# microCMS スキーマ

コンテンツ管理は [microCMS](https://microcms.io/) を使用。接続設定は
[`src/library/microcms.ts`](../src/library/microcms.ts) を参照（環境変数は [README.md](../README.md) の「環境変数」節）。

---

## エンドポイント: `events`（リスト形式）

イベント＆お知らせの記事。型定義は `src/library/microcms.ts` の `Event` 型。

| フィールドID | 型 | 必須 | 説明 |
| :--- | :--- | :--- | :--- |
| `id` | 文字列（自動） | ✅ | コンテンツID。詳細ページ `/events/{id}` の URL に使用 |
| `content` | テキスト | ✅ | 記事タイトル（一覧・見出しに表示） |
| `date` | 日時 | ✅ | 公開日。`toLocaleDateString("ja-JP")` で表示 |
| `tags` | 複数選択 | ✅ | タグ（後述）。絞り込み・色分け・詳細ページ生成の判定に使用 |
| `title` | テキスト | 任意 | 詳細ページのタイトル |
| `english_title` | テキスト | 任意 | 詳細ページの英語サブタイトル |
| `photo_gallery` | 繰り返し（`photo_item`） | 任意 | フォトギャラリー。下記参照 |

### `photo_gallery` の繰り返しフィールド（`fieldId: "photo_item"`）
| フィールド | 型 | 説明 |
| :--- | :--- | :--- |
| `image` | 画像（`url` / `width` / `height`） | 表示する写真 |
| `photo_title` | テキスト | 写真のキャプション |

---

## タグの扱い

タグは表示の色分けと、詳細ページを生成するかどうかの判定に使われる。

### 色分け（`tagColors`）
`src/pages/events/index.astro` で定義。使用タグ: `お知らせ` / `Web更新` / `実績紹介` / `記念式典` / `社内行事` / `アーカイブ` / `その他`。
未定義タグは `その他` の色にフォールバックする。

### 詳細ページを生成するタグ（`linkableTags`）
```
["記念式典", "社内行事", "アーカイブ"]
```
- これらのタグを**1つ以上含む記事だけ**、詳細ページ `/events/{id}` が生成され、一覧からリンクされる。
- 該当しない記事は一覧に表示されるがリンクされない（テキスト表示のみ）。
- 判定ロジック: `src/pages/events/index.astro` および `src/pages/events/[id].astro` の `getStaticPaths`。

---

## 運用メモ（記事を追加するとき）

1. microCMS 管理画面で `events` に記事を追加。`content`（タイトル）・`date`・`tags` は必須。
2. 写真を見せたい場合は `photo_gallery` に画像＋`photo_title` を追加し、`tags` に `記念式典` / `社内行事` / `アーカイブ` のいずれかを付けると詳細ページが生成される。
3. サイトは静的生成のため、**microCMS の更新後に再ビルド（自動デプロイ）が必要**。詳細は [README.md](../README.md) の「自動デプロイ」を参照。

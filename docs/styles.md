# スタイル設計ガイド

CSS は [Tailwind CSS](https://tailwindcss.com/) v4 をベースに、繰り返し使う部品を
[`src/styles/common.css`](../src/styles/common.css) で**共通クラス**として定義している。
コンポーネント側では原則この共通クラスを使い、インラインの Tailwind ユーティリティの重複を避ける。

- `common.css` … 全ページ共通の部品・カラートークン
- `top.css` … トップページ固有のスタイル
- `gallery.css` … イベント詳細のフォトギャラリー用スタイル

---

## 命名規約

| 記法 | 意味 | 例 |
| :--- | :--- | :--- |
| `block-element` | 機能ブロック | `section-container`, `mobile-menu` |
| `block--variant` | バリエーション（BEM風の `--`） | `card--feature`, `btn-back`, `nav-dropdown-link--last` |
| `block-element` の `::before` / `::after` | 矢印などの装飾を自動付与 | `breadcrumb a::after`, `footer-link::before` |

> 装飾（矢印アイコンなど）は擬似要素 + FontAwesome の文字コードで自動挿入している箇所がある。
> 例: `.nav-dropdown-trigger::after`（`\f078` = chevron-down）, `.footer-link::before`（`\f054` = chevron-right）。

---

## カラートークン

`:root` の CSS 変数を `@theme` で Tailwind に登録している。クラス側では `bg-primary` / `text-accent` のように使う。

| トークン | 値 | 用途 |
| :--- | :--- | :--- |
| `primary` | `#2c3e50` | 見出し・シックな背景（濃いネイビーグレー） |
| `secondary` | `#008c5e` | サブタイトル・装飾 |
| `accent` | `#008c5e` | ボタン等のメインアクション（コーポレートグリーン） |
| `accent-hover` | `#006b48` | アクセントのホバー |
| `accent-muted` | `#e6f4ef` | 選択中メニュー背景など極薄グリーン |
| `light` | `#f4f5f7` | 画面全体の背景（薄グレー） |
| `surface` | `#ffffff` | カード・モーダル背景 |
| `surface-alt` | `#e2e6ea` | ヘッダー背景・区切り |
| `text-body` | `#495057` | 本文 |
| `text-muted` | `#868e96` | 補足・プレースホルダー |
| `text-inverse` | `#ffffff` | 暗い背景上の文字 |
| `border` | `#ced4da` | 枠線・分割線 |
| `accent-opening` | `#FFA500` | オープニング用オレンジ |
| `accent-top` | `#db0a1d` | トップ用 |

フォント: `--font-eng`（Oswald）を `font-eng` クラスで使用（英字見出し用）。本文は Noto Sans JP。

---

## 共通クラス一覧

### セクション構造
| クラス | 役割 |
| :--- | :--- |
| `section-container` | セクション内の基本コンテナ（`container mx-auto px-4`） |
| `section-header` | 見出しブロック全体（中央寄せ・下マージン） |
| `section-eyebrow` | 見出し上の英語小見出し |
| `section-title` / `section-title-white` | セクション見出し（h2）／白文字版 |
| `section-divider` / `section-divider--left` | 見出し下のアクセントバー（中央／左寄せ） |

### ボタン
| クラス | 役割 |
| :--- | :--- |
| `btn-primary` / `btn-primary-sm` | グリーン塗りのメインCTA／小型版 |
| `btn-secondary` | ネイビー塗りのサブCTA |
| `btn-back` | 白背景・ボーダー付きの戻るボタン |
| `btn-transparent` | 暗い背景用の透過ボタン |
| `btn-gallery-nav` | ギャラリー左右ナビボタン（位置は使う側で指定） |

### カード / バッジ / アイコン
| クラス | 役割 |
| :--- | :--- |
| `card--feature` | 強み紹介カード（大きい影・ホバー） |
| `card--works` | 実績一覧カード（シンプル） |
| `card--info` | 情報表示カード（`bg-light`） |
| `card--detail` | 小さい情報カード（`bg-surface`） |
| `card--transparent` | 暗い背景用の透過カード |
| `badge--event` / `badge--accent` / `badge--primary` | バッジ各種 |
| `icon-circle--accent` / `icon-circle--surface` | アイコン丸コンテナ |

### ナビゲーション
| クラス | 役割 |
| :--- | :--- |
| `header-nav` | ヘッダー全体（固定・すりガラス） |
| `header-brand` | ロゴ（ブランド）リンク |
| `nav-link` | ドロップダウン無しの通常リンク |
| `nav-dropdown-trigger` | ドロップダウンの親リンク（`::after` で下矢印） |
| `nav-dropdown-menu` | ドロップダウンの枠（group-hover で表示） |
| `nav-dropdown-link` / `--last` | ドロップダウン内リンク／最後（下線なし） |

### モバイルメニュー
| クラス | 役割 |
| :--- | :--- |
| `mobile-menu` | メニュー枠。**表示制御は要素側の `hidden`/`flex` クラスで行う**（[common.js](../public/assets/js/common.js) が開閉） |
| `mobile-menu-heading` | カテゴリ見出し |
| `mobile-menu-link` / `--last` | メニュー内リンク／最後 |
| `mobile-menu-btn` | ハンバーガーボタン |

> ⚠️ `mobile-menu` の開閉は `hidden` ⇄ `flex` のトグルで行う。`.mobile-menu` 自体に
> `hidden` を焼き込まないこと（焼き込むと `hidden` と `flex` が競合してメニューが開かなくなる。過去に発生した不具合、v1.2.1 で修正）。

### その他
| クラス | 役割 |
| :--- | :--- |
| `breadcrumb`（`a` / `span` / `a::after`） | パンくずリスト（矢印は自動挿入） |
| `checklist-item` | チェックマーク付きリスト項目 |
| `footer-heading` / `footer-text` / `footer-copyright` / `footer-link` | フッター各種（`footer-link::before` で矢印） |
| `workflow-step` / `workflow-step-circle` | ご依頼の流れ（ワークフロー）のステップ |

---

## クライアントサイド JS

`public/assets/js/` 配下に配置し、`<script src="..." is:inline>` で読み込む。

| ファイル | 用途 | 読み込み場所 |
| :--- | :--- | :--- |
| `common.js` | ヘッダーのモバイルメニュー開閉（全ページ共通） | [Layout.astro](../src/layouts/Layout.astro) |
| `top.js` | トップページ固有 | `src/pages/index.astro` |
| `events-list.js` | イベント一覧の絞り込み・ページネーション | `src/pages/events/index.astro` |
| `event.js` | イベント詳細のギャラリー・ライトボックス | `src/pages/events/[id].astro` |

> `common.js` は共通レイアウトで1回だけ読み込む（各ページで重複読み込みするとイベントが二重登録される）。

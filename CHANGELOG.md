# CHANGELOG

このプロジェクトのバージョンごとの変更履歴。

---

## [v1.2.1]

### 修正
- **ヘッダーのハンバーガーメニューが開かない不具合を修正**
  - `common.js`（メニュー開閉処理）を各ページ個別読み込みから共通の `Layout.astro` に集約（`src/layouts/Layout.astro`）
  - `.mobile-menu` に焼き込まれていた `hidden` を除去し、要素側の `hidden`/`flex` クラスで開閉を制御するよう修正（`src/styles/common.css` / `Layout.astro`）
  - `index.astro` / `infection.astro` の重複読み込みを削除

### その他
- `package.json` の `version` をリリースタグに合わせて更新（`0.0.1` → `1.2.1`）。以降リリースごとに追随

---

## [v1.2.0]

### 追加
- **`CHANGELOG.md` を新規作成**し、v0.1.0〜v1.1.0 の変更履歴を記録

### 変更
- **`README.md` を整備**（技術スタック / ブランチ構成 / 自動デプロイ / バージョン管理 / ディレクトリ構成）

---

## [v1.1.0]

### 追加
- **イベント詳細ページのフォトギャラリーJSを新規追加**（`public/assets/js/event.js`／174行）
  - スライダーの自動送り・前後ナビ・ドット・タイトル表示
  - ライトボックス（全画面表示）機能を新設
- **イベント一覧の絞り込み/ページネーションJSを外部化**（`public/assets/js/events-list.js`／84行）
- **ギャラリー用スタイルを新規追加**（`src/styles/gallery.css`／95行）
- 旧イベント詳細ページをバックアップ保存（`src/pages/events/[id]-old.astro`）

### 変更
- **ワークフロー（施工の流れ）をデータ駆動化**（`src/components/Workflow.astro`）
  - 5ステップのベタ書きHTMLを配列＋`map()`ループへ書き換え
  - スタイルを共通クラス `.workflow-step` / `.workflow-step-circle` に切り出し
- **イベント詳細ページのギャラリーUIを刷新**（`src/pages/events/[id].astro`）
  - 下部バー（左:タイトル／中央:ドット／右:全画面ボタン）を新設
  - 左右ナビボタンを共通クラス `.btn-gallery-nav` に統一
- **イベント一覧ページを整理**（`src/pages/events/index.astro`）
  - インラインscriptを `events-list.js` へ分離
  - タイトル部を `.section-header` 共通クラスに統一、余白・ホバー色を微調整
  - 戻るボタンのアイコンを削除
- 共通スタイルにギャラリー・ワークフロー用クラスを追加（`src/styles/common.css`／28行追加）

### 修正
- **イベント一覧の日付・タグ・タイトルの並びを修正**（`src/pages/events/index.astro`）
  - 未定義クラス `.event-meta` により `flex` が効かずレイアウトが崩れていた問題を解消
  - 日付とタグを横並び・その下にイベント名の表示に戻した

### 規模
- 変更ファイル数：8ファイル
- 追加：711行 / 削除：231行

---

## [v1.0.0]

正式リリース。コーポレートサイトの各セクション（トップ・事業内容・特設/イベント・イベント一覧/詳細・感染対策ページ等）を公開。

### 変更
- 全ページ・全コンポーネントのCSSを全面的に整備・調整
  - `About` / `components` / `infection` / `[id]` / `events` / `opening` / `linear` / `breadcrumb` / `btn` / `header・footer` / `Layout` 等
- ワークフローの項目・文言を調整、`works.astro` を修正
- 不要な `global.css`・astroファイルを削除

---

## [v0.9.0]

開発版。主要ページが一通り揃った段階。

### 変更
- 特設ページ（`special`）を整備
- ヘッダー / フッターの修正、細部の調整（PR #7 マージ）

---

## [v0.8.0]

### 追加
- `linear.astro` / `infection.astro` / `index.astro` を追加

### 変更
- トップページを調整
- microCMS 連携を修正
- ライブビュー機能を試験導入後に一旦削除

---

## [v0.5.0]

### 追加
- 旧サイトを取り込み、各セクションのコンポーネントを整備
  （`Layout` / `Strength` / `Service` / `Workflow` / `Recruit` / `Access` / `Contact` / `Work` / `special`）
- microCMS（`microcms-js-sdk`）を導入・オプション設定

### 変更
- API 設定・ロゴを調整

---

## [v0.1.0]

Astro プロジェクトの初期セットアップ。

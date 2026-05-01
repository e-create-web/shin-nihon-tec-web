/**
 * filter-pagination.js
 * 
 * フィルタ＋ページネーション共通スクリプト
 * events/index.astro・works/index.astro など複数ページで使い回せます。
 *
 * 使い方：
 *   <script src="/assets/js/filter-pagination.js" is:inline></script>
 *   <script is:inline>
 *     document.addEventListener('DOMContentLoaded', () => {
 *       initFilterPagination({
 *         itemSelector:      '.work-item',   // 一覧アイテムのCSSセレクタ
 *         filterSelector:    '.filter-btn',  // フィルタボタンのCSSセレクタ
 *         filterAttr:        'data-category',// ボタン側の絞り込みキー属性
 *         dataAttr:          'data-categories', // アイテム側のカテゴリ属性
 *         listContainerId:   'works-list',   // 一覧コンテナのid
 *         paginationId:      'pagination',   // ページネーションコンテナのid
 *         itemsPerPage:      9,              // 1ページあたりの表示件数
 *       });
 *     });
 *   </script>
 */

function initFilterPagination({
  itemSelector,
  filterSelector,
  filterAttr,
  dataAttr,
  listContainerId,
  paginationId,
  itemsPerPage,
}) {
  // --- 要素の取得 ---
  const items = Array.from(document.querySelectorAll(itemSelector));
  const filterBtns = document.querySelectorAll(filterSelector);
  const paginationContainer = document.getElementById(paginationId);
  const listContainer = document.getElementById(listContainerId);

  // 必須要素が揃っていない場合は早期リターン（ページ誤読み込み対策）
  if (!paginationContainer || !listContainer || items.length === 0) return;

  // --- 状態管理 ---
  let currentPage = 1;
  let currentFilter = 'all';

  // --- レンダリング ---
  function render() {
    // 1. 現在のフィルタ条件でアイテムを絞り込む
    const filteredItems = items.filter(item => {
      if (currentFilter === 'all') return true;
      const values = (item.getAttribute(dataAttr) || '').split(',');
      return values.includes(currentFilter);
    });

    // 2. 総ページ数を計算し、現在ページが範囲外なら補正する
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

    // 3. 表示範囲のアイテムだけ表示する
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    items.forEach(item => (item.style.display = 'none'));
    filteredItems.slice(startIndex, endIndex).forEach(item => {
      item.style.display = 'block';
    });

    // 4. ページネーションを再描画する
    renderPagination(totalPages);
  }

  // --- ページネーション描画 ---
  function renderPagination(totalPages) {
    paginationContainer.innerHTML = '';
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.className =
        i === currentPage
          ? 'w-10 h-10 rounded-full flex items-center justify-center font-bold bg-accent text-white shadow-md'
          : 'w-10 h-10 rounded-full flex items-center justify-center font-bold bg-surface-alt text-primary hover:bg-border border border-border transition cursor-pointer';

      btn.addEventListener('click', () => {
        currentPage = i;
        render();
        // 一覧の先頭へスクロール（ヘッダー分100px引く）
        window.scrollTo({ top: listContainer.offsetTop - 100, behavior: 'smooth' });
      });

      paginationContainer.appendChild(btn);
    }
  }

  // --- フィルタボタンのクリック処理 ---
  filterBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      // 全ボタンをリセット
      filterBtns.forEach(b => {
        b.classList.remove('bg-primary', 'text-white', 'shadow-md');
        b.classList.add('bg-surface-alt', 'text-primary');
      });

      // クリックされたボタンをアクティブに
      e.currentTarget.classList.remove('bg-surface-alt', 'text-primary');
      e.currentTarget.classList.add('bg-primary', 'text-white', 'shadow-md');

      // フィルタと現在ページを更新して再描画
      currentFilter = e.currentTarget.getAttribute(filterAttr) || 'all';
      currentPage = 1;
      render();
    });
  });

  // --- 初期描画 ---
  render();
}
/**
 * event-slider.js
 *
 * フォトギャラリー用スライダースクリプト
 * events/[id].astro で使用します。
 *
 * 対象HTML構造（既存のまま変更不要）:
 *   <div id="gallery-container">
 *     <div class="slide" data-index="0">...</div>
 *     <div class="slide" data-index="1">...</div>
 *     <button id="prev-btn">...</button>
 *     <button id="next-btn">...</button>
 *     <span class="dot" data-index="0"></span>
 *     <span class="dot" data-index="1"></span>
 *   </div>
 *
 * 使い方：
 *   <script src="/assets/js/event-slider.js" is:inline></script>
 *   ※ DOMContentLoaded は内部で処理するため、呼び出し側に追加コードは不要です。
 */

(function () {
  function setupSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots   = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // スライドが存在しない場合は何もしない
    if (slides.length === 0) return;

    // スライドが1枚のみの場合はボタンを非表示にして終了
    if (slides.length === 1) {
      prevBtn?.classList.add('hidden');
      nextBtn?.classList.add('hidden');
      return;
    }

    let currentIndex = 0;

    // --- 表示更新 ---
    function updateDisplay() {
      slides.forEach((slide, index) => {
        slide.classList.toggle('opacity-100', index === currentIndex);
        slide.classList.toggle('z-10',        index === currentIndex);
        slide.classList.toggle('opacity-0',   index !== currentIndex);
        slide.classList.toggle('z-0',         index !== currentIndex);
      });
      dots.forEach((dot, index) => {
        dot.classList.toggle('opacity-100', index === currentIndex);
        dot.classList.toggle('opacity-50',  index !== currentIndex);
      });
    }

    // --- 次のスライドへ ---
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateDisplay();
    }

    // --- 前のスライドへ ---
    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateDisplay();
    }

    // --- 自動再生（5秒ごと） ---
    let timer = setInterval(nextSlide, 5000);

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(nextSlide, 5000);
    }

    // --- ボタンのイベント登録 ---
    prevBtn?.addEventListener('click', () => { prevSlide(); resetTimer(); });
    nextBtn?.addEventListener('click', () => { nextSlide(); resetTimer(); });
  }

  document.addEventListener('DOMContentLoaded', setupSlider);
})();
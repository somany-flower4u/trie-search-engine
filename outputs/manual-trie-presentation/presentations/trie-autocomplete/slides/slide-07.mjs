import { bg, body, box, C, footer, kicker, line, title } from "./theme.mjs";

function fileBox(slide, ctx, name, desc, x, y, color) {
  box(slide, ctx, { x, y, w: 260, h: 112, fill: C.white, stroke: color, width: 2 });
  body(slide, ctx, name, x + 20, y + 20, 210, 26, 22, color);
  body(slide, ctx, desc, x + 20, y + 58, 210, 34, 15, C.muted);
}

export async function slide07(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "CODE STRUCTURE");
  title(slide, ctx, "자료구조 로직, React 상태, 화면 렌더링을 분리해 설명하기 쉽게 구성했습니다.", 64, 88, 980, C.ink, 36);

  fileBox(slide, ctx, "src/trie.js", "TrieNode / Trie 클래스\n핵심 알고리즘 구현", 86, 238, C.sky);
  fileBox(slide, ctx, "src/App.jsx", "입력 상태, localStorage\nReact Flow 연결", 392, 238, C.emerald);
  fileBox(slide, ctx, "styles.css", "Tailwind CSS와 전역 UI 스타일", 698, 238, C.amber);
  fileBox(slide, ctx, "README.md", "실행 방법과 알고리즘 설명", 1004, 238, C.indigo);
  line(slide, ctx, 346, 294, 392, 294, C.line, 3);
  line(slide, ctx, 652, 294, 698, 294, C.line, 3);
  line(slide, ctx, 958, 294, 1004, 294, C.line, 3);

  box(slide, ctx, { x: 126, y: 436, w: 420, h: 112, fill: C.skySoft, stroke: C.sky });
  body(slide, ctx, "상태 분리", 152, 462, 160, 26, 22, "#075985");
  body(slide, ctx, "React state는 words[]만 보관하고 Trie는 useMemo로 파생합니다.", 152, 498, 340, 34, 16, "#075985");
  box(slide, ctx, { x: 626, y: 436, w: 420, h: 112, fill: C.emeraldSoft, stroke: C.emerald });
  body(slide, ctx, "저장 방식", 652, 462, 160, 26, 22, "#047857");
  body(slide, ctx, "백엔드 없이 localStorage에 단어 목록을 저장하고 복원합니다.", 652, 498, 340, 34, 16, "#047857");
  footer(slide, ctx, 7);
  return slide;
}

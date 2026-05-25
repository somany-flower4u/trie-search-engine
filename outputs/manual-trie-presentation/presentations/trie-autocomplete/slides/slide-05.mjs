import { bg, body, box, C, footer, kicker, line, title } from "./theme.mjs";

function stage(slide, ctx, label, sub, x, y, fill, color) {
  box(slide, ctx, { x, y, w: 210, h: 118, fill, stroke: color, width: 2 });
  body(slide, ctx, label, x + 18, y + 22, 170, 28, 22, color);
  body(slide, ctx, sub, x + 18, y + 58, 174, 40, 15, "#475569");
}

export async function slide05(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "IMPLEMENTATION FLOW");
  title(slide, ctx, "시각화는 하드코딩된 그림이 아니라 Trie 분석 결과에서 만들어집니다.", 64, 88, 980, C.ink, 36);
  body(slide, ctx, "React는 단어 목록 상태만 보관하고, Trie 인스턴스와 자동완성 분석 결과는 상태에서 파생합니다.", 66, 202, 850, 42, 19);

  stage(slide, ctx, "words[]", "React state\nlocalStorage 저장", 78, 308, C.white, C.sky);
  stage(slide, ctx, "new Trie(words)", "Trie 상태는 독립 객체로 재구성", 322, 308, C.white, C.indigo);
  stage(slide, ctx, "autocomplete()", "traversalPath\nvisitedPaths\nresultWordPaths", 566, 308, C.white, C.emerald);
  stage(slide, ctx, "React Flow", "nodes + edges\n색상 강조 렌더링", 810, 308, C.white, C.amber);
  line(slide, ctx, 288, 367, 322, 367, C.line, 4);
  line(slide, ctx, 532, 367, 566, 367, C.line, 4);
  line(slide, ctx, 776, 367, 810, 367, C.line, 4);

  box(slide, ctx, { x: 102, y: 520, w: 250, h: 74, fill: C.skySoft, stroke: C.sky });
  body(slide, ctx, "파란색: prefix 탐색 경로", 126, 546, 204, 22, 18, "#075985");
  box(slide, ctx, { x: 390, y: 520, w: 250, h: 74, fill: C.emeraldSoft, stroke: C.emerald });
  body(slide, ctx, "초록색: 추천 단어 경로", 414, 546, 204, 22, 18, "#047857");
  box(slide, ctx, { x: 678, y: 520, w: 250, h: 74, fill: C.roseSoft, stroke: C.rose });
  body(slide, ctx, "빨간 점: 단어 끝 노드", 706, 546, 196, 22, 18, "#BE123C");
  footer(slide, ctx, 5);
  return slide;
}

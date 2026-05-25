import { bg, body, box, C, footer, kicker, line, node, title } from "./theme.mjs";

export async function slide03(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "DATA STRUCTURE");
  title(slide, ctx, "Trie는 공통 prefix를 한 번만 저장해서 단어 집합을 압축합니다.", 64, 88, 900, C.ink, 36);

  box(slide, ctx, { x: 76, y: 188, w: 610, h: 410, fill: C.white, stroke: "#D5DEE8" });
  node(slide, ctx, "root", 346, 224, C.ink, C.ink, C.white);
  node(slide, ctx, "a", 346, 316, C.skySoft, C.sky, "#075985");
  node(slide, ctx, "p", 346, 408, C.skySoft, C.sky, "#075985");
  node(slide, ctx, "p*", 346, 500, C.emeraldSoft, C.emerald, "#047857");
  node(slide, ctx, "l", 236, 592, C.emeraldSoft, C.emerald, "#047857");
  node(slide, ctx, "i", 346, 592, C.emeraldSoft, C.emerald, "#047857");
  node(slide, ctx, "y*", 456, 592, C.emeraldSoft, C.emerald, "#047857");
  line(slide, ctx, 380, 270, 380, 316, C.sky, 3);
  line(slide, ctx, 380, 362, 380, 408, C.sky, 3);
  line(slide, ctx, 380, 454, 380, 500, C.sky, 3);
  line(slide, ctx, 380, 546, 270, 592, C.emerald, 3);
  line(slide, ctx, 380, 546, 380, 592, C.emerald, 3);
  line(slide, ctx, 380, 546, 490, 592, C.emerald, 3);

  box(slide, ctx, { x: 745, y: 210, w: 390, h: 90, fill: C.skySoft, stroke: C.sky });
  body(slide, ctx, "children: Map<char, TrieNode>", 770, 232, 330, 26, 22, "#075985");
  body(slide, ctx, "다음 문자로 이동하는 간선 역할", 770, 264, 330, 20, 15, "#075985");
  box(slide, ctx, { x: 745, y: 330, w: 390, h: 90, fill: C.emeraldSoft, stroke: C.emerald });
  body(slide, ctx, "isEndOfWord: boolean", 770, 352, 330, 26, 22, "#047857");
  body(slide, ctx, "현재 경로가 완성 단어인지 표시", 770, 384, 330, 20, 15, "#047857");
  box(slide, ctx, { x: 745, y: 450, w: 390, h: 90, fill: C.roseSoft, stroke: C.rose });
  body(slide, ctx, "path: string", 770, 472, 330, 26, 22, "#BE123C");
  body(slide, ctx, "시각화에서 노드 id와 탐색 경로로 사용", 770, 504, 330, 20, 15, "#BE123C");
  box(slide, ctx, { x: 745, y: 560, w: 390, h: 76, fill: C.white, stroke: "#D5DEE8" });
  body(slide, ctx, "예: app, apple, application, apply는 root-a-p-p까지 같은 노드를 공유합니다.", 770, 578, 340, 40, 16, C.ink);
  footer(slide, ctx, 3);
  return slide;
}

import { bg, body, box, C, footer, kicker, line, title } from "./theme.mjs";

export async function slide02(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "PROBLEM");
  title(slide, ctx, "자동완성은 매 입력마다 prefix가 같은 단어를 빠르게 찾아야 합니다.", 64, 88, 900, C.ink, 36);
  body(slide, ctx, "검색창에 글자를 하나 입력할 때마다 전체 단어 목록을 다시 훑으면 단어 수가 늘수록 반응성이 떨어집니다.", 66, 186, 790, 52, 19);

  box(slide, ctx, { x: 86, y: 286, w: 500, h: 260, fill: C.white, stroke: "#D5DEE8" });
  body(slide, ctx, "일반 배열 검색", 112, 316, 250, 28, 21, C.ink);
  body(slide, ctx, "apple\napp\napplication\napply\nbanana\nband\n...", 114, 366, 180, 136, 20, C.muted);
  line(slide, ctx, 318, 382, 500, 382, C.rose, 4);
  line(slide, ctx, 318, 422, 500, 422, C.rose, 4);
  body(slide, ctx, "모든 단어를 비교\nO(N × L)", 332, 444, 170, 58, 24, C.rose);

  box(slide, ctx, { x: 694, y: 286, w: 500, h: 260, fill: C.white, stroke: "#D5DEE8" });
  body(slide, ctx, "Trie prefix 탐색", 720, 316, 250, 28, 21, C.ink);
  body(slide, ctx, "입력 prefix: app", 720, 362, 210, 28, 20, C.sky);
  line(slide, ctx, 735, 430, 1000, 430, C.sky, 4);
  body(slide, ctx, "root → a → p → p", 736, 404, 280, 28, 22, C.ink);
  body(slide, ctx, "prefix 노드까지 이동 후\n그 하위 트리에서만 추천 수집", 720, 468, 390, 52, 20, C.emerald);

  body(slide, ctx, "핵심 차이: 전체 목록 스캔이 아니라, prefix 경로를 따라간 뒤 필요한 하위 노드만 방문합니다.", 180, 594, 930, 36, 22, C.ink);
  footer(slide, ctx, 2);
  return slide;
}

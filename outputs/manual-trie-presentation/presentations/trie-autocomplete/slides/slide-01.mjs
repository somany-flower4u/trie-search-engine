import { bg, body, box, chip, C, footer, kicker, line, metric, node, title } from "./theme.mjs";

export async function slide01(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "PROJECT OVERVIEW");
  title(slide, ctx, "Trie로 prefix 탐색 과정을 보여주는 자동완성 검색엔진", 64, 92, 740, C.ink, 40);
  body(slide, ctx, "단어 삽입, 검색, 삭제, 자동완성을 모두 구현하고 탐색 경로와 추천 수집 과정을 React Flow로 시각화한 웹앱입니다.", 66, 214, 650, 64, 20);
  chip(slide, ctx, "React", 66, 310, 104, C.skySoft, "#0369A1");
  chip(slide, ctx, "JavaScript", 184, 310, 132, C.indigoSoft, "#3730A3");
  chip(slide, ctx, "Tailwind CSS", 330, 310, 150, C.emeraldSoft, "#047857");
  chip(slide, ctx, "React Flow", 494, 310, 138, C.amberSoft, "#92400E");
  metric(slide, ctx, "O(L)", "삽입 / 검색", 66, 438, 174, C.white, C.sky);
  metric(slide, ctx, "O(L+K)", "자동완성", 256, 438, 190, C.white, C.emerald);
  metric(slide, ctx, "5개", "추천 결과 제한", 462, 438, 174, C.white, C.rose);

  box(slide, ctx, { x: 795, y: 88, w: 390, h: 510, fill: C.white, stroke: "#D7E0EA" });
  node(slide, ctx, "root", 956, 132, C.ink, C.ink, C.white);
  node(slide, ctx, "a", 874, 235, C.skySoft, C.sky, "#075985");
  node(slide, ctx, "b", 1038, 235, C.white, C.line, C.ink);
  node(slide, ctx, "p", 874, 338, C.skySoft, C.sky, "#075985");
  node(slide, ctx, "n", 1038, 338, C.white, C.line, C.ink);
  node(slide, ctx, "p*", 874, 441, C.emeraldSoft, C.emerald, "#047857");
  node(slide, ctx, "l", 780, 544, C.emeraldSoft, C.emerald, "#047857");
  node(slide, ctx, "y*", 968, 544, C.emeraldSoft, C.emerald, "#047857");
  line(slide, ctx, 990, 178, 908, 235, C.sky, 3);
  line(slide, ctx, 990, 178, 1072, 235, C.line, 2);
  line(slide, ctx, 908, 281, 908, 338, C.sky, 3);
  line(slide, ctx, 1072, 281, 1072, 338, C.line, 2);
  line(slide, ctx, 908, 384, 908, 441, C.sky, 3);
  line(slide, ctx, 908, 487, 814, 544, C.emerald, 3);
  line(slide, ctx, 908, 487, 1002, 544, C.emerald, 3);
  body(slide, ctx, "파란색: prefix 탐색\n초록색: 추천 단어 경로\n별표: 단어 끝 노드", 820, 612, 330, 62, 16, C.muted);
  footer(slide, ctx, 1);
  return slide;
}

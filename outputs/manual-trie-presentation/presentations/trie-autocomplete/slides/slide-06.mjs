import path from "node:path";
import { bg, body, box, C, footer, kicker, line, title } from "./theme.mjs";

export async function slide06(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "WORKING DEMO");
  title(slide, ctx, "사용자는 검색 결과를 보고, 발표자는 알고리즘 과정을 동시에 설명할 수 있습니다.", 64, 82, 1020, C.ink, 34);
  const imagePath = path.join(ctx.assetDir, "app-demo-prefix-app.png");
  await ctx.addImage(slide, { path: imagePath, x: 72, y: 190, w: 870, h: 420, fit: "contain", alt: "Trie autocomplete app screenshot" });
  box(slide, ctx, { x: 70, y: 188, w: 874, h: 424, fill: "#00000000", stroke: "#CBD5E1", width: 2 });

  box(slide, ctx, { x: 982, y: 202, w: 210, h: 96, fill: C.skySoft, stroke: C.sky });
  body(slide, ctx, "1. prefix 입력", 1004, 224, 164, 24, 20, "#075985");
  body(slide, ctx, "입력마다 추천 결과와 경로가 갱신", 1004, 258, 160, 32, 14, "#075985");
  line(slide, ctx, 982, 246, 824, 270, C.sky, 3);

  box(slide, ctx, { x: 982, y: 328, w: 210, h: 96, fill: C.emeraldSoft, stroke: C.emerald });
  body(slide, ctx, "2. 추천 클릭", 1004, 350, 164, 24, 20, "#047857");
  body(slide, ctx, "추천 단어를 검색창에 바로 반영", 1004, 384, 160, 32, 14, "#047857");
  line(slide, ctx, 982, 372, 360, 338, C.emerald, 3);

  box(slide, ctx, { x: 982, y: 454, w: 210, h: 96, fill: C.amberSoft, stroke: C.amber });
  body(slide, ctx, "3. 시각화 설명", 1004, 476, 164, 24, 20, "#92400E");
  body(slide, ctx, "탐색 경로와 단어 끝 노드를 색으로 구분", 1004, 510, 160, 32, 14, "#92400E");
  line(slide, ctx, 982, 498, 756, 420, C.amber, 3);
  footer(slide, ctx, 6);
  return slide;
}

import { bg, body, box, C, footer, kicker, title } from "./theme.mjs";

export async function slide08(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx, true);
  kicker(slide, ctx, "CLOSING", 64, 52, C.emerald);
  title(slide, ctx, "발표는 Trie의 장점을 실제 동작 화면으로 증명하는 흐름으로 마무리합니다.", 64, 92, 980, C.white, 38);
  body(slide, ctx, "추천 발표 순서", 84, 214, 260, 30, 22, "#D8E4F0");

  const steps = [
    ["1", "문제 제시", "prefix 자동완성은 입력마다 빠른 검색이 필요"],
    ["2", "Trie 구조 설명", "공통 prefix 공유와 단어 끝 표시"],
    ["3", "알고리즘 설명", "O(L), O(L + K) 복잡도와 DFS 수집"],
    ["4", "앱 데모", "app 입력, 추천 클릭, 삭제 후 시각화 갱신"],
  ];
  steps.forEach((step, i) => {
    const y = 270 + i * 76;
    box(slide, ctx, { x: 84, y, w: 56, h: 48, fill: i === 3 ? C.emerald : "#23314A", stroke: "#34435F" });
    ctx.addText(slide, { x: 84, y: y + 10, w: 56, h: 26, text: step[0], size: 20, bold: true, color: C.white, typeface: "Menlo", align: "center" });
    body(slide, ctx, step[1], 164, y + 2, 180, 24, 21, C.white);
    body(slide, ctx, step[2], 164, y + 32, 520, 22, 16, "#B8C4D6");
  });

  box(slide, ctx, { x: 790, y: 254, w: 330, h: 186, fill: "#23314A", stroke: "#34435F" });
  body(slide, ctx, "핵심 한 줄", 820, 286, 180, 24, 22, C.emerald);
  body(slide, ctx, "Trie는 prefix 검색을 경로 탐색으로 바꾸고, 이 앱은 그 과정을 눈으로 확인하게 해줍니다.", 820, 330, 250, 76, 22, C.white);
  body(slide, ctx, "Q&A", 920, 526, 160, 46, 36, C.white);
  footer(slide, ctx, 8);
  return slide;
}

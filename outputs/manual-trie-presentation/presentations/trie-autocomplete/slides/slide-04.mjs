import { bg, body, box, C, footer, kicker, line, title } from "./theme.mjs";

function step(slide, ctx, n, label, x, y, color) {
  box(slide, ctx, { x, y, w: 190, h: 72, fill: C.white, stroke: color, width: 2 });
  ctx.addText(slide, { x: x + 14, y: y + 14, w: 34, h: 32, text: n, size: 24, bold: true, color, typeface: "Menlo" });
  body(slide, ctx, label, x + 56, y + 14, 112, 40, 17, C.ink);
}

export async function slide04(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  kicker(slide, ctx, "ALGORITHM");
  title(slide, ctx, "핵심 연산은 모두 문자열 길이만큼의 경로 탐색에서 시작합니다.", 64, 88, 920, C.ink, 36);

  step(slide, ctx, "1", "prefix 노드까지 이동", 86, 216, C.sky);
  step(slide, ctx, "2", "단어 끝 여부 확인", 318, 216, C.indigo);
  step(slide, ctx, "3", "하위 트리 DFS 수집", 550, 216, C.emerald);
  step(slide, ctx, "4", "최대 5개 정렬 추천", 782, 216, C.amber);
  line(slide, ctx, 276, 252, 318, 252, C.line, 3);
  line(slide, ctx, 508, 252, 550, 252, C.line, 3);
  line(slide, ctx, 740, 252, 782, 252, C.line, 3);

  box(slide, ctx, { x: 88, y: 370, w: 450, h: 184, fill: "#101827", stroke: "#101827" });
  ctx.addText(slide, {
    x: 116,
    y: 398,
    w: 390,
    h: 126,
    text: "autocomplete(prefix, limit)\n  node = findNode(prefix)\n  if node == null: return []\n  dfs(node) until result.length == limit",
    size: 19,
    color: "#D8E4F0",
    typeface: "Menlo",
  });

  box(slide, ctx, { x: 618, y: 356, w: 480, h: 214, fill: C.white, stroke: "#D5DEE8" });
  const rows = [
    ["삽입", "O(L)", "문자마다 노드 생성 또는 이동"],
    ["검색", "O(L)", "마지막 노드의 isEndOfWord 확인"],
    ["자동완성", "O(L + K)", "prefix 이동 + 추천 수집 방문 노드"],
    ["삭제", "O(L)", "끝 표시 해제 후 불필요 노드 정리"],
  ];
  rows.forEach((row, i) => {
    const y = 382 + i * 42;
    body(slide, ctx, row[0], 646, y, 96, 26, 18, C.ink);
    body(slide, ctx, row[1], 760, y, 120, 26, 18, i === 2 ? C.emerald : C.sky);
    body(slide, ctx, row[2], 890, y, 180, 26, 15, C.muted);
    if (i < rows.length - 1) line(slide, ctx, 646, y + 31, 1068, y + 31, "#E2E8F0", 1);
  });
  body(slide, ctx, "L = 입력 문자열 길이, K = 추천 단어 수집 과정에서 방문한 노드 수", 646, 544, 420, 22, 14, C.muted);
  footer(slide, ctx, 4);
  return slide;
}

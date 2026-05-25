export const C = {
  ink: "#172033",
  muted: "#64748B",
  paper: "#F6F8FB",
  white: "#FFFFFF",
  line: "#CBD5E1",
  sky: "#0EA5E9",
  skySoft: "#E0F2FE",
  emerald: "#10B981",
  emeraldSoft: "#D1FAE5",
  rose: "#F43F5E",
  roseSoft: "#FFE4E6",
  amber: "#F59E0B",
  amberSoft: "#FEF3C7",
  indigo: "#4F46E5",
  indigoSoft: "#E0E7FF",
};

export const FONT = {
  title: "Apple SD Gothic Neo",
  body: "Apple SD Gothic Neo",
  mono: "Menlo",
};

export function bg(slide, ctx, dark = false) {
  ctx.addShape(slide, {
    x: 0,
    y: 0,
    w: ctx.W,
    h: ctx.H,
    fill: dark ? C.ink : C.paper,
    line: ctx.line(),
  });
}

export function footer(slide, ctx, n) {
  ctx.addText(slide, {
    x: 64,
    y: 682,
    w: 760,
    h: 22,
    text: "Trie 자동완성 검색엔진 | 자료구조 과제",
    size: 12,
    color: "#8A97A8",
    typeface: FONT.body,
  });
  ctx.addText(slide, {
    x: 1160,
    y: 682,
    w: 56,
    h: 22,
    text: String(n).padStart(2, "0"),
    size: 12,
    color: "#8A97A8",
    align: "right",
    typeface: FONT.mono,
  });
}

export function kicker(slide, ctx, text, x = 64, y = 52, color = C.sky) {
  ctx.addShape(slide, { x, y: y + 7, w: 9, h: 9, fill: color, line: ctx.line() });
  ctx.addText(slide, {
    x: x + 18,
    y,
    w: 420,
    h: 28,
    text,
    size: 14,
    bold: true,
    color,
    typeface: FONT.body,
  });
}

export function title(slide, ctx, text, x = 64, y = 90, w = 850, color = C.ink, size = 38) {
  ctx.addText(slide, {
    x,
    y,
    w,
    h: 96,
    text,
    size,
    bold: true,
    color,
    typeface: FONT.title,
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
}

export function body(slide, ctx, text, x, y, w, h, size = 20, color = C.muted) {
  ctx.addText(slide, {
    x,
    y,
    w,
    h,
    text,
    size,
    color,
    typeface: FONT.body,
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
}

export function box(slide, ctx, { x, y, w, h, fill = C.white, stroke = C.line, width = 1.2 }) {
  return ctx.addShape(slide, {
    x,
    y,
    w,
    h,
    fill,
    line: ctx.line(stroke, width),
  });
}

export function chip(slide, ctx, text, x, y, w, fill, color = C.ink) {
  box(slide, ctx, { x, y, w, h: 34, fill, stroke: fill });
  ctx.addText(slide, {
    x: x + 12,
    y: y + 7,
    w: w - 24,
    h: 20,
    text,
    size: 13,
    bold: true,
    color,
    typeface: FONT.body,
    align: "center",
  });
}

export function line(slide, ctx, x1, y1, x2, y2, color = C.line, width = 2) {
  if (Math.abs(y2 - y1) <= Math.abs(x2 - x1)) {
    const left = Math.min(x1, x2);
    const top = y1 - width / 2;
    ctx.addShape(slide, { x: left, y: top, w: Math.abs(x2 - x1), h: width, fill: color, line: ctx.line() });
  } else {
    const left = x1 - width / 2;
    const top = Math.min(y1, y2);
    ctx.addShape(slide, { x: left, y: top, w: width, h: Math.abs(y2 - y1), fill: color, line: ctx.line() });
  }
}

export function node(slide, ctx, label, x, y, fill = C.white, stroke = C.line, color = C.ink) {
  box(slide, ctx, { x, y, w: 68, h: 46, fill, stroke, width: 2 });
  ctx.addText(slide, {
    x,
    y: y + 9,
    w: 68,
    h: 24,
    text: label,
    size: label.length > 3 ? 14 : 18,
    bold: true,
    color,
    typeface: FONT.mono,
    align: "center",
  });
}

export function metric(slide, ctx, value, label, x, y, w, fill, color) {
  box(slide, ctx, { x, y, w, h: 86, fill, stroke: fill });
  ctx.addText(slide, { x: x + 16, y: y + 14, w: w - 32, h: 32, text: value, size: 28, bold: true, color, typeface: FONT.mono });
  ctx.addText(slide, { x: x + 16, y: y + 50, w: w - 32, h: 22, text: label, size: 13, color, typeface: FONT.body });
}

import chalk from 'chalk';

// ═══════════════════════════════════════════════════════════════
//  PIXEL-ART MAP  (21 × 19 grid)
//
//  _ → black background (transparent)
//  W → white  (the outer ring / arc)
//  T → teal   #00DDAA (accent dots + wordmark icon)
//
//  Each cell renders as 2 monospace chars ("██") so the logo
//  stays visually square on typical terminal fonts.
// ═══════════════════════════════════════════════════════════════
const _ = ' ',
  W = 'W',
  T = 'T';

const LOGO = [
  // ── Arc top ─────────────────────────────────────────────
  [_, _, _, _, _, _, _, T, T, _, _, W, W, W, W, _, _, _, _, _, _], // 0
  [_, _, _, _, _, _, _, T, T, _, _, _, _, _, W, W, W, _, _, _, _], // 1  ← top teal dot
  [_, _, _, W, W, _, _, _, _, _, _, _, _, _, _, _, W, W, _, _, _], // 2
  [_, _, W, W, _, _, _, _, _, _, _, _, _, _, _, _, _, W, W, _, _], // 3
  [_, W, W, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, W, W, _], // 4
  [_, W, W, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, W, W, _], // 5
  [W, W, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, W, W], // 6
  [W, W, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, W, W], // 7
  // ── Right side gap ──────────────────────────────────────
  [W, W, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, W, W], // 8
  [W, W, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, W, _], // 9
  [_, W, W, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, W, W, _], // 10
  [_, _, W, W, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _], // 11 ← bottom-right teal dot
  // ── Arc bottom ──────────────────────────────────────────
  [_, _, _, W, W, _, _, _, _, _, _, _, _, _, _, T, T, _, _, _, _], // 12
  [_, _, _, _, W, W, W, _, _, _, _, _, _, _, _, T, T, _, _, _, _], // 13
  [_, _, _, _, _, _, W, W, W, W, W, W, W, W, _, _, _, _, _, _, _], // 14
  // ── Blank gap ───────────────────────────────────────────
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _], // 15
  // ── Wordmark row (null = custom renderer) ───────────────
  null, // 16  "▣ Shell"
  null, // 17  "t r a n s f o r m a t i o n"
  // ── Bottom blank ────────────────────────────────────────
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _], // 18
];

const COLS = 21; // pixel columns
const LOGO_H = LOGO.length; // pixel rows  (19)
const LOGO_PX_W = COLS * 4; // terminal chars wide (42)

// ═══════════════════════════════════════════════════════════════
//  CHALK COLOURS
// ═══════════════════════════════════════════════════════════════
const bg = chalk.bgBlack;
const white = chalk.bgBlack.white.bold;
const teal = chalk.bgBlack.hex('#00DDAA').bold;

function pixel(v: any) {
  if (v === W) return white('██');
  if (v === T) return teal('██');
  return bg('  ');
}

// ─── Special rows ─────────────────────────────────────────────
function wordmarkLine() {
  // Centred within LOGO_PX_W (42 chars)
  const inner = teal(' ▣ ') + chalk.bgBlack.white.bold('Shell');
  return bg('       ') + inner + bg('       ');
}

function tagLine() {
  return chalk.bgBlack.white.dim('  t r a n s f o r m a t i o n  ');
}

// ─── Build one rendered row string ────────────────────────────
function logoRow(r: any) {
  if (r === 16) return wordmarkLine();
  if (r === 17) return tagLine();
  if (LOGO[r] === null) return bg('  '.repeat(COLS));
  return LOGO[r].map(pixel).join('');
}

// ═══════════════════════════════════════════════════════════════
//  TERMINAL GEOMETRY & TILING
// ═══════════════════════════════════════════════════════════════
const termW = process.stdout.columns || 80;
const termH = process.stdout.rows || 24;

const H_GAP = 6; // blank chars between horizontally-tiled logos
const V_GAP = 1; // blank rows  between vertically-tiled  logos

// How many copies fit?
const tilesX = Math.max(1, Math.floor((termW + H_GAP) / (LOGO_PX_W + H_GAP)));
const tilesY = Math.max(1, Math.floor((termH + V_GAP) / (LOGO_H + V_GAP)));

// Centre the whole grid horizontally
const totalW = tilesX * LOGO_PX_W + (tilesX - 1) * H_GAP;
const leftPad = bg(' '.repeat(Math.max(0, Math.floor((termW - totalW) / 2))));
const hSep = bg(' '.repeat(H_GAP));

// ═══════════════════════════════════════════════════════════════
//  PRINT
// ═══════════════════════════════════════════════════════════════
// process.stdout.write("\n");

// for (let ty = 0; ty < tilesY; ty++) {
//   for (let r = 0; r < LOGO_H; r++) {
//     const row = logoRow(r);
//     let line  = leftPad;

//     for (let tx = 0; tx < tilesX; tx++) {
//       line += row;
//       if (tx < tilesX - 1) line += hSep;
//     }

//     process.stdout.write(line + "\n");
//   }

//   if (ty < tilesY - 1) {
//     for (let g = 0; g < V_GAP; g++) process.stdout.write("\n");
//   }
// }

// process.stdout.write("\n");

export function printLogo() {
  process.stdout.write('\n');

  for (let ty = 0; ty < tilesY; ty++) {
    for (let r = 0; r < LOGO_H; r++) {
      const row = logoRow(r);
      let line = leftPad;

      for (let tx = 0; tx < tilesX; tx++) {
        line += row;
        if (tx < tilesX - 1) line += hSep;
      }

      process.stdout.write(line + '\n');
    }

    if (ty < tilesY - 1) {
      for (let g = 0; g < V_GAP; g++) process.stdout.write('\n');
    }
  }

  process.stdout.write('\n');
}

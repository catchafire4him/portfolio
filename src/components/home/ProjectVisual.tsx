import type { ProjectVisual as VisualKind } from "@/content/projects";
import { Mic } from "@/components/ui/icons";

// Stylized stand-ins until real screenshots and clips are captured.

const waveHeights = [10, 22, 30, 16, 34, 24, 12, 28, 20, 32, 14, 26];

function Wave({ scale = 1, className }: { scale?: number; className: string }) {
  return (
    <span className="flex h-9 items-center gap-[3px]" aria-hidden="true">
      {waveHeights.map((h, i) => (
        <span
          key={i}
          className={`wave-bar w-[3px] rounded-sm ${className}`}
          style={{ height: Math.round(h * scale), animationDelay: `${(i % 5) * 0.12}s` }}
        />
      ))}
    </span>
  );
}

const estimateRows = [
  ["200A main panel, 40-space", "1 ea"],
  ["THHN #2/0 copper", "120 ft"],
  ["Surge protection device", "1 ea"],
  ["AFCI breakers, 20A", "12 ea"],
  ["Labor, licensed electrician", "14 hr"],
];

function AiProConstruct() {
  return (
    <div className="border-line bg-surface-2 flex h-full overflow-hidden rounded-[14px] border">
      <div className="border-line hidden w-[170px] shrink-0 flex-col gap-3 border-r p-[18px] sm:flex">
        <div className="mb-3 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="bg-line-strong size-[9px] rounded-full" />
          ))}
        </div>
        <span className="bg-line rounded-[7px] px-2.5 py-[7px] text-xs">Estimates</span>
        {["Takeoffs", "Invoices", "Customers", "Payroll"].map((label) => (
          <span key={label} className="text-subtle px-2.5 text-xs">
            {label}
          </span>
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-1 px-6 py-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-[15px] font-semibold">Estimate · Panel upgrade, 200A</span>
          <span className="bg-accent text-accent-ink hidden rounded-full px-2.5 py-1 font-mono text-[11px] md:inline">
            SYNCED TO QUICKBOOKS
          </span>
        </div>
        {estimateRows.map(([item, qty]) => (
          <div
            key={item}
            className="border-line text-muted flex justify-between border-b py-2.5 text-[13px]"
          >
            <span>{item}</span>
            <span className="text-subtle font-mono">{qty}</span>
          </div>
        ))}
        <div className="mt-auto flex justify-end gap-2.5 pt-3">
          <span className="border-line-strong text-muted rounded-lg border px-3.5 py-2 text-xs">
            Send proposal
          </span>
          <span className="bg-fg text-bg rounded-lg px-3.5 py-2 text-xs font-semibold">
            Collect deposit
          </span>
        </div>
      </div>
    </div>
  );
}

const marks = [
  [60, 70],
  [140, 110],
  [220, 70],
  [250, 170],
  [70, 200],
  [150, 240],
  [210, 240],
];

function Takeoff() {
  return (
    <div className="bg-blueprint relative h-full overflow-hidden rounded-[14px]">
      <div className="absolute top-10 left-[30px] h-[110px] w-[150px] border-[1.5px] border-[#96b4e6]/45" />
      <div className="absolute top-10 left-[180px] h-[170px] w-[110px] border-[1.5px] border-[#96b4e6]/45" />
      <div className="absolute top-[150px] left-[30px] h-[120px] w-[150px] border-[1.5px] border-[#96b4e6]/45" />
      {marks.map(([x, y], i) => (
        <span
          key={i}
          className="border-accent absolute size-[18px] rounded-full border-2 transition-transform duration-500 group-hover:scale-125"
          style={{ left: x, top: y, transitionDelay: `${i * 40}ms` }}
        />
      ))}
      <div className="absolute bottom-4 left-4 flex gap-2 font-mono text-[11px]">
        <span className="border-line-strong bg-bg rounded-[7px] border px-2 py-1">
          Duplex receptacle × 7
        </span>
        <span className="border-line-strong bg-bg text-muted rounded-[7px] border px-2 py-1">
          Tier 4 · vision
        </span>
      </div>
    </div>
  );
}

function DayRecall() {
  return (
    <div className="bg-surface-2 flex h-full items-center justify-center rounded-[14px]">
      <div className="border-line-strong bg-bg flex size-[150px] flex-col items-center justify-center gap-2.5 rounded-full border-[6px]">
        <span className="text-rec flex items-center gap-1.5 font-mono text-[10px]">
          <span className="blink bg-rec size-1.5 rounded-full" />
          RECORDING
        </span>
        <Wave className="bg-fg" />
        <span className="text-subtle text-[11px]">Pause</span>
      </div>
    </div>
  );
}

function GeminiFlow() {
  return (
    <div className="bg-surface-2 flex h-full flex-col items-center justify-center gap-5 rounded-[14px]">
      <div className="border-line-strong bg-bg flex items-center gap-3 rounded-full border px-[18px] py-2.5">
        <Mic className="text-accent size-4" />
        <Wave scale={0.55} className="bg-accent" />
        <span className="text-muted text-xs">Listening…</span>
      </div>
      <kbd className="rounded-[9px] border border-b-4 border-[#3a3a41] px-4 py-2.5 font-mono text-[13px]">
        Right Ctrl
      </kbd>
    </div>
  );
}

const qr = [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1];

function Chaos() {
  return (
    <div className="bg-surface-2 flex h-full items-center justify-center gap-[18px] rounded-[14px]">
      <div className="border-line-strong flex h-[118px] w-[190px] flex-col items-center justify-center gap-1.5 rounded-lg border-[3px] bg-[#1e1330]">
        <span className="font-serif text-[22px] text-[#e9d5ff] italic">Whodunnit</span>
        <span className="font-mono text-[10px] text-[#c4b5fd]">JOIN CODE · KQZR</span>
      </div>
      <div className="border-line-strong bg-bg flex h-[104px] w-[58px] items-center justify-center rounded-xl border-[3px]">
        <div className="grid w-[34px] grid-cols-5 gap-0.5">
          {qr.map((on, i) => (
            <span key={i} className={`h-[5px] ${on ? "bg-fg" : ""}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Assembly() {
  return (
    <div className="flex h-full flex-col justify-between rounded-[14px] bg-[#efeae2] p-6 text-[#1b1a17]">
      <span className="font-mono text-[10px] tracking-[0.1em]">THE ASSEMBLY</span>
      <span className="font-serif text-[30px] leading-[1.05]">
        Built for operators. Designed for alignment.
      </span>
      <span className="text-[11px] text-[#5a564e]">theassembly.health</span>
    </div>
  );
}

const visuals: Record<VisualKind, () => React.JSX.Element> = {
  aiproconstruct: AiProConstruct,
  takeoff: Takeoff,
  dayrecall: DayRecall,
  geminiflow: GeminiFlow,
  chaos: Chaos,
  assembly: Assembly,
};

export function ProjectVisual({ kind }: { kind: VisualKind }) {
  const Visual = visuals[kind];
  return (
    <div className="h-full" aria-hidden="true">
      <Visual />
    </div>
  );
}

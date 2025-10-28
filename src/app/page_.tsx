'use client';
import React, { JSX } from 'react';

// =========================================
// Badminton Club – Elo & Ranking (Design Only)
// Next.js (app/page.tsx) – TypeScript + TailwindCSS, no UI frameworks
// NOTE: This is DESIGN-FOCUSED. All actions are stubbed/no-op.
// Accent color: #c91332
// =========================================

// ---- Mock Types (design time only) ----
type Player = {
    id: string;
    name: string;
    elo: number;
    wins: number;
    losses: number;
    streak?: string; // e.g. "W3", "L1"
    lastGame?: string; // e.g. "27.10.2025"
};

type MatchQuick = {
    aId?: string;
    bId?: string;
    aScore?: number;
    bScore?: number;
    bestOf?: 1 | 3 | 5;
    date?: string;
};

// ---- Mock Data (static for design) ----
const MOCK_PLAYERS: Player[] = [
    { id: 'p1', name: 'Alex', elo: 1432, wins: 24, losses: 11, streak: 'W2', lastGame: '27.10.2025' },
    { id: 'p2', name: 'Ben', elo: 1387, wins: 19, losses: 14, streak: 'L1', lastGame: '26.10.2025' },
    { id: 'p3', name: 'Chiara', elo: 1350, wins: 18, losses: 15, streak: 'W4', lastGame: '25.10.2025' },
    { id: 'p4', name: 'Daria', elo: 1285, wins: 12, losses: 17, streak: 'L2', lastGame: '22.10.2025' },
    { id: 'p5', name: 'Efe', elo: 1210, wins: 8, losses: 20, streak: 'W1', lastGame: '20.10.2025' },
];

// ---- Utility (UI only) ----
const accent = '#c91332';
function clsx(...c: Array<string | false | undefined>) {
    return c.filter(Boolean).join(' ');
}

// ---- Components ----
function HeaderBar() {
    return (
        <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    <div aria-hidden className="h-8 w-8 rounded-md" style={{ background: accent }} title="Vereinslogo" />
                    <div className="leading-tight">
                        <h1 className="text-lg font-bold tracking-tight">Badminton Verein</h1>
                        <p className="text-xs text-neutral-500">Elo · Ranking · Spielverwaltung</p>
                    </div>
                </div>
                <nav className="flex items-center gap-2 text-sm">
                    <button className="rounded-md px-3 py-2 font-medium text-neutral-700 hover:bg-neutral-100" aria-label="Zur Ranking-Seite">
                        Ranking
                    </button>
                    <button className="rounded-md px-3 py-2 font-medium text-neutral-700 hover:bg-neutral-100" aria-label="Zur Spiele-Seite">
                        Spiele
                    </button>
                    <button className="rounded-md px-3 py-2 font-medium text-neutral-700 hover:bg-neutral-100" aria-label="Zur Spieler-Seite">
                        Spieler
                    </button>
                </nav>
            </div>
        </header>
    );
}

function StatPill({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="rounded-md border px-3 py-2 text-sm">
            <div className="text-[11px] uppercase tracking-wide text-neutral-500">{label}</div>
            <div className="font-semibold">{value}</div>
        </div>
    );
}

function QuickMatchEntry({ players }: { players: Player[] }) {
    // purely for visual design — does not store anything
    const [form, setForm] = React.useState<MatchQuick>({ bestOf: 3, date: new Date().toISOString().slice(0, 10) });

    const onNoop = (e: React.FormEvent) => {
        e.preventDefault();
        // noop (design only)
    };

    return (
        <section className="rounded-2xl border bg-white p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold">Schnellergebnis eintragen</h2>
                <span className="text-xs text-neutral-500">Nur Design · keine Aktion</span>
            </div>

            <form onSubmit={onNoop} className="grid gap-4 md:grid-cols-3">
                {/* Row: Players */}
                <div className="md:col-span-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-[13px] text-neutral-600">Spieler A</label>
                        <select
                            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
                            style={{ outlineColor: accent, boxShadow: `0 0 0 0 rgba(0,0,0,0)` }}
                            defaultValue=""
                            onChange={(e) => setForm((f) => ({ ...f, aId: e.target.value }))}
                        >
                            <option value="" disabled>
                                auswählen…
                            </option>
                            {players.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-[13px] text-neutral-600">Spieler B</label>
                        <select
                            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
                            style={{ outlineColor: accent }}
                            defaultValue=""
                            onChange={(e) => setForm((f) => ({ ...f, bId: e.target.value }))}
                        >
                            <option value="" disabled>
                                auswählen…
                            </option>
                            {players.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Row: Date & BestOf */}
                <div className="grid grid-cols-2 items-end gap-3 md:col-span-1">
                    <div>
                        <label className="mb-1 block text-[13px] text-neutral-600">Datum</label>
                        <input
                            type="date"
                            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
                            style={{ outlineColor: accent }}
                            value={form.date}
                            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-[13px] text-neutral-600">Best of</label>
                        <select
                            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
                            style={{ outlineColor: accent }}
                            value={form.bestOf}
                            onChange={(e) => setForm((f) => ({ ...f, bestOf: Number(e.target.value) as 1 | 3 | 5 }))}
                        >
                            <option value={1}>1</option>
                            <option value={3}>3</option>
                            <option value={5}>5</option>
                        </select>
                    </div>
                </div>

                {/* Row: Score */}
                <div className="md:col-span-3 grid grid-cols-1 items-end gap-3 sm:grid-cols-[1fr,auto,1fr,auto]">
                    <div>
                        <label className="mb-1 block text-[13px] text-neutral-600">A Punkte</label>
                        <input
                            type="number"
                            inputMode="numeric"
                            min={0}
                            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
                            style={{ outlineColor: accent }}
                            onChange={(e) => setForm((f) => ({ ...f, aScore: Number(e.target.value) }))}
                        />
                    </div>
                    <div className="hidden items-center justify-center text-neutral-400 sm:flex">—</div>
                    <div>
                        <label className="mb-1 block text-[13px] text-neutral-600">B Punkte</label>
                        <input
                            type="number"
                            inputMode="numeric"
                            min={0}
                            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2"
                            style={{ outlineColor: accent }}
                            onChange={(e) => setForm((f) => ({ ...f, bScore: Number(e.target.value) }))}
                        />
                    </div>
                    <div className="flex items-end justify-end">
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-semibold text-white shadow-sm transition active:translate-y-px"
                            style={{ background: accent, borderColor: accent }}
                            aria-label="Ergebnis speichern (Stub)"
                        >
                            Speichern
                        </button>
                    </div>
                </div>
            </form>

            {/* Keyboard hints */}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-[12px] text-neutral-500">
                <kbd className="rounded-md border px-1.5 py-0.5">Tab</kbd>
                zum schnellen Wechsel ·<kbd className="rounded-md border px-1.5 py-0.5">↵</kbd>
                zum Speichern
            </div>
        </section>
    );
}

function RankingTable({ players }: { players: Player[] }) {
    return (
        <section className="rounded-2xl border bg-white">
            <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
                <h2 className="text-base font-semibold">Vereinsranking</h2>
                <div className="flex items-center gap-2">
                    <input
                        type="search"
                        placeholder="Spieler suchen…"
                        className="h-9 w-48 rounded-lg border px-3 text-sm focus:outline-none focus:ring-2"
                        style={{ outlineColor: accent }}
                        aria-label="Spielersuche (Stub)"
                    />
                    <button className="h-9 rounded-lg border px-3 text-sm font-medium hover:bg-neutral-50" aria-label="CSV exportieren (Stub)">
                        CSV Export
                    </button>
                    <button
                        className="h-9 rounded-lg border px-3 text-sm font-medium"
                        style={{ borderColor: accent, color: accent }}
                        aria-label="Spieler hinzufügen (Stub)"
                    >
                        + Spieler
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0">
                    <thead>
                        <tr className="bg-neutral-50 text-left text-[12px] uppercase tracking-wider text-neutral-600">
                            <th className="sticky top-[49px] z-10 border-b px-4 py-3">#</th>
                            <th className="sticky top-[49px] z-10 border-b px-4 py-3">Spieler</th>
                            <th className="sticky top-[49px] z-10 border-b px-4 py-3">Elo</th>
                            <th className="sticky top-[49px] z-10 border-b px-4 py-3">Wins</th>
                            <th className="sticky top-[49px] z-10 border-b px-4 py-3">Losses</th>
                            <th className="sticky top-[49px] z-10 border-b px-4 py-3">Win %</th>
                            <th className="sticky top-[49px] z-10 border-b px-4 py-3">Streak</th>
                            <th className="sticky top-[49px] z-10 border-b px-4 py-3">Letztes Spiel</th>
                            <th className="sticky top-[49px] z-10 border-b px-4 py-3">Aktionen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((p, i) => {
                            const total = p.wins + p.losses;
                            const winPct = total ? Math.round((p.wins / total) * 1000) / 10 : 0;
                            return (
                                <tr key={p.id} className={clsx('border-b', i % 2 ? 'bg-white' : 'bg-neutral-50/50')}>
                                    <td className="px-4 py-3 text-sm font-semibold">{i + 1}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 shrink-0 rounded-full bg-neutral-200" aria-hidden />
                                            <div>
                                                <div className="text-sm font-medium">{p.name}</div>
                                                <div className="text-xs text-neutral-500">{total} Spiele</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm font-semibold">{p.elo}</td>
                                    <td className="px-4 py-3 text-sm">{p.wins}</td>
                                    <td className="px-4 py-3 text-sm">{p.losses}</td>
                                    <td className="px-4 py-3 text-sm">{winPct.toFixed(1)}%</td>
                                    <td className="px-4 py-3 text-sm">
                                        <span className="rounded-md border px-2 py-0.5 text-xs" style={{ borderColor: accent, color: accent }}>
                                            {p.streak ?? '—'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm">{p.lastGame ?? '—'}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="rounded-md border px-2 py-1 text-xs hover:bg-neutral-50"
                                                aria-label={`Spiel für ${p.name} eintragen (Stub)`}
                                            >
                                                Spiel
                                            </button>
                                            <button
                                                className="rounded-md border px-2 py-1 text-xs hover:bg-neutral-50"
                                                aria-label={`Spieler ${p.name} bearbeiten (Stub)`}
                                            >
                                                Bearbeiten
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

function Hero() {
    return (
        <section className="relative isolate overflow-hidden rounded-2xl border bg-linear-to-br from-white to-neutral-50 px-6 py-8 sm:px-8">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Elo & Ranking für unseren Verein</h2>
                    <p className="mt-2 max-w-prose text-sm text-neutral-600">
                        Trage Ergebnisse in Sekunden ein und behalte das Live-Ranking im Blick. Design steht – Logik folgt später.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm">
                        <StatPill label="Aktive Spieler" value={MOCK_PLAYERS.length} />
                        <StatPill label="Gesamtspiele" value={86} />
                        <StatPill label="Letzte Aktivität" value="27.10.2025" />
                    </div>
                </div>
                <button
                    className="rounded-xl border px-5 py-2.5 text-sm font-semibold shadow-sm transition active:translate-y-px"
                    style={{ background: accent, borderColor: accent, color: 'white' }}
                    aria-label="Neues Spiel (Stub)"
                >
                    + Neues Spiel
                </button>
            </div>
            {/* Accent stripe */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1" style={{ background: accent }} />
        </section>
    );
}

// ---- Page ----
export default function Page(): JSX.Element {
    return (
        <main className="min-h-screen bg-neutral-25">
            <HeaderBar />
            <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
                <Hero />

                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <RankingTable players={MOCK_PLAYERS} />
                    </div>
                    <div className="lg:col-span-1">
                        <QuickMatchEntry players={MOCK_PLAYERS} />
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-10 flex items-center justify-between border-t pt-6 text-sm text-neutral-500">
                    <span>© {new Date().getFullYear()} Badminton Verein</span>
                    <span>
                        Akzentfarbe{' '}
                        <span className="font-medium" style={{ color: accent }}>
                            #c91332
                        </span>
                    </span>
                </footer>
            </div>
        </main>
    );
}

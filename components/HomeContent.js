"use client";
import Link from "next/link";
import { Radio, Sparkles, TrendingUp, Mic2, Disc3 } from "lucide-react";
import { usePlayer } from "./PlayerProvider";
import PlayButton, { isActive } from "./PlayButton";
import { fmtPlays } from "@/lib/data";

function ChartSection({ title, items }) {
  const player = usePlayer();
  return (
    <section className="chart-section">
      <h2><TrendingUp size={17} /> {title}</h2>
      <div className="chart-list">
        {items.map((item, i) => (
          <div key={item.id} className={"chart-row" + (isActive(player, item.id) ? " active" : "")}
            onClick={() => player.play(item)}>
            <span className="rank">{i + 1}</span>
            <PlayButton item={item} />
            <div className="chart-info">
              <span className="chart-title">{item.title}</span>
              <span className="chart-sub">{item.cw_code} · {item.sub}</span>
            </div>
            <span className="chart-meta">{item.duration}</span>
            <span className="chart-plays">{fmtPlays(item.plays)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function HomeContent({ topTracks, topBeats, freshDrops }) {
  const player = usePlayer();
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-tag"><Radio size={13} /> رسانه‌ی رپ فارسی</div>
        <h1 className="hero-title" dir="ltr">THE PULSE OF HIP-HOP</h1>
        <p className="hero-mission">
          مخاطب برای ما از هر چیزی مهم‌تره. هر صدایی که تو قالب هیپ‌هاپ حرف بزنه برامون ارزشمنده،
          فرقی نمی‌کنه تازه‌کار باشی یا حرفه‌ای. اینجا کسی رو قضاوت نمی‌کنیم؛ کار ما اینه که کنار
          آرتیست‌ها بمونیم، حتی اون‌هایی که هنوز به کیفیت ایده‌آل نرسیدن، و قدم‌به‌قدم تو مسیر رشد نگه‌شون داریم.
        </p>
        <div className="hero-actions">
          <Link href="/artists" className="btn primary"><Mic2 size={16} /> آرتیست‌ها</Link>
          <Link href="/producers" className="btn ghost"><Disc3 size={16} /> پرودیوسرها</Link>
        </div>
      </section>

      <section className="chart-section">
        <h2><Sparkles size={17} /> تازه منتشر شده</h2>
        <div className="fresh-grid">
          {freshDrops.map((d) => (
            <div key={d.id} className={"fresh-card" + (isActive(player, d.id) ? " active" : "")}
              onClick={() => player.play(d)}>
              {d.isNew && <span className="new-badge">NEW</span>}
              <div className="fresh-icon"><PlayButton item={d} /></div>
              <span className="fresh-kind">{d.kind}</span>
              <span className="fresh-title">{d.title}</span>
              <span className="fresh-sub">{d.sub}</span>
            </div>
          ))}
        </div>
      </section>

      <ChartSection title="داغ‌ترین موزیک‌های این هفته" items={topTracks} />
      <ChartSection title="داغ‌ترین بیت‌های این هفته" items={topBeats} />
    </div>
  );
}

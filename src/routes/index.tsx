import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  BookOpen,
  Box,
  Code2,
  Compass,
  FileText,
  Github,
  Globe2,
  Gamepad2,
  MoveRight,
  Play,
  Radio,
  Send,
  Sparkles,
  Terminal,
  Twitter,
  Users,
  Youtube,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import kentAsset from "@/assets/kent-lin.png.asset.json";
import murielAsset from "@/assets/muriel-medard.png.asset.json";
import kishoriAsset from "@/assets/kishori-konwar.png.asset.json";
import aprAsset from "@/assets/article-apr.jpeg.asset.json";
import flexnodesAsset from "@/assets/article-flexnodes.png.asset.json";
import p2pAsset from "@/assets/article-p2p.jpeg.asset.json";
import scaleAsset from "@/assets/article-scale.jpeg.asset.json";
import killerAppsAsset from "@/assets/article-killer-apps.jpeg.asset.json";
import researchAsset from "@/assets/article-research.jpeg.asset.json";
import blockchainAsset from "@/assets/article-blockchain.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Optimum Space — Scale Any Chain" },
      { name: "description", content: "A cinematic guide to Optimum's network layer, people, research, and experiments." },
      { property: "og:title", content: "Optimum Space — Scale Any Chain" },
      { property: "og:description", content: "A cinematic guide to Optimum's network layer, people, research, and experiments." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OptimumHub,
});

const sections = [
  { id: "links", number: "01", label: "Official Links" },
  { id: "team", number: "02", label: "The Team" },
  { id: "reads", number: "03", label: "Good Read" },
  { id: "playground", number: "04", label: "Playground" },
  { id: "explore", number: "05", label: "Explore" },
] as const;

const links = [
  { label: "Main Site", href: "https://www.getoptimum.xyz/", icon: Globe2, meta: "getoptimum.xyz" },
  { label: "X / Twitter", href: "https://x.com/get_optimum", icon: Twitter, meta: "@get_optimum" },
  { label: "Discord", href: "https://discord.com/invite/getoptimum", icon: Users, meta: "Join the network" },
  { label: "Telegram", href: "https://t.me/+I1fmgPCPO5IxNzZl", icon: Send, meta: "Community channel" },
  { label: "YouTube", href: "https://www.youtube.com/@getoptimum", icon: Youtube, meta: "Watch Optimum" },
  { label: "GitHub", href: "https://github.com/getoptimum/", icon: Github, meta: "Open source" },
];

const team = [
  { name: "Kent Lin", role: "Co-founder", description: "Drives adoption and ecosystem growth across business development, tokenomics, and fundraising.", image: kentAsset.url, accent: "01" },
  { name: "Prof. Muriel Médard", role: "Co-founder · CEO", description: "MIT EECS professor and leading researcher in network coding.", image: murielAsset.url, accent: "02" },
  { name: "Dr. Kishori Konwar", role: "Co-founder", description: "Distributed systems, coding theory and AI, with experience at Meta, MIT and Goldman Sachs.", image: kishoriAsset.url, accent: "03" },
];

const reads = [
  { title: "Optimizing a $100B Market", subtitle: "Effects of Latency Reduction on ETH Staking Revenue", image: aprAsset.url, href: "https://x.com/get_optimum/status/2041916972678705375", tag: "Latency / 01" },
  { title: "Flexnodes", subtitle: "A Global Network of Data Accelerators", image: flexnodesAsset.url, href: "https://x.com/get_optimum/status/2013656494139678752", tag: "Infrastructure / 02" },
  { title: "Introducing OptimumP2P", subtitle: "Implementation and Benefits", image: p2pAsset.url, href: "https://x.com/get_optimum/status/1930698870507626516", tag: "Protocol / 03" },
  { title: "Decentralize To Scale", subtitle: "Infrastructure for an Onchain Digital Economy", image: scaleAsset.url, href: "https://x.com/kentlinyy/status/1963652915312349534", tag: "Systems / 04" },
  { title: "OptimumP2P", subtitle: "Unlocking Next-Gen Performance for Tomorrow's Killer Apps", image: killerAppsAsset.url, href: "https://x.com/kentlinyy/status/1935026597150736432", tag: "Applications / 05" },
  { title: "Research & Insights", subtitle: "Explore insights from Optimum's research ecosystem.", image: researchAsset.url, href: "https://x.com/MurielMedard/status/2086878404847317010", tag: "Research / 06" },
  { title: "Optimum: Rethinking the Blockchain Network Layer", subtitle: "A new way to think about the network layer.", image: blockchainAsset.url, href: "https://research.4pillars.io/en/research/optimum-rethinking-the-blockchain-network-layer", tag: "Feature / 07" },
];

const playground = [
  { title: "APR Estimator", subtitle: "Estimate and explore APR.", href: "https://gmum.cc/apr_estimator/", icon: Sparkles, number: "01", verb: "Calculate" },
  { title: "RLNC Simulation", subtitle: "See Random Linear Network Coding in action.", href: "https://gmum.cc/simulation/", icon: Terminal, number: "02", verb: "Simulate" },
  { title: "Latency Game", subtitle: "Test the limits of speed.", href: "https://game.gmum.cc/", icon: Gamepad2, number: "03", verb: "Play" },
];

const explore = [
  { title: "Documentation", subtitle: "Learn how Optimum works.", href: "https://docs.getoptimum.xyz/docs/learn/overview/intro", icon: BookOpen },
  { title: "Products", subtitle: "Explore Optimum's products and technology.", href: "https://www.getoptimum.xyz/product", icon: Box },
  { title: "Blog", subtitle: "Updates, insights and research.", href: "https://www.getoptimum.xyz/blog", icon: FileText },
  { title: "Brand Assets", subtitle: "Official Optimum visual identity and assets.", href: "https://getoptimum.notion.site/Optimum-Brand-Assets-1a6fe54341398098843bc5847670e5ed", icon: Compass },
];

function OptimumHub() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const [active, setActive] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const moveTo = (index: number) => {
    const target = sectionRefs.current[index];
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActive(index);
    setHasStarted(true);
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const onScroll = () => {
      const current = sectionRefs.current.reduce((closest, section, index) => {
        if (!section) return closest;
        const distance = Math.abs(section.getBoundingClientRect().left);
        return distance < closest.distance ? { index, distance } : closest;
      }, { index: 0, distance: Number.POSITIVE_INFINITY });
      setActive(current.index);
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        moveTo(Math.min(active + 1, sections.length - 1));
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        moveTo(Math.max(active - 1, 0));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  const pageLabel = useMemo(() => `${String(active + 1).padStart(2, "0")} / 05`, [active]);

  return (
    <main className="optimum-shell">
      <div className="network-field" aria-hidden="true">
        <svg className="network-lines" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path d="M-80 630 C180 450 180 190 470 300 S800 650 1250 170" />
          <path d="M-30 160 C240 330 360 100 620 200 S880 430 1240 420" />
          <path d="M270 850 C380 630 500 590 560 300 S860 60 1140 -40" />
          <path d="M700 850 C620 650 730 470 1000 540 S1160 690 1320 620" />
        </svg>
        <span className="network-node one" /><span className="network-node two" /><span className="network-node three" /><span className="network-node four" />
      </div>

      <header className="glass-nav fixed inset-x-0 top-0 z-50 flex h-[72px] items-center justify-between px-5 md:px-10">
        <button type="button" onClick={() => moveTo(0)} className="group flex items-center gap-3 text-left" aria-label="Return to Optimum Space home">
          <span className="text-2xl font-semibold tracking-[-0.08em] text-foreground transition-colors group-hover:text-primary">∞ptimum</span>
          <span className="hidden border-l border-border pl-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:inline">Space / 2026</span>
        </button>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Main navigation">
          {sections.map((section, index) => (
            <button key={section.id} type="button" onClick={() => moveTo(index)} className={`group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${active === index ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              <span className={`h-1.5 w-1.5 rounded-full transition-all ${active === index ? "bg-primary shadow-[0_0_10px_var(--primary)]" : "bg-muted-foreground/30 group-hover:bg-primary/60"}`} />
              {section.number} <span className="hidden xl:inline">{section.label}</span>
            </button>
          ))}
        </nav>
        <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">{pageLabel}</span>
      </header>

      <div ref={scrollerRef} className="section-scroll flex h-[100svh] snap-x snap-mandatory overflow-x-auto overflow-y-hidden pt-[72px] max-md:h-auto max-md:flex-col max-md:overflow-x-hidden max-md:overflow-y-visible">
        <section ref={(node) => { sectionRefs.current[0] = node; }} id="links" className="relative flex h-[calc(100svh-72px)] min-w-full snap-start items-center px-5 py-12 md:px-12 lg:px-[8vw] max-md:h-auto max-md:min-h-[calc(100svh-72px)]">
          <div className="grid w-full max-w-[1400px] items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="eyebrow mb-6 flex items-center gap-3"><span className="h-px w-8 bg-primary" /> Network Layer / 00</div>
              <h1 className="max-w-2xl text-balance text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[0.88] tracking-[-0.085em] text-foreground">Scale<br /><span className="text-primary">any chain.</span></h1>
              <p className="mt-8 max-w-md text-base leading-7 text-muted-foreground md:text-lg">Explore the Optimum ecosystem — the network layer for an onchain digital economy.</p>
              <button type="button" onClick={() => moveTo(1)} className="mt-10 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground transition-colors hover:text-primary"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary text-primary"><MoveRight size={15} /></span> Enter the network</button>
            </motion.div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {links.map((link, index) => <LinkCard key={link.label} link={link} index={index} />)}
            </div>
          </div>
          <span className="absolute bottom-6 left-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:left-12 lg:left-[8vw]">01 — Official links</span>
        </section>

        <section ref={(node) => { sectionRefs.current[1] = node; }} id="team" className="relative flex h-[calc(100svh-72px)] min-w-full snap-start items-center px-5 py-12 md:px-12 lg:px-[8vw] max-md:h-auto max-md:min-h-[calc(100svh-72px)]">
          <div className="w-full max-w-[1400px]">
            <SectionHeading number="02" title="The people behind the layer." description="A research-led team building the connective tissue for the next generation of networks." />
            <div className="mt-10 grid gap-4 md:grid-cols-3">{team.map((person, index) => <TeamCard key={person.name} person={person} index={index} />)}</div>
          </div>
        </section>

        <section ref={(node) => { sectionRefs.current[2] = node; }} id="reads" className="relative flex h-[calc(100svh-72px)] min-w-full snap-start items-center px-5 py-12 md:px-12 lg:px-[8vw] max-md:h-auto max-md:min-h-[calc(100svh-72px)]">
          <div className="w-full max-w-[1400px]">
            <SectionHeading number="03" title="Good read." description="Signals from inside the network. Research, systems, and the shape of what's next." />
            <div className="section-scroll mt-9 flex snap-x gap-4 overflow-x-auto pb-5">{reads.map((article, index) => <ArticleCard key={article.title} article={article} index={index} />)}</div>
            <div className="mt-1 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"><Radio size={13} className="text-primary" /> Seven signals / scroll to explore</div>
          </div>
        </section>

        <section ref={(node) => { sectionRefs.current[3] = node; }} id="playground" className="relative flex h-[calc(100svh-72px)] min-w-full snap-start items-center px-5 py-12 md:px-12 lg:px-[8vw] max-md:h-auto max-md:min-h-[calc(100svh-72px)]">
          <div className="w-full max-w-[1400px]">
            <SectionHeading number="04" title="Play with the edge." description="Get hands-on with the mechanics: yield, coding, and the race against latency." />
            <div className="mt-12 grid gap-4 md:grid-cols-3">{playground.map((tool, index) => <PlaygroundCard key={tool.title} tool={tool} index={index} />)}</div>
          </div>
        </section>

        <section ref={(node) => { sectionRefs.current[4] = node; }} id="explore" className="relative flex h-[calc(100svh-72px)] min-w-full snap-start items-center px-5 py-12 md:px-12 lg:px-[8vw] max-md:h-auto max-md:min-h-[calc(100svh-72px)]">
          <div className="w-full max-w-[1400px]">
            <SectionHeading number="05" title="Go deeper." description="The docs, products, and resources that make the Optimum universe legible." />
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{explore.map((item, index) => <ExploreCard key={item.title} item={item} index={index} />)}</div>
            <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground"><span>Optimum — Scale any chain.</span><span className="flex items-center gap-2"><Code2 size={13} className="text-primary" /> Build the network</span></div>
          </div>
        </section>
      </div>

      <div className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-md md:flex">
        {sections.map((section, index) => <button key={section.id} type="button" aria-label={`Go to ${section.label}`} onClick={() => moveTo(index)} className={`h-1 rounded-full transition-all ${active === index ? "w-8 bg-primary" : "w-3 bg-muted-foreground/40 hover:bg-muted-foreground"}`} />)}
      </div>
      <motion.div initial={false} animate={{ opacity: hasStarted ? 0 : 1, y: hasStarted ? 8 : 0 }} className="pointer-events-none fixed bottom-6 right-5 z-40 hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground md:flex"><span>Scroll / arrows</span><MoveRight size={14} className="text-primary" /></motion.div>
    </main>
  );
}

function SectionHeading({ number, title, description }: { number: string; title: string; description: string }) {
  return <div className="grid items-end gap-5 border-b border-border pb-6 md:grid-cols-[1fr_0.62fr]"><div><div className="eyebrow mb-4">{number} / 05</div><h2 className="text-balance text-4xl font-medium tracking-[-0.06em] text-foreground md:text-6xl">{title}</h2></div><p className="max-w-sm text-sm leading-6 text-muted-foreground md:pb-1">{description}</p></div>;
}

function LinkCard({ link, index }: { link: (typeof links)[number]; index: number }) {
  const Icon = link.icon;
  return <motion.a initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06, duration: 0.5 }} href={link.href} target="_blank" rel="noreferrer" className="edge-card group flex min-h-[142px] flex-col justify-between rounded-lg p-4 sm:p-5"><div className="flex items-start justify-between"><Icon size={20} strokeWidth={1.5} className="text-primary transition-transform group-hover:scale-110" /><ArrowUpRight size={15} className="text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" /></div><div><div className="font-medium text-foreground">{link.label}</div><div className="mt-1 truncate font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground">{link.meta}</div></div></motion.a>;
}

function TeamCard({ person, index }: { person: (typeof team)[number]; index: number }) {
  return <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.12, duration: 0.7 }} className="edge-card group overflow-hidden rounded-lg"><div className="relative h-[310px] overflow-hidden bg-muted sm:h-[360px]"><img src={person.image} alt={person.name} className="h-full w-full object-cover object-top grayscale transition duration-700 group-hover:scale-[1.04] group-hover:grayscale-0" /><div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" /><span className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.15em] text-primary">{person.accent}</span></div><div className="p-5"><div className="eyebrow mb-2">{person.role}</div><h3 className="text-xl tracking-[-0.035em] text-foreground">{person.name}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{person.description}</p></div></motion.article>;
}

function ArticleCard({ article, index }: { article: (typeof reads)[number]; index: number }) {
  return <motion.a initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: index * 0.04, duration: 0.6 }} href={article.href} target="_blank" rel="noreferrer" className="edge-card group w-[275px] shrink-0 snap-start overflow-hidden rounded-lg sm:w-[330px]"><div className="relative aspect-[1.7] overflow-hidden bg-muted"><img src={article.image} alt={article.title} loading="lazy" className="article-image h-full w-full object-cover" /><span className="absolute left-3 top-3 rounded-full border border-primary/50 bg-background/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-primary backdrop-blur-sm">{article.tag}</span></div><div className="p-5"><div className="flex items-start justify-between gap-3"><h3 className="text-lg leading-tight tracking-[-0.035em] text-foreground">{article.title}</h3><ArrowUpRight size={16} className="mt-1 shrink-0 text-primary" /></div><p className="mt-3 text-sm leading-5 text-muted-foreground">{article.subtitle}</p></div></motion.a>;
}

function PlaygroundCard({ tool, index }: { tool: (typeof playground)[number]; index: number }) {
  const Icon = tool.icon;
  return <motion.a initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.1, duration: 0.6 }} href={tool.href} target="_blank" rel="noreferrer" className="tool-card group relative min-h-[270px] overflow-hidden rounded-lg p-6"><div className="absolute -right-4 -top-8 font-mono text-[9rem] font-medium leading-none text-foreground/[0.035]">{tool.number}</div><div className="relative flex h-full flex-col justify-between"><div className="flex items-center justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/60 text-primary transition duration-300 group-hover:rotate-12 group-hover:bg-primary group-hover:text-primary-foreground"><Icon size={21} strokeWidth={1.5} /></span><span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{tool.verb} <ArrowUpRight size={13} className="ml-1 inline text-primary" /></span></div><div><h3 className="text-2xl tracking-[-0.05em] text-foreground">{tool.title}</h3><p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{tool.subtitle}</p></div></div></motion.a>;
}

function ExploreCard({ item, index }: { item: (typeof explore)[number]; index: number }) {
  const Icon = item.icon;
  return <motion.a initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.08, duration: 0.5 }} href={item.href} target="_blank" rel="noreferrer" className="edge-card group flex min-h-[210px] flex-col justify-between rounded-lg p-5"><div className="flex items-center justify-between"><Icon size={21} strokeWidth={1.5} className="text-primary" /><ArrowUpRight size={16} className="text-muted-foreground transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" /></div><div><h3 className="text-xl tracking-[-0.04em] text-foreground">{item.title}</h3><p className="mt-2 text-sm leading-5 text-muted-foreground">{item.subtitle}</p></div></motion.a>;
}
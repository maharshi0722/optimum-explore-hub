import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Box,
  Calculator,
  Code2,
  FileText,
  Github,
  Globe2,
  Radio,
  Send,
  Sparkles,
  Twitter,
  Users,
  Youtube,
} from "lucide-react";
import { useEffect, useState } from "react";

import aprAsset from "@/assets/article-apr.jpeg.asset.json";
import blockchainAsset from "@/assets/article-blockchain.png.asset.json";
import flexnodesAsset from "@/assets/article-flexnodes.png.asset.json";
import killerAppsAsset from "@/assets/article-killer-apps.jpeg.asset.json";
import p2pAsset from "@/assets/article-p2p.jpeg.asset.json";
import researchAsset from "@/assets/article-research.jpeg.asset.json";
import scaleAsset from "@/assets/article-scale.jpeg.asset.json";
import kentAsset from "@/assets/kent-lin.png.asset.json";
import kishoriAsset from "@/assets/kishori-konwar.png.asset.json";
import murielAsset from "@/assets/muriel-medard.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Optimum Space — Scale Any Chain" },
      { name: "description", content: "Explore Optimum's links, people, research, experiments, and products." },
      { property: "og:title", content: "Optimum Space — Scale Any Chain" },
      { property: "og:description", content: "Explore Optimum's links, people, research, experiments, and products." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OptimumHub,
});

const modules = [
  { id: "links", label: "Official links", note: "Start here" },
  { id: "team", label: "The team", note: "People" },
  { id: "reads", label: "Good read", note: "Research" },
  { id: "playground", label: "Playground", note: "Experiments" },
  { id: "explore", label: "Explore", note: "Go deeper" },
] as const;

type ModuleId = (typeof modules)[number]["id"];

const officialLinks = [
  { title: "Optimum website", detail: "The official home of the ecosystem.", href: "https://www.getoptimum.xyz/", icon: Globe2 },
  { title: "X / Twitter", detail: "News and protocol updates.", href: "https://x.com/get_optimum", icon: Twitter },
  { title: "Discord", detail: "Join the network community.", href: "https://discord.com/invite/getoptimum", icon: Users },
  { title: "Telegram", detail: "Follow the community channel.", href: "https://t.me/+I1fmgPCPO5IxNzZl", icon: Send },
  { title: "YouTube", detail: "Watch talks and explainers.", href: "https://www.youtube.com/@getoptimum", icon: Youtube },
  { title: "GitHub", detail: "Explore the open-source stack.", href: "https://github.com/getoptimum/", icon: Github },
];

const team = [
  { title: "Kent Lin", detail: "Co-founder · Ecosystem, tokenomics and growth.", href: "https://www.getoptimum.xyz/", image: kentAsset.url },
  { title: "Prof. Muriel Médard", detail: "Co-founder & CEO · MIT professor and network coding pioneer.", href: "https://www.getoptimum.xyz/", image: murielAsset.url },
  { title: "Dr. Kishori Konwar", detail: "Co-founder · Distributed systems, coding theory and AI.", href: "https://www.getoptimum.xyz/", image: kishoriAsset.url },
];

const reads = [
  { title: "Optimizing a $100B Market", detail: "Latency reduction and ETH staking revenue.", href: "https://x.com/get_optimum/status/2041916972678705375", image: aprAsset.url },
  { title: "Flexnodes", detail: "A global network of data accelerators.", href: "https://x.com/get_optimum/status/2013656494139678752", image: flexnodesAsset.url },
  { title: "Introducing OptimumP2P", detail: "Implementation and benefits.", href: "https://x.com/get_optimum/status/1930698870507626516", image: p2pAsset.url },
  { title: "Decentralize to scale", detail: "Infrastructure for an onchain digital economy.", href: "https://x.com/kentlinyy/status/1963652915312349534", image: scaleAsset.url },
  { title: "Tomorrow's killer apps", detail: "Unlocking next-generation performance.", href: "https://x.com/kentlinyy/status/1935026597150736432", image: killerAppsAsset.url },
  { title: "Research & insights", detail: "Signals from Optimum's research ecosystem.", href: "https://x.com/MurielMedard/status/2086878404847317010", image: researchAsset.url },
  { title: "Rethinking the network layer", detail: "A new way to think about blockchain infrastructure.", href: "https://research.4pillars.io/en/research/optimum-rethinking-the-blockchain-network-layer", image: blockchainAsset.url },
];

const playground = [
  { title: "APR estimator", detail: "Estimate and explore APR.", href: "https://gmum.cc/apr_estimator/", icon: Calculator },
  { title: "RLNC simulation", detail: "See Random Linear Network Coding in motion.", href: "https://gmum.cc/simulation/", icon: Code2 },
  { title: "Latency game", detail: "Test the limits of speed.", href: "https://game.gmum.cc/", icon: Sparkles },
];

const explore = [
  { title: "Documentation", detail: "Learn how Optimum works.", href: "https://docs.getoptimum.xyz/docs/learn/overview/intro", icon: BookOpen },
  { title: "Products", detail: "Explore the technology and products.", href: "https://www.getoptimum.xyz/product", icon: Box },
  { title: "Blog", detail: "Updates, insights and research.", href: "https://www.getoptimum.xyz/blog", icon: FileText },
  { title: "Brand assets", detail: "Official identity and media resources.", href: "https://getoptimum.notion.site/Optimum-Brand-Assets-1a6fe54341398098843bc5847670e5ed", icon: Radio },
];

const moduleCopy: Record<ModuleId, { kicker: string; title: string; description: string }> = {
  links: { kicker: "Gateway 01", title: "Everything Optimum, one space.", description: "The official channels for the network layer built to scale any chain." },
  team: { kicker: "People 02", title: "Research runs deep.", description: "Meet the team turning decades of coding theory into faster decentralized systems." },
  reads: { kicker: "Signals 03", title: "Ideas worth the bandwidth.", description: "Research, systems thinking and practical notes from inside the network." },
  playground: { kicker: "Lab 04", title: "Make the network tangible.", description: "Run the numbers, simulate the code and race against latency." },
  explore: { kicker: "Directory 05", title: "Go deeper into Optimum.", description: "Documentation, products and resources for builders and curious minds." },
};

function OptimumHub() {
  const [active, setActive] = useState<ModuleId>("links");
  const activeIndex = modules.findIndex((module) => module.id === active);
  const copy = moduleCopy[active];

  const move = (direction: number) => {
    const next = (activeIndex + direction + modules.length) % modules.length;
    setActive(modules[next].id);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") move(1);
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") move(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  return (
    <main className="hub-shell">
      <div className="ambient-glow" aria-hidden="true" />
      <div className="network-mesh" aria-hidden="true">
        <i className="mesh-node mesh-node-a" /><i className="mesh-node mesh-node-b" /><i className="mesh-node mesh-node-c" />
      </div>

      <div className="hub-frame">
        <aside className="module-rail">
          <a href="https://www.getoptimum.xyz/" target="_blank" rel="noreferrer" className="optimum-mark" aria-label="Visit Optimum">
            <span className="optimum-symbol" aria-hidden="true">∞</span>
            <span>OPTIMUM</span>
            <em>SPACE</em>
          </a>

          <nav className="module-nav" aria-label="Optimum Space modules">
            {modules.map((module, index) => (
              <button
                key={module.id}
                type="button"
                onClick={() => setActive(module.id)}
                className={`module-button ${active === module.id ? "is-active" : ""}`}
                aria-current={active === module.id ? "page" : undefined}
              >
                <span className="module-number">0{index + 1}</span>
                <span className="module-name">{module.label}</span>
                <span className="module-note">{module.note}</span>
              </button>
            ))}
          </nav>

          <div className="rail-foot">
            <span>Network layer</span>
            <strong>Scale any chain.</strong>
          </div>
        </aside>

        <section className="module-stage" aria-live="polite">
          <div className="stage-topbar">
            <span>Optimum / Space</span>
            <div className="stage-actions">
              <button type="button" onClick={() => move(-1)} aria-label="Previous module"><ArrowLeft size={17} /></button>
              <button type="button" onClick={() => move(1)} aria-label="Next module"><ArrowRight size={17} /></button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="stage-content"
            >
              <header className="stage-heading">
                <div>
                  <p>{copy.kicker}</p>
                  <h1>{copy.title}</h1>
                </div>
                <p className="stage-description">{copy.description}</p>
              </header>
              <ModuleContent active={active} />
            </motion.div>
          </AnimatePresence>

          <footer className="stage-footer">
            <div className="progress-track"><span style={{ width: `${((activeIndex + 1) / modules.length) * 100}%` }} /></div>
            <span>[ 0{activeIndex + 1} / 05 ]</span>
          </footer>
        </section>
      </div>
    </main>
  );
}

function ModuleContent({ active }: { active: ModuleId }) {
  if (active === "team") return <CardGrid items={team} kind="people" />;
  if (active === "reads") return <CardGrid items={reads} kind="articles" />;
  if (active === "playground") return <CardGrid items={playground} kind="tools" />;
  if (active === "explore") return <CardGrid items={explore} kind="tools" />;
  return <CardGrid items={officialLinks} kind="links" />;
}

type GridItem = { title: string; detail: string; href: string; image?: string; icon?: typeof Globe2 };

function CardGrid({ items, kind }: { items: GridItem[]; kind: "links" | "people" | "articles" | "tools" }) {
  return (
    <div className={`module-grid module-grid-${kind}`}>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.a
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="glass-card"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.055, duration: 0.38 }}
          >
            {item.image ? <div className="card-image"><img src={item.image} alt="" loading="lazy" /></div> : null}
            <div className="card-copy">
              <div className="card-icon">{Icon ? <Icon size={21} strokeWidth={1.65} /> : <span>0{index + 1}</span>}</div>
              <ArrowUpRight className="card-arrow" size={17} />
              <div className="card-text"><h2>{item.title}</h2><p>{item.detail}</p></div>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
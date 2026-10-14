import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Box,
  Calculator,
  CheckCircle2,
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
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

import aprImage from "@/assets/article-apr.png";
import blockchainImage from "@/assets/article-blockchain.png";
import flexnodesImage from "@/assets/article-flexnodes.png";
import killerAppsImage from "@/assets/article-killer-apps.png";
import p2pImage from "@/assets/article-p2p.png";
import researchImage from "@/assets/article-research.png";
import scaleImage from "@/assets/article-scale.png";
import kentImage from "@/assets/kent-lin.png";
import kishoriImage from "@/assets/kishori-konwar.png";
import murielImage from "@/assets/muriel-medard.png";
import optimumLoopImage from "@/assets/optimum-loop.png";
import laboratoryAsset from "@/assets/optimum-laboratory.png";
import xLogo from "@/assets/logo-x.png";
import discordLogo from "@/assets/logo-discord.png";
import telegramLogo from "@/assets/logo-telegram.png";
import youtubeLogo from "@/assets/logo-youtube.png";
import githubLogo from "@/assets/logo-github.png";
import playgroundApr from "@/assets/playground-apr.png";
import playgroundSimulation from "@/assets/playground-simulation.png";
import playgroundLatency from "@/assets/playground-latency.png";

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
  { id: "community", label: "Community", note: "Featured work" },
  { id: "contribute", label: "Contribute", note: "Share your work" },
] as const;

type ModuleId = (typeof modules)[number]["id"];

const officialLinks = [
  { title: "Optimum website", detail: "The official home of the ecosystem.", href: "https://www.getoptimum.xyz/", logo: optimumLoopImage },
  { title: "X / Twitter", detail: "News and protocol updates.", href: "https://x.com/get_optimum", logo: xLogo },
  { title: "Discord", detail: "Join the network community.", href: "https://discord.com/invite/getoptimum", logo: discordLogo },
  { title: "Telegram", detail: "Follow the community channel.", href: "https://t.me/+I1fmgPCPO5IxNzZl", logo: telegramLogo },
  { title: "YouTube", detail: "Watch talks and explainers.", href: "https://www.youtube.com/@getoptimum", logo: youtubeLogo },
  { title: "GitHub", detail: "Explore the open-source stack.", href: "https://github.com/getoptimum/", logo: githubLogo },
];

const team = [
  { title: "Kent Lin", detail: "Co-founder · Ecosystem, tokenomics and growth.", href: "https://www.getoptimum.xyz/", image: kentImage },
  { title: "Prof. Muriel Médard", detail: "Co-founder & CEO · MIT professor and network coding pioneer.", href: "https://www.getoptimum.xyz/", image: murielImage },
  { title: "Dr. Kishori Konwar", detail: "Co-founder · Distributed systems, coding theory and AI.", href: "https://www.getoptimum.xyz/", image: kishoriImage },
];

const reads = [
  { title: "Optimizing a $100B Market", detail: "Latency reduction and ETH staking revenue.", href: "https://x.com/get_optimum/status/2041916972678705375", image: aprImage },
  { title: "Flexnodes", detail: "A global network of data accelerators.", href: "https://x.com/get_optimum/status/2013656494139678752", image: flexnodesImage },
  { title: "Introducing OptimumP2P", detail: "Implementation and benefits.", href: "https://x.com/get_optimum/status/1930698870507626516", image: p2pImage },
  { title: "Decentralize to scale", detail: "Infrastructure for an onchain digital economy.", href: "https://x.com/kentlinyy/status/1963652915312349534", image: scaleImage },
  { title: "Tomorrow's killer apps", detail: "Unlocking next-generation performance.", href: "https://x.com/kentlinyy/status/1935026597150736432", image: killerAppsImage },
  { title: "Research & insights", detail: "Signals from Optimum's research ecosystem.", href: "https://x.com/MurielMedard/status/2086878404847317010", image: researchImage },
  { title: "Rethinking the network layer", detail: "A new way to think about blockchain infrastructure.", href: "https://research.4pillars.io/en/research/optimum-rethinking-the-blockchain-network-layer/", image: blockchainImage },
];

const playground = [
  { title: "APR estimator", detail: "Estimate and explore APR.", href: "https://gmum.cc/apr_estimator/", icon: Calculator, image: playgroundApr },
  { title: "RLNC simulation", detail: "See Random Linear Network Coding in motion.", href: "https://gmum.cc/simulation/", icon: Code2, image: playgroundSimulation },
  { title: "Latency game", detail: "Test the limits of speed.", href: "https://game.gmum.cc/", icon: Sparkles, image: playgroundLatency },
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
  community: { kicker: "Community 06", title: "Built across the network.", description: "Discover community art, builds, technical work and videos shared by Optimum contributors." },
  contribute: { kicker: "Contribute 07", title: "Put your work in orbit.", description: "Share a public X post and tell the community what you have been making." },
};

type CommunitySubmission = {
  id: string;
  contributor_name: string;
  work_title: string;
  category: string;
  x_url: string;
  created_at: string;
};

const communityCategories = ["Art", "Build", "Technical", "Video"] as const;

function OptimumHub() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState<ModuleId>("links");
  const [community, setCommunity] = useState<CommunitySubmission[]>([]);
  const [communityLoadError, setCommunityLoadError] = useState(false);
  const activeIndex = modules.findIndex((module) => module.id === active);
  const copy = moduleCopy[active];

  useEffect(() => {
    let mounted = true;
    const loadCommunity = async () => {
      const { data, error } = await supabase
        .from("community_submissions")
        .select("id, contributor_name, work_title, category, x_url, created_at")
        .order("created_at", { ascending: false })
        .limit(60);
      if (!mounted) return;
      if (error) {
        setCommunityLoadError(true);
        return;
      }
      setCommunityLoadError(false);
      setCommunity(data ?? []);
    };
    void loadCommunity();
    const channel = supabase
      .channel("community-submissions-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "community_submissions" }, () => {
        void loadCommunity();
      })
      .subscribe();
    return () => {
      mounted = false;
      void supabase.removeChannel(channel);
    };
  }, []);

  const move = (direction: number) => {
    const next = (activeIndex + direction + modules.length) % modules.length;
    const nextModule = modules[next];
    if (!nextModule) return;
    setActive(nextModule.id);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.closest("input, textarea, select, [contenteditable='true'], .module-grid-articles")) return;
      if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  return (
    <main className="hub-shell">
      <div className="laboratory-background" aria-hidden="true">
        <img src={laboratoryAsset} alt="" fetchPriority="high" decoding="async" />
      </div>

      <div className="hub-frame">
        <aside className="module-rail">
          <a href="https://www.getoptimum.xyz/" target="_blank" rel="noreferrer" className="optimum-mark" aria-label="Visit Optimum">
            <span className="optimum-symbol"><img src={optimumLoopImage} alt="" /></span>
            <span className="optimum-wordmark"><strong>OPTIMUM</strong><em>SPACE</em></span>
          </a>

          <nav className="module-nav" aria-label="Optimum Space modules">
            {modules.map((module, index) => (
              <Button variant="ghost"
                key={module.id}
                type="button"
                onClick={() => setActive(module.id)}
                className={`module-button ${active === module.id ? "is-active" : ""}`}
                aria-current={active === module.id ? "page" : undefined}
              >
                <span className="module-number">0{index + 1}</span>
                <span className="module-name">{module.label}</span>
                <span className="module-note">{module.note}</span>
              </Button>
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
              <Button variant="ghost" type="button" onClick={() => move(-1)} aria-label="Previous module" title="Previous module"><ArrowLeft size={17} /></Button>
              <Button variant="ghost" type="button" onClick={() => move(1)} aria-label="Next module" title="Next module"><ArrowRight size={17} /></Button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: reducedMotion ? 0 : 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reducedMotion ? 0 : -20 }}
              transition={{ duration: reducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
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
            <span>[ 0{activeIndex + 1} / 07 ]</span>
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
  if (active === "community") return <CommunityHighlights items={community} loadError={communityLoadError} />;
  if (active === "contribute") return <ContributionForm onSubmitted={(entry) => setCommunity((current) => [entry, ...current.filter((item) => item.id !== entry.id)])} />;
  return <CardGrid items={officialLinks} kind="links" />;
}

type GridItem = { title: string; detail: string; href: string; image?: string; logo?: string; icon?: typeof Globe2 };

function CardGrid({ items, kind }: { items: GridItem[]; kind: "links" | "people" | "articles" | "tools" }) {
  const reducedMotion = useReducedMotion();
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
            className="tech-card"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reducedMotion ? 0 : index * 0.04, duration: reducedMotion ? 0 : 0.3 }}
          >
            {item.image ? <div className="card-image"><img src={item.image} alt={item.title} loading="lazy" /></div> : null}
            <div className="card-copy">
              <div className="card-icon">{item.logo ? <img src={item.logo} alt="" /> : Icon ? <Icon size={21} strokeWidth={1.65} /> : <span>0{index + 1}</span>}</div>
              <ArrowUpRight className="card-arrow" size={17} />
              <div className="card-text"><h2>{item.title}</h2><p>{item.detail}</p></div>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}

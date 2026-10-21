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
  ChevronDown,
  ChevronUp,
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
import { useEffect, useRef, useState, type FormEvent } from "react";
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
  { title: "Rethinking the network layer", detail: "A new way to think about blockchain infrastructure.", href: "https://research.4pillars.io/en/research/optimum-rethinking-the-blockchain-network-layer", image: blockchainImage },
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
  upvote_count: number;
  downvote_count: number;
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
        .select("id, contributor_name, work_title, category, x_url, created_at, upvote_count, downvote_count")
        .order("upvote_count", { ascending: false })
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

  const selectModule = (moduleId: ModuleId) => {
    setActive(moduleId);
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 900px)").matches) {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <main className="hub-shell">
      <div className="laboratory-background" aria-hidden="true">
        <img src={laboratoryAsset} alt="" fetchPriority="high" decoding="async" />
      </div>

      <header className="mobile-topbar">
        <a href="https://www.getoptimum.xyz/" target="_blank" rel="noreferrer" className="optimum-mark" aria-label="Visit Optimum">
          <span className="optimum-symbol"><img src={optimumLoopImage} alt="" /></span>
          <span className="optimum-wordmark"><strong>OPTIMUM</strong><em>SPACE</em></span>
        </a>
        <span className="mobile-topbar-tagline">Scale any chain.</span>
      </header>

      <div className="hub-frame">
        <aside className="module-rail">
          <nav className="module-nav" aria-label="Optimum Space modules">
            {modules.map((module, index) => (
              <button
                key={module.id}
                type="button"
                onClick={() => selectModule(module.id)}
                className={`module-button ${active === module.id ? "is-active" : ""}`}
                aria-current={active === module.id ? "page" : undefined}
              >
                <span className="module-number" aria-hidden="true">0{index + 1}</span>
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
              <ModuleContent
                active={active}
                community={community}
                communityLoadError={communityLoadError}
                onCommunityRefresh={async () => {
                  const { data, error } = await supabase
                    .from("community_submissions")
                    .select("id, contributor_name, work_title, category, x_url, created_at, upvote_count, downvote_count")
                    .order("upvote_count", { ascending: false })
                    .order("created_at", { ascending: false })
                    .limit(60);
                  if (!error && data) setCommunity(data);
                }}
                onCommunitySubmitted={(entry) => setCommunity((current) => [entry, ...current.filter((item) => item.id !== entry.id)])}
              />
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

function ModuleContent({
  active,
  community,
  communityLoadError,
  onCommunityRefresh,
  onCommunitySubmitted,
}: {
  active: ModuleId;
  community: CommunitySubmission[];
  communityLoadError: boolean;
  onCommunityRefresh: () => Promise<void>;
  onCommunitySubmitted: (entry: CommunitySubmission) => void;
}) {
  if (active === "team") return <CardGrid items={team} kind="people" />;
  if (active === "reads") return <CardGrid items={reads} kind="articles" />;
  if (active === "playground") return <CardGrid items={playground} kind="tools" />;
  if (active === "explore") return <CardGrid items={explore} kind="tools" />;
  if (active === "community") return <CommunityHighlights items={community} loadError={communityLoadError} onRefresh={onCommunityRefresh} />;
  if (active === "contribute") return <ContributionForm onSubmitted={onCommunitySubmitted} />;
  return <CardGrid items={officialLinks} kind="links" />;
}

function CommunityHighlights({ items, loadError, onRefresh }: { items: CommunitySubmission[]; loadError: boolean; onRefresh: () => Promise<void> }) {
  const [filter, setFilter] = useState<string>("All work");
  const [voterKey, setVoterKey] = useState("");
  const [voteMarks, setVoteMarks] = useState<Record<string, number>>({});
  const [votingId, setVotingId] = useState<string | null>(null);
  const [voteMessage, setVoteMessage] = useState("");
  const filters = ["All work", ...communityCategories];
  const filtered = (filter === "All work" ? items : items.filter((item) => item.category === filter))
    .slice()
    .sort((a, b) => {
      const aScore = a.upvote_count - a.downvote_count;
      const bScore = b.upvote_count - b.downvote_count;
      return bScore - aScore || new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  useEffect(() => {
    let key = window.localStorage.getItem("optimum-community-voter");
    if (!key || !/^[a-f0-9-]{36}$/i.test(key)) {
      key = window.crypto.randomUUID();
      window.localStorage.setItem("optimum-community-voter", key);
    }
    setVoterKey(key);
  }, []);

  useEffect(() => {
    if (!voterKey) return;
    let cancelled = false;
    void supabase.rpc("get_community_voter_marks", { _voter_key: voterKey }).then(({ data, error }) => {
      if (cancelled || error || !data) return;
      setVoteMarks(Object.fromEntries(data.map((mark) => [mark.submission_id, mark.vote])));
    });
    return () => { cancelled = true; };
  }, [voterKey]);

  const castVote = async (submissionId: string, vote: 1 | -1) => {
    if (!voterKey || votingId) return;
    const previous = voteMarks[submissionId] ?? 0;
    if (previous === vote) return;

    setVotingId(submissionId);
    setVoteMessage("");
    const { error } = await supabase.rpc("cast_community_vote", {
      _submission_id: submissionId,
      _voter_key: voterKey,
      _vote: vote,
    });

    if (error) {
      setVoteMessage("Your vote could not be saved. Please try again.");
    } else {
      setVoteMarks((current) => ({ ...current, [submissionId]: vote }));
    }

    setVotingId(null);
    await onRefresh();
  };

  return (
    <section className="community-section" aria-label="Community highlights">
      <div className="community-toolbar">
        <div className="community-count"><Users size={16} /><span>{items.length} shared works</span></div>
        <div className="community-filters" aria-label="Filter community work">
          {filters.map((category) => (
            <Button
              key={category}
              type="button"
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      {loadError ? (
        <p className="community-empty" role="status">Community work could not load right now. Please try again shortly.</p>
      ) : filtered.length === 0 ? (
        <div className="community-empty">
          <Sparkles size={24} />
          <h2>{items.length === 0 ? "The first highlight is yours." : `No ${filter.toLowerCase()} shared yet.`}</h2>
          <p>Share your work and it will appear here for the whole community.</p>
        </div>
      ) : (
        <div className="community-grid">
          {filtered.map((item, index) => (
            <motion.article
              key={item.id}
              className="community-card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.025, duration: 0.25 }}
            >
              <div className="community-card-header">
                <div className="community-author"><span className="community-category">{item.category}</span><strong>{item.contributor_name}</strong></div>
                <div className="community-votes" aria-label="Vote on this post">
                  <Button type="button" variant="ghost" className={voteMarks[item.id] === 1 ? "vote-button is-upvoted" : "vote-button"} aria-label={`Upvote ${item.work_title}`} aria-pressed={voteMarks[item.id] === 1} onClick={() => castVote(item.id, 1)}>
                    <ChevronUp size={14} /> {item.upvote_count}
                  </Button>
                  <Button type="button" variant="ghost" className={voteMarks[item.id] === -1 ? "vote-button is-downvoted" : "vote-button"} aria-label={`Downvote ${item.work_title}`} aria-pressed={voteMarks[item.id] === -1} onClick={() => castVote(item.id, -1)}>
                    <ChevronDown size={14} /> {item.downvote_count}
                  </Button>
                </div>
              </div>
              <h2>{item.work_title}</h2>
              <TwitterPost url={item.x_url} />
              <a className="community-open-post" href={item.x_url} target="_blank" rel="noreferrer">View on X <ArrowUpRight size={14} /></a>
            </motion.article>
          ))}
        </div>
      )}
      {voteMessage ? <p className="form-message" role="status">{voteMessage}</p> : null}
    </section>
  );
}

function TwitterPost({ url }: { url: string }) {
  const embedRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = embedRef.current;
    if (!container) return;
    let cancelled = false;
    const currentWindow = window as typeof window & { twttr?: { widgets?: { load: (target?: HTMLElement) => Promise<unknown> } } };
    const loadEmbed = () => {
      if (cancelled) return;
      const twitter = currentWindow.twttr;
      if (twitter?.widgets) {
        void twitter.widgets.load(container);
        return;
      }
      let script = document.querySelector<HTMLScriptElement>("script[data-optimum-x-embed]");
      if (!script) {
        script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.dataset["optimumXEmbed"] = "true";
        document.body.appendChild(script);
      }
      script.addEventListener("load", loadEmbed, { once: true });
    };
    loadEmbed();
    return () => { cancelled = true; };
  }, [url]);

  return <div className="community-embed" ref={embedRef}>
    <blockquote className="twitter-tweet" data-dnt="true" data-theme="dark" data-align="center"><a href={url}>View this post on X</a></blockquote>
  </div>;
}

function ContributionForm({ onSubmitted }: { onSubmitted: (entry: CommunitySubmission) => void }) {
  const [contributorName, setContributorName] = useState("");
  const [workTitle, setWorkTitle] = useState("");
  const [category, setCategory] = useState<(typeof communityCategories)[number]>("Build");
  const [xUrl, setXUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setSuccess(false);
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(xUrl.trim());
    } catch {
      setMessage("Add a valid public X post link to continue.");
      return;
    }
    const host = parsedUrl.hostname.toLowerCase();
    if (parsedUrl.protocol !== "https:" || !["x.com", "www.x.com", "twitter.com", "www.twitter.com"].includes(host)) {
      setMessage("Use a public post link from x.com or twitter.com.");
      return;
    }

    setSubmitting(true);
    const { data, error } = await supabase
      .from("community_submissions")
      .insert({
        contributor_name: contributorName.trim(),
        work_title: workTitle.trim(),
        category,
        x_url: parsedUrl.toString(),
      })
      .select("id, contributor_name, work_title, category, x_url, created_at, upvote_count, downvote_count")
      .single();
    setSubmitting(false);
    if (error || !data) {
      setMessage("We couldn’t add that post just now. Please check the details and try again.");
      return;
    }
    onSubmitted(data);
    setSuccess(true);
    setMessage("Your work is live in Community Highlights.");
    setContributorName("");
    setWorkTitle("");
    setXUrl("");
  };

  return (
    <div className="contribution-layout">
      <aside className="contribution-note">
        <span className="community-category">Community 06</span>
        <h2>Your work, in the shared space.</h2>
        <p>Share art, builds, technical work or video. Once submitted, it appears in Community Highlights for everyone.</p>
        <span className="contribution-note-foot"><CheckCircle2 size={15} /> No account needed</span>
      </aside>
      <form className="contribution-form" onSubmit={submit}>
        <label className="form-field">
          <span>Contributor name</span>
          <input value={contributorName} onChange={(event) => setContributorName(event.target.value)} minLength={2} maxLength={80} autoComplete="name" required placeholder="How should we credit you?" />
        </label>
        <label className="form-field">
          <span>Work title</span>
          <input value={workTitle} onChange={(event) => setWorkTitle(event.target.value)} minLength={2} maxLength={120} required placeholder="Give your work a name" />
        </label>
        <label className="form-field">
          <span>Category</span>
          <select value={category} onChange={(event) => setCategory(event.target.value as (typeof communityCategories)[number])}>
            {communityCategories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label className="form-field">
          <span>X post link</span>
          <input value={xUrl} onChange={(event) => setXUrl(event.target.value)} type="url" inputMode="url" maxLength={500} required placeholder="https://x.com/you/status/..." />
        </label>
        <div className="form-submit-row">
          <Button type="submit" disabled={submitting}>{submitting ? "Adding work…" : "Add to Community"}<ArrowUpRight size={16} /></Button>
          {message ? <p className={success ? "form-message is-success" : "form-message"} role="status">{message}</p> : null}
        </div>
      </form>
    </div>
  );
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

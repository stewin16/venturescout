'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp,
  Building2,
  Search,
  ListTodo,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useStorage } from '@/hooks/use-storage';
import companiesData from '@/data/companies.json';

export default function Dashboard() {
  const { lists, savedSearches } = useStorage();
  const totalCompanies = companiesData.length;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="p-16 max-w-7xl mx-auto space-y-24">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-8"
      >
        <div className="flex items-center gap-4 text-primary font-bold uppercase tracking-[0.2em] text-[10px]">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Intelligence Active
        </div>
        <div className="space-y-4">
          <h1 className="text-6xl font-extrabold tracking-tight text-foreground">
            Discovery Dashboard
          </h1>
          <p className="text-muted-foreground text-2xl font-medium max-w-3xl leading-relaxed">
            Continuously monitoring <span className="text-foreground">{totalCompanies}</span> high-growth entities across your strategic focus sectors.
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-12"
      >
        <motion.div variants={item}>
          <Card className="border border-border bg-white shadow-sm hover:shadow-2xl hover:shadow-primary/[0.04] transition-all duration-500 rounded-[2.5rem] overflow-hidden group">
            <CardHeader className="p-12 pb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/[0.03] flex items-center justify-center mb-8 group-hover:bg-primary transition-all duration-500">
                <Building2 className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <CardTitle className="text-5xl font-extrabold tracking-tight">{totalCompanies}</CardTitle>
              <CardDescription className="font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 mt-4 leading-none">Active Entities</CardDescription>
            </CardHeader>
            <CardContent className="p-12 pt-8">
              <Button asChild variant="outline" className="w-full rounded-2xl h-14 font-bold text-[11px] uppercase tracking-widest border-border hover:bg-secondary transition-all">
                <Link href="/companies">View Pipeline</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border border-border bg-white shadow-sm hover:shadow-2xl hover:shadow-primary/[0.04] transition-all duration-500 rounded-[2.5rem] overflow-hidden group">
            <CardHeader className="p-12 pb-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/[0.03] flex items-center justify-center mb-8 group-hover:bg-emerald-500 transition-all duration-500">
                <ListTodo className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <CardTitle className="text-5xl font-extrabold tracking-tight">{lists.length}</CardTitle>
              <CardDescription className="font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 mt-4 leading-none">Thematic Lists</CardDescription>
            </CardHeader>
            <CardContent className="p-12 pt-8">
              <Button asChild variant="outline" className="w-full rounded-2xl h-14 font-bold text-[11px] uppercase tracking-widest border-border hover:bg-secondary transition-all">
                <Link href="/lists">Manage Lists</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border border-border bg-white shadow-sm hover:shadow-2xl hover:shadow-primary/[0.04] transition-all duration-500 rounded-[2.5rem] overflow-hidden group">
            <CardHeader className="p-12 pb-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/[0.03] flex items-center justify-center mb-8 group-hover:bg-amber-500 transition-all duration-500">
                <Search className="w-7 h-7 text-amber-600 group-hover:text-white transition-colors" />
              </div>
              <CardTitle className="text-5xl font-extrabold tracking-tight">{savedSearches.length}</CardTitle>
              <CardDescription className="font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 mt-4 leading-none">Saved Intel</CardDescription>
            </CardHeader>
            <CardContent className="p-12 pt-8">
              <Button asChild variant="outline" className="w-full rounded-2xl h-14 font-bold text-[11px] uppercase tracking-widest border-border hover:bg-secondary transition-all">
                <Link href="/saved">Access Views</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 pt-12"
      >
        <div className="space-y-10">
          <div className="flex items-center gap-8">
            <h3 className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground/40 uppercase italic">
              System Infrastructure
            </h3>
            <div className="h-px flex-1 bg-border/60" />
          </div>
          <div className="grid gap-8">
            <div className="flex items-center gap-8 p-10 rounded-[2.5rem] bg-white border border-border/80 hover:shadow-2xl hover:shadow-primary/[0.05] hover:border-primary/20 transition-all duration-500 group">
              <div className="w-14 h-14 rounded-2xl bg-primary/[0.03] flex items-center justify-center text-primary shrink-0 group-hover:bg-primary transition-all duration-500">
                <ShieldCheck className="w-7 h-7 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-bold text-xl text-foreground">Synthesis Engine</p>
                <p className="text-base text-muted-foreground/60 mt-1 font-medium leading-relaxed italic">Intelligence layer powered by Gemini 2.5 Flash.</p>
              </div>
            </div>
            <div className="flex items-center gap-8 p-10 rounded-[2.5rem] bg-white border border-border/80 hover:shadow-2xl hover:shadow-foreground/[0.05] hover:border-foreground/20 transition-all duration-500 group">
              <div className="w-14 h-14 rounded-2xl bg-secondary/50 flex items-center justify-center text-foreground shrink-0 group-hover:bg-foreground transition-all duration-500">
                <Globe className="w-7 h-7 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-bold text-xl text-foreground">Global Ingest</p>
                <p className="text-base text-muted-foreground/60 mt-1 font-medium leading-relaxed italic">Real-time scouting for worldwide high-growth entities.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <Card className="w-full rounded-[3rem] border border-primary/10 bg-primary/[0.02] p-16 text-center space-y-12 relative overflow-hidden group shadow-lg shadow-primary/[0.02]">
            <TrendingUp className="w-64 h-64 text-primary opacity-[0.02] absolute -right-16 -bottom-16 rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-all duration-1000" />
            <div className="space-y-6 relative z-10">
              <h4 className="text-4xl font-extrabold tracking-tight text-primary">Initiate Discovery</h4>
              <p className="text-muted-foreground font-medium text-xl leading-relaxed max-w-sm mx-auto italic">
                Deploy our AI-driven scout to identify high-conviction strategic assets.
              </p>
            </div>
            <Button asChild size="lg" className="rounded-2xl h-16 px-16 font-bold text-[11px] uppercase tracking-widest bg-primary text-white shadow-2xl shadow-primary/20 hover:bg-primary/95 transition-all relative z-10 hover:scale-105 active:scale-95">
              <Link href="/companies">Launch Ingest Engine</Link>
            </Button>
          </Card>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-12"
      >
        <div className="flex items-center gap-8">
          <h3 className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground/40 uppercase italic">
            Recent Intelligence Signals
          </h3>
          <div className="h-px flex-1 bg-border/60" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { company: 'Stripe', signal: 'Expanding into Global Identity verification', time: '2m ago' },
            { company: 'OpenAI', signal: 'New frontier model training detected', time: '14m ago' },
            { company: 'SpaceX', signal: 'Strategic launch cadence accelerated', time: '1h ago' }
          ].map((sig, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + (i * 0.1) }}
              className="p-8 rounded-[2rem] bg-white border border-border/60 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/[0.02] transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-extrabold text-sm text-primary">{sig.company}</span>
                <span className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-widest">{sig.time}</span>
              </div>
              <p className="text-base font-bold text-foreground/70 leading-snug italic group-hover:text-foreground transition-colors">{sig.signal}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

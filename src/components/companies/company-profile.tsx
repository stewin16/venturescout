'use client';

import { useState } from 'react';
import { Company, EnrichmentResult } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    MapPin,
    Link as LinkIcon,
    FileText,
    BrainCircuit,
    History,
    Save,
    Clock,
    ExternalLink,
    MessageSquare,
    ChevronDown
} from 'lucide-react';
import { useStorage } from '@/hooks/use-storage';
import { toast } from 'sonner';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export function CompanyProfile({ company }: { company: Company }) {
    const {
        notes,
        saveNote,
        enrichmentCache,
        cacheEnrichment,
        lists,
        addCompanyToList,
        createListAndAddCompany,
        thesis
    } = useStorage();
    const [isEnriching, setIsEnriching] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    const enrichment = enrichmentCache[company.id];
    const noteContent = notes[company.id] || '';

    const handleEnrich = async () => {
        setIsEnriching(true);
        try {
            const res = await fetch('/api/enrich', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url: company.website, // Added for redundancy
                    website: company.website,
                    thesis: thesis
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Enrichment failed');
            }

            const data = await res.json();
            cacheEnrichment(company.id, data);
            toast.success('Intelligence report generated successfully');
            setActiveTab('intelligence');
        } catch (error: any) {
            toast.error(error.message || 'Failed to enrich company data');
            console.error(error);
        } finally {
            setIsEnriching(false);
        }
    };

    const handleAddToList = (listId: string) => {
        addCompanyToList(listId, company.id);
        toast.success(`Added ${company.name} to list.`);
    };

    const handleCreateAndAdd = () => {
        const listName = prompt("Enter new list name:");
        if (listName) {
            createListAndAddCompany(listName, company.id);
            toast.success(`Created new list "${listName}" and added ${company.name}.`);
        }
    };

    return (
        <div className="p-4 sm:p-8 lg:p-16 max-w-7xl mx-auto space-y-12 sm:space-y-20">
            {/* Header Section */}
            <div className="relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.03] blur-[120px] pointer-events-none rounded-full" />
                <div className="flex flex-col xl:flex-row gap-10 lg:gap-16 items-start relative">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl sm:rounded-[2.5rem] bg-secondary/30 border border-border/50 flex items-center justify-center text-4xl sm:text-5xl font-extrabold text-primary shadow-sm shrink-0 group hover:bg-primary hover:text-white transition-all duration-500">
                        {company.name[0]}
                    </div>
                    <div className="flex-1 space-y-8 sm:space-y-10 pt-0 sm:pt-4">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
                            <div className="space-y-6">
                                <div className="flex items-center gap-5">
                                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/10 px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
                                        {company.category}
                                    </Badge>
                                    <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em] flex items-center gap-2 italic">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        Monitoring Active
                                    </span>
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
                                    {company.name}
                                </h1>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-10 pt-2 sm:pt-4">
                                    <div className="flex items-center gap-3 text-sm font-bold text-foreground/50 uppercase tracking-[0.15em]">
                                        <MapPin className="w-4 h-4 text-primary/40" />
                                        {company.location}
                                    </div>
                                    <a
                                        href={company.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 hover:text-primary transition-all text-sm font-bold text-foreground/50 uppercase tracking-[0.15em] group"
                                    >
                                        <LinkIcon className="w-4 h-4 text-primary/40 group-hover:rotate-12 transition-transform" />
                                        {company.website.replace('https://', '').replace(/\/$/, '')}
                                    </a>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="lg" className="rounded-2xl h-14 px-8 border-border/80 bg-white font-bold uppercase text-[11px] tracking-widest hover:bg-secondary transition-all gap-3 shadow-md active:scale-95">
                                            Intelligence Stack <ChevronDown className="w-4 h-4 opacity-30" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-72 bg-white border-border shadow-2xl rounded-[1.5rem] p-3 mt-4 overflow-hidden">
                                        {lists.length === 0 ? (
                                            <DropdownMenuItem disabled className="text-muted-foreground/40 font-bold text-[10px] uppercase tracking-widest p-5 italic">No Active Stacks</DropdownMenuItem>
                                        ) : (
                                            lists.map(list => (
                                                <DropdownMenuItem key={list.id} onClick={() => handleAddToList(list.id)} className="rounded-xl h-14 font-bold text-base tracking-tight cursor-pointer hover:bg-secondary px-5">
                                                    {list.name}
                                                </DropdownMenuItem>
                                            ))
                                        )}
                                        <DropdownMenuItem className="border-t border-border/60 mt-3 text-primary font-bold uppercase text-[10px] tracking-widest h-14 rounded-xl cursor-pointer hover:bg-primary/5 px-5" onClick={handleCreateAndAdd}>
                                            + Initialize New Stack
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <Button
                                    size="lg"
                                    className="rounded-2xl h-14 px-10 bg-primary hover:bg-primary/95 text-white font-bold uppercase text-[11px] tracking-widest gap-3 shadow-2xl shadow-primary/20 transition-all active:scale-95 hover:scale-105"
                                    onClick={handleEnrich}
                                    disabled={isEnriching}
                                >
                                    <Sparkles className={`w-5 h-5 ${isEnriching ? 'animate-spin' : ''}`} />
                                    {isEnriching ? 'Synthesizing...' : 'Deploy Intelligence'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-10 sm:space-y-16">
                <div className="flex items-center justify-start -mx-4 sm:mx-0 overflow-x-auto scrollbar-hide px-4 sm:px-0">
                    <TabsList className="bg-secondary/[0.05] p-2 rounded-2xl h-16 w-max sm:w-full max-w-3xl border border-border/40">
                        <TabsTrigger value="overview" className="flex-1 rounded-xl gap-3 text-[11px] font-bold uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg transition-all h-full">
                            <FileText className="w-4 h-4" /> Dossier
                        </TabsTrigger>
                        <TabsTrigger value="intelligence" className="flex-1 rounded-xl gap-3 text-[11px] font-bold uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg transition-all h-full relative">
                            <BrainCircuit className="w-4 h-4" /> Synthesis
                            {enrichment && <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></span>}
                        </TabsTrigger>
                        <TabsTrigger value="signals" className="flex-1 rounded-xl gap-3 text-[11px] font-bold uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg transition-all h-full">
                            <History className="w-4 h-4" /> Momentum
                        </TabsTrigger>
                        <TabsTrigger value="notes" className="flex-1 rounded-xl gap-3 text-[11px] font-bold uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg transition-all h-full">
                            <MessageSquare className="w-4 h-4" /> Analyst Log
                        </TabsTrigger>
                    </TabsList>
                </div>

                <AnimatePresence mode="wait">
                    <TabsContent value="overview" key="overview" asChild className="mt-0 outline-none">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-16"
                        >
                            <div className="md:col-span-2 space-y-16">
                                <div className="space-y-10">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/20 italic">
                                        Executive Summary
                                    </h3>
                                    <p className="text-3xl font-bold leading-tight text-foreground/80 tracking-tight italic">
                                        {company.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
                                    <Card className="border-none ring-1 ring-emerald-100/60 bg-emerald-50/20 shadow-sm rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-10 group hover:bg-emerald-50/40 transition-all duration-500">
                                        <CardDescription className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600/60 mb-4 sm:mb-6 italic">Growth Velocity</CardDescription>
                                        <div className="flex items-center gap-4">
                                            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)] animate-pulse"></div>
                                            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-emerald-900/80">Aggressive Expansion</span>
                                        </div>
                                    </Card>
                                    <Card className="border-none ring-1 ring-primary/10 bg-primary/[0.01] shadow-sm rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-10 group hover:bg-primary/[0.03] transition-all duration-500">
                                        <CardDescription className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-primary/40 mb-4 sm:mb-6 italic">Market Sentiment</CardDescription>
                                        <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-primary/80">High Conviction Signal</span>
                                    </Card>
                                </div>
                            </div>

                            <div className="space-y-10">
                                <Card className="border border-border/40 bg-white shadow-sm rounded-[2.5rem] overflow-hidden p-10 space-y-12 ring-1 ring-border/5">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/20 italic">
                                        Entity Telemetry
                                    </h3>
                                    <div className="space-y-10">
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-bold text-primary/40 uppercase tracking-[0.2em]">HQ Location</p>
                                            <p className="font-extrabold text-lg text-foreground/80">{company.location}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-bold text-primary/40 uppercase tracking-[0.2em]">Primary Sector</p>
                                            <p className="font-extrabold text-lg text-foreground/80">{company.category}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-bold text-primary/40 uppercase tracking-[0.2em]">Discovery Meta</p>
                                            <p className="font-extrabold text-lg text-foreground/80">Feb 2026</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="intelligence" key="intelligence" asChild className="mt-0 outline-none">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="relative"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                                <div className="md:col-span-2">
                                    {isEnriching ? (
                                        <div className="space-y-12 relative overflow-hidden rounded-[3rem] p-24 bg-primary/[0.01] border border-primary/5">
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-scan z-0" />
                                            <div className="relative z-10 space-y-12">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                                                        <BrainCircuit className="w-8 h-8 text-primary animate-pulse" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl font-bold tracking-tight">Intelligence Synthesis in Progress</h4>
                                                        <p className="text-sm text-muted-foreground/60 font-medium">Scraping proprietary nodes and running Gemini 2.5 Flash...</p>
                                                    </div>
                                                </div>
                                                <Skeleton className="h-[180px] w-full rounded-[2rem] bg-secondary/10" />
                                                <div className="grid grid-cols-2 gap-10">
                                                    <Skeleton className="h-[200px] w-full rounded-[2rem] bg-secondary/10" />
                                                    <Skeleton className="h-[200px] w-full rounded-[2rem] bg-secondary/10" />
                                                </div>
                                            </div>
                                        </div>
                                    ) : enrichment ? (
                                        <div className="space-y-16">
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                                                <div className="md:col-span-3 space-y-8">
                                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/30 flex items-center gap-6 italic">
                                                        AI Synthesis Engine
                                                        <div className="h-px flex-1 bg-border/40" />
                                                    </h3>
                                                    <p className="text-2xl font-bold leading-relaxed text-foreground/80 tracking-tight italic">
                                                        {enrichment.summary}
                                                    </p>
                                                </div>

                                                <Card className="border-none ring-1 ring-emerald-100/60 bg-emerald-50/30 flex flex-col justify-center items-center text-center p-10 rounded-[2.5rem] relative overflow-hidden h-56 shadow-lg shadow-emerald-500/[0.02] group">
                                                    <CardDescription className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600/40 mb-4 relative z-10 italic">Thesis Match</CardDescription>
                                                    <CardTitle className="text-7xl font-extrabold tracking-tighter text-emerald-700/80 relative z-10 group-hover:scale-110 transition-transform duration-500">
                                                        {enrichment.thesis_match_score}<span className="text-3xl opacity-40">%</span>
                                                    </CardTitle>
                                                    <div className="w-full bg-emerald-200/30 rounded-full h-1.5 mt-8 relative z-10 max-w-[100px] overflow-hidden">
                                                        <div
                                                            className="bg-emerald-500/60 h-full rounded-full"
                                                            style={{ width: `${enrichment.thesis_match_score}%` }}
                                                        />
                                                    </div>
                                                </Card>
                                            </div>

                                            <div className="space-y-8">
                                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/30 flex items-center gap-6 italic">
                                                    Match Rationale
                                                    <div className="h-px flex-1 bg-primary/10" />
                                                </h3>
                                                <p className="text-xl text-foreground/70 leading-relaxed font-semibold italic">
                                                    {enrichment.thesis_explanation}
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-6">
                                                <div className="space-y-10">
                                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/30 italic">Value Propositions</h4>
                                                    <div className="space-y-8">
                                                        {enrichment.what_they_do.map((item, i) => (
                                                            <div key={i} className="flex gap-6 group">
                                                                <div className="mt-2.5 w-2 h-2 rounded-full bg-primary/30 shrink-0 group-hover:bg-primary transition-colors" />
                                                                <span className="text-foreground/80 font-bold text-lg leading-snug tracking-tight italic">{item}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="space-y-10">
                                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/30 italic">Intelligence Signals</h4>
                                                    <div className="grid gap-6">
                                                        {enrichment.signals.map((signal, i) => (
                                                            <div key={i} className="flex items-center gap-6 p-6 rounded-[2rem] bg-white border border-border/40 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/[0.02] transition-all duration-500 group">
                                                                <div className="w-12 h-12 rounded-2xl bg-secondary/30 flex items-center justify-center text-primary/30 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                                                                    <Clock className="w-5 h-5 font-bold" />
                                                                </div>
                                                                <span className="text-base font-bold tracking-tight text-foreground/70 italic">{signal}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="border border-dashed border-primary/20 p-24 rounded-[3.5rem] text-center bg-primary/[0.01] hover:bg-primary/[0.03] transition-all duration-700 group relative overflow-hidden">
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.05),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                            <div className="relative z-10">
                                                <div className="w-24 h-24 rounded-[2rem] bg-white shadow-xl shadow-primary/5 flex items-center justify-center mx-auto mb-10 group-hover:rotate-[10deg] transition-all duration-700 border border-primary/5">
                                                    <Sparkles className="w-10 h-10 text-primary/40 group-hover:text-primary transition-colors duration-700" />
                                                </div>
                                                <h3 className="text-4xl font-extrabold tracking-tighter mb-4 text-foreground/90">Awaiting Synthesis</h3>
                                                <p className="text-muted-foreground/50 max-w-sm mx-auto mb-12 font-medium text-lg leading-relaxed italic">
                                                    Our Intelligence engine has not yet scanned this entity.
                                                    Initiate a deep scan to reveal strategic conviction.
                                                </p>
                                                <Button
                                                    onClick={handleEnrich}
                                                    className="h-16 rounded-[1.5rem] px-16 font-bold uppercase text-[12px] tracking-[0.2em] bg-primary text-white shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 hover:shadow-primary/40"
                                                >
                                                    Initiate Deep Scan
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-16">
                                    {enrichment && (
                                        <Card className="border border-border/40 bg-white shadow-sm rounded-[2.5rem] overflow-hidden p-10 space-y-10 ring-1 ring-border/5">
                                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/20 italic">
                                                Scanned Sources
                                            </h3>
                                            <div className="space-y-10">
                                                {enrichment.sources.map((source, i) => (
                                                    <div key={i} className="space-y-3">
                                                        <a
                                                            href={source.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-lg font-bold text-foreground/80 hover:text-primary transition-colors flex items-center gap-3 group"
                                                        >
                                                            Intelligence Node <ExternalLink className="w-4 h-4 opacity-10 group-hover:opacity-100" />
                                                        </a>
                                                        <p className="text-[10px] text-muted-foreground/30 font-bold uppercase tracking-[0.2em] italic">
                                                            Captured {new Date(source.timestamp).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </Card>
                                    )}

                                    <div className="p-10 border border-border/40 rounded-[2.5rem] space-y-8 bg-white/50 ring-1 ring-border/5">
                                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/20 italic">
                                            Intelligence Tags
                                        </h3>
                                        <div className="flex flex-wrap gap-3">
                                            {enrichment?.keywords.map(word => (
                                                <Badge key={word} variant="secondary" className="bg-secondary/40 hover:bg-primary/10 hover:text-primary text-foreground/50 border-none px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all shadow-sm">
                                                    {word}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="notes" key="notes" asChild className="mt-0 outline-none">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-16"
                        >
                            <div className="md:col-span-2 space-y-8 sm:space-y-12">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-10">
                                    <div>
                                        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">Analyst Intelligence</h3>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 mt-2 italic">Secured Internal Documentation</p>
                                    </div>
                                    <Button size="lg" onClick={() => toast.success('Intelligence committed to ledger')} className="rounded-2xl px-6 sm:px-8 h-12 sm:h-14 bg-primary text-white font-bold uppercase text-[10px] sm:text-[11px] tracking-widest shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all w-full sm:w-auto">
                                        <Save className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" /> Commit Session
                                    </Button>
                                </div>
                                <textarea
                                    className="w-full h-[300px] sm:h-[500px] bg-secondary/[0.02] rounded-2xl sm:rounded-[3rem] p-6 sm:p-16 border border-border focus:border-primary/20 focus:ring-[8px] sm:focus:ring-[12px] focus:ring-primary/5 outline-none transition-all text-lg sm:text-2xl font-medium leading-relaxed resize-none text-foreground placeholder:text-muted-foreground/10 italic shadow-inner"
                                    placeholder="Log proprietary match insights or deal sourcing velocity notes..."
                                    value={noteContent}
                                    onChange={(e) => saveNote(company.id, e.target.value)}
                                />
                            </div>
                            <div className="space-y-10 pt-24">
                                <div className="p-10 bg-secondary/[0.03] rounded-[2.5rem] border border-border/40 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.02] blur-3xl rounded-full" />
                                    <p className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-[0.2em] mb-6 italic">Secure Log Protocol</p>
                                    <p className="text-base text-foreground/50 leading-relaxed font-semibold italic">
                                        "Capture internal conviction, competitive dynamics, and proprietary channel checks."
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="signals" key="signals" asChild className="mt-0 outline-none">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-16"
                        >
                            <div className="md:col-span-2 space-y-16">
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-extrabold tracking-tight text-foreground">Momentum Analytics</h3>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 italic">Historical Intelligence Log</p>
                                </div>

                                <div className="space-y-16 relative before:absolute before:inset-0 before:left-[13.5px] before:w-[2px] before:bg-gradient-to-b before:from-primary/20 before:to-transparent">
                                    {enrichment ? (
                                        enrichment.signals.map((sig, i) => (
                                            <div key={i} className="relative pl-16 group">
                                                <div className="absolute left-0 top-1.5 w-7 h-7 rounded-full border-[6px] border-white bg-primary shadow-lg shadow-primary/20 group-hover:scale-125 transition-transform duration-500" />
                                                <div className="space-y-4">
                                                    <p className="text-[10px] text-primary/40 font-bold uppercase tracking-[0.2em] italic">Intelligence Captured</p>
                                                    <p className="text-xl sm:text-3xl font-bold tracking-tight text-foreground/80 leading-snug sm:leading-tight italic group-hover:text-primary transition-colors duration-500">{sig}</p>
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                                        <Badge variant="outline" className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.1em] text-emerald-600/60 border-emerald-100 bg-emerald-50/50 px-3 sm:px-4 py-1 rounded-full w-max">Score: Validated</Badge>
                                                        <span className="text-[10px] text-muted-foreground/30 font-bold uppercase tracking-[0.2em] italic ml-1 sm:ml-0">Captured Feb 2026</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-24 text-center border border-dashed border-border/40 rounded-[3rem] bg-secondary/[0.01]">
                                            <History className="w-16 h-16 text-muted-foreground/10 mx-auto mb-8" />
                                            <p className="text-muted-foreground/40 font-bold text-xl italic">Initiate intelligence synthesis to unlock momentum analytics.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </TabsContent>
                </AnimatePresence>
            </Tabs>
        </div>
    );
}

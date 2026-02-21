'use client';

import { useStorage } from '@/hooks/use-storage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Play, Trash2, Clock, Filter } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function SavedSearchesPage() {
    const { savedSearches, deleteSearch } = useStorage();

    const handleDelete = (id: string, name: string) => {
        if (confirm(`Delete saved search "${name}"?`)) {
            deleteSearch(id);
            toast.success('Search deleted');
        }
    };

    return (
        <div className="p-16 max-w-7xl mx-auto space-y-16">
            <div className="space-y-4">
                <h1 className="text-5xl font-extrabold tracking-tight text-foreground">
                    Saved Intel
                </h1>
                <p className="text-muted-foreground text-xl font-medium max-w-xl leading-relaxed">
                    One-click access to your target discovery sectors and market monitoring pipelines.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {savedSearches.length === 0 ? (
                    <div className="col-span-full">
                        <div className="border-2 border-dashed border-border/80 p-24 rounded-[3rem] text-center bg-secondary/[0.02]">
                            <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-10">
                                <Search className="w-12 h-12 text-muted-foreground" />
                            </div>
                            <h3 className="text-3xl font-bold tracking-tight mb-4">No Intel Saved</h3>
                            <p className="text-muted-foreground max-w-sm mx-auto mb-12 font-medium text-lg leading-relaxed">
                                Curate your complex discovery pipelines and save them for instant market monitoring.
                            </p>
                            <Button asChild className="h-14 rounded-2xl px-12 font-bold uppercase text-[10px] tracking-widest bg-primary text-white shadow-xl shadow-primary/20">
                                <Link href="/companies">Initialize Search</Link>
                            </Button>
                        </div>
                    </div>
                ) : (
                    savedSearches.map(search => (
                        <Card key={search.id} className="border border-border bg-white group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden rounded-[2.5rem]">
                            <CardHeader className="pb-6 p-10">
                                <div className="flex items-center justify-between mb-8">
                                    <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-widest bg-primary/5 text-primary border-primary/10 px-4 py-1.5 rounded-full">
                                        Pipeline Anchor
                                    </Badge>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(search.id, search.name)}
                                        className="h-10 w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-xl transition-all border border-transparent hover:border-border"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </Button>
                                </div>
                                <CardTitle className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">{search.name}</CardTitle>
                                <CardDescription className="flex items-center gap-2.5 mt-4 font-bold text-[10px] uppercase tracking-widest text-muted-foreground/60">
                                    <Clock className="w-3.5 h-3.5 text-primary/60" /> Captured {new Date(search.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-10 p-10 pt-0">
                                <div className="flex flex-wrap gap-2.5">
                                    {search.query && (
                                        <Badge variant="secondary" className="gap-2 px-4 py-2 bg-secondary/30 border-none rounded-xl text-[10px] font-bold uppercase tracking-widest text-foreground/80">
                                            Focus: <span className="text-primary italic">"{search.query}"</span>
                                        </Badge>
                                    )}
                                    {Object.entries(search.filters).map(([key, value]) => value && (
                                        <Badge key={key} variant="secondary" className="gap-2 px-4 py-2 bg-secondary/30 border-none rounded-xl text-[10px] font-bold uppercase tracking-widest text-foreground/80">
                                            <Filter className="w-3.5 h-3.5 text-primary/40" /> {key}: {value}
                                        </Badge>
                                    ))}
                                </div>
                                <Button className="w-full h-14 gap-3 rounded-2xl font-bold uppercase text-[10px] tracking-widest bg-primary hover:bg-primary/95 text-white shadow-xl shadow-primary/20 transition-all active:scale-95" asChild>
                                    <Link href={`/companies?q=${search.query}${(search.filters.category ? `&category=${search.filters.category}` : '')}${(search.filters.location ? `&location=${search.filters.location}` : '')}`}>
                                        <Play className="w-4 h-4 fill-current" /> Deploy Search
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            <div className="pt-24">
                <div className="flex items-center gap-8 mb-12">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 italic">System Recommendations</h3>
                    <div className="h-px flex-1 bg-border/60" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {[
                        { name: "Web3 Infrastructure", query: "Infrastructure", filters: { location: "USA", stage: "Seed" } },
                        { name: "B2B SaaS Growth", query: "SaaS", filters: { stage: "Series B" } },
                        { name: "Fintech Velocity", query: "Fintech", filters: { sector: "Payments" } }
                    ].map((suggested, i) => (
                        <Card key={i} className="border border-dashed border-border/80 bg-white hover:border-primary/30 transition-all cursor-pointer group rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-primary/[0.02]">
                            <CardHeader className="p-8">
                                <div className="flex items-center justify-between mb-4">
                                    <CardTitle className="text-xl font-bold tracking-tight text-foreground/80 group-hover:text-primary transition-colors">{suggested.name}</CardTitle>
                                    <div className="w-10 h-10 rounded-xl bg-secondary/30 flex items-center justify-center group-hover:bg-primary transition-all">
                                        <Play className="w-4 h-4 text-muted-foreground group-hover:text-white" />
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Badge className="bg-emerald-50/50 text-emerald-700 border-emerald-100/50 px-4 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full">Automated Recommendation</Badge>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

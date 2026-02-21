import { CompaniesTable } from '@/components/companies/companies-table';
import { Button } from '@/components/ui/button';
import { Plus, Download, TrendingUp, Search } from 'lucide-react';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export default function CompaniesPage() {
    return (
        <div className="p-10 max-w-7xl mx-auto space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tight text-foreground">
                        Entity Pipeline
                    </h1>
                    <p className="text-muted-foreground font-bold text-sm uppercase tracking-widest">
                        High-conviction discovery & intelligence.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 h-11 rounded-xl border-border bg-white px-5 font-bold text-xs uppercase tracking-widest hover:bg-secondary">
                        <Download className="w-4 h-4" />
                        Export
                    </Button>
                    <Button className="gap-2 h-11 rounded-xl bg-primary hover:bg-primary/90 px-8 font-bold text-xs uppercase tracking-widest text-white shadow-lg shadow-primary/20">
                        <Plus className="w-4 h-4" />
                        New Entry
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                    <Suspense fallback={<Skeleton className="h-[600px] w-full rounded-2xl bg-secondary/30 border border-border" />}>
                        <CompaniesTable />
                    </Suspense>
                </div>

                <div className="space-y-8">
                    <div className="p-8 rounded-2xl border border-border bg-white shadow-sm relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
                                <Search className="w-4 h-4" /> AI Scout
                            </h3>
                            <p className="text-sm font-semibold leading-relaxed mb-8 text-foreground">
                                <span className="text-primary font-bold">12 entries</span> identified matching your current thesis today.
                            </p>
                            <Button size="sm" className="w-full rounded-xl h-11 font-bold text-xs uppercase tracking-widest bg-secondary text-foreground hover:bg-secondary/80 transition-all border border-border">Review Matches</Button>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="flex items-center gap-3">
                            <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Trending Spheres</h4>
                            <div className="h-px flex-1 bg-border" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['GenAI', 'Quantum', 'Fusion', 'Biotech', 'SaaS 2.0'].map(tag => (
                                <Button key={tag} variant="secondary" size="sm" className="rounded-lg h-8 px-4 text-[10px] font-bold uppercase tracking-widest border border-border hover:bg-primary hover:text-white transition-all">
                                    {tag}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <Card className="border-border bg-white p-8 shadow-sm rounded-2xl">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">Network Velocity</p>
                        <div className="flex items-baseline justify-between">
                            <p className="text-3xl font-black tracking-tight text-foreground">98.4%</p>
                            <div className="flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                                <TrendingUp className="w-3.5 h-3.5" /> +2.1%
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

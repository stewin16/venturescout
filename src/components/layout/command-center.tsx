'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
    Search,
    Building2,
    ListTodo,
    TrendingUp,
    Zap,
    Command,
    X,
    ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import companiesData from '@/data/companies.json';
import { Company } from '@/types';

export function CommandCenter() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const router = useRouter();
    const companies = companiesData as Company[];

    const toggle = useCallback(() => setOpen((o) => !o), []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggle();
            }
            if (e.key === 'Escape') {
                setOpen(false);
            }
        };

        window.addEventListener('keydown', down);
        return () => window.removeEventListener('keydown', down);
    }, [toggle]);

    const results = query === ''
        ? []
        : companies.filter(c =>
            c.name.toLowerCase().includes(query.toLowerCase()) ||
            c.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);

    const handleSelect = (path: string) => {
        router.push(path);
        setOpen(false);
        setQuery('');
    };

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-secondary/20 backdrop-blur-xl"
                        onClick={() => setOpen(false)}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-2xl bg-white border border-border shadow-[0_32px_128px_-16px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden"
                    >
                        <div className="p-4 border-b border-border flex items-center gap-4 bg-secondary/[0.02]">
                            <Search className="w-6 h-6 text-primary ml-4" />
                            <input
                                autoFocus
                                className="flex-1 bg-transparent border-none focus:ring-0 text-xl font-semibold placeholder-muted-foreground/30 h-16 outline-none"
                                placeholder="Search entities, stacks, or sectors..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <div className="flex items-center gap-2 mr-4">
                                <kbd className="hidden sm:inline-flex h-8 select-none items-center gap-1 rounded border border-border bg-secondary/10 px-2 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                    ESC
                                </kbd>
                                <button onClick={() => setOpen(false)} className="p-2 hover:bg-secondary rounded-xl transition-colors">
                                    <X className="w-5 h-5 text-muted-foreground/40" />
                                </button>
                            </div>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto p-4 scrollbar-hide">
                            {results.length > 0 ? (
                                <div className="space-y-2">
                                    <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 py-2">Suggested Entities</p>
                                    {results.map((c) => (
                                        <button
                                            key={c.id}
                                            onClick={() => handleSelect(`/companies/${c.id}`)}
                                            className="w-full flex items-center justify-between p-4 rounded-3xl hover:bg-primary/[0.03] group transition-all text-left border border-transparent hover:border-primary/10"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-secondary/[0.05] flex items-center justify-center text-primary font-bold group-hover:bg-primary group-hover:text-white transition-all">
                                                    {c.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{c.name}</p>
                                                    <p className="text-sm font-medium text-muted-foreground">{c.category} • {c.location}</p>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
                                        </button>
                                    ))}
                                </div>
                            ) : query === '' ? (
                                <div className="grid grid-cols-2 gap-4">
                                    <QuickAction
                                        icon={<Building2 className="w-6 h-6" />}
                                        label="Pipeline Nodes"
                                        desc="Browse all tracked entities"
                                        onClick={() => handleSelect('/companies')}
                                    />
                                    <QuickAction
                                        icon={<ListTodo className="w-6 h-6" />}
                                        label="Intelligence Stacks"
                                        desc="Manage thematic lists"
                                        onClick={() => handleSelect('/lists')}
                                    />
                                    <QuickAction
                                        icon={<TrendingUp className="w-6 h-6" />}
                                        label="Growth Vectors"
                                        desc="View high-momentum signals"
                                        onClick={() => handleSelect('/')}
                                    />
                                    <QuickAction
                                        icon={<Zap className="w-6 h-6" />}
                                        label="Signal Alerts"
                                        desc="Recent intelligence events"
                                        onClick={() => handleSelect('/saved')}
                                    />
                                </div>
                            ) : (
                                <div className="py-20 text-center">
                                    <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                                        <Search className="w-8 h-8 text-muted-foreground/30" />
                                    </div>
                                    <p className="text-xl font-bold text-foreground">No intelligence match</p>
                                    <p className="text-muted-foreground font-medium">Try searching for sectors or alternate entity names.</p>
                                </div>
                            )}
                        </div>

                        <div className="p-6 bg-secondary/[0.02] border-t border-border flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <kbd className="h-6 w-6 flex items-center justify-center rounded border border-border bg-white font-mono text-[10px] font-bold text-muted-foreground shadow-sm">↓</kbd>
                                    <kbd className="h-6 w-6 flex items-center justify-center rounded border border-border bg-white font-mono text-[10px] font-bold text-muted-foreground shadow-sm">↑</kbd>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Navigate</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <kbd className="h-6 w-10 flex items-center justify-center rounded border border-border bg-white font-mono text-[10px] font-bold text-muted-foreground shadow-sm">↵</kbd>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Select</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 opacity-40 grayscale">
                                <Command className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest leading-none mt-0.5">Scout Core Interface</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function QuickAction({ icon, label, desc, onClick }: { icon: React.ReactNode, label: string, desc: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-start p-6 rounded-[2rem] bg-secondary/[0.03] border border-border hover:border-primary/20 hover:bg-primary/[0.02] transition-all group text-left"
        >
            <div className="p-3 rounded-2xl bg-white shadow-sm border border-border group-hover:scale-110 group-hover:text-primary transition-all mb-4">
                {icon}
            </div>
            <p className="font-bold text-lg text-foreground mb-1">{label}</p>
            <p className="text-sm font-medium text-muted-foreground leading-relaxed">{desc}</p>
        </button>
    );
}

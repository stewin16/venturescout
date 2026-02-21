'use client';

import { Search, Bell, User, Settings2, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStorage } from '@/hooks/use-storage';
import { useNav } from './responsive-layout';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";

export function Header() {
    const [query, setQuery] = useState('');
    const { thesis, saveThesis } = useStorage();
    const [tempThesis, setTempThesis] = useState(thesis);
    const router = useRouter();

    const handleSearch = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && query.trim()) {
            router.push(`/companies?q=${encodeURIComponent(query)}`);
            setQuery('');
        }
    };

    const handleSaveThesis = () => {
        saveThesis(tempThesis);
        toast.success('Focus framework updated');
    };

    const { toggle } = useNav();

    return (
        <header className="h-20 border-b border-border bg-white sticky top-0 z-50 flex items-center justify-between px-6 lg:px-10 shadow-sm">
            <div className="flex items-center flex-1 max-w-xl gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggle}
                    className="lg:hidden rounded-xl h-10 w-10 hover:bg-secondary shrink-0"
                >
                    <Menu className="w-5 h-5" />
                </Button>
                <div className="relative group flex-1">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 transition-colors group-focus-within:text-primary" />
                    <Input
                        placeholder="Search entities or pipelines..."
                        className="pl-12 bg-secondary/20 border-border hover:bg-secondary/40 focus-visible:ring-primary/20 h-11 rounded-2xl transition-all text-sm font-medium"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 lg:gap-6">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="gap-2.5 h-11 rounded-2xl border-border bg-white hover:bg-secondary px-3 lg:px-6 transition-all shadow-sm">
                            <Settings2 className="w-4 h-4 text-primary/60" />
                            <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-[0.15em]">Focus Framework</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px] bg-white border-border shadow-2xl rounded-[2.5rem] p-0 overflow-hidden">
                        <DialogHeader className="p-10 pb-6 bg-secondary/[0.03]">
                            <DialogTitle className="text-3xl font-extrabold tracking-tight">Investment Thesis</DialogTitle>
                            <DialogDescription className="text-lg font-medium text-muted-foreground pt-2">
                                Define your strategic target profile to direct the AI analysis engine.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="px-10 py-8">
                            <textarea
                                className="w-full h-64 bg-secondary/[0.03] rounded-3xl p-8 text-lg font-medium border border-border focus:border-primary/30 focus:ring-4 focus:ring-primary/5 outline-none transition-all resize-none italic text-foreground placeholder-muted-foreground/20"
                                value={tempThesis}
                                onChange={(e) => setTempThesis(e.target.value)}
                                placeholder="e.g. Early-stage Fintech infrastructure in emerging markets with strong founding teams..."
                            />
                        </div>
                        <DialogFooter className="px-10 py-8 bg-secondary/[0.02] border-t border-border flex sm:justify-between items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest leading-none">Analyst Authorized</p>
                            </div>
                            <Button type="submit" onClick={handleSaveThesis} className="rounded-2xl px-10 h-12 font-bold text-[10px] uppercase tracking-widest bg-primary text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">Update Framework</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Button variant="ghost" size="icon" className="relative text-muted-foreground/60 hover:text-primary transition-all rounded-2xl h-11 w-11 hover:bg-primary/5">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
                </Button>

                <div className="h-8 w-px bg-border/60 mx-2"></div>

                <div className="flex items-center gap-4 p-1.5 pr-6 rounded-2xl bg-secondary/[0.05] border border-border/60 hover:border-primary/20 transition-all cursor-pointer group">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-bold text-xs text-white shadow-lg shadow-primary/20">
                        MV
                    </div>
                    <div className="text-left hidden lg:block">
                        <p className="text-[11px] font-bold leading-tight text-foreground">Mathias V.</p>
                        <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">Principal Scout</p>
                    </div>
                </div>
            </div>
        </header>
    );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    Building2,
    ListTodo,
    Search,
    LayoutDashboard,
    TrendingUp,
    Menu,
    Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
    { name: 'Overview', href: '/', icon: LayoutDashboard },
    { name: 'Companies', href: '/companies', icon: Building2 },
    { name: 'Lists', href: '/lists', icon: ListTodo },
    { name: 'Saved Searches', href: '/saved', icon: Search },
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col w-full h-full border-r border-border bg-white">
            <div className="p-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20">
                        <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <span className="font-extrabold text-lg tracking-tight block text-foreground leading-none">VentureScout</span>
                        <span className="text-[9px] text-primary font-bold uppercase tracking-[0.2em] mt-1 block">Intelligence</span>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="lg:hidden rounded-xl h-10 w-10 hover:bg-secondary"
                >
                    <Menu className="w-5 h-5" />
                </Button>
            </div>

            <nav className="flex-1 px-6 space-y-2 mt-4">
                {navigation.map((item) => {
                    const isActive = item.href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={onClose}
                            className={cn(
                                "flex items-center gap-3.5 px-5 py-3.5 rounded-2xl transition-all duration-300 group relative",
                                isActive
                                    ? "bg-primary/5 text-primary font-bold shadow-sm"
                                    : "text-muted-foreground/70 hover:bg-secondary/50 hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn(
                                "w-5 h-5 transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground/60 group-hover:text-foreground"
                            )} />
                            <span className="text-sm font-semibold tracking-tight">{item.name}</span>
                            {isActive && (
                                <div className="absolute right-6 w-1 h-6 bg-primary rounded-full shadow-[0_0_12px_rgba(37,99,235,0.4)]" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-8 space-y-6">
                <div className="p-6 rounded-[2rem] border border-primary/10 bg-primary/[0.03] group hover:bg-white hover:shadow-2xl hover:shadow-primary/[0.05] transition-all cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/80">AI Status</span>
                    </div>
                    <p className="font-extrabold text-sm text-foreground">Gemini 2.5 Flash</p>
                    <p className="text-[10px] text-muted-foreground/50 font-medium">Ready for synthesis</p>
                </div>

                <div className="p-6 rounded-[2rem] border border-border bg-secondary/[0.03]">
                    <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-4">
                        Scout Velocity
                    </p>
                    <div className="w-full bg-secondary/30 rounded-full h-1.5 mb-4 overflow-hidden">
                        <div className="bg-primary/80 h-full rounded-full w-3/4 shadow-sm"></div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold tracking-tight">
                        <span className="text-foreground/60">75 / 100 <span className="text-muted-foreground/40 font-medium ml-1">Credits</span></span>
                        <Button variant="link" className="p-0 h-auto text-primary text-[10px] font-extrabold uppercase tracking-widest hover:no-underline hover:text-primary/80 transition-colors">
                            Refill
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

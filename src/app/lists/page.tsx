'use client';

import { useStorage } from '@/hooks/use-storage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ListTodo, Plus, Download, Trash2, ArrowRight } from 'lucide-react';
import companiesData from '@/data/companies.json';
import { Company } from '@/types';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ListsPage() {
    const { lists, createList, setLists, removeCompanyFromList } = useStorage();
    const companies = companiesData as Company[];

    const handleExportCSV = (listId: string) => {
        const list = lists.find(l => l.id === listId);
        if (!list) return;

        const listCompanies = companies.filter(c => list.companyIds.includes(c.id));
        const headers = ['Name', 'Website', 'Category', 'Location', 'Description'];
        const rows = listCompanies.map(c => [
            `"${c.name}"`, `"${c.website}"`, `"${c.category}"`, `"${c.location}"`, `"${c.description.replace(/"/g, '""')}"`
        ]);

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `${list.name.toLowerCase().replace(/\s+/g, '_')}_export.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('List exported to CSV');
    };

    const handleExportJSON = (listId: string) => {
        const list = lists.find(l => l.id === listId);
        if (!list) return;

        const listCompanies = companies.filter(c => list.companyIds.includes(c.id));
        const data = {
            listName: list.name,
            exportedAt: new Date().toISOString(),
            companies: listCompanies
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `${list.name.toLowerCase().replace(/\s+/g, '_')}_export.json`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('List exported to JSON');
    };

    const handleCreateList = () => {
        const name = window.prompt('Enter stack name:');
        if (name) {
            createList(name);
            toast.success('Focus stack created');
        }
    };

    const deleteList = (id: string) => {
        if (confirm('Permanently decommission this stack?')) {
            setLists(lists.filter(l => l.id !== id));
            toast.success('Stack decommissioned');
        }
    };

    return (
        <div className="p-16 max-w-7xl mx-auto space-y-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div className="space-y-4">
                    <h1 className="text-5xl font-extrabold tracking-tight text-foreground">
                        Intelligence Portfolios
                    </h1>
                    <p className="text-muted-foreground text-xl font-medium max-w-xl leading-relaxed">
                        Curated intelligence stacks for focused scouting across your strategic focus sectors.
                    </p>
                </div>
                <Button className="gap-3 h-14 rounded-2xl px-10 bg-primary hover:bg-primary/95 text-white font-bold uppercase text-[11px] tracking-[0.2em] shadow-xl shadow-primary/20 transition-all active:scale-95 shrink-0" onClick={handleCreateList}>
                    <Plus className="w-5 h-5" />
                    New Focus Stack
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-16">
                {lists.length === 0 ? (
                    <div className="relative overflow-hidden p-24 rounded-[3rem] text-center bg-white border border-border shadow-2xl shadow-primary/[0.02]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.03] blur-[100px] rounded-full" />
                        <div className="relative z-10">
                            <div className="w-24 h-24 rounded-[2rem] bg-secondary/30 flex items-center justify-center mx-auto mb-10 group-hover:rotate-12 transition-transform duration-700">
                                <ListTodo className="w-12 h-12 text-primary/40" />
                            </div>
                            <h3 className="text-4xl font-extrabold tracking-tighter mb-4 text-foreground/90">Awaiting Conviction</h3>
                            <p className="text-muted-foreground/60 max-w-sm mx-auto mb-12 font-medium text-lg leading-relaxed">
                                You haven't initialized any intelligence stacks. Start curating high-conviction startups to begin tracking.
                            </p>
                            <Button onClick={handleCreateList} className="h-16 rounded-[1.5rem] px-16 font-bold uppercase text-[12px] tracking-[0.2em] bg-primary text-white shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95">Initialize First Stack</Button>
                        </div>
                    </div>
                ) : (
                    lists.map(list => {
                        const listCompanies = companies.filter(c => list.companyIds.includes(c.id));
                        return (
                            <div key={list.id} className="group overflow-hidden border border-border bg-white shadow-sm rounded-[2.5rem] transition-all hover:shadow-xl hover:shadow-primary/[0.02]">
                                <div className="flex flex-col md:flex-row items-center justify-between border-b border-border bg-secondary/[0.02] p-10 gap-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-6">
                                            <h2 className="text-3xl font-bold tracking-tight text-foreground">{list.name}</h2>
                                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full">
                                                {list.companyIds.length} Entities
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-3 text-[10px] uppercase font-bold text-muted-foreground/60 tracking-widest">
                                            <span className="flex items-center gap-2">
                                                Created {new Date(list.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Button variant="outline" size="sm" onClick={() => handleExportCSV(list.id)} className="gap-2.5 border-border bg-white rounded-xl h-11 px-6 font-bold text-[10px] uppercase tracking-widest transition-all hover:bg-secondary shadow-sm">
                                            <Download className="w-4 h-4 text-primary/60" /> Export CSV
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleExportJSON(list.id)} className="gap-2.5 border-border bg-white rounded-xl h-11 px-6 font-bold text-[10px] uppercase tracking-widest transition-all hover:bg-secondary shadow-sm">
                                            <Download className="w-4 h-4 text-primary/60" /> Export JSON
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => deleteList(list.id)} className="text-muted-foreground hover:text-destructive hover:bg-destructive/5 h-11 w-11 rounded-xl transition-all border border-transparent hover:border-destructive/10">
                                            <Trash2 className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-secondary/10 border-b border-border hover:bg-secondary/10">
                                                <TableHead className="pl-10 h-16 font-bold uppercase text-[10px] tracking-[0.2em] text-muted-foreground/70">Entity Portfolio</TableHead>
                                                <TableHead className="h-16 font-bold uppercase text-[10px] tracking-[0.2em] text-muted-foreground/70">Sector</TableHead>
                                                <TableHead className="h-16 font-bold uppercase text-[10px] tracking-[0.2em] text-muted-foreground/70">Location</TableHead>
                                                <TableHead className="text-right pr-10 h-16 font-bold uppercase text-[10px] tracking-[0.2em] text-muted-foreground/70">Analytics</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {listCompanies.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={4} className="h-64 text-center">
                                                        <p className="text-muted-foreground font-medium text-lg leading-relaxed opacity-40">No entities discovered in this stack yet.</p>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                listCompanies.map(c => (
                                                    <TableRow key={c.id} className="group/row hover:bg-primary/[0.01] border-b border-border last:border-0 transition-colors">
                                                        <TableCell className="font-bold text-lg pl-10 py-8 text-foreground group-hover/row:text-primary transition-colors tracking-tight">{c.name}</TableCell>
                                                        <TableCell>
                                                            <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest bg-emerald-50/50 text-emerald-700 border-emerald-100/50 px-4 py-1.5 rounded-xl">
                                                                {c.category}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-foreground/60 font-medium text-base tracking-tight">{c.location}</TableCell>
                                                        <TableCell className="text-right pr-10">
                                                            <div className="flex justify-end gap-3">
                                                                <Button variant="outline" size="icon" asChild className="h-11 w-11 rounded-2xl border-border bg-white hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm group/btn">
                                                                    <Link href={`/companies/${c.id}`}>
                                                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-0.5 transition-transform" />
                                                                    </Link>
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-11 w-11 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-2xl transition-all border border-transparent hover:border-border"
                                                                    onClick={() => {
                                                                        if (confirm(`Remove ${c.name} from this stack?`)) {
                                                                            removeCompanyFromList(list.id, c.id);
                                                                            toast.success(`Removed ${c.name} from ${list.name}`);
                                                                        }
                                                                    }}
                                                                >
                                                                    <Trash2 className="w-5 h-5" />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

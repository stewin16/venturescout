'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUpRight, Search, MapPin, ExternalLink } from 'lucide-react';
import { Company } from '@/types';
import companiesData from '@/data/companies.json';
import { useStorage } from '@/hooks/use-storage';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CompaniesTable() {
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get('q') || '';

    const [search, setSearch] = useState(initialSearch);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [sortKey, setSortKey] = useState<keyof Company | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    const { saveSearch } = useStorage();
    const companies = companiesData as Company[];

    const categories = Array.from(new Set(companies.map(c => c.category)));
    const locations = Array.from(new Set(companies.map(c => c.location)));

    const handleSort = (key: keyof Company) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
        setCurrentPage(1);
    };

    const handleSaveSearch = () => {
        if (!search && !selectedCategory && !selectedLocation) {
            toast.error('Enter a search term or select a filter first');
            return;
        }
        const name = window.prompt('Enter a name for this search:');
        if (name) {
            saveSearch({
                id: Math.random().toString(36).substr(2, 9),
                name,
                query: search,
                filters: {
                    category: selectedCategory,
                    location: selectedLocation
                },
                createdAt: new Date().toISOString()
            });
            toast.success('Search filter saved');
        }
    };

    const filteredCompanies = companies.filter(c => {
        const matchesSearch = search === '' ||
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.category.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase());

        const matchesCategory = !selectedCategory || c.category === selectedCategory;
        const matchesLocation = !selectedLocation || c.location === selectedLocation;

        return matchesSearch && matchesCategory && matchesLocation;
    });

    const sortedCompanies = [...filteredCompanies].sort((a, b) => {
        if (!sortKey) return 0;
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    const paginatedCompanies = sortedCompanies.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const totalPages = Math.ceil(sortedCompanies.length / pageSize);

    return (
        <div className="p-4 sm:p-8 lg:p-16 max-w-7xl mx-auto space-y-8 sm:space-y-16">
            <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-6 sm:gap-10">
                <div className="relative flex-1 w-full max-w-lg group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Filter strategic entities..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="pl-12 bg-white border-border/60 h-14 rounded-2xl text-base font-medium shadow-sm focus-visible:ring-primary/10 transition-all placeholder:text-muted-foreground/30"
                    />
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <Button variant="outline" size="lg" onClick={handleSaveSearch} className="gap-2.5 h-14 border-border/80 rounded-2xl bg-white px-8 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-secondary transition-all">
                        <Filter className="w-4 h-4 text-primary/60" /> Save View
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="lg" className="gap-2.5 h-14 border-border/80 rounded-2xl bg-white px-8 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-secondary transition-all">
                                {selectedCategory || 'Sector'} <ChevronDown className="w-4 h-4 opacity-30" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64 bg-white border-border shadow-2xl rounded-2xl p-2 mt-4 overflow-hidden">
                            <DropdownMenuCheckboxItem
                                checked={selectedCategory === null}
                                onCheckedChange={() => {
                                    setSelectedCategory(null);
                                    setCurrentPage(1);
                                }}
                                className="rounded-xl h-12 px-5 font-semibold text-sm cursor-pointer"
                            >
                                All Sectors
                            </DropdownMenuCheckboxItem>
                            {categories.map(cat => (
                                <DropdownMenuCheckboxItem
                                    key={cat}
                                    checked={selectedCategory === cat}
                                    onCheckedChange={() => {
                                        setSelectedCategory(cat);
                                        setCurrentPage(1);
                                    }}
                                    className="rounded-xl h-12 px-5 font-semibold text-sm cursor-pointer"
                                >
                                    {cat}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="lg" className="gap-2.5 h-14 border-border/80 rounded-2xl bg-white px-8 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-secondary transition-all">
                                {selectedLocation || 'Geography'} <ChevronDown className="w-4 h-4 opacity-30" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64 bg-white border-border shadow-2xl rounded-2xl p-2 mt-4 overflow-hidden">
                            <DropdownMenuCheckboxItem
                                checked={selectedLocation === null}
                                onCheckedChange={() => {
                                    setSelectedLocation(null);
                                    setCurrentPage(1);
                                }}
                                className="rounded-xl h-12 px-5 font-semibold text-sm cursor-pointer"
                            >
                                All Regions
                            </DropdownMenuCheckboxItem>
                            {locations.map(loc => (
                                <DropdownMenuCheckboxItem
                                    key={loc}
                                    checked={selectedLocation === loc}
                                    onCheckedChange={() => {
                                        setSelectedLocation(loc);
                                        setCurrentPage(1);
                                    }}
                                    className="rounded-xl h-12 px-5 font-semibold text-sm cursor-pointer"
                                >
                                    {loc}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="rounded-2xl sm:rounded-[3rem] border border-border/60 bg-white overflow-hidden shadow-sm ring-1 ring-border/20">
                <div className="overflow-x-auto scrollbar-hide">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-secondary/5 hover:bg-secondary/5 border-b border-border/40">
                                <TableHead className="w-[360px] h-20 cursor-pointer hover:text-primary transition-colors font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50" onClick={() => handleSort('name')}>
                                    <div className="flex items-center gap-2 pl-10">
                                        Strategic Entity {sortKey === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </div>
                                </TableHead>
                                <TableHead className="h-20 cursor-pointer hover:text-primary transition-colors font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50" onClick={() => handleSort('category')}>
                                    <div className="flex items-center gap-2">
                                        Sector {sortKey === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </div>
                                </TableHead>
                                <TableHead className="h-20 cursor-pointer hover:text-primary transition-colors font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50" onClick={() => handleSort('location')}>
                                    <div className="flex items-center gap-2">
                                        HQ {sortKey === 'location' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </div>
                                </TableHead>
                                <TableHead className="h-20 text-center font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50">Conviction</TableHead>
                                <TableHead className="h-20 text-right pr-10 font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50">Dossier</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence mode="popLayout">
                                {paginatedCompanies.map((company, index) => (
                                    <motion.tr
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{
                                            duration: 0.4,
                                            delay: index * 0.05,
                                            ease: "easeOut"
                                        }}
                                        key={company.id}
                                        className="group hover:bg-primary/[0.01] transition-all duration-500 border-b border-border/40 last:border-0 hover:translate-x-1 active:scale-[0.99] cursor-pointer"
                                    >
                                        <TableCell className="py-10 pl-10">
                                            <Link href={`/companies/${company.id}`} className="flex items-center gap-6">
                                                <div className="w-14 h-14 rounded-2xl bg-secondary/30 flex items-center justify-center font-extrabold text-xl text-primary border border-border/50 transition-all group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20">
                                                    {company.name[0]}
                                                </div>
                                                <div>
                                                    <p className="font-extrabold text-lg text-foreground group-hover:text-primary transition-colors tracking-tight">{company.name}</p>
                                                    <p className="text-[11px] text-muted-foreground/60 font-medium uppercase tracking-[0.1em] mt-1 italic">
                                                        {company.website.replace('https://', '').replace(/\/$/, '')}
                                                    </p>
                                                </div>
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-secondary/[0.03] border-border/50 text-[10px] font-bold uppercase tracking-widest px-5 py-2 rounded-full text-foreground/60">
                                                {company.category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3 text-foreground/80 text-sm font-semibold tracking-tight">
                                                <MapPin className="w-4 h-4 text-primary/30" />
                                                {company.location}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col items-center gap-4 w-32 mx-auto">
                                                <div className="w-full h-1.5 bg-secondary/40 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary/60 group-hover:bg-primary transition-all duration-500"
                                                        style={{ width: `${60 + (parseInt(company.id) * 3) % 40}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-[10px] font-bold text-primary/60 tracking-[0.2em] uppercase">
                                                    {60 + (parseInt(company.id) * 3) % 40}% Match
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-10">
                                            <div className="flex justify-end gap-3">
                                                <Button variant="ghost" size="icon" asChild className="h-11 w-11 rounded-full hover:bg-secondary text-muted-foreground/40 hover:text-foreground transition-all border border-transparent hover:border-border/60">
                                                    <a href={company.website} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="w-4.5 h-4.5" />
                                                    </a>
                                                </Button>
                                                <Button variant="ghost" size="icon" asChild className="h-11 w-11 rounded-full hover:bg-primary/5 text-muted-foreground/40 hover:text-primary transition-all border border-transparent hover:border-primary/20">
                                                    <Link href={`/companies/${company.id}`}>
                                                        <ArrowUpRight className="w-5 h-5" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-10 px-6">
                <p className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em] italic text-center sm:text-left">
                    Scanned <span className="text-foreground/60">{(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, sortedCompanies.length)}</span> of <span className="text-foreground/60">{sortedCompanies.length}</span> Entities
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-6 w-full sm:w-auto">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="rounded-2xl h-14 font-bold uppercase text-[10px] tracking-widest px-10 shadow-sm transition-all w-full sm:w-auto"
                    >
                        Previous
                    </Button>
                    <div className="flex gap-3 justify-center">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={cn(
                                    "w-12 h-12 sm:w-14 sm:h-14 rounded-full text-[11px] font-bold transition-all border shadow-sm",
                                    currentPage === i + 1
                                        ? "bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-110"
                                        : "bg-white border-border/60 text-muted-foreground/40 hover:bg-secondary hover:border-border hover:text-foreground"
                                )}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="rounded-2xl h-14 font-bold uppercase text-[10px] tracking-widest px-10 shadow-sm transition-all w-full sm:w-auto"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}

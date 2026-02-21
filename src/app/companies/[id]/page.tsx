'use client';

import { use } from 'react';
import { CompanyProfile } from '@/components/companies/company-profile';
import companiesData from '@/data/companies.json';
import { Company } from '@/types';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function CompanyDetailPage({ params }: PageProps) {
    const { id } = use(params);
    const company = (companiesData as Company[]).find((c) => c.id === id);

    if (!company) {
        notFound();
    }

    return (
        <div className="p-10 max-w-7xl mx-auto space-y-10">
            <div className="flex items-center gap-6 p-6 glass-card border-white/5 rounded-[2rem] bg-gradient-to-r from-white/[0.02] to-transparent">
                <Button variant="ghost" size="icon" asChild className="rounded-xl h-12 w-12 bg-white/5 hover:bg-primary hover:text-primary-foreground transition-all shadow-lg hover:rotate-[-5deg]">
                    <Link href="/companies">
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                </Button>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] italic">Pipeline / Entities / Detail</h2>
                    </div>
                    <h1 className="text-2xl font-black tracking-tighter text-foreground italic uppercase">{company.name} <span className="text-muted-foreground/30 ml-2">Dossier</span></h1>
                </div>
            </div>

            <div className="relative">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] pointer-events-none" />
                <CompanyProfile company={company} />
            </div>
        </div>
    );
}

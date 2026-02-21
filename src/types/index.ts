export interface Company {
    id: string;
    name: string;
    website: string;
    category: string;
    location: string;
    description: string;
}

export interface EnrichmentResult {
    summary: string;
    what_they_do: string[];
    keywords: string[];
    signals: string[];
    sources: {
        url: string;
        timestamp: string;
    }[];
    thesis_match_score: number;
    thesis_explanation: string;
    enrichedAt: string;
}

export interface CompanyNote {
    companyId: string;
    content: string;
    updatedAt: string;
}

export interface CompanyList {
    id: string;
    name: string;
    companyIds: string[];
    createdAt: string;
}

export interface SavedSearch {
    id: string;
    name: string;
    query: string;
    filters: Record<string, any>;
    createdAt: string;
}

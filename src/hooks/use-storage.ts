'use client';

import { useState, useEffect } from 'react';
import { CompanyList, CompanyNote, SavedSearch, EnrichmentResult } from '@/types';

export function useStorage() {
    const [lists, setLists] = useState<CompanyList[]>([]);
    const [notes, setNotes] = useState<Record<string, string>>({});
    const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
    const [enrichmentCache, setEnrichmentCache] = useState<Record<string, EnrichmentResult>>({});
    const [thesis, setThesis] = useState<string>("Early-stage AI infrastructure and developer tools with strong technical moats.");

    useEffect(() => {
        const storedLists = localStorage.getItem('vc_lists');
        const storedNotes = localStorage.getItem('vc_notes');
        const storedSearches = localStorage.getItem('vc_searches');
        const storedEnrichment = localStorage.getItem('vc_enrichment');
        const storedThesis = localStorage.getItem('vc_thesis');

        if (storedLists) setLists(JSON.parse(storedLists));
        if (storedNotes) setNotes(JSON.parse(storedNotes));
        if (storedSearches) setSavedSearches(JSON.parse(storedSearches));
        if (storedEnrichment) setEnrichmentCache(JSON.parse(storedEnrichment));
        if (storedThesis) setThesis(storedThesis);
    }, []);

    const saveLists = (newLists: CompanyList[]) => {
        setLists(newLists);
        localStorage.setItem('vc_lists', JSON.stringify(newLists));
    };

    const saveNote = (companyId: string, content: string) => {
        const newNotes = { ...notes, [companyId]: content };
        setNotes(newNotes);
        localStorage.setItem('vc_notes', JSON.stringify(newNotes));
    };

    const saveSearch = (search: SavedSearch) => {
        const newSearches = [...savedSearches, search];
        setSavedSearches(newSearches);
        localStorage.setItem('vc_searches', JSON.stringify(newSearches));
    };

    const deleteSearch = (id: string) => {
        const newSearches = savedSearches.filter(s => s.id !== id);
        setSavedSearches(newSearches);
        localStorage.setItem('vc_searches', JSON.stringify(newSearches));
    };

    const cacheEnrichment = (companyId: string, data: EnrichmentResult) => {
        const newCache = { ...enrichmentCache, [companyId]: data };
        setEnrichmentCache(newCache);
        localStorage.setItem('vc_enrichment', JSON.stringify(newCache));
    };

    const saveThesis = (newThesis: string) => {
        setThesis(newThesis);
        localStorage.setItem('vc_thesis', newThesis);
    };

    const addCompanyToList = (listId: string, companyId: string) => {
        const newLists = lists.map(list => {
            if (list.id === listId && !list.companyIds.includes(companyId)) {
                return { ...list, companyIds: [...list.companyIds, companyId] };
            }
            return list;
        });
        saveLists(newLists);
    };

    const removeCompanyFromList = (listId: string, companyId: string) => {
        const newLists = lists.map(list => {
            if (list.id === listId) {
                return { ...list, companyIds: list.companyIds.filter(id => id !== companyId) };
            }
            return list;
        });
        saveLists(newLists);
    };

    const createList = (name: string) => {
        const newList: CompanyList = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            companyIds: [],
            createdAt: new Date().toISOString(),
        };
        saveLists([...lists, newList]);
        return newList;
    };

    const createListAndAddCompany = (name: string, companyId: string) => {
        const newList = createList(name);
        addCompanyToList(newList.id, companyId);
    };

    return {
        lists,
        notes,
        savedSearches,
        enrichmentCache,
        thesis,
        saveNote,
        saveSearch,
        cacheEnrichment,
        saveThesis,
        createList,
        createListAndAddCompany,
        addCompanyToList,
        removeCompanyFromList,
        deleteSearch,
        setLists: saveLists,
    };
}

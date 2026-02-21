'use client';

import { useState, createContext, useContext } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { CommandCenter } from './command-center';

const NavContext = createContext<{
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    toggle: () => void;
}>({
    isOpen: false,
    setIsOpen: () => { },
    toggle: () => { },
});

export const useNav = () => useContext(NavContext);

export function ResponsiveLayout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <NavContext.Provider value={{ isOpen, setIsOpen, toggle }}>
            <div className="flex h-screen overflow-hidden relative bg-background">
                {/* Sidebar Overlay for Mobile */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300"
                        onClick={() => setIsOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <div className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
                    <Sidebar onClose={() => setIsOpen(false)} />
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0 relative z-10">
                    <Header />
                    <CommandCenter />
                    <main className="flex-1 overflow-y-auto scrollbar-hide">
                        {children}
                    </main>
                </div>
            </div>
        </NavContext.Provider>
    );
}

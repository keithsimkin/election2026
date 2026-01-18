import { useState, useEffect, useRef } from "react";
import { Search, X, MapPin, User, Building2 } from "lucide-react";
import {
    presidentialCandidates,
    districts,
    constituencyResults,
    type Candidate,
    type District,
    type ConstituencyResult,
} from "@/data/electionData";

type SearchResultType = "candidate" | "district" | "constituency";

interface SearchResult {
    id: string;
    type: SearchResultType;
    title: string;
    subtitle: string;
    party?: string;
    partyColor?: string;
    data: Candidate | District | ConstituencyResult;
}

interface SearchBarProps {
    onCandidateSelect: (candidateId: string) => void;
    onDistrictSelect: (districtId: string) => void;
    onConstituencySelect: (constituencyId: string) => void;
    onRegionSelect: (regionId: string) => void;
}

export function SearchBar({
    onCandidateSelect,
    onDistrictSelect,
    onConstituencySelect,
    onRegionSelect,
}: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Search logic
    useEffect(() => {
        if (query.trim().length < 2) {
            setResults([]);
            return;
        }

        const searchQuery = query.toLowerCase();
        const searchResults: SearchResult[] = [];

        // Search presidential candidates
        presidentialCandidates.forEach((candidate) => {
            if (
                candidate.name.toLowerCase().includes(searchQuery) ||
                candidate.party.toLowerCase().includes(searchQuery)
            ) {
                searchResults.push({
                    id: candidate.id,
                    type: "candidate",
                    title: candidate.name,
                    subtitle: `${candidate.party} • ${candidate.percentage.toFixed(2)}%`,
                    party: candidate.party,
                    partyColor: candidate.partyColor,
                    data: candidate,
                });
            }
        });

        // Search districts
        districts.forEach((district) => {
            if (
                district.name.toLowerCase().includes(searchQuery) ||
                district.region.toLowerCase().includes(searchQuery)
            ) {
                searchResults.push({
                    id: district.id,
                    type: "district",
                    title: district.name,
                    subtitle: `${district.region.charAt(0).toUpperCase() + district.region.slice(1)} Region • Turnout: ${district.turnout}%`,
                    data: district,
                });
            }
        });

        // Search constituencies
        constituencyResults.forEach((constituency) => {
            if (
                constituency.name.toLowerCase().includes(searchQuery) ||
                constituency.winner.name.toLowerCase().includes(searchQuery) ||
                constituency.winner.party.toLowerCase().includes(searchQuery)
            ) {
                searchResults.push({
                    id: constituency.id,
                    type: "constituency",
                    title: constituency.name,
                    subtitle: `${constituency.district.charAt(0).toUpperCase() + constituency.district.slice(1)} • MP: ${constituency.winner.name} (${constituency.winner.party})`,
                    party: constituency.winner.party,
                    partyColor: constituency.winner.partyColor,
                    data: constituency,
                });
            }
        });

        // Limit results to top 8
        setResults(searchResults.slice(0, 8));
        setSelectedIndex(0);
    }, [query]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen || results.length === 0) return;

            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    setSelectedIndex((prev) => (prev + 1) % results.length);
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
                    break;
                case "Enter":
                    e.preventDefault();
                    handleResultClick(results[selectedIndex]);
                    break;
                case "Escape":
                    setIsOpen(false);
                    setQuery("");
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, results, selectedIndex]);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleResultClick = (result: SearchResult) => {
        switch (result.type) {
            case "candidate":
                onCandidateSelect(result.id);
                break;
            case "district":
                const district = result.data as District;
                onRegionSelect(district.region);
                setTimeout(() => onDistrictSelect(result.id), 100);
                break;
            case "constituency":
                const constituency = result.data as ConstituencyResult;
                onRegionSelect(constituency.region);
                setTimeout(() => {
                    onDistrictSelect(constituency.district);
                    setTimeout(() => onConstituencySelect(result.id), 100);
                }, 100);
                break;
        }
        setIsOpen(false);
        setQuery("");
    };

    const getResultIcon = (type: SearchResultType) => {
        switch (type) {
            case "candidate":
                return <User className="w-4 h-4" />;
            case "district":
                return <MapPin className="w-4 h-4" />;
            case "constituency":
                return <Building2 className="w-4 h-4" />;
        }
    };

    const getResultTypeLabel = (type: SearchResultType) => {
        switch (type) {
            case "candidate":
                return "Presidential Candidate";
            case "district":
                return "District";
            case "constituency":
                return "Constituency";
        }
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-xl">
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Search candidates, districts, constituencies..."
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-slate-400"
                />
                {query && (
                    <button
                        onClick={() => {
                            setQuery("");
                            setResults([]);
                            inputRef.current?.focus();
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Search Results Dropdown */}
            {isOpen && results.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white border border-slate-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                    {/* Results Header */}
                    <div className="px-3 py-2 border-b border-slate-100 bg-slate-50">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            {results.length} {results.length === 1 ? "Result" : "Results"}
                        </p>
                    </div>

                    {/* Results List */}
                    <div className="py-1">
                        {results.map((result, index) => (
                            <button
                                key={`${result.type}-${result.id}`}
                                onClick={() => handleResultClick(result)}
                                onMouseEnter={() => setSelectedIndex(index)}
                                className={`w-full px-3 py-2.5 flex items-start gap-3 hover:bg-slate-50 transition-colors ${index === selectedIndex ? "bg-amber-50" : ""
                                    }`}
                            >
                                {/* Icon */}
                                <div
                                    className={`mt-0.5 p-1.5 rounded-md ${index === selectedIndex
                                        ? "bg-amber-100 text-amber-600"
                                        : "bg-slate-100 text-slate-500"
                                        }`}
                                >
                                    {getResultIcon(result.type)}
                                </div>

                                {/* Content */}
                                <div className="flex-1 text-left min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <h4 className="text-sm font-semibold text-slate-900 truncate">
                                            {result.title}
                                        </h4>
                                        {result.partyColor && (
                                            <div
                                                className="w-2.5 h-2.5 rounded-full ring-1 ring-black/5 flex-shrink-0"
                                                style={{ backgroundColor: result.partyColor }}
                                            />
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-500 truncate">{result.subtitle}</p>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">
                                        {getResultTypeLabel(result.type)}
                                    </p>
                                </div>

                                {/* Arrow indicator */}
                                {index === selectedIndex && (
                                    <div className="mt-1 text-amber-600">
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Keyboard hints */}
                    <div className="px-3 py-2 border-t border-slate-100 bg-slate-50 flex items-center gap-3 text-[10px] text-slate-400">
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600">
                                ↑↓
                            </kbd>
                            Navigate
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600">
                                ↵
                            </kbd>
                            Select
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600">
                                Esc
                            </kbd>
                            Close
                        </span>
                    </div>
                </div>
            )}

            {/* No Results */}
            {isOpen && query.trim().length >= 2 && results.length === 0 && (
                <div className="absolute top-full mt-2 w-full bg-white border border-slate-200 rounded-lg shadow-xl z-50 p-8 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center">
                        <Search className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-900 mb-1">No results found</p>
                    <p className="text-xs text-slate-500">
                        Try searching for a candidate, district, or constituency
                    </p>
                </div>
            )}
        </div>
    );
}

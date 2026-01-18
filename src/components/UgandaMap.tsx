import { useState } from "react";
import { districts, getCandidateById, partyColors, constituencyResults } from "../data/electionData";
import mapDataRaw from "../data/ugandaMap.json";

// Type the imported JSON data
interface MapPath {
    d: string;
    id: string;
    name: string;
    region: string;
}

const mapData = mapDataRaw as MapPath[];

interface UgandaMapProps {
    onRegionClick: (regionId: string) => void;
    onDistrictClick: (districtId: string) => void;
    selectedRegion: string | null;
    viewMode: "presidential" | "parliamentary";
}

export function UgandaMap({ onRegionClick, onDistrictClick, selectedRegion, viewMode }: UgandaMapProps) {
    const [, setHoveredRegion] = useState<string | null>(null);
    const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

    // Helper to normalize names for matching
    const normalizeName = (name: string) => name.toLowerCase().replace(" district", "").trim();

    // Get color for a district based on election data
    const getDistrictColor = (districtName: string) => {
        const normalizedName = normalizeName(districtName);

        // Find district in our election data
        const district = districts.find(d => normalizeName(d.name) === normalizedName);

        if (!district) return "#e2e8f0"; // Default slate-200 for no data

        if (viewMode === "presidential") {
            const candidate = getCandidateById(district.presidentialWinner);
            return candidate?.partyColor || "#94a3b8";
        } else {
            // For parliamentary, we'd check the MP winner - simplifying for now to NRM/majority
            return partyColors.NRM;
        }
    };

    // Get color for a region (group of districts)
    const getRegionColor = (regionName: string) => {
        // regionName is used directly below

        // Calculate winner from our data for this region
        // This is calculating dynamically based on the component's region prop which is just a string from the map
        // We map the map's region names to our data region IDs
        let dataRegionId = "northern"; // Default
        if (regionName === "central") dataRegionId = "central";
        if (regionName === "western") dataRegionId = "western";
        if (regionName === "eastern") dataRegionId = "eastern";

        const regionDistricts = districts.filter(d => d.region === dataRegionId);

        if (regionDistricts.length === 0) return "#e2e8f0";

        const totals: Record<string, number> = {};
        regionDistricts.forEach(district => {
            district.presidentialResults.forEach(result => {
                totals[result.candidateId] = (totals[result.candidateId] || 0) + result.votes;
            });
        });

        let maxVotes = 0;
        let winner = "";
        Object.entries(totals).forEach(([candidateId, votes]) => {
            if (votes > maxVotes) {
                maxVotes = votes;
                winner = candidateId;
            }
        });

        const candidate = getCandidateById(winner);
        return candidate?.partyColor || "#cbd5e1";
    };

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-slate-50/50 rounded-2xl overflow-hidden">
            <svg
                viewBox="0 0 1000 1000"
                className="w-full h-full max-h-[80vh]"
                style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.05))" }}
            >
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Map Content */}
                <g>
                    {mapData.map((path) => {
                        // Determine if this path should be highlighted/visible based on selection

                        // If we have a region selected, and this isn't in it, fade it out
                        const opacity = selectedRegion && path.region !== selectedRegion ? 0.1 : 1;

                        // Colors
                        let fill = "#f1f5f9"; // Default light background
                        let stroke = "#d2dae5"; // Light border
                        let strokeWidth = 0.5;

                        // Logic for coloring
                        if (selectedRegion) {
                            // District view mode (when a region is selected)
                            if (path.region === selectedRegion) {
                                fill = getDistrictColor(path.name);
                                stroke = "#ffffff";
                                strokeWidth = 1;
                            }
                        } else {
                            // National view mode - Color by Region Winner
                            fill = getRegionColor(path.region);
                            stroke = "#ffffff";
                            strokeWidth = 0.5;
                        }

                        // Hover state
                        const isHovered = hoveredDistrict === path.id;
                        if (isHovered) {
                            fill = viewMode === 'presidential' ? fill : '#3b82f6'; // Highlight color
                            stroke = "#334155";
                            strokeWidth = 1.5;
                            // Make slightly brighter/darker depending on theme
                        }

                        return (
                            <path
                                key={path.id}
                                d={path.d}
                                fill={fill}
                                stroke={stroke}
                                strokeWidth={strokeWidth}
                                fillOpacity={opacity}
                                strokeOpacity={opacity}
                                className="transition-all duration-200 cursor-pointer"
                                onMouseEnter={(e) => {
                                    setHoveredDistrict(path.id);
                                    setHoveredRegion(path.region);
                                    // Move element to front to show border clearly
                                    e.currentTarget.parentElement?.appendChild(e.currentTarget);
                                }}
                                onMouseLeave={() => {
                                    setHoveredDistrict(null);
                                    setHoveredRegion(null);
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!selectedRegion) {
                                        onRegionClick(path.region);
                                    } else {
                                        // Start finding the matched ID in our data
                                        const normalized = normalizeName(path.name);
                                        const matched = districts.find(d => normalizeName(d.name) === normalized);
                                        if (matched) {
                                            onDistrictClick(matched.id);
                                        }
                                    }
                                }}
                            >
                                <title>{path.name}</title>
                            </path>
                        );
                    })}
                </g>

                {/* Compass/North Arrow - simplified or just text */}
                <text x="900" y="900" className="text-4xl font-bold fill-slate-300 select-none">N</text>

                <title>Interactive Map of Uganda Election Results 2026</title>
                <desc>A map showing voting districts of Uganda, color-coded by the winning presidential party.</desc>
            </svg>

            {/* Tooltip */}
            {hoveredDistrict && (() => {
                // Find the district data corresponding to the hovered map element
                const hoveredMapData = mapData.find(d => d.id === hoveredDistrict);
                const normalizedName = hoveredMapData ? normalizeName(hoveredMapData.name) : "";
                const district = districts.find(d => normalizeName(d.name) === normalizedName);

                // Presidential Info
                const presWinnerId = district?.presidentialWinner;
                const presWinner = presWinnerId ? getCandidateById(presWinnerId) : null;
                const presResult = district?.presidentialResults.find(r => r.candidateId === presWinnerId);

                // MP Info - find constituency results for this district
                // We match by district ID from our data found above, or fallback to map ID if no data district found
                const targetDistrictId = district?.id || hoveredDistrict;
                const districtMPs = constituencyResults.filter(c => c.district === targetDistrictId);

                return (
                    <div className="absolute pointer-events-none bg-white/95 backdrop-blur-md shadow-2xl rounded-xl p-4 border border-slate-200 z-50 transition-all duration-200 bottom-8 left-8 min-w-[280px] max-w-sm animate-in fade-in slide-in-from-bottom-2">
                        {/* Header */}
                        <div className="mb-3 border-b border-slate-100 pb-2">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: getDistrictColor(hoveredMapData?.name || "") }}
                                />
                                <h3 className="font-bold text-slate-800 text-lg leading-tight">
                                    {hoveredMapData?.name}
                                </h3>
                            </div>
                            <p className="text-xs text-slate-500 capitalize ml-5">
                                {hoveredMapData?.region} Region
                            </p>
                        </div>

                        {/* Presidential Data */}
                        <div className="mb-4">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                                <span className="bg-slate-100 p-0.5 rounded text-slate-500">👑</span>
                                Presidential Winner
                            </h4>
                            {presWinner ? (
                                <div className="flex items-center justify-between bg-slate-50/80 p-2.5 rounded-lg border border-slate-100/50">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-1 h-8 rounded-full" style={{ backgroundColor: presWinner.partyColor }} />
                                        <div>
                                            <p className="font-bold text-slate-800 text-sm leading-none mb-0.5">{presWinner.name}</p>
                                            <p className="text-[10px] text-zinc-500 font-medium bg-white px-1.5 py-0.5 rounded-full border border-slate-100 inline-block">
                                                {presWinner.party}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-slate-900 text-sm">{presResult?.percentage}%</p>
                                        <p className="text-[10px] text-slate-400">{presResult?.votes.toLocaleString()} votes</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-slate-400 italic px-2">No presidential data available</p>
                            )}
                        </div>

                        {/* MPs Data */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                    <span className="bg-slate-100 p-0.5 rounded text-slate-500">🏛️</span>
                                    MPs Elected
                                </h4>
                                {districtMPs.length > 0 && (
                                    <span className="text-[10px] font-medium bg-slate-100 text-slate-500 px-1.5 rounded-full">
                                        {districtMPs.length} shown
                                    </span>
                                )}
                            </div>

                            {districtMPs.length > 0 ? (
                                <div className="space-y-1.5 max-h-[200px] overflow-y-auto custom-scrollbar pr-1">
                                    {districtMPs.map(mp => (
                                        <div key={mp.id} className="flex justify-between items-center text-sm p-2 rounded-lg bg-white border border-slate-100 shadow-sm">
                                            <div className="flex flex-col min-w-0">
                                                <span className="font-semibold text-slate-700 text-xs truncate max-w-[140px]" title={mp.winner.name}>
                                                    {mp.winner.name}
                                                </span>
                                                <span className="text-[10px] text-slate-400 truncate max-w-[140px]" title={mp.name}>
                                                    {mp.name}
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-end shrink-0 ml-2">
                                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold text-white mb-0.5" style={{ backgroundColor: mp.winner.partyColor }}>
                                                    {mp.winner.party}
                                                </span>
                                                <span className="text-[10px] text-slate-400">{mp.winner.percentage}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100/50">
                                    {district?.constituencies && district.constituencies.length > 0 ? (
                                        <div className="flex gap-2">
                                            <div className="text-2xl opacity-20">🗳️</div>
                                            <div>
                                                <p className="font-medium text-slate-700">{district.constituencies.length} Constituencies</p>
                                                <p className="text-[10px] text-slate-400 mt-0.5">MP details showing for selected sample districts only.</p>
                                            </div>
                                        </div>
                                    ) : "No constituency data available"}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}

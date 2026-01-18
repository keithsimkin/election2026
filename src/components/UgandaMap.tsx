import { useState } from "react";
import { districts, getCandidateById, partyColors } from "../data/electionData";
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
            </svg>

            {/* Tooltip */}
            {hoveredDistrict && (
                <div
                    className="absolute pointer-events-none bg-white/90 backdrop-blur-sm shadow-xl rounded-xl px-4 py-3 border border-slate-100 z-50 transition-all duration-200 bottom-8 left-8"
                >
                    <div className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getDistrictColor(mapData.find(d => d.id === hoveredDistrict)?.name || "") }}
                        />
                        <p className="font-bold text-slate-800">
                            {mapData.find(d => d.id === hoveredDistrict)?.name}
                        </p>
                    </div>
                    <p className="text-xs text-slate-500 capitalize mt-0.5">
                        {mapData.find(d => d.id === hoveredDistrict)?.region} Region
                    </p>
                </div>
            )}
        </div>
    );
}

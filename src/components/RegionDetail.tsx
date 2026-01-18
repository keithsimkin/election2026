import { districts, regions, getCandidateById, constituencyResults, pollingStations, type PollingStationResult, partyColors } from "@/data/electionData";
import { MapPin, Users, TrendingUp, X, ChevronRight, AlertTriangle, Building2 } from "lucide-react";

type ViewMode = "presidential" | "parliamentary";

interface RegionDetailProps {
    regionId: string;
    onClose: () => void;
    onDistrictClick: (districtId: string) => void;
    viewMode: ViewMode;
}

export function RegionDetail({ regionId, onClose, onDistrictClick, viewMode }: RegionDetailProps) {
    const region = regions.find(r => r.id === regionId);
    const regionDistricts = districts.filter(d => d.region === regionId);

    if (!region) return null;

    // Calculate region totals
    const totalVotes = regionDistricts.reduce((sum, d) => sum + d.totalVotes, 0);
    const registeredVoters = regionDistricts.reduce((sum, d) => sum + d.registeredVoters, 0);
    const turnout = (totalVotes / registeredVoters) * 100;

    // Calculate regional presidential results
    const presidentialTotals: Record<string, number> = {};
    regionDistricts.forEach(district => {
        district.presidentialResults.forEach(result => {
            presidentialTotals[result.candidateId] = (presidentialTotals[result.candidateId] || 0) + result.votes;
        });
    });

    const regionalResults = Object.entries(presidentialTotals)
        .map(([candidateId, votes]) => ({
            candidateId,
            votes,
            percentage: (votes / totalVotes) * 100,
            candidate: getCandidateById(candidateId),
        }))
        .sort((a, b) => b.votes - a.votes);

    // Calculate regional parliamentary stats
    const regionConstituencies = constituencyResults.filter(c => c.region === regionId);
    const mpStats: Record<string, { count: number, color: string, name: string }> = {};
    regionConstituencies.forEach(c => {
        const party = c.winner.party;
        if (!mpStats[party]) {
            mpStats[party] = { count: 0, color: c.winner.partyColor, name: party };
        }
        mpStats[party].count++;
    });
    const sortedMpStats = Object.values(mpStats).sort((a, b) => b.count - a.count);

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div
                className="p-6 border-b border-slate-100"
                style={{ background: `linear-gradient(to bottom, ${region.color}10, transparent)` }}
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="p-2.5 rounded-xl border"
                            style={{ backgroundColor: `${region.color}10`, borderColor: `${region.color}20` }}
                        >
                            <MapPin className="w-5 h-5" style={{ color: region.color }} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">{region.name}</h2>
                            <p className="text-slate-500 text-sm">{regionDistricts.length} Districts</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/60 border border-slate-200/60 rounded-xl p-2.5 text-center">
                        <Users className="w-3.5 h-3.5 text-blue-500 mx-auto mb-1" />
                        <p className="text-slate-800 font-bold text-sm">{(registeredVoters / 1000000).toFixed(2)}M</p>
                        <p className="text-slate-400 text-[10px] uppercase">Registered</p>
                    </div>
                    <div className="bg-white/60 border border-slate-200/60 rounded-xl p-2.5 text-center">
                        <TrendingUp className="w-3.5 h-3.5 text-green-500 mx-auto mb-1" />
                        <p className="text-slate-800 font-bold text-sm">{(totalVotes / 1000000).toFixed(2)}M</p>
                        <p className="text-slate-400 text-[10px] uppercase">Votes</p>
                    </div>
                    <div className="bg-white/60 border border-slate-200/60 rounded-xl p-2.5 text-center">
                        <TrendingUp className="w-3.5 h-3.5 text-purple-500 mx-auto mb-1" />
                        <p className="text-slate-800 font-bold text-sm">{turnout.toFixed(1)}%</p>
                        <p className="text-slate-400 text-[10px] uppercase">Turnout</p>
                    </div>
                </div>
            </div>

            {/* Regional Results (Conditional) */}
            <div className="p-4 border-b border-slate-100">
                <h3 className="text-slate-400 font-semibold mb-3 text-xs uppercase tracking-wide">
                    {viewMode === 'presidential' ? 'Regional Presidential Results' : 'Parliamentary Seats Won'}
                </h3>

                {viewMode === 'presidential' ? (
                    <ol className="space-y-2 list-none m-0">
                        {regionalResults.slice(0, 3).map((result, index) => (
                            <li key={result.candidateId} className="flex items-center gap-3">
                                <div
                                    className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-white`}
                                    style={{ backgroundColor: result.candidate?.partyColor }}
                                >
                                    {index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <p className="text-slate-800 text-sm font-medium truncate">{result.candidate?.name}</p>
                                        <span className="text-slate-900 font-bold text-sm ml-2">{result.percentage.toFixed(1)}%</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full"
                                            style={{ width: `${result.percentage}%`, backgroundColor: result.candidate?.partyColor }}
                                        />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                ) : (
                    <ul className="space-y-2 list-none m-0">
                        {sortedMpStats.map((stat) => (
                            <li key={stat.name} className="flex items-center gap-3">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: stat.color }}
                                />
                                <div className="flex-1 min-w-0 flex justify-between items-center">
                                    <span className="text-slate-800 font-medium text-sm">{stat.name}</span>
                                    <span className="text-slate-900 font-bold text-sm bg-slate-100 px-2 py-0.5 rounded-md">{stat.count} seats</span>
                                </div>
                            </li>
                        ))}
                        <li className="pt-2 text-xs text-slate-400 text-center border-t border-slate-50 mt-2">
                            Total: {regionConstituencies.length} Constituencies
                        </li>
                    </ul>
                )}
            </div>

            {/* Districts list */}
            <div className="p-4 flex-1 overflow-hidden flex flex-col">
                <h3 className="text-slate-400 font-semibold mb-3 text-xs uppercase tracking-wide">Districts</h3>
                <ul className="space-y-2 overflow-y-auto custom-scrollbar pr-1 list-none m-0">
                    {regionDistricts.map(district => {
                        const winner = getCandidateById(district.presidentialWinner);
                        return (
                            <li key={district.id}>
                                <button
                                    onClick={() => onDistrictClick(district.id)}
                                    className="w-full flex items-center gap-3 p-3 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all group text-left"
                                >
                                    {viewMode === 'presidential' ? (
                                        <div
                                            className="w-2.5 h-2.5 rounded-full ring-2 ring-white shadow-sm"
                                            style={{ backgroundColor: winner?.partyColor }}
                                        />
                                    ) : (
                                        <Building2 className="w-3 h-3 text-slate-400" />
                                    )}
                                    <span className="text-slate-700 font-medium flex-1">{district.name}</span>
                                    <span className="text-slate-400 text-xs">{district.turnout.toFixed(1)}%</span>
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

interface DistrictDetailProps {
    districtId: string;
    onClose: () => void;
    onBack: () => void;
    onConstituencyClick: (constituencyId: string) => void;
    viewMode: ViewMode;
}

export function DistrictDetail({ districtId, onClose, onBack, onConstituencyClick, viewMode }: DistrictDetailProps) {
    const district = districts.find(d => d.id === districtId);
    const districtConstituencies = constituencyResults.filter(c => c.district === districtId);

    if (!district) return null;

    const winner = getCandidateById(district.presidentialWinner);

    // MP Stats for District
    const mpStats: Record<string, { count: number, color: string, name: string }> = {};
    districtConstituencies.forEach(c => {
        const party = c.winner.party;
        if (!mpStats[party]) {
            mpStats[party] = { count: 0, color: c.winner.partyColor, name: party };
        }
        mpStats[party].count++;
    });
    const sortedMpStats = Object.values(mpStats).sort((a, b) => b.count - a.count);


    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div
                className="p-6 border-b border-slate-100"
                style={{ background: `linear-gradient(to bottom, ${viewMode === 'presidential' ? winner?.partyColor : '#94a3b8'}10, transparent)` }}
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onBack}
                            className="p-2 hover:bg-white/50 rounded-full transition-colors group"
                        >
                            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 rotate-180" />
                        </button>
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">{district.name} District</h2>
                            <p className="text-slate-500 text-sm capitalize">{district.region} Region</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/50 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/60 border border-slate-200/60 rounded-xl p-2.5 text-center">
                        <p className="text-slate-800 font-bold">{(district.registeredVoters / 1000).toFixed(0)}K</p>
                        <p className="text-slate-400 text-[10px] uppercase">Registered</p>
                    </div>
                    <div className="bg-white/60 border border-slate-200/60 rounded-xl p-2.5 text-center">
                        <p className="text-slate-800 font-bold">{(district.totalVotes / 1000).toFixed(0)}K</p>
                        <p className="text-slate-400 text-[10px] uppercase">Votes</p>
                    </div>
                    <div className="bg-white/60 border border-slate-200/60 rounded-xl p-2.5 text-center">
                        <p className="text-slate-800 font-bold">{district.turnout.toFixed(1)}%</p>
                        <p className="text-slate-400 text-[10px] uppercase">Turnout</p>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="p-4 border-b border-slate-100">
                <h3 className="text-slate-400 font-semibold mb-3 text-xs uppercase tracking-wide">
                    {viewMode === 'presidential' ? 'Presidential Results' : 'Parliamentary Seats'}
                </h3>

                {viewMode === 'presidential' ? (
                    <ol className="space-y-2 list-none m-0">
                        {district.presidentialResults.map((result, index) => {
                            const candidate = getCandidateById(result.candidateId);
                            return (
                                <li key={result.candidateId} className="flex items-center gap-3">
                                    <div
                                        className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-white`}
                                        style={{ backgroundColor: candidate?.partyColor }}
                                    >
                                        {index + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-slate-800 text-sm font-medium truncate">{candidate?.name}</p>
                                        <p className="text-slate-500 text-[10px]">{candidate?.party}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-slate-900 font-bold text-sm">{result.percentage.toFixed(1)}%</p>
                                        <p className="text-slate-400 text-[10px]">{result.votes.toLocaleString()}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                ) : (
                    <ul className="space-y-2 list-none m-0">
                        {sortedMpStats.map((stat) => (
                            <li key={stat.name} className="flex items-center gap-3">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: stat.color }}
                                />
                                <div className="flex-1 min-w-0 flex justify-between items-center">
                                    <span className="text-slate-800 font-medium text-sm">{stat.name}</span>
                                    <span className="text-slate-900 font-bold text-sm bg-slate-100 px-2 py-0.5 rounded-md">{stat.count}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Constituencies */}
            {districtConstituencies.length > 0 && (
                <div className="p-4 bg-slate-50/50">
                    <h3 className="text-slate-400 font-semibold mb-3 text-xs uppercase tracking-wide">Constituencies</h3>
                    <ul className="space-y-3 list-none m-0">
                        {districtConstituencies.map(constituency => (
                            <li
                                key={constituency.id}
                            >
                                <button
                                    onClick={() => onConstituencyClick(constituency.id)}
                                    className="w-full text-left p-3 bg-white border border-slate-200/60 rounded-xl shadow-sm hover:border-slate-300 transition-colors group"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-slate-800 font-medium text-sm group-hover:text-blue-600 transition-colors flex items-center gap-2">
                                            {constituency.name}
                                            <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-blue-500" />
                                        </span>
                                        <span
                                            className="px-1.5 py-0.5 rounded text-[10px] font-semibold border"
                                            style={{
                                                backgroundColor: `${constituency.winner.partyColor}10`,
                                                color: constituency.winner.partyColor,
                                                borderColor: `${constituency.winner.partyColor}30`
                                            }}
                                        >
                                            {constituency.winner.party}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 text-xs flex justify-between">
                                        {/* Show winner name always for constituency */}
                                        <span>{constituency.winner.name}</span>
                                        <span className="font-bold text-slate-700">{constituency.winner.percentage.toFixed(1)}%</span>
                                    </p>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

interface ConstituencyDetailProps {
    constituencyId: string;
    onClose: () => void;
    onBack: () => void;
    viewMode: ViewMode;
}

export function ConstituencyDetail({ constituencyId, onClose, onBack, viewMode }: ConstituencyDetailProps) {
    const constituency = constituencyResults.find(c => c.id === constituencyId);
    const stations: PollingStationResult[] = pollingStations.filter(ps => ps.constituencyId === constituencyId);

    if (!constituency) return null;

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onBack}
                            className="p-2 hover:bg-white/50 rounded-full transition-colors group"
                        >
                            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 rotate-180" />
                        </button>
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">{constituency.name}</h2>
                            <p className="text-slate-500 text-sm">Constituency</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/50 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white border border-slate-200 rounded-xl p-2.5 text-center">
                        <p className="text-slate-800 font-bold">{constituency.registeredVoters.toLocaleString()}</p>
                        <p className="text-slate-400 text-[10px] uppercase">Registered</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-2.5 text-center">
                        <p className="text-slate-800 font-bold">{constituency.totalVotes.toLocaleString()}</p>
                        <p className="text-slate-400 text-[10px] uppercase">Votes</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-2.5 text-center">
                        <p className="text-slate-800 font-bold">{constituency.turnout.toFixed(1)}%</p>
                        <p className="text-slate-400 text-[10px] uppercase">Turnout</p>
                    </div>
                </div>
            </div>

            {/* Polling Stations List */}
            <div className="p-4 bg-slate-50/30">
                <h3 className="text-slate-500 font-semibold mb-3 text-xs uppercase tracking-wide flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    Polling Stations ({stations.length})
                </h3>

                {stations.length === 0 ? (
                    <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                        <p className="text-slate-400 text-sm">No polling station data available for this constituency yet.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {stations.map(station => (
                            <div key={station.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                <div className="p-3 border-b border-slate-50 flex justify-between items-start">
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800">{station.name}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                                Turnout: {station.turnout}%
                                            </span>
                                            {station.issues && station.issues.length > 0 && (
                                                <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                                                    <AlertTriangle className="w-3 h-3" />
                                                    {station.issues[0]}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-slate-400">Votes</p>
                                        <p className="text-sm font-bold text-slate-700">{station.totalVotes}</p>
                                    </div>
                                </div>

                                {/* Quick Results Bar */}
                                <div className="p-3 bg-slate-50/50">
                                    <div className="text-[10px] text-slate-400 mb-2 uppercase tracking-wide">
                                        {viewMode === 'presidential' ? 'Presidential Results' : 'MP Results'}
                                    </div>

                                    {viewMode === 'presidential' ? (
                                        <>
                                            <div className="flex h-4 rounded-full overflow-hidden bg-slate-200">
                                                {station.presidentialResults.slice(0, 3).map(res => {
                                                    const candidate = getCandidateById(res.candidateId);
                                                    return (
                                                        <div
                                                            key={res.candidateId}
                                                            style={{ width: `${res.percentage}%`, backgroundColor: candidate?.partyColor }}
                                                            className="h-full"
                                                            title={`${candidate?.name}: ${res.percentage}%`}
                                                        />
                                                    );
                                                })}
                                            </div>
                                            <div className="flex justify-between mt-1 text-[10px] text-slate-500">
                                                {station.presidentialResults.slice(0, 2).map(res => {
                                                    const candidate = getCandidateById(res.candidateId);
                                                    return (
                                                        <span key={res.candidateId} className="flex items-center gap-1">
                                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: candidate?.partyColor }} />
                                                            {candidate?.party} {res.percentage}%
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex h-4 rounded-full overflow-hidden bg-slate-200">
                                                {station.mpResults.slice(0, 3).map((res, idx) => {
                                                    const color = partyColors[res.party] || partyColors.IND || '#cbd5e1';
                                                    return (
                                                        <div
                                                            key={idx}
                                                            style={{ width: `${res.percentage}%`, backgroundColor: color }}
                                                            className="h-full"
                                                            title={`${res.name} (${res.party}): ${res.percentage}%`}
                                                        />
                                                    );
                                                })}
                                            </div>
                                            <div className="flex justify-between mt-1 text-[10px] text-slate-500">
                                                {station.mpResults.slice(0, 2).map((res, idx) => {
                                                    const color = partyColors[res.party] || partyColors.IND;
                                                    return (
                                                        <span key={idx} className="flex items-center gap-1">
                                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                                                            {res.party} {res.percentage}%
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

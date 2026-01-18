import { districts, regions, getCandidateById, constituencyResults } from "@/data/electionData";
import { MapPin, Users, TrendingUp, X, ChevronRight } from "lucide-react";

interface RegionDetailProps {
    regionId: string;
    onClose: () => void;
    onDistrictClick: (districtId: string) => void;
}

export function RegionDetail({ regionId, onClose, onDistrictClick }: RegionDetailProps) {
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

            {/* Regional Presidential Results */}
            <div className="p-4 border-b border-slate-100">
                <h3 className="text-slate-400 font-semibold mb-3 text-xs uppercase tracking-wide">Regional Results</h3>
                <div className="space-y-2">
                    {regionalResults.slice(0, 3).map((result, index) => (
                        <div key={result.candidateId} className="flex items-center gap-3">
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
                        </div>
                    ))}
                </div>
            </div>

            {/* Districts list */}
            <div className="p-4 flex-1 overflow-hidden flex flex-col">
                <h3 className="text-slate-400 font-semibold mb-3 text-xs uppercase tracking-wide">Districts</h3>
                <div className="space-y-2 overflow-y-auto custom-scrollbar pr-1">
                    {regionDistricts.map(district => {
                        const winner = getCandidateById(district.presidentialWinner);
                        return (
                            <button
                                key={district.id}
                                onClick={() => onDistrictClick(district.id)}
                                className="w-full flex items-center gap-3 p-3 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all group text-left"
                            >
                                <div
                                    className="w-2.5 h-2.5 rounded-full ring-2 ring-white shadow-sm"
                                    style={{ backgroundColor: winner?.partyColor }}
                                />
                                <span className="text-slate-700 font-medium flex-1">{district.name}</span>
                                <span className="text-slate-400 text-xs">{district.turnout.toFixed(1)}%</span>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

interface DistrictDetailProps {
    districtId: string;
    onClose: () => void;
    onBack: () => void;
}

export function DistrictDetail({ districtId, onClose, onBack }: DistrictDetailProps) {
    const district = districts.find(d => d.id === districtId);
    const districtConstituencies = constituencyResults.filter(c => c.district === districtId);

    if (!district) return null;

    const winner = getCandidateById(district.presidentialWinner);

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div
                className="p-6 border-b border-slate-100"
                style={{ background: `linear-gradient(to bottom, ${winner?.partyColor}10, transparent)` }}
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

            {/* Presidential Results */}
            <div className="p-4 border-b border-slate-100">
                <h3 className="text-slate-400 font-semibold mb-3 text-xs uppercase tracking-wide">Presidential Results</h3>
                <div className="space-y-2">
                    {district.presidentialResults.map((result, index) => {
                        const candidate = getCandidateById(result.candidateId);
                        return (
                            <div key={result.candidateId} className="flex items-center gap-3">
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
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Constituencies */}
            {districtConstituencies.length > 0 && (
                <div className="p-4 bg-slate-50/50">
                    <h3 className="text-slate-400 font-semibold mb-3 text-xs uppercase tracking-wide">Constituencies</h3>
                    <div className="space-y-3">
                        {districtConstituencies.map(constituency => (
                            <div
                                key={constituency.id}
                                className="p-3 bg-white border border-slate-200/60 rounded-xl shadow-sm"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-slate-800 font-medium text-sm">{constituency.name}</span>
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
                                    <span>{constituency.winner.name}</span>
                                    <span className="font-bold text-slate-700">{constituency.winner.percentage.toFixed(1)}%</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

import { presidentialResults, type Candidate } from "@/data/electionData";
import { TrendingUp, Users, Vote, Award } from "lucide-react";

interface PresidentialResultsProps {
    highlightCandidate?: string;
}

export function PresidentialResults({ highlightCandidate }: PresidentialResultsProps) {
    const { totalVotes, registeredVoters, turnout, candidates } = presidentialResults;

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-slate-50/50 p-6 border-b border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-amber-100 rounded-xl">
                        <Award className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Presidential Results</h2>
                        <p className="text-slate-500 text-sm">Uganda 2026 General Election</p>
                    </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="bg-white border border-slate-100 rounded-xl p-3 text-center shadow-sm">
                        <Users className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                        <p className="text-sm font-bold text-slate-800">{(registeredVoters / 1000000).toFixed(1)}M</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wide">Registered</p>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-xl p-3 text-center shadow-sm">
                        <Vote className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                        <p className="text-sm font-bold text-slate-800">{(totalVotes / 1000000).toFixed(1)}M</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wide">Total Votes</p>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-xl p-3 text-center shadow-sm">
                        <TrendingUp className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                        <p className="text-sm font-bold text-slate-800">{turnout.toFixed(1)}%</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wide">Turnout</p>
                    </div>
                </div>
            </div>

            {/* Candidates list */}
            <div className="p-4 space-y-3">
                {candidates.map((candidate, index) => (
                    <CandidateCard
                        key={candidate.id}
                        candidate={candidate}
                        rank={index + 1}
                        isHighlighted={highlightCandidate === candidate.id}
                    />
                ))}
            </div>
        </div>
    );
}

interface CandidateCardProps {
    candidate: Candidate;
    rank: number;
    isHighlighted?: boolean;
}

function CandidateCard({ candidate, rank, isHighlighted }: CandidateCardProps) {
    const isWinner = rank === 1;

    return (
        <div
            className={`
        relative rounded-xl p-4 transition-all duration-300
        ${isWinner
                    ? "bg-amber-50 border border-amber-200 shadow-sm"
                    : "bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm"
                }
        ${isHighlighted ? "ring-2 ring-amber-500 ring-offset-2" : ""}
      `}
        >
            {/* Winner badge */}
            {isWinner && (
                <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    WINNER
                </div>
            )}

            <div className="flex items-center gap-3">
                {/* Rank */}
                <div
                    className={`
            w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
            ${isWinner ? "bg-white text-amber-600 border border-amber-200" : "bg-slate-100 text-slate-500 border border-slate-200"}
          `}
                >
                    {rank}
                </div>

                {/* Candidate avatar placeholder */}
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-white shadow-sm"
                    style={{ backgroundColor: candidate.partyColor }}
                >
                    {candidate.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>

                {/* Candidate info */}
                <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm truncate ${isWinner ? "text-slate-900" : "text-slate-700"}`}>
                        {candidate.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span
                            className="px-1.5 py-0.5 rounded text-[10px] font-semibold border"
                            style={{
                                backgroundColor: `${candidate.partyColor}10`,
                                color: candidate.partyColor,
                                borderColor: `${candidate.partyColor}30`
                            }}
                        >
                            {candidate.party}
                        </span>
                    </div>
                </div>

                {/* Votes & percentage */}
                <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">
                        {candidate.percentage.toFixed(2)}%
                    </p>
                    <p className="text-slate-400 text-xs">
                        {(candidate.votes / 1000000).toFixed(2)}M
                    </p>
                </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                        width: `${candidate.percentage}%`,
                        backgroundColor: candidate.partyColor
                    }}
                />
            </div>
        </div>
    );
}

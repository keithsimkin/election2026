import { type Candidate } from "@/data/electionData";
import { User, Shield, UserPlus, ChevronLeft, Target, Award } from "lucide-react";

interface CandidateDetailProps {
    candidate: Candidate;
    onBack: () => void;
}

export function CandidateDetail({ candidate, onBack }: CandidateDetailProps) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Header */}
            <div
                className="p-6 text-white relative overflow-hidden"
                style={{ backgroundColor: candidate.partyColor }}
            >
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12 blur-xl" />

                <button
                    onClick={onBack}
                    className="mb-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-black/20 hover:bg-black/30 px-3 py-1.5 rounded-full transition-colors backdrop-blur-sm"
                >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Back to Results
                </button>

                <div className="flex items-center gap-5 relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-black shadow-lg border border-white/30">
                        {candidate.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border border-white/20">
                                {candidate.party} Candidate
                            </span>
                        </div>
                        <h2 className="text-2xl font-black leading-tight tracking-tight">
                            {candidate.name}
                        </h2>
                    </div>
                </div>

                {/* Score bar in header */}
                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Vote Share</p>
                        <p className="text-xl font-black">{candidate.percentage.toFixed(2)}%</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Total Votes</p>
                        <p className="text-xl font-black">{(candidate.votes / 1000000).toFixed(2)}M</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                {/* Profile Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                            <User className="w-4 h-4 text-slate-500" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Age</p>
                            <p className="text-sm font-bold text-slate-800">{candidate.age || "N/A"} years</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                            <UserPlus className="w-4 h-4 text-slate-500" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Running Mate</p>
                            <p className="text-sm font-bold text-slate-800">{candidate.runningMate || "N/A"}</p>
                        </div>
                    </div>
                </div>

                {/* Bio Section */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                        <h3 className="font-black text-slate-800 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-blue-600" />
                            CANDIDATE PROFILE
                        </h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        {candidate.bio || "No detailed biography available for this candidate."}
                    </p>
                </section>

                {/* Manifesto Highlights */}
                {candidate.manifesto && candidate.manifesto.length > 0 && (
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                            <h3 className="font-black text-slate-800 flex items-center gap-2">
                                <Target className="w-4 h-4 text-amber-500" />
                                MANIFESTO HIGHLIGHTS
                            </h3>
                        </div>
                        <div className="grid gap-3">
                            {candidate.manifesto.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3 bg-amber-50/50 border border-amber-100 rounded-xl">
                                    <div className="mt-1 w-5 h-5 flex-shrink-0 bg-amber-100 rounded-full flex items-center justify-center text-[10px] font-black text-amber-700">
                                        {idx + 1}
                                    </div>
                                    <p className="text-sm font-bold text-slate-700 leading-tight">{item}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Election Stats Context */}
                <section className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full -mr-12 -mt-12 blur-xl" />

                    <div className="flex items-center gap-2 mb-4">
                        <Award className="w-5 h-5 text-amber-500" />
                        <h4 className="font-black text-sm tracking-widest uppercase">Election Performance</h4>
                    </div>

                    <div className="space-y-4 relative z-10">
                        <div className="flex justify-between items-end">
                            <span className="text-xs font-bold text-slate-400 uppercase">National Rank</span>
                            <span className="text-2xl font-black">#1 in 48 Districts</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                                style={{ width: `${candidate.percentage}%` }}
                            />
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            <span>0% Share</span>
                            <span>100% Share</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

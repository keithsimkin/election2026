import { parliamentarySummary } from "@/data/electionData";
import { Building2, Users } from "lucide-react";

export function ParliamentaryResults() {
    const { totalSeats, parties } = parliamentarySummary;

    // Calculate the arc for each party in the hemicycle
    const sortedParties = [...parties].sort((a, b) => b.seats - a.seats);

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-slate-50/50 p-6 border-b border-slate-100">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 bg-blue-100 rounded-xl">
                        <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Parliament Composition</h2>
                        <p className="text-slate-500 text-sm">11th Parliament of Uganda</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 mt-4 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600 text-sm">Total Seats:</span>
                    <span className="text-slate-900 font-bold text-lg ml-auto">{totalSeats}</span>
                </div>
            </div>

            {/* Hemicycle visualization */}
            <div className="p-6">
                <svg viewBox="0 0 400 220" className="w-full max-w-md mx-auto">
                    {/* Background arc */}
                    <path
                        d="M 50 200 A 150 150 0 0 1 350 200"
                        fill="none"
                        stroke="#f1f5f9"
                        strokeWidth="45"
                        strokeLinecap="round"
                    />

                    {/* Party arcs */}
                    {(() => {
                        let startAngle = 180;
                        return sortedParties.map((party) => {
                            const seatAngle = (party.seats / totalSeats) * 180;
                            const endAngle = startAngle - seatAngle;

                            // Calculate arc path
                            const startRad = (startAngle * Math.PI) / 180;
                            const endRad = (endAngle * Math.PI) / 180;
                            const centerX = 200;
                            const centerY = 200;
                            const radius = 150;

                            const x1 = centerX + radius * Math.cos(startRad);
                            const y1 = centerY - radius * Math.sin(startRad);
                            const x2 = centerX + radius * Math.cos(endRad);
                            const y2 = centerY - radius * Math.sin(endRad);

                            // For a hemicycle, the max angle is 180, so segments are always < 180 deg
                            // unless a single party has > 100% (impossible).
                            // Thus largeArcFlag is always 0.
                            const largeArcFlag = 0;

                            const pathD = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;

                            const result = (
                                <path
                                    key={party.party}
                                    d={pathD}
                                    fill="none"
                                    stroke={party.color}
                                    strokeWidth="40"
                                    strokeLinecap="butt"
                                    className="transition-all duration-300 hover:opacity-80 hover:stroke-[42]"
                                />
                            );

                            startAngle = endAngle;
                            return result;
                        });
                    })()}

                    {/* Center podium */}
                    <circle cx="200" cy="200" r="25" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                    <text x="200" y="195" textAnchor="middle" className="fill-slate-400 text-xs">
                        MPs
                    </text>
                    <text x="200" y="210" textAnchor="middle" className="fill-slate-800 font-bold text-sm">
                        {totalSeats}
                    </text>
                </svg>
            </div>

            {/* Party breakdown */}
            <div className="px-6 pb-6 space-y-2">
                {sortedParties.map((party) => (
                    <div
                        key={party.party}
                        className="flex items-center gap-3 p-2 bg-slate-50 border border-slate-100 rounded-lg hover:border-slate-200 transition-colors"
                    >
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: party.color }}
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-slate-800 font-medium text-sm truncate">{party.name}</p>
                            <p className="text-slate-500 text-[10px]">{party.party}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-900 font-bold text-sm">{party.seats}</p>
                            <p className="text-slate-400 text-[10px]">{((party.seats / totalSeats) * 100).toFixed(1)}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

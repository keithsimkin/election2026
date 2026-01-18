import { useState } from "react";
import { UgandaMap } from "@/components/UgandaMap";
import ugFlag from "@/assets/uganda-flag.svg";
import { PresidentialResults } from "@/components/PresidentialResults";
import { ParliamentaryResults } from "@/components/ParliamentaryResults";
import { RegionDetail, DistrictDetail } from "@/components/RegionDetail";
import { partyColors } from "@/data/electionData";
import { Map as MapIcon, Crown, Building2, BarChart3 } from "lucide-react";

type ViewMode = "presidential" | "parliamentary";
type Tab = "map" | "president" | "parliament" | "stats";

export function App() {
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>("presidential");
    const [activeTab, setActiveTab] = useState<Tab>("map");

    const handleRegionClick = (regionId: string) => {
        setSelectedRegion(regionId);
        setSelectedDistrict(null);
    };

    const handleDistrictClick = (districtId: string) => {
        setSelectedDistrict(districtId);
    };

    const handleCloseDetail = () => {
        setSelectedRegion(null);
        setSelectedDistrict(null);
    };

    const handleBackToRegion = () => {
        setSelectedDistrict(null);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">
            {/* Background pattern */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* Uganda Flag colors indicator */}
                            {/* Uganda Flag */}
                            <img
                                src={ugFlag}
                                alt="Uganda Flag"
                                className="h-6 w-9 rounded-sm object-cover shadow-sm ring-1 ring-black/10"
                            />
                            <div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                    Uganda Elections 2026
                                </h1>
                            </div>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
                            <button
                                onClick={() => setViewMode("presidential")}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${viewMode === "presidential"
                                    ? "bg-white text-amber-600 shadow-sm ring-1 ring-black/5"
                                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                                    }`}
                            >
                                <Crown className="w-4 h-4" />
                                Presidential
                            </button>
                            <button
                                onClick={() => setViewMode("parliamentary")}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${viewMode === "parliamentary"
                                    ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5"
                                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                                    }`}
                            >
                                <Building2 className="w-4 h-4" />
                                Parliamentary
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Tab Navigation */}
            <nav className="lg:hidden sticky top-14 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
                <div className="flex">
                    {[
                        { id: "map", icon: MapIcon, label: "Map" },
                        { id: "president", icon: Crown, label: "President" },
                        { id: "parliament", icon: Building2, label: "Parliament" },
                        { id: "stats", icon: BarChart3, label: "Stats" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as Tab)}
                            className={`flex-1 py-3 flex flex-col items-center gap-1 transition-all ${activeTab === tab.id
                                ? "text-amber-600 border-b-2 border-amber-600 bg-amber-50/50"
                                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                                }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            <span className="text-xs font-medium">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 py-6 space-y-6">

                <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
                    {/* Map Section */}
                    <div className={`lg:col-span-2 h-full flex flex-col ${activeTab !== "map" ? "hidden lg:flex" : ""}`}>
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden relative">
                            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur border border-slate-200 rounded-lg p-2 shadow-sm">
                                <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                                    <MapIcon className="w-4 h-4 text-slate-500" />
                                    Interactive Map
                                </h2>
                            </div>

                            {selectedRegion && (
                                <button
                                    onClick={handleCloseDetail}
                                    className="absolute top-4 right-4 z-10 text-xs font-medium bg-slate-900 text-white px-3 py-1.5 rounded-full hover:bg-slate-800 shadow-lg transition-transform hover:scale-105 active:scale-95"
                                >
                                    ← Back to Overview
                                </button>
                            )}

                            <div className="flex-1 w-full bg-slate-50 relative">
                                <UgandaMap
                                    onRegionClick={handleRegionClick}
                                    onDistrictClick={handleDistrictClick}
                                    selectedRegion={selectedRegion}
                                    viewMode={viewMode}
                                />
                            </div>

                            {/* Legend Strip */}
                            <div className="bg-white border-t border-slate-100 p-3 flex flex-wrap gap-4 justify-center">
                                {Object.entries(partyColors).map(([party, color]) => (
                                    <div key={party} className="flex items-center gap-1.5">
                                        <div
                                            className="w-3 h-3 rounded-full ring-1 ring-black/5"
                                            style={{ backgroundColor: color }}
                                        />
                                        <span className="text-slate-600 text-xs font-medium">{party}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Results Panel */}
                    <div className={`flex flex-col h-full overflow-hidden ${activeTab !== "president" && activeTab !== "parliament" && activeTab !== "stats" && activeTab !== "map" ? "hidden lg:flex" : ""} ${activeTab === "map" ? "hidden lg:flex" : ""}`}>
                        {/* Show detail panels when region/district selected */}
                        <div className="h-full overflow-y-auto pr-1 pb-2 custom-scrollbar space-y-4">
                            {selectedDistrict ? (
                                <DistrictDetail
                                    districtId={selectedDistrict}
                                    onClose={handleCloseDetail}
                                    onBack={handleBackToRegion}
                                />
                            ) : selectedRegion ? (
                                <RegionDetail
                                    regionId={selectedRegion}
                                    onClose={handleCloseDetail}
                                    onDistrictClick={handleDistrictClick}
                                />
                            ) : (
                                <div className="space-y-6">
                                    {/* Results components */}
                                    <div className={activeTab === "parliament" && viewMode === 'presidential' ? "hidden" : ""}>
                                        {viewMode === "presidential" ? <PresidentialResults /> : <ParliamentaryResults />}
                                    </div>

                                    {/* Quick Stats Cards */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                            <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Registered</p>
                                            <p className="text-2xl font-bold text-slate-900 mt-1">18.1M</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                            <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Turnout</p>
                                            <p className="text-2xl font-bold text-slate-900 mt-1">56.9%</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-slate-200 bg-slate-50 mt-12">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-2">
                            <img
                                src={ugFlag}
                                alt="Uganda Flag"
                                className="h-5 w-8 rounded-sm object-cover ring-1 ring-black/10 shadow-sm"
                            />
                            <span className="text-slate-600 font-medium text-sm">Uganda Elections 2026 Dashboard</span>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-500 text-sm">
                                developed by <span className="font-semibold text-slate-700">+256757474824</span>
                            </p>
                        </div>
                    </div>

                    {/* Disclaimer Section */}
                    <div className="pt-6 border-t border-slate-200">
                        <div className="max-w-3xl mx-auto text-center space-y-2">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Official Disclaimer
                            </p>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                This platform is a technological demonstration and <strong>does not represent official election results</strong>.
                                All data visualization, including vote counts, percentages, and district mapping, utilizes simulated datasets for development and testing purposes.
                                This tool is not affiliated with the Independent Electoral Commission (IEC) of Uganda.
                                For official results, please refer exclusively to authorized government channels.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
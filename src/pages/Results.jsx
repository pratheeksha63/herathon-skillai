import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Results() {
  const navigate = useNavigate();
  const [idea, setIdea] = useState(null);
  const [checked, setChecked] = useState(() => new Set());
  const [copied, setCopied] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const raw = localStorage.getItem("skillaunch_idea") || "{}";

    try {
      const parsed = JSON.parse(raw);
      if (!parsed.businessName) {
        navigate("/onboarding", { replace: true });
      } else {
        setIdea(parsed);
      }
    } catch (error) {
      console.error("Error parsing idea data:", error);
      navigate("/onboarding", { replace: true });
    }
  }, [navigate]);

  const toggleChecklist = (i) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const copyText = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text || "");
      setCopied(label);
      setTimeout(() => setCopied(""), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 1000);
  };

  if (!idea) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0a0a14]">
        <p className="text-white/60">Loading your idea...</p>
      </main>
    );
  }

  const {
    businessName,
    tagline,
    idea: description,
    targetCustomers = [],
    pricing = {},
    materials = [],
    startupChecklist = [],
    startupCost,
    profitPerSale,
    breakEvenSales,
    weeklyTimeCommitment,
    instaBio,
    whatsappPitch,
    competitorLandscape,
    firstWeekPlan = {},
    localMarketingTips = []
  } = idea;

  const checklistProgress = Math.round(
    (checked.size / (startupChecklist.length || 1)) * 100
  );

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    whatsappPitch || ""
  )}`;

  const tabs = ["overview", "financials", "checklist", "brand kit"];

  return (
    <main className="min-h-screen bg-[#0a0a14] px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* HERO */}
        <div className="bg-[#1a1a2e] border border-white/10 rounded-3xl p-8">
          <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold uppercase">
            ✨ Your Business Idea
          </span>

          <h1
            style={{ fontFamily: "Georgia, serif" }}
            className="text-4xl font-bold text-white mt-3"
          >
            {businessName}
          </h1>

          <p className="text-orange-400 italic mt-2">{tagline}</p>

          <p className="text-white/70 mt-5 border-l-2 border-orange-500 pl-4">
            {description}
          </p>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: "💰", label: "Startup Cost", value: startupCost },
            { icon: "📈", label: "Profit / Sale", value: profitPerSale },
            { icon: "🎯", label: "Break-even", value: `${breakEvenSales} sales` },
            { icon: "⏱️", label: "Time / week", value: weeklyTimeCommitment }
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[#1a1a2e] border border-white/10 rounded-xl p-4 text-center"
            >
              <div className="text-2xl">{s.icon}</div>
              <div className="text-lg text-orange-400 font-bold mt-1">
                {s.value || "—"}
              </div>
              <div className="text-white/40 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm capitalize ${
                activeTab === tab
                  ? "bg-orange-500 text-white"
                  : "bg-[#1a1a2e] text-white/60 border border-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            {/* Target Customers */}
            <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-3">
                🎯 Target Customers
              </h2>
              <div className="flex flex-wrap gap-2">
                {targetCustomers.length > 0 ? (
                  targetCustomers.map((c, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-300 text-sm"
                    >
                      {c}
                    </span>
                  ))
                ) : (
                  <p className="text-white/40 text-sm">No target customers specified.</p>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-3">
                💵 Pricing
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Per unit", value: pricing.perUnit },
                  { label: "Weekly", value: pricing.weeklyPlan },
                  { label: "Monthly", value: pricing.monthlyPlan },
                ].map((p) => (
                  <div
                    key={p.label}
                    className="bg-[#0f0f1f] rounded-lg p-3 text-center"
                  >
                    <div className="text-orange-400 font-bold">
                      {p.value || "—"}
                    </div>
                    <div className="text-white/40 text-xs mt-1">{p.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Materials */}
            <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-3">
                🛒 Materials Needed
              </h2>
              {materials.length > 0 ? (
                materials.map((m, i) => (
                  <p key={i} className="text-white/70 text-sm">
                    • {m}
                  </p>
                ))
              ) : (
                <p className="text-white/40 text-sm">No materials specified.</p>
              )}
            </div>

            {/* Launch Plan */}
            <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-3">
                🚀 First Week Launch Plan
              </h2>
              {Object.keys(firstWeekPlan).length > 0 ? (
                Object.entries(firstWeekPlan).map(([day, task]) => (
                  <p key={day} className="text-white/70 text-sm">
                    <span className="text-orange-400 capitalize font-semibold">
                      {day}
                    </span>{" "}
                    — {task}
                  </p>
                ))
              ) : (
                <p className="text-white/40 text-sm">No launch plan available.</p>
              )}
            </div>

            {/* Marketing Tips */}
            <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-3">
                📣 Marketing Tips
              </h2>
              {localMarketingTips.length > 0 ? (
                localMarketingTips.map((tip, i) => (
                  <p key={i} className="text-white/70 text-sm">
                    • {tip}
                  </p>
                ))
              ) : (
                <p className="text-white/40 text-sm">No marketing tips available.</p>
              )}
            </div>

            {/* Market Insight */}
            <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-3">
                🧠 Market Insight
              </h2>
              <p className="text-white/70 text-sm">
                {competitorLandscape || "No market insight available."}
              </p>
            </div>
          </div>
        )}

        {/* FINANCIALS */}
        {activeTab === "financials" && (
          <div className="space-y-4">
            {/* Financial Overview */}
            <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-4">
                💰 Financial Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0f0f1f] rounded-lg p-4">
                  <div className="text-white/40 text-sm mb-1">Startup Cost</div>
                  <div className="text-orange-400 text-2xl font-bold">
                    {startupCost || "—"}
                  </div>
                </div>
                <div className="bg-[#0f0f1f] rounded-lg p-4">
                  <div className="text-white/40 text-sm mb-1">Profit per Sale</div>
                  <div className="text-orange-400 text-2xl font-bold">
                    {profitPerSale || "—"}
                  </div>
                </div>
                <div className="bg-[#0f0f1f] rounded-lg p-4">
                  <div className="text-white/40 text-sm mb-1">
                    Break-even Sales
                  </div>
                  <div className="text-orange-400 text-2xl font-bold">
                    {breakEvenSales || "—"} sales
                  </div>
                </div>
                <div className="bg-[#0f0f1f] rounded-lg p-4">
                  <div className="text-white/40 text-sm mb-1">
                    Weekly Time Commitment
                  </div>
                  <div className="text-orange-400 text-2xl font-bold">
                    {weeklyTimeCommitment || "—"}
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Details */}
            <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-4">
                💵 Pricing Strategy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Per Unit", value: pricing.perUnit },
                  { label: "Weekly Plan", value: pricing.weeklyPlan },
                  { label: "Monthly Plan", value: pricing.monthlyPlan },
                ].map((p) => (
                  <div
                    key={p.label}
                    className="bg-[#0f0f1f] rounded-lg p-4 text-center"
                  >
                    <div className="text-white/40 text-sm mb-2">{p.label}</div>
                    <div className="text-orange-400 text-xl font-bold">
                      {p.value || "—"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CHECKLIST */}
        {activeTab === "checklist" && (
          <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
            <h2 className="text-white text-xl font-bold mb-4">
              Startup Checklist
            </h2>
            {startupChecklist.length > 0 ? (
              startupChecklist.map((item, i) => (
                <div
                  key={i}
                  onClick={() => toggleChecklist(i)}
                  className="flex gap-3 py-2 cursor-pointer hover:bg-white/5 rounded-lg transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={checked.has(i)}
                    readOnly
                    className="cursor-pointer"
                  />
                  <span className="text-white/80 text-sm">{item}</span>
                </div>
              ))
            ) : (
              <p className="text-white/40 text-sm">No checklist items available.</p>
            )}
            <div className="mt-4 text-orange-400 text-sm">
              Progress: {checklistProgress}%
            </div>
          </div>
        )}

        {/* BRAND KIT */}
        {activeTab === "brand kit" && (
          <div className="space-y-4">
            <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-3">
                Instagram Bio
              </h2>
              <p className="text-white/80 mb-4">
                {instaBio || "No Instagram bio available."}
              </p>
              <button
                onClick={() => copyText(instaBio, "insta")}
                className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white transition-colors disabled:opacity-50"
                disabled={!instaBio}
              >
                {copied === "insta" ? "Copied!" : "Copy Bio"}
              </button>
            </div>

            <div className="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h2 className="text-white text-xl font-bold mb-3">
                WhatsApp Pitch
              </h2>
              <p className="text-white/80 mb-4">
                {whatsappPitch || "No WhatsApp pitch available."}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => copyText(whatsappPitch, "wa")}
                  className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white transition-colors disabled:opacity-50"
                  disabled={!whatsappPitch}
                >
                  {copied === "wa" ? "Copied!" : "Copy"}
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white transition-colors disabled:opacity-50"
                  aria-label="Open WhatsApp with pitch"
                >
                  Open WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/onboarding");
            }}
            className="border border-white/20 hover:border-white/40 px-4 py-2 rounded-lg text-white/60 hover:text-white/80 transition-colors"
          >
            Start over
          </button>
          <button
            onClick={handleSave}
            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white transition-colors disabled:opacity-50"
            disabled={saving || saved}
          >
            {saved ? "Saved!" : saving ? "Saving..." : "Save Idea"}
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white transition-colors"
          >
            View Dashboard
          </button>
        </div>

      </div>
    </main>
  );
}

export default Results;
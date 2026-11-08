"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import RegistrationForm from "@/components/RegistrationForm";
import AdminPanel from "@/components/AdminPanel";
import MembershipCard from "@/components/MembershipCard";
import { Dumbbell, Shield, CheckCircle } from "lucide-react";
import { fetchStats } from "@/lib/api";

export default function Home() {
  const [activeTab, setActiveTab] = useState("register");
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberCount, setMemberCount] = useState(0);

  const loadCount = async () => {
    try {
      const stats = await fetchStats();
      if (stats && typeof stats.total === "number") {
        setMemberCount(stats.total);
      }
    } catch (e) {
      console.warn("Stats load warning:", e);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("tab") === "admin" || window.location.hash === "#admin") {
        setActiveTab("admin");
      }
    }
  }, []);

  useEffect(() => {
    loadCount();
  }, [activeTab]);

  const handleRegistrationSuccess = (newMember) => {
    setSelectedMember(newMember);
    loadCount();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100 font-sans selection:bg-amber-500/20 selection:text-amber-300">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        memberCount={memberCount}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Subtle Welcome & Info Header */}
        <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold flex-shrink-0">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  FG & S.M Fitness Gym
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400">
                  {activeTab === "register" ? "Admission Desk" : "Administration Portal"}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
                {activeTab === "register"
                  ? "Member Admission & Membership Pass Generator"
                  : "Executive Management & Record Tracking System"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400 self-stretch md:self-auto justify-between md:justify-end border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
            <div>
              <p className="text-[10px] uppercase font-semibold text-slate-500">Owners & Directors</p>
              <p className="text-slate-200 font-medium">Saqib Mehmood • Ali Daud</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase font-semibold text-slate-500">API Connection</p>
              <p className="text-emerald-400 font-medium flex items-center gap-1 justify-end">
                <CheckCircle className="w-3 h-3 text-emerald-400" /> Backend Online
              </p>
            </div>
          </div>
        </div>

        {/* View Switching */}
        {activeTab === "register" ? (
          <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
        ) : (
          <AdminPanel
            onViewCard={(member) => setSelectedMember(member)}
            onNewRegistration={() => setActiveTab("register")}
          />
        )}

      </main>

      {/* Printable Membership Card Modal */}
      {selectedMember && (
        <MembershipCard
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            © {new Date().getFullYear()} <strong className="text-slate-300">FG & S.M Fitness Gym</strong>. All Rights Reserved.
          </p>
          <p className="text-slate-400">
            Owned & Managed by <strong className="text-amber-400 font-medium">Saqib Mehmood</strong> & <strong className="text-amber-400 font-medium">Ali Daud</strong>
          </p>
        </div>
      </footer>

    </div>
  );
}

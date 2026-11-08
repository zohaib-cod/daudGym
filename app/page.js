"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import RegistrationForm from "@/components/RegistrationForm";
import MembershipCard from "@/components/MembershipCard";
import { Dumbbell } from "lucide-react";

export default function Home() {
  const [selectedMember, setSelectedMember] = useState(null);

  const handleRegistrationSuccess = (newMember) => {
    setSelectedMember(newMember);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100 font-sans selection:bg-amber-500/20 selection:text-amber-300">
      
      {/* Public Navbar without admin links */}
      <Navbar isAdmin={false} />

      {/* Main Content: Admission Desk */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 lg:py-10">
        
        {/* Welcome Header Card - Mobile Optimized */}
        <div className="mb-5 sm:mb-8 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold flex-shrink-0">
              <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
                <span className="uppercase tracking-widest text-amber-400 font-bold text-[11px] sm:text-xs">
                  FG &amp; S.M Fitness Gym
                </span>
                <span className="text-slate-600 hidden xs:inline">•</span>
                <span className="text-slate-400 text-[11px] sm:text-xs">
                  Admission Desk
                </span>
              </div>
              <h2 className="text-sm sm:text-xl font-bold text-white tracking-tight mt-0.5 leading-snug">
                Member Admission &amp; Membership Pass Generator
              </h2>
            </div>
          </div>

          <div className="w-full sm:w-auto text-xs text-slate-400 border-t sm:border-t-0 border-slate-800/80 pt-2.5 sm:pt-0 text-left sm:text-right flex-shrink-0">
            <p className="text-[10px] uppercase font-semibold text-slate-500">Owners &amp; Directors</p>
            <p className="text-slate-200 font-medium text-xs">Saqib Mehmood • Ali Daud</p>
          </div>
        </div>

        {/* Public Registration Form */}
        <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />

      </main>

      {/* Printable Membership Card Modal upon successful registration */}
      {selectedMember && (
        <MembershipCard
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}

      {/* Public Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-5 sm:py-6 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} <strong className="text-slate-300">FG &amp; S.M Fitness Gym</strong>. All Rights Reserved.
          </p>
          <p className="text-slate-400">
            Supervised &amp; Managed by <strong className="text-amber-400 font-medium">Saqib Mehmood</strong> &amp; <strong className="text-amber-400 font-medium">Ali Daud</strong>
          </p>
        </div>
      </footer>

    </div>
  );
}

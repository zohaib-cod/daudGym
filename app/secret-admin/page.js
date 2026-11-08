"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import AdminLogin from "@/components/AdminLogin";
import AdminPanel from "@/components/AdminPanel";
import MembershipCard from "@/components/MembershipCard";
import { Dumbbell, Shield } from "lucide-react";
import { fetchStats } from "@/lib/api";
import { getAdminSession, clearAdminSession } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function SecretAdminPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberCount, setMemberCount] = useState(0);

  // Check saved authentication session on mount
  useEffect(() => {
    const session = getAdminSession();
    if (session) {
      setCurrentUser(session);
    }
    setAuthChecked(true);
  }, []);

  // Fetch stats when logged in
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
    if (currentUser) {
      loadCount();
    }
  }, [currentUser]);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    clearAdminSession();
    setCurrentUser(null);
  };

  // Prevent flash of login before checking local session
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080c14] text-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400 font-medium">Verifying authorization...</p>
        </div>
      </div>
    );
  }

  // If not logged in, render the login gate
  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100 font-sans selection:bg-amber-500/20 selection:text-amber-300">
        <Navbar isAdmin={false} />
        <main className="flex-1 flex items-center justify-center">
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
        </main>
        <footer className="border-t border-slate-800/80 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
          <p>FG &amp; S.M Fitness Gym • Restricted Executive Console</p>
        </footer>
      </div>
    );
  }

  // If logged in, render full Admin Console!
  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100 font-sans selection:bg-amber-500/20 selection:text-amber-300">
      
      {/* Protected Admin Navbar */}
      <Navbar
        isAdmin={true}
        user={currentUser}
        onLogout={handleLogout}
        memberCount={memberCount}
      />

      {/* Main Admin Console */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Admin Header - Mobile Optimized */}
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
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 text-[11px] sm:text-xs">
                  Secret Administration Console
                </span>
              </div>
              <h2 className="text-sm sm:text-xl font-bold text-white tracking-tight mt-0.5 leading-snug">
                Executive Management &amp; Record Tracking System
              </h2>
            </div>
          </div>

          <div className="w-full sm:w-auto text-xs text-slate-400 border-t sm:border-t-0 border-slate-800/80 pt-2.5 sm:pt-0 text-left sm:text-right flex-shrink-0">
            <p className="text-[10px] uppercase font-semibold text-slate-500">Owners &amp; Directors</p>
            <p className="text-slate-200 font-medium text-xs">Saqib Mehmood • Ali Daud</p>
          </div>
        </div>

        {/* Full Admin Management Component */}
        <AdminPanel
          onViewCard={(member) => setSelectedMember(member)}
          onNewRegistration={() => router.push("/")}
        />

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
            Owned & Managed by <span className="text-amber-400 font-semibold">Saqib Mehmood</span> &amp; <span className="text-amber-400 font-semibold">Ali Daud</span>
          </p>
        </div>
      </footer>

    </div>
  );
}


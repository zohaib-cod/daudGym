"use client";

import React from "react";
import { Dumbbell, Shield, LogOut, ExternalLink, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Navbar({ isAdmin = false, user = null, onLogout = null, memberCount = null }) {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3.5 gap-4">
          
          {/* Gym Title & Owners */}
          <Link href="/" className="flex items-center space-x-3.5 group">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/30 flex-shrink-0 group-hover:scale-105 transition-transform">
              <Dumbbell className="h-6 w-6 text-slate-950 font-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                  FG & S.M <span className="text-amber-400 font-semibold text-lg sm:text-xl">Fitness Gym</span>
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-xs text-slate-400 mt-0.5">
                <span className="inline-flex items-center gap-1 font-medium text-slate-300">
                  <Shield className="w-3 h-3 text-amber-400" />
                  Owner: <strong className="text-slate-100 font-semibold">Saqib Mehmood</strong>
                </span>
                <span className="text-slate-600">•</span>
                <span className="inline-flex items-center gap-1 font-medium text-slate-300">
                  <Shield className="w-3 h-3 text-amber-400" />
                  Owner: <strong className="text-slate-100 font-semibold">Ali Daud</strong>
                </span>
              </div>
            </div>
          </Link>

          {/* Right Header Controls */}
          {isAdmin ? (
            <div className="flex items-center gap-3 self-start md:self-auto">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300 font-medium">Logged in:</span>
                <strong className="text-amber-400">{user?.displayName || "Admin"}</strong>
                {typeof memberCount === "number" && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono text-[11px]">
                    {memberCount} records
                  </span>
                )}
              </div>

              <Link
                href="/"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition-colors"
                title="Open Public Admission Desk"
              >
                <span>Admission Desk</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              {onLogout && (
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/30 hover:bg-red-950/60 text-red-300 border border-red-500/30 text-xs font-semibold transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3 self-start md:self-auto">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-300 font-medium">Official Admission Portal</span>
                <span className="text-slate-600">•</span>
                <span className="text-amber-400 font-semibold">2026 Season</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}

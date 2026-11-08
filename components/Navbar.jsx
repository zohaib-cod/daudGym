"use client";

import React from "react";
import { Dumbbell, LayoutDashboard, UserPlus, Shield } from "lucide-react";

export default function Navbar({ activeTab, setActiveTab, memberCount }) {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3.5 gap-4">
          
          {/* Gym Title & Owners */}
          <div className="flex items-center space-x-3.5">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/30 flex-shrink-0">
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
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-sm font-medium self-start md:self-auto">
            <button
              onClick={() => setActiveTab("register")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === "register"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Registration Desk</span>
            </button>

            <button
              onClick={() => setActiveTab("admin")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === "admin"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Admin Panel</span>
              {typeof memberCount === "number" && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    activeTab === "admin"
                      ? "bg-slate-950 text-amber-300"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {memberCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}

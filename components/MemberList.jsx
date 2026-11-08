"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Users,
  Printer,
  Trash2,
  Phone,
  CreditCard,
  MapPin,
  Calendar,
  RefreshCw,
  Database,
  AlertCircle,
  Eye,
} from "lucide-react";

export default function MemberList({ onSelectMember, onViewCard }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataSource, setDataSource] = useState("");
  const [dbStatus, setDbStatus] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchMembers = async (search = "") => {
    setLoading(true);
    try {
      const url = search
        ? `/api/members?search=${encodeURIComponent(search)}`
        : "/api/members";
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setMembers(data.members || []);
        setDataSource(data.dataSource || "local");
        setDbStatus(data.dbStatus || "");
      }
    } catch (err) {
      console.error("Failed to load members:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers(searchTerm);
  }, [searchTerm]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete membership record for ${name}?`)) {
      return;
    }
    setDeletingId(id);
    try {
      const res = await fetch(`/api/members/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMembers((prev) => prev.filter((m) => (m._id || m.membershipId) !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Bar: Search & Status */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                Registered Members
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {members.length} {members.length === 1 ? "Record" : "Records"}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Active members directory with instant card printing and verified CNIC records.
            </p>
          </div>

          {/* Database Health Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <Database className="w-3.5 h-3.5 text-amber-400" />
              <span>
                Storage:{" "}
                <strong className={dataSource === "mongodb" ? "text-emerald-400" : "text-amber-400"}>
                  {dataSource === "mongodb" ? "MongoDB Atlas" : "Local Storage"}
                </strong>
              </span>
            </div>

            <button
              onClick={() => fetchMembers(searchTerm)}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
              title="Refresh Records"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-amber-400" : ""}`} />
            </button>
          </div>

        </div>

        {/* Search Input */}
        <div className="mt-5 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Name, Father name, CNIC (e.g. 35201...), Contact, or ID..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Members Grid / List */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-amber-400 mb-3" />
          <p className="text-sm">Loading member records...</p>
        </div>
      ) : members.length === 0 ? (
        <div className="py-16 text-center bg-slate-900/40 rounded-2xl border border-slate-800/80 p-8">
          <AlertCircle className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-300">No Members Found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchTerm
              ? `No registered members match "${searchTerm}". Try a different keyword.`
              : "No members have registered yet. Use the 'New Registration' tab to add the first member."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {members.map((member) => {
            const memberId = member._id || member.membershipId;
            const formattedDate = member.createdAt
              ? new Date(member.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Active";

            return (
              <div
                key={memberId}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-18 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 flex-shrink-0 shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.picture}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-mono text-amber-400 font-semibold truncate">
                          {member.membershipId}
                        </span>
                        <span className="text-[9px] uppercase px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {member.status || "ACTIVE"}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white truncate mt-0.5">
                        {member.name}
                      </h4>
                      <p className="text-xs text-slate-400 truncate">
                        S/O {member.fatherName}
                      </p>
                    </div>
                  </div>

                  {/* Details List */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                      <span className="font-mono text-slate-200">{member.idCardNo}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                      <span className="text-slate-200">{member.contact}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-400 truncate text-[11px] leading-snug">
                        {member.address}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                      <Calendar className="w-3 h-3 text-slate-600 flex-shrink-0" />
                      <span>Joined: {formattedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onViewCard(member)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Card</span>
                  </button>

                  <button
                    onClick={() => handleDelete(memberId, member.name)}
                    disabled={deletingId === memberId}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-colors border border-transparent hover:border-red-900/40"
                    title="Delete member record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}


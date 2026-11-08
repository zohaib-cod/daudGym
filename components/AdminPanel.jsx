"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  Printer,
  Trash2,
  Phone,
  CreditCard,
  MapPin,
  Calendar,
  RefreshCw,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  Shield,
  Dumbbell,
  AlertTriangle,
  UserCheck,
  X,
  ExternalLink,
} from "lucide-react";
import { fetchMembers, fetchStats, updateMemberStatus, deleteMember } from "@/lib/api";

export default function AdminPanel({ onViewCard, onNewRegistration }) {
  const [members, setMembers] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0, thisMonth: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dataSource, setDataSource] = useState("mongodb");
  const [selectedMemberModal, setSelectedMemberModal] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [membersData, statsData] = await Promise.all([
        fetchMembers({ search: searchTerm, status: statusFilter }),
        fetchStats(),
      ]);

      if (membersData.success) {
        setMembers(membersData.members || []);
        setDataSource(membersData.dataSource || "local");
      }
      if (statsData) {
        setStats(statsData);
      }
    } catch (err) {
      console.error("Admin load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchTerm, statusFilter]);

  // Handle status toggle (Active / Inactive)
  const handleStatusChange = async (memberId, newStatus) => {
    setActionLoadingId(memberId);
    try {
      await updateMemberStatus(memberId, newStatus);
      setMembers((prev) =>
        prev.map((m) =>
          (m._id || m.membershipId) === memberId ? { ...m, status: newStatus } : m
        )
      );
      // Refresh stats
      const updatedStats = await fetchStats();
      if (updatedStats) setStats(updatedStats);
    } catch (err) {
      alert("Failed to update status: " + err.message);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Handle member delete
  const handleDelete = async (memberId, name) => {
    if (!window.confirm(`Are you sure you want to delete member record: "${name}"?`)) {
      return;
    }
    setActionLoadingId(memberId);
    try {
      await deleteMember(memberId);
      setMembers((prev) => prev.filter((m) => (m._id || m.membershipId) !== memberId));
      if (selectedMemberModal?._id === memberId) {
        setSelectedMemberModal(null);
      }
      const updatedStats = await fetchStats();
      if (updatedStats) setStats(updatedStats);
    } catch (err) {
      alert("Failed to delete record: " + err.message);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Export to CSV for Excel
  const exportToCSV = () => {
    if (members.length === 0) {
      alert("No records to export.");
      return;
    }

    const headers = [
      "Membership ID",
      "Full Name",
      "Father Name",
      "Contact",
      "ID Card / CNIC",
      "Address",
      "Status",
      "Joined Date",
      "Photo URL",
    ];

    const rows = members.map((m) => [
      `"${m.membershipId || ""}"`,
      `"${m.name || ""}"`,
      `"${m.fatherName || ""}"`,
      `"${m.contact || ""}"`,
      `"${m.idCardNo || ""}"`,
      `"${(m.address || "").replace(/"/g, '""')}"`,
      `"${m.status || "Active"}"`,
      `"${m.createdAt ? new Date(m.createdAt).toLocaleDateString() : ""}"`,
      `"${m.picture || ""}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `FG_SM_Gym_Members_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner / Owners Attribution */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Official Administration Console
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Gym Management & Records
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Supervised by Owners: <strong className="text-slate-200">Saqib Mehmood</strong> & <strong className="text-slate-200">Ali Daud</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all shadow-sm"
              title="Download Excel / CSV"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onNewRegistration}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-500/20"
            >
              <Users className="w-4 h-4" />
              <span>New Admission</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Members */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Members
            </p>
            <p className="text-2xl font-black text-white mt-0.5">{stats.total}</p>
          </div>
        </div>

        {/* Active Passes */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Active Passes
            </p>
            <p className="text-2xl font-black text-emerald-400 mt-0.5">{stats.active}</p>
          </div>
        </div>

        {/* Inactive Passes */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Inactive / Pending
            </p>
            <p className="text-2xl font-black text-slate-300 mt-0.5">{stats.inactive}</p>
          </div>
        </div>

        {/* This Month Admissions */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              This Month
            </p>
            <p className="text-2xl font-black text-blue-400 mt-0.5">{stats.thisMonth}</p>
          </div>
        </div>
      </div>

      {/* Search & Filters Controls */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, father name, CNIC (35201...), phone, address, ID..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
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

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            {["All", "Active", "Inactive"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  statusFilter === st
                    ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Refresh Button */}
          <button
            onClick={loadData}
            className="p-2.5 text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 rounded-xl border border-slate-800 transition-colors"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-amber-400" : ""}`} />
          </button>

        </div>
      </div>

      {/* Main Members Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        {loading ? (
          <div className="py-24 text-center text-slate-400">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-amber-400 mb-3" />
            <p className="text-sm">Fetching all member records...</p>
          </div>
        ) : members.length === 0 ? (
          <div className="py-20 text-center p-6">
            <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-300">No Member Records Found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {searchTerm
                ? `No members match "${searchTerm}".`
                : "No members have been enrolled yet. Click 'New Admission' to register."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4">Member Info</th>
                  <th className="py-3.5 px-4">ID Card / CNIC</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Address</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Joined</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-xs">
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
                    <tr
                      key={memberId}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Member Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={member.picture}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm leading-snug">
                              {member.name}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              S/O {member.fatherName}
                            </p>
                            <span className="font-mono text-[10px] text-amber-400/90 font-semibold">
                              {member.membershipId}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* CNIC */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-slate-200 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                          {member.idCardNo}
                        </span>
                      </td>

                      {/* Contact */}
                      <td className="py-3.5 px-4 text-slate-300">
                        <a
                          href={`tel:${member.contact}`}
                          className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5 text-slate-500" />
                          <span>{member.contact}</span>
                        </a>
                      </td>

                      {/* Address */}
                      <td className="py-3.5 px-4 text-slate-400 max-w-[200px] truncate">
                        {member.address}
                      </td>

                      {/* Status Toggle Dropdown */}
                      <td className="py-3.5 px-4">
                        <select
                          value={member.status || "Active"}
                          onChange={(e) => handleStatusChange(memberId, e.target.value)}
                          disabled={actionLoadingId === memberId}
                          className={`text-xs font-bold uppercase rounded-lg px-2.5 py-1 bg-slate-950 border transition-all cursor-pointer ${
                            (member.status || "Active") === "Active"
                              ? "text-emerald-400 border-emerald-500/30 hover:border-emerald-500/60"
                              : "text-slate-400 border-slate-700 hover:border-slate-600"
                          }`}
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </td>

                      {/* Joined Date */}
                      <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                        {formattedDate}
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedMemberModal(member)}
                            className="p-1.5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
                            title="View Full Profile"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => onViewCard(member)}
                            className="p-1.5 text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
                            title="Print Membership Card"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(memberId, member.name)}
                            disabled={actionLoadingId === memberId}
                            className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors border border-transparent hover:border-red-900/40"
                            title="Delete Member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Member Details Modal */}
      {selectedMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Member Profile Record</h3>
              <button
                onClick={() => setSelectedMemberModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-24 rounded-xl overflow-hidden border-2 border-amber-500/40 bg-slate-950 flex-shrink-0 shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedMemberModal.picture}
                    alt={selectedMemberModal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                    {selectedMemberModal.membershipId}
                  </span>
                  <h4 className="text-lg font-bold text-white leading-tight">
                    {selectedMemberModal.name}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Father: {selectedMemberModal.fatherName}
                  </p>
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {selectedMemberModal.status || "Active"}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                    ID Card / CNIC:
                  </span>
                  <span className="font-mono text-slate-200 font-medium">
                    {selectedMemberModal.idCardNo}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                    Phone / Contact:
                  </span>
                  <span className="text-slate-200 font-medium">{selectedMemberModal.contact}</span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                    Address:
                  </span>
                  <span className="text-slate-300">{selectedMemberModal.address}</span>
                </div>

                {selectedMemberModal.picture && (
                  <div className="pt-1">
                    <a
                      href={selectedMemberModal.picture}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-[11px] font-semibold"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View Original Cloudinary Photo</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end gap-2.5">
              <button
                onClick={() => setSelectedMemberModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const m = selectedMemberModal;
                  setSelectedMemberModal(null);
                  onViewCard(m);
                }}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-500/20"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Pass</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


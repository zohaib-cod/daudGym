"use client";

import React, { useRef } from "react";
import { Dumbbell, Printer, X, Shield, Phone, CreditCard, MapPin, Calendar } from "lucide-react";

export default function MembershipCard({ member, onClose }) {
  const cardRef = useRef(null);

  if (!member) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = member.createdAt
    ? new Date(member.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-950/50 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <h3 className="font-semibold text-slate-200 text-xs sm:text-sm tracking-wide uppercase">
              Official Gym Membership Pass
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
              title="Print Membership Card"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Pass</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Card Area */}
        <div className="p-3 sm:p-6">
          <div
            ref={cardRef}
            id="printable-card"
            className="relative bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border border-slate-700/80 p-4 sm:p-6 text-slate-100 shadow-xl overflow-hidden print:border-black print:text-black print:bg-white"
          >
            {/* Background Accent Lines */}
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none print:hidden"></div>
            <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-slate-700/20 rounded-full blur-2xl pointer-events-none print:hidden"></div>

            {/* Gym Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 sm:pb-4 mb-4 sm:mb-5 print:border-gray-300 gap-2">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md print:bg-gray-900 print:text-white flex-shrink-0">
                  <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm sm:text-lg font-black tracking-tight text-white uppercase print:text-black leading-tight truncate">
                    FG &amp; S.M Fitness Gym
                  </h2>
                  <p className="text-[10px] sm:text-[11px] text-amber-400 font-semibold uppercase tracking-wider mt-0.5 print:text-gray-600 truncate">
                    Premium Fitness &amp; Training Center
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="inline-block px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 print:border-black print:text-black">
                  {member.status || "ACTIVE"}
                </span>
                <p className="text-[9px] sm:text-[10px] text-slate-400 font-mono mt-0.5 print:text-gray-500">
                  {member.membershipId}
                </p>
              </div>
            </div>

            {/* Member Details Layout */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center sm:items-start">
              
              {/* Photo */}
              <div className="relative mx-auto sm:mx-0 flex-shrink-0">
                <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden border-2 border-amber-500/40 bg-slate-800 shadow-md print:border-gray-400">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.picture}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Data Fields */}
              <div className="flex-1 w-full space-y-2 sm:space-y-2.5 text-xs">
                <div>
                  <p className="text-[9px] sm:text-[10px] uppercase font-semibold text-slate-400 print:text-gray-500 tracking-wider">
                    Member Name
                  </p>
                  <p className="text-sm sm:text-base font-bold text-white print:text-black leading-tight truncate">
                    {member.name}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[9px] sm:text-[10px] uppercase font-semibold text-slate-400 print:text-gray-500 tracking-wider">
                      Father Name
                    </p>
                    <p className="font-medium text-slate-200 print:text-gray-800 truncate">
                      {member.fatherName}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] uppercase font-semibold text-slate-400 print:text-gray-500 tracking-wider">
                      Contact
                    </p>
                    <p className="font-medium text-slate-200 print:text-gray-800 flex items-center gap-1 truncate">
                      <Phone className="w-3 h-3 text-amber-400 print:text-gray-600 flex-shrink-0" />
                      <span className="truncate">{member.contact}</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[9px] sm:text-[10px] uppercase font-semibold text-slate-400 print:text-gray-500 tracking-wider">
                      ID Card / CNIC
                    </p>
                    <p className="font-mono text-slate-200 print:text-gray-800 truncate">
                      {member.idCardNo}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] uppercase font-semibold text-slate-400 print:text-gray-500 tracking-wider">
                      Issue Date
                    </p>
                    <p className="text-slate-200 print:text-gray-800 flex items-center gap-1 truncate">
                      <Calendar className="w-3 h-3 text-slate-400 print:text-gray-600 flex-shrink-0" />
                      <span>{formattedDate}</span>
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-[9px] sm:text-[10px] uppercase font-semibold text-slate-400 print:text-gray-500 tracking-wider">
                    Residential Address
                  </p>
                  <p className="text-slate-300 print:text-gray-700 text-[11px] truncate">
                    {member.address}
                  </p>
                </div>
              </div>

            </div>

            {/* Pass Footer Attribution */}
            <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-800 flex flex-col xs:flex-row items-center justify-between text-[10px] text-slate-400 print:border-gray-300 print:text-gray-600 gap-1 sm:gap-0 text-center sm:text-left">
              <div>
                <span>Owners: </span>
                <strong className="text-slate-200 print:text-black">Saqib Mehmood</strong> &amp;{" "}
                <strong className="text-slate-200 print:text-black">Ali Daud</strong>
              </div>
              <div className="flex items-center gap-1 text-amber-400 font-semibold print:text-gray-700">
                <Shield className="w-3 h-3 flex-shrink-0" />
                <span>Authorized Official Pass</span>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-4 sm:px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex justify-end gap-2.5 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-500/20"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Pass</span>
          </button>
        </div>

      </div>
    </div>
  );
}

"use client";

import React, { useState, useRef } from "react";
import {
  User,
  UserCheck,
  Phone,
  CreditCard,
  MapPin,
  Camera,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { registerMember } from "@/lib/api";

export default function RegistrationForm({ onRegistrationSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    contact: "",
    idCardNo: "",
    address: "",
  });

  const [picturePreview, setPicturePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [storageNotice, setStorageNotice] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload a valid image file (JPEG, PNG, WEBP)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Picture size must be less than 5 MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPicturePreview(reader.result);
      setErrorMsg("");
    };
    reader.readAsDataURL(file);
  };

  const removePicture = () => {
    setPicturePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setStorageNotice("");

    if (!formData.name.trim()) {
      setErrorMsg("Please enter Member Name");
      return;
    }
    if (!formData.fatherName.trim()) {
      setErrorMsg("Please enter Father Name");
      return;
    }
    if (!formData.contact.trim()) {
      setErrorMsg("Please enter Contact Number");
      return;
    }
    if (!formData.idCardNo.trim()) {
      setErrorMsg("Please enter ID Card / CNIC Number");
      return;
    }
    if (!picturePreview) {
      setErrorMsg("Please upload Member Picture");
      return;
    }
    if (!formData.address.trim()) {
      setErrorMsg("Please enter Address");
      return;
    }

    setLoading(true);

    try {
      const data = await registerMember({
        ...formData,
        picture: picturePreview,
      });

      setSuccessMsg("Member successfully registered!");
      if (data.warning) {
        setStorageNotice(data.warning);
      }

      // Reset form
      setFormData({
        name: "",
        fatherName: "",
        contact: "",
        idCardNo: "",
        address: "",
      });
      setPicturePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      if (onRegistrationSuccess && data.member) {
        onRegistrationSuccess(data.member);
      }
    } catch (err) {
      console.error("Registration error:", err);
      setErrorMsg(err.message || "An unexpected error occurred. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 backdrop-blur-sm">
        
        {/* Form Title & Owners Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Admission Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
              Gym Membership Form
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Enter applicant credentials for official enrollment and membership card issuance.
            </p>
          </div>

          <div className="flex sm:flex-col items-start sm:items-end justify-between text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Management
            </span>
            <span className="text-slate-300 font-medium">Saqib Mehmood</span>
            <span className="text-slate-300 font-medium">Ali Daud</span>
          </div>
        </div>

        {/* Notifications */}
        {errorMsg && (
          <div className="mt-6 flex items-start gap-3 p-4 bg-red-950/40 border border-red-800/60 rounded-xl text-red-200 text-sm animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-red-300">Registration Error</p>
              <p className="text-red-300/90 text-xs mt-0.5">{errorMsg}</p>
            </div>
            <button
              onClick={() => setErrorMsg("")}
              className="text-red-400 hover:text-red-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {successMsg && (
          <div className="mt-6 flex items-start gap-3 p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-emerald-200 text-sm animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-emerald-300">Success</p>
              <p className="text-emerald-300/90 text-xs mt-0.5">{successMsg}</p>
              {storageNotice && (
                <p className="text-[11px] text-amber-300/80 mt-1 bg-amber-950/30 p-2 rounded border border-amber-900/40">
                  {storageNotice}
                </p>
              )}
            </div>
            <button
              onClick={() => setSuccessMsg("")}
              className="text-emerald-400 hover:text-emerald-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          
          {/* Picture Upload Area */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Member Picture <span className="text-amber-400">*</span>
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl border border-dashed border-slate-700 bg-slate-950/50 hover:border-slate-600 transition-colors">
              <div className="relative w-32 h-36 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 flex-shrink-0 flex items-center justify-center">
                {picturePreview ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={picturePreview}
                      alt="Member Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removePicture}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-950/80 text-slate-300 hover:text-red-400 hover:bg-slate-900 transition-colors"
                      title="Remove picture"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-500 text-center p-3">
                    <Camera className="w-8 h-8 mb-1.5 text-slate-600" />
                    <span className="text-[11px]">No Photo</span>
                  </div>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left space-y-2">
                <p className="text-sm font-medium text-slate-200">
                  Upload applicant portrait or photo
                </p>
                <p className="text-xs text-slate-400">
                  Uploaded securely to Cloudinary (folder: fg_sm_fitness_members). Max 5MB.
                </p>

                <div className="pt-2 flex flex-wrap gap-2.5 justify-center sm:justify-start">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    id="picture-upload"
                  />
                  <label
                    htmlFor="picture-upload"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-pointer transition-all hover:border-slate-600 shadow-sm"
                  >
                    <UploadCloud className="w-4 h-4 text-amber-400" />
                    <span>{picturePreview ? "Change Picture" : "Choose Picture"}</span>
                  </label>

                  {picturePreview && (
                    <button
                      type="button"
                      onClick={removePicture}
                      className="px-3 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-lg transition-colors border border-transparent hover:border-red-900/40"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Grid: Name & Father Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
              >
                Full Name <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Muhammad Ahmad"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="fatherName"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
              >
                Father Name <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <UserCheck className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="fatherName"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  placeholder="e.g. Tariq Mehmood"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Grid: Contact & Id card No */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="contact"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
              >
                Contact Number <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="e.g. 0300-1234567"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="idCardNo"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
              >
                ID Card / CNIC Number <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <CreditCard className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="idCardNo"
                  name="idCardNo"
                  value={formData.idCardNo}
                  onChange={handleChange}
                  placeholder="e.g. 35201-1234567-1"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-mono"
                  required
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
            >
              Residential Address <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3.5 flex items-center pointer-events-none text-slate-500">
                <MapPin className="w-4 h-4" />
              </div>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                placeholder="e.g. House # 12, Street 4, Sector G, Lahore"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all resize-none"
                required
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                loading
                  ? "bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700"
                  : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20 active:scale-[0.99]"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Registering Member & Uploading to Cloudinary...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Submit Registration & Generate Pass</span>
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-500 mt-3">
              Official registration for FG & S.M Fitness Gym • Supervised by Saqib Mehmood & Ali Daud
            </p>
          </div>

        </form>

      </div>
    </div>
  );
}

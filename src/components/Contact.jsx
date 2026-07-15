import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle, Flame } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, sending, success, error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all required fields.");
      return;
    }
    
    setStatus("sending");
    
    // Simulate API request
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1800);
  };

  return (
    <section id="contact" className="py-32 w-full max-w-6xl mx-auto px-6 relative">
      <div className="absolute right-0 top-1/4 w-80 h-80 rounded-full bg-[#eab308]/5 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute left-1/4 bottom-0 w-80 h-80 rounded-full bg-[#eab308]/5 blur-[120px] pointer-events-none animate-pulse-slow" />

      {/* Section Title */}
      <div className="mb-20 text-center">
        <h2 className="font-display text-xs uppercase tracking-[0.25em] text-[#eab308] mb-2 font-bold flex items-center justify-center gap-2">
          <Flame className="w-4 h-4 text-[#eab308]" />
          <span>Contact Gateway</span>
        </h2>
        <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
          Initiate Connection
        </h3>
        <p className="text-slate-400 mt-4 max-w-md mx-auto">
          Reach out for potential internships, job opportunities, or to discuss technical pipelines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-10">
        
        {/* Left Side: Contact Information */}
        <div className="lg:col-span-5 space-y-8 lg:pr-8">
          <h4 className="font-display text-2xl font-bold text-slate-100 mb-6">
            Gateway Coordinates
          </h4>

          {/* Contact Methods details */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 group cursor-pointer select-all">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 group-hover:border-[#eab308]/30 transition-all duration-300">
                <Mail className="w-5 h-5 text-[#eab308]" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Email Drop</div>
                <div className="text-sm font-semibold text-slate-350 text-slate-200 mt-0.5 group-hover:text-[#eab308] transition-colors">
                  ommate.mca@gmail.com
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 group cursor-default select-none">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 group-hover:border-[#d97706]/30 transition-all duration-300">
                <MapPin className="w-5 h-5 text-[#d97706]" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Location</div>
                <div className="text-sm font-semibold text-slate-350 text-slate-200 mt-0.5 group-hover:text-[#d97706] transition-colors">
                  Maharashtra, India
                </div>
              </div>
            </div>
          </div>

          {/* Direct Social Shortcuts */}
          <div className="border-t border-white/5 pt-8">
            <h5 className="text-[10px] uppercase tracking-widest font-mono text-slate-500 mb-4 block">Networks</h5>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl border border-white/5 bg-white/3 hover:bg-[#eab308]/10 text-slate-400 hover:text-[#eab308] hover:border-[#eab308]/20 flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl border border-white/5 bg-white/3 hover:bg-[#d97706]/10 text-slate-400 hover:text-[#d97706] hover:border-[#d97706]/20 flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Message form */}
        <div className="lg:col-span-7 glassmorphism rounded-2xl p-6 md:p-8 border-white/5 border relative overflow-hidden">
          
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <CheckCircle className="w-16 h-16 text-[#eab308] mb-6 animate-pulse" />
              <h4 className="font-display font-bold text-2xl text-slate-100 mb-2">
                Transmission Received
              </h4>
              <p className="text-slate-450 text-slate-400 max-w-sm text-sm mb-8 leading-relaxed">
                Thank you. Your packet has been successfully sent. I will review and respond as soon as possible.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="px-6 py-2.5 rounded-full border border-white/10 hover:border-[#eab308]/40 hover:bg-[#eab308]/5 text-xs text-[#eab308] uppercase tracking-wider font-semibold transition-all duration-300 clickable"
              >
                Send Another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 font-mono font-semibold">
                    Name <span className="text-[#eab308]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter name"
                    className="w-full px-4 py-3 rounded-xl bg-[#000000]/65 border border-white/5 focus:border-[#eab308] outline-none text-sm text-slate-200 transition-colors focus:shadow-[0_0_15px_rgba(234,179,8,0.1)] placeholder-zinc-700"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 font-mono font-semibold">
                    Email Address <span className="text-[#eab308]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#000000]/65 border border-white/5 focus:border-[#eab308] outline-none text-sm text-slate-200 transition-colors focus:shadow-[0_0_15px_rgba(234,179,8,0.1)] placeholder-zinc-700"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-slate-500 font-mono font-semibold">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Inquiry Topic"
                  className="w-full px-4 py-3 rounded-xl bg-[#000000]/65 border border-white/5 focus:border-[#eab308] outline-none text-sm text-slate-200 transition-colors focus:shadow-[0_0_15px_rgba(234,179,8,0.1)] placeholder-zinc-700"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-slate-500 font-mono font-semibold">
                  Message <span className="text-[#eab308]">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Enter message details"
                  className="w-full px-4 py-3 rounded-xl bg-[#000000]/65 border border-white/5 focus:border-[#eab308] outline-none text-sm text-slate-200 transition-colors focus:shadow-[0_0_15px_rgba(234,179,8,0.1)] placeholder-zinc-700 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "sending"}
                className={`w-full py-4 rounded-xl text-xs uppercase tracking-widest font-bold font-display select-none transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  status === "sending"
                    ? "bg-white/10 text-slate-550 border border-white/5 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#d97706] to-[#eab308] text-slate-950 hover:shadow-lg hover:shadow-[#eab308]/20 hover:scale-[1.01] active:scale-95"
                }`}
              >
                {status === "sending" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#eab308] border-t-transparent rounded-full animate-spin" />
                    <span>Synchronizing Packets...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Transmit Message</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import clinicPhoto from "./assets/clinic-building.jpg";
import logo from "./assets/logo.png";
import {
  Stethoscope,
  HeartPulse,
  Brain,
  Activity,
  Phone,
  MapPin,
  Clock,
  Calendar as CalendarIcon,
  ChevronRight,
  Check,
  Menu,
  X,
  UserCog,
  Users,
  Trash2,
  Plus,
  ArrowLeft,
  CheckCircle2,
  Lock,
  KeyRound,
} from "lucide-react";

// ====== BACKEND MANZILI ======
// Backendni deploy qilgach shu yerga uning manzilini yozing.
// Masalan: "https://pahlavon-backend.onrender.com"
const API_BASE_URL = "https://pahlavon-backend.onrender.com";

// Footer'dagi "by Khazratov" shu havolaga olib boradi — o'zingizning
// Telegram/Instagram/portfolio manzilingizni shu yerga yozing.
const DEVELOPER_LINK = "https://t.me/xyscze";

// ---- Token tizimi: Choyxona Cream / Belbog' Navy / Zafar Blue / Kurash Gold ----
const C = {
  bg: "#F7EFDD",
  bgAlt: "#EFE4C8",
  surface: "#FFFFFF",
  primary: "#14263F",
  primaryDark: "#0B1929",
  primarySoft: "#1D3555",
  accent: "#2F5FFF",
  gold: "#C77D2E",
  silver: "#93999F",
  bronze: "#B87333",
  text: "#16202C",
  muted: "#5B6672",
  onNavyMuted: "#9BB0C7",
  border: "#E3D5AE",
  danger: "#C0392B",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700;9..144,900&family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
`;

function ChampionBelt({ color = C.gold, width = 260, glow = false }) {
  return (
    <svg width={width} height={width * 0.16} viewBox="0 0 220 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={glow ? { filter: `drop-shadow(0 0 14px ${color}66)` } : undefined}>
      <line x1="0" y1="18" x2="82" y2="18" stroke={color} strokeWidth="2" />
      <line x1="138" y1="18" x2="220" y2="18" stroke={color} strokeWidth="2" />
      <circle cx="110" cy="18" r="17" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="110" cy="18" r="9" fill={color} />
      <path d="M97 18 L86 12 L86 24 Z" fill={color} />
      <path d="M123 18 L134 12 L134 24 Z" fill={color} />
    </svg>
  );
}

function Medal({ size = 22, color = C.gold }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="9" r="6.5" stroke={color} strokeWidth="1.6" />
      <circle cx="12" cy="9" r="2.6" fill={color} />
      <path d="M8.5 14.5L6 21L12 18L18 21L15.5 14.5" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

// Diagonal seam between two sections - the site's recurring "cut" motif,
// echoing a wrestling ring's rope line / a torn championship ribbon.
function Seam({ from, to, flip = false }) {
  return (
    <div aria-hidden="true" style={{ lineHeight: 0, background: from }}>
      <svg width="100%" height="46" viewBox="0 0 1440 46" preserveAspectRatio="none" style={{ display: "block" }}>
        <polygon
          points={flip ? "0,46 1440,0 1440,46" : "0,0 1440,46 0,46"}
          fill={to}
        />
      </svg>
    </div>
  );
}

const DEPARTMENTS = [
  { icon: HeartPulse, name: "Kardiologiya", desc: "Yurak va qon-tomir tizimini tekshirish, EKG, davolash." },
  { icon: Brain, name: "Nevrologiya", desc: "Bosh og'rig'i, uyqu buzilishi, asab tizimi kasalliklari." },
  { icon: Stethoscope, name: "Umumiy amaliyot", desc: "Birlamchi ko'rik, umumiy tekshiruv va yo'naltirish." },
  { icon: Activity, name: "Diagnostika", desc: "UZI, laboratoriya tahlillari, rentgen xizmatlari." },
];

const TIMES = [
  "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  // 12:00-13:00 — tushlik tanaffusi, navbat yo'q
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
];

function initials(name) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

function rankColor(i) {
  if (i === 0) return C.gold;
  if (i === 1) return C.silver;
  if (i === 2) return C.bronze;
  return C.primary;
}

function Eyebrow({ children, on = "light" }) {
  return (
    <div
      style={{ color: on === "light" ? C.gold : C.accent, fontFamily: "'Space Mono', monospace" }}
      className="text-xs font-bold tracking-[0.25em] uppercase mb-4"
    >
      {children}
    </div>
  );
}

// Cinematic scroll-reveal wrapper — glides content in on view, not a hard pop
const EASE = [0.16, 1, 0.3, 1];
function Reveal({ children, delay = 0, y = 28, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// Frosted glass panels — layered depth over navy / cream sections
const glassStyle = {
  background: "rgba(20, 38, 63, 0.45)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
};
const glassLightStyle = {
  background: "rgba(255, 255, 255, 0.6)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(20,38,63,0.07)",
};

export default function PahlavonClinic() {
  const [mode, setMode] = useState("patient");
  const [menuOpen, setMenuOpen] = useState(false);

  const [doctors, setDoctors] = useState([]);
  const [doctorsLoading, setDoctorsLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const [form, setForm] = useState({ name: "", phone: "", department: DEPARTMENTS[0].name, doctorId: "", date: "", time: "", note: "" });
  const [bookedTimes, setBookedTimes] = useState([]);
  const [confirmed, setConfirmed] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [staffRole, setStaffRole] = useState(null);
  const [authToken, setAuthToken] = useState(() => {
    try { return localStorage.getItem("pahlavon_token") || null; } catch { return null; }
  });
  const [authRole, setAuthRole] = useState(() => {
    try { return localStorage.getItem("pahlavon_role") || null; } catch { return null; }
  });
  const [doctorInfo, setDoctorInfo] = useState(() => {
    try {
      const raw = localStorage.getItem("pahlavon_doctor");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });
  const [loginForm, setLoginForm] = useState({ username: "", phone: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [newPw, setNewPw] = useState("");
  const [newPw2, setNewPw2] = useState("");
  const [pwError, setPwError] = useState("");

  const [myAppointments, setMyAppointments] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [dashLoading, setDashLoading] = useState(false);

  const [newDoc, setNewDoc] = useState({ name: "", phone: "", department: DEPARTMENTS[0].name, years: "", photoUrl: "" });
  const [addDocError, setAddDocError] = useState("");
  const [lastTempPassword, setLastTempPassword] = useState(null);

  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", body: "" });
  const [announcementError, setAnnouncementError] = useState("");

  const [socialLinks, setSocialLinks] = useState([]);
  const [newSocial, setNewSocial] = useState({ platform: "Telegram", url: "" });
  const [socialError, setSocialError] = useState("");

  const [clinicPhone, setClinicPhone] = useState("+998 97 585 28 10");
  const [phoneDraft, setPhoneDraft] = useState("");
  const [phoneSaving, setPhoneSaving] = useState(false);
  const [phoneSaved, setPhoneSaved] = useState(false);

  const apiFetch = useCallback(
    async (path, opts = {}) => {
      const res = await fetch(`${API_BASE_URL}${path}`, {
        ...opts,
        headers: {
          "Content-Type": "application/json",
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
          ...(opts.headers || {}),
        },
      });
      let data = {};
      try { data = await res.json(); } catch { data = {}; }
      if (!res.ok) throw new Error(data.error || "Server bilan bog'lanishda xatolik");
      return data;
    },
    [authToken]
  );

  useEffect(() => {
    (async () => {
      try {
        setDoctorsLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/doctors`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setDoctors(data);
        setApiError("");
      } catch {
        setApiError(`Backendga ulanib bo'lmadi. API_BASE_URL ni tekshiring (hozir: ${API_BASE_URL}).`);
      } finally {
        setDoctorsLoading(false);
      }
    })();
  }, [mode]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/announcements`);
        setAnnouncements(await res.json());
      } catch {}
      try {
        const res2 = await fetch(`${API_BASE_URL}/api/social`);
        setSocialLinks(await res2.json());
      } catch {}
      try {
        const res3 = await fetch(`${API_BASE_URL}/api/settings`);
        const s = await res3.json();
        if (s.clinic_phone) { setClinicPhone(s.clinic_phone); setPhoneDraft(s.clinic_phone); }
      } catch {}
    })();
  }, [mode]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const updateForm = (key, val) => setForm((f) => ({ ...f, [key]: val, ...(key === "department" ? { doctorId: "" } : {}) }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Ismingizni kiriting";
    if (!/^[\d+\s()-]{7,}$/.test(form.phone.trim())) e.phone = "Telefon raqamini to'g'ri kiriting";
    if (!form.date) e.date = "Sanani tanlang";
    if (!form.time) e.time = "Vaqtni tanlang";
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: form.name, phone: form.phone, department: form.department,
          doctorId: form.doctorId || null, date: form.date, time: form.time, note: form.note,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Xatolik yuz berdi");
      setConfirmed({ ...form, number: data.number });
      setForm({ name: "", phone: "", department: DEPARTMENTS[0].name, doctorId: "", date: "", time: "", note: "" });
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const availableDoctors = doctors.filter((d) => d.department === form.department);
  const rankedDoctors = [...doctors].sort((a, b) => b.years - a.years);

  useEffect(() => {
    if (!form.doctorId || !form.date) {
      setBookedTimes([]);
      return;
    }
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/appointments/booked-times?doctorId=${form.doctorId}&date=${form.date}`);
        const data = await res.json();
        setBookedTimes(Array.isArray(data) ? data : []);
      } catch {
        setBookedTimes([]);
      }
    })();
  }, [form.doctorId, form.date]);

  const doAdminLogin = async (ev) => {
    ev.preventDefault();
    setLoginError(""); setLoginLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/admin/login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginForm.username, password: loginForm.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login xato");
      setAuthToken(data.token); setAuthRole("admin"); setLoginForm({ username: "", phone: "", password: "" });
      try {
        localStorage.setItem("pahlavon_token", data.token);
        localStorage.setItem("pahlavon_role", "admin");
        localStorage.removeItem("pahlavon_doctor");
      } catch {}
    } catch (err) { setLoginError(err.message); } finally { setLoginLoading(false); }
  };

  const doDoctorLogin = async (ev) => {
    ev.preventDefault();
    setLoginError(""); setLoginLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/doctor/login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: loginForm.phone, password: loginForm.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login xato");
      setAuthToken(data.token); setAuthRole("doctor"); setDoctorInfo(data.doctor);
      setLoginForm({ username: "", phone: "", password: "" });
      try {
        localStorage.setItem("pahlavon_token", data.token);
        localStorage.setItem("pahlavon_role", "doctor");
        localStorage.setItem("pahlavon_doctor", JSON.stringify(data.doctor));
      } catch {}
    } catch (err) { setLoginError(err.message); } finally { setLoginLoading(false); }
  };

  const logout = () => {
    setAuthToken(null); setAuthRole(null); setDoctorInfo(null); setStaffRole(null);
    setLoginError(""); setMode("patient");
    try {
      localStorage.removeItem("pahlavon_token");
      localStorage.removeItem("pahlavon_role");
      localStorage.removeItem("pahlavon_doctor");
    } catch {}
  };

  const changePassword = async (ev) => {
    ev.preventDefault();
    setPwError("");
    if (newPw.length < 6) return setPwError("Parol kamida 6 belgidan iborat bo'lishi kerak");
    if (newPw !== newPw2) return setPwError("Parollar mos kelmadi");
    try {
      await apiFetch("/api/auth/doctor/change-password", { method: "POST", body: JSON.stringify({ newPassword: newPw }) });
      setDoctorInfo((d) => {
        const updated = { ...d, mustChangePassword: false };
        try { localStorage.setItem("pahlavon_doctor", JSON.stringify(updated)); } catch {}
        return updated;
      });
      setNewPw(""); setNewPw2("");
    } catch (err) { setPwError(err.message); }
  };

  const loadAllAppointments = useCallback(async () => {
    setDashLoading(true);
    try { setAllAppointments(await apiFetch("/api/appointments/all")); }
    catch (err) { setLoginError(err.message); } finally { setDashLoading(false); }
  }, [apiFetch]);

  const loadMyAppointments = useCallback(async () => {
    setDashLoading(true);
    try { setMyAppointments(await apiFetch("/api/appointments/mine")); }
    catch (err) { setLoginError(err.message); } finally { setDashLoading(false); }
  }, [apiFetch]);

  const reloadDoctorsList = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/doctors`);
      setDoctors(await res.json());
    } catch {}
  }, []);

  useEffect(() => {
    if (authRole === "admin") { loadAllAppointments(); reloadDoctorsList(); reloadAnnouncements(); reloadSocial(); }
    else if (authRole === "doctor" && doctorInfo && !doctorInfo.mustChangePassword) { loadMyAppointments(); }
  }, [authRole, doctorInfo, loadAllAppointments, loadMyAppointments, reloadDoctorsList]);

  const addDoctor = async (ev) => {
    ev.preventDefault();
    setAddDocError("");
    if (!newDoc.name.trim() || !newDoc.phone.trim()) return setAddDocError("Ism va telefonni kiriting");
    try {
      const data = await apiFetch("/api/doctors", {
        method: "POST",
        body: JSON.stringify({ name: newDoc.name, phone: newDoc.phone, department: newDoc.department, years: Number(newDoc.years) || 0, photoUrl: newDoc.photoUrl || null }),
      });
      setLastTempPassword({ name: data.doctor.name, phone: data.doctor.phone, tempPassword: data.tempPassword });
      setNewDoc({ name: "", phone: "", department: DEPARTMENTS[0].name, years: "", photoUrl: "" });
      reloadDoctorsList();
    } catch (err) { setAddDocError(err.message); }
  };

  const removeDoctor = async (id) => {
    try { await apiFetch(`/api/doctors/${id}`, { method: "DELETE" }); reloadDoctorsList(); }
    catch (err) { setLoginError(err.message); }
  };

  const reloadAnnouncements = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/announcements`);
      setAnnouncements(await res.json());
    } catch {}
  }, []);

  const addAnnouncement = async (ev) => {
    ev.preventDefault();
    setAnnouncementError("");
    if (!newAnnouncement.title.trim()) return setAnnouncementError("Sarlavhani kiriting");
    try {
      await apiFetch("/api/announcements", { method: "POST", body: JSON.stringify(newAnnouncement) });
      setNewAnnouncement({ title: "", body: "" });
      reloadAnnouncements();
    } catch (err) { setAnnouncementError(err.message); }
  };

  const removeAnnouncement = async (id) => {
    try { await apiFetch(`/api/announcements/${id}`, { method: "DELETE" }); reloadAnnouncements(); }
    catch (err) { setAnnouncementError(err.message); }
  };

  const reloadSocial = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/social`);
      setSocialLinks(await res.json());
    } catch {}
  }, []);

  const addSocial = async (ev) => {
    ev.preventDefault();
    setSocialError("");
    if (!newSocial.url.trim()) return setSocialError("Havolani kiriting");
    try {
      await apiFetch("/api/social", { method: "POST", body: JSON.stringify(newSocial) });
      setNewSocial({ platform: "Telegram", url: "" });
      reloadSocial();
    } catch (err) { setSocialError(err.message); }
  };

  const removeSocial = async (id) => {
    try { await apiFetch(`/api/social/${id}`, { method: "DELETE" }); reloadSocial(); }
    catch (err) { setSocialError(err.message); }
  };

  const savePhone = async (ev) => {
    ev.preventDefault();
    setPhoneSaving(true);
    setPhoneSaved(false);
    try {
      await apiFetch("/api/settings/clinic_phone", { method: "PUT", body: JSON.stringify({ value: phoneDraft }) });
      setClinicPhone(phoneDraft);
      setPhoneSaved(true);
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setPhoneSaving(false);
    }
  };

  const toggleDone = async (id) => {
    try {
      const updated = await apiFetch(`/api/appointments/${id}/done`, { method: "PATCH" });
      setMyAppointments((list) => list.map((a) => (a.id === updated.id ? updated : a)));
    } catch (err) { setLoginError(err.message); }
  };

  const navItems = [
    { label: "Asosiy", id: "hero" }, { label: "Biz haqimizda", id: "about" },
    { label: "Bo'limlar", id: "departments" }, { label: "Shifokorlar", id: "doctors" },
    { label: "Aloqa", id: "contact" },
  ];

  // ================= STAFF MODE =================
  if (mode === "staff") {
    return (
      <div style={{ background: C.bg, color: C.text, fontFamily: "Inter, sans-serif" }} className="min-h-screen w-full">
        <style>{FONTS}</style>
        <header style={{ background: C.primary }} className="w-full px-6 md:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="Pahlavon" className="w-8 h-8 object-contain" />
            <span style={{ fontFamily: "Fraunces, serif", color: C.bg }} className="text-lg font-bold">Pahlavon — Xodimlar paneli</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setMode("patient")} style={{ color: C.onNavyMuted }} className="text-sm font-medium flex items-center gap-1.5 hover:opacity-80">
              <ArrowLeft size={16} /> Bemor saytiga qaytish
            </button>
            {authRole && (
              <button onClick={logout} style={{ color: C.gold }} className="text-sm font-medium hover:opacity-80">
                Chiqish
              </button>
            )}
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-6 md:px-12 py-10">
          {!authRole && !staffRole && (
            <div className="grid sm:grid-cols-2 gap-5 max-w-xl mx-auto">
              <button onClick={() => setStaffRole("admin")} style={{ background: C.surface, borderColor: C.border }} className="rounded-2xl border p-8 flex flex-col items-center gap-3 hover:shadow-md transition-shadow">
                <UserCog size={30} color={C.primary} />
                <span style={{ fontFamily: "Fraunces, serif", color: C.text }} className="font-bold">Admin</span>
                <span style={{ color: C.muted }} className="text-xs text-center">Shifokorlarni boshqarish, barcha navbatlar</span>
              </button>
              <button onClick={() => setStaffRole("doctor")} style={{ background: C.surface, borderColor: C.border }} className="rounded-2xl border p-8 flex flex-col items-center gap-3 hover:shadow-md transition-shadow">
                <Users size={30} color={C.primary} />
                <span style={{ fontFamily: "Fraunces, serif", color: C.text }} className="font-bold">Shifokor</span>
                <span style={{ color: C.muted }} className="text-xs text-center">O'zingizga yozilgan navbatlarni ko'rish</span>
              </button>
            </div>
          )}

          {!authRole && staffRole && (
            <div style={{ background: C.surface, borderColor: C.border }} className="max-w-sm mx-auto rounded-2xl border p-7">
              <div className="flex items-center gap-2 mb-5">
                <Lock size={18} color={C.primary} />
                <h3 style={{ fontFamily: "Fraunces, serif", color: C.primary }} className="text-lg font-bold">{staffRole === "admin" ? "Admin kirishi" : "Shifokor kirishi"}</h3>
              </div>
              <form onSubmit={staffRole === "admin" ? doAdminLogin : doDoctorLogin} className="space-y-3">
                {staffRole === "admin" ? (
                  <input value={loginForm.username} onChange={(e) => setLoginForm((f) => ({ ...f, username: e.target.value }))} placeholder="Login" style={{ borderColor: C.border }} className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2" />
                ) : (
                  <input value={loginForm.phone} onChange={(e) => setLoginForm((f) => ({ ...f, phone: e.target.value }))} placeholder="Telefon raqam" style={{ borderColor: C.border }} className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2" />
                )}
                <input type="password" value={loginForm.password} onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))} placeholder="Parol" style={{ borderColor: C.border }} className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2" />
                {loginError && <p className="text-xs" style={{ color: C.danger }}>{loginError}</p>}
                <button type="submit" disabled={loginLoading} style={{ background: C.accent, color: "#FFFFFF" }} className="w-full py-2.5 rounded-full font-semibold text-sm disabled:opacity-60">{loginLoading ? "Tekshirilmoqda..." : "Kirish"}</button>
                <button type="button" onClick={() => { setStaffRole(null); setLoginError(""); }} style={{ color: C.muted }} className="w-full text-xs mt-1">← Orqaga</button>
              </form>
            </div>
          )}

          {authRole === "doctor" && doctorInfo?.mustChangePassword && (
            <div style={{ background: C.surface, borderColor: C.border }} className="max-w-sm mx-auto rounded-2xl border p-7">
              <div className="flex items-center gap-2 mb-2"><KeyRound size={18} color={C.primary} /><h3 style={{ fontFamily: "Fraunces, serif", color: C.primary }} className="text-lg font-bold">Parolni o'zgartiring</h3></div>
              <p style={{ color: C.muted }} className="text-xs mb-4">Bu birinchi kirishingiz. Davom etish uchun yangi parol o'rnating.</p>
              <form onSubmit={changePassword} className="space-y-3">
                <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="Yangi parol (kamida 6 belgi)" style={{ borderColor: C.border }} className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2" />
                <input type="password" value={newPw2} onChange={(e) => setNewPw2(e.target.value)} placeholder="Yangi parolni takrorlang" style={{ borderColor: C.border }} className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2" />
                {pwError && <p className="text-xs" style={{ color: C.danger }}>{pwError}</p>}
                <button type="submit" style={{ background: C.accent, color: "#FFFFFF" }} className="w-full py-2.5 rounded-full font-semibold text-sm">Saqlash</button>
              </form>
            </div>
          )}

          {authRole === "admin" && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div style={{ background: C.surface, borderColor: C.border }} className="rounded-2xl border p-6">
                  <h3 style={{ fontFamily: "Fraunces, serif", color: C.primary }} className="text-xl font-bold mb-4">Yangi shifokor qo'shish</h3>
                  <form onSubmit={addDoctor} className="space-y-3">
                    <input value={newDoc.name} onChange={(e) => setNewDoc((d) => ({ ...d, name: e.target.value }))} placeholder="Ism familiya" style={{ borderColor: C.border }} className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2" />
                    <input value={newDoc.phone} onChange={(e) => setNewDoc((d) => ({ ...d, phone: e.target.value }))} placeholder="Telefon (login sifatida ishlatiladi)" style={{ borderColor: C.border }} className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2" />
                    <select value={newDoc.department} onChange={(e) => setNewDoc((d) => ({ ...d, department: e.target.value }))} style={{ borderColor: C.border }} className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2 bg-white">
                      {DEPARTMENTS.map((d) => (<option key={d.name} value={d.name}>{d.name}</option>))}
                    </select>
                    <input value={newDoc.years} onChange={(e) => setNewDoc((d) => ({ ...d, years: e.target.value }))} placeholder="Tajriba (yil)" type="number" min="0" style={{ borderColor: C.border }} className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2" />
                    <input value={newDoc.photoUrl} onChange={(e) => setNewDoc((d) => ({ ...d, photoUrl: e.target.value }))} placeholder="Rasm havolasi (ixtiyoriy, masalan Imgur linki)" style={{ borderColor: C.border }} className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2" />
                    {addDocError && <p className="text-xs" style={{ color: C.danger }}>{addDocError}</p>}
                    <button type="submit" style={{ background: C.accent, color: "#FFFFFF" }} className="w-full py-2.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2"><Plus size={16} /> Qo'shish</button>
                  </form>
                  {lastTempPassword && (
                    <div style={{ background: C.bgAlt, borderColor: C.border }} className="mt-4 rounded-lg border p-4 text-sm">
                      <p style={{ color: C.text }} className="font-semibold mb-1">{lastTempPassword.name} uchun vaqtinchalik parol:</p>
                      <p style={{ color: C.accent, fontFamily: "'Space Mono', monospace" }} className="text-base">{lastTempPassword.tempPassword}</p>
                      <p style={{ color: C.muted }} className="text-xs mt-1">Login: {lastTempPassword.phone}. Bu parolni shifokorga bering — birinchi kirishda o'zi o'zgartiradi.</p>
                    </div>
                  )}
                </div>
                <div style={{ background: C.surface, borderColor: C.border }} className="rounded-2xl border p-6">
                  <h3 style={{ fontFamily: "Fraunces, serif", color: C.primary }} className="text-xl font-bold mb-4">Shifokorlar ro'yxati ({doctors.length})</h3>
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {doctors.map((d) => (
                      <div key={d.id} style={{ borderColor: C.border }} className="flex items-center justify-between border rounded-lg px-3.5 py-2.5">
                        <div><p style={{ color: C.text }} className="text-sm font-semibold">{d.name}</p><p style={{ color: C.muted }} className="text-xs">{d.department} • {d.years} yil</p></div>
                        <button onClick={() => removeDoctor(d.id)} style={{ color: C.danger }} className="p-1.5 hover:opacity-70"><Trash2 size={16} /></button>
                      </div>
                    ))}
                    {doctors.length === 0 && <p style={{ color: C.muted }} className="text-sm">Hozircha shifokorlar yo'q.</p>}
                  </div>
                </div>
              </div>
              <div style={{ background: C.surface, borderColor: C.border }} className="rounded-2xl border p-6">
                <h3 style={{ fontFamily: "Fraunces, serif", color: C.primary }} className="text-xl font-bold mb-4">Barcha navbatlar ({allAppointments.length})</h3>
                {dashLoading ? <p style={{ color: C.muted }} className="text-sm">Yuklanmoqda...</p> : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {allAppointments.map((a) => (
                      <div key={a.id} style={{ borderColor: C.border, opacity: a.done ? 0.55 : 1 }} className="border rounded-lg px-4 py-3">
                        <p style={{ color: C.text }} className="text-sm font-semibold">{a.patient_name} <span style={{ color: C.muted, fontWeight: 400 }}>· {a.number}</span></p>
                        <p style={{ color: C.muted }} className="text-xs mt-0.5">{a.phone} • {a.department}{a.doctor_name ? ` • ${a.doctor_name}` : ""}</p>
                        <p style={{ color: C.accent }} className="text-xs font-medium mt-1">{a.appt_date?.slice(0,10)} • {a.appt_time}</p>
                      </div>
                    ))}
                    {allAppointments.length === 0 && <p style={{ color: C.muted }} className="text-sm">Hozircha navbatlar yo'q.</p>}
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div style={{ background: C.surface, borderColor: C.border }} className="rounded-2xl border p-6">
                  <h3 style={{ fontFamily: "Fraunces, serif", color: C.primary }} className="text-xl font-bold mb-4">E'lon qo'shish</h3>
                  <form onSubmit={addAnnouncement} className="space-y-3">
                    <input value={newAnnouncement.title} onChange={(e) => setNewAnnouncement((a) => ({ ...a, title: e.target.value }))} placeholder="Sarlavha" style={{ borderColor: C.border }} className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2" />
                    <textarea value={newAnnouncement.body} onChange={(e) => setNewAnnouncement((a) => ({ ...a, body: e.target.value }))} placeholder="Matn (ixtiyoriy)" rows={3} style={{ borderColor: C.border }} className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2 resize-none" />
                    {announcementError && <p className="text-xs" style={{ color: C.danger }}>{announcementError}</p>}
                    <button type="submit" style={{ background: C.accent, color: "#FFFFFF" }} className="w-full py-2.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2"><Plus size={16} /> Joylash</button>
                  </form>
                  <div className="space-y-2 mt-4 max-h-56 overflow-y-auto">
                    {announcements.map((a) => (
                      <div key={a.id} style={{ borderColor: C.border }} className="flex items-start justify-between border rounded-lg px-3.5 py-2.5">
                        <div className="pr-2"><p style={{ color: C.text }} className="text-sm font-semibold">{a.title}</p>{a.body && <p style={{ color: C.muted }} className="text-xs mt-0.5">{a.body}</p>}</div>
                        <button onClick={() => removeAnnouncement(a.id)} style={{ color: C.danger }} className="p-1 hover:opacity-70 flex-shrink-0"><Trash2 size={15} /></button>
                      </div>
                    ))}
                    {announcements.length === 0 && <p style={{ color: C.muted }} className="text-xs">Hozircha e'lon yo'q — shu sabab saytda "E'lonlar" bo'limi ko'rinmayapti.</p>}
                  </div>
                </div>

                <div style={{ background: C.surface, borderColor: C.border }} className="rounded-2xl border p-6">
                  <h3 style={{ fontFamily: "Fraunces, serif", color: C.primary }} className="text-xl font-bold mb-4">Ijtimoiy tarmoq havolasi qo'shish</h3>
                  <form onSubmit={addSocial} className="space-y-3">
                    <select value={newSocial.platform} onChange={(e) => setNewSocial((s) => ({ ...s, platform: e.target.value }))} style={{ borderColor: C.border }} className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2 bg-white">
                      {["Telegram", "Instagram", "Facebook", "YouTube", "Boshqa"].map((p) => (<option key={p} value={p}>{p}</option>))}
                    </select>
                    <input value={newSocial.url} onChange={(e) => setNewSocial((s) => ({ ...s, url: e.target.value }))} placeholder="https://t.me/pahlavon_clinic" style={{ borderColor: C.border }} className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2" />
                    {socialError && <p className="text-xs" style={{ color: C.danger }}>{socialError}</p>}
                    <button type="submit" style={{ background: C.accent, color: "#FFFFFF" }} className="w-full py-2.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2"><Plus size={16} /> Qo'shish</button>
                  </form>
                  <div className="space-y-2 mt-4 max-h-56 overflow-y-auto">
                    {socialLinks.map((s) => (
                      <div key={s.id} style={{ borderColor: C.border }} className="flex items-center justify-between border rounded-lg px-3.5 py-2.5">
                        <div><p style={{ color: C.text }} className="text-sm font-semibold">{s.platform}</p><p style={{ color: C.muted }} className="text-xs truncate max-w-[220px]">{s.url}</p></div>
                        <button onClick={() => removeSocial(s.id)} style={{ color: C.danger }} className="p-1.5 hover:opacity-70 flex-shrink-0"><Trash2 size={15} /></button>
                      </div>
                    ))}
                    {socialLinks.length === 0 && <p style={{ color: C.muted }} className="text-xs">Hozircha havola qo'shilmagan.</p>}
                  </div>
                </div>
              </div>

              <div style={{ background: C.surface, borderColor: C.border }} className="rounded-2xl border p-6 max-w-md">
                <h3 style={{ fontFamily: "Fraunces, serif", color: C.primary }} className="text-xl font-bold mb-4">Aloqa telefon raqami</h3>
                <p style={{ color: C.muted }} className="text-xs mb-3">Saytda ko'rsatiladigan telefon raqamini shu yerdan o'zgartirishingiz mumkin.</p>
                <form onSubmit={savePhone} className="flex gap-2">
                  <input value={phoneDraft} onChange={(e) => { setPhoneDraft(e.target.value); setPhoneSaved(false); }} placeholder="+998 90 123 45 67" style={{ borderColor: C.border }} className="flex-1 rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2" />
                  <button type="submit" disabled={phoneSaving} style={{ background: C.accent, color: "#FFFFFF" }} className="px-4 py-2.5 rounded-lg font-semibold text-sm disabled:opacity-60">{phoneSaving ? "..." : "Saqlash"}</button>
                </form>
                {phoneSaved && <p style={{ color: C.accent }} className="text-xs mt-2">Saqlandi ✓</p>}
              </div>
            </div>
          )}

          {authRole === "doctor" && doctorInfo && !doctorInfo.mustChangePassword && (
            <div style={{ background: C.surface, borderColor: C.border }} className="rounded-2xl border p-6">
              <h3 style={{ fontFamily: "Fraunces, serif", color: C.primary }} className="text-xl font-bold mb-1">Salom, {doctorInfo.name}</h3>
              <p style={{ color: C.muted }} className="text-xs mb-5">{doctorInfo.department} • Sizga yozilgan navbatlar: {myAppointments.length}</p>
              {dashLoading ? <p style={{ color: C.muted }} className="text-sm">Yuklanmoqda...</p> : (
                <div className="space-y-3">
                  {myAppointments.map((a) => (
                    <div key={a.id} style={{ borderColor: C.border, opacity: a.done ? 0.55 : 1 }} className="border rounded-lg px-4 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p style={{ color: C.text }} className="text-sm font-semibold">{a.patient_name} <span style={{ color: C.muted, fontWeight: 400 }}>· {a.number}</span></p>
                          <p style={{ color: C.muted }} className="text-xs mt-0.5">{a.phone}</p>
                          <p style={{ color: C.accent }} className="text-xs font-medium mt-1">{a.appt_date?.slice(0,10)} • {a.appt_time}</p>
                          {a.note && <p style={{ color: C.muted }} className="text-xs mt-1 italic">"{a.note}"</p>}
                        </div>
                        <button onClick={() => toggleDone(a.id)} style={{ color: a.done ? C.accent : C.muted }} className="flex items-center gap-1 text-xs flex-shrink-0"><CheckCircle2 size={16} /> {a.done ? "Bajarilgan" : "Belgilash"}</button>
                      </div>
                    </div>
                  ))}
                  {myAppointments.length === 0 && <p style={{ color: C.muted }} className="text-sm">Hozircha sizga yozilganlar yo'q.</p>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ================= PATIENT SITE =================
  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "Inter, sans-serif" }} className="min-h-screen w-full overflow-x-hidden">
      <style>{FONTS}</style>

      {apiError && (
        <div style={{ background: "#FDEDEC", color: C.danger }} className="text-center text-xs py-2 px-4">{apiError}</div>
      )}

      <header style={{ background: C.primary, borderColor: C.primaryDark }} className="sticky top-0 z-30 w-full border-b">
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5">
            <img src={logo} alt="Pahlavon" className="w-9 h-9 object-contain" />
            <span style={{ fontFamily: "Fraunces, serif", color: C.bg }} className="text-xl font-bold tracking-tight">Pahlavon</span>
          </button>
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((n) => (<button key={n.label} onClick={() => scrollTo(n.id)} style={{ color: C.onNavyMuted }} className="text-sm font-medium hover:text-white transition-colors">{n.label}</button>))}
            <button onClick={() => scrollTo("booking")} style={{ background: C.accent, color: "#FFFFFF" }} className="text-sm font-semibold px-4 py-2 rounded-full hover:brightness-110 transition">Navbatga yozilish</button>
            <button onClick={() => setMode("staff")} style={{ color: "#5E7590" }} className="text-xs font-medium hover:text-white transition-colors">Xodimlar</button>
          </nav>
          <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)} style={{ color: C.bg }}>{menuOpen ? <X size={26} /> : <Menu size={26} />}</button>
        </div>
        {menuOpen && (
          <div className="md:hidden flex flex-col px-6 pb-4 gap-3" style={{ background: C.primary }}>
            {navItems.map((n) => (<button key={n.label} onClick={() => scrollTo(n.id)} style={{ color: C.onNavyMuted }} className="text-left text-sm font-medium py-1">{n.label}</button>))}
            <button onClick={() => scrollTo("booking")} style={{ background: C.accent, color: "#FFFFFF" }} className="text-sm font-semibold px-4 py-2 rounded-full mt-1">Navbatga yozilish</button>
            <button onClick={() => setMode("staff")} style={{ color: "#5E7590" }} className="text-xs font-medium text-left mt-1">Xodimlar paneli</button>
          </div>
        )}
      </header>

      {/* HERO — belbog' katta grafika markazda, diagonal chok pastda */}
      <section id="hero" style={{ background: C.primary }} className="w-full relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pt-20 pb-24 md:pt-32 md:pb-36 grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}>
              <Eyebrow>Pahlavon tibbiyot markazi</Eyebrow>
            </motion.div>
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } }}
              style={{ fontFamily: "Fraunces, serif", color: C.bg }}
              className="text-5xl md:text-7xl font-black leading-[0.96] tracking-tight"
            >
              Sog'liq — <span style={{ color: C.gold, fontStyle: "italic", fontWeight: 700 }}>kurashib</span><br />yutiladigan g'alaba
            </motion.h1>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
              style={{ color: C.onNavyMuted }}
              className="max-w-md text-base md:text-lg leading-relaxed mt-8"
            >
              Har bir tashrif — sog'liq uchun bir jangi. Malakali shifokorlar, aniq
              diagnostika va onlayn navbat bilan biz sizni g'alabaga tayyorlaymiz.
            </motion.p>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
              className="flex flex-wrap gap-4 mt-10"
            >
              <motion.button
                whileHover={{ scale: 1.045, boxShadow: `0 0 32px ${C.accent}55` }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
                onClick={() => scrollTo("booking")}
                style={{ background: C.accent, color: "#FFFFFF" }}
                className="px-7 py-3.5 rounded-full font-semibold text-sm flex items-center gap-2"
              >
                Navbatga yozilish <ChevronRight size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.045, background: "rgba(255,255,255,0.06)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
                onClick={() => scrollTo("departments")}
                style={{ borderColor: "#2E4A6B", color: C.bg }}
                className="px-7 py-3.5 rounded-full font-semibold text-sm border"
              >
                Bo'limlar
              </motion.button>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
              className="flex gap-10 md:gap-14 mt-16"
            >
              {[["30+", "yillik tajriba"], ["300 000+", "davolangan bemor"], [String(doctors.length || "—"), "shifokor"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "Fraunces, serif", color: C.gold }} className="text-2xl md:text-3xl font-bold">{num}</div>
                  <div style={{ color: "#7C93AC", fontFamily: "'Space Mono', monospace" }} className="text-[11px] mt-1.5 uppercase tracking-wide">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -14 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
            className="hidden md:flex items-center justify-center relative"
          >
            <ChampionBelt color={C.gold} width={340} glow />
          </motion.div>
        </div>
      </section>
      <Seam from={C.primary} to={C.bg} />

      {/* ABOUT */}
      <section id="about" style={{ background: C.bg }} className="w-full px-6 md:px-12 pt-8 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <Eyebrow on="dark">Biz haqimizda</Eyebrow>
            <h2 style={{ fontFamily: "Fraunces, serif", color: C.primary }} className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Pahlavon klinikasi haqida</h2>
            <p style={{ color: C.muted }} className="leading-relaxed mb-4">
              "Pahlavon" nomi bejiz tanlanmagan — biz har bir bemorni sog'liq kurashida
              g'olib chiqishga yordam beramiz. 30 yildan ortiq tajriba davomida minglab
              oilalar bilan ishonchli hamkorlik o'rnatganmiz.
            </p>
            <p style={{ color: C.muted }} className="leading-relaxed mb-8">
              Zamonaviy uskunalar, tajribali shifokorlar jamoasi va qulay onlayn xizmatlar —
              har bir bemor uchun individual yondashuv bilan birlashadi.
            </p>
            <ul className="space-y-3">
              {["Zamonaviy diagnostika uskunalari", "Malakali va sertifikatlangan shifokorlar", "Qulay onlayn navbat tizimi"].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <Check size={18} color={C.accent} className="mt-0.5 flex-shrink-0" />
                  <span style={{ color: C.text }} className="text-sm">{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ clipPath: "polygon(0 12px, 12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)" }}
              className="relative aspect-square md:aspect-auto md:h-full overflow-hidden"
            >
              <img src={clinicPhoto} alt="Pahlavon tibbiyot markazi binosi" className="w-full h-full object-cover" />
              <div style={{ background: "linear-gradient(to top, rgba(11,25,41,0.85), transparent 55%)" }} className="absolute inset-0 flex flex-col items-start justify-end p-8">
                <div className="flex items-center gap-2 mb-1">
                  <Medal size={20} color={C.gold} />
                  <span style={{ fontFamily: "Fraunces, serif", color: C.bg }} className="font-bold">Bizning binomiz</span>
                </div>
                <p style={{ color: C.onNavyMuted }} className="text-xs">Shahrisabz shahridagi markaziy klinika</p>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {announcements.length > 0 && (
        <section id="announcements" style={{ background: C.bgAlt }} className="w-full px-6 md:px-12 py-16">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <Eyebrow on="dark">E'lonlar</Eyebrow>
              <h2 style={{ fontFamily: "Fraunces, serif", color: C.primary }} className="text-2xl md:text-3xl font-black mb-10 tracking-tight">Yangiliklar va e'lonlar</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {announcements.map((a, i) => (
                <Reveal key={a.id} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    style={{ background: C.surface, borderColor: C.border }}
                    className="rounded-xl border p-6 h-full"
                  >
                    <h3 style={{ fontFamily: "Fraunces, serif", color: C.text }} className="font-bold mb-2">{a.title}</h3>
                    {a.body && <p style={{ color: C.muted }} className="text-sm leading-relaxed">{a.body}</p>}
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DEPARTMENTS — belbog' segmentlari, tekis panjarali kartalar emas */}
      <section id="departments" style={{ background: C.bgAlt }} className="w-full px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <Eyebrow on="dark">Bo'limlar</Eyebrow>
          <h2 style={{ fontFamily: "Fraunces, serif", color: C.primary }} className="text-3xl md:text-4xl font-black mb-10">Xizmat ko'rsatadigan bo'limlar</h2>
          <div className="flex flex-col">
            {DEPARTMENTS.map((d, i) => {
              const Icon = d.icon;
              return (
                <Reveal key={d.name} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    style={{ background: i % 2 === 0 ? C.surface : "transparent", borderColor: C.border }}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 px-6 py-7 border-b"
                  >
                    <div style={{ background: C.primary }} className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon size={24} color={C.gold} />
                    </div>
                    <div className="flex-1">
                      <h3 style={{ fontFamily: "Fraunces, serif", color: C.text }} className="font-bold text-xl tracking-tight">{d.name}</h3>
                      <p style={{ color: C.muted }} className="text-sm leading-relaxed mt-1.5">{d.desc}</p>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* DOCTORS — tajriba bo'yicha saflangan "chempionlar reyestri" */}
      <section id="doctors" style={{ background: C.bg }} className="w-full px-6 md:px-12 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <Eyebrow on="dark">Chempionlar reyestri</Eyebrow>
            <h2 style={{ fontFamily: "Fraunces, serif", color: C.primary }} className="text-4xl md:text-5xl font-black mb-2 tracking-tight">Shifokorlarimiz</h2>
            <p style={{ color: C.muted }} className="text-sm mb-12">Tajriba yiliga ko'ra saflangan.</p>
          </Reveal>

          {doctorsLoading ? (
            <p style={{ color: C.muted }} className="text-sm">Yuklanmoqda...</p>
          ) : (
            <div className="space-y-4">
              {rankedDoctors.map((doc, i) => (
                <Reveal key={doc.id} delay={i * 0.07}>
                  <motion.div
                    whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(20,38,63,0.10)" }}
                    transition={{ duration: 0.5, ease: EASE }}
                    style={{ borderColor: C.border, background: C.surface }}
                    className="flex items-center gap-5 rounded-xl border px-6 py-5"
                  >
                    <span style={{ fontFamily: "'Space Mono', monospace", color: rankColor(i) }} className="text-lg font-bold w-8 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    {doc.photo_url ? (
                      <img src={doc.photo_url} alt={doc.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" style={{ border: `2px solid ${rankColor(i)}` }} />
                    ) : (
                      <div style={{ background: C.primary, color: C.bg, fontFamily: "Fraunces, serif" }} className="w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {initials(doc.name)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p style={{ color: C.text }} className="font-semibold truncate">{doc.name}</p>
                      <p style={{ color: C.accent }} className="text-xs font-medium">{doc.department}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <Medal size={16} color={rankColor(i)} />
                      <span style={{ color: C.muted }} className="text-xs whitespace-nowrap">{doc.years} yil</span>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
              {rankedDoctors.length === 0 && <p style={{ color: C.muted }} className="text-sm">Hozircha shifokorlar qo'shilmagan.</p>}
            </div>
          )}
        </div>
      </section>

      <Seam from={C.bg} to={C.primary} flip />

      {/* BOOKING — teskari kontrast: shisha (glass) forma navy fonda */}
      <section id="booking" style={{ background: C.primary }} className="w-full px-6 md:px-12 pt-8 pb-24 md:pb-36">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <Reveal>
            <Eyebrow>Navbat</Eyebrow>
            <h2 style={{ fontFamily: "Fraunces, serif", color: C.bg }} className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Onlayn navbatga yoziling</h2>
            <p style={{ color: C.onNavyMuted }} className="leading-relaxed mb-6 max-w-md">
              Formani to'ldiring — biz sizga tasdiqlash uchun ko'rsatilgan telefon
              raqamiga qo'ng'iroq qilamiz. Klinikaga tashrif vaqtida navbat raqamingizni ayting.
            </p>
            <div className="space-y-3">
              {[[Phone, clinicPhone], [Clock, "Dushanba–Shanba, 08:30–17:00 (12:00–13:00 tushlik tanaffusi)"], [MapPin, "Qashqadaryo viloyati, Shahrisabz shahri, 31-G uy"]].map(([Icon, txt]) => (
                <div key={txt} className="flex items-center gap-3">
                  <Icon size={18} color={C.gold} />
                  <span style={{ color: C.bg }} className="text-sm">{txt}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div style={{ ...glassStyle, borderRadius: "1.25rem" }} className="p-8 md:p-10">
            {confirmed ? (
              <div className="flex flex-col items-center text-center py-6">
                <div style={{ background: "rgba(255,255,255,0.08)" }} className="w-14 h-14 rounded-full flex items-center justify-center mb-4"><Check size={26} color={C.gold} /></div>
                <h3 style={{ fontFamily: "Fraunces, serif", color: C.bg }} className="text-xl font-bold mb-1">Navbatingiz qabul qilindi</h3>
                <p style={{ color: C.onNavyMuted }} className="text-sm mb-4">Navbat raqamingiz: <span style={{ color: C.gold, fontFamily: "'Space Mono', monospace" }} className="font-semibold">{confirmed.number}</span></p>
                <div style={{ background: "rgba(255,255,255,0.07)" }} className="rounded-lg p-4 w-full text-sm text-left space-y-1 mb-5">
                  <p style={{ color: C.bg }}><span style={{ color: C.onNavyMuted }}>Ism:</span> {confirmed.name}</p>
                  <p style={{ color: C.bg }}><span style={{ color: C.onNavyMuted }}>Bo'lim:</span> {confirmed.department}</p>
                  <p style={{ color: C.bg }}><span style={{ color: C.onNavyMuted }}>Sana:</span> {confirmed.date}</p>
                  <p style={{ color: C.bg }}><span style={{ color: C.onNavyMuted }}>Vaqt:</span> {confirmed.time}</p>
                </div>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.4, ease: EASE }} onClick={() => setConfirmed(null)} style={{ background: C.gold, color: "#1B2430" }} className="px-5 py-2.5 rounded-full text-sm font-semibold">Yana bir navbat yozish</motion.button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label style={{ color: C.bg }} className="text-sm font-medium block mb-1.5">To'liq ism</label>
                  <input value={form.name} onChange={(e) => updateForm("name", e.target.value)} placeholder="Ismingiz va familiyangiz" style={{ borderColor: errors.name ? C.danger : C.border }} className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2 bg-white" />
                  {errors.name && <p className="text-xs mt-1" style={{ color: C.danger }}>{errors.name}</p>}
                </div>
                <div>
                  <label style={{ color: C.bg }} className="text-sm font-medium block mb-1.5">Telefon raqam</label>
                  <input value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} placeholder="+998 90 123 45 67" style={{ borderColor: errors.phone ? C.danger : C.border }} className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2 bg-white" />
                  {errors.phone && <p className="text-xs mt-1" style={{ color: C.danger }}>{errors.phone}</p>}
                </div>
                <div>
                  <label style={{ color: C.bg }} className="text-sm font-medium block mb-1.5">Bo'lim</label>
                  <select value={form.department} onChange={(e) => updateForm("department", e.target.value)} style={{ borderColor: C.border }} className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2 bg-white">
                    {DEPARTMENTS.map((d) => (<option key={d.name} value={d.name}>{d.name}</option>))}
                  </select>
                </div>
                <div>
                  <label style={{ color: C.bg }} className="text-sm font-medium block mb-1.5">Shifokor (ixtiyoriy)</label>
                  <select value={form.doctorId} onChange={(e) => updateForm("doctorId", e.target.value)} style={{ borderColor: C.border }} className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2 bg-white">
                    <option value="">Farqi yo'q</option>
                    {availableDoctors.map((d) => (<option key={d.id} value={d.id}>{d.name}</option>))}
                  </select>
                  {!form.doctorId && (
                    <p style={{ color: C.onNavyMuted }} className="text-xs mt-1">
                      Band vaqtlarni ko'rish uchun aniq shifokor tanlang.
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label style={{ color: C.bg }} className="text-sm font-medium block mb-1.5">Sana</label>
                    <input type="date" value={form.date} onChange={(e) => updateForm("date", e.target.value)} style={{ borderColor: errors.date ? C.danger : C.border }} className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2 bg-white" />
                    {errors.date && <p className="text-xs mt-1" style={{ color: C.danger }}>{errors.date}</p>}
                  </div>
                  <div>
                    <label style={{ color: C.bg }} className="text-sm font-medium block mb-1.5">Vaqt</label>
                    <select value={form.time} onChange={(e) => updateForm("time", e.target.value)} style={{ borderColor: errors.time ? C.danger : C.border }} className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2 bg-white">
                      <option value="">Tanlang</option>
                      {TIMES.map((t) => (
                        <option key={t} value={t} disabled={bookedTimes.includes(t)}>
                          {t}{bookedTimes.includes(t) ? " — band" : ""}
                        </option>
                      ))}
                    </select>
                    {errors.time && <p className="text-xs mt-1" style={{ color: C.danger }}>{errors.time}</p>}
                    {form.doctorId && form.date && (
                      <p style={{ color: C.onNavyMuted }} className="text-xs mt-1">
                        {bookedTimes.length === TIMES.length ? "Bu kun uchun barcha vaqtlar band." : "Band vaqtlar ro'yxatda ko'rsatilmaydi (tanlab bo'lmaydi)."}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label style={{ color: C.bg }} className="text-sm font-medium block mb-1.5">Izoh (ixtiyoriy)</label>
                  <textarea value={form.note} onChange={(e) => updateForm("note", e.target.value)} placeholder="Shikoyat yoki qo'shimcha ma'lumot" rows={3} style={{ borderColor: C.border }} className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none focus:ring-2 resize-none bg-white" />
                </div>
                {errors.submit && <p className="text-xs" style={{ color: C.danger }}>{errors.submit}</p>}
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: `0 0 28px ${C.accent}55` }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  type="submit"
                  disabled={submitting}
                  style={{ background: C.accent, color: "#FFFFFF" }}
                  className="w-full py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <CalendarIcon size={18} /> {submitting ? "Yuborilmoqda..." : "Navbatga yozilish"}
                </motion.button>
              </form>
            )}
            </div>
          </Reveal>
        </div>
      </section>

      <footer id="contact" style={{ background: C.primaryDark }} className="w-full px-6 md:px-12 py-14">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3"><img src={logo} alt="Pahlavon" className="w-8 h-8 object-contain" /><span style={{ fontFamily: "Fraunces, serif", color: C.bg }} className="text-lg font-bold">Pahlavon</span></div>
            <p style={{ color: "#6E88A3" }} className="text-sm leading-relaxed max-w-xs">Sog'lig'ingiz uchun kurashda ishonchli hamroh — Pahlavon tibbiyot markazi.</p>
          </div>
          <div>
            <h4 style={{ color: C.bg, fontFamily: "'Space Mono', monospace" }} className="font-semibold mb-3 text-xs tracking-wide uppercase">Aloqa</h4>
            <div className="space-y-2">
              {[[Phone, clinicPhone], [MapPin, "Shahrisabz sh., 31-G uy, Qashqadaryo"], [Clock, "Dush–Shan, 08:30–17:00"]].map(([Icon, txt]) => (
                <div key={txt} className="flex items-center gap-2"><Icon size={15} color={C.gold} /><span style={{ color: "#6E88A3" }} className="text-sm">{txt}</span></div>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ color: C.bg, fontFamily: "'Space Mono', monospace" }} className="font-semibold mb-3 text-xs tracking-wide uppercase">Tezkor havolalar</h4>
            <div className="flex flex-col gap-2">
              {navItems.map((n) => (<button key={n.label} onClick={() => scrollTo(n.id)} style={{ color: "#6E88A3" }} className="text-sm text-left hover:text-white transition-colors">{n.label}</button>))}
              <button onClick={() => setMode("staff")} style={{ color: "#6E88A3" }} className="text-sm text-left hover:text-white transition-colors">Xodimlar paneli</button>
            </div>
          </div>
          <div>
            <h4 style={{ color: C.bg, fontFamily: "'Space Mono', monospace" }} className="font-semibold mb-3 text-xs tracking-wide uppercase">Ijtimoiy tarmoqlarimiz</h4>
            <div className="flex flex-col gap-2">
              {socialLinks.length > 0 ? (
                socialLinks.map((s) => (
                  <a key={s.id} href={s.url} target="_blank" rel="noreferrer" style={{ color: "#6E88A3" }} className="text-sm hover:text-white transition-colors">{s.platform}</a>
                ))
              ) : (
                <span style={{ color: "#4E698A" }} className="text-xs">Tez orada qo'shiladi</span>
              )}
            </div>
          </div>
        </div>
        <div style={{ borderColor: "#1C334E" }} className="max-w-6xl mx-auto border-t mt-10 pt-6">
          <p style={{ color: "#4E698A", fontFamily: "'Space Mono', monospace" }} className="text-xs text-center">
            © {new Date().getFullYear()} Pahlavon tibbiyot markazi. Barcha huquqlar himoyalangan. — by{" "}
            <a href={DEVELOPER_LINK} target="_blank" rel="noreferrer" style={{ color: C.gold }} className="hover:underline">Khazratov</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

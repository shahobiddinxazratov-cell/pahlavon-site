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
const API_BASE_URL = "http://localhost:3001";

// Footer'dagi "by Khazratov" shu havolaga olib boradi — o'zingizning
// Telegram/Instagram/portfolio manzilingizni shu yerga yozing.
const DEVELOPER_LINK = "https://t.me/your_username";

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

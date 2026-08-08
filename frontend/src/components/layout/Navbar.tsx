"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Code2,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown,
  Sun,
  Moon,
  Search,
  Flame,
  Target,
  Award,
  MoreHorizontal,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import GlobalSearch from "@/components/search/GlobalSearch";
import { useStreak } from "@/hooks/useStreak";

const primaryNavLinks = [
  { href: "/", label: "Home" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/quiz", label: "Quiz" },
];

const secondaryNavLinks = [
  { href: "/courses", label: "Courses" },
  { href: "/interview-questions", label: "Interview Questions" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const { user, logout, isLoading: authLoading } = useAuth();
  const { theme, setTheme } = useTheme();
  const { data: streak } = useStreak();

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  // Track scroll for glassmorphism transition
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (isOpen || showUserMenu || showMoreMenu) {
      queueMicrotask(() => {
        setIsOpen(false);
        setShowUserMenu(false);
        setShowMoreMenu(false);
      });
    }
  }, [pathname]);

  // Press "/" to open search, Escape to close menus
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement).tagName;
    if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
      e.preventDefault();
      setSearchOpen(true);
    }
    if (e.key === "Escape") {
      setShowUserMenu(false);
      setShowMoreMenu(false);
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Glassmorphism style — transparent at top, frosted glass after scroll
  const navStyle = scrolled
    ? {
        backgroundColor: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        boxShadow:
          "0 1px 0 0 rgba(0,0,0,0.04), 0 4px 24px -4px rgba(0,0,0,0.06)",
      }
    : {
        backgroundColor: "transparent",
        backdropFilter: "blur(0px)",
        borderBottom: "1px solid transparent",
        boxShadow: "none",
      };

  const navStyleDark = scrolled
    ? {
        backgroundColor: "rgba(3,7,18,0.82)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        boxShadow:
          "0 1px 0 0 rgba(255,255,255,0.04), 0 4px 24px -4px rgba(0,0,0,0.3)",
      }
    : {
        backgroundColor: "transparent",
        backdropFilter: "blur(0px)",
        borderBottom: "1px solid transparent",
        boxShadow: "none",
      };

  return (
    <>
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />

      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        role="navigation"
        aria-label="Main navigation"
        style={
          mounted
            ? theme === "dark"
              ? navStyleDark
              : navStyle
            : {
                backgroundColor: "rgba(255,255,255,0.82)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
              }
        }
        animate={{ y: 0 }}
        initial={{ y: -4 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              data-cursor-grow
            >
              <motion.div
                whileHover={{ scale: 1.12, rotate: -6 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md"
              >
                <Code2 className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                BEECODEFI
              </span>
            </Link>

            {/* Desktop Navigation - Primary Links */}
            <div className="hidden lg:flex items-center gap-1">
              {primaryNavLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-cursor-grow
                    className={cn(
                      "relative px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200",
                      active
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
                    )}
                  >
                    {link.label}
                    {/* Active underline pill */}
                    {active && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-lg bg-indigo-50 dark:bg-indigo-950/60"
                        style={{ zIndex: -1 }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 34,
                        }}
                      />
                    )}
                  </Link>
                );
              })}

              {/* More Dropdown for Secondary Links */}
              <div className="relative">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200",
                    "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-white/5"
                  )}
                  aria-label="More navigation options"
                  aria-expanded={showMoreMenu}
                  aria-haspopup="true"
                  data-cursor-grow
                >
                  More
                  <motion.span
                    animate={{ rotate: showMoreMenu ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {showMoreMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute left-0 mt-2 w-48 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/60 dark:border-white/8 py-2 overflow-hidden"
                    >
                      {secondaryNavLinks.map((link) => {
                        const active = pathname === link.href;
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setShowMoreMenu(false)}
                            className={cn(
                              "flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors",
                              active
                                ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-white/6"
                            )}
                          >
                            {link.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right — Search + Streak + Theme + Auth */}
            <div className="hidden md:flex items-center gap-3">
              {/* Search */}
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={() => setSearchOpen(true)}
                data-tour="search"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-white/5 transition-colors border border-gray-200/70 dark:border-white/8"
                aria-label="Search"
                data-cursor-grow
              >
                <Search className="w-4 h-4" />
                <span className="text-xs hidden lg:inline">Search</span>
                <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] text-gray-400 bg-gray-100 dark:bg-white/5 rounded border border-gray-200 dark:border-white/10">
                  /
                </kbd>
              </motion.button>

              {/* Level & XP — logged-in only */}
              {mounted && user && (
                <div className="flex items-center gap-1.5 hidden lg:flex">
                  <div
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800/40 text-indigo-600 dark:text-indigo-400 text-xs font-bold shadow-sm"
                    title={`${user.totalXP} Total XP`}
                  >
                    <span className="text-[10px] uppercase opacity-80 tracking-wider">Lvl</span>
                    {user.level || 1}
                  </div>
                </div>
              )}

              {/* Streak — logged-in only */}
              {mounted && user && streak.current > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/40 text-orange-600 dark:text-orange-400 text-xs font-bold shadow-sm"
                  title={`${streak.current} day streak! Longest: ${streak.longest}`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  {streak.current}
                </motion.div>
              )}

              {/* Theme toggle */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.88, rotate: 15 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-white/5 transition-colors"
                aria-label="Toggle theme"
                data-cursor-grow
              >
                {mounted &&
                  (theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  ))}
              </motion.button>

              {/* User menu / auth — skeleton while auth resolves to prevent flash */}
              {!mounted || authLoading ? (
                <div className="w-20 h-8 rounded-lg bg-gray-100 dark:bg-gray-800/60 animate-pulse" />
              ) : user ? (
                <div className="relative">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    data-tour="user-menu"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-white/5 transition-colors"
                    aria-label="User menu"
                    aria-expanded={showUserMenu}
                    aria-haspopup="true"
                    data-cursor-grow
                  >
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-200 dark:border-white/10 shrink-0 shadow-sm">
                      {user.profileImageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={user.profileImageUrl}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                          <span className="text-xs text-white font-bold">
                            {user.name[0].toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="whitespace-nowrap">{user.name}</span>
                    <motion.span
                      animate={{ rotate: showUserMenu ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </motion.button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 mt-2 w-52 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/60 dark:border-white/8 py-2 overflow-hidden"
                      >
                        {user.username && (
                          <Link
                            href={`/u/${user.username}`}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-white/6 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <UserPlus className="w-4 h-4" /> Public Profile
                          </Link>
                        )}
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-white/6 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Target className="w-4 h-4" /> My Learning
                        </Link>
                        <Link
                          href="/badges"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-white/6 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Award className="w-4 h-4" /> Badges
                        </Link>
                        <div className="border-t border-gray-200/60 dark:border-white/8 my-1.5 mx-3" />
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }}
                          className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <motion.div whileTap={{ scale: 0.96 }}>
                    <Link
                      href="/login"
                      className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      data-cursor-grow
                    >
                      <LogIn className="w-4 h-4" /> Login
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Link
                      href="/register"
                      className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md shadow-indigo-500/25"
                      data-cursor-grow
                    >
                      <UserPlus className="w-4 h-4" /> Sign Up
                    </Link>
                  </motion.div>
                </>
              )}
            </div>

            {/* Mobile controls */}
            <div className="flex md:hidden items-center gap-1">
              {/* Mobile search icon */}
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-white/5 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.88, rotate: 15 }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-white/5 transition-colors"
                aria-label="Toggle theme"
              >
                {mounted &&
                  (theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  ))}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-white/5"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-nav"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.span
                      key="x"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="m"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="md:hidden border-t border-gray-200/60 dark:border-white/6 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {[...primaryNavLinks, ...secondaryNavLinks].map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                        pathname === link.href
                          ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-white/5",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-3 border-t border-gray-200/60 dark:border-white/8 space-y-1.5">
                  {/* Search row in mobile menu */}
                  <button
                    onClick={() => {
                      setSearchOpen(true);
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2.5 w-full px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-white/5 rounded-xl"
                  >
                    <Search className="w-4 h-4" /> Search lessons
                    <kbd className="ml-auto text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-400">
                      /
                    </kbd>
                  </button>
                  {user ? (
                    <>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-white/5 rounded-xl"
                      >
                        <Target className="w-4 h-4" /> My Learning
                      </Link>
                      <Link
                        href="/badges"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-white/5 rounded-xl"
                      >
                        <Award className="w-4 h-4" /> Badges
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-white/5 rounded-xl"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 text-sm font-semibold text-center text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-md"
                      >
                        Sign Up Free
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

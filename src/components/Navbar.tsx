"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "./Navbar.module.css";
import { useEffect } from "react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Tests", path: "/tests" },
  { name: "Notes", path: "/notes" },
  { name: "Videos", path: "/videos" },
  { name: "Quizzes", path: "/quizzes" },
  { name: "Progress", path: "/progress" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute("data-theme", !isDarkMode ? "dark" : "light");
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsProfileOpen(false);
    router.push("/login");
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <img src="/images/logo.jpg" alt="Logo" className={styles.logoImg} />
          <span>Dreams</span>
        </Link>

        {/* Desktop Links */}
        <div className={styles.links}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`${styles.link} ${pathname === link.path ? styles.active : ""}`}
            >
              {link.name}
              <span className={styles.underline} />
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className={styles.actions}>
          <button 
            className={styles.themeToggle} 
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
          
          {user ? (
            <div className={styles.profileWrapper}>
              <button 
                className={styles.profileIcon} 
                onClick={toggleProfile}
                aria-label="User Profile"
              >
                <img 
                  src={user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
                  alt="Profile" 
                  className={styles.avatar} 
                />
              </button>

              {isProfileOpen && (
                <div className={`${styles.profileDropdown} glass animate-dropdown`}>
                  <div className={styles.dropdownHeader}>
                    <strong>{user.user_metadata?.full_name || user.email.split('@')[0]}</strong>
                    <span>Master Student</span>
                  </div>
                  <div className={styles.dropdownDivider} />
                  <Link href="/profile" className={styles.dropdownLink} onClick={() => setIsProfileOpen(false)}>
                    👤 View Profile
                  </Link>
                  <Link href="/dashboard" className={styles.dropdownLink} onClick={() => setIsProfileOpen(false)}>
                    📊 Dashboard
                  </Link>
                  <div className={styles.dropdownDivider} />
                  <button className={styles.logoutBtn} onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className={styles.loginBtnNav}>
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button 
            className={styles.burger} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open Menu"
          >
            <div className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`} />
            <div className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`} />
            <div className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${isMenuOpen ? styles.drawerOpen : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={styles.mobileLink}
            onClick={() => setIsMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
        <Link 
          href="/profile" 
          className={styles.mobileLink} 
          onClick={() => setIsMenuOpen(false)}
        >
          Profile
        </Link>
      </div>
    </nav>
  );
}

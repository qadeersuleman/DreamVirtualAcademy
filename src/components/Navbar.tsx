"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { WhatsAppIcon } from "@/components/Icons";
import { User as UserIcon, LayoutDashboard, LogOut } from "lucide-react";
import styles from "./Navbar.module.css";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Batches", path: "/courses" },
  { name: "Videos", path: "/videos" },
  { name: "Notes", path: "/notes" },
  { name: "Tests", path: "/tests" },
  { name: "Quizzes", path: "/quizzes" },
  { name: "Progress", path: "/progress" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);

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
        <Link href="/" className={styles.logo} aria-label="Dreams Virtual Academy Home">
          <img 
            src="/images/logo-title-light.png" 
            alt="Dreams Virtual Academy" 
            className={styles.logoLight} 
          />
          <img 
            src="/images/logo-title-dark.png" 
            alt="Dreams Virtual Academy" 
            className={styles.logoDark} 
          />
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
         
          
          <a 
            href="https://wa.me/923018183624" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.whatsappBtn}
            title="Contact on WhatsApp"
          >
            <WhatsAppIcon size={18} />
            <span className={styles.whatsappBtnText}>WhatsApp</span>
          </a>
          
          {user ? (
            <div className={styles.profileWrapper}>
              <button 
                className={styles.profileIcon} 
                onClick={toggleProfile}
                aria-label="User Profile"
              >
                <img 
                  src={user.user_metadata?.avatar_url || '/images/profile.png'} 
                  alt="Profile" 
                  className={styles.avatar} 
                />
              </button>

              {isProfileOpen && (
                <div className={`${styles.profileDropdown} glass animate-dropdown`}>
                  <div className={styles.dropdownHeader}>
                    <strong>{user?.user_metadata?.full_name || (user?.email ? user.email.split('@')[0] : 'Student')}</strong>
                    <span>Master Student</span>
                  </div>
                  <div className={styles.dropdownDivider} />
                  <Link href="/profile" className={styles.dropdownLink} onClick={() => setIsProfileOpen(false)}>
                    <UserIcon size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                    View Profile
                  </Link>
                  <Link href="/dashboard" className={styles.dropdownLink} onClick={() => setIsProfileOpen(false)}>
                    <LayoutDashboard size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                    Dashboard
                  </Link>
                  <div className={styles.dropdownDivider} />
                  <button className={styles.logoutBtn} onClick={handleLogout}>
                    <LogOut size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                    Logout
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

      {/* Mobile Drawer Backdrop */}
      {isMenuOpen && (
        <div
          className={styles.mobileBackdrop}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${isMenuOpen ? styles.drawerOpen : ""}`}>
        <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img 
            src="/images/logo-title-light.png" 
            alt="Dreams Virtual Academy" 
            style={{ height: '38px', width: 'auto', objectFit: 'contain' }} 
          />
        </div>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`${styles.mobileLink} ${pathname === link.path ? styles.mobileLinkActive : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span>{link.name}</span>
            {pathname === link.path && <span style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>●</span>}
          </Link>
        ))}
        <Link 
          href="/profile" 
          className={`${styles.mobileLink} ${pathname === "/profile" ? styles.mobileLinkActive : ""}`} 
          onClick={() => setIsMenuOpen(false)}
        >
          <span>Profile / شاگرد</span>
          {pathname === "/profile" && <span style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>●</span>}
        </Link>
        <a 
          href="https://wa.me/923018183624" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.mobileLink}
          style={{ color: '#25D366', display: 'flex', alignItems: 'center', gap: '0.6rem', borderTop: '1px dashed var(--card-border)', paddingTop: '1rem', marginTop: 'auto', fontWeight: 700 }}
          onClick={() => setIsMenuOpen(false)}
        >
          <WhatsAppIcon size={20} />
          <span>WhatsApp Support</span>
        </a>
      </div>
    </nav>
  );
}

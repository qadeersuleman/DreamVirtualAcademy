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
         
          
          <a 
            href="https://wa.me/923018183624" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.whatsappBtn}
            title="Contact on WhatsApp"
          >
            <svg 
              className={styles.whatsappIcon}
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.747 1.451 5.436.002 9.861-4.422 9.864-9.864.001-2.637-1.03-5.114-2.905-6.99C16.48 1.876 14.004.844 11.37.844 5.926.844 1.502 5.267 1.5 10.711c-.001 1.636.43 3.226 1.248 4.637L1.76 19.86l4.887-1.283zm13.11-5.733c-.266-.134-1.579-.78-1.823-.867-.243-.088-.419-.133-.596.134-.176.266-.681.867-.835 1.044-.154.177-.308.2-.574.067-.266-.134-1.127-.415-2.147-1.326-.79-.706-1.325-1.577-1.48-1.844-.155-.267-.017-.411.116-.544.12-.12.267-.311.4-.467.13-.156.177-.267.266-.445.09-.178.044-.334-.022-.467-.067-.134-.596-1.436-.816-1.97-.216-.519-.454-.447-.624-.456-.162-.008-.348-.01-.534-.01-.186 0-.49.07-.746.347-.256.278-.979.957-.979 2.335 0 1.378 1.002 2.71 1.142 2.898.14.188 1.972 3.012 4.777 4.22.667.288 1.189.46 1.597.59.67.213 1.28.183 1.761.11.536-.08 1.58-.646 1.8-.1.22-.547.22-1.01.154-1.077-.066-.067-.243-.134-.51-.268z"/>
            </svg>
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
        <a 
          href="https://wa.me/923018183624" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.mobileLink}
          style={{ color: '#25D366', display: 'flex', alignItems: 'center', gap: '0.5rem', borderTop: '1px dashed var(--card-border)', paddingTop: '1rem', marginTop: 'auto' }}
          onClick={() => setIsMenuOpen(false)}
        >
          💬 WhatsApp Support
        </a>
      </div>
    </nav>
  );
}

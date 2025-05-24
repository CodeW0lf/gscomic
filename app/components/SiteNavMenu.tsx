import React, { useEffect, useRef, useState } from 'react';
import { SlArrowDown } from 'react-icons/sl';
import { AnimatePresence, motion } from 'motion/react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { NewBadge } from '~/components/NewBadge';

export interface SiteNavMenuLink {
  linkName: string;
  path: string;
  newBadge?: boolean;
}
export interface SiteNavMenuProps {
  defaultLinkName?: string;
  defaultPath?: string;
  navLinks: SiteNavMenuLink[];
}
export function SiteNavMenu({ defaultLinkName, defaultPath, navLinks }: SiteNavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonText, setButtonText] = useState(defaultLinkName ?? 'Menu');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const showMenu = isOpen && navLinks?.length > 0;
  const isMenuPathActive = navLinks.some((link) => location.pathname.startsWith(link.path));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const activeLink = navLinks.find((link) => location.pathname.startsWith(link.path));
    if (activeLink) {
      setButtonText(activeLink.linkName);
    } else {
      setButtonText(defaultLinkName ?? 'Menu');
    }
  }, [location.pathname, navLinks, defaultLinkName]);

  return (
    <div
      ref={dropdownRef}
      className="relative h-fit w-fit cursor-pointer"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={`relative flex cursor-pointer items-center gap-2 ${isMenuPathActive ? 'text-white' : 'text-primary'}`}
        onClick={() => {
          if (!isMenuPathActive) {
            navigate(defaultPath ?? '/', { replace: true });
            setIsOpen(false);
          } else {
            setIsOpen(!isOpen);
          }
        }}
      >
        {buttonText}
        <motion.span initial={{ rotate: 0 }} animate={{ rotate: isOpen ? 180 : 0 }}>
          <SlArrowDown className="h-4 w-3" />
        </motion.span>
      </button>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute top-8 left-1/2 z-10 flex -translate-x-1/2 flex-col gap-4 rounded-md bg-gray-800 px-6 py-4 whitespace-nowrap shadow-lg"
          >
            <div className="absolute -top-4 right-0 left-0 h-4 bg-transparent" />
            {navLinks.map(({ linkName, path, newBadge }) => (
              <NavLink
                key={linkName}
                to={path}
                className={({ isActive }) => (isActive ? 'text-white' : 'text-primary hover:text-white')}
                onClick={() => {
                  setIsOpen(false);
                }}
                viewTransition
              >
                {linkName}
                {newBadge && <NewBadge />}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

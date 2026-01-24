"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaChevronRight,
  FaArrowUp,
  FaBuildingColumns,
  FaFileContract,
  FaUserGraduate,
  FaBookOpen,
} from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Scroll to top logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowTopBtn(true);
      else setShowTopBtn(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0b1121] text-slate-300 font-sans relative mt-auto border-t-[5px] border-yellow-600">
      {/* ===================== TOP BRANDING & SOCIALS ===================== */}
      <div className="border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center text-gecl-primary shadow-lg shadow-yellow-500/10">
              {/* Replace with <Image> if you have a logo file */}
              <FaBuildingColumns size={30} className="text-[#0b1121]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                GEC Lakhisarai
              </h2>
              <p className="text-xs text-yellow-500 font-bold uppercase tracking-[0.2em]">
                Est. 2019 • Govt. of Bihar
              </p>
            </div>
          </div>

          {/* UPDATED SOCIAL LINKS */}
          <div className="flex gap-3">
            <SocialBtn
              href="https://www.facebook.com/geclakhisaraiofficial"
              color="hover:bg-[#1877F2]"
              icon={<FaFacebookF />}
            />
            <SocialBtn
              href="https://twitter.com/geclakhisarai"
              color="hover:bg-black"
              icon={<FaXTwitter />}
            />
            <SocialBtn
              href="https://www.instagram.com/gec.lakhisarai.official"
              color="hover:bg-[#E1306C]"
              icon={<FaInstagram />}
            />
            <SocialBtn
              href="https://www.linkedin.com/in/startupcellgeclakhisarai/"
              color="hover:bg-[#0077B5]"
              icon={<FaLinkedinIn />}
            />
            <SocialBtn
              href="https://www.youtube.com/@geclakhisarai"
              color="hover:bg-[#FF0000]"
              icon={<FaYoutube />}
            />
            <SocialBtn
              href="https://whatsapp.com/channel/0029VaB7zs7A2pL8AiRKh63t"
              color="hover:bg-[#25D366]"
              icon={<FaWhatsapp />}
            />
          </div>
        </div>
      </div>

      {/* ===================== MAIN LINKS GRID (5 COLUMNS) ===================== */}
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* COL 1: CONTACT & MAP */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <FaLocationDot className="text-yellow-500" /> Contact Us
            </h3>
            <div className="space-y-4 text-sm">
              <p className="leading-relaxed">
                <span className="text-white font-semibold block mb-1">
                  Campus Address:
                </span>
                Shivsona Road, Kharsari, Chandwara, <br />
                Lakhisarai, Bihar -{" "}
                <span className="text-yellow-500 font-bold">811311</span>
              </p>
              <p>
                <span className="text-white font-semibold block mb-1">
                  Email & Phone:
                </span>
                <a
                  href="mailto:principal@geclakhisarai.ac.in"
                  className="hover:text-yellow-400 transition block"
                >
                  principal@geclakhisarai.ac.in
                </a>
                <a
                  href="tel:+919430056200"
                  className="hover:text-yellow-400 transition block"
                >
                  +91 94300 56200
                </a>
              </p>
            </div>

            {/* MINI MAP WIDGET */}
            <div className="w-full h-32 rounded-lg overflow-hidden border border-white/10 group relative">
              <iframe
                src="https://www.google.com/maps?q=Government%20Engineering%20College%20Lakhisarai&output=embed"
                className="w-full h-full grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition duration-500"
                loading="lazy"
                title="Mini Map"
              />
              <div className="absolute bottom-2 right-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded">
                View Large
              </div>
            </div>
          </div>

          {/* COL 2: ACADEMICS & DEPARTMENTS */}
          <div>
            <FooterHeading icon={<FaBookOpen />} title="Academics" />
            <ul className="space-y-2.5">
              <FooterLink href="/departments/cse-ai">
                Computer Science & Engg. AI
              </FooterLink>
              <FooterLink href="/departments/cse-ds">
                Computer Science & Engg. DS
              </FooterLink>
              <FooterLink href="/departments/civil">
                Civil Engineering
              </FooterLink>
              <FooterLink href="/departments/mechanical">
                Mechanical Engineering
              </FooterLink>
              <FooterLink href="/departments/electrical">
                Electrical & Electronics
              </FooterLink>
              <FooterLink href="/academics/syllabus">
                Syllabus & Curriculum
              </FooterLink>
              <FooterLink href="/academics/calendar">
                Academic Calendar
              </FooterLink>
              <FooterLink href="https://beu-bih.ac.in/result-one">
                University Results
              </FooterLink>
            </ul>
          </div>

          {/* COL 3: ADMINISTRATION & ADMISSION */}
          <div>
            <FooterHeading icon={<FaBuildingColumns />} title="Institute" />
            <ul className="space-y-2.5">
              <FooterLink href="/about/principal-message">
                Principal's Message
              </FooterLink>
              <FooterLink href="/about/bog">
                Board of Governors (BoG)
              </FooterLink>
              <FooterLink href="/about/administration">
                Administration Cell
              </FooterLink>
              <FooterLink href="/admissions">B.Tech Admission</FooterLink>
              <FooterLink href="/admissions/lateral-entry">
                Lateral Entry (LE)
              </FooterLink>
              <FooterLink href="/admissions/fee-structure">
                Fee Structure
              </FooterLink>
              <FooterLink href="/tenders">Tenders & Quotations</FooterLink>
            </ul>
          </div>

          {/* COL 4: STUDENT CORNER & FACILITIES */}
          <div>
            <FooterHeading icon={<FaUserGraduate />} title="Student Life" />
            <ul className="space-y-2.5">
              <FooterLink href="/campus-life/library">
                Central Library
              </FooterLink>
              <FooterLink href="/campus-life/hostel">
                Hostels (Boys/Girls)
              </FooterLink>
              <FooterLink href="/placement">Training & Placement</FooterLink>
              <FooterLink href="/clubs/robotics">Robotics Club</FooterLink>
              <FooterLink href="/student/nss">NSS / NCC</FooterLink>
              <FooterLink href="/student/alumni">Alumni Association</FooterLink>
              <FooterLink href="/student/scholarship">Scholarships</FooterLink>
            </ul>
          </div>

          {/* COL 5: MANDATORY DISCLOSURES */}
          <div>
            <FooterHeading icon={<FaFileContract />} title="Mandatory" />
            <ul className="space-y-2.5">
              <FooterLink href="/mandatory/aicte">AICTE Approvals</FooterLink>
              <FooterLink href="/mandatory/nirf">NIRF Ranking</FooterLink>
              <FooterLink href="/mandatory/rti">RTI Cell</FooterLink>
              <FooterLink href="/academics/anti-ragging">
                Anti-Ragging
              </FooterLink>
              <FooterLink href="/mandatory/icc">
                Internal Complaint (ICC)
              </FooterLink>
              <ExternalLink href="https://state.bihar.gov.in/dst">
                DST Bihar
              </ExternalLink>
            </ul>
          </div>
        </div>
      </div>

      {/* ===================== BOTTOM BAR ===================== */}
      <div className="border-t border-white/10 bg-[#05080f]">
        <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear}{" "}
            <span className="text-slate-300 font-medium">
              Government Engineering College, Lakhisarai
            </span>
            . All Rights Reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/sitemap" className="hover:text-yellow-500 transition">
              Sitemap
            </Link>
            <Link
              href="/legal/privacy"
              className="hover:text-yellow-500 transition"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/disclaimer"
              className="hover:text-yellow-500 transition"
            >
              Disclaimer
            </Link>
            <span className="text-slate-700">|</span>
            <span>Designed with ❤️ in Bihar</span>
          </div>
        </div>
      </div>

      {/* ===================== BACK TO TOP BTN ===================== */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-yellow-600 text-white p-3.5 rounded-full shadow-lg shadow-yellow-600/40 hover:bg-yellow-500 hover:-translate-y-1 transition-all duration-300 z-50 ${
          showTopBtn
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        title="Scroll to Top"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
}

/* ===================== HELPER COMPONENTS ===================== */

function FooterHeading({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2 pb-2 border-b border-white/10 w-fit">
      <span className="text-yellow-500">{icon}</span> {title}
    </h3>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-2 text-[14px] text-slate-400 hover:text-white transition-colors duration-200"
      >
        <FaChevronRight className="text-[10px] text-yellow-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        <span className="group-hover:translate-x-1 transition-transform duration-200">
          {children}
        </span>
      </Link>
    </li>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 text-[14px] text-slate-400 hover:text-yellow-400 transition-colors duration-200"
      >
        <FaChevronRight className="text-[10px] text-yellow-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        <span className="group-hover:translate-x-1 transition-transform duration-200">
          {children} ↗
        </span>
      </a>
    </li>
  );
}

function SocialBtn({
  href,
  icon,
  color,
}: {
  href: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 ${color}`}
    >
      {icon}
    </a>
  );
}

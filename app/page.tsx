"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Globe, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMobile } from "@/hooks/use-mobile"

export default function WelcomeScreen() {
  const [mounted, setMounted] = useState(false)
  const [language, setLanguage] = useState("ar") // Default to Arabic
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useMobile()

  // RTL direction based on language
  const isRTL = language === "ar"

  useEffect(() => {
    setMounted(true)
    // Set document direction based on language
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
  }, [isRTL])

  const handleOpenWebsite = () => {
    window.open("https://stckw.com", "_blank")
  }

  const handleCall = () => {
    window.location.href = "tel:+9651234567"
  }

  const handleEmail = () => {
    window.location.href = "mailto:contact@stckw.com"
  }

  // Translations
  const translations = {
    en: {
      welcome: "Welcome to STC KW",
      description:
        "A leading provider of innovative telecommunications solutions in Kuwait. We're committed to connecting people and businesses with cutting-edge technology.",
      announcement: "Latest Announcement",
      announcementText:
        "Discover our new business solutions package, designed to enhance your company's connectivity and efficiency.",
      openWebsite: "Open Official Website",
      callUs: "Call Us",
      emailUs: "Email Us",
      visitWebsite: "Visit Website",
      followUs: "Follow Us",
      appStore: "App Store",
      googlePlay: "Google Play",
      privacy: "Privacy",
      terms: "Terms",
      contact: "Contact",
      support: "Support",
      copyright: "© " + new Date().getFullYear() + " STC KW. All rights reserved.",
    },
    ar: {
      welcome: "مرحباً بكم في STC الكويت",
      description: "مزود رائد لحلول الاتصالات المبتكرة في الكويت. نحن ملتزمون بربط الأفراد والشركات بأحدث التقنيات.",
      announcement: "أحدث الإعلانات",
      announcementText: "اكتشف باقة حلول الأعمال الجديدة، المصممة لتعزيز اتصال شركتك وكفاءتها.",
      openWebsite: "فتح الموقع الرسمي",
      callUs: "اتصل بنا",
      emailUs: "راسلنا",
      visitWebsite: "زيارة الموقع",
      followUs: "تابعنا",
      appStore: "آب ستور",
      googlePlay: "جوجل بلاي",
      privacy: "الخصوصية",
      terms: "الشروط",
      contact: "اتصل بنا",
      support: "الدعم",
      copyright: "© " + new Date().getFullYear() + " STC الكويت. جميع الحقوق محفوظة.",
    },
  }

  const t = translations[language as keyof typeof translations]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 25px 25px, #2563eb 2px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Mobile Menu Button - Top Left or Right based on RTL */}
      <div className={`absolute top-6 ${isRTL ? "right-6" : "left-6"} z-20 md:hidden`}>
        <Button
          variant="outline"
          size="icon"
          className="bg-white/80 backdrop-blur-sm"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-10 p-6 pt-20 md:hidden">
          <div className="flex flex-col space-y-6" dir={isRTL ? "rtl" : "ltr"}>
            <Button variant="ghost" className="justify-start" onClick={handleCall}>
              <Phone className={`h-5 w-5 text-blue-600 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t.callUs}
            </Button>
            <Button variant="ghost" className="justify-start" onClick={handleEmail}>
              <Mail className={`h-5 w-5 text-blue-600 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t.emailUs}
            </Button>
            <Button variant="ghost" className="justify-start" onClick={handleOpenWebsite}>
              <ExternalLink className={`h-5 w-5 text-blue-600 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t.visitWebsite}
            </Button>
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium mb-4">{t.followUs}</h3>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Instagram, label: "Instagram" },
                ].map((social, index) => (
                  <button
                    key={index}
                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Language Selector - Top Right or Left based on RTL */}
      <div className={`absolute top-6 ${isRTL ? "left-6" : "right-6"} z-10`}>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[180px] bg-white/80 backdrop-blur-sm">
            <Globe className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ar">العربية</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Content Card */}
      <div
        className={`max-w-3xl w-full bg-white rounded-2xl shadow-[0_20px_50px_rgba(8,112,184,0.1)] overflow-hidden transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Header Section with Accent Color */}
        <div className="h-3 bg-gradient-to-r from-blue-600 to-blue-400"></div>

        <div className="p-6 md:p-12 flex flex-col items-center">
          {/* Logo Section */}
          <div className="relative w-28 h-28 md:w-40 md:h-40 mb-6 md:mb-8 bg-gradient-to-b from-slate-50 to-white rounded-full p-4 shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] flex items-center justify-center">
            <div className="relative w-20 h-20 md:w-32 md:h-32 transition-transform duration-500 hover:scale-105">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="STC KW Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Title Section */}
          <h1
            className={`text-3xl md:text-4xl font-bold text-center text-slate-800 mb-2 md:mb-3 tracking-tight ${isRTL ? "font-[Amiri,serif]" : ""}`}
          >
            {t.welcome}
          </h1>
          <div className="w-12 md:w-16 h-1 bg-blue-600 mb-4 md:mb-6 rounded-full"></div>

          {/* Company Description */}
          <p
            className={`text-slate-600 text-center mb-6 md:mb-8 text-base md:text-lg max-w-xl leading-relaxed ${isRTL ? "font-[Amiri,serif]" : ""}`}
          >
            {t.description}
          </p>

          {/* Announcement Box */}
          <div
            className={`w-full bg-blue-50 border-${isRTL ? "r" : "l"}-4 border-blue-500 p-3 md:p-4 rounded-${isRTL ? "l" : "r"} mb-6 md:mb-8`}
          >
            <h3 className={`font-semibold text-blue-700 text-sm md:text-base ${isRTL ? "font-[Amiri,serif]" : ""}`}>
              {t.announcement}
            </h3>
            <p className={`text-blue-600 text-xs md:text-sm mt-1 ${isRTL ? "font-[Amiri,serif]" : ""}`}>
              {t.announcementText}
            </p>
          </div>

          {/* Main Button */}
          <Button
            size={isMobile ? "default" : "lg"}
            className={`w-full md:w-3/4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-5 md:py-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg ${isRTL ? "font-[Amiri,serif]" : ""}`}
            onClick={handleOpenWebsite}
          >
            <ExternalLink className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
            {t.openWebsite}
          </Button>

          {/* Mobile App Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full md:w-3/4">
            <Button
              variant="outline"
              className={`flex-1 border-slate-300 hover:bg-slate-100 hover:text-slate-900 ${isRTL ? "font-[Amiri,serif]" : ""}`}
              onClick={() => window.open("https://apps.apple.com/app/stckw", "_blank")}
            >
              <svg className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              {t.appStore}
            </Button>
            <Button
              variant="outline"
              className={`flex-1 border-slate-300 hover:bg-slate-100 hover:text-slate-900 ${isRTL ? "font-[Amiri,serif]" : ""}`}
              onClick={() => window.open("https://play.google.com/store/apps/details?id=com.stckw", "_blank")}
            >
              <svg className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              {t.googlePlay}
            </Button>
          </div>

          {/* Contact Information - Clickable on Mobile */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 text-slate-600 w-full">
            <Button
              variant="ghost"
              className={`flex items-center justify-center sm:justify-start ${isRTL ? "font-[Amiri,serif]" : ""}`}
              onClick={handleCall}
            >
              <Phone className={`h-4 w-4 text-blue-600 ${isRTL ? "ml-2" : "mr-2"}`} />
              <span>+965 1234 5678</span>
            </Button>
            <Button
              variant="ghost"
              className={`flex items-center justify-center sm:justify-start ${isRTL ? "font-[Amiri,serif]" : ""}`}
              onClick={handleEmail}
            >
              <Mail className={`h-4 w-4 text-blue-600 ${isRTL ? "ml-2" : "mr-2"}`} />
              <span>contact@stckw.com</span>
            </Button>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-4 mt-6 md:mt-8">
            {[
              { icon: Facebook, label: "Facebook" },
              { icon: Twitter, label: "Twitter" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Instagram, label: "Instagram" },
            ].map((social, index) => (
              <button
                key={index}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-colors duration-300"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 md:px-12 py-4 md:py-6 border-t border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-xs md:text-sm text-slate-500 ${isRTL ? "font-[Amiri,serif]" : ""}`}>{t.copyright}</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <span
                className={`text-xs md:text-sm text-slate-500 hover:text-blue-600 cursor-pointer transition-colors ${isRTL ? "font-[Amiri,serif]" : ""}`}
              >
                {t.privacy}
              </span>
              <span
                className={`text-xs md:text-sm text-slate-500 hover:text-blue-600 cursor-pointer transition-colors ${isRTL ? "font-[Amiri,serif]" : ""}`}
              >
                {t.terms}
              </span>
              <span
                className={`text-xs md:text-sm text-slate-500 hover:text-blue-600 cursor-pointer transition-colors ${isRTL ? "font-[Amiri,serif]" : ""}`}
              >
                {t.contact}
              </span>
              <span
                className={`text-xs md:text-sm text-slate-500 hover:text-blue-600 cursor-pointer transition-colors ${isRTL ? "font-[Amiri,serif]" : ""}`}
              >
                {t.support}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

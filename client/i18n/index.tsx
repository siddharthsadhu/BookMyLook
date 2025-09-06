import { createContext, useContext, useMemo, useState, ReactNode } from "react";

export type Lang = "en" | "hi" | "gu";

type Dict = Record<string, string>;

type Translations = Record<Lang, Dict>;

const translations: Translations = {
  en: {
    app_name: "Book My Look",
    tagline: "Smart Queue Management & Salon Bookings",
    get_started: "Book Now",
    download_app: "Get the App",
    hero_sub: "Skip the wait. Join live queues, book appointments, and get notified when it's your turn.",
    features_title: "Why Choose Book My Look",
    f1: "Live queue tracking",
    f2: "Instant bookings",
    f3: "Loyalty & rewards",
    f4: "Secure online payments",
    services_title: "Popular Services",
    view_all: "View all",
    salons: "Salons",
    barbers: "Barbers",
    spa: "Spa",
    filter_all: "All",
    real_time_updates: "Real-time updates",
    est_wait: "Est. wait",
    mins: "mins",
    nav_home: "Home",
    nav_services: "Services",
    nav_about: "About",
    nav_booking: "Booking",
    nav_contact: "Contact",
    nav_dashboards: "Dashboards",
    customer: "Customer",
    owner: "Owner",
    admin: "Admin",
    footer_cta: "Join thousands simplifying their salon visits",
    newsletter_placeholder: "Enter your email",
    subscribe: "Subscribe",
    estimate_wait: "Estimate Wait",
  },
  hi: {
    app_name: "बुक माय लुक",
    tagline: "स्मार्ट कतार प्रबंधन और सैलून बुकिंग",
    get_started: "अभी बुक करें",
    download_app: "ऐप डाउनलोड करें",
    hero_sub: "इंतज़ार छोड़ें। लाइव कतार में शामिल हों, अपॉइंटमेंट बुक करें और आपकी बारी पर नोटिफिकेशन पाएं।",
    features_title: "क्यों चुनें बुक माय लुक",
    f1: "लाइव क्यू ट्रैकिंग",
    f2: "तुरंत बुकिंग",
    f3: "लॉयल्टी और रिवार्ड्स",
    f4: "सुरक्षित ऑनलाइन भुगतान",
    services_title: "लोकप्रिय सेवाएँ",
    view_all: "सभी देखें",
    salons: "सैलून",
    barbers: "नाई",
    spa: "स्पा",
    filter_all: "सभी",
    real_time_updates: "रीयल-टाइम अपडेट",
    est_wait: "आ. प्रतीक्षा",
    mins: "मिनट",
    nav_home: "होम",
    nav_services: "सेवाएँ",
    nav_about: "अबाउट",
    nav_booking: "बुकिंग",
    nav_contact: "संपर्क",
    nav_dashboards: "डैशबोर्ड",
    customer: "कस्टमर",
    owner: "ओनर",
    admin: "एडमिन",
    footer_cta: "हज़ारों लोगों से जुड़ें जो सैलून विज़िट को आसान बना रहे हैं",
    newsletter_placeholder: "अपना ईमेल दर्ज करें",
    subscribe: "सब्सक्राइब",
    estimate_wait: "प्रतीक्षा समय अनुमान",
  },
  gu: {
    app_name: "બુક માય લુક",
    tagline: "સ્માર્ટ કતાર પ્રબંધન અને સેલોન બુકિંગ",
    get_started: "હવે બુક કરો",
    download_app: "એપ ડાઉનલોડ કરો",
    hero_sub: "રાહ નહિ. લાઈવ કતારમાં જોડાઓ, એપોઈન્ટમેન્ટ બુક કરો અને તમારી વારમાં સૂચના મેળવો.",
    features_title: "શા માટે બુક માય લુક પસંદ કરો",
    f1: "લાઈવ કતાર ટ્રેકિંગ",
    f2: "તાત્કાલિક બુકિંગ",
    f3: "લોયલ્ટી અને રિવોર્ડ્સ",
    f4: "સુરક્ષિત ઑનલાઇન પેમેન્ટ",
    services_title: "લોકપ્રિય સેવાઓ",
    view_all: "બધું જુઓ",
    salons: "સેલોન",
    barbers: "બાર્બર",
    spa: "સ્પા",
    filter_all: "બધું",
    real_time_updates: "રીયલ-ટાઈમ અપડેટ્સ",
    est_wait: "આ. રાહ",
    mins: "મિનિટ",
    nav_home: "હોમ",
    nav_services: "સેવાઓ",
    nav_about: "વિશે",
    nav_booking: "બુકિંગ",
    nav_contact: "સંપર્ક",
    nav_dashboards: "ડેશબોર્ડ",
    customer: "કસ્ટમર",
    owner: "ઓનર",
    admin: "એડમિન",
    footer_cta: "હજાર��� લોકો સાથે જોડાઓ જે સેલોન મુલાકાતોને સરળ બનાવે છે",
    newsletter_placeholder: "તમારું ઇમેઇલ દાખલ કરો",
    subscribe: "સબ્સ્ક્રાઇબ",
    estimate_wait: "રાહ સમય અંદાજ",
  },
};

interface I18nCtx {
  lang: Lang;
  t: (k: string) => string;
  setLang: (l: Lang) => void;
}

const I18nContext = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = useMemo(() => {
    const dict = translations[lang];
    return (k: string) => dict[k] ?? k;
  }, [lang]);
  return (
    <I18nContext.Provider value={{ lang, t, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";

export default function Footer(){
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t">
      <div className="container py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center text-white font-bold">B</div>
            <span className="font-semibold">{t("app_name")}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-3 max-w-sm">{t("footer_cta")}</p>
        </div>
        <div>
          <h4 className="font-medium mb-3">{t("nav_services")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Haircut</li>
            <li>Beard Trim</li>
            <li>Facial & Spa</li>
            <li>Coloring</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Careers</li>
            <li>Blog</li>
            <li>Support</li>
            <li>Legal</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-3">Newsletter</h4>
          <form className="flex gap-2">
            <input type="email" required placeholder={t("newsletter_placeholder")} className="w-full rounded-md border px-3 py-2 text-sm" aria-label="Email" />
            <Button type="submit">{t("subscribe")}</Button>
          </form>
          <div className="flex gap-3 mt-4 text-muted-foreground">
            <a aria-label="Twitter" href="#" className="hover:text-foreground">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12 7.28v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
            </a>
            <a aria-label="Instagram" href="#" className="hover:text-foreground">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm0 2h10c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3zm11 2a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10z"/></svg>
            </a>
            <a aria-label="LinkedIn" href="#" className="hover:text-foreground">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4zM8.5 8h3.8v2.2h.1c.5-1 1.8-2.2 3.7-2.2 4 0 4.8 2.6 4.8 6V24h-4v-5.3c0-1.3 0-3-1.8-3s-2.2 1.4-2.2 2.9V24h-4z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Book My Look. All rights reserved.</div>
    </footer>
  );
}

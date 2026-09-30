import Navbar from "@/components/NavbarServer";
import Footer from "@/components/FooterServer";
import { BreadcrumbBar } from "@/components/Breadcrumbs";
import CookieSettingsButton from "@/components/consent/CookieSettingsButton";
import { makeMeta } from "@/lib/metadata";
import { getSiteSettings } from "@/lib/siteSettings";

export const metadata = makeMeta({
  title: "Cookies",
  description: "The cookies and browser storage birminghamremovals.uk uses, and how to change your answer.",
  path: "/cookies",
});

const withConsent = [
  {
    name: "Google Analytics",
    what: "Counts visits and the pages people look at, so we can see which pages help people find us.",
    stored: "Cookies named _ga and _ga_ followed by an ID, kept for up to two years.",
  },
  {
    name: "Smartlook",
    what: "Records a replay of your visit (what is on screen, mouse movement, clicks and scrolling) so we can find what is hard to use. It is set to keep its data in the EU.",
    stored: "Cookies and browser storage whose names start with SL_, kept for as long as Smartlook sets them; declining or taking back a yes removes them.",
  },
];

const always = [
  {
    name: "Your cookie answer",
    stored: "A cookie named br_consent, kept for six months, so we do not ask again on every page.",
  },
  {
    name: "Your quote",
    stored:
      "While you fill in the quote form, this tab keeps a reference to your enquiry in its session storage, so a quote finished later in the same visit is saved as one enquiry. It goes when the tab is closed.",
  },
  {
    name: "Your move details form",
    stored:
      "Answers and photos you have given on the move details form that have not reached us yet are kept in your browser for up to seven days, so a refresh or a lost connection loses nothing. They are removed as soon as we have them.",
  },
  {
    name: "Our office login",
    stored: "A cookie named admin_session, set only when our staff sign in to the office pages, for seven days.",
  },
];

export default async function CookiesPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <Navbar />
      <BreadcrumbBar items={[{ name: "Home", href: "/" }, { name: "Cookies" }]} />
      <main className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-space)] text-4xl font-extrabold text-[#0B1E3F]">Cookies</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            This page lists the cookies and browser storage this website uses. The two tools that measure how the
            site is used are only switched on if you press Accept. If you decline, or do not answer, neither of
            them is loaded and nothing is sent to either service.
          </p>

          <h2 className="mt-12 font-[family-name:var(--font-space)] text-2xl font-bold text-[#0B1E3F]">
            Only if you accept
          </h2>
          <div className="mt-5 space-y-5">
            {withConsent.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-200 p-5">
                <h3 className="font-bold text-[#0B1E3F]">{item.name}</h3>
                <p className="mt-2 text-slate-600">{item.what}</p>
                <p className="mt-2 text-sm text-slate-500">{item.stored}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-slate-600">
            Neither is ever used on our office pages or on your private move details page, whatever you answer.
          </p>

          <h2 className="mt-12 font-[family-name:var(--font-space)] text-2xl font-bold text-[#0B1E3F]">
            Always, because the site needs them
          </h2>
          <div className="mt-5 space-y-5">
            {always.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-200 p-5">
                <h3 className="font-bold text-[#0B1E3F]">{item.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.stored}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-12 font-[family-name:var(--font-space)] text-2xl font-bold text-[#0B1E3F]">
            Changing your answer
          </h2>
          <p className="mt-4 text-slate-600">
            Use Cookie settings at the foot of our pages, or the button below, to change your answer. Taking back
            a yes removes the Google Analytics and Smartlook cookies from your browser and asks you again.
          </p>
          <div className="mt-4">
            <CookieSettingsButton className="rounded-xl bg-[#0B1E3F] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1E3A8A]" />
          </div>
          {settings.email ? (
            <p className="mt-8 text-slate-600">
              Questions about any of this:{" "}
              <a href={`mailto:${settings.email}`} className="font-semibold text-[#0B1E3F] underline underline-offset-4">
                {settings.email}
              </a>
              .
            </p>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}

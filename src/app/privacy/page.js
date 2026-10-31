import Link from "next/link";
import PolicyPage, { PolicyHeading, PolicyList, PolicyText, policyLink } from "@/components/PolicyPage";
import { makeMeta } from "@/lib/metadata";
import { getSiteSettings } from "@/lib/siteSettings";
import { BUSINESS } from "@/config/business";

export const metadata = makeMeta({
  title: "Privacy Notice | Birmingham Removals",
  absoluteTitle: true,
  description:
    "What personal data Birmingham Removals collects when you ask for a quote or plan a move, why, who handles it, how long it is kept and your rights.",
  path: "/privacy",
});

export default async function PrivacyPage() {
  const settings = await getSiteSettings();
  return (
    <PolicyPage
      title="Privacy notice"
      crumb="Privacy"
      updated="31 October 2026"
      intro="This notice explains what personal information we collect when you use this website or ask us about a move, why we need it, who handles it for us, how long we keep it and what rights you have."
    >
      <PolicyHeading>Who we are</PolicyHeading>
      <PolicyText>
        {BUSINESS.name} is responsible for the personal information described here. To ask about your information,
        call {settings.phone || BUSINESS.phoneDisplay}
        {settings.email ? (
          <>
            {" "}
            or email <a className={policyLink} href={`mailto:${settings.email}`}>{settings.email}</a>
          </>
        ) : null}
        . Our other contact details are on our <Link className={policyLink} href="/contact">contact page</Link>.
      </PolicyText>

      <PolicyHeading>What we collect</PolicyHeading>
      <PolicyList
        items={[
          "From the quote form: your name, phone number and email address, the postcodes you are moving from and to, your move date, the size of the move and any extras you choose.",
          "From the private move details page we send you: the addresses, access and parking details, what is being moved, your answers about the move, and any photos or documents you upload. Photos may show the inside of your home.",
          "When you phone, email or message us: what you tell us and how to reach you.",
          "If you accept analytics cookies: how you use the website, as described on our cookies page.",
        ]}
      />
      <PolicyText>
        The quote form saves what you type as you go, so we can help if you get stuck or do not finish. This means
        details you have entered can reach us before you press the final button. Unfinished forms are deleted
        automatically, as explained below.
      </PolicyText>

      <PolicyHeading>Why we use it</PolicyHeading>
      <PolicyList
        items={[
          "To reply to your enquiry and give you a quote. This is a step you have asked us to take before any contract.",
          "To plan and carry out your move, and to take payment. This is needed for our contract with you.",
          "To follow up an unfinished quote, keep our records, deal with complaints or claims and protect our business. These are our legitimate interests.",
          "To keep records the law requires, such as tax and accounting records. This is a legal obligation.",
          "To measure and improve the website, only if you press Accept on the cookie banner. This is your consent, and you can change your mind at any time.",
        ]}
      />
      <PolicyText>We do not sell your information, and we do not use it to send you marketing emails from this website.</PolicyText>

      <PolicyHeading>Who handles it for us</PolicyHeading>
      <PolicyText>Your information is seen by our own staff and crews, and by the companies that run our systems:</PolicyText>
      <PolicyList
        items={[
          "Vercel, which hosts this website.",
          "Cloudflare, which runs our enquiry database and stores uploaded files.",
          "Our email providers, which send and receive the emails about your enquiry, including Google.",
          "Google, whose maps service helps you find an address or postcode on our forms.",
          "Google Analytics and Smartlook, only if you accept analytics cookies. Neither is ever used on your private move details page.",
        ]}
      />
      <PolicyText>
        We may also share information if the law requires it, or with an insurer or adviser if there is a claim.
      </PolicyText>

      <PolicyHeading>Where it is stored</PolicyHeading>
      <PolicyText>
        Some of these companies store or process information outside the UK. Our enquiry database is currently held
        on Cloudflare servers in the Asia-Pacific region, uploaded files are stored in the European Union, and
        Vercel and Google may process information in the United States and elsewhere. We rely on the safeguards in
        each company&apos;s data protection terms for these transfers.
      </PolicyText>

      <PolicyHeading>How long we keep it</PolicyHeading>
      <PolicyList
        items={[
          "Unfinished quote forms, and anything attached to them, are deleted automatically after 30 days.",
          "Other enquiries, bookings, move details and uploaded files stay in our records until we delete them by hand. Ask us and we will delete yours, unless we still need it for your move or the law requires us to keep it.",
          "Records we must keep for tax and accounting are kept for as long as the law requires.",
        ]}
      />

      <PolicyHeading>Your private move details link</PolicyHeading>
      <PolicyText>
        The link to your move details page is private to you and works without a password. Please do not share it
        with anyone you would not want to see your answers and photos. If you think someone else has it, call us.
      </PolicyText>

      <PolicyHeading>Your rights</PolicyHeading>
      <PolicyText>
        You can ask for a copy of your information, ask us to correct or delete it, ask us to limit how we use it,
        object to how we use it, and ask us to pass it to you or someone else in a usable format. There is no charge,
        and we will reply within one month.
      </PolicyText>
      <PolicyText>
        If you are unhappy with how we have handled your information, please tell us first so we can put it right.
        You can also complain to the Information Commissioner&apos;s Office at{" "}
        <a className={policyLink} href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">
          ico.org.uk
        </a>
        .
      </PolicyText>

      <PolicyHeading>Cookies and changes</PolicyHeading>
      <PolicyText>
        Our <Link className={policyLink} href="/cookies">cookies page</Link> lists the cookies and browser storage this
        website uses. If we change how we handle your information, we will update this page and the date at the top.
      </PolicyText>
    </PolicyPage>
  );
}

import Link from "next/link";
import PolicyPage, { PolicyHeading, PolicyList, PolicyText, policyLink } from "@/components/PolicyPage";
import { makeMeta } from "@/lib/metadata";
import { BUSINESS } from "@/config/business";

export const metadata = makeMeta({
  title: "Terms of Use | Birmingham Removals",
  absoluteTitle: true,
  description:
    "The terms for using the Birmingham Removals website, including how online estimates, quotes and enquiries work and what to do if you need to change your move.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms of use"
      crumb="Terms"
      updated="31 October 2026"
      intro="These terms cover your use of this website and explain how our estimates, quotes and enquiries work. By using the website you agree to them."
    >
      <PolicyHeading>Who we are</PolicyHeading>
      <PolicyText>
        This website is run by {BUSINESS.name}. You can reach us on {BUSINESS.phoneDisplay} or through our{" "}
        <Link className={policyLink} href="/contact">contact page</Link>.
      </PolicyText>

      <PolicyHeading>Estimates, quotes and enquiries</PolicyHeading>
      <PolicyList
        items={[
          "Prices shown on this website, including the figure from the quote form, are estimates to help you plan. They are based on what you tell us.",
          "Sending the quote form is an enquiry. It does not book a date or create a contract.",
          "We will contact you to go through your move and give you a written quote. The price and terms in that written quote are the ones that apply to your move.",
        ]}
      />

      <PolicyHeading>Booking and payment</PolicyHeading>
      <PolicyText>
        A date is only held for you once we have agreed it with you directly. We usually take a small deposit to
        secure a date, with the balance due on completion. We accept bank transfer, card or cash.
      </PolicyText>

      <PolicyHeading>Changing or cancelling</PolicyHeading>
      <PolicyText>
        If your dates change or you need to cancel, call us on {BUSINESS.phoneDisplay} as early as you can so we can
        help. Nothing in these terms affects your legal rights as a consumer.
      </PolicyText>

      <PolicyHeading>Using this website</PolicyHeading>
      <PolicyList
        items={[
          "Please use the website lawfully, and do not try to interfere with it or gain access to parts that are not meant for you.",
          "Give accurate information on our forms, and only use your own details or those of someone who has agreed.",
          "Your private move details link is for you. Please keep it to yourself.",
        ]}
      />

      <PolicyHeading>Our content</PolicyHeading>
      <PolicyText>
        The text, images and logo on this website belong to us or are used with permission. You are welcome to read,
        share a link to and print pages for your own use, but please do not copy them for commercial use without
        asking.
      </PolicyText>
      <PolicyText>
        Our guides are general information, not legal, financial or property advice. We work to keep them accurate,
        and you can read how on our <Link className={policyLink} href="/editorial-policy">editorial policy</Link> page.
        Details such as parking rules, prices and travel routes can change, so please check anything important. We
        are not responsible for the content of other websites we link to.
      </PolicyText>

      <PolicyHeading>Your information</PolicyHeading>
      <PolicyText>
        Our <Link className={policyLink} href="/privacy">privacy notice</Link> explains how we handle your personal
        information, and our <Link className={policyLink} href="/cookies">cookies page</Link> lists what the website
        stores in your browser.
      </PolicyText>

      <PolicyHeading>Changes and the law</PolicyHeading>
      <PolicyText>
        We may update these terms, and the date at the top shows when they last changed. They are governed by the law
        of England and Wales, and the courts of England and Wales can deal with any dispute. If you live elsewhere in
        the UK, you can also use your local courts.
      </PolicyText>
    </PolicyPage>
  );
}

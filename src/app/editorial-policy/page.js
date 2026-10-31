import Link from "next/link";
import PolicyPage, { PolicyHeading, PolicyList, PolicyText, policyLink } from "@/components/PolicyPage";
import { makeMeta } from "@/lib/metadata";
import { BUSINESS } from "@/config/business";

export const metadata = makeMeta({
  title: "Editorial Policy | Birmingham Removals",
  absoluteTitle: true,
  description:
    "How Birmingham Removals plans, checks and updates its moving guides and area pages, how we handle prices and local details, and how to report a mistake.",
  path: "/editorial-policy",
});

export default function EditorialPolicyPage() {
  return (
    <PolicyPage
      title="Editorial policy"
      crumb="Editorial Policy"
      updated="31 October 2026"
      intro="Our guides and area pages exist to help people plan a move in and around Birmingham. This page explains how we approach them, so you can decide how much to rely on what you read."
    >
      <PolicyHeading>What we publish</PolicyHeading>
      <PolicyText>
        We publish <Link className={policyLink} href="/blog">moving guides</Link>, a page for each{" "}
        <Link className={policyLink} href="/services">service</Link> and a page for each{" "}
        <Link className={policyLink} href="/areas">area we cover</Link>. We choose topics from the questions people ask
        when planning a move: what it costs, how to prepare, which area to live in and what to expect on the day.
      </PolicyText>

      <PolicyHeading>Who is behind the content</PolicyHeading>
      <PolicyText>
        Content on this website is published by {BUSINESS.name}, a removals company and not a publisher. It carries the
        byline of the Birmingham Removals Team because the business stands behind it as a whole. Our guides are written
        to help you, and we are open that we also hope you will ask us for a quote.
      </PolicyText>

      <PolicyHeading>How we handle facts</PolicyHeading>
      <PolicyList
        items={[
          "Prices come from our own pricing, are given as typical ranges and are not a quote. Your written quote is what counts.",
          "Local details such as roads, stations and housing are written to be useful for planning a move. Parking rules and roadworks change, so we check the specifics of each address when we quote.",
          "Neighbourhood guides describe areas in general terms. House prices are described rather than given as figures, because a single number goes out of date quickly.",
          "Our guides are general information. For legal, financial or conveyancing decisions, please speak to a qualified adviser.",
        ]}
      />

      <PolicyHeading>Independence</PolicyHeading>
      <PolicyText>
        Our guides carry no adverts, affiliate links or paid placements. The services we mention are our own, and the
        pages make that clear.
      </PolicyText>

      <PolicyHeading>Dates and updates</PolicyHeading>
      <PolicyText>
        Each guide shows when it was published. We update guides when prices, rules or local details change, and when
        a guide is updated the date changes with it.
      </PolicyText>

      <PolicyHeading>Tell us if something is wrong</PolicyHeading>
      <PolicyText>
        If you spot a mistake, or something is out of date, please tell us through our{" "}
        <Link className={policyLink} href="/contact">contact page</Link> or call {BUSINESS.phoneDisplay}. We will check
        it and correct the page if we got it wrong.
      </PolicyText>
    </PolicyPage>
  );
}

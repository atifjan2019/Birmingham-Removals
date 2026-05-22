import { makeMeta } from "@/lib/metadata";

export const metadata = makeMeta({
  title: "Free Removals Quote Birmingham | 30-Min Reply",
  description:
    "Get a free, fixed-price removals quote for Birmingham and the West Midlands. Reply within 30 minutes. No call centres, no pushy sales, no surprises.",
  path: "/quote",
});

export default function QuoteLayout({ children }) {
  return children;
}

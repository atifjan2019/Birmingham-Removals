// Blog posts. Each post lives in its own module under ./blog and is assembled
// here. Posts are exposed newest-first.
import houseRemovalCosts from "./blog/house-removal-costs-birmingham";
import movingChecklist from "./blog/moving-checklist-birmingham";
import bestAreas from "./blog/best-areas-to-live-birmingham";
import movingToBirmingham from "./blog/moving-to-birmingham-guide";
import officeRelocation from "./blog/office-relocation-guide-birmingham";
import studentMoving from "./blog/student-moving-birmingham";
import pianoRemoval from "./blog/piano-removal-guide";
import packingTips from "./blog/packing-tips-moving-house";
import movingDayTips from "./blog/moving-day-tips-birmingham";
import storageSolutions from "./blog/storage-solutions-birmingham";
import compareCompanies from "./blog/compare-removal-companies-birmingham";
import conveyancingTimeline from "./blog/moving-house-birmingham-conveyancing-timeline";

const posts = [
  houseRemovalCosts,
  movingChecklist,
  bestAreas,
  movingToBirmingham,
  officeRelocation,
  studentMoving,
  pianoRemoval,
  packingTips,
  movingDayTips,
  storageSolutions,
  compareCompanies,
  conveyancingTimeline,
];

// Newest first by ISO date.
const blogPosts = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

export default blogPosts;

export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) || null;
}

export function getAllPostSlugs() {
  return blogPosts.map((p) => p.slug);
}

// Each service's content lives in its own module under ./services for
// maintainability. This index assembles them in display order and exposes the
// same interface the rest of the app already relies on.
import houseRemovals from "./services/house-removals";
import officeRemovals from "./services/office-removals";
import manAndVan from "./services/man-and-van";
import packingService from "./services/packing-service";
import storageSolutions from "./services/storage-solutions";
import pianoSpecialist from "./services/piano-and-specialist-items";

const servicesData = [
  houseRemovals,
  officeRemovals,
  manAndVan,
  packingService,
  storageSolutions,
  pianoSpecialist,
];

export default servicesData;

export function getServiceBySlug(slug) {
  return servicesData.find((s) => s.slug === slug) || null;
}

export function getAllServiceSlugs() {
  return servicesData.map((s) => s.slug);
}

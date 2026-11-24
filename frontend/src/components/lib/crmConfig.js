// Read once from build env. Three independent switches; the main build sets none of them, so it is unchanged.
//   VITE_CRM_API_BASE        https origin of the CRM (e.g. https://crm.coredhristi.com)
//   VITE_INTAKE_MODE=crm     send Reach Us Out / quote / FAQ enquiries to the CRM instead of Formspree
//   VITE_BOOKING_ENABLED=on  show /book-appointment          VITE_PARTNERS_ENABLED=on  show /cloud-partners
// Turnstile tokens are single-use, so intake goes to exactly one receiver.
import { crmBaseFrom, crmEndpoint } from "./crmIntake.js";

const env = import.meta.env;
const legacy = env.VITE_CRM_INTAKE_URL ? crmEndpoint(env.VITE_CRM_INTAKE_URL) : "";   // older preview builds
export const crmApiBase = crmBaseFrom(env.VITE_CRM_API_BASE ?? "") || (legacy ? new URL("/cored/api/", legacy).href : "");
export const crmIntakeUrl = env.VITE_INTAKE_MODE === "crm" && crmApiBase ? crmApiBase + "intake" : "";
export const bookingEnabled = Boolean(crmApiBase) && env.VITE_BOOKING_ENABLED === "on";
export const partnersEnabled = Boolean(crmApiBase) && env.VITE_PARTNERS_ENABLED === "on";

// Read once from build env. Only a staging/preview build sets VITE_INTAKE_MODE=crm; the main build leaves it unset.
import { crmEndpoint } from "./crmIntake.js";

export const crmIntakeUrl = import.meta.env.VITE_INTAKE_MODE === "crm" ? crmEndpoint(import.meta.env.VITE_CRM_INTAKE_URL ?? "") : "";
import { apiBaseFromIntake } from "./crmApi.js";

// Booking / Cloud Partners pages exist only in builds that point at a CRM (staging/preview).
export const crmApiBase = apiBaseFromIntake(crmIntakeUrl);

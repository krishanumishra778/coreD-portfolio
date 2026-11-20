import { phoneCountries } from "../../data/contactOptions.js";
import { submitEnquiry } from "./submitEnquiry.js";

export async function submitChatLead({ fields, requestId, ...delivery }) {
  const value = (name) => String(fields.get(name) ?? "").trim();
  const name = value("FullName");
  const email = value("CompanyEmail");
  const country = phoneCountries.find(({ id }) => id === value("PhoneCountry"));
  const number = value("NationalNumber").replace(/[\s()-]/g, "");
  const phone = country ? `+${country.dial}${number}` : "";

  if (value("Website")) throw new Error("This request could not be verified.");
  if (name.length < 2 || name.length > 120) throw new Error("Enter your full name.");
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Enter a valid email address.");
  if (!/^\d+$/.test(number) || !/^\+\d{7,15}$/.test(phone)) throw new Error("Choose your country code and enter a valid phone number without the country prefix.");

  const lead = new URLSearchParams({
    FullName: name, CompanyEmail: email, ContactNumber: phone,
    CountryCode: country.code, DialCode: `+${country.dial}`,
    LeadSource: "FAQ chatbot", ServiceSelection: "FAQ assistant enquiry",
    ProjectDescription: "This visitor asked to use CoreD’s FAQ assistant and shared their details for enquiry follow-up.",
    RequestId: requestId, Website: "",
  });
  await submitEnquiry({ ...delivery, fields: lead, subject: "CoreD · FAQ assistant enquiry" });
  return { name };
}

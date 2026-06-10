// Shared editorial copy used by both Heritage and Heirloom designs.
// One source of truth so the two designs stay synchronized in substance.

export const VALUE_PROPS = [
  {
    title: "Personalized 1:3 care",
    body: "An intimate, six-resident home means every person is known by name, story, and preference — never a bedroom number.",
  },
  {
    title: "A real home, not a facility",
    body: "Wood floors, a working kitchen, a garden out back. The rhythms of family life, kept simple and dignified.",
  },
  {
    title: "Skagit Valley roots",
    body: "Family-owned in Mount Vernon, WA, with deep ties to Skagit County families and to the local medical providers across Burlington, Sedro-Woolley, and Anacortes.",
  },
] as const;

export const SERVICES = [
  {
    title: "Activities of Daily Living",
    body: "Bathing, dressing, grooming, toileting, and gentle mobility support — provided with patience and dignity.",
  },
  {
    title: "Meals & Nutrition",
    body: "Three home-cooked meals daily plus snacks, adapted to dietary needs and the foods each resident actually loves.",
  },
  {
    title: "Medication Management",
    body: "Trained caregivers handle medication scheduling, reminders, and coordination with each resident's providers.",
  },
  {
    title: "Memory & Specialized Care",
    body: "Supportive routines for residents living with dementia, within the scope of our DSHS specialty designation.",
  },
  {
    title: "Laundry & Housekeeping",
    body: "Personal laundry, bedroom cleaning, and shared-space upkeep — all included, never piecemeal.",
  },
  {
    title: "24-Hour Supervision",
    body: "A caregiver is awake and on-site every hour of every day, with nursing support available as needed.",
  },
  {
    title: "Social & Recreation",
    body: "Gardening, music, gentle exercise, holiday traditions, and time on the porch — life, not just care.",
  },
  {
    title: "Transportation Coordination",
    body: "We coordinate medical-appointment rides and family visits with local providers and family schedules.",
  },
] as const;

export const ADMISSION_STEPS = [
  { n: "01", title: "Inquiry", body: "Call us or send a note. We listen first — no scripts, no pressure." },
  { n: "02", title: "Tour", body: "Visit in person, meet the caregivers, and see the bedroom you're considering." },
  { n: "03", title: "Assessment", body: "A care needs assessment ensures we are the right fit for your loved one." },
  { n: "04", title: "Agreement", body: "We review the written disclosures, services, and resident rights together." },
  { n: "05", title: "Move-In", body: "We help with the transition so the first day feels welcoming, not jarring." },
] as const;


export const TOUR_CHECKLIST = [
  "Bring a list of your loved one's medications and conditions",
  "Note any dietary, religious, or cultural preferences",
  "Plan for 45–60 minutes; the home is calmer mid-morning",
  "Ask to meet the caregiver on shift, not just the owner",
  "Walk the bedroom you are considering — and the bathroom",
] as const;

export const FAMILY_RESOURCES = [
  {
    title: "What to Look for in an Adult Family Home",
    body: "A short guide to what separates a true home from a facility, and the credentials that matter in Washington.",
  },
  {
    title: "Questions to Ask on a Tour",
    body: "A printable checklist covering staffing, safety, food, activities, and licensing — everything a tour should answer.",
  },
  {
    title: "Understanding DSHS Inspection Reports",
    body: "How to read an inspection report, what citations mean, and where to look them up for any Washington home.",
  },
] as const;

export const FAQ = [
  {
    q: "What is an Adult Family Home?",
    a: "A licensed residential home in Washington that cares for up to six adults who need help with daily living. Smaller, more personal, and less institutional than assisted living or a nursing home.",
  },
  {
    q: "Are you licensed?",
    a: "Yes — we are licensed by Washington State DSHS. Our license number is displayed in the footer and on our Admissions page, and the public inspection report is linked from our Resources page.",
  },
  {
    q: "Do you accept Medicaid?",
    a: "We accept a limited number of Medicaid residents alongside private-pay families. Availability changes; please contact us directly to ask.",
  },
  {
    q: "What is your caregiver-to-resident ratio?",
    a: "We staff with a 1:3 daytime ratio and maintain awake overnight coverage. Nursing oversight is available as needed.",
  },
  {
    q: "Can families visit any time?",
    a: "Yes. We have suggested quiet hours, but families are welcome at any reasonable hour, and we encourage shared meals on visits.",
  },
] as const;

export const TRUST_BADGES = [
  "DSHS Licensed",
  "Family-Owned",
  "WCAG 2.1 AA Accessible",
] as const;
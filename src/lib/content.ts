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
    points: ["Bathing and grooming", "Dressing and toileting", "Gentle mobility support"],
  },
  {
    title: "Meals & Nutrition",
    body: "Three home-cooked meals daily plus snacks, adapted to dietary needs and the foods each resident actually loves.",
    points: ["Three daily meals", "Snacks and hydration", "Diet preferences reviewed"],
  },
  {
    title: "Medication Management",
    body: "Trained caregivers handle medication scheduling, reminders, and coordination with each resident's providers.",
    points: ["Medication reminders", "Schedule support", "Provider coordination"],
  },
  {
    title: "Memory & Specialized Care",
    body: "Supportive routines for residents living with dementia, within the scope of our DSHS specialty designation.",
    points: ["Dementia-friendly routines", "Calm redirection", "Family communication"],
  },
  {
    title: "Laundry & Housekeeping",
    body: "Personal laundry, bedroom cleaning, and shared-space upkeep — all included, never piecemeal.",
    points: ["Personal laundry", "Bedroom upkeep", "Shared-space cleaning"],
  },
  {
    title: "24-Hour Supervision",
    body: "A caregiver is awake and on-site every hour of every day, with nursing support available as needed.",
    points: ["Awake overnight coverage", "Daily observation", "Prompt family updates"],
  },
  {
    title: "Social & Recreation",
    body: "Gardening, music, gentle exercise, holiday traditions, and time on the porch — life, not just care.",
    points: ["Music and games", "Seasonal traditions", "Outdoor time"],
  },
  {
    title: "Transportation Coordination",
    body: "We coordinate medical-appointment rides and family visits with local providers and family schedules.",
    points: ["Appointment planning", "Family scheduling", "Local provider coordination"],
  },
] as const;

export const HOME_AMENITIES = [
  {
    title: "Private bedrooms",
    body: "Each resident has a private room with space for familiar belongings and a flat-screen TV provided before move-in unless they prefer their own.",
  },
  {
    title: "Home-cooked meals",
    body: "Meals are prepared in the home kitchen and adjusted around preferences, routines, and nutrition guidance shared during admissions.",
  },
  {
    title: "Comfortable common areas",
    body: "The dining room, kitchen, sitting room, and porch give residents calm places to gather, visit, read, and rest.",
  },
  {
    title: "Outdoor space",
    body: "Garden beds, porch seating, and fresh air are part of daily life when weather and care needs allow.",
  },
  {
    title: "Family visits",
    body: "Families are encouraged to stay involved, share meals, and discuss visit routines that fit the household rhythm.",
  },
  {
    title: "Accessible daily routines",
    body: "Care is organized around steady daily rhythms, with specific needs discussed during admissions and supported within approved adult family home scope.",
  },
] as const;

export const ADMISSION_STEPS = [
  {
    n: "01",
    title: "Inquiry",
    body: "Call us or send a note. We listen first — no scripts, no pressure.",
  },
  {
    n: "02",
    title: "Tour",
    body: "Visit in person, meet the caregivers, and see the bedroom you're considering.",
  },
  {
    n: "03",
    title: "Assessment",
    body: "A care needs assessment ensures we are the right fit for your loved one.",
  },
  {
    n: "04",
    title: "Agreement",
    body: "We review the written disclosures, services, and resident rights together.",
  },
  {
    n: "05",
    title: "Move-In",
    body: "We help with the transition so the first day feels welcoming, not jarring.",
  },
] as const;

export const ADMISSIONS_PREP = [
  {
    title: "Care needs",
    body: "Current diagnoses, mobility needs, fall history, memory support needs, and daily routines that help your loved one feel settled.",
  },
  {
    title: "Medication list",
    body: "A current medication list, provider contacts, pharmacy details, and any nurse delegation or timing considerations.",
  },
  {
    title: "Payment path",
    body: "Private-pay or Medicaid details, long-term care insurance questions, and the timing families are hoping to plan around.",
  },
  {
    title: "Personal comforts",
    body: "Favorite foods, sleep habits, cultural or spiritual preferences, hobbies, and familiar belongings that should come along.",
  },
] as const;

export const ADMISSIONS_PROMISES = [
  "Clear written services, fees, and resident rights before any agreement is signed",
  "A practical fit conversation before families spend time on paperwork",
  "Move-in planning that respects the resident's pace and family schedule",
  "Compliance documentation available upon request during admissions",
] as const;

export const TOUR_CHECKLIST = [
  "Bring a list of your loved one's medications and conditions",
  "Note any dietary, religious, or cultural preferences",
  "Plan for 45–60 minutes; the home is calmer mid-morning",
  "Ask to meet the caregiver on shift, not just the owner",
  "Walk the bedroom you are considering — and the bathroom",
] as const;

export const RESOURCE_TOPICS = [
  {
    title: "Choosing a home",
    body: "How to compare adult family homes, assisted living, and larger care settings without losing sight of fit.",
  },
  {
    title: "Touring with confidence",
    body: "What to bring, what to ask, and what families should notice during a calm in-person visit.",
  },
  {
    title: "Licensing & inspections",
    body: "Where Washington families can verify public records and how to discuss documentation during admissions.",
  },
  {
    title: "Planning the transition",
    body: "Simple ways to make move-in feel less abrupt for the resident and more organized for the family.",
  },
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
    a: "Yes — we are a Washington State licensed adult family home. Documentation is available upon request during admissions, and the public inspection report is linked from our Resources page.",
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
  { value: "6", label: "private rooms" },
  { value: "1:3", label: "personalized care" },
  { value: "24-hour", label: "support available" },
  { value: "Licensed", label: "and compliant" },
] as const;

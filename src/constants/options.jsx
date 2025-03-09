export const SelectTravelList = [
  {
    id: 1,
    title: "Solo Adventure",
    desc: "Explore the world on your own terms",
    icon: "🧳",
    people: "1",
  },
  {
    id: 2,
    title: "Romantic Getaway",
    desc: "Perfect for couples looking for some quality time",
    icon: "❤️",
    people: "2",
  },
  {
    id: 3,
    title: "Family Bonding",
    desc: "An adventure for the entire family",
    icon: "👨‍👩‍👧‍👦",
    people: "3 - 6",
  },
  {
    id: 4,
    title: "Friends Trip",
    desc: "Unleash the fun with your closest buddies",
    icon: "🍻",
    people: "3 - 5",
  },
  {
    id: 5,
    title: "Work Retreat",
    desc: "Corporate trips designed for productivity and leisure",
    icon: "💼",
    people: "10 - 20",
  },
  {
    id: 6,
    title: "Senior Group",
    desc: "Relaxed trips tailored for senior travelers",
    icon: "🧓",
    people: "5 - 10",
  },
];

export const SelectBudgetOption = [
  {
    id: 1,
    title: "Budget-Friendly",
    desc: "Enjoy a great experience while keeping costs low",
    icon: "💵",
  },
  {
    id: 2,
    title: "Mid-Range",
    desc: "A balanced choice for comfort and cost",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Indulge in a premium experience",
    icon: "👑",
  },
];

export const SelectDestinationType = [
  {
    id: 1,
    title: "Beach",
    desc: "Relax under the sun with waves crashing nearby",
    icon: "🏖️",
  },
  {
    id: 2,
    title: "Mountains",
    desc: "Breathe fresh air and enjoy breathtaking views",
    icon: "🏔️",
  },
  {
    id: 3,
    title: "City",
    desc: "Experience the hustle and bustle of urban life",
    icon: "🏙️",
  },
  {
    id: 4,
    title: "Adventure",
    desc: "Thrilling activities and adrenaline-packed experiences",
    icon: "🎢",
  },
  {
    id: 5,
    title: "Cultural",
    desc: "Immerse yourself in local traditions and history",
    icon: "🎭",
  },
  {
    id: 6,
    title: "Nature",
    desc: "Reconnect with the wilderness and scenic landscapes",
    icon: "🌳",
  },
  {
    id: 7,
    title: "Historical",
    desc: "Explore landmarks and uncover the stories of the past",
    icon: "🏰",
  },
  {
    id: 8,
    title: "Cruise",
    desc: "Sail away on an unforgettable voyage",
    icon: "🚢",
  },
  {
    id: 9,
    title: "Desert",
    desc: "Marvel at golden dunes and vast landscapes",
    icon: "🏜️",
  },
];

export const AI_PROMPT =
  "Generate a Travel Plan for Destination Location: {location}, Duration: {numberOfDays} days, Travel Type: {travelType} (e.g., leisure, adventure, romantic, family, solo) ,  Budget: {budget} (specify total budget or per-person budget if applicable) , Number of People: {numberOfPeople} , Destination Type: {destinationType} (e.g., beach, mountain, historical, urban, rural, mixed). Deliverables are Hotel Options: Provide a list of recommended hotels with the following details for each: Hotel Name , Hotel Address , Price (indicate per night or for the total stay, and whether it includes taxes) , Image URL (high-quality images preferred) , Geo-coordinates (latitude and longitude) , Rating (e.g., 4.5/5) , Description (highlight features like amenities, proximity to attractions, etc.).  Day-wise Itinerary For each day of the trip, provide - Place Name: Name of the destination or attraction , Details: Brief description or key highlights of the place , Image URL: High-quality images for each place , Coordinates: Geo-coordinates (latitude and longitude) of the place , Ticket Pricing: Entry cost or any associated fees , Travel Time: Estimated time to travel between locations , Best Time to Visit: Optimal time of the day to visit each location (e.g., morning, afternoon, evening) and Also best time to visit {location}. Output Format: Provide the results in JSON format with clear and structured fields for easy parsing. Include contextual recommendations (e.g., restaurants, activities, or events happening during the stay) that fit the travel type and destination type.  Below is the JSON format take reference from that and fetch all the information with same object format ";

export const generateTravelPlanPrompt = (
  location,
  travelType,
  budget,
  numberOfPeople,
  destinationType,
  numberOfDays
) => {
  return AI_PROMPT.replace("{location}", location)
    .replace("{travelType}", travelType)
    .replace("{budget}", budget)
    .replace("{numberOfPeople}", numberOfPeople)
    .replace("{destinationType}", destinationType)
    .replace("{numberOfDays}", numberOfDays);
};

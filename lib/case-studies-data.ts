import { getAsset } from '@/lib/getAsset';

export interface CaseStudy {
  id: string;
  farmerName: string;
  location: string;
  image: string;
  title: string;
  summary: string;
  challenges: string[];
  solutions: {
    title: string;
    description: string;
    icon: string;
  }[];
  results: {
    label: string;
    value: string;
    icon: string;
  }[];
  quote: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "swapna-james",
    farmerName: "Swapna James",
    location: "Palakkad, Kerala",
    image: getAsset("/swapna-james.png"),
    title: "The Power of Diversity: From Monocrop to Millions",
    summary: "How Swapna James shifted from low-profit rubber monoculture to a thriving, diverse farm earning up to ₹30 lakh annually.",
    challenges: [
      "Over-reliance on a single crop (rubber) with fluctuating market prices.",
      "Declining soil health and biodiversity.",
      "Limited and unstable income streams.",
    ],
    solutions: [
      {
        title: "Crop Diversification",
        description: "Introduced intercropping with coconut, areca nut, cocoa, nutmeg, coffee, and various fruits and vegetables.",
        icon: "Sprout",
      },
      {
        title: "Organic Fertilization",
        description: "Utilized farm-generated manure and compost to enrich the soil, eliminating chemical fertilizers.",
        icon: "Leaf",
      },
      {
        title: "Direct Marketing",
        description: "Established direct links with local markets to sell produce at better prices.",
        icon: "Users",
      },
    ],
    results: [
      { label: "Annual Revenue", value: "₹30 Lakh", icon: "TrendingUp" },
      { label: "Crop Varieties", value: "50+", icon: "ClipboardList" },
      { label: "Chemical Use", value: "-100%", icon: "ShieldOff" },
    ],
    quote: "The land gives back what you give to it. Diversity in crops brought diversity in my income and my life.",
  },
  {
    id: "mathewkutty-tom",
    farmerName: "Mathewkutty Tom",
    location: "Kottayam, Kerala",
    image: getAsset("/Mathewkutty-Tom.webp"),
    title: "The Integrated Farming Paradise",
    summary: "Mathewkutty Tom built an organic paradise by integrating vegetable and fruit farming with animal husbandry.",
    challenges: [
      "High cost of external inputs like fertilizers and pesticides.",
      "Waste management from the family's dairy farm.",
      "Difficulty in finding a consistent market for produce.",
    ],
    solutions: [
      {
        title: "Integrated System",
        description: "Created a closed-loop system where animal excreta is used as manure for crops.",
        icon: "RefreshCw",
      },
      {
        title: "Direct-to-Consumer Sales",
        description: "Started selling produce directly to local customers, ensuring fresh products and better returns.",
        icon: "ShoppingCart",
      },
      {
        title: "Organic Pest Control",
        description: "Adopted traditional and organic methods to manage pests, protecting both crops and the environment.",
        icon: "Bug",
      },
    ],
    results: [
      { label: "Input Cost", value: "-70%", icon: "TrendingDown" },
      { label: "Awards Won", value: "2", icon: "Award" },
      { label: "Soil Health", value: "+90%", icon: "HeartPulse" },
    ],
    quote: "Nothing is waste on my farm. Everything has a purpose, and everything contributes to the whole.",
  },
  {
    id: "vijith-vani",
    farmerName: "Vijith VC & Vani V",
    location: "Alappuzha, Kerala",
    image: getAsset("/Vijith VC & Vani V.jpg"),
    title: "A Decade of Dedication to Organic Vegetables",
    summary: "This couple turned their 4.5-acre plot into a beacon of organic farming through collaboration and traditional techniques.",
    challenges: [
      "Frequent pest attacks on vegetable crops.",
      "Finding a market for purely organic produce.",
      "Maintaining soil fertility year after year.",
    ],
    solutions: [
      {
        title: "Mixed Agriculture",
        description: "Planted a diverse range of vegetables together to naturally confuse and deter pests.",
        icon: "Layers",
      },
      {
        title: "Community Storefront",
        description: "Opened their own shop, \"Prakrithi Jaiva Kalavara\", to sell their produce and that of other local organic farmers.",
        icon: "Store",
      },
      {
        title: "Natural Composting",
        description: "Used only organic manure and compost to create nutrient-rich soil for their crops.",
        icon: "Recycle",
      },
    ],
    results: [
      { label: "Pesticide Use", value: "-100%", icon: "ShieldOff" },
      { label: "Years Farming", value: "12+", icon: "Calendar" },
      { label: "Farmer Network", value: "20+", icon: "Users" },
    ],
    quote: "We don’t just grow vegetables; we cultivate a relationship with the earth and our community.",
  },
  {
    id: "fictional-farmer",
    farmerName: "Anitha Suresh",
    location: "Wayanad, Kerala",
    image: getAsset("/Anitha Suresh.jpg"),
    title: "Harvesting the Rains: A Water-Wise Success",
    summary: "Anitha Suresh secured her farm's future by implementing a comprehensive rainwater harvesting and groundwater recharge system.",
    challenges: [
      "Increasingly erratic monsoons and severe water shortages in the dry season.",
      "Depleting groundwater levels affecting irrigation.",
      "High electricity costs from pumping water.",
    ],
    solutions: [
      {
        title: "Rainwater Harvesting",
        description: "Constructed farm ponds and check dams to capture and store monsoon runoff.",
        icon: "CloudRain",
      },
      {
        title: "Groundwater Recharge",
        description: "Dug recharge pits and trenches to allow stored water to percolate and replenish the water table.",
        icon: "ArrowDownUp",
      },
      {
        title: "Micro-Irrigation",
        description: "Switched to drip irrigation and sprinklers to use the stored water with maximum efficiency.",
        icon: "Droplets",
      },
    ],
    results: [
      { label: "Water Availability", value: "+365 Days", icon: "CalendarDays" },
      { label: "Electricity Cost", value: "-50%", icon: "TrendingDown" },
      { label: "Crop Yield", value: "+30%", icon: "TrendingUp" },
    ],
    quote: "Water is life. By saving water, I saved my farm and secured my family's future.",
  },
];
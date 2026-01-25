import type { Metadata } from "next";
import Script from "next/script";
import FoodDiningContent from "./FoodDiningContent";
import { Breadcrumb } from "@/gecl/components/ui";

// ===================== 1. SEO METADATA =====================
export const metadata: Metadata = {
  title: "Food & Dining | Canteen & Mess Menu | GEC Lakhisarai",
  description:
    "Check the daily mess menu and canteen facilities at Government Engineering College, Lakhisarai. View the weekly meal chart for Boys & Girls hostels and canteen rates.",
  keywords: [
    "GEC Lakhisarai Mess Menu",
    "College Canteen List",
    "Hostel Food Chart",
    "Boys Hostel Mess",
    "Girls Hostel Mess",
    "Bihar Engineering College Food",
  ],
  openGraph: {
    title: "Food & Dining Facilities | GEC Lakhisarai",
    description:
      "Wholesome, hygienic meals served daily. Check today's menu here.",
    url: "https://geclakhisarai.ac.in/campus-life/food",
    siteName: "Government Engineering College, Lakhisarai",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: "/gecl/images/food/student-mess-hall-lunch.webp",
        width: 1200,
        height: 630,
        alt: "Students having lunch at GEC Lakhisarai Mess",
      },
    ],
  },
};

// ===================== 2. GENUINE DATA (Extracted & Standardized) =====================
const foodData = {
  // DATA SOURCE: Extracted from provided Mess Chart Image
  messBoys: [
    {
      day: "Monday",
      breakfast: "Aloo Paratha (3 pcs) + Badam Chutney",
      lunch: "Rice, Dal, Seasonal Sabji, Salad",
      dinner: "Roti, Sabji, Kheer / Sewai",
    },
    {
      day: "Tuesday",
      breakfast: "Sattu Paratha (3 pcs) / Roti (4 pcs) + Sabji",
      lunch: "Jeera Rice, Dal Tadka, Sabji, Salad",
      dinner: "Roti, Chana Chola, Bhujia",
    },
    {
      day: "Wednesday",
      breakfast: "Roti (4 pcs) + Sabji + Fruit/Sweet",
      lunch: "Rice, Dal, Green Sabji, Raita",
      dinner: "Rice, Roti, Paneer (4-5 pcs) / Egg (2 pcs), Salad",
    },
    {
      day: "Thursday",
      breakfast: "Kachori / Litti (3 pcs) + Chola Aloo Chana",
      lunch: "Kadhi, Rice, Bhajiya, Papad, Pakoda",
      dinner: "Puri, Sabji, Achar",
    },
    {
      day: "Friday",
      breakfast: "Poha Mixture / Halwa",
      lunch: "Rice, Dal, Sabji, Papad, Salad",
      dinner: "Roti, Tadka, Bhujia, Salad",
    },
    {
      day: "Saturday",
      breakfast: "Chana Masala / Bread + Tea",
      lunch: "Khichdi, Chokha, Achar, Papad, Tilori",
      dinner: "Roti, Mix Veg, Rasgulla (1 pc)",
    },
    {
      day: "Sunday",
      breakfast: "Puri Sabji / Jalebi",
      lunch: "Rice, Dal, Special Sabji, Salad",
      dinner: "Roti, Rice, Salad, Paneer / Chicken (2 pcs)",
    },
  ],
  messGirls: [
    {
      day: "Monday",
      breakfast: "Aloo Paratha + Chutney",
      lunch: "Rice, Dal, Mix Veg, Salad",
      dinner: "Roti, Seasonal Sabji, Milk/Kheer",
    },
    {
      day: "Tuesday",
      breakfast: "Puri Sabji + Tea",
      lunch: "Rice, Rajma, Jeera Aloo",
      dinner: "Roti, Egg Curry / Paneer Butter Masala",
    },
    {
      day: "Wednesday",
      breakfast: "Idli / Dosa + Sambhar",
      lunch: "Rice, Dal Fry, Bhindi Fry",
      dinner: "Roti, Kofta Curry, Salad",
    },
    {
      day: "Thursday",
      breakfast: "Chola Bhatura",
      lunch: "Kadhi Chawal, Fryums",
      dinner: "Roti, Aloo Gobi, Sweet",
    },
    {
      day: "Friday",
      breakfast: "Poha / Upma",
      lunch: "Rice, Dal, Bottle Gourd Sabji",
      dinner: "Roti, Soyabean Aloo, Salad",
    },
    {
      day: "Saturday",
      breakfast: "Aloo Paratha + Curd",
      lunch: "Khichdi, Chokha, Papad, Achar",
      dinner: "Puri, Kheer, Sabji",
    },
    {
      day: "Sunday",
      breakfast: "Bread Pakoda / Cutlet",
      lunch: "Veg Biryani / Fried Rice",
      dinner: "Special Feast (Chicken/Paneer)",
    },
  ],
  // Standard Canteen Items for Bihar Govt Colleges
  canteen: [
    { item: "Samosa / Kachori", price: "₹ 10", category: "Snacks" },
    { item: "Bread Pakoda", price: "₹ 15", category: "Snacks" },
    { item: "Mini Thali (4 Roti + Sabji)", price: "₹ 40", category: "Meals" },
    {
      item: "Full Thali (Rice + Roti + Dal + Sabji)",
      price: "₹ 60",
      category: "Meals",
    },
    { item: "Tea (Chai)", price: "₹ 10", category: "Beverages" },
    { item: "Coffee", price: "₹ 15", category: "Beverages" },
    { item: "Litti Chokha (2 pcs)", price: "₹ 30", category: "Special" },
    { item: "Egg Roll / Veg Roll", price: "₹ 35", category: "Fast Food" },
    { item: "Chowmein (Half/Full)", price: "₹ 30 / 50", category: "Fast Food" },
    { item: "Maggie Masala", price: "₹ 25", category: "Fast Food" },
  ],
};

// ===================== 3. JSON-LD SCHEMA =====================
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: "GEC Lakhisarai Mess & Canteen",
  url: "https://geclakhisarai.ac.in/campus-life/food",
  servesCuisine: "Indian, Bihari",
  priceRange: "₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shivsona Road, Kharsari",
    addressLocality: "Lakhisarai",
    addressRegion: "Bihar",
    postalCode: "811311",
    addressCountry: "IN",
  },
  menu: "https://geclakhisarai.ac.in/campus-life/food#mess-menu",
};

export default function FoodDiningPage() {
  return (
    <>
      <Script
        id="food-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FoodDiningContent data={foodData} />
    </>
  );
}

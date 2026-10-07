export interface DistrictInfo {
  name: string
  majorCrops: string[]
  soilType: string
  apmcMandi: string
  normalRainfall: string
}

export interface StateAgriculturalProfile {
  state: string
  region: 'West' | 'North' | 'South' | 'Central' | 'East'
  districts: DistrictInfo[]
}

export const ALL_INDIA_AGRICULTURAL_STATES: StateAgriculturalProfile[] = [
  {
    state: "Maharashtra",
    region: "West",
    districts: [
      { name: "Nashik", majorCrops: ["Tomato", "Onion", "Grapes"], soilType: "Medium Black Clayey Loam", apmcMandi: "Nashik APMC", normalRainfall: "Moderate" },
      { name: "Pune", majorCrops: ["Sugarcane", "Onion", "Vegetables"], soilType: "Medium Black Soil", apmcMandi: "Pune Market Yard", normalRainfall: "Moderate" },
      { name: "Latur", majorCrops: ["Soybean", "Tur (Pigeon Pea)", "Gram"], soilType: "Deep Black Clay Soil", apmcMandi: "Latur APMC", normalRainfall: "Low to Moderate" },
      { name: "Solapur", majorCrops: ["Pomegranate", "Sugarcane", "Jowar"], soilType: "Shallow to Medium Black", apmcMandi: "Solapur APMC", normalRainfall: "Low" },
      { name: "Nagpur", majorCrops: ["Orange", "Cotton", "Soybean"], soilType: "Deep Black Regur Soil", apmcMandi: "Nagpur Cotton Yard", normalRainfall: "Moderate to High" },
      { name: "Kolhapur", majorCrops: ["Sugarcane", "Rice", "Groundnut"], soilType: "Lateritic & Alluvial", apmcMandi: "Kolhapur APMC", normalRainfall: "High" }
    ]
  },
  {
    state: "Punjab",
    region: "North",
    districts: [
      { name: "Ludhiana", majorCrops: ["Wheat", "Paddy (Rice)", "Maize"], soilType: "Alluvial Sandy Loam", apmcMandi: "Khanna Mandi (Asia's Largest)", normalRainfall: "Moderate" },
      { name: "Amritsar", majorCrops: ["Basmati Rice", "Wheat", "Potato"], soilType: "Fertile Alluvial Loam", apmcMandi: "Amritsar Grain Market", normalRainfall: "Moderate" },
      { name: "Bathinda", majorCrops: ["Cotton", "Wheat", "Mustard"], soilType: "Light Sandy Loam", apmcMandi: "Bathinda Cotton Mandi", normalRainfall: "Low" },
      { name: "Jalandhar", majorCrops: ["Potato", "Wheat", "Sunflower"], soilType: "Alluvial Silt Loam", apmcMandi: "Jalandhar Vegetable Yard", normalRainfall: "Moderate" },
      { name: "Patiala", majorCrops: ["Paddy", "Wheat", "Mustard"], soilType: "Heavy Clayey Alluvial", apmcMandi: "Patiala APMC", normalRainfall: "Moderate" }
    ]
  },
  {
    state: "Uttar Pradesh",
    region: "North",
    districts: [
      { name: "Varanasi", majorCrops: ["Paddy", "Wheat", "Tomato", "Chilli"], soilType: "Gangetic Alluvial Silt", apmcMandi: "Varanasi Mandi Samiti", normalRainfall: "Moderate to High" },
      { name: "Agra", majorCrops: ["Potato", "Mustard", "Wheat"], soilType: "Sandy Loam Alluvium", apmcMandi: "Khandari Agra Mandi", normalRainfall: "Low to Moderate" },
      { name: "Meerut", majorCrops: ["Sugarcane", "Wheat", "Vegetables"], soilType: "Deep Fertile Loam", apmcMandi: "Meerut Naveen Mandi", normalRainfall: "Moderate" },
      { name: "Bareilly", majorCrops: ["Sugarcane", "Rice", "Mentha"], soilType: "Tarai Alluvial", apmcMandi: "Bareilly Grain Mandi", normalRainfall: "High" },
      { name: "Gorakhpur", majorCrops: ["Paddy", "Sugarcane", "Wheat"], soilType: "Alluvial Clay Loam", apmcMandi: "Gorakhpur APMC", normalRainfall: "High" }
    ]
  },
  {
    state: "Gujarat",
    region: "West",
    districts: [
      { name: "Rajkot", majorCrops: ["Cotton", "Groundnut", "Sesame"], soilType: "Medium Black Soil", apmcMandi: "Bedi Rajkot APMC", normalRainfall: "Low to Moderate" },
      { name: "Junagadh", majorCrops: ["Groundnut", "Mango (Kesar)", "Wheat"], soilType: "Black Coastal Alluvial", apmcMandi: "Junagadh Mandi", normalRainfall: "Moderate" },
      { name: "Surat", majorCrops: ["Sugarcane", "Banana", "Paddy"], soilType: "Deep Coastal Alluvial", apmcMandi: "Surat Sardar Mandi", normalRainfall: "High" },
      { name: "Mehsana", majorCrops: ["Mustard", "Cumin (Jeera)", "Castor"], soilType: "Light Sandy Soil", apmcMandi: "Unjha Mandi (Asia's Largest Spice)", normalRainfall: "Low" }
    ]
  },
  {
    state: "Madhya Pradesh",
    region: "Central",
    districts: [
      { name: "Sehore", majorCrops: ["Sharbati Wheat", "Soybean", "Gram"], soilType: "Deep Black Clay Soil", apmcMandi: "Sehore Krishi Upaj Mandi", normalRainfall: "Moderate" },
      { name: "Indore", majorCrops: ["Soybean", "Wheat", "Potato", "Garlic"], soilType: "Malwa Black Soil", apmcMandi: "Choithram Indore Mandi", normalRainfall: "Moderate" },
      { name: "Ujjain", majorCrops: ["Soybean", "Wheat", "Onion"], soilType: "Deep Rich Black", apmcMandi: "Ujjain Krishi Mandi", normalRainfall: "Moderate" },
      { name: "Hoshangabad", majorCrops: ["Wheat", "Soybean", "Paddy"], soilType: "Narmada Valley Alluvial", apmcMandi: "Itarsi Mandi", normalRainfall: "High" }
    ]
  },
  {
    state: "Karnataka",
    region: "South",
    districts: [
      { name: "Belagavi", majorCrops: ["Sugarcane", "Soybean", "Maize"], soilType: "Medium Black & Red Loam", apmcMandi: "Belagavi APMC", normalRainfall: "Moderate to High" },
      { name: "Mysuru", majorCrops: ["Ragi (Finger Millet)", "Paddy", "Tobacco"], soilType: "Red Sandy Loam", apmcMandi: "Bandipalya Mysuru APMC", normalRainfall: "Moderate" },
      { name: "Mandya", majorCrops: ["Sugarcane", "Paddy", "Coconut"], soilType: "Cauvery Alluvial & Red Loam", apmcMandi: "Mandya APMC", normalRainfall: "Moderate" },
      { name: "Shimoga", majorCrops: ["Arecanut", "Paddy", "Ginger"], soilType: "Laterite & Red Loam", apmcMandi: "Shimoga APMC", normalRainfall: "Very High" },
      { name: "Dharwad", majorCrops: ["Cotton", "Chilli", "Onion"], soilType: "Black Cotton Soil", apmcMandi: "Hubballi-Dharwad APMC", normalRainfall: "Moderate" }
    ]
  },
  {
    state: "Andhra Pradesh",
    region: "South",
    districts: [
      { name: "Guntur", majorCrops: ["Chilli (Teja/Byadagi)", "Cotton", "Tobacco"], soilType: "Deep Black Cotton Soil", apmcMandi: "Guntur Mirchi Yard", normalRainfall: "Moderate" },
      { name: "Kurnool", majorCrops: ["Groundnut", "Sunflower", "Onion"], soilType: "Red Sandy & Black Clay", apmcMandi: "Kurnool APMC", normalRainfall: "Low" },
      { name: "West Godavari", majorCrops: ["Paddy", "Oil Palm", "Aquaculture/Fish"], soilType: "Deltaic Fertile Alluvial", apmcMandi: "Eluru Grain Mandi", normalRainfall: "High" }
    ]
  },
  {
    state: "Telangana",
    region: "South",
    districts: [
      { name: "Warangal", majorCrops: ["Cotton", "Red Chilli", "Paddy"], soilType: "Red Chalkas & Black Soils", apmcMandi: "Enamamula Warangal Yard", normalRainfall: "Moderate" },
      { name: "Nizamabad", majorCrops: ["Turmeric", "Paddy", "Maize"], soilType: "Black & Dubba Soils", apmcMandi: "Nizamabad Turmeric Yard", normalRainfall: "Moderate" }
    ]
  },
  {
    state: "Tamil Nadu",
    region: "South",
    districts: [
      { name: "Thanjavur", majorCrops: ["Paddy (Rice Bowl)", "Sugarcane", "Black Gram"], soilType: "Cauvery Delta Alluvial", apmcMandi: "Thanjavur Regulated Market", normalRainfall: "High" },
      { name: "Coimbatore", majorCrops: ["Coconut", "Banana", "Tomato", "Cotton"], soilType: "Red Calcareous & Black", apmcMandi: "Coimbatore APMC", normalRainfall: "Moderate" },
      { name: "Salem", majorCrops: ["Tapioca", "Mango", "Groundnut"], soilType: "Red Loamy Soil", apmcMandi: "Salem Regulated Market", normalRainfall: "Moderate" }
    ]
  },
  {
    state: "West Bengal",
    region: "East",
    districts: [
      { name: "Burdwan (Purba)", majorCrops: ["Paddy (Rice Bowl of Bengal)", "Potato", "Mustard"], soilType: "Damodar Valley Alluvial", apmcMandi: "Burdwan Grain Market", normalRainfall: "High" },
      { name: "Hooghly", majorCrops: ["Potato (Jyoti)", "Jute", "Vegetables"], soilType: "Ganga Alluvial Silt", apmcMandi: "Sheoraphuli Mandi", normalRainfall: "High" },
      { name: "Nadia", majorCrops: ["Jute", "Mustard", "Banana", "Paddy"], soilType: "Gangetic Sandy Alluvial", apmcMandi: "Krishnanagar Market", normalRainfall: "High" }
    ]
  },
  {
    state: "Rajasthan",
    region: "North",
    districts: [
      { name: "Kota", majorCrops: ["Soybean", "Mustard", "Wheat", "Coriander"], soilType: "Deep Black Heavy Clay", apmcMandi: "Bhamashah Kota Mandi", normalRainfall: "Moderate" },
      { name: "Sri Ganganagar", majorCrops: ["Cotton", "Wheat", "Guar", "Kinnow (Citrus)"], soilType: "Canal Irrigated Alluvial", apmcMandi: "Ganganagar Cotton Yard", normalRainfall: "Low" },
      { name: "Jaipur", majorCrops: ["Bajra (Millet)", "Mustard", "Barley"], soilType: "Sandy to Sandy Loam", apmcMandi: "Muhana Jaipur Mandi", normalRainfall: "Low to Moderate" }
    ]
  },
  {
    state: "Haryana",
    region: "North",
    districts: [
      { name: "Karnal", majorCrops: ["Basmati Rice", "Wheat", "Sugarcane"], soilType: "Yamuna Alluvial Loam", apmcMandi: "Karnal Grain Market", normalRainfall: "Moderate" },
      { name: "Hisar", majorCrops: ["Cotton", "Wheat", "Mustard", "Guar"], soilType: "Light Sandy Loam", apmcMandi: "Hisar Mandi", normalRainfall: "Low" },
      { name: "Sirsa", majorCrops: ["Cotton", "Wheat", "Paddy"], soilType: "Alluvial Desert Fringe", apmcMandi: "Sirsa APMC", normalRainfall: "Low" }
    ]
  },
  {
    state: "Bihar",
    region: "East",
    districts: [
      { name: "Patna", majorCrops: ["Paddy", "Wheat", "Maize", "Vegetables"], soilType: "Gangetic Silt Alluvial", apmcMandi: "Mithapur Patna Mandi", normalRainfall: "Moderate to High" },
      { name: "Muzaffarpur", majorCrops: ["Litchi (Shahi)", "Maize", "Paddy"], soilType: "Sandy Alluvium", apmcMandi: "Muzaffarpur Fruit Yard", normalRainfall: "High" },
      { name: "Purnia", majorCrops: ["Maize (Corn Capital)", "Jute", "Paddy"], soilType: "Kosi Floodplain Alluvial", apmcMandi: "Gulabbagh Mandi (Asia's Top Maize)", normalRainfall: "Very High" }
    ]
  }
]

export const ALL_INDIA_CROP_LIST = [
  "Tomato",
  "Onion",
  "Wheat",
  "Rice (Paddy)",
  "Cotton",
  "Soybean",
  "Sugarcane",
  "Potato",
  "Mustard",
  "Chilli",
  "Maize",
  "Groundnut",
  "Turmeric",
  "Gram (Chana)",
  "Jute",
  "Banana",
  "Mango",
  "Pomegranate"
]

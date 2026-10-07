import { 
  FarmerProfile, 
  CropPriceData, 
  MarketplaceListing, 
  WeatherData, 
  DiseaseDetectionResult, 
  FarmingAdviceRecommendation, 
  IrrigationAdvice, 
  NotificationItem, 
  AdminPlatformMetrics,
  LanguageOption
} from '../types'

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिंदी' },
  { code: 'mr', label: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', label: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'bn', label: 'Bengali', nativeName: 'বাংলা' }
]

export const DEFAULT_FARMER: FarmerProfile = {
  id: 'farmer_rajesh_01',
  name: 'Rajesh Patil',
  phone: '+91 98220 45678',
  email: 'rajesh.patil@krishimitra.farm',
  role: 'farmer',
  village: 'Dindori',
  district: 'Nashik',
  state: 'Maharashtra',
  landSize: 2,
  landUnit: 'acres',
  soilType: 'Medium Black Clayey Loam',
  mainCrops: ['Tomato', 'Onion'],
  preferredLanguage: 'mr',
  joinedDate: '2025-06-12',
  avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=250&q=80'
}

export const ADMIN_USER = {
  id: 'admin_krishi_01',
  name: 'Dr. Ramesh Kulkarni',
  email: 'ramesh.admin@krishimitra.gov.in',
  role: 'admin' as const,
  department: 'State Agricultural Technology Directorate',
  zone: 'All-India Central & State Directorate'
}

// All-India Dynamic Weather Generator
export const getWeatherForLocation = (district: string, state: string): WeatherData => {
  const isNorthern = ['Punjab', 'Haryana', 'Uttar Pradesh', 'Rajasthan', 'Delhi', 'Uttarakhand'].includes(state)
  const isHimalayan = ['Himachal Pradesh', 'Jammu & Kashmir'].includes(state)
  const isSouthern = ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Kerala'].includes(state)
  const isEastern = ['West Bengal', 'Bihar', 'Odisha', 'Jharkhand'].includes(state)
  const isNorthEast = ['Assam', 'Meghalaya', 'Tripura', 'Nagaland'].includes(state)
  const isCentral = ['Madhya Pradesh', 'Chhattisgarh'].includes(state)

  let temp = 28
  let condition = 'Partly Sunny with Pleasant Breeze'
  let rainProb = 25
  let humidity = 68
  let windSpeed = 12

  if (isHimalayan) {
    temp = 18
    condition = 'Cool Mountain Air & Clear Sky'
    rainProb = 15
    humidity = 55
    windSpeed = 16
  } else if (isNorthern) {
    temp = 29
    condition = 'Clear Sunshine with Moderate Dry Winds'
    rainProb = 20
    humidity = 52
    windSpeed = 14
  } else if (isSouthern) {
    temp = 31
    condition = 'Warm with Passing Tropical Clouds'
    rainProb = 45
    humidity = 78
    windSpeed = 15
  } else if (isEastern || isNorthEast) {
    temp = 29
    condition = 'Humid with Intermittent Light Showers'
    rainProb = 65
    humidity = 84
    windSpeed = 10
  } else if (isCentral) {
    temp = 30
    condition = 'Bright Sunshine with Light High Clouds'
    rainProb = 20
    humidity = 58
    windSpeed = 11
  } else {
    // Western (Maharashtra, Gujarat)
    temp = 28
    condition = 'Partly Cloudy with Evening Breeze'
    rainProb = 35
    humidity = 70
    windSpeed = 13
  }

  return {
    location: `${district}, ${state}`,
    district,
    state,
    temperature: temp,
    condition,
    rainProbability: rainProb,
    humidity,
    windSpeed,
    uvIndex: 'Moderate (5)',
    todayFarmingAlert: {
      title: `Weather Advisory for ${district} (${state})`,
      description: `Regional agro-meteorological station reports ${temp}°C with ${humidity}% humidity across ${district}. Conditions are ${rainProb > 50 ? 'favorable for moisture accumulation' : 'suitable for routine farm scouting and field operations'}.`,
      recommendation: rainProb > 50 
        ? `Hold off on scheduled chemical foliar spraying and inspect field drainage furrows.` 
        : `Normal irrigation schedule recommended. Inspect crop canopy for early pest presence.`,
      severity: rainProb > 50 ? 'warning' : 'info'
    },
    forecast: [
      { day: 'Today', date: '4 Oct', maxTemp: temp + 2, minTemp: temp - 7, condition: condition.split('with')[0].trim(), rainProbability: rainProb, advisory: 'Suitable for morning weeding and scouting.' },
      { day: 'Tomorrow', date: '5 Oct', maxTemp: temp + 1, minTemp: temp - 8, condition: rainProb > 40 ? 'Light Showers' : 'Clear Sky', rainProbability: Math.min(rainProb + 15, 85), advisory: rainProb > 40 ? 'Postpone pesticide spraying.' : 'Good for fertilizer application.' },
      { day: 'Mon', date: '6 Oct', maxTemp: temp, minTemp: temp - 7, condition: 'Partly Cloudy', rainProbability: Math.max(rainProb - 10, 15), advisory: 'Monitor for sucking pest activity.' },
      { day: 'Tue', date: '7 Oct', maxTemp: temp + 2, minTemp: temp - 6, condition: 'Bright Sunshine', rainProbability: 15, advisory: 'Ideal sunshine for foliar nutrition.' },
      { day: 'Wed', date: '8 Oct', maxTemp: temp + 3, minTemp: temp - 6, condition: 'Sunny', rainProbability: 10, advisory: 'Run standard drip irrigation cycle.' },
      { day: 'Thu', date: '9 Oct', maxTemp: temp + 3, minTemp: temp - 5, condition: 'Dry Weather', rainProbability: 10, advisory: 'Favorable for harvest & mandi transport.' },
      { day: 'Fri', date: '10 Oct', maxTemp: temp + 2, minTemp: temp - 6, condition: 'Pleasant Breeze', rainProbability: 20, advisory: 'Normal field operations across plot.' }
    ]
  }
}

export const MOCK_WEATHER = getWeatherForLocation('Nashik', 'Maharashtra')

export const MOCK_IRRIGATION: IrrigationAdvice = {
  crop: 'Tomato (Abhinav Variety)',
  soil: 'Medium Black Clayey Loam (Good water retention)',
  recentRainfall: '14 mm received recently',
  weatherSummary: 'Precipitation expected over regional blocks',
  recommendation: 'Postpone Irrigation — Rain Expected Tomorrow',
  recommendationType: 'postpone_rain',
  whyReason: 'The soil moisture in your plot is at 64% (optimal), and regional weather models indicate rainfall in the afternoon. Holding off watering prevents root waterlogging and root rot.',
  lastIrrigated: '2 Oct 2026, 07:30 AM (Drip - 45 min)',
  nextCheck: '5 Oct 2026, 06:00 PM (Post-rain inspection)',
  soilMoistureLevel: '64% — Adequate',
  logs: [
    { id: 'irr_1', date: '02 Oct 2026', crop: 'Tomato', status: 'Completed', waterAmount: '1,200 Litres', method: 'Drip Irrigation', notes: 'Morning cycle, fertigation with 19:19:19' },
    { id: 'irr_2', date: '29 Sep 2026', crop: 'Tomato', status: 'Completed', waterAmount: '1,400 Litres', method: 'Drip Irrigation', notes: 'Regular interval watering' },
    { id: 'irr_3', date: '26 Sep 2026', crop: 'Tomato', status: 'Completed', waterAmount: '1,100 Litres', method: 'Drip Irrigation', notes: 'Soil surface dry' },
    { id: 'irr_4', date: '22 Sep 2026', crop: 'Tomato', status: 'Completed', waterAmount: '1,300 Litres', method: 'Drip Irrigation', notes: 'Post-rain top-up' }
  ]
}

export const MOCK_DISEASE_REPORTS: DiseaseDetectionResult[] = [
  {
    id: 'dis_01',
    farmerId: 'farmer_rajesh_01',
    date: '03 Oct 2026',
    crop: 'Tomato',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d69102432?auto=format&fit=crop&w=600&q=80',
    diseaseName: 'Tomato Early Blight (Alternaria solani)',
    confidence: 93,
    severity: 'Moderate',
    symptoms: [
      'Dark brown concentric ring spots on lower mature leaves',
      'Yellow halo surrounding the concentric leaf lesions',
      'Lower leaves showing premature leaf drop and wilting'
    ],
    recommendations: [
      'Remove and safely dispose of infected lower leaves away from the plot.',
      'Apply bio-fungicide Trichoderma viride @ 5g/litre as preventative spray.',
      'If lesions spread, spray Mancozeb 75 WP @ 2.5g/L or Chlorothalonil 75 WP @ 2g/L on a clear morning.',
      'Avoid overhead sprinkler watering; stick to drip irrigation to keep foliage dry.'
    ],
    preventiveMeasures: [
      'Maintain adequate spacing (60cm x 45cm) between tomato bushes for air circulation.',
      'Stake tomato plants to keep fruit and leaves from touching wet soil.',
      'Rotate crop with non-solanaceous crops (e.g., maize, beans) next season.'
    ],
    disclaimer: 'AI results are informational and based on image analysis. For severe infestation or chemical usage confirmation, consult your local Krishi Vigyan Kendra (KVK) officer.'
  },
  {
    id: 'dis_02',
    farmerId: 'farmer_rajesh_01',
    date: '24 Sep 2026',
    crop: 'Onion',
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
    diseaseName: 'Purple Blotch (Alternaria porri)',
    confidence: 89,
    severity: 'Mild',
    symptoms: [
      'Small water-soaked lesions on leaves quickly developing white centers',
      'Purplish coloration forming around the lesion centers in high humidity'
    ],
    recommendations: [
      'Spray Mancozeb (0.25%) or Propiconazole 25 EC (0.1%) with sticker/spreader agent.',
      'Ensure proper drainage to prevent water stagnation in onion beds.'
    ],
    preventiveMeasures: [
      'Treat onion seeds with Thiram @ 3g/kg before sowing.',
      'Avoid excess nitrogen fertilizer which causes succulent tender growth.'
    ],
    disclaimer: 'AI results are informational. Always verify with local agricultural extension specialists.'
  }
]

// All-India APMC Mandi Rates
export const MOCK_CROP_PRICES: CropPriceData[] = [
  {
    id: 'price_tomato',
    crop: 'Tomato',
    variety: 'Hybrid / Local',
    market: 'Nashik APMC (MH)',
    district: 'Nashik',
    state: 'Maharashtra',
    modalPrice: 2450,
    minPrice: 1800,
    maxPrice: 2900,
    unit: '₹ / Quintal',
    trend: 'up',
    changePercent: 6.8,
    historical: [
      { date: '28 Sep', price: 2150 },
      { date: '29 Sep', price: 2200 },
      { date: '30 Sep', price: 2250 },
      { date: '01 Oct', price: 2320 },
      { date: '02 Oct', price: 2380 },
      { date: '03 Oct', price: 2410 },
      { date: '04 Oct', price: 2450 }
    ],
    nearbyMandis: [
      { market: 'Pimpalgaon APMC (MH)', distanceKm: 28, price: 2520, arrivalQty: '4,200 Crates' },
      { market: 'Lasalgaon APMC (MH)', distanceKm: 45, price: 2400, arrivalQty: '3,100 Crates' },
      { market: 'Azadpur Mandi (Delhi)', distanceKm: 1250, price: 3100, arrivalQty: '28,000 Crates' },
      { market: 'Vashi (Mumbai) APMC', distanceKm: 185, price: 2900, arrivalQty: '12,000 Crates' }
    ],
    estimatedPriceRange: '₹2,350 – ₹2,600 / Quintal expected over the next 5 days based on supply arrivals',
    updatedAt: 'Today, 08:30 AM'
  },
  {
    id: 'price_onion',
    crop: 'Onion',
    variety: 'Red / Garwa',
    market: 'Lasalgaon APMC (MH)',
    district: 'Nashik',
    state: 'Maharashtra',
    modalPrice: 3200,
    minPrice: 2600,
    maxPrice: 3850,
    unit: '₹ / Quintal',
    trend: 'stable',
    changePercent: 0.8,
    historical: [
      { date: '28 Sep', price: 3180 },
      { date: '29 Sep', price: 3190 },
      { date: '30 Sep', price: 3220 },
      { date: '01 Oct', price: 3210 },
      { date: '02 Oct', price: 3200 },
      { date: '03 Oct', price: 3195 },
      { date: '04 Oct', price: 3200 }
    ],
    nearbyMandis: [
      { market: 'Pimpalgaon Baswant', distanceKm: 32, price: 3280, arrivalQty: '14,000 Quintals' },
      { market: 'Nashik Main APMC', distanceKm: 42, price: 3150, arrivalQty: '9,500 Quintals' },
      { market: 'Azadpur Delhi Mandi', distanceKm: 1240, price: 3850, arrivalQty: '25,000 Quintals' },
      { market: 'Solapur APMC', distanceKm: 320, price: 3400, arrivalQty: '11,000 Quintals' }
    ],
    estimatedPriceRange: '₹3,100 – ₹3,350 / Quintal expected as Kharif arrivals begin steadily',
    updatedAt: 'Today, 09:15 AM'
  },
  {
    id: 'price_wheat',
    crop: 'Wheat',
    variety: 'Sharbati / Lokwan / C-306',
    market: 'Khanna Mandi (Punjab)',
    district: 'Ludhiana',
    state: 'Punjab',
    modalPrice: 2540,
    minPrice: 2425,
    maxPrice: 2680,
    unit: '₹ / Quintal',
    trend: 'stable',
    changePercent: 0.4,
    historical: [
      { date: '28 Sep', price: 2520 },
      { date: '29 Sep', price: 2530 },
      { date: '30 Sep', price: 2535 },
      { date: '01 Oct', price: 2535 },
      { date: '02 Oct', price: 2540 },
      { date: '03 Oct', price: 2540 },
      { date: '04 Oct', price: 2540 }
    ],
    nearbyMandis: [
      { market: 'Karnal Grain Market (Haryana)', distanceKm: 140, price: 2560, arrivalQty: '15,000 Bags' },
      { market: 'Sehore Krishi Mandi (MP)', distanceKm: 650, price: 2850, arrivalQty: '22,000 Bags' },
      { market: 'Ludhiana APMC (Punjab)', distanceKm: 45, price: 2550, arrivalQty: '18,000 Bags' }
    ],
    estimatedPriceRange: '₹2,500 – ₹2,600 / Quintal (MSP: ₹2,275)',
    updatedAt: 'Today, 10:15 AM'
  },
  {
    id: 'price_rice',
    crop: 'Rice (Paddy)',
    variety: 'Basmati 1121 / 1509',
    market: 'Karnal Grain Market (Haryana)',
    district: 'Karnal',
    state: 'Haryana',
    modalPrice: 3820,
    minPrice: 3450,
    maxPrice: 4200,
    unit: '₹ / Quintal',
    trend: 'up',
    changePercent: 4.1,
    historical: [
      { date: '28 Sep', price: 3650 },
      { date: '29 Sep', price: 3680 },
      { date: '30 Sep', price: 3720 },
      { date: '01 Oct', price: 3750 },
      { date: '02 Oct', price: 3780 },
      { date: '03 Oct', price: 3800 },
      { date: '04 Oct', price: 3820 }
    ],
    nearbyMandis: [
      { market: 'Amritsar Grain Yard (Punjab)', distanceKm: 240, price: 3890, arrivalQty: '18,000 Bags' },
      { market: 'Burdwan Mandi (West Bengal)', distanceKm: 1350, price: 2350, arrivalQty: '32,000 Bags' },
      { market: 'Thanjavur Market (Tamil Nadu)', distanceKm: 2200, price: 2450, arrivalQty: '26,000 Bags' }
    ],
    estimatedPriceRange: '₹3,750 – ₹3,950 / Quintal with strong export demand',
    updatedAt: 'Today, 10:30 AM'
  },
  {
    id: 'price_soybean',
    crop: 'Soybean',
    variety: 'Yellow (JS 335 / 9560)',
    market: 'Latur APMC (MH)',
    district: 'Latur',
    state: 'Maharashtra',
    modalPrice: 4720,
    minPrice: 4350,
    maxPrice: 4950,
    unit: '₹ / Quintal',
    trend: 'up',
    changePercent: 3.2,
    historical: [
      { date: '28 Sep', price: 4520 },
      { date: '29 Sep', price: 4580 },
      { date: '30 Sep', price: 4620 },
      { date: '01 Oct', price: 4650 },
      { date: '02 Oct', price: 4680 },
      { date: '03 Oct', price: 4700 },
      { date: '04 Oct', price: 4720 }
    ],
    nearbyMandis: [
      { market: 'Choithram Indore (MP)', distanceKm: 460, price: 4880, arrivalQty: '15,000 Bags' },
      { market: 'Kota Mandi (Rajasthan)', distanceKm: 620, price: 4760, arrivalQty: '11,000 Bags' },
      { market: 'Nanded APMC (MH)', distanceKm: 125, price: 4750, arrivalQty: '6,200 Bags' }
    ],
    estimatedPriceRange: '₹4,650 – ₹4,850 / Quintal (MSP reference: ₹4,892)',
    updatedAt: 'Today, 10:00 AM'
  },
  {
    id: 'price_cotton',
    crop: 'Cotton',
    variety: 'Medium Staple (Bt)',
    market: 'Rajkot APMC (Gujarat)',
    district: 'Rajkot',
    state: 'Gujarat',
    modalPrice: 7350,
    minPrice: 6800,
    maxPrice: 7800,
    unit: '₹ / Quintal',
    trend: 'down',
    changePercent: -1.9,
    historical: [
      { date: '28 Sep', price: 7600 },
      { date: '29 Sep', price: 7550 },
      { date: '30 Sep', price: 7500 },
      { date: '01 Oct', price: 7450 },
      { date: '02 Oct', price: 7400 },
      { date: '03 Oct', price: 7380 },
      { date: '04 Oct', price: 7350 }
    ],
    nearbyMandis: [
      { market: 'Gondal APMC (Gujarat)', distanceKm: 38, price: 7420, arrivalQty: '18,500 Quintals' },
      { market: 'Bathinda Mandi (Punjab)', distanceKm: 1100, price: 7280, arrivalQty: '14,000 Quintals' },
      { market: 'Warangal Yard (Telangana)', distanceKm: 980, price: 7400, arrivalQty: '16,000 Quintals' }
    ],
    estimatedPriceRange: '₹7,200 – ₹7,500 / Quintal with fresh ginning mill arrivals picking up',
    updatedAt: 'Today, 09:45 AM'
  },
  {
    id: 'price_potato',
    crop: 'Potato',
    variety: 'Jyoti / Kufri Pukhraj',
    market: 'Khandari Agra Mandi (UP)',
    district: 'Agra',
    state: 'Uttar Pradesh',
    modalPrice: 1680,
    minPrice: 1450,
    maxPrice: 1950,
    unit: '₹ / Quintal',
    trend: 'up',
    changePercent: 5.5,
    historical: [
      { date: '28 Sep', price: 1520 },
      { date: '29 Sep', price: 1550 },
      { date: '30 Sep', price: 1580 },
      { date: '01 Oct', price: 1610 },
      { date: '02 Oct', price: 1640 },
      { date: '03 Oct', price: 1660 },
      { date: '04 Oct', price: 1680 }
    ],
    nearbyMandis: [
      { market: 'Sheoraphuli (West Bengal)', distanceKm: 1200, price: 1780, arrivalQty: '24,000 Bags' },
      { market: 'Azadpur Delhi Mandi', distanceKm: 210, price: 1850, arrivalQty: '32,000 Bags' },
      { market: 'Jalandhar Yard (Punjab)', distanceKm: 580, price: 1620, arrivalQty: '14,000 Bags' }
    ],
    estimatedPriceRange: '₹1,600 – ₹1,800 / Quintal as cold storage releases steady supplies',
    updatedAt: 'Today, 09:00 AM'
  },
  {
    id: 'price_chilli',
    crop: 'Chilli',
    variety: 'Guntur Teja / Dry Red',
    market: 'Guntur Mirchi Yard (AP)',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    modalPrice: 16400,
    minPrice: 14200,
    maxPrice: 18800,
    unit: '₹ / Quintal',
    trend: 'up',
    changePercent: 2.8,
    historical: [
      { date: '28 Sep', price: 15800 },
      { date: '29 Sep', price: 15950 },
      { date: '30 Sep', price: 16100 },
      { date: '01 Oct', price: 16200 },
      { date: '02 Oct', price: 16300 },
      { date: '03 Oct', price: 16350 },
      { date: '04 Oct', price: 16400 }
    ],
    nearbyMandis: [
      { market: 'Khammam Yard (Telangana)', distanceKm: 130, price: 16200, arrivalQty: '8,000 Bags' },
      { market: 'Byadagi APMC (Karnataka)', distanceKm: 580, price: 21000, arrivalQty: '12,000 Bags' }
    ],
    estimatedPriceRange: '₹16,000 – ₹17,000 / Quintal with festive demand from spice extractors',
    updatedAt: 'Today, 11:00 AM'
  },
  {
    id: 'price_mustard',
    crop: 'Mustard (Sarson)',
    variety: 'Pusa Bold / Pioneer',
    market: 'Sri Ganganagar Grain Mandi',
    district: 'Sri Ganganagar',
    state: 'Rajasthan',
    modalPrice: 5620,
    minPrice: 5200,
    maxPrice: 5950,
    unit: '₹ / Quintal',
    trend: 'up',
    changePercent: 3.4,
    historical: [
      { date: '28 Sep', price: 5400 },
      { date: '29 Sep', price: 5450 },
      { date: '30 Sep', price: 5500 },
      { date: '01 Oct', price: 5550 },
      { date: '02 Oct', price: 5580 },
      { date: '03 Oct', price: 5600 },
      { date: '04 Oct', price: 5620 }
    ],
    nearbyMandis: [
      { market: 'Kota Bhamashah Mandi (RJ)', distanceKm: 420, price: 5650, arrivalQty: '12,000 Bags' },
      { market: 'Hisar Grain Market (Haryana)', distanceKm: 210, price: 5580, arrivalQty: '9,500 Bags' },
      { market: 'Agra Mandi (UP)', distanceKm: 480, price: 5700, arrivalQty: '14,000 Bags' }
    ],
    estimatedPriceRange: '₹5,500 – ₹5,800 / Quintal supported by edible oil mill crush demand',
    updatedAt: 'Today, 10:45 AM'
  },
  {
    id: 'price_groundnut',
    crop: 'Groundnut (Mungfali)',
    variety: 'GG-20 / Bold Kernels',
    market: 'Rajkot Bedi APMC',
    district: 'Rajkot',
    state: 'Gujarat',
    modalPrice: 6480,
    minPrice: 5900,
    maxPrice: 6900,
    unit: '₹ / Quintal',
    trend: 'stable',
    changePercent: 0.6,
    historical: [
      { date: '28 Sep', price: 6420 },
      { date: '29 Sep', price: 6450 },
      { date: '30 Sep', price: 6460 },
      { date: '01 Oct', price: 6450 },
      { date: '02 Oct', price: 6470 },
      { date: '03 Oct', price: 6480 },
      { date: '04 Oct', price: 6480 }
    ],
    nearbyMandis: [
      { market: 'Gondal APMC (Gujarat)', distanceKm: 38, price: 6520, arrivalQty: '22,000 Bags' },
      { market: 'Kurnool APMC (Andhra Pradesh)', distanceKm: 1100, price: 6350, arrivalQty: '8,000 Bags' },
      { market: 'Bikaner Mandi (Rajasthan)', distanceKm: 850, price: 6400, arrivalQty: '14,000 Bags' }
    ],
    estimatedPriceRange: '₹6,300 – ₹6,650 / Quintal as festive oil demand stays steady',
    updatedAt: 'Today, 10:15 AM'
  },
  {
    id: 'price_sugarcane',
    crop: 'Sugarcane',
    variety: 'Co-0238 / Co-86032',
    market: 'Meerut Sugar Belt APMC',
    district: 'Meerut',
    state: 'Uttar Pradesh',
    modalPrice: 370,
    minPrice: 350,
    maxPrice: 390,
    unit: '₹ / Quintal',
    trend: 'stable',
    changePercent: 0.0,
    historical: [
      { date: '28 Sep', price: 370 },
      { date: '29 Sep', price: 370 },
      { date: '30 Sep', price: 370 },
      { date: '01 Oct', price: 370 },
      { date: '02 Oct', price: 370 },
      { date: '03 Oct', price: 370 },
      { date: '04 Oct', price: 370 }
    ],
    nearbyMandis: [
      { market: 'Muzaffarnagar Cane Society', distanceKm: 55, price: 370, arrivalQty: '45,000 Qtl' },
      { market: 'Kolhapur Factory Gate (MH)', distanceKm: 1450, price: 345, arrivalQty: '38,000 Qtl' }
    ],
    estimatedPriceRange: 'Government State Advisory Price (SAP): ₹370/Qtl for early variety',
    updatedAt: 'Today, 08:00 AM'
  },
  {
    id: 'price_turmeric',
    crop: 'Turmeric (Haldi)',
    variety: 'Finger / Salem Grade',
    market: 'Erode Turmeric Market',
    district: 'Erode',
    state: 'Tamil Nadu',
    modalPrice: 14200,
    minPrice: 12500,
    maxPrice: 15800,
    unit: '₹ / Quintal',
    trend: 'up',
    changePercent: 4.8,
    historical: [
      { date: '28 Sep', price: 13200 },
      { date: '29 Sep', price: 13400 },
      { date: '30 Sep', price: 13650 },
      { date: '01 Oct', price: 13900 },
      { date: '02 Oct', price: 14000 },
      { date: '03 Oct', price: 14100 },
      { date: '04 Oct', price: 14200 }
    ],
    nearbyMandis: [
      { market: 'Nizamabad Yard (Telangana)', distanceKm: 850, price: 14000, arrivalQty: '14,000 Bags' },
      { market: 'Sangli APMC (Maharashtra)', distanceKm: 780, price: 14350, arrivalQty: '9,000 Bags' }
    ],
    estimatedPriceRange: '₹13,800 – ₹14,600 / Quintal with export buying momentum',
    updatedAt: 'Today, 11:30 AM'
  },
  {
    id: 'price_maize',
    crop: 'Maize (Corn)',
    variety: 'Hybrid Yellow / Poultry Grade',
    market: 'Gulabbagh Mandi (Purnea)',
    district: 'Samastipur',
    state: 'Bihar',
    modalPrice: 2180,
    minPrice: 1980,
    maxPrice: 2320,
    unit: '₹ / Quintal',
    trend: 'stable',
    changePercent: 1.1,
    historical: [
      { date: '28 Sep', price: 2120 },
      { date: '29 Sep', price: 2140 },
      { date: '30 Sep', price: 2150 },
      { date: '01 Oct', price: 2160 },
      { date: '02 Oct', price: 2170 },
      { date: '03 Oct', price: 2175 },
      { date: '04 Oct', price: 2180 }
    ],
    nearbyMandis: [
      { market: 'Chhindwara Mandi (MP)', distanceKm: 780, price: 2210, arrivalQty: '16,000 Bags' },
      { market: 'Davangere APMC (Karnataka)', distanceKm: 1800, price: 2250, arrivalQty: '20,000 Bags' }
    ],
    estimatedPriceRange: '₹2,100 – ₹2,280 / Quintal supported by steady feed mill inquiries',
    updatedAt: 'Today, 10:20 AM'
  },
  {
    id: 'price_apple',
    crop: 'Apple',
    variety: 'Royal Delicious / Shimla',
    market: 'Dhali Subzi & Fruit Mandi (Shimla)',
    district: 'Shimla',
    state: 'Himachal Pradesh',
    modalPrice: 8500,
    minPrice: 6500,
    maxPrice: 10500,
    unit: '₹ / Quintal',
    trend: 'up',
    changePercent: 3.6,
    historical: [
      { date: '28 Sep', price: 8100 },
      { date: '29 Sep', price: 8200 },
      { date: '30 Sep', price: 8250 },
      { date: '01 Oct', price: 8350 },
      { date: '02 Oct', price: 8400 },
      { date: '03 Oct', price: 8450 },
      { date: '04 Oct', price: 8500 }
    ],
    nearbyMandis: [
      { market: 'Azadpur Fruit Mandi (Delhi)', distanceKm: 340, price: 9200, arrivalQty: '35,000 Boxes' },
      { market: 'Parimpora Fruit Mandi (Srinagar)', distanceKm: 550, price: 8400, arrivalQty: '25,000 Boxes' }
    ],
    estimatedPriceRange: '₹8,200 – ₹9,200 / Quintal for Grade A colored mountain fruit',
    updatedAt: 'Today, 09:30 AM'
  }
]

// All-India Marketplace Listings
export const MOCK_MARKETPLACE: MarketplaceListing[] = [
  {
    id: 'list_01',
    type: 'sell',
    crop: 'Fresh Farm Tomatoes (Abhinav)',
    variety: 'Semi-determinate Red',
    quantity: 45,
    unit: 'Crates',
    pricePerUnit: 480,
    location: 'Dindori, Nashik',
    district: 'Nashik',
    state: 'Maharashtra',
    sellerName: 'Rajesh Patil',
    sellerPhone: '+91 98220 45678',
    datePosted: '03 Oct 2026',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d69102432?auto=format&fit=crop&w=500&q=80',
    status: 'available',
    qualityGrade: 'Grade A',
    organicCertified: false,
    description: 'Freshly harvested mature red & orange firm tomatoes. Plucked this morning, sorted into 20kg clean plastic crates. Ready for wholesale pickup at farm gate.'
  },
  {
    id: 'list_02',
    type: 'sell',
    crop: 'Nashik Red Onions (Garwa)',
    variety: 'Medium to Big Size',
    quantity: 60,
    unit: 'Quintals',
    pricePerUnit: 3150,
    location: 'Pimpalgaon, Niphad',
    district: 'Nashik',
    state: 'Maharashtra',
    sellerName: 'Sunita More',
    sellerPhone: '+91 94231 88920',
    datePosted: '02 Oct 2026',
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=500&q=80',
    status: 'available',
    qualityGrade: 'Grade A',
    organicCertified: true,
    description: 'Dry cured kharif garwa onions with double skin. Low moisture, good for 2-month storage without sprouting. Stored in ventilated kanda chawl.'
  },
  {
    id: 'list_03',
    type: 'sell',
    crop: 'Pure Sharbati Wheat (C-306)',
    variety: 'Sharbati Golden Grains',
    quantity: 80,
    unit: 'Quintals',
    pricePerUnit: 2850,
    location: 'Sehore Krishi Belt',
    district: 'Sehore',
    state: 'Madhya Pradesh',
    sellerName: 'Devendra Meena',
    sellerPhone: '+91 98932 11456',
    datePosted: '01 Oct 2026',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80',
    status: 'available',
    qualityGrade: 'Grade A',
    organicCertified: true,
    description: 'Pure Sharbati golden grains grown without synthetic chemical pesticides. Machine cleaned and packed in 50kg bags.'
  },
  {
    id: 'list_04',
    type: 'sell',
    crop: 'Basmati Rice 1121 (Golden Sella)',
    variety: 'Aged 1-Year Extra Long Grain',
    quantity: 120,
    unit: 'Quintals',
    pricePerUnit: 4100,
    location: 'Karnal GT Road Hub',
    district: 'Karnal',
    state: 'Haryana',
    sellerName: 'Harpreet Singh Sandhu',
    sellerPhone: '+91 98120 44321',
    datePosted: '03 Oct 2026',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80',
    status: 'available',
    qualityGrade: 'Grade A',
    organicCertified: false,
    description: 'Super premium 1121 aromatic Basmati paddy harvested from canal-fed fields. Moisture verified under 12%.'
  },
  {
    id: 'list_05',
    type: 'sell',
    crop: 'Cold Storage Seed Potatoes (Kufri Jyoti)',
    variety: 'Kufri Jyoti Grade A',
    quantity: 150,
    unit: 'Quintals',
    pricePerUnit: 1720,
    location: 'Fatehabad Road, Agra',
    district: 'Agra',
    state: 'Uttar Pradesh',
    sellerName: 'Rameshwar Dayal Yadav',
    sellerPhone: '+91 94120 87654',
    datePosted: '02 Oct 2026',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80',
    status: 'available',
    qualityGrade: 'Grade A',
    organicCertified: false,
    description: 'Graded uniform size 45-55mm table & processing potatoes. Dry, clean and sorted into 50kg breathable jute bags.'
  },
  {
    id: 'list_06',
    type: 'sell',
    crop: 'Dry Red Teja Hot Chilli (Stemless)',
    variety: 'Teja S17 Guntur',
    quantity: 40,
    unit: 'Quintals',
    pricePerUnit: 16800,
    location: 'Mirchi Yard Road, Guntur',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    sellerName: 'K. Venkat Rao',
    sellerPhone: '+91 98480 33219',
    datePosted: '01 Oct 2026',
    imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=500&q=80',
    status: 'available',
    qualityGrade: 'Grade A',
    organicCertified: false,
    description: 'Deep red color, SHU 75,000+ high pungency stemless sun-dried chillies. Cleaned and packed in poly-lined gunny bags.'
  }
]

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: '🌧️ Heavy Rain Alert for Your District',
    message: 'Rain expected tomorrow afternoon. Postpone irrigation and hold off on pesticide spraying.',
    type: 'weather',
    timestamp: '25 mins ago',
    read: false,
    link: '/farmer/weather'
  },
  {
    id: 'notif_2',
    title: '💧 Irrigation Recommendation Updated',
    message: 'Soil moisture is 64%. Watering can be safely skipped for the next 48 hours.',
    type: 'irrigation',
    timestamp: '2 hours ago',
    read: false,
    link: '/farmer/irrigation'
  },
  {
    id: 'notif_3',
    title: '💰 Mandi Price Alert: Tomato jumped +6.8%',
    message: 'Modal price reached ₹2,520/quintal in nearby mandis. Favorable harvesting window.',
    type: 'price',
    timestamp: '5 hours ago',
    read: true,
    link: '/farmer/prices'
  },
  {
    id: 'notif_4',
    title: '🍃 Crop Health Report Generated',
    message: 'Tomato Early Blight detected (93% match). Recommended treatment plan is ready in your reports.',
    type: 'disease',
    timestamp: 'Yesterday',
    read: true,
    link: '/farmer/reports'
  },
  {
    id: 'notif_5',
    title: '🛒 Buyer Inquiry on Harvest Listing',
    message: 'A registered wholesale trader expressed interest in your produce listing.',
    type: 'marketplace',
    timestamp: '2 days ago',
    read: true,
    link: '/farmer/marketplace'
  }
]

export const MOCK_ADMIN_METRICS: AdminPlatformMetrics = {
  totalFarmers: 42850,
  activeFarmersToday: 18240,
  diseaseChecksTotal: 94120,
  marketplaceListingsActive: 3420,
  aiRequestsProcessed: 152890,
  systemUptimePercentage: 99.98,
  pendingVerifications: 142
}

export const MOCK_FARM_ADVICE_REPORTS: FarmingAdviceRecommendation[] = [
  {
    id: 'rec_01',
    farmerId: 'farmer_rajesh_01',
    date: '02 Oct 2026',
    location: 'Nashik, Maharashtra',
    soilType: 'Medium Black Clayey Loam',
    crop: 'Tomato',
    season: 'Rabi (Winter Planting)',
    landSize: '2 Acres',
    rainfallCondition: 'Moderate Expected',
    recommendedAction: 'Optimal Sowing Window: Raise nursery beds on 15cm ridges with drip fertigation',
    whyRecommendation: [
      'Black clayey loam retains moisture well but needs raised ridges during early root development to prevent damping-off.',
      'Rabi temperatures in Nashik (18°C–30°C) provide the ideal thermal bracket for lycopene formation and firm fruit setting.',
      'Historical mandi data shows strong price realization for Nashik tomatoes in the December-January harvest window.'
    ],
    expectedConsiderations: [
      'Watch out for Whitefly vectors in October; install yellow sticky traps (15 traps/acre).',
      'Balance nitrogen intake; excess urea during vegetative phase will attract leaf miner and blight.'
    ],
    irrigationRecommendation: 'Drip irrigation 40–50 minutes every 2–3 days based on tensiometer or soil surface dryness. Pause on overcast/rain days.',
    basicPractices: [
      'Seed Treatment: Imidacloprid 70 WS @ 5g/kg seed followed by Trichoderma harzianum.',
      'Transplant seedlings at 25–30 days old during late afternoon to minimize transplant shock.',
      'Apply neem cake @ 100 kg/acre during land preparation for nematode suppression.'
    ],
    fertilizerTip: 'Basal: DAP 50kg + MOP 30kg + Zinc Sulphate 10kg per acre during final bed preparation.',
    disclaimer: 'These recommendations are generated as agricultural guidance based on regional agro-climatic zones and soil data. Not a guaranteed crop yield outcome.'
  }
]

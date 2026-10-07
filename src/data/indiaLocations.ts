export interface DistrictInfo {
  name: string
  majorCrops: string[]
  soilType: string
  mandiName: string
}

export interface StateInfo {
  name: string
  region: 'North' | 'South' | 'West' | 'Central' | 'East' | 'NorthEast'
  districts: DistrictInfo[]
}

export const ALL_INDIA_STATES: StateInfo[] = [
  {
    name: 'Maharashtra',
    region: 'West',
    districts: [
      { name: 'Nashik', majorCrops: ['Tomato', 'Onion', 'Grapes', 'Pomegranate'], soilType: 'Medium Black Clayey Loam', mandiName: 'Nashik Main APMC' },
      { name: 'Pune', majorCrops: ['Sugarcane', 'Onion', 'Tomato', 'Wheat'], soilType: 'Deep Black Soil', mandiName: 'Pune APMC (Gultekdi)' },
      { name: 'Latur', majorCrops: ['Soybean', 'Chana (Gram)', 'Tur (Arhar)'], soilType: 'Black Cotton Soil', mandiName: 'Latur APMC' },
      { name: 'Jalgaon', majorCrops: ['Banana', 'Cotton', 'Maize'], soilType: 'Deep Alluvial Black Soil', mandiName: 'Jalgaon APMC' },
      { name: 'Ahmednagar', majorCrops: ['Sugarcane', 'Onion', 'Pomegranate', 'Bajra'], soilType: 'Medium Black Soil', mandiName: 'Ahmednagar APMC' },
      { name: 'Solapur', majorCrops: ['Jowar', 'Pomegranate', 'Sugarcane', 'Grapes'], soilType: 'Shallow to Medium Black Soil', mandiName: 'Solapur APMC' },
      { name: 'Kolhapur', majorCrops: ['Sugarcane', 'Rice (Paddy)', 'Soybean', 'Turmeric'], soilType: 'Red Lateritic & Black Loam', mandiName: 'Kolhapur APMC' },
      { name: 'Nagpur', majorCrops: ['Orange (Citrus)', 'Cotton', 'Soybean'], soilType: 'Black Clayey Loam', mandiName: 'Nagpur Cotton & Fruit Mandi' },
      { name: 'Amravati', majorCrops: ['Cotton', 'Soybean', 'Orange'], soilType: 'Deep Heavy Black Soil', mandiName: 'Amravati APMC' }
    ]
  },
  {
    name: 'Punjab',
    region: 'North',
    districts: [
      { name: 'Ludhiana', majorCrops: ['Wheat', 'Rice (Paddy)', 'Maize', 'Potato'], soilType: 'Fertile Alluvial Loam', mandiName: 'Khanna Mandi' },
      { name: 'Amritsar', majorCrops: ['Basmati Rice', 'Wheat', 'Vegetables'], soilType: 'Alluvial Sandy Loam', mandiName: 'Amritsar Bhagtanwala Grain Yard' },
      { name: 'Bathinda', majorCrops: ['Cotton', 'Wheat', 'Mustard'], soilType: 'Light Desert Sandy Loam', mandiName: 'Bathinda Grain & Cotton Mandi' },
      { name: 'Jalandhar', majorCrops: ['Potato', 'Wheat', 'Sunflower', 'Maize'], soilType: 'Rich Alluvial Soil', mandiName: 'Jalandhar APMC' },
      { name: 'Patiala', majorCrops: ['Wheat', 'Rice (Paddy)', 'Sugarcane'], soilType: 'Deep Alluvial Loam', mandiName: 'Patiala Grain Market' }
    ]
  },
  {
    name: 'Haryana',
    region: 'North',
    districts: [
      { name: 'Karnal', majorCrops: ['Basmati Rice', 'Wheat', 'Sugarcane'], soilType: 'Fertile Alluvial Plain', mandiName: 'Karnal Grain Market' },
      { name: 'Sirsa', majorCrops: ['Cotton', 'Wheat', 'Mustard', 'Guar'], soilType: 'Sandy Loam to Calcareous', mandiName: 'Sirsa Mandi' },
      { name: 'Hisar', majorCrops: ['Wheat', 'Mustard', 'Cotton', 'Bajra'], soilType: 'Light Sandy Loam', mandiName: 'Hisar Grain Market' },
      { name: 'Ambala', majorCrops: ['Rice (Paddy)', 'Wheat', 'Sugarcane'], soilType: 'Loamy Alluvial Soil', mandiName: 'Ambala City Mandi' },
      { name: 'Sonipat', majorCrops: ['Vegetables', 'Wheat', 'Mushroom', 'Paddy'], soilType: 'Silty Alluvial Loam', mandiName: 'Sonipat APMC' }
    ]
  },
  {
    name: 'Uttar Pradesh',
    region: 'North',
    districts: [
      { name: 'Agra', majorCrops: ['Potato', 'Mustard', 'Wheat', 'Bajra'], soilType: 'Alluvial Loamy Sand', mandiName: 'Agra Mandi (Fatehabad Rd)' },
      { name: 'Varanasi', majorCrops: ['Rice (Paddy)', 'Wheat', 'Vegetables', 'Mustard'], soilType: 'Gangetic Alluvium', mandiName: 'Varanasi Grain Mandi' },
      { name: 'Meerut', majorCrops: ['Sugarcane', 'Wheat', 'Potato', 'Mustard'], soilType: 'Deep Alluvial Sandy Loam', mandiName: 'Meerut APMC' },
      { name: 'Bareilly', majorCrops: ['Rice (Paddy)', 'Wheat', 'Mentha (Mint)', 'Sugarcane'], soilType: 'Tarai Alluvial Silt', mandiName: 'Bareilly Krishi Utpadan Mandi' },
      { name: 'Aligarh', majorCrops: ['Wheat', 'Mustard', 'Bajra', 'Potato'], soilType: 'Alluvial Loam', mandiName: 'Aligarh Mandi' },
      { name: 'Gorakhpur', majorCrops: ['Rice (Paddy)', 'Sugarcane', 'Wheat'], soilType: 'Gangetic Fine Silt Loam', mandiName: 'Gorakhpur Mandi' },
      { name: 'Jhansi', majorCrops: ['Chana (Gram)', 'Mustard', 'Wheat', 'Urad'], soilType: 'Bundelkhand Black & Red Mix', mandiName: 'Jhansi Mandi' }
    ]
  },
  {
    name: 'Madhya Pradesh',
    region: 'Central',
    districts: [
      { name: 'Indore', majorCrops: ['Soybean', 'Wheat', 'Potato', 'Garlic'], soilType: 'Deep Black Malwa Soil', mandiName: 'Indore Chhoithram Mandi' },
      { name: 'Ujjain', majorCrops: ['Soybean', 'Wheat', 'Chana (Gram)', 'Onion'], soilType: 'Heavy Black Cotton Soil', mandiName: 'Ujjain Krishi Mandi' },
      { name: 'Sehore', majorCrops: ['Sharbati Wheat', 'Soybean', 'Chana'], soilType: 'Rich Malwa Black Soil', mandiName: 'Sehore Krishi Upaj Mandi' },
      { name: 'Hoshangabad (Narmadapuram)', majorCrops: ['Wheat', 'Rice (Paddy)', 'Moong (Green Gram)'], soilType: 'Deep Narmada Alluvial Silt', mandiName: 'Itarsi Mandi' },
      { name: 'Khargone', majorCrops: ['Cotton', 'Chilli', 'Soybean', 'Maize'], soilType: 'Medium Black Nimar Soil', mandiName: 'Bedia Chilli Mandi (Khargone)' },
      { name: 'Mandsaur', majorCrops: ['Garlic', 'Opium Seed', 'Soybean', 'Mustard'], soilType: 'Black & Clay Loam', mandiName: 'Mandsaur Garlic Mandi' }
    ]
  },
  {
    name: 'Gujarat',
    region: 'West',
    districts: [
      { name: 'Rajkot', majorCrops: ['Groundnut (Peanut)', 'Cotton', 'Wheat', 'Cumin'], soilType: 'Medium Black Saurashtra Soil', mandiName: 'Rajkot Bedi APMC' },
      { name: 'Surat', majorCrops: ['Sugarcane', 'Banana', 'Paddy', 'Vegetables'], soilType: 'Heavy Coastal Black Soil', mandiName: 'Surat Sardar Market' },
      { name: 'Mehsana', majorCrops: ['Castor', 'Mustard', 'Cumin (Jeera)', 'Fennel (Saunf)'], soilType: 'Sandy Loam Soil', mandiName: 'Unjha Mandi (Asia\'s Spices Hub)' },
      { name: 'Junagadh', majorCrops: ['Groundnut', 'Kesar Mango', 'Cotton', 'Sesame'], soilType: 'Medium Coastal Alluvium', mandiName: 'Junagadh APMC' },
      { name: 'Vadodara', majorCrops: ['Cotton', 'Tobacco', 'Paddy', 'Tur'], soilType: 'Black Clay Loam', mandiName: 'Vadodara APMC' }
    ]
  },
  {
    name: 'Rajasthan',
    region: 'North',
    districts: [
      { name: 'Sri Ganganagar', majorCrops: ['Wheat', 'Mustard', 'Cotton', 'Kinnow (Citrus)'], soilType: 'Canal Irrigated Alluvium', mandiName: 'Ganganagar Grain Mandi' },
      { name: 'Kota', majorCrops: ['Soybean', 'Mustard', 'Wheat', 'Coriander (Dhaniya)'], soilType: 'Deep Black Hadoti Soil', mandiName: 'Kota Bhamashah Krishi Mandi' },
      { name: 'Jaipur', majorCrops: ['Mustard', 'Bajra', 'Wheat', 'Barley'], soilType: 'Sandy Loam Semi-Arid Soil', mandiName: 'Jaipur Muhana Mandi' },
      { name: 'Bikaner', majorCrops: ['Groundnut', 'Guar Gum', 'Moth Bean', 'Mustard'], soilType: 'Arid Sandy Desert Loam', mandiName: 'Bikaner Krishi Upaj Mandi' },
      { name: 'Jodhpur', majorCrops: ['Cumin', 'Isabgol (Psyllium)', 'Bajra', 'Moong'], soilType: 'Sandy Desert Soil', mandiName: 'Jodhpur Mandi' }
    ]
  },
  {
    name: 'Karnataka',
    region: 'South',
    districts: [
      { name: 'Kolar', majorCrops: ['Tomato', 'Mulberry (Silk)', 'Ragi (Finger Millet)', 'Mango'], soilType: 'Red Sandy Loam Soil', mandiName: 'Kolar APMC (Asia\'s 2nd Tomato Hub)' },
      { name: 'Belagavi', majorCrops: ['Sugarcane', 'Soybean', 'Maize', 'Vegetables'], soilType: 'Rich Black & Red Loam', mandiName: 'Belagavi APMC' },
      { name: 'Shimoga', majorCrops: ['Arecanut (Supari)', 'Paddy', 'Ginger', 'Maize'], soilType: 'Laterite & Red Sandy Loam', mandiName: 'Shimoga APMC' },
      { name: 'Haveri', majorCrops: ['Byadgi Chilli', 'Cotton', 'Maize'], soilType: 'Medium Black Clay', mandiName: 'Byadgi Chilli Market' },
      { name: 'Mysuru', majorCrops: ['Ragi', 'Paddy', 'Sugarcane', 'Cotton'], soilType: 'Red Loam & Clay Loam', mandiName: 'Bandipalya APMC Mysuru' }
    ]
  },
  {
    name: 'Andhra Pradesh',
    region: 'South',
    districts: [
      { name: 'Guntur', majorCrops: ['Red Chilli', 'Cotton', 'Tobacco', 'Paddy'], soilType: 'Heavy Black Clay Soil', mandiName: 'Guntur Mirchi Yard (Asia\'s Largest)' },
      { name: 'Krishna', majorCrops: ['Paddy', 'Sugarcane', 'Mango', 'Cotton'], soilType: 'Fertile Krishna Delta Alluvium', mandiName: 'Vijayawada APMC' },
      { name: 'Kurnool', majorCrops: ['Onion', 'Groundnut', 'Bengal Gram', 'Cotton'], soilType: 'Black & Red Mixed Soil', mandiName: 'Kurnool APMC' },
      { name: 'East Godavari', majorCrops: ['Rice (Paddy)', 'Coconut', 'Oil Palm', 'Cashew'], soilType: 'Deltaic Alluvium & Coastal Sand', mandiName: 'Rajahmundry APMC' }
    ]
  },
  {
    name: 'Telangana',
    region: 'South',
    districts: [
      { name: 'Warangal', majorCrops: ['Cotton', 'Red Chilli', 'Paddy', 'Maize'], soilType: 'Red Sandy & Black Soil', mandiName: 'Warangal Enumamula Market Yard' },
      { name: 'Nizamabad', majorCrops: ['Turmeric', 'Paddy', 'Soybean', 'Maize'], soilType: 'Black Cotton Soil', mandiName: 'Nizamabad Turmeric Market' },
      { name: 'Khammam', majorCrops: ['Cotton', 'Chilli', 'Mango', 'Paddy'], soilType: 'Red Sandy Loam', mandiName: 'Khammam Agriculture Market' }
    ]
  },
  {
    name: 'Tamil Nadu',
    region: 'South',
    districts: [
      { name: 'Thanjavur', majorCrops: ['Paddy (Rice Bowl of TN)', 'Coconut', 'Banana'], soilType: 'Cauvery River Alluvium', mandiName: 'Thanjavur Regulated Market' },
      { name: 'Coimbatore', majorCrops: ['Coconut', 'Poultry Feed Maize', 'Cotton', 'Tomato'], soilType: 'Red & Black Loam', mandiName: 'Coimbatore APMC' },
      { name: 'Erode', majorCrops: ['Turmeric', 'Sugarcane', 'Banana', 'Tapioca'], soilType: 'Red Gravelly Loam', mandiName: 'Erode Turmeric Market' },
      { name: 'Dindigul', majorCrops: ['Small Onion (Shallots)', 'Vegetables', 'Flowers'], soilType: 'Red Sandy Loam', mandiName: 'Oddanchatram Vegetable Market' }
    ]
  },
  {
    name: 'West Bengal',
    region: 'East',
    districts: [
      { name: 'Purba Bardhaman', majorCrops: ['Aman & Boro Rice', 'Potato', 'Mustard', 'Jute'], soilType: 'Fertile Damodar Alluvium', mandiName: 'Burdwan Sadar Mandi' },
      { name: 'Hooghly', majorCrops: ['Potato (Jyoti)', 'Jute', 'Paddy', 'Vegetables'], soilType: 'Gangetic Alluvial Silt', mandiName: 'Champadanga Wholesale Market' },
      { name: 'Nadia', majorCrops: ['Jute', 'Vegetables', 'Paddy', 'Banana'], soilType: 'New Alluvial Soil', mandiName: 'Bethuadahari Market Yard' },
      { name: 'Malda', majorCrops: ['Mango (Fazli / Himsagar)', 'Jute', 'Silk Mulberry'], soilType: 'Deep Alluvial Sandy Clay', mandiName: 'Malda English Bazar APMC' }
    ]
  },
  {
    name: 'Bihar',
    region: 'East',
    districts: [
      { name: 'Muzaffarpur', majorCrops: ['Shahi Litchi', 'Maize', 'Paddy', 'Wheat'], soilType: 'Calcareous Alluvium', mandiName: 'Muzaffarpur Bazar Samiti' },
      { name: 'Samastipur', majorCrops: ['Maize', 'Tobacco', 'Potato', 'Wheat'], soilType: 'Gangetic Silt Loam', mandiName: 'Samastipur Mandi' },
      { name: 'Begusarai', majorCrops: ['Maize (Rabi High-Yield)', 'Wheat', 'Mustard'], soilType: 'Fertile Riverine Alluvium', mandiName: 'Begusarai Bazar Samiti' },
      { name: 'Rohtas', majorCrops: ['Paddy', 'Wheat', 'Lentil (Masoor)'], soilType: 'Canal Alluvial Loam', mandiName: 'Sasaram Grain Mandi' }
    ]
  },
  {
    name: 'Odisha',
    region: 'East',
    districts: [
      { name: 'Bargarh', majorCrops: ['Rice (Rice Bowl of Odisha)', 'Sugarcane', 'Groundnut'], soilType: 'Hirakud Canal Alluvium & Red Loam', mandiName: 'Bargarh RMC Yard' },
      { name: 'Ganjam', majorCrops: ['Paddy', 'Cashew', 'Groundnut', 'Kewda'], soilType: 'Coastal Alluvium & Red Soil', mandiName: 'Berhampur Regulated Market' }
    ]
  },
  {
    name: 'Kerala',
    region: 'South',
    districts: [
      { name: 'Wayanad', majorCrops: ['Black Pepper', 'Coffee', 'Cardamom', 'Tea'], soilType: 'Rich Forest Hill Loam', mandiName: 'Kalpetta Spices Market' },
      { name: 'Idukki', majorCrops: ['Cardamom', 'Tea', 'Pepper', 'Nutmeg'], soilType: 'Laterite & Hill Soils', mandiName: 'Vandanmedu Cardamom Auction' },
      { name: 'Palakkad', majorCrops: ['Paddy', 'Coconut', 'Vegetables', 'Mango'], soilType: 'Black & Red Mixed Loam', mandiName: 'Palakkad Agricultural Market' }
    ]
  },
  {
    name: 'Assam',
    region: 'NorthEast',
    districts: [
      { name: 'Nagaon', majorCrops: ['Jute', 'Rice (Paddy)', 'Mustard', 'Vegetables'], soilType: 'Brahmaputra Flood Plain Alluvium', mandiName: 'Nagaon Wholesale Market' },
      { name: 'Golaghat', majorCrops: ['Tea', 'Paddy', 'Sugarcane'], soilType: 'Acidic Alluvial Red Soil', mandiName: 'Golaghat Daily Market' }
    ]
  },
  {
    name: 'Himachal Pradesh',
    region: 'North',
    districts: [
      { name: 'Shimla', majorCrops: ['Apple (Royal Delicious)', 'Pear', 'Plum', 'Potato'], soilType: 'Mountain Brown Soil', mandiName: 'Dhali Subzi & Apple Mandi' },
      { name: 'Kullu', majorCrops: ['Apple', 'Pomegranate', 'Off-season Vegetables'], soilType: 'Himalayan Alluvial Loam', mandiName: 'Bhuntar APMC Mandi' }
    ]
  },
  {
    name: 'Jammu & Kashmir',
    region: 'North',
    districts: [
      { name: 'Srinagar / Pulwama', majorCrops: ['Saffron (Kesar)', 'Apple', 'Walnut', 'Almond'], soilType: 'Karewa Silt & Clay Loam', mandiName: 'Parimpora Fruit & Vegetable Mandi' },
      { name: 'Baramulla', majorCrops: ['Apple', 'Pear', 'Walnut'], soilType: 'Karewa Alluvium', mandiName: 'Sopore Apple Mandi (2nd in Asia)' }
    ]
  }
]

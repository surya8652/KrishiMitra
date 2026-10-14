import json
import os
import time
from datetime import datetime

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')

def load_json(filename):
    path = os.path.join(DATA_DIR, filename)
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

# Load static dictionaries
TRANSLATIONS = load_json('translations.json')
ALL_INDIA_STATES = load_json('locations.json')
MOCK_DATA = load_json('mock_data.json')
STUDENT_DATA = load_json('student_data.json')

SUPPORTED_LANGUAGES = MOCK_DATA['SUPPORTED_LANGUAGES']
DEFAULT_FARMER = MOCK_DATA['DEFAULT_FARMER']
ADMIN_USER = MOCK_DATA['ADMIN_USER']
DEFAULT_STUDENT = MOCK_DATA['DEFAULT_STUDENT']
CAREER_SECTORS = STUDENT_DATA['CAREER_SECTORS']
STUDY_NOTES = STUDENT_DATA['STUDY_NOTES']
YOUTUBE_LECTURES = STUDENT_DATA['YOUTUBE_LECTURES']
ADMIN_METRICS = MOCK_DATA['MOCK_ADMIN_METRICS']

# Mutable data stores with initial defaults
_disease_reports = list(MOCK_DATA['MOCK_DISEASE_REPORTS'])
_farm_advice_list = list(MOCK_DATA['MOCK_FARM_ADVICE_REPORTS'])
_marketplace_listings = list(MOCK_DATA['MOCK_MARKETPLACE'])
_notifications = list(MOCK_DATA['MOCK_NOTIFICATIONS'])
_crop_prices = list(MOCK_DATA['MOCK_CROP_PRICES'])
_irrigation_data = dict(MOCK_DATA['MOCK_IRRIGATION'])

def get_farmer_profile():
    return dict(DEFAULT_FARMER)

def get_admin_profile():
    return dict(ADMIN_USER)

def get_student_profile():
    return dict(DEFAULT_STUDENT)

def get_disease_reports():
    return _disease_reports

def add_disease_report(report):
    _disease_reports.insert(0, report)
    return report

def get_farm_advice_list():
    return _farm_advice_list

def add_farm_advice(advice):
    _farm_advice_list.insert(0, advice)
    return advice

def get_marketplace_listings():
    return _marketplace_listings

def add_marketplace_listing(item):
    _marketplace_listings.insert(0, item)
    return item

def get_notifications():
    return _notifications

def mark_notification_read(notif_id):
    for n in _notifications:
        if n.get('id') == notif_id:
            n['read'] = True
            break
    return _notifications

def mark_all_notifications_read():
    for n in _notifications:
        n['read'] = True
    return _notifications

def delete_notification(notif_id):
    global _notifications
    _notifications = [n for n in _notifications if n.get('id') != notif_id]
    return _notifications

def get_crop_prices():
    return _crop_prices

def get_irrigation_advice():
    return _irrigation_data

def log_watered_today(crop='Tomato', method='Drip Irrigation', amount='1,200 Litres'):
    global _irrigation_data
    today_str = datetime.now().strftime('%d %b %Y')
    new_log = {
        'id': f'irr_{int(time.time())}',
        'date': today_str,
        'crop': crop,
        'status': 'Completed',
        'waterAmount': amount,
        'method': method,
        'notes': 'Recorded via Kisan Logbook'
    }
    _irrigation_data['logs'].insert(0, new_log)
    _irrigation_data['lastIrrigated'] = f'{today_str}, {datetime.now().strftime("%I:%M %p")} ({method})'
    return _irrigation_data

def get_weather_for_location(district, state):
    is_northern = state in ['Punjab', 'Haryana', 'Uttar Pradesh', 'Rajasthan', 'Delhi', 'Uttarakhand']
    is_himalayan = state in ['Himachal Pradesh', 'Jammu & Kashmir']
    is_southern = state in ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Kerala']
    is_eastern = state in ['West Bengal', 'Bihar', 'Odisha', 'Jharkhand']
    is_northeast = state in ['Assam', 'Meghalaya', 'Tripura', 'Nagaland']
    is_central = state in ['Madhya Pradesh', 'Chhattisgarh']

    temp = 28
    condition = 'Partly Sunny with Pleasant Breeze'
    rain_prob = 25
    humidity = 68
    wind_speed = 12

    if is_himalayan:
        temp = 18
        condition = 'Cool Mountain Air & Clear Sky'
        rain_prob = 15
        humidity = 55
        wind_speed = 16
    elif is_northern:
        temp = 29
        condition = 'Clear Sunshine with Moderate Dry Winds'
        rain_prob = 20
        humidity = 52
        wind_speed = 14
    elif is_southern:
        temp = 31
        condition = 'Warm with Passing Tropical Clouds'
        rain_prob = 45
        humidity = 78
        wind_speed = 15
    elif is_eastern or is_northeast:
        temp = 29
        condition = 'Humid with Intermittent Light Showers'
        rain_prob = 65
        humidity = 84
        wind_speed = 10
    elif is_central:
        temp = 30
        condition = 'Bright Sunshine with Light High Clouds'
        rain_prob = 20
        humidity = 58
        wind_speed = 11
    else:
        temp = 28
        condition = 'Partly Cloudy with Evening Breeze'
        rain_prob = 35
        humidity = 70
        wind_speed = 13

    short_cond = condition.split('with')[0].strip()

    return {
        'location': f'{district}, {state}',
        'district': district,
        'state': state,
        'temperature': temp,
        'condition': condition,
        'rainProbability': rain_prob,
        'humidity': humidity,
        'windSpeed': wind_speed,
        'uvIndex': 'Moderate (5)',
        'todayFarmingAlert': {
            'title': f'Weather Advisory for {district} ({state})',
            'description': f'Regional agro-meteorological station reports {temp}°C with {humidity}% humidity across {district}. Conditions are {"favorable for moisture accumulation" if rain_prob > 50 else "suitable for routine farm scouting and field operations"}.',
            'recommendation': 'Hold off on scheduled chemical foliar spraying and inspect field drainage furrows.' if rain_prob > 50 else 'Normal irrigation schedule recommended. Inspect crop canopy for early pest presence.',
            'severity': 'warning' if rain_prob > 50 else 'info'
        },
        'forecast': [
            {'day': 'Today', 'date': 'Today', 'maxTemp': temp + 2, 'minTemp': temp - 7, 'condition': short_cond, 'rainProbability': rain_prob, 'advisory': 'Suitable for morning weeding and scouting.'},
            {'day': 'Tomorrow', 'date': 'Tomorrow', 'maxTemp': temp + 1, 'minTemp': temp - 8, 'condition': 'Light Showers' if rain_prob > 40 else 'Clear Sky', 'rainProbability': min(rain_prob + 15, 85), 'advisory': 'Postpone pesticide spraying.' if rain_prob > 40 else 'Good for fertilizer application.'},
            {'day': 'Mon', 'date': '+2 Days', 'maxTemp': temp, 'minTemp': temp - 7, 'condition': 'Partly Cloudy', 'rainProbability': max(rain_prob - 10, 15), 'advisory': 'Monitor for sucking pest activity.'},
            {'day': 'Tue', 'date': '+3 Days', 'maxTemp': temp + 2, 'minTemp': temp - 6, 'condition': 'Bright Sunshine', 'rainProbability': 15, 'advisory': 'Ideal sunshine for foliar nutrition.'},
            {'day': 'Wed', 'date': '+4 Days', 'maxTemp': temp + 3, 'minTemp': temp - 6, 'condition': 'Sunny', 'rainProbability': 10, 'advisory': 'Run standard drip irrigation cycle.'},
            {'day': 'Thu', 'date': '+5 Days', 'maxTemp': temp + 3, 'minTemp': temp - 5, 'condition': 'Dry Weather', 'rainProbability': 10, 'advisory': 'Favorable for harvest & mandi transport.'},
            {'day': 'Fri', 'date': '+6 Days', 'maxTemp': temp + 2, 'minTemp': temp - 6, 'condition': 'Pleasant Breeze', 'rainProbability': 20, 'advisory': 'Normal field operations across plot.'}
        ]
    }

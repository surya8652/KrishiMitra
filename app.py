import os
import sys
import json
import time
from datetime import datetime
from dotenv import load_dotenv
from flask import (
    Flask, render_template, request, redirect, url_for,
    session, flash, jsonify, g
)

# Load environment variables from .env
load_dotenv()

# Add project root to path so services can be imported
sys.path.insert(0, os.path.dirname(__file__))

from services.data_store import (
    TRANSLATIONS, ALL_INDIA_STATES, MOCK_DATA, STUDENT_DATA,
    SUPPORTED_LANGUAGES, DEFAULT_FARMER, ADMIN_USER, DEFAULT_STUDENT,
    CAREER_SECTORS, STUDY_NOTES, YOUTUBE_LECTURES, ADMIN_METRICS,
    get_farmer_profile, get_admin_profile, get_student_profile,
    get_disease_reports, add_disease_report,
    get_farm_advice_list, add_farm_advice,
    get_marketplace_listings, add_marketplace_listing,
    get_notifications, mark_notification_read, mark_all_notifications_read,
    delete_notification, get_crop_prices,
    get_irrigation_advice, log_watered_today,
    get_weather_for_location
)
from services.student_service import analyze_student_profile

app = Flask(__name__, static_folder='static', template_folder='templates')
app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'krishimitra-flask-secret-key-2024')

# ─── Supabase Auth (imported lazily to allow running without Supabase) ───
try:
    from services.supabase_auth import (
        sign_up_with_email, sign_in_with_email,
        get_google_oauth_url, exchange_code_for_session,
        sign_out as supabase_sign_out, get_user_from_token
    )
    SUPABASE_ENABLED = bool(os.environ.get('SUPABASE_URL'))
except Exception:
    SUPABASE_ENABLED = False

# ─── Context Processor: inject common data into all templates ───
@app.context_processor
def inject_globals():
    lang = session.get('language', 'en')
    role = session.get('role', 'guest')
    t = TRANSLATIONS.get(lang, TRANSLATIONS.get('en', {}))

    farmer = session.get('farmer', get_farmer_profile())
    weather = get_weather_for_location(
        farmer.get('district', 'Nashik'),
        farmer.get('state', 'Maharashtra')
    )
    notifications = get_notifications()
    unread_count = len([n for n in notifications if not n.get('read')])
    is_authenticated = role != 'guest'
    year = datetime.now().year
    supabase_user = session.get('supabase_user', None)

    return dict(
        t=t,
        lang=lang,
        role=role,
        farmer=farmer,
        weather=weather,
        notifications=notifications,
        unread_count=unread_count,
        is_authenticated=is_authenticated,
        supabase_user=supabase_user,
        supabase_enabled=SUPABASE_ENABLED,
        supported_languages=SUPPORTED_LANGUAGES,
        all_india_states=ALL_INDIA_STATES,
        year=year
    )

# ─── API: Language Switch ───
@app.route('/api/set-language', methods=['POST'])
def api_set_language():
    lang = request.form.get('language', 'en')
    session['language'] = lang
    return redirect(request.referrer or url_for('landing'))

# ─── API: Demo Login ───
@app.route('/api/demo-login/<role>')
def api_demo_login(role):
    if role == 'farmer':
        session['role'] = 'farmer'
        session['farmer'] = get_farmer_profile()
        flash(f"Logged in as Farmer: {DEFAULT_FARMER['name']}")
        return redirect(url_for('farmer_dashboard'))
    elif role == 'student':
        session['role'] = 'student'
        session['farmer'] = get_student_profile()
        flash(f"Logged in as Student: {DEFAULT_STUDENT['name']}")
        return redirect(url_for('student_career_analyzer'))
    elif role == 'admin':
        session['role'] = 'admin'
        session['farmer'] = get_admin_profile()
        flash(f"Logged in as Admin: {ADMIN_USER['name']}")
        return redirect(url_for('admin_dashboard'))
    return redirect(url_for('login'))

# ─── API: Login (form submit) ───
@app.route('/api/login', methods=['POST'])
def api_login():
    selected_role = request.form.get('role', 'farmer')
    identifier = request.form.get('identifier', '')
    password = request.form.get('password', '')

    # Try Supabase email/password auth first
    if SUPABASE_ENABLED and '@' in identifier:
        user_data, error = sign_in_with_email(identifier, password)
        if user_data:
            _setup_supabase_session(user_data, selected_role)
            name = user_data.get('metadata', {}).get('name', identifier.split('@')[0])
            flash(f"Welcome back, {name}! Signed in via Supabase.")
            return redirect(_get_role_dashboard(selected_role))
        else:
            flash(f'Supabase auth error: {error}')
            return redirect(url_for('login'))

    # Demo auth fallback - accept known demo credentials
    if selected_role == 'farmer':
        session['role'] = 'farmer'
        session['farmer'] = get_farmer_profile()
        flash(f"Welcome, {DEFAULT_FARMER['name']}! Signed in as farmer.")
        return redirect(url_for('farmer_dashboard'))
    elif selected_role == 'student':
        session['role'] = 'student'
        session['farmer'] = get_student_profile()
        flash(f"Welcome, {DEFAULT_STUDENT['name']}! Signed in as student.")
        return redirect(url_for('student_career_analyzer'))
    elif selected_role == 'admin':
        session['role'] = 'admin'
        session['farmer'] = get_admin_profile()
        flash(f"Welcome, {ADMIN_USER['name']}! Signed in as admin.")
        return redirect(url_for('admin_dashboard'))

    flash('Authentication failed. Please verify credentials.')
    return redirect(url_for('login'))

# ─── API: Register (form submit) ───
@app.route('/api/register', methods=['POST'])
def api_register():
    selected_role = request.form.get('role', 'farmer')
    name = request.form.get('name', 'New User')
    email = request.form.get('email', '')
    password = request.form.get('password', '')
    phone = request.form.get('phone', '')
    state = request.form.get('state', 'Maharashtra')
    district = request.form.get('district', 'Nashik')

    # Try Supabase registration if email + password provided
    if SUPABASE_ENABLED and email and password:
        metadata = {
            'name': name,
            'role': selected_role,
            'phone': phone,
            'state': state,
            'district': district,
        }
        user_data, error = sign_up_with_email(email, password, metadata)
        if user_data:
            _setup_supabase_session(user_data, selected_role, name=name)
            flash(f"Welcome to KrishiMitra, {name}! Account created successfully.")
            return redirect(_get_role_dashboard(selected_role))
        else:
            flash(f'Registration error: {error}')
            return redirect(url_for('register'))

    # Demo fallback registration
    if selected_role == 'farmer':
        profile = get_farmer_profile()
        profile['name'] = name
        session['role'] = 'farmer'
        session['farmer'] = profile
        flash(f"Welcome to KrishiMitra, {name}! Farmer account created.")
        return redirect(url_for('farmer_dashboard'))
    else:
        profile = get_student_profile()
        profile['name'] = name
        session['role'] = 'student'
        session['farmer'] = profile
        flash(f"Welcome to KrishiMitra, {name}! Student account created.")
        return redirect(url_for('student_career_analyzer'))

# ─── API: Logout ───
@app.route('/api/logout')
def api_logout():
    # Sign out from Supabase if we have a token
    if SUPABASE_ENABLED and session.get('access_token'):
        try:
            supabase_sign_out(session.get('access_token'))
        except Exception:
            pass
    session.clear()
    flash('Logged out successfully. You are now in Guest Mode.')
    return redirect(url_for('landing'))


# ════════════════════════════════════════════════════════════════════
#  GOOGLE OAUTH ROUTES (Supabase)
# ════════════════════════════════════════════════════════════════════

@app.route('/auth/google')
def auth_google():
    """Initiate Google OAuth sign-in via Supabase."""
    if not SUPABASE_ENABLED:
        flash('Supabase is not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY.')
        return redirect(url_for('login'))

    # Store the intended role for after callback
    role = request.args.get('role', 'farmer')
    session['pending_oauth_role'] = role

    # Build the callback URL
    callback_url = url_for('auth_callback', _external=True)
    oauth_url, error = get_google_oauth_url(callback_url)

    if error:
        flash(f'Google sign-in error: {error}')
        return redirect(url_for('login'))

    return redirect(oauth_url)


@app.route('/auth/callback')
def auth_callback():
    """Handle the OAuth callback from Supabase/Google."""
    code = request.args.get('code')
    error_param = request.args.get('error')
    error_desc = request.args.get('error_description', 'Authentication cancelled.')

    if error_param:
        flash(f'Google sign-in was cancelled: {error_desc}')
        return redirect(url_for('login'))

    if not code:
        flash('No authorization code received. Please try again.')
        return redirect(url_for('login'))

    user_data, error = exchange_code_for_session(code)
    if error:
        flash(f'Sign-in failed: {error}')
        return redirect(url_for('login'))

    # Get the role the user selected before OAuth
    selected_role = session.pop('pending_oauth_role', 'farmer')
    name = user_data.get('name', '') or user_data.get('email', '').split('@')[0]

    _setup_supabase_session(user_data, selected_role, name=name)
    flash(f"Welcome, {name}! Signed in with Google.")
    return redirect(_get_role_dashboard(selected_role))


# ─── Helper: Set up Flask session from Supabase user ───
def _setup_supabase_session(user_data, role, name=None):
    """Populate Flask session with Supabase user info."""
    if not name:
        name = user_data.get('name', '') or \
               user_data.get('metadata', {}).get('name', '') or \
               user_data.get('email', '').split('@')[0]

    session['role'] = role
    session['access_token'] = user_data.get('access_token')
    session['refresh_token'] = user_data.get('refresh_token')
    session['supabase_user'] = {
        'id': user_data.get('id'),
        'email': user_data.get('email'),
        'name': name,
        'avatar': user_data.get('avatar', ''),
    }

    # Set up the appropriate profile
    if role == 'farmer':
        profile = get_farmer_profile()
        profile['name'] = name
        if user_data.get('metadata', {}).get('phone'):
            profile['phone'] = user_data['metadata']['phone']
        if user_data.get('metadata', {}).get('state'):
            profile['state'] = user_data['metadata']['state']
        if user_data.get('metadata', {}).get('district'):
            profile['district'] = user_data['metadata']['district']
        session['farmer'] = profile
    elif role == 'student':
        profile = get_student_profile()
        profile['name'] = name
        session['farmer'] = profile
    elif role == 'admin':
        profile = get_admin_profile()
        profile['name'] = name
        session['farmer'] = profile


def _get_role_dashboard(role):
    """Return the URL for the given role's dashboard."""
    if role == 'farmer':
        return url_for('farmer_dashboard')
    elif role == 'student':
        return url_for('student_career_analyzer')
    elif role == 'admin':
        return url_for('admin_dashboard')
    return url_for('landing')

# ─── API: Change Location ───
@app.route('/api/change-location', methods=['POST'])
def api_change_location():
    district = request.form.get('district', 'Nashik')
    state = request.form.get('state', 'Maharashtra')
    set_home = request.form.get('set_home') == 'true'

    if set_home:
        farmer = session.get('farmer', get_farmer_profile())
        farmer['district'] = district
        farmer['state'] = state
        session['farmer'] = farmer
        flash(f"Location set to {district}, {state}")
    else:
        flash(f"Showing weather & alerts for {district}, {state}")

    session['view_district'] = district
    session['view_state'] = state
    return redirect(request.referrer or url_for('farmer_dashboard'))

# ─── API: Update Farmer Profile ───
@app.route('/api/farmer/profile', methods=['POST'])
def api_update_profile():
    farmer = session.get('farmer', get_farmer_profile())
    farmer['name'] = request.form.get('name', farmer.get('name'))
    farmer['phone'] = request.form.get('phone', farmer.get('phone'))
    farmer['village'] = request.form.get('village', farmer.get('village'))
    farmer['state'] = request.form.get('state', farmer.get('state'))
    farmer['district'] = request.form.get('district', farmer.get('district'))
    try:
        farmer['landSize'] = float(request.form.get('landSize', farmer.get('landSize', 2)))
    except ValueError:
        pass
    farmer['soilType'] = request.form.get('soilType', farmer.get('soilType'))
    main_crop = request.form.get('mainCrop')
    if main_crop:
        farmer['mainCrops'] = [main_crop]
    session['farmer'] = farmer
    flash('Farmer profile updated successfully!')
    return redirect(url_for('farmer_profile'))

# ─── API: Record Watering ───
@app.route('/api/record-watering', methods=['POST'])
def api_record_watering():
    crop = request.form.get('crop', 'Tomato')
    method = request.form.get('method', 'Drip Irrigation')
    amount = request.form.get('amount', '1,200 Litres')
    log_watered_today(crop, method, amount)
    flash('Watering recorded in your farm logbook')
    return redirect(request.referrer or url_for('farmer_irrigation'))

# ─── API: Notification actions ───
@app.route('/api/notification/read/<notif_id>')
def api_mark_read(notif_id):
    mark_notification_read(notif_id)
    return redirect(request.referrer or url_for('farmer_notifications'))

@app.route('/api/notification/read-all')
def api_mark_all_read():
    mark_all_notifications_read()
    flash('All notifications marked as read')
    return redirect(request.referrer or url_for('farmer_notifications'))

@app.route('/api/notification/delete/<notif_id>')
def api_delete_notification(notif_id):
    delete_notification(notif_id)
    return redirect(request.referrer or url_for('farmer_notifications'))

# ─── API: Student Career Analysis ───
@app.route('/api/student/analyze', methods=['POST'])
def api_student_analyze():
    marks = {
        'math': request.form.get('math', '0'),
        'physics': request.form.get('physics', '0'),
        'chemistry': request.form.get('chemistry', '0'),
        'biology': request.form.get('biology', '0'),
        'computerScience': request.form.get('computerScience', '0'),
        'drawingAesthetics': request.form.get('drawingAesthetics', '0'),
        'englishLang': request.form.get('englishLang', '0'),
        'socialOrCommerce': request.form.get('socialOrCommerce', '0')
    }
    interests = request.form.getlist('interests')
    desired_sector = request.form.get('desiredSector', '')

    result = analyze_student_profile(marks, interests, desired_sector)
    session['analysis_result'] = result
    flash('Career analysis complete!')
    return redirect(url_for('student_career_analyzer'))

# ─── API: Marketplace listing ───
@app.route('/api/marketplace/add', methods=['POST'])
def api_add_listing():
    listing = {
        'id': f'mp_{int(time.time())}',
        'cropName': request.form.get('cropName', ''),
        'quantity': request.form.get('quantity', ''),
        'pricePerUnit': request.form.get('pricePerUnit', ''),
        'unit': request.form.get('unit', 'kg'),
        'location': request.form.get('location', ''),
        'sellerName': session.get('farmer', {}).get('name', 'Farmer'),
        'sellerPhone': session.get('farmer', {}).get('phone', ''),
        'datePosted': datetime.now().strftime('%d %b %Y'),
        'status': 'active',
        'description': request.form.get('description', '')
    }
    add_marketplace_listing(listing)
    flash('Harvest listing published to the Marketplace')
    return redirect(url_for('farmer_marketplace'))


# ════════════════════════════════════════════════════════════════════
#  PUBLIC ROUTES
# ════════════════════════════════════════════════════════════════════

@app.route('/')
def landing():
    return render_template('public/landing.html')

@app.route('/about')
def about():
    return render_template('public/about.html')

@app.route('/login')
def login():
    role_param = request.args.get('role', 'farmer')
    redirect_param = request.args.get('redirect', '')
    if redirect_param.startswith('/admin'):
        role_param = 'admin'
    elif redirect_param.startswith('/students'):
        role_param = 'student'
    return render_template('public/login.html', initial_role=role_param)

@app.route('/register')
def register():
    return render_template('public/register.html')


# ════════════════════════════════════════════════════════════════════
#  FARMER ROUTES (protected)
# ════════════════════════════════════════════════════════════════════

def require_auth(allowed_roles=None):
    """Check auth. If not authenticated, redirect to login."""
    role = session.get('role', 'guest')
    if role == 'guest':
        flash('Please sign in to access this page.')
        return redirect(url_for('login'))
    if allowed_roles and role not in allowed_roles:
        flash('You do not have permission to access this page.')
        return redirect(url_for('login'))
    return None

@app.route('/farmer')
def farmer_dashboard():
    check = require_auth(['farmer', 'admin'])
    if check:
        return check
    farmer = session.get('farmer', get_farmer_profile())
    district = session.get('view_district', farmer.get('district', 'Nashik'))
    state = session.get('view_state', farmer.get('state', 'Maharashtra'))
    weather = get_weather_for_location(district, state)
    return render_template('farmer/dashboard.html',
        farmer=farmer,
        weather=weather,
        irrigation=get_irrigation_advice(),
        disease_reports=get_disease_reports(),
        farm_advice=get_farm_advice_list(),
        prices=get_crop_prices()
    )

@app.route('/farmer/smart-farming')
def farmer_smart_farming():
    check = require_auth(['farmer', 'admin'])
    if check:
        return check
    return render_template('farmer/smart_farming.html',
        farm_advice=get_farm_advice_list()
    )

@app.route('/farmer/disease')
def farmer_disease():
    check = require_auth(['farmer', 'admin'])
    if check:
        return check
    return render_template('farmer/disease.html',
        disease_reports=get_disease_reports()
    )

@app.route('/farmer/weather')
def farmer_weather():
    check = require_auth(['farmer', 'admin'])
    if check:
        return check
    farmer = session.get('farmer', get_farmer_profile())
    district = session.get('view_district', farmer.get('district', 'Nashik'))
    state = session.get('view_state', farmer.get('state', 'Maharashtra'))
    weather = get_weather_for_location(district, state)
    return render_template('farmer/weather.html', weather=weather)

@app.route('/farmer/irrigation')
def farmer_irrigation():
    check = require_auth(['farmer', 'admin'])
    if check:
        return check
    return render_template('farmer/irrigation.html',
        irrigation=get_irrigation_advice()
    )

@app.route('/farmer/prices')
def farmer_prices():
    check = require_auth(['farmer', 'admin'])
    if check:
        return check
    return render_template('farmer/prices.html',
        prices=get_crop_prices()
    )

@app.route('/farmer/marketplace')
def farmer_marketplace():
    check = require_auth(['farmer', 'admin'])
    if check:
        return check
    return render_template('farmer/marketplace.html',
        listings=get_marketplace_listings()
    )

@app.route('/farmer/reports')
def farmer_reports():
    check = require_auth(['farmer', 'admin'])
    if check:
        return check
    return render_template('farmer/reports.html',
        disease_reports=get_disease_reports(),
        farm_advice=get_farm_advice_list(),
        irrigation=get_irrigation_advice()
    )

@app.route('/farmer/profile')
def farmer_profile():
    check = require_auth(['farmer', 'admin'])
    if check:
        return check
    return render_template('farmer/profile.html')

@app.route('/farmer/notifications')
def farmer_notifications():
    check = require_auth(['farmer', 'admin'])
    if check:
        return check
    return render_template('farmer/notifications.html',
        notifications=get_notifications()
    )


# ════════════════════════════════════════════════════════════════════
#  STUDENT ROUTES (protected)
# ════════════════════════════════════════════════════════════════════

@app.route('/students')
@app.route('/students/analyzer')
def student_career_analyzer():
    check = require_auth(['student', 'admin', 'farmer'])
    if check:
        return check
    result = session.pop('analysis_result', None)
    return render_template('student/career_analyzer.html',
        career_sectors=CAREER_SECTORS,
        analysis_result=result
    )

@app.route('/students/study-material')
def student_study_material():
    check = require_auth(['student', 'admin', 'farmer'])
    if check:
        return check
    return render_template('student/study_material.html',
        study_notes=STUDY_NOTES
    )

@app.route('/students/youtube')
def student_youtube():
    check = require_auth(['student', 'admin', 'farmer'])
    if check:
        return check
    return render_template('student/youtube.html',
        lectures=YOUTUBE_LECTURES
    )

@app.route('/students/sectors')
def student_sectors():
    check = require_auth(['student', 'admin', 'farmer'])
    if check:
        return check
    return render_template('student/sectors.html',
        career_sectors=CAREER_SECTORS
    )


# ════════════════════════════════════════════════════════════════════
#  ADMIN ROUTES (protected)
# ════════════════════════════════════════════════════════════════════

@app.route('/admin')
def admin_dashboard():
    check = require_auth(['admin'])
    if check:
        return check
    return render_template('admin/dashboard.html',
        metrics=ADMIN_METRICS,
        disease_reports=get_disease_reports(),
        marketplace=get_marketplace_listings(),
        prices=get_crop_prices()
    )

@app.route('/admin/reports/users')
def admin_reports_users():
    check = require_auth(['admin'])
    if check:
        return check
    return render_template('admin/reports/users.html', metrics=ADMIN_METRICS)

@app.route('/admin/reports/crops')
def admin_reports_crops():
    check = require_auth(['admin'])
    if check:
        return check
    return render_template('admin/reports/crops.html', metrics=ADMIN_METRICS)

@app.route('/admin/reports/disease')
def admin_reports_disease():
    check = require_auth(['admin'])
    if check:
        return check
    return render_template('admin/reports/disease.html',
        metrics=ADMIN_METRICS, disease_reports=get_disease_reports())

@app.route('/admin/reports/weather')
def admin_reports_weather():
    check = require_auth(['admin'])
    if check:
        return check
    return render_template('admin/reports/weather.html', metrics=ADMIN_METRICS)

@app.route('/admin/reports/irrigation')
def admin_reports_irrigation():
    check = require_auth(['admin'])
    if check:
        return check
    return render_template('admin/reports/irrigation.html', metrics=ADMIN_METRICS)

@app.route('/admin/reports/market')
def admin_reports_market():
    check = require_auth(['admin'])
    if check:
        return check
    return render_template('admin/reports/market.html',
        metrics=ADMIN_METRICS, prices=get_crop_prices())

@app.route('/admin/reports/marketplace')
def admin_reports_marketplace():
    check = require_auth(['admin'])
    if check:
        return check
    return render_template('admin/reports/marketplace.html',
        metrics=ADMIN_METRICS, listings=get_marketplace_listings())

@app.route('/admin/reports/system')
def admin_reports_system():
    check = require_auth(['admin'])
    if check:
        return check
    return render_template('admin/reports/system.html', metrics=ADMIN_METRICS)


# ─── Catch-all fallback ───
@app.errorhandler(404)
def page_not_found(e):
    return redirect(url_for('landing'))


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

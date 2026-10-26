"""
KrishiMitra AI — Supabase Authentication Service
Server-side Google OAuth + Email/Password auth via Supabase Python SDK.
"""

import os
from supabase import create_client, Client

# ─── Supabase Client Initialization ───
SUPABASE_URL = os.environ.get('SUPABASE_URL', '')
SUPABASE_KEY = os.environ.get('SUPABASE_ANON_KEY', '')

_supabase_client: Client = None


def get_supabase() -> Client:
    """Lazily initialize and return the Supabase client."""
    global _supabase_client
    if _supabase_client is None:
        if not SUPABASE_URL or not SUPABASE_KEY:
            raise RuntimeError(
                "Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables. "
                "Please set them in your .env file."
            )
        _supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
    return _supabase_client


# ════════════════════════════════════════════════════════════════════
#  EMAIL / PASSWORD AUTH
# ════════════════════════════════════════════════════════════════════

def sign_up_with_email(email: str, password: str, metadata: dict = None):
    """Register a new user with email + password.
    metadata can include: name, role, phone, state, district, etc.
    Returns (user_data, error).
    """
    sb = get_supabase()
    try:
        options = {}
        if metadata:
            options['data'] = metadata
        response = sb.auth.sign_up({
            'email': email,
            'password': password,
            'options': options
        })
        if response.user:
            return {
                'id': response.user.id,
                'email': response.user.email,
                'metadata': response.user.user_metadata,
                'access_token': response.session.access_token if response.session else None,
                'refresh_token': response.session.refresh_token if response.session else None,
            }, None
        return None, 'Sign-up failed. Please try again.'
    except Exception as e:
        return None, str(e)


def sign_in_with_email(email: str, password: str):
    """Sign in an existing user with email + password.
    Returns (user_data, error).
    """
    sb = get_supabase()
    try:
        response = sb.auth.sign_in_with_password({
            'email': email,
            'password': password
        })
        if response.user:
            return {
                'id': response.user.id,
                'email': response.user.email,
                'metadata': response.user.user_metadata,
                'access_token': response.session.access_token if response.session else None,
                'refresh_token': response.session.refresh_token if response.session else None,
            }, None
        return None, 'Invalid email or password.'
    except Exception as e:
        return None, str(e)


# ════════════════════════════════════════════════════════════════════
#  GOOGLE OAUTH (Server-Side)
# ════════════════════════════════════════════════════════════════════

def get_google_oauth_url(redirect_to: str):
    """Get the Google OAuth URL for server-side redirect.
    redirect_to: The URL to redirect back to after Google auth.
    Returns (url, error).
    """
    sb = get_supabase()
    try:
        response = sb.auth.sign_in_with_oauth({
            'provider': 'google',
            'options': {
                'redirect_to': redirect_to
            }
        })
        if response and response.url:
            return response.url, None
        return None, 'Failed to generate Google OAuth URL.'
    except Exception as e:
        return None, str(e)


def exchange_code_for_session(code: str):
    """Exchange the OAuth authorization code for a session.
    Called when Google redirects back with ?code=...
    Returns (user_data, error).
    """
    sb = get_supabase()
    try:
        response = sb.auth.exchange_code_for_session({'auth_code': code})
        if response and response.user:
            return {
                'id': response.user.id,
                'email': response.user.email,
                'name': response.user.user_metadata.get('full_name', '') or
                        response.user.user_metadata.get('name', ''),
                'avatar': response.user.user_metadata.get('avatar_url', ''),
                'metadata': response.user.user_metadata,
                'access_token': response.session.access_token if response.session else None,
                'refresh_token': response.session.refresh_token if response.session else None,
            }, None
        return None, 'Failed to exchange code for session.'
    except Exception as e:
        return None, str(e)


# ════════════════════════════════════════════════════════════════════
#  SESSION MANAGEMENT
# ════════════════════════════════════════════════════════════════════

def get_user_from_token(access_token: str):
    """Verify and get user from an access token.
    Returns (user_data, error).
    """
    sb = get_supabase()
    try:
        response = sb.auth.get_user(access_token)
        if response and response.user:
            return {
                'id': response.user.id,
                'email': response.user.email,
                'name': response.user.user_metadata.get('full_name', '') or
                        response.user.user_metadata.get('name', ''),
                'avatar': response.user.user_metadata.get('avatar_url', ''),
                'metadata': response.user.user_metadata,
            }, None
        return None, 'Invalid or expired token.'
    except Exception as e:
        return None, str(e)


def sign_out(access_token: str = None):
    """Sign out the current user.
    Returns (success, error).
    """
    sb = get_supabase()
    try:
        sb.auth.sign_out()
        return True, None
    except Exception as e:
        return False, str(e)


def refresh_session(refresh_token: str):
    """Refresh an expired session using the refresh token.
    Returns (new_session_data, error).
    """
    sb = get_supabase()
    try:
        response = sb.auth.refresh_session(refresh_token)
        if response and response.session:
            return {
                'access_token': response.session.access_token,
                'refresh_token': response.session.refresh_token,
                'user': {
                    'id': response.user.id,
                    'email': response.user.email,
                    'metadata': response.user.user_metadata,
                }
            }, None
        return None, 'Failed to refresh session.'
    except Exception as e:
        return None, str(e)

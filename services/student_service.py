from services.data_store import CAREER_SECTORS

def analyze_student_profile(marks, interests, desired_sector=''):
    math = float(marks.get('math') or 0)
    physics = float(marks.get('physics') or 0)
    chemistry = float(marks.get('chemistry') or 0)
    biology = float(marks.get('biology') or 0)
    cs = float(marks.get('computerScience') or 0)
    drawing = float(marks.get('drawingAesthetics') or 0)
    english = float(marks.get('englishLang') or 0)
    social = float(marks.get('socialOrCommerce') or 0)

    non_math_avg = (physics + chemistry + biology + english + social) / 5.0
    math_divergence = math - non_math_avg
    is_math_significantly_higher = math >= 75 and ((math - min(chemistry, biology)) >= 20 or (math - non_math_avg) >= 15)

    interest_lower = [str(i).lower() for i in interests]

    scored_sectors = []
    for sector in CAREER_SECTORS:
        score = 50.0  # Base score

        # Math alignment
        math_delta = abs(math - (sector.get('mathImportance', 5) * 10))
        score += max(0, 30.0 - math_delta * 0.5)

        sid = sector.get('id')
        if sid == 'architecture':
            if math >= 75:
                score += 20
            if drawing >= 60:
                score += 20
            if biology < 60:
                score += 10
            if any(k in item for item in interest_lower for k in ['building', 'design', 'structure', 'draw', 'model']):
                score += 25
        elif sid == 'computer-engineering':
            if math >= 75:
                score += 25
            if cs >= 70:
                score += 20
            if biology < 60:
                score += 10
            if any(k in item for item in interest_lower for k in ['code', 'software', 'algorithm', 'logic', 'ai', 'tech']):
                score += 25
        elif sid == 'civil-structural':
            if math >= 70 and physics >= 65:
                score += 22
            if drawing >= 60:
                score += 12
            if biology < 60:
                score += 8
            if any(k in item for item in interest_lower for k in ['structure', 'bridge', 'site', 'building']):
                score += 22
        elif sid == 'mechanical-robotics':
            if math >= 70 and physics >= 70:
                score += 25
            if biology < 60:
                score += 8
            if any(k in item for item in interest_lower for k in ['machine', 'robot', 'car', 'motion']):
                score += 24
        elif sid == 'data-science-finance':
            if math >= 85:
                score += 30
            if cs >= 65:
                score += 15
            if biology < 60:
                score += 10
            if any(k in item for item in interest_lower for k in ['math', 'puzzle', 'finance', 'stat']):
                score += 25
        elif sid == 'medical-biotech':
            if biology >= 80 and chemistry >= 75:
                score += 35
            if math > 80 and biology < 50:
                score -= 30
            if any(k in item for item in interest_lower for k in ['doctor', 'health', 'human', 'biology']):
                score += 30

        if desired_sector and sid == desired_sector:
            score += 15

        match_percentage = min(99, max(45, round(score * 0.65)))

        reasons = []
        if sid == 'architecture':
            reasons.append(f"High analytical Mathematics ({int(math)}%) matches geometric & spatial modeling requirements.")
            if drawing >= 65:
                reasons.append(f"Strong visual aptitude ({int(drawing)}%) makes you a natural fit for architectural drafting.")
            if biology <= 60:
                reasons.append("Requires zero biological memorization, playing directly to your logical and spatial strengths.")
        elif sid == 'computer-engineering':
            reasons.append(f"Strong Mathematical aptitude ({int(math)}%) is the core prerequisite for algorithms & computation.")
            reasons.append("Focuses purely on algorithmic problem-solving rather than rote fact memorization.")
            if cs >= 60:
                reasons.append(f"Demonstrated interest in computing ({int(cs)}% score) provides an early head start.")
        elif sid == 'civil-structural':
            reasons.append(f"Combines your Mathematics ({int(math)}%) with physical mechanics and tangible infrastructure.")
            reasons.append("Minimal dependence on non-math subjects like chemistry or biology.")
        elif sid == 'data-science-finance':
            reasons.append(f"Capitalizes on your top Math capability ({int(math)}%) in probability, matrix algebra & predictive data.")
            reasons.append("One of the highest-paying domains worldwide for pure mathematical minds.")
        else:
            reasons.append("Matches your interest profile and analytical score distribution.")

        academic_fit = f"Evaluated based on your score in Mathematics ({int(math)}%), Physics ({int(physics)}%), and interest selections."
        if is_math_significantly_higher and sid != 'medical-biotech':
            academic_fit += " Since your math performance outperforms other subjects, this sector provides maximum leverage with zero friction from low biology/chemistry requirements."

        divergence = None
        if is_math_significantly_higher:
            divergence = f"Detected Math Dominance: Your Math score ({int(math)}%) is significantly higher than other subjects (average: {round(non_math_avg)}%). We prioritized sectors like {sector.get('title')} where pure mathematical logic rules!"

        scored_sectors.append({
            'sector': sector,
            'matchPercentage': match_percentage,
            'reasons': reasons,
            'academicFitNotes': academic_fit,
            'divergenceHighlight': divergence
        })

    scored_sectors.sort(key=lambda x: x['matchPercentage'], reverse=True)

    primary_highlight = "Balanced Academic Profile: We evaluated your aptitude across all technical sectors."
    if is_math_significantly_higher:
        primary_highlight = f"🎯 Special Analysis: We noticed you are exceptionally strong in Mathematics ({int(math)}%), while scoring lower in other subjects (like Biology {int(biology)}% or Chemistry {int(chemistry)}%). We prioritized sectors like Architecture, Computer Science, and Data Science where advanced mathematics and spatial logic are prized and biological rote memorization is never required!"

    return {
        'recommendations': scored_sectors,
        'primaryHighlight': primary_highlight,
        'isMathSignificantlyHigher': is_math_significantly_higher,
        'mathAvgDivergence': round(math_divergence)
    }

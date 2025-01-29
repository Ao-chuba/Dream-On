from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required
import json
import logging
import os
import google.generativeai as genai

logger = logging.getLogger(__name__)
genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))
@login_required
@csrf_protect
def interpret_dream(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Invalid method'}, status=400)

    try:
        body = json.loads(request.body)
        dream_text = body.get('dream')

        if not dream_text:
            return JsonResponse({'error': 'Dream text required'}, status=400)

        # Check for explicit content
        explicit_keywords = ['sex', 'fuck', 'porn', 'xxx', 'freaky', 'naked']
        if any(keyword in dream_text.lower() for keyword in explicit_keywords):
            return JsonResponse({
                'error': "Ahh hell naww! I ain't trained to interpret yo freaky dream 😏🥴. Better ask one of ya homies about this one.😭😭🙏🙏"
            }, status=400)

        prompt = f"""
Dream: {dream_text}

Please create a detailed and meaningful interpretation of this dream in the following format:

😀. Title: [Dream Title] make it poetic.

🤓. Psychological Interpretation:
[Detailed psychological analysis]

🤭. Emotional Themes:
* [Emotion 1]
* [Emotion 2]
* [Additional emotions as needed]

🫣. Universal Archetypes:
* [Archetype 1]: [Brief explanation]
* [Archetype 2]: [Brief explanation]
* [Additional archetypes as needed]

Please ensure each section starts with its emoji and maintain the bullet point format for emotional themes and archetypes.
"""

        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)

        # Check if response exists and has content
        if not response or not response.text or response.text.strip() == '':
            return JsonResponse({
                'error': "Sorry, I couldn't generate an interpretation. Please try rephrasing your dream."
            }, status=400)

        # Process the response
        text = response.text.strip()
        
        # Extract title and content
        sections = text.split('\n\n')
        
        # Find title section (starts with 😀)
        title = "Dream Interpretation"  # default title
        interpretation_parts = []
        
        for section in sections:
            if section.strip().startswith('😀'):
                # Extract title after the emoji and "Title:"
                title_parts = section.split(':', 1)
                if len(title_parts) > 1:
                    title = title_parts[1].strip()
            else:
                interpretation_parts.append(section.strip())
        
        # Join the interpretation parts back together
        interpretation = '\n\n'.join(interpretation_parts)

        return JsonResponse({
            'title': title,
            'interpretation': interpretation
        })

    except Exception as e:
        logger.error(f"Error interpreting dream: {str(e)}")
        return JsonResponse({
            'error': "An error occurred while interpreting your dream. Please try rephrasing."
        }, status=500)
    
@login_required
def donate_view(request):
    return render(request,'donate.html')
from django.shortcuts import render

import os
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle
from rest_framework import status
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

class MessagePPostThrottle(UserRateThrottle):
    rate = '5/minute'


# Create your views here.
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

@api_view(['GET', 'POST'])
def test_supabase(request):
    if request.method == 'GET':
        res = supabase.table('boards').select('*').execute()
        return Response(res.data, status=200)
    
    if request.method == 'POST':
        res = supabase.table('messages').insert(request.data).execute()
        return Response(res.data, status=201)

@api_view(['GET', 'POST'])
@throttle_classes([MessagePPostThrottle]) # Throttle applies to the whole view
def handle_board_messages(request, board_id):
    
    # --- GET LOGIC ---
    if request.method == 'GET':
        try:
            num_messages = int(request.query_params.get('numMessages', 10))
            offset = int(request.query_params.get('offset', 0))
        except ValueError:
            return Response({"error": "numMessages and offset must be integers"}, status=400)
        
        start = offset
        end = offset + min(num_messages, 100) - 1
        
        res = supabase.table('messages') \
            .select('*') \
            .eq('board_id', board_id) \
            .order('created_at', desc=True) \
            .range(start, end) \
            .execute()
        
        return Response(res.data, status=200)

    # --- POST LOGIC ---
    if request.method == 'POST':
        try:
            message_content = request.data.get('content')
            if not message_content:
                return Response({"error": "Message content is missing"}, status=400)
            
            # Simple Size Check (413)
            if len(str(message_content)) > 10000: # 10KB limit
                return Response({"error": "Message too large"}, status=413)
            
            # Check if Board Exists (404)
            board_check = supabase.table('boards').select('id').eq('id', board_id).execute()
            if not board_check.data:
                return Response({"error": "Board not found"}, status=404)
            
            payload = {
                "board_id": board_id, # Integer or UUID based on your table
                "content": message_content,
            }
            
            res = supabase.table('messages').insert(payload).execute()
            return Response(res.data, status=201)

        except Exception as e:
            return Response({"error": str(e)}, status=500)
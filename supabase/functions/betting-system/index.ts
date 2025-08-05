import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface BettingEvent {
  id: string;
  sport: string;
  league: string;
  teams: string[];
  start_time: string;
  odds: Array<{
    market: string;
    outcomes: Record<string, number>;
  }>;
  status: 'upcoming' | 'live' | 'finished';
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const url = new URL(req.url);
    const action = url.searchParams.get('action');

    switch (action) {
      case 'get_events': {
        // Simulate real sports events with dynamic odds
        const events: BettingEvent[] = [
          {
            id: '1',
            sport: 'Fútbol',
            league: 'Liga Española',
            teams: ['Barcelona', 'Real Madrid'],
            start_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
            odds: [
              {
                market: 'Resultado final',
                outcomes: {
                  'Barcelona': 2.1 + Math.random() * 0.2 - 0.1,
                  'Empate': 3.5 + Math.random() * 0.3 - 0.15,
                  'Real Madrid': 2.8 + Math.random() * 0.2 - 0.1
                }
              }
            ],
            status: 'upcoming'
          },
          {
            id: '2',
            sport: 'Baloncesto',
            league: 'NBA',
            teams: ['Lakers', 'Warriors'],
            start_time: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
            odds: [
              {
                market: 'Resultado final',
                outcomes: {
                  'Lakers': 1.9 + Math.random() * 0.1 - 0.05,
                  'Warriors': 2.0 + Math.random() * 0.1 - 0.05
                }
              }
            ],
            status: 'upcoming'
          },
          {
            id: '3',
            sport: 'Tenis',
            league: 'ATP',
            teams: ['Nadal', 'Djokovic'],
            start_time: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
            odds: [
              {
                market: 'Ganador del partido',
                outcomes: {
                  'Nadal': 2.0 + Math.random() * 0.2 - 0.1,
                  'Djokovic': 1.7 + Math.random() * 0.2 - 0.1
                }
              }
            ],
            status: 'upcoming'
          }
        ];

        return new Response(
          JSON.stringify({ events }),
          { 
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json' 
            } 
          }
        );
      }

      case 'place_bet': {
        const { eventId, market, outcome, amount, userId } = await req.json();
        
        // Validate bet
        if (!eventId || !market || !outcome || !amount || !userId) {
          return new Response(
            JSON.stringify({ error: 'Missing required fields' }),
            { 
              status: 400,
              headers: { 
                ...corsHeaders, 
                'Content-Type': 'application/json' 
              } 
            }
          );
        }

        // In a real system, you would:
        // 1. Validate user balance
        // 2. Store bet in database
        // 3. Update user balance
        // 4. Return bet confirmation

        const betId = crypto.randomUUID();
        const bet = {
          id: betId,
          eventId,
          market,
          outcome,
          amount,
          userId,
          status: 'placed',
          placedAt: new Date().toISOString()
        };

        console.log('Bet placed:', bet);

        return new Response(
          JSON.stringify({ 
            success: true, 
            bet,
            message: 'Apuesta realizada exitosamente'
          }),
          { 
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json' 
            } 
          }
        );
      }

      case 'get_user_bets': {
        const userId = url.searchParams.get('userId');
        
        if (!userId) {
          return new Response(
            JSON.stringify({ error: 'User ID required' }),
            { 
              status: 400,
              headers: { 
                ...corsHeaders, 
                'Content-Type': 'application/json' 
              } 
            }
          );
        }

        // Simulate user bets
        const userBets = [
          {
            id: '1',
            eventId: '1',
            eventName: 'Barcelona vs Real Madrid',
            market: 'Resultado final',
            outcome: 'Barcelona',
            amount: 50,
            odds: 2.1,
            status: 'active',
            placedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '2',
            eventId: '2',
            eventName: 'Lakers vs Warriors',
            market: 'Resultado final',
            outcome: 'Lakers',
            amount: 25,
            odds: 1.9,
            status: 'won',
            placedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            result: 'ganada',
            payout: 47.5
          }
        ];

        return new Response(
          JSON.stringify({ bets: userBets }),
          { 
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json' 
            } 
          }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { 
            status: 400,
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json' 
            } 
          }
        );
    }
  } catch (error) {
    console.error('Error in betting-system function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
})
import { createClient } from '@supabase/supabase-js';

const URL = 'https://tyonddhrzxumgnnmqnbv.supabase.co';
const API_KEY = 'sb_publishable_V547YHL0QTTLmREDxGqGqw_MXSZ0juC';

export const supabase = createClient(URL, API_KEY);
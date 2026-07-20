import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://reuncldujrdyjhllkkgw.supabase.co'
const supabaseKey = 'sb_publishable_lAVwsZl6cwEuRL0rqEQhuQ_enltW9e_'

export const supabase = createClient(supabaseUrl, supabaseKey)
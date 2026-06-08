import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qzmcrjsgitpmntddttfk.supabase.co'
const supabaseKey = 'sb_publishable_hY5Qxqx6sqFntkDTkr_OoA_HYwe_mDc'

export const supabase = createClient(supabaseUrl, supabaseKey)
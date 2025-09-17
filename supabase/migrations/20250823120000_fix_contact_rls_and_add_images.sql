/*
          # [Operation Name]
          Definitive RLS Policy Fix for Contact Form

          ## Query Description: 
          This script resolves the "new row violates row-level security policy" error. It first REMOVES any existing, potentially conflicting security policies on the 'contact_messages' table. It then creates the correct policies from scratch to ensure anonymous users can submit the form while authenticated users retain full management access. This operation is safe and will not affect any existing data in the table.

          ## Metadata:
          - Schema-Category: "Security"
          - Impact-Level: "Low"
          - Requires-Backup: false
          - Reversible: true
          
          ## Structure Details:
          - Table: public.contact_messages
          - Affects: Row Level Security (RLS) Policies
          
          ## Security Implications:
          - RLS Status: Enabled
          - Policy Changes: Yes (Drops old policies, creates new ones)
          - Auth Requirements: Correctly separates 'anon' and 'authenticated' roles.
          
          ## Performance Impact:
          - Indexes: None
          - Triggers: None
          - Estimated Impact: Negligible. Affects permissions, not query performance.
          */

-- Step 1: Drop any potentially conflicting policies that may have been created previously.
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.contact_messages;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow full access to authenticated users" ON public.contact_messages;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.contact_messages;


-- Step 2: Create the definitive, correct policy to allow anonymous form submissions.
CREATE POLICY "Allow anonymous inserts"
ON public.contact_messages
FOR INSERT
TO anon
WITH CHECK (true);

-- Step 3: Create the definitive, correct policy for admins/authenticated users to manage all messages.
CREATE POLICY "Allow full access to authenticated users"
ON public.contact_messages
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

/*
          # [Fix] RLS Policy for Contact Messages
          [This migration corrects the Row Level Security (RLS) policies for the `contact_messages` table to allow anonymous users to submit the contact form while giving authenticated users full management access.]

          ## Query Description: [This operation updates security policies. It is designed to fix the "new row violates row-level security policy" error. It drops any existing, potentially incorrect policies on the table and replaces them with the correct ones. This is a safe operation and will not affect any data already in the table.]
          
          ## Metadata:
          - Schema-Category: ["Security", "Safe"]
          - Impact-Level: ["Low"]
          - Requires-Backup: [false]
          - Reversible: [true]
          
          ## Structure Details:
          - Table: public.contact_messages
          
          ## Security Implications:
          - RLS Status: [Enabled]
          - Policy Changes: [Yes]
          - Auth Requirements: [Allows anonymous inserts, requires authentication for management.]
          
          ## Performance Impact:
          - Indexes: [None]
          - Triggers: [None]
          - Estimated Impact: [Negligible performance impact.]
          */

-- 1. Ensure RLS is enabled on the table. It's safe to run this again.
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to ensure a clean slate.
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow authenticated users full access" ON public.contact_messages;

-- 3. Create a policy to allow anonymous users to insert messages.
-- This is the key policy that will fix the form submission error.
CREATE POLICY "Allow anonymous inserts"
ON public.contact_messages
FOR INSERT
TO anon
WITH CHECK (true);

-- 4. Create a policy that gives authenticated users (like you in the dashboard)
-- full access to read, update, and delete messages.
CREATE POLICY "Allow authenticated users full access"
ON public.contact_messages
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

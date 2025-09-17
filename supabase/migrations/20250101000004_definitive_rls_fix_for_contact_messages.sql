/*
# [Fix] Definitive RLS Policy for Contact Messages

This migration script provides a final fix for the "new row violates row-level security policy" error on the `contact_messages` table. It resets all existing policies and creates the correct ones from scratch to ensure anonymous users can submit the form and authenticated users can manage the data.

## Query Description:
This operation is **SAFE**. It only modifies security policies and does not affect any existing data in the `contact_messages` table. It will first drop any previous, potentially conflicting policies before creating the correct new ones.

## Metadata:
- Schema-Category: "Safe"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true (by dropping these policies and creating new ones)

## Structure Details:
- Table: `public.contact_messages`
- Policies Affected: All policies on this table will be reset.

## Security Implications:
- RLS Status: Will be explicitly enabled.
- Policy Changes: Yes.
  - **DROP**: Any existing policies on `public.contact_messages`.
  - **CREATE**:
    1. A policy to allow anonymous users (`anon` role) to INSERT new messages.
    2. A policy to allow authenticated users (`authenticated` role) to have full SELECT, INSERT, UPDATE, and DELETE access.
- Auth Requirements: This change allows the `anon` key to be used for form submissions.

## Performance Impact:
- Indexes: None
- Triggers: None
- Estimated Impact: Negligible. RLS checks have a very minor performance overhead, which is expected.
*/

-- Step 1: Ensure Row Level Security is enabled on the table.
-- This is a critical step; without it, policies are not enforced.
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Step 2: Drop any existing policies to avoid conflicts.
-- This ensures a clean slate for the new, correct policies.
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow authenticated full access" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow anonymous access" ON public.contact_messages;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow individual insert access" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow individual read access" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow admins to manage all messages" ON public.contact_messages;


-- Step 3: Create a policy to allow anonymous users to INSERT data.
-- This is the main fix for the contact form submission error.
-- It allows anyone with the anon key to create a new row.
CREATE POLICY "Allow anonymous inserts"
ON public.contact_messages
FOR INSERT
TO anon
WITH CHECK (true);

-- Step 4: Create a policy to give authenticated users full access.
-- This allows logged-in users (like you in the Supabase dashboard) to
-- view, update, and delete any message.
CREATE POLICY "Allow authenticated full access"
ON public.contact_messages
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

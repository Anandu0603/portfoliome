/*
# [Reset and Fix Contact Form RLS Policies]
This script completely resets and correctly configures the Row Level Security (RLS) policies for the `contact_messages` table. It will resolve the "new row violates row-level security policy" error by first deleting any existing, potentially conflicting policies and then creating the correct ones.

## Query Description:
This operation is safe and will not affect any existing data in your `contact_messages` table. It only modifies the security rules that govern access to the table.
- It ensures anonymous website visitors can submit the contact form.
- It ensures authenticated users (like you in the Supabase dashboard) can view and manage all submitted messages.

## Metadata:
- Schema-Category: "Safe"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true

## Structure Details:
- Table: public.contact_messages
- Operation: Modifies Row Level Security (RLS) policies.

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes (Drops old policies, creates new ones)
- Auth Requirements: Allows `anon` role to INSERT, and `authenticated` role to perform ALL actions.

## Performance Impact:
- Indexes: No change
- Triggers: No change
- Estimated Impact: None. This change affects permissions, not query performance.
*/

-- Step 1: Drop any existing policies on the table to avoid conflicts.
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow anonymous access" ON public.contact_messages;
DROP POLICY IF EXISTS "Enable insert for anon users" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow full access for authenticated users" ON public.contact_messages;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.contact_messages;


-- Step 2: Ensure Row Level Security is enabled on the table.
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;


-- Step 3: Create a policy to allow anonymous users (website visitors) to INSERT new messages.
-- This is the key policy that fixes the form submission error.
CREATE POLICY "Allow anonymous inserts"
ON public.contact_messages
FOR INSERT
TO anon
WITH CHECK (true);


-- Step 4: Create a policy to give authenticated users (like you) full access to manage the messages.
-- This allows you to see, edit, and delete messages from the Supabase Studio.
CREATE POLICY "Allow full access for authenticated users"
ON public.contact_messages
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

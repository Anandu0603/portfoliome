/*
# [Operation Name] Fix Contact Form RLS Policies
[This script resets and correctly configures the Row Level Security (RLS) policies for the `contact_messages` table to resolve submission errors.]

## Query Description: [This operation will drop any existing RLS policies on the `contact_messages` table and create new ones. This is a safe operation as it only affects access permissions and does not alter or delete any data in the table. It is necessary to fix the "new row violates row-level security policy" error that prevents the contact form from working.]

## Metadata:
- Schema-Category: ["Security", "Safe"]
- Impact-Level: ["Low"]
- Requires-Backup: false
- Reversible: true

## Structure Details:
- Table Affected: `public.contact_messages`
- Policies Dropped: 
  - "Allow anonymous inserts" (if exists)
  - "Allow admin full access" (if exists)
- Policies Created:
  - "Allow anonymous inserts" (for INSERT by anon role)
  - "Allow admin full access" (for ALL by authenticated role)

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes. This is the core purpose of the script. It grants anonymous users permission to insert data.
- Auth Requirements: Correctly separates permissions for `anon` and `authenticated` roles.

## Performance Impact:
- Indexes: [None]
- Triggers: [None]
- Estimated Impact: [Negligible. RLS policy checks have a very minor overhead.]
*/

-- Step 1: Ensure RLS is enabled on the table.
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Step 2: Drop existing policies to prevent conflicts.
-- It's safe to run these even if the policies don't exist.
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow admin full access" ON public.contact_messages;

-- Step 3: Create a policy to allow anonymous users (visitors) to insert messages.
CREATE POLICY "Allow anonymous inserts"
ON public.contact_messages
FOR INSERT
TO anon
WITH CHECK (true);

-- Step 4: Create a policy to allow authenticated users (admins) to manage all messages.
CREATE POLICY "Allow admin full access"
ON public.contact_messages
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

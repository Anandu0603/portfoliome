/*
# [Fix] RLS Policies for Contact Messages
This migration corrects the Row Level Security (RLS) policies for the `contact_messages` table to allow form submissions from anonymous users.

## Query Description:
This script creates two policies:
1.  **Anonymous Insert Policy**: Allows any visitor (anonymous user) to submit a message through the contact form. This is essential for the form to work publicly.
2.  **Admin Full Access Policy**: Grants authenticated users (like yourself, when logged into a future admin panel) full permissions to read, update, and delete all messages.

This change is safe and does not affect any existing data. It only modifies the security rules to enable the intended functionality.

## Metadata:
- Schema-Category: "Security"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true

## Structure Details:
- Table: public.contact_messages
- Policies Created:
  - "Allow anonymous users to insert contact messages" (INSERT for anon)
  - "Allow authenticated users to manage all messages" (ALL for authenticated)

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes. This explicitly grants insert permissions to anonymous users, which is the intended behavior for a public contact form.
- Auth Requirements: None for submission, `authenticated` role for management.

## Performance Impact:
- Indexes: None
- Triggers: None
- Estimated Impact: Negligible. RLS policy checks have minimal overhead.
*/

-- 1. Enable Row Level Security if it's not already enabled.
-- This ensures that the policies we create will be enforced.
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies for anon and authenticated to avoid conflicts
DROP POLICY IF EXISTS "Allow anonymous users to insert contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow authenticated users to manage all messages" ON public.contact_messages;

-- 3. Create a policy to allow anonymous users to insert messages.
-- This is the key fix for the "violates row-level security policy" error.
-- It allows anyone to use the contact form.
CREATE POLICY "Allow anonymous users to insert contact messages"
ON public.contact_messages
FOR INSERT
TO anon
WITH CHECK (true);

-- 4. Create a policy to give authenticated users full access.
-- This is for future admin functionality, allowing you to manage messages.
CREATE POLICY "Allow authenticated users to manage all messages"
ON public.contact_messages
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

/*
# [Fix RLS Policy for Contact Messages]
This migration fixes the Row-Level Security (RLS) policy for the `contact_messages` table to allow anonymous users to submit the contact form.

## Query Description:
This script creates a new RLS policy that grants the `anon` role permission to insert new rows into the `contact_messages` table. This is necessary for the public-facing contact form to work correctly. It also ensures that authenticated users have full access to manage the messages. This change is safe and does not affect existing data.

## Metadata:
- Schema-Category: "Safe"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true

## Structure Details:
- Table: `public.contact_messages`
- Operation: Modifying RLS Policies

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes. Adds an INSERT policy for the 'anon' role.
- Auth Requirements: This policy specifically targets anonymous users.
*/

-- Drop existing policies to ensure a clean slate, if they exist.
-- This makes the script safe to run multiple times.
DROP POLICY IF EXISTS "Allow anonymous insert on contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow full access for authenticated users" ON public.contact_messages;

-- 1. Create a policy to allow anonymous users to insert contact messages.
-- This is the key fix for the public contact form.
CREATE POLICY "Allow anonymous insert on contact messages"
ON public.contact_messages
FOR INSERT
TO anon
WITH CHECK (true);

-- 2. Create a policy to ensure authenticated users (like you, the admin) can manage all messages.
-- This grants full CRUD access to users who are logged in.
CREATE POLICY "Allow full access for authenticated users"
ON public.contact_messages
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

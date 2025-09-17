/*
# Create Contact Messages Table
This migration creates the contact_messages table to store form submissions from the portfolio website.

## Query Description: 
This operation will create a new table for storing contact form submissions. This is a safe operation that adds new functionality without affecting existing data. No backup is required as this creates new infrastructure.

## Metadata:
- Schema-Category: "Safe"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true

## Structure Details:
- Table: contact_messages
- Columns: id, name, email, subject, message, created_at, status, admin_notes, ip_address, user_agent
- Indexes: created_at, status for efficient querying
- Primary Key: id (UUID)

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes
- Auth Requirements: Anonymous users can insert, authenticated users can view/manage

## Performance Impact:
- Indexes: Added on created_at and status columns
- Triggers: None
- Estimated Impact: Minimal - new table creation
*/

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    status VARCHAR(20) DEFAULT 'new'::text CHECK (status IN ('new', 'read', 'replied', 'archived')),
    admin_notes TEXT,
    ip_address INET,
    user_agent TEXT
);

-- Add helpful comments
COMMENT ON TABLE public.contact_messages IS 'Stores contact form submissions from the portfolio website';
COMMENT ON COLUMN public.contact_messages.id IS 'Unique identifier for each contact message';
COMMENT ON COLUMN public.contact_messages.name IS 'Name of the person sending the message';
COMMENT ON COLUMN public.contact_messages.email IS 'Email address of the sender';
COMMENT ON COLUMN public.contact_messages.subject IS 'Subject line of the message';
COMMENT ON COLUMN public.contact_messages.message IS 'Main content of the message';
COMMENT ON COLUMN public.contact_messages.status IS 'Current status of the message (new, read, replied, archived)';
COMMENT ON COLUMN public.contact_messages.admin_notes IS 'Internal notes for managing the message';

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON public.contact_messages(email);

-- Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous users to insert contact messages
CREATE POLICY "Allow anonymous contact form submissions" 
ON public.contact_messages 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Create policy to allow authenticated users to view all contact messages
CREATE POLICY "Allow authenticated users to view contact messages" 
ON public.contact_messages 
FOR SELECT 
TO authenticated 
USING (true);

-- Create policy to allow authenticated users to update contact messages (for status management)
CREATE POLICY "Allow authenticated users to update contact messages" 
ON public.contact_messages 
FOR UPDATE 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Create policy to allow authenticated users to delete contact messages if needed
CREATE POLICY "Allow authenticated users to delete contact messages" 
ON public.contact_messages 
FOR DELETE 
TO authenticated 
USING (true);

-- Grant necessary permissions
GRANT INSERT ON public.contact_messages TO anon;
GRANT SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT USAGE ON SCHEMA public TO anon, authenticated;

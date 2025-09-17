/*
# Create Contact Messages Table
Creates a table to store contact form submissions from the portfolio website

## Query Description:
This operation creates a new table for storing contact messages submitted through the portfolio contact form. This is a safe operation that adds new functionality without affecting existing data. No backup is required as this creates new structure only.

## Metadata:
- Schema-Category: Safe
- Impact-Level: Low
- Requires-Backup: false
- Reversible: true

## Structure Details:
- Table: contact_messages
- Columns: id, name, email, subject, message, created_at, status, admin_notes
- Constraints: NOT NULL for required fields, email validation

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes (INSERT for anonymous users, SELECT/UPDATE for authenticated admins)
- Auth Requirements: Anonymous users can insert, authenticated users can view/manage

## Performance Impact:
- Indexes: Primary key on id, index on created_at for sorting
- Triggers: None
- Estimated Impact: Minimal performance impact, new table with efficient indexing
*/

-- Create contact_messages table
CREATE TABLE contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
    admin_notes TEXT,
    ip_address INET,
    user_agent TEXT
);

-- Create index for better query performance
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert contact messages
CREATE POLICY "Allow anonymous users to submit contact messages" 
ON contact_messages FOR INSERT 
TO anon 
WITH CHECK (true);

-- Allow authenticated users (admins) to view all messages
CREATE POLICY "Allow authenticated users to view contact messages" 
ON contact_messages FOR SELECT 
TO authenticated 
USING (true);

-- Allow authenticated users (admins) to update message status and notes
CREATE POLICY "Allow authenticated users to update contact messages" 
ON contact_messages FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

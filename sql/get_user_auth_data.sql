-- SQL Function to get user authentication data including last_sign_in_at
-- This function must be executed in Supabase SQL Editor by the Super Admin

-- Create function to get auth user data (accessible only to authenticated users)
CREATE OR REPLACE FUNCTION get_user_auth_data(user_id UUID)
RETURNS TABLE (
    last_sign_in_at TIMESTAMPTZ
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT au.last_sign_in_at
    FROM auth.users au
    WHERE au.id = user_id;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_user_auth_data(UUID) TO authenticated;

-- Optional: Add RLS policy to ensure only super admin can call this
-- You may want to add additional security checks here

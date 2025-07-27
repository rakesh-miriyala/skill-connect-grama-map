-- Drop the problematic policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

-- Create new, non-recursive policies
-- Users can view their own profile
CREATE POLICY "Users can view their own profile" 
ON profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" 
ON profiles 
FOR UPDATE 
USING (auth.uid() = id);

-- Admins can view all profiles (using the security definer function)
CREATE POLICY "Admins can view all profiles" 
ON profiles 
FOR SELECT 
USING (public.is_admin(auth.uid()));
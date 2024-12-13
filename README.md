# Scheduler App

## Database Setup Instructions

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Execute the SQL files in the following order:

   ```bash
   src/lib/database/schema/00_init.sql     # Create tables
   src/lib/database/schema/01_functions.sql # Create helper functions
   src/lib/database/schema/02_policies.sql  # Set up RLS policies
   ```

4. Verify the setup by checking:
   - Tables exist in the Table Editor
   - RLS is enabled for all tables
   - Policies are correctly applied

## Development Setup

1. Copy your Supabase project URL and anon key from the project settings
2. Create a `.env` file with:
   ```
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Test Users

- Admin: admin@work.com / test123
- Regular User: user@work.com / test123
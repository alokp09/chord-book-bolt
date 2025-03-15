/*
  # Create songs table with ratings

  1. New Tables
    - `songs`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `artist` (text, required)
      - `chords` (text array)
      - `content` (text, required)
      - `rating` (float, default 0)
      - `created_at` (timestamp with timezone)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `songs` table
    - Add policies for:
      - Anyone can read songs
      - Authenticated users can create songs
      - Users can update and delete their own songs
*/

CREATE TABLE IF NOT EXISTS songs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist text NOT NULL,
  chords text[] NOT NULL DEFAULT '{}',
  content text NOT NULL,
  rating float NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL
);

ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read songs
CREATE POLICY "Anyone can read songs"
  ON songs
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to create songs
CREATE POLICY "Authenticated users can create songs"
  ON songs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own songs
CREATE POLICY "Users can update own songs"
  ON songs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own songs
CREATE POLICY "Users can delete own songs"
  ON songs
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
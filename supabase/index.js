// index.js
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';

// Replace with your actual Supabase URL and anon key
const supabaseUrl = "https://rwyrakosphwhgkosreti.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3eXJha29zcGh3aGdrb3NyZXRpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjI1ODgxMiwiZXhwIjoyMDYxODM0ODEyfQ.lJ1zF7wZgxD5o14HxWgPsf8QpOViQbYKxL0ZddfZu3E";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and anon key are required.");
}

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Now you can interact with Supabase services, including Storage
async function listBuckets() {
//   try {
//     const { data, error } = await supabase.storage.listBuckets();

//     if (error) {
//       console.error('Error listing buckets:', error);
//       return;
//     }

//     if (data) {
//       console.log('Available storage buckets:', data);
//     } else {
//       console.log('No buckets found or unable to list buckets.');
//     }
//   } catch (err) {
//     console.error('An unexpected error occurred:', err);
//   }

}

async function uploadTaskuri() {
  const bucketName = 'tau';
  const filePath = './taskuri.txt';
  const fileName = 'taskuri.txt';

  // Read the file
  let fileBuffer;
  try {
    fileBuffer = fs.readFileSync(filePath);
  } catch (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Upload the file (assumes bucket already exists)
  const { data, error } = await supabase.storage.from(bucketName).upload(fileName, fileBuffer, {
    cacheControl: '3600',
    upsert: true,
    contentType: 'text/plain',
  });

  if (error) {
    console.error('Error uploading file:', error);
  } else {
    console.log('File uploaded successfully:', data);
  }
}

// Example usage:
listBuckets();
uploadTaskuri();

// You can export the client to use in other parts of your application
// export default supabase;
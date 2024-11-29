'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/src/lib/supabase/client'; // Update path to Supabase client
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"


export default function ProfilePage() {
  const [profile, setProfile] = useState({ full_name: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState('https://github.com/shadcn.png');
  
  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfile({ ...profile, message: e.target.value });
  };


  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first selected file
    if (file) {
      try {
        // Create FormData to send the file
        const formData = new FormData();
        formData.append("file", file);
  
        // Example API endpoint for uploading images
        const response = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          const { url } = await response.json(); // Assuming the backend returns the uploaded image URL
          setProfile((prev) => ({ ...prev, avatar_url: url }));
          console.log("Image uploaded successfully:", url);
        } else {
          console.error("Image upload failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };


  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        console.error('User not logged in');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', session.user.id)
        .single();

      if (data) {
        setProfile(data);
      } else if (error) {
        console.error('Error fetching profile:', error.message);
      }
    };

    fetchProfile();
  }, []);

 const handleUpdate = async () => {
    try {
      // Ensure this function is marked async
      const response = await fetch("/api/save-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Profile saved successfully:", data);
      } else {
        console.error("Failed to save profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4 p-6 bg-primary shadow rounded">
      <h1 className="text-2xl font-bold">プロフィールを編集</h1>
       <div>
        <Avatar className="mb-6">
          <AvatarImage src={preview} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <label className='block text-sm font-medium mb-4'>Upload Photo</label> 
        <input
        type="file"
        accept="image/*"
        className="w-full mb-2 border rounded"
        onChange={handleImageUpload}
        />
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          type="text"
          value={profile.full_name}
          onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
          className="w-full p-1 border rounded"
        />
      </div>
      <label className="block text-sm font-medium">Bio Message</label>
      <Textarea
        placeholder="Type your message here."
        value={profile.message}
        onChange={handleText}
        className="w-full p-2 border rounded"
      />
      <Button
        onClick={handleUpdate}
        disabled={loading}
        className="w-full bg-primary text-foreground py-2 rounded"
      >
        {loading ? 'Saving...' : 'Save Profile'}
      </Button>
    </div>
  );
}

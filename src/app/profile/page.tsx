'use client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';
import { supabase } from '@/src/lib/supabase/client'; // Update path to Supabase client
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea";
import { UploadMediaButton } from "@/components/shared/upload-media-button"



export default function ProfilePage() {
  const [profile, setProfile] = useState({ full_name: '', message: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState('https://github.com/shadcn.png');
  
  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfile({ ...profile, message: e.target.value });
  };


  const onUpload = async (file: File | null) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
  
        const response = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          const { url } = await response.json();
          setProfile((prev) => ({ ...prev, avatar_url: url }));
          setPreview(url); // Update the avatar preview
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
      setLoading(true); // Start loading
      try {
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
      } catch (error) {
        console.error("Error during fetchProfile:", error);
      } finally {
        setLoading(false); // End loading
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
    <div className="flex items-center gap-4">
      <Avatar className="w-16 h-16">
        <AvatarImage src={preview} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <UploadMediaButton mediaType="image" onUpload={onUpload} />
    </div>
    <label className="block text-sm font-medium mt-4">Full Name</label>
    <input
      type="text"
      value={profile.full_name}
      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
      className="w-full p-1 border rounded"
    />
    <label className="block text-sm font-medium mt-4">Email</label>
    <input
      type="text"
      value={profile.email}
      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
      className="w-full p-1 border rounded"
    />
    <label className="block text-sm font-medium mt-4">Bio Message</label>
    <Textarea
      placeholder="Type your message here."
      value={profile.message}
      onChange={handleText}
      className="w-full p-2 border rounded"
    />
    <Button
      onClick={handleUpdate}
      disabled={loading}
      className="w-full bg-primary text-foreground py-2 rounded mt-4"
    >
      {loading ? 'Saving...' : 'Save Profile'}
    </Button>
  </div>  
  )
}
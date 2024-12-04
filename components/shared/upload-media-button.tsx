import { Button } from "@/components/ui/button";
import { ImagePlus, VideoIcon as VideoPlus } from "lucide-react";

interface UploadMediaButtonProps {
  mediaType: "image" | "video";
  onUpload: (file: File | null) => void; // Pass the selected file to the parent
}

export function UploadMediaButton({ mediaType, onUpload }: UploadMediaButtonProps) {
  const handleClick = () => {
    // Simulate a click on the hidden input field
    document.getElementById(`upload-${mediaType}`)?.click();
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={handleClick}
        aria-label={`Upload ${mediaType}`}
      >
        {mediaType === "image" ? (
          <ImagePlus className="h-4 w-4" />
        ) : (
          <VideoPlus className="h-4 w-4" />
        )}
      </Button>
      <input
        id={`upload-${mediaType}`}
        type="file"
        accept={mediaType === "image" ? "image/*" : "video/*"}
        className="hidden"
        onChange={(e) => onUpload(e.target.files?.[0] || null)}
      />
    </>
  );
}

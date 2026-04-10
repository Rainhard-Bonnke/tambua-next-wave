import { useState } from "react";
import { useSafaris } from "@/hooks/useSafaris";
import { supabase } from "@/integrations/supabase/client";
import { Safari } from "@/data/safaris";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Edit, Plus, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { compressImage, createPreviewUrl } from "@/lib/image-utils";

const emptySafari: Partial<Safari> = {
  id: "", title: "", location: "", duration: "", price: 0, rating: 5.0, reviews: 0,
  image: "", description: "", highlights: [], category: "Wildlife Safari", stripePriceId: ""
};

export const AdminSafaris = () => {
  const { data: safaris = [], isLoading } = useSafaris();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<Partial<Safari> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [highlightsText, setHighlightsText] = useState("");

  const handleEdit = (safari: Safari) => {
    setEditing(safari);
    setHighlightsText(safari.highlights.join("\n"));
  };

  const handleAdd = () => {
    setEditing({ ...emptySafari, id: `safari-${Date.now()}` });
    setHighlightsText("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Show instant preview to the user
    const previewUrl = createPreviewUrl(file);
    setEditing((prev) => prev ? { ...prev, image: previewUrl } : null);
    
    setUploading(true);
    try {
      // 2. Compress the image to speed up upload
      const compressedFile = await compressImage(file);
      
      const fileExt = compressedFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("safaris")
        .upload(fileName, compressedFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("safaris")
        .getPublicUrl(fileName);

      // 3. Update with the final URL
      setEditing((prev) => prev ? { ...prev, image: publicUrl } : null);
      toast.success("Image uploaded!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    setIsSubmitting(true);
    try {
      const payload = {
        id: editing.id,
        title: editing.title,
        location: editing.location,
        duration: editing.duration,
        price: editing.price,
        rating: editing.rating,
        reviews: editing.reviews,
        image: editing.image,
        description: editing.description,
        highlights: highlightsText.split("\n").map(h => h.trim()).filter(Boolean),
        category: editing.category,
        stripe_price_id: editing.stripePriceId,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from("safaris").upsert(payload);
      if (error) throw error;

      toast.success("Safari saved successfully");
      queryClient.invalidateQueries({ queryKey: ["safaris"] });
      setEditing(null);
    } catch (error) {
      toast.error("Failed to save safari. Ensure you have run the DB setup script.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this safari?")) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from("safaris").delete().eq("id", id);
      if (error) throw error;
      toast.success("Safari deleted");
      queryClient.invalidateQueries({ queryKey: ["safaris"] });
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (isLoading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin w-8 h-8 text-accent"/></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card p-6 rounded-2xl border border-border">
        <div>
          <h2 className="text-xl font-bold">Manage Safaris</h2>
          <p className="text-muted-foreground text-sm">Add, edit, or remove safari packages.</p>
        </div>
        <Button onClick={handleAdd} className="bg-accent hover:bg-accent/90"><Plus className="w-4 h-4 mr-2"/> Add Safari</Button>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Image</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Title</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Price</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Category</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {safaris.map((safari) => (
                <tr key={safari.id} className="border-b border-border hover:bg-muted/20">
                  <td className="p-4">
                    <img src={safari.image} alt={safari.title} className="w-16 h-12 object-cover rounded-md" />
                  </td>
                  <td className="p-4 font-medium">{safari.title}</td>
                  <td className="p-4">${safari.price}</td>
                  <td className="p-4">{safari.category}</td>
                  <td className="p-4 text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(safari)}><Edit className="w-4 h-4"/></Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(safari.id)}><Trash2 className="w-4 h-4"/></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing?.id?.startsWith("safari-") ? "Add New Safari" : "Edit Safari"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input value={editing?.title || ""} onChange={(e) => setEditing(prev => ({ ...prev!, title: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input value={editing?.location || ""} onChange={(e) => setEditing(prev => ({ ...prev!, location: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>
                <Input value={editing?.duration || ""} onChange={(e) => setEditing(prev => ({ ...prev!, duration: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Price ($)</label>
                <Input type="number" value={editing?.price || 0} onChange={(e) => setEditing(prev => ({ ...prev!, price: Number(e.target.value) }))} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={editing?.category} onValueChange={(v) => setEditing(prev => ({ ...prev!, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Wildlife Safari">Wildlife Safari</SelectItem>
                    <SelectItem value="Beach Holiday">Beach Holiday</SelectItem>
                    <SelectItem value="Cultural Tour">Cultural Tour</SelectItem>
                    <SelectItem value="Adventure">Adventure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Stripe Price ID</label>
                <Input value={editing?.stripePriceId || ""} onChange={(e) => setEditing(prev => ({ ...prev!, stripePriceId: e.target.value }))} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea rows={4} value={editing?.description || ""} onChange={(e) => setEditing(prev => ({ ...prev!, description: e.target.value }))} required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Highlights (One per line)</label>
              <Textarea rows={4} value={highlightsText} onChange={(e) => setHighlightsText(e.target.value)} placeholder="Big Five Encounters&#10;Sunset Game Drive" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Image Cover</label>
              <div className="flex items-center gap-4">
                {editing?.image && <img src={editing.image} alt="Preview" className="w-16 h-16 rounded object-cover" />}
                <div className="flex-1">
                  <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                  {uploading && <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin"/> Uploading...</p>}
                </div>
              </div>
              <Input placeholder="Or paste image URL" value={editing?.image || ""} onChange={(e) => setEditing(prev => ({ ...prev!, image: e.target.value }))} className="mt-2" />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
              <Button type="submit" className="bg-accent hover:bg-accent/90" disabled={isSubmitting || uploading}>
                {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : null} Save Safari
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

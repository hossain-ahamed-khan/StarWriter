"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { createBlog, type CreateBlogInput } from "@/services/Blogs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z
    .any()
    .refine((val) => val instanceof File || (val && val[0] instanceof File) || val === null || val === undefined, "Image must be a file" )
    .optional(),
});

export type AddBlogForm = z.infer<typeof schema>;

export default function AddBlogModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<AddBlogForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      image: undefined, // keep undefined for the lifetime; we don't programmatically set it
    },
  });

  const onSubmit = async (values: AddBlogForm) => {
    try {
      setSubmitting(true);

      // react-hook-form returns FileList for file input; normalize to single File
      let file: File | null | undefined = undefined;
      const anyVal = values.image as unknown as FileList | File | undefined;
      if (anyVal instanceof FileList) {
        file = anyVal.item(0) ?? null;
      } else if (anyVal instanceof File) {
        file = anyVal;
      } else {
        file = null;
      }

      const payload: CreateBlogInput = {
        title: values.title,
        description: values.description,
        image: file ?? undefined,
      };

      const res = await createBlog(payload);
      if (res.success) {
        onOpenChange(false);
        // Refresh the data on the page. Since the table fetches client-side,
        // do a hard reload to guarantee updated data.
        form.reset();
        try { router.refresh(); } catch {}
        setTimeout(() => {
            if (typeof window !== 'undefined') window.location.reload();
            toast.success(res.message ?? "Blog created successfully");
        }, 100);
      } else {
        toast.error(res.error ?? "Failed to create blog");
      }
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to create blog");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Add Blog</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder="Enter blog description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => {
                const { onChange, value: _omitValue, ref, name, onBlur } = field;
                return (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        name={name}
                        ref={ref}
                        onBlur={onBlur}
                        // never pass a `value` to file inputs; feed RHF manually
                        onChange={(e) => onChange(e.target.files ?? undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Submitting..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus } from "lucide-react";
import { useAddPermissionForm } from "../hooks/useAddPermissionForm";

export function AddPermissionForm() {
  const { form, onSubmit, isDisabled } = useAddPermissionForm();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-blue-700 hover:bg-blue-600">
          <UserPlus className="h-4 w-4" />
          Tambah Permission
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-semibold">
            Tambah Permission
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Tambahkan permission baru sesuai kebutuhan sistem.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-center items-center space-x-6">
              <FormField
                control={form.control}
                name="isMenu"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0 border p-2 rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Is Menu
                    </FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isEndpoint"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0 border p-2 rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Is Endpoint
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="gap-2 pt-4">
              <DialogClose asChild>
                <Button variant="outline" className="flex-1 sm:flex-none">
                  Batal
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isDisabled}
                className={`flex-1 sm:flex-none ${
                  isDisabled
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                }`}
              >
                Tambah Permission
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

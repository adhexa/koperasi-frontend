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
import { useAddMenuForm } from "../hooks/useAddMenuForm";

const httpMethods = ["GET", "POST", "PUT", "DELETE"] as const;

const pilihMenu = ["Menu", "Sub Menu"] as const;

export function AddMenuForm() {
  const { form, onSubmit, isDisabled } = useAddMenuForm();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-blue-700 hover:bg-blue-600">
          <UserPlus className="h-4 w-4" />
          Tambah Menu
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
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
            {/* Checkbox utama */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  name: "isMenu",
                  label: "Is Menu",
                  description:
                    "Jika dicentang, menu ini tidak akan muncul dalam daftar menu.",
                },
                {
                  name: "isEndpoint",
                  label: "Is Endpoint",
                  description:
                    "Jika dicentang, menu ini akan muncul sebagai list data atau endpoint.",
                },
                {
                  name: "isButton",
                  label: "Is Button",
                  description:
                    "Jika dicentang, menu ini akan muncul sebagai tombol di UI.",
                },
              ].map((item) => (
                <FormField
                  key={item.name}
                  control={form.control}
                  name={item.name as "isMenu" | "isEndpoint" | "isButton"}
                  render={({ field }) => (
                    <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-medium">
                            {item.label}
                          </FormLabel>
                          <p className="text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </FormItem>
                    </div>
                  )}
                />
              ))}
            </div>

            {/* Checkbox Method */}
            <div className="space-y-3">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-gray-900">
                  HTTP Methods
                </h3>
                <p className="text-xs text-muted-foreground">
                  Pilih method HTTP yang diizinkan untuk endpoint ini
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {httpMethods.map((method) => (
                  <FormField
                    key={method}
                    control={form.control}
                    name="methods"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(method)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...(field.value || []), method]
                                : (field.value || []).filter(
                                    (m) => m !== method
                                  );
                              field.onChange(newValue);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {method}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* tambahkan sebagai */}
            <div className="space-y-3">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-gray-900">
                  Tambahkan sebagai
                </h3>
                <p className="text-xs text-muted-foreground">
                  Pilih method HTTP yang diizinkan untuk endpoint ini
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {pilihMenu.map((method) => (
                  <FormField
                    key={method}
                    control={form.control}
                    name="methods"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(method)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...(field.value || []), method]
                                : (field.value || []).filter(
                                    (m) => m !== method
                                  );
                              field.onChange(newValue);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {method}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
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

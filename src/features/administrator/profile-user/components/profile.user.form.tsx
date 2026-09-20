import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useProfileUserForm } from "../hooks/useProfileUserForm";
import { useState } from "react";

export function ProfileUserForm() {
  const { form, onSubmit, isDisabled, isLoading, successMessage, errorMessage } =
    useProfileUserForm();
  const [isEditing, setIsEditing] = useState(false);

  const formFields = [
    { name: "username", label: "Username", placeholder: "Masukkan username" },
    { name: "pangkat", label: "Pangkat", placeholder: "Masukkan pangkat" },
    { name: "jabatan", label: "Jabatan", placeholder: "Masukkan jabatan" },
    { name: "namaUser", label: "Nama User", placeholder: "Masukkan nama user" },
    { name: "golongan", label: "Golongan", placeholder: "Masukkan golongan" },
    {
      name: "namaLevel",
      label: "Nama Level",
      placeholder: "Masukkan nama level",
    },
  ] as const;

  const handleCancel = () => {
    form.reset(); // Reset ke defaultValues
    setIsEditing(false);
  };

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  return (
    <div>
      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-md">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
          {errorMessage}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formFields.map((fieldProps) => (
              <FormField
                key={fieldProps.name}
                control={form.control}
                name={fieldProps.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-600">
                      {fieldProps.label}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={fieldProps.placeholder}
                        className="h-10 border-gray-200 focus:border-gray-900 focus:ring-gray-900/10"
                        disabled={!isEditing || fieldProps.name === "username" || fieldProps.name === "namaLevel"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <div className="pt-4">
            {isEditing ? (
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-10 border-gray-200 hover:bg-gray-50 cursor-pointer"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={isDisabled || isLoading}
                  className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 cursor-pointer"
                >
                  {isLoading ? "Menyimpan..." : "Perbarui"}
                </Button>
              </div>
            ) : (
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={handleStartEdit}
                  className="h-10 bg-blue-600 hover:bg-blue-700 cursor-pointer"
                >
                  Perbarui Profil
                </Button>
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

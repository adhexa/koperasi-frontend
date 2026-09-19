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
  const { form, onSubmit, isDisabled } = useProfileUserForm();
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
                        disabled={!isEditing}
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
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={isDisabled}
                  className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 cursor-pointer"
                >
                  Perbarui
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

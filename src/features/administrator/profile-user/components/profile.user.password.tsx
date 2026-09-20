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
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useProfilePassword } from "../hooks/useProfilePassword";

export function ProfileUserPassword() {
  const { form, onSubmit, isDisabled, isLoading, successMessage, errorMessage } =
    useProfilePassword();
  const [isEditing, setIsEditing] = useState(false);

  const [showPassword, setShowPassword] = useState({
    passwordLama: false,
    passwordBaru: false,
    konfirmasiPasswordBaru: false,
  });

  const toggleVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev: typeof showPassword) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const formFields = [
    {
      name: "passwordLama",
      label: "Password Lama",
      placeholder: "Masukkan password lama",
    },
    {
      name: "passwordBaru",
      label: "Password Baru",
      placeholder: "Masukkan password baru",
    },
    {
      name: "konfirmasiPasswordBaru",
      label: "Konfirmasi Password Baru",
      placeholder: "Ulangi password baru",
    },
  ] as const;

  const handleCancel = () => {
    form.reset();
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
            {formFields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-600">
                      {field.label}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...f}
                          type={showPassword[field.name] ? "text" : "password"}
                          placeholder={field.placeholder}
                          className="h-10 border-gray-200 focus:border-gray-900 focus:ring-gray-900/10 pr-10"
                          disabled={!isEditing}
                        />
                        <button
                          type="button"
                          onClick={() => toggleVisibility(field.name)}
                          className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                          tabIndex={-1}
                        >
                          {showPassword[field.name] ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
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
                  Ubah Password
                </Button>
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

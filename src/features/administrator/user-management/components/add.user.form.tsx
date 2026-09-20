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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAddUserForm } from "../hooks/useAddUserForm";

export function AddUserForm() {
  const [open, setOpen] = useState(false);
  const { form, onSubmit, isDisabled, isLoading, errorMessage } = useAddUserForm(() => setOpen(false));
  const [showPassword, setShowPassword] = useState(false);

  const formFields = [
    { name: "nip", label: "NIP", placeholder: "Masukkan NIP" },
    { name: "nama", label: "Nama", placeholder: "Masukkan nama lengkap" },
    { name: "username", label: "Username", placeholder: "Masukkan username" },
    { name: "jabatan", label: "Jabatan", placeholder: "Masukkan jabatan" },
    { name: "pangkat", label: "Pangkat (opsional)", placeholder: "Masukkan pangkat" },
    { name: "golongan", label: "Golongan (opsional)", placeholder: "Masukkan golongan" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-blue-600 cursor-pointer hover:bg-blue-700 disabled:bg-gray-300">
          <UserPlus className="h-4 w-4" />
          Tambah User
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md max-h-[90vh] overflow-hidden flex flex-col p-6 border-0 shadow-lg rounded-lg">
        <DialogHeader className="space-y-1.5 pb-4">
          <DialogTitle className="text-xl font-medium">Tambah User</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          {errorMessage && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
              ⚠️ {errorMessage}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {formFields.map((fieldProps) => (
                  <FormField
                    key={fieldProps.name}
                    control={form.control}
                    name={fieldProps.name as keyof typeof form.values}
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
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-600">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Masukkan password"
                            className="h-10 border-gray-200 focus:border-gray-900 focus:ring-gray-900/10 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="gap-2 pt-4 mt-2">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-10 border-gray-200 hover:bg-gray-50"
                  >
                    Batal
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={isDisabled}
                  className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 gap-2"
                >
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isLoading ? "Menyimpan..." : "Simpan"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

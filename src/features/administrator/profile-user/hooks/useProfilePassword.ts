import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Validasi Zod
const formSchema = z
  .object({
    passwordLama: z.string().min(1, { message: "Password lama wajib diisi" }),
    passwordBaru: z
      .string()
      .min(6, { message: "Password baru minimal 6 karakter" }),
    konfirmasiPasswordBaru: z.string().min(1, { message: "Wajib dikonfirmasi" }),
  })
  .refine((data) => data.passwordBaru === data.konfirmasiPasswordBaru, {
    path: ["konfirmasiPasswordBaru"],
    message: "Konfirmasi password tidak cocok",
  });

export type FormData = z.infer<typeof formSchema>;

export function useProfilePassword() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      passwordLama: "",
      passwordBaru: "",
      konfirmasiPasswordBaru: "",
    },
  });

  const isDisabled = !form.formState.isValid;

  const onSubmit = (data: FormData) => {
    console.log("Ubah password data:", data);
    form.reset();
  };

  return {
    form,
    onSubmit,
    isDisabled,
  };
}

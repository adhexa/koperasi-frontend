import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  nip: z.string().min(1, { message: "NIP wajib diisi" }),
  nama: z.string().min(1, { message: "Nama wajib diisi" }),
  username: z.string().min(1, { message: "Username wajib diisi" }),
  jabatan: z.string().min(1, { message: "Jabatan wajib diisi" }),
  pangkat: z.string().min(1, { message: "Pangkat wajib diisi" }),
  golongan: z.string().min(1, { message: "Golongan wajib diisi" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

export type FormData = z.infer<typeof formSchema>;

export function useAddUserForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      nip: "",
      nama: "",
      username: "",
      jabatan: "",
      pangkat: "",
      golongan: "",
      password: "",
    },
  });

  const isDisabled = !form.formState.isValid;

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
    form.reset();
  };

  return {
    form,
    onSubmit,
    isDisabled,
  };
}

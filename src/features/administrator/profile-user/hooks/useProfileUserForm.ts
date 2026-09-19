import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(1, { message: "Username wajib diisi" }),
  pangkat: z.string().min(1, { message: "Pangkat wajib diisi" }),
  jabatan: z.string().min(1, { message: "Jabatan wajib diisi" }),
  namaUser: z.string().min(1, { message: "Nama user wajib diisi" }),
  golongan: z.string().min(1, { message: "Golongan wajib diisi" }),
  namaLevel: z.string().min(1, { message: "Nama level wajib diisi" }),
});

export type FormData = z.infer<typeof formSchema>;

export function useProfileUserForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      pangkat: "",
      jabatan: "",
      namaUser: "",
      golongan: "",
      namaLevel: "",
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

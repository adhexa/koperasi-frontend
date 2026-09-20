import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersAPI } from "@/lib/api/users";
import { useState } from "react";

const formSchema = z.object({
  nip: z.string().min(1, { message: "NIP wajib diisi" }),
  nama: z.string().min(1, { message: "Nama wajib diisi" }),
  username: z.string().min(1, { message: "Username wajib diisi" }),
  jabatan: z.string().min(1, { message: "Jabatan wajib diisi" }),
  pangkat: z.string().optional(),
  golongan: z.string().optional(),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

export type FormData = z.infer<typeof formSchema>;

export function useAddUserForm(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const addUserMutation = useMutation({
    mutationFn: (data: FormData) =>
      usersAPI.addUser({
        username: data.username,
        password: data.password,
        id_level: 1,
        nip_users: data.nip,
        nama_user: data.nama,
        jabatan_user: data.jabatan,
        created_by: 1,
        kode_provinsi: "00",
        kode_kabupaten_kota: "00.00",
        kode_kecamatan: "00.00.00",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-list"] });
      form.reset();
      setErrorMessage(null);
      if (onSuccess) onSuccess();
    },
    onError: (err: any) => {
      setErrorMessage(
        err.response?.data?.message || "Gagal menambahkan user baru ke backend"
      );
    },
  });

  const isDisabled = !form.formState.isValid || addUserMutation.isPending;

  const onSubmit = (data: FormData) => {
    setErrorMessage(null);
    addUserMutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    isDisabled,
    isLoading: addUserMutation.isPending,
    errorMessage,
  };
}

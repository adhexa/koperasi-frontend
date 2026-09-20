import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { usersAPI, BackendUser } from "@/lib/api/users";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";

// Validasi Zod
const formSchema = z
  .object({
    passwordLama: z.string().min(1, { message: "Password lama wajib diisi" }),
    passwordBaru: z
      .string()
      .min(6, { message: "Password baru minimal 6 karakter" }),
    konfirmasiPasswordBaru: z.string().min(1, { message: "Wajib dikonfirmasi" }),
  })
  .refine((data: any) => data.passwordBaru === data.konfirmasiPasswordBaru, {
    path: ["konfirmasiPasswordBaru"],
    message: "Konfirmasi password tidak cocok",
  });

export type FormData = z.infer<typeof formSchema>;

export function useProfilePassword() {
  const { user: authUser } = useAuthStore();
  const [userUuid, setUserUuid] = useState<string>("2379471e-afc6-415e-8477-e35172191baa");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      passwordLama: "",
      passwordBaru: "",
      konfirmasiPasswordBaru: "",
    },
  });

  const { data: rawUsers } = useQuery<BackendUser[]>({
    queryKey: ["raw-users-list"],
    queryFn: () => usersAPI.getRawUsers(),
  });

  useEffect(() => {
    if (rawUsers && rawUsers.length > 0) {
      const currentUser =
        rawUsers.find(
          (u: BackendUser) =>
            u.username === authUser?.username || u.username === "superadmin"
        ) || rawUsers[0];

      if (currentUser) {
        setUserUuid(currentUser.uuid);
      }
    }
  }, [rawUsers, authUser]);

  const updatePasswordMutation = useMutation({
    mutationFn: (data: FormData) =>
      usersAPI.updatePassword({
        password_lama: data.passwordLama,
        password_baru: data.passwordBaru,
        konfirmasi_password: data.konfirmasiPasswordBaru,
        uuid: userUuid,
      }),
    onSuccess: () => {
      setSuccessMessage("Password berhasil diperbarui!");
      setErrorMessage(null);
      form.reset();
    },
    onError: (err: any) => {
      setErrorMessage(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.response?.data?.msg ||
          "Gagal memperbarui password"
      );
      setSuccessMessage(null);
    },
  });

  const isDisabled = !form.formState.isValid || updatePasswordMutation.isPending;

  const onSubmit = (data: FormData) => {
    setSuccessMessage(null);
    setErrorMessage(null);
    updatePasswordMutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    isDisabled,
    isLoading: updatePasswordMutation.isPending,
    successMessage,
    errorMessage,
  };
}


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersAPI, BackendUser } from "@/lib/api/users";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";

const formSchema = z.object({
  username: z.string().min(1, { message: "Username wajib diisi" }),
  pangkat: z.string().optional(),
  jabatan: z.string().min(1, { message: "Jabatan wajib diisi" }),
  namaUser: z.string().min(1, { message: "Nama user wajib diisi" }),
  golongan: z.string().optional(),
  namaLevel: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

export function useProfileUserForm() {
  const queryClient = useQueryClient();
  const { user: authUser } = useAuthStore();
  const [userUuid, setUserUuid] = useState<string>("2379471e-afc6-415e-8477-e35172191baa");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      username: authUser?.username || "superadmin",
      pangkat: "Super Administrator",
      jabatan: "Administrator",
      namaUser: "Super Administrator",
      golongan: "IV/e",
      namaLevel: "Administrator",
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
        form.reset({
          username: currentUser.username,
          pangkat: currentUser.pangkat || "Penata",
          jabatan: currentUser.jabatan_user || "Administrator",
          namaUser: currentUser.nama_user,
          golongan: currentUser.golongan || "III/c",
          namaLevel: currentUser.nama_level || "Administrator",
        });
      }
    }
  }, [rawUsers, authUser]);

  const updateProfileMutation = useMutation({
    mutationFn: (data: FormData) =>
      usersAPI.updateProfile({
        nama_user: data.namaUser,
        jabatan_user: data.jabatan,
        uuid: userUuid,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["raw-users-list"] });
      queryClient.invalidateQueries({ queryKey: ["users-list"] });
      setSuccessMessage("Profil berhasil diperbarui!");
      setErrorMessage(null);
    },
    onError: (err: any) => {
      setErrorMessage(
        err.response?.data?.message || "Gagal memperbarui profil di database"
      );
      setSuccessMessage(null);
    },
  });

  const isDisabled = !form.formState.isValid || updateProfileMutation.isPending;

  const onSubmit = (data: FormData) => {
    setSuccessMessage(null);
    setErrorMessage(null);
    updateProfileMutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    isDisabled,
    isLoading: updateProfileMutation.isPending,
    successMessage,
    errorMessage,
  };
}

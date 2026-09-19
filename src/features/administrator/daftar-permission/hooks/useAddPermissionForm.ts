import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  level: z.string().min(2, {
    message: "Nama Level must be at least 2 characters.",
  }),
  isMenu: z.boolean().optional(),
  isEndpoint: z.boolean().optional(),
});

export type FormData = z.infer<typeof formSchema>;

export function useAddPermissionForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      level: "",
      isMenu: false,
      isEndpoint: false,
    },
  });

  const isDisabled = !form.formState.isValid;

  const onSubmit = (data: FormData) => console.log(data);

  return {
    form,
    onSubmit,
    isDisabled,
  };
}

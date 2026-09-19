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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import { useAddLevelForm } from "../hooks/useAddLevelForm";

export function AddrRolesForm() {
  const { form, onSubmit, isDisabled } = useAddLevelForm();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-blue-700 hover:bg-blue-600 cursor-pointer">
          <UserPlus className="h-4 w-4" />
          Tambah Roles
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-semibold">
            Tambah Level Baru
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, vel.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem className="space-y-2 my-2">
                  <FormLabel className="text-sm font-medium ">
                    Nama Level
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan Nama Level"
                      className="w-full my-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 pt-4">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="flex-1 cursor-pointer sm:flex-none"
                >
                  Batal
                </Button>
              </DialogClose>
              <Button
                disabled={isDisabled}
                type="submit"
                className={`flex-1 sm:flex-none ${
                  isDisabled
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 cursor-pointer"
                }`}
              >
                Simpan Level
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

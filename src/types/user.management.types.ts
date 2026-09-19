export type User = {
  id: string;
  nip: string;
  username: string;
  nama: string;
  jabatan: string;
  status: "active" | "inactive";
};
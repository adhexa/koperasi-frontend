export interface ProfileCardProps {
  name: string;
  position: string;
  imageUrl: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

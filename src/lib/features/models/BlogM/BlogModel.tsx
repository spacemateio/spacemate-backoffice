export interface BlogModel {
  id: number;
  url: string;
  title: string;
  subtitle: string;
  excerpt: string;
  image: string;
  imageUrl: string;
  imageAlt?: string; // new
  imageExtId: string;
  imageAltExtId: string;
  content: string;
  status: number;
  createdDate: string;
  metaDescription?: string; // new
}

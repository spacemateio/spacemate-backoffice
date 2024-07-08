export interface BlogModel {
  id: number;
  url: string;
  title: string;
  subtitle: string;
  excerpt: string;
  image: string;
  imageAlt?: string; // new
  imageExtId: string;
  content: string;
  status: number;
  date: string;
  metaDescription?: string; // new
}

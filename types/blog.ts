export interface Blog {
  id: string
  title: string
  content_description: string | null
  category: string | null
  image_url: string | null
  created_at: string
  updated_at: string
}
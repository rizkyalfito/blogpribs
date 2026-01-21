# 📝 Blogpribs - Blog Platform Modern

Platform blog pribadi yang dibangun dengan teknologi terkini untuk sharing pemikiran, cerita, dan ide.

## ✨ Fitur

- ✅ **UI Modern** - Dibangun dengan React 19 dan Tailwind CSS
- ✅ **Type-Safe** - Full TypeScript dengan strict mode
- ✅ **Authentication** - Login admin dengan Supabase Auth
- ✅ **Content Management** - Create, edit, dan delete blog posts
- ✅ **Input Validation** - Validasi form dengan Zod
- ✅ **Pagination** - Load posts dengan "Load More" button
- ✅ **Responsive Design** - Mobile-friendly UI
- ✅ **Error Handling** - Comprehensive error boundaries dan user feedback
- ✅ **Security** - Authorization checks, input sanitization, RLS

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript 5
- **Styling**: Tailwind CSS 4, Radix UI
- **Backend**: Supabase (PostgreSQL + Auth)
- **Forms**: React Hook Form, Zod
- **UI Components**: shadcn/ui
- **Notifications**: Sonner
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ atau Bun
- Supabase account ([create di sini](https://supabase.com))

## 🚀 Quick Start

### 1. Setup Supabase

**Buat tabel `blogs` dengan schema:**

```sql
create table blogs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content_description text not null,
  category text,
  image_url text,
  file_url text,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);

-- Enable RLS (Row Level Security)
alter table blogs enable row level security;

-- Policy: Public read-only
create policy "Anyone can read blogs"
  on blogs for select
  using (true);

-- Policy: Only authenticated users can insert/update/delete
create policy "Only authenticated users can manage blogs"
  on blogs for insert
  with check (auth.role() = 'authenticated');

create policy "Only authenticated users can update blogs"
  on blogs for update
  using (auth.role() = 'authenticated');

create policy "Only authenticated users can delete blogs"
  on blogs for delete
  using (auth.role() = 'authenticated');
```

**Buat user admin:**
1. Go to Supabase Dashboard → Authentication → Users
2. Click "Invite" dan buat user baru

### 2. Install Dependencies

```bash
npm install
# atau
bun install
```

### 3. Setup Environment Variables

Copy `.env.example` ke `.env.local` dan isi dengan credentials Supabase:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Development Server

```bash
npm run dev
# atau
bun dev
```

Open [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi.

## 📚 Usage

### Akses Admin Panel
- Go to [http://localhost:3000/login](http://localhost:3000/login)
- Login dengan credentials admin Anda
- Akses: [http://localhost:3000/admin](http://localhost:3000/admin)

### Buat Blog Post
1. Click "Bikin Postingan Baru"
2. Isi form (title, category, image URL, content)
3. Submit → post akan muncul di homepage

### Edit Blog Post
1. Di admin panel, click icon pencil pada post yang ingin diedit
2. Update form dan simpan perubahan

### Delete Blog Post
1. Di admin panel, click icon trash pada post yang ingin dihapus
2. Confirm di dialog

## 🔒 Security Features

- ✅ **Input Validation** - Zod schemas untuk semua forms
- ✅ **Authorization** - Middleware melindungi admin routes
- ✅ **Session Verification** - Check auth sebelum delete/create/update
- ✅ **Error Boundary** - Graceful error handling
- ✅ **RLS Policy** - Database-level security dengan Supabase RLS

Lihat [SECURITY.md](./SECURITY.md) untuk detail keamanan lebih lanjut.

## 🌐 Deployment

### Deploy ke Vercel (Recommended)

1. Push repository ke GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project" → import GitHub repo
4. Add environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
5. Click "Deploy" ✨

[Read more about Vercel deployment](https://vercel.com/docs/frameworks/nextjs)

### Deploy ke Railway / Render

Aplikasi ini juga bisa di-deploy ke Railway, Render, atau platform serverless lainnya yang support Next.js.

## 📁 Project Structure

```
d:\blogpribs/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin pages (protected)
│   ├── auth/              # Authentication routes
│   ├── blog/              # Blog detail pages
│   ├── login/             # Login page
│   └── page.tsx           # Homepage
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── blog-card.tsx      # Blog post card
│   ├── blog-list.tsx      # Blog list dengan pagination
│   └── delete-blog-button.tsx
├── lib/
│   ├── supabase.ts        # Browser Supabase client
│   ├── supabase-server.ts # Server Supabase client
│   ├── validations.ts     # Zod schemas
│   └── utils.ts           # Utility functions
├── hooks/
│   ├── use-mobile.ts      # Mobile breakpoint hook
│   └── use-form-validation.ts # Form validation hook
├── types/
│   └── blog.ts            # TypeScript types
├── middleware.ts          # Next.js middleware (auth guard)
├── next.config.ts         # Next.js configuration
└── tsconfig.json          # TypeScript configuration
```

## 🔧 Available Scripts

```bash
# Development
npm run dev

# Build untuk production
npm run build

# Run production build
npm run start

# Linting & code quality
npm run lint
```

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Zod Validation](https://zod.dev)

## 🤝 Contributing

Contributions are welcome! Feel free untuk:
- Report bugs
- Suggest features
- Submit pull requests

## 📝 License

This project is open source. Silakan gunakan dengan bebas untuk project pribadi atau pembelajaran.

## 👨‍💻 Author

**Rizky Alfito Hadi**
- Portfolio: [ikyalfito.vercel.app](https://ikyalfito.vercel.app)
- GitHub: [@rizkyalfito](https://github.com/rizkyalfito)
- LinkedIn: [Rizky Alfito](https://linkedin.com/in/rizkyalfito)

---

**Made with ❤️ using Next.js 16, TypeScript, and Tailwind CSS**

import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import Image from "next/image"
import { GithubIcon, LinkedinIcon, GlobeIcon, BookIcon, BookImageIcon, BookUp2Icon, BookCheck } from "lucide-react"
import Link from "next/link"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <div className="flex flex-col items-center gap-4">
          {/* Profile Photo */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4">
            <Image
              src="/ppp.jpg"
              alt="Radenfito"
              fill
              className="object-cover"
            />
          </div>
          
          {/* Name */}
          <div className="text-center">
            <h2 className="text-2xl font-bold">Rizky Alfito Hadi</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Fullstack Web Development
            </p>
            <p className="text-muted-foreground text-xs mt-2">
              📍 Bekasi, Jawa Barat, Indonesia
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-6">
        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-6">
          <Link 
            href="https://ikyalfito.vercel.app" 
            target="_blank"
            className="hover:text-primary transition-colors"
          >
            <GlobeIcon className="w-5 h-5" />
          </Link>
          <Link 
            href="https://github.com/rizkyalfito" 
            target="_blank"
            className="hover:text-primary transition-colors"
          >
            <GithubIcon className="w-5 h-5" />
          </Link>
          <Link 
            href="https://linkedin.com/in/rizkyalfito" 
            target="_blank"
            className="hover:text-primary transition-colors"
          >
            <LinkedinIcon className="w-5 h-5" />
          </Link>
          <Link 
            href="https://www.dicoding.com/users/rizkyalfito/academies" 
            target="_blank"
            className="hover:text-primary transition-colors"
          >
            <BookCheck className="w-5 h-5" />
          </Link>
        </div>

        {/* Bio */}
        <div className="mt-6 text-sm text-muted-foreground">
          <p className="text-justify">
            Demen banget ngulik dan bikin pengalaman web yang menarik sekaligus fungsional. Di blog pribadi ini, saya berbagi cerita, insight, dan perjalanan belajar saya seputar dunia web.
          </p>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
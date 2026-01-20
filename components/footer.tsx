export async function Footer(){
  return(
    <footer className="border-t bg-background py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Radenfito. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-line border-t">
      <div className="text-subtle mx-auto flex max-w-[1312px] flex-col gap-4 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <nav aria-label="Footer" className="flex gap-7">
          <a className="link-u hover:text-fg" href={site.github} rel="noopener noreferrer">
            GitHub
          </a>
          <a className="link-u hover:text-fg" href="/colophon">
            Colophon
          </a>
          <a className="link-u hover:text-fg" href="/.well-known/security.txt">
            security.txt
          </a>
        </nav>
      </div>
    </footer>
  );
}

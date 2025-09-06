import SiteLayout from "@/layouts/SiteLayout";

export default function Placeholder({ title, children }: {title: string; children?: React.ReactNode }){
  return (
    <SiteLayout>
      <section className="container py-20">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
          <p className="mt-3 text-muted-foreground">This page is coming next. Tell us to generate it and we’ll build it with the same design system and animations.</p>
          {children}
        </div>
      </section>
    </SiteLayout>
  );
}

export default function ImprintPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid max-w-3xl gap-8 px-4 md:px-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Imprint</h1>
            <p className="text-muted-foreground md:text-xl/relaxed">
              Here you can find our company information and legal disclosures.
            </p>
          </div>
          <div className="grid gap-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Company Information</h2>
              <address className="not-italic text-muted-foreground">
                <div>bekind.now</div>
                <div>Fynn Bauer</div>
                <div>Auf der Kier 30</div>
                <div>53894 Mechernich</div>
                <div>Germany</div>
              </address>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Contact</h2>
              <div className="space-y-1 text-muted-foreground">
                <div>
                  <span className="font-medium">Phone:</span> <a href="">+49 176 63745476</a>
                </div>
                <div>
                  <span className="font-medium">Email:</span> <a href="#">fynnbauer7@icloud.com</a>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Legal Disclosures</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The information on this website is for informational purposes only and is not
                  intended to be a
                  substitute for professional legal advice. If you have any questions or concerns,
                  please consult with a
                  qualified attorney.
                </p>
                <p>
                  This website may contain links to third-party websites. Winterhost is not
                  responsible for the content or
                  privacy practices of these websites.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
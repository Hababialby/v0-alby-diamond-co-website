import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card } from "@/components/ui/card"
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Master Jewelers Since 1990 | Alby Diamond Co.",
  description:
    "Learn about Alby Diamond Co. Founded in 1990 by master jeweler Alexander Alby, we've been creating exceptional custom diamond jewelry for over 30 years. Meet our team of expert jewelers and gemologists.",
  keywords:
    "about Alby Diamond Co, master jeweler, GIA certified gemologist, custom jewelry designer, diamond specialist, jewelry craftsman, fine jewelry experts, diamond district jeweler",
  openGraph: {
    title: "About Alby Diamond Co. - Master Jewelers Since 1990",
    description: "Three decades of exceptional craftsmanship in fine diamonds and luxury jewelry.",
    type: "website",
  },
}

export default function AboutPage() {
  const socialLinks = [
    { name: "Facebook", href: "https://facebook.com", icon: Facebook },
    { name: "Instagram", href: "https://instagram.com", icon: Instagram },
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
    { name: "YouTube", href: "https://youtube.com", icon: Youtube },
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  ]

  const team = [
    {
      name: "Alexander Alby",
      role: "Founder & Master Jeweler",
      bio: "With over 30 years of experience in diamond cutting and jewelry design, Alexander founded Alby Diamond Co. to bring exceptional craftsmanship to discerning clients.",
    },
    {
      name: "Sarah Chen",
      role: "Chief Designer",
      bio: "Sarah brings contemporary vision to our collections, blending modern aesthetics with timeless elegance in every piece she creates.",
    },
    {
      name: "Michael Rodriguez",
      role: "Gemologist",
      bio: "A GIA certified gemologist with 15 years of experience, Michael personally selects and grades every diamond that enters our collection.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 bg-muted/30">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="text-4xl font-light tracking-tight text-foreground sm:text-5xl mb-6 text-balance">
              Our Story
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              For over three decades, Alby Diamond Co. has been dedicated to creating exceptional jewelry that
              celebrates life's most precious moments.
            </p>
          </div>
        </section>

        {/* Story Content */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground leading-relaxed mb-6">
                Founded in 1990 by master jeweler Alexander Alby, Alby Diamond Co. began as a small workshop in the
                heart of the diamond district. What started with a passion for exceptional craftsmanship has grown into
                a renowned destination for fine jewelry and diamonds.
              </p>

              <p className="text-foreground leading-relaxed mb-6">
                Our philosophy is simple: every piece of jewelry should tell a story. Whether it's an engagement ring
                symbolizing eternal love, a necklace marking a milestone, or earrings celebrating everyday elegance, we
                believe that exceptional quality and artistry should be at the heart of every creation.
              </p>

              <p className="text-foreground leading-relaxed mb-6">
                We source only the finest diamonds and gemstones, working directly with trusted suppliers around the
                world. Each stone is carefully selected and graded by our expert gemologists to ensure it meets our
                exacting standards. Our master craftsmen then bring these precious materials to life, combining
                traditional techniques with modern innovation.
              </p>

              <p className="text-foreground leading-relaxed mb-6">
                Today, Alby Diamond Co. serves clients globally through our showroom and our Jewelry18 online
                collection. We remain committed to the values that have guided us from the beginning: integrity,
                excellence, and a dedication to creating jewelry that will be treasured for generations.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl font-light tracking-tight text-foreground mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="p-8 border border-border text-center">
                <h3 className="text-xl font-semibold text-card-foreground mb-4">Exceptional Quality</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We never compromise on quality. Every diamond and gemstone is hand-selected and every piece is crafted
                  to the highest standards.
                </p>
              </Card>

              <Card className="p-8 border border-border text-center">
                <h3 className="text-xl font-semibold text-card-foreground mb-4">Timeless Design</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our designs blend classic elegance with contemporary style, creating pieces that remain beautiful for
                  generations.
                </p>
              </Card>

              <Card className="p-8 border border-border text-center">
                <h3 className="text-xl font-semibold text-card-foreground mb-4">Personal Service</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We believe in building lasting relationships with our clients, offering expert guidance and
                  personalized attention at every step.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl font-light tracking-tight text-foreground mb-12 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {team.map((member) => (
                <Card key={member.name} className="p-6 border border-border">
                  <div className="aspect-square bg-muted mb-4"></div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-1">{member.name}</h3>
                  <p className="text-sm text-accent mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact & Social */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-light tracking-tight text-foreground mb-12 text-center">Connect With Us</h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-12">
              <Card className="p-6 border border-border">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Visit Our Showroom</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        123 Diamond District
                        <br />
                        New York, NY 10036
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-accent" />
                    <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-accent" />
                    <p className="text-sm text-muted-foreground">info@albydiamond.co</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border border-border">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Business Hours</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>10:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>12:00 PM - 5:00 PM</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Social Media Links */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-6">Follow Us on Social Media</h3>
              <div className="flex justify-center gap-6">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-3 border-2 border-border group-hover:border-accent transition-colors">
                        <social.icon className="h-6 w-6 text-foreground group-hover:text-accent transition-colors" />
                      </div>
                      <span className="text-xs text-muted-foreground">{social.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

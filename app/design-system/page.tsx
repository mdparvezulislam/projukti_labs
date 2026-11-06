import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { AccordionItem } from "@/components/ui/accordion";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export const metadata = {
  title: "Design System Showcase | Projukti Labs",
  description: "Preview of core tokens, accessible components, and visual identity.",
  robots: { index: false, follow: false },
};

export default function DesignSystemPreviewPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <Badge variant="accent">Projukti Labs UI v1.0</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
          Design System &amp; Tokens
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl">
          Codified tokens and accessible UI primitives for the Projukti Labs technology studio platform.
        </p>
      </div>

      {/* Color Palette */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-text-primary border-b border-border pb-3">1. Color Palette Tokens</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="rounded-xl border border-border p-4 bg-background">
            <div className="text-xs font-mono text-text-muted">--background</div>
            <div className="text-sm font-semibold text-text-primary mt-1">#09090B</div>
          </div>
          <div className="rounded-xl border border-border p-4 bg-surface">
            <div className="text-xs font-mono text-text-muted">--surface</div>
            <div className="text-sm font-semibold text-text-primary mt-1">#111113</div>
          </div>
          <div className="rounded-xl border border-border p-4 bg-surface-elevated">
            <div className="text-xs font-mono text-text-muted">--surface-elevated</div>
            <div className="text-sm font-semibold text-text-primary mt-1">#18181B</div>
          </div>
          <div className="rounded-xl border border-border p-4 bg-accent text-accent-foreground">
            <div className="text-xs font-mono opacity-80">--accent (CTA)</div>
            <div className="text-sm font-bold mt-1">#FFDF20</div>
          </div>
          <div className="rounded-xl border border-border p-4 bg-surface-elevated text-success">
            <div className="text-xs font-mono opacity-80">--success</div>
            <div className="text-sm font-semibold mt-1">#22C55E</div>
          </div>
          <div className="rounded-xl border border-border p-4 bg-surface-elevated text-info">
            <div className="text-xs font-mono opacity-80">--info</div>
            <div className="text-sm font-semibold mt-1">#818CF8</div>
          </div>
        </div>
      </section>

      {/* Button Variations */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-text-primary border-b border-border pb-3">2. Buttons &amp; Interactive States</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Primary Accent</Button>
          <Button variant="secondary">Secondary Surface</Button>
          <Button variant="outline">Outline Border</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="danger">Destructive Action</Button>
          <Button variant="primary" isLoading>Loading State</Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-text-primary border-b border-border pb-3">3. Status &amp; Category Badges</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="accent">Active Launch Service</Badge>
          <Badge variant="default">Default Surface</Badge>
          <Badge variant="outline">Outline Tag</Badge>
          <Badge variant="success">Verified Delivery</Badge>
          <Badge variant="warning">Coming Soon</Badge>
          <Badge variant="info">Architecture Highlighting</Badge>
        </div>
      </section>

      {/* Cards & Bento Grid Preview */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-text-primary border-b border-border pb-3">4. Cards &amp; Surface Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Zap className="h-6 w-6 text-accent mb-2" />
              <CardTitle>Web Engineering</CardTitle>
              <CardDescription>Custom high-converting marketing sites and modern web applications.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted">Built with Next.js 16 App Router, responsive across 320px to ultrawide.</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" size="sm" className="w-full">Explore Service</Button>
            </CardFooter>
          </Card>

          <Card className="border-accent/40 bg-surface-elevated">
            <CardHeader>
              <ShieldCheck className="h-6 w-6 text-accent mb-2" />
              <CardTitle>E-Commerce Systems</CardTitle>
              <CardDescription>Ready-to-launch digital stores with checkout, cart, and payment gateways.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted">Designed for single-vendor brands and scalable online retail.</p>
            </CardContent>
            <CardFooter>
              <Button variant="primary" size="sm" className="w-full">View Packages</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CheckCircle2 className="h-6 w-6 text-success mb-2" />
              <CardTitle>Technical Care</CardTitle>
              <CardDescription>Ongoing maintenance, bug fixing, database health, and security upgrades.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted">Tiered monthly retainers tailored for critical digital properties.</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" size="sm" className="w-full">View Retainers</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Form Controls */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-text-primary border-b border-border pb-3">5. Form Controls</h2>
        <div className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Project Name</label>
            <Input placeholder="e.g. Modern E-commerce Platform" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Project Brief</label>
            <Textarea placeholder="Describe the scope, objectives, and deliverables..." />
          </div>
        </div>
      </section>

      {/* Accordion / FAQ Preview */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-text-primary border-b border-border pb-3">6. Accordions</h2>
        <div className="max-w-2xl">
          <AccordionItem
            question="What are the 3 launch service categories?"
            answer="Projukti Labs launches strictly with Web Development & Design, E-commerce & Digital Commerce, and Maintenance & Technical Support. Future categories remain Coming Soon."
            isOpenDefault={true}
          />
          <AccordionItem
            question="How is pricing structured?"
            answer="We provide transparent package options ('Starting From' or 'Custom Quote' depending on the agreed scope) without fake discount countdowns or hidden charges."
          />
        </div>
      </section>
    </div>
  );
}

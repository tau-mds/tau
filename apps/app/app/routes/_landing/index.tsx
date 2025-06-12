import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "@tau/ui";

import Zap from '~icons/lucide/zap';
import CheckCircle2 from '~icons/lucide/circle-check-big';
import Twitter from '~icons/lucide/twitter';
import Linkedin from '~icons/lucide/linkedin';
import Github from '~icons/lucide/github';
import Calendar from '~icons/lucide/calendar';
import Clock from '~icons/lucide/clock';
import Users from '~icons/lucide/users';
import UserRoundCheck from '~icons/lucide/user-round-check';
import { ThemeSwitcher } from "~/components/theme-switcher";


export const Route = createFileRoute("/_landing/")({
  component: LandingPage,
});

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col w-full">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between w-full px-8">
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="p-0 h-auto min-w-0">
              <Link to="/app" className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Tau</span>
              </Link>
            </Button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link to="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
              Testimonials
            </Link>
            <Link to="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link to="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button asChild>
              <Link to="/auth/signin">Sign In</Link>
            </Button>
            <ThemeSwitcher/>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="py-20 md:py-28 lg:py-36 w-full">
          <div className="w-full px-8">
            <div className="flex flex-col items-center justify-center w-full text-center">
              <div className="space-y-2 w-full">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight w-full">
                  Effortless Interview Scheduling with Smart Matching
                </h1>
                <p className="max-w-2xl mx-auto text-xl md:text-2xl text-muted-foreground w-full">
                  Automatically match interviewers and candidates based on overlapping availability. Sign in with
                  Magic Link - no passwords required.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center mt-8 w-full">
                <Button size="lg" className="px-8 py-4 text-lg">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center gap-8 text-base justify-center mt-6 w-full">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>14-day free trial</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-surface-2 w-full">
          <div className="w-full px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything you need to boost productivity
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our platform offers powerful tools designed to streamline your workflow and help your team achieve
                  more.
                </p>
              </div>
            </div>
            <div className="mx-auto grid w-full items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-surface-4 bg-surface-1 p-6 shadow-sm">
                <div className="rounded-full bg-accent-3 p-3">
                  <Users className="h-6 w-6 text-accent-11" />
                </div>
                <h3 className="text-xl font-bold">Smart Matching</h3>
                <p className="text-center text-muted-foreground">
                  Automatically match interviewers and candidates based on overlapping availability intervals for
                  seamless scheduling.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-surface-4 bg-surface-1 p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Magic Link Authentication</h3>
                <p className="text-center text-muted-foreground">
                  Simple sign-in process with Magic Link for both interviewers and candidates - no passwords to
                  remember.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-surface-4 bg-surface-1 p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Availability Management</h3>
                <p className="text-center text-muted-foreground">
                  Easy-to-use interface for expressing and managing availability across different time zones.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 w-full">
          <div className="w-full px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Trusted by teams worldwide</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  See what our customers have to say about how StreamLine has transformed their workflow.
                </p>
              </div>
            </div>
            <div className="mx-auto grid w-full gap-6 py-12 lg:grid-cols-2">
              <div className="flex flex-col justify-between rounded-lg border border-surface-4 bg-surface-1 p-6 shadow-sm">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Tau has revolutionized our hiring process. The automatic matching saves us hours of back-and-forth
                    scheduling emails every week.
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <UserRoundCheck className="h-10 w-10 text-primary rounded-full bg-muted p-2" />
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">HR Manager, TechCorp</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border border-surface-4 bg-surface-1 p-6 shadow-sm">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Since using Tau, we've reduced our time-to-hire by 50%. The Magic Link authentication makes it so
                    easy for candidates to participate.
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <UserRoundCheck className="h-10 w-10 text-primary rounded-full bg-muted p-2" />
                  <div>
                    <p className="font-medium">Michael Chen</p>
                    <p className="text-sm text-muted-foreground">Talent Acquisition Lead, GrowthStartup</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border border-surface-4 bg-surface-1 p-6 shadow-sm">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    The automatic matching feature is incredible. No more scheduling conflicts or missed interviews -
                    everything just works seamlessly.
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <UserRoundCheck className="h-10 w-10 text-primary rounded-full bg-muted p-2" />
                  <div>
                    <p className="font-medium">Emily Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Recruiting Director, RemoteWorks</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border border-surface-4 bg-surface-1 p-6 shadow-sm">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Tau's smart scheduling has eliminated the administrative burden of coordinating interviews. Our team
                    can focus on what matters - finding great talent.
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <UserRoundCheck className="h-10 w-10 text-primary rounded-full bg-muted p-2" />
                  <div>
                    <p className="font-medium">David Kim</p>
                    <p className="text-sm text-muted-foreground">VP of Engineering, ScaleUp Inc</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-surface-2 w-full">
          <div className="w-full px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Simple, transparent pricing</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Choose the plan that's right for your team. All plans include a 14-day free trial.
                </p>
              </div>
            </div>
            <div className="mx-auto grid w-full gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="font-bold">Starter</h3>
                  <p className="text-4xl font-bold">$12</p>
                  <p className="text-sm text-muted-foreground">per user/month</p>
                </div>
                <div className="mt-6 space-y-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Up to 10 interviews/month</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Basic availability matching</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Magic Link authentication</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Email notifications</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <Button className="w-full">Get Started</Button>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm relative">
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Professional</h3>
                  <p className="text-4xl font-bold">$24</p>
                  <p className="text-sm text-muted-foreground">per user/month</p>
                </div>
                <div className="mt-6 space-y-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Up to 50 interviews/month</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Advanced matching algorithms</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Calendar integrations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Time zone management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <Button className="w-full">Get Started</Button>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="font-bold">Enterprise</h3>
                  <p className="text-4xl font-bold">$49</p>
                  <p className="text-sm text-muted-foreground">per user/month</p>
                </div>
                <div className="mt-6 space-y-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Unlimited interviews</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Custom matching rules</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>API access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>SSO integration</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <Button className="w-full">Contact Sales</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="py-20 w-full">
          <div className="w-full px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to streamline your interview process?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join hundreds of companies that use Tau to automate interview scheduling and reduce time-to-hire.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="px-8">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="px-8">
                  Schedule a Demo
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">No credit card required. 14-day free trial.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-surface-2 w-full">
        <div className="w-full px-8 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 w-full">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Tau</span>
              </div>
              <p className="text-sm text-muted-foreground">Streamline your workflow, amplify your productivity.</p>
              <div className="flex gap-4">
                <Link to="#" className="text-muted-foreground hover:text-foreground">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link to="#" className="text-muted-foreground hover:text-foreground">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link to="#" className="text-muted-foreground hover:text-foreground">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground w-full">
            <p>© {new Date().getFullYear()} Tau. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

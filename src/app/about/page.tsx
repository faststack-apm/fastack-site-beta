"use client";

import { FadeInSection } from "@/components/FadeInSection/FadeInSection";
import { Mail, Github, Twitter, MapPin, Linkedin, Heart, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-32 px-6 bg-transparent relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />

      <div className="max-w-5xl mx-auto z-10 relative">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-24">
          <FadeInSection delay={100}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold">
              <Heart className="w-4 h-4" />
              <span>Built by Developers, for Developers</span>
            </div>
          </FadeInSection>
          <FadeInSection delay={200}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              Unifying the <span className="text-gradient">Observer's</span> Experience
            </h1>
          </FadeInSection>
          <FadeInSection delay={300}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We started Fast Stack with a simple goal: to break down the walls between logs, metrics, and traces.
              We believe observability shouldn't be a chore—it should be an intuitive, AI-driven partnership.
            </p>
          </FadeInSection>
        </div>



        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
          <FadeInSection delay={200}>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To eliminate the "detective work" of modern software engineering. We build intelligent, cost-effective observability tools that speak the language of modern architectures, ensuring developers spend their time shipping code, not chasing ghosts.
              </p>

              <Link
                href="/blog/concept-to-implementation"
                className="inline-flex items-center gap-2 text-blue-400 font-bold hover:underline"
              >
                Read about our technical journey
                <Zap className="w-4 h-4" />
              </Link>
            </div>
          </FadeInSection>
          <FadeInSection delay={400}>
            <div className="glass-panel p-1 border-white/5 relative group bg-gradient-to-br from-blue-500/10 to-indigo-500/10 h-80 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-500" />
              <div className="z-10 text-center space-y-2">
                <p className="text-4xl font-bold text-gradient">2026</p>
                <p className="text-muted-foreground uppercase tracking-widest text-sm font-semibold">Launch Year</p>
              </div>
            </div>
          </FadeInSection>
        </div>

        {/* Narrative Section */}
        <div className="mb-32 max-w-4xl mx-auto text-left">
          <FadeInSection delay={200}>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Why We’re Here</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We didn’t start Fast Stack because the world needed another dashboard. We started it because we were tired of them.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                After a <span className="font-bold text-foreground">combined 40 years in the trenches</span>—scaling distributed systems, surviving 3 AM on-call rotations, and wrestling with &quot;enterprise&quot; tools that felt like they were built in the 90s—we knew there had to be a better way. The &quot;standard&quot; approach to application management is broken: it’s too expensive, too manual, and too slow.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We decided to build the solution we actually wanted to use. A platform that doesn’t just store your data, but understands it.
              </p>
            </div>
          </FadeInSection>
        </div>



        {/* Intelligence Engine Section */}
        <div className="mb-32 max-w-4xl mx-auto text-left">
          <FadeInSection delay={200}>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">The 40-Year Intelligence Engine</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We took our decades of experience—the hard-won lessons from thousands of outages and scaling bottlenecks—and distilled them into a <span className="font-bold text-foreground">custom-trained AI model</span>. This isn&apos;t a generic chatbot; it&apos;s an engine optimized specifically for application performance. It performs the heavy lifting of correlation and analysis in milliseconds, doing the work that used to take a senior engineer an hour of manual log-diving.
              </p>
            </div>
          </FadeInSection>
        </div>

        {/* Onboarding Section */}
        <div className="mb-32 max-w-4xl mx-auto text-left">
          <FadeInSection delay={200}>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">We Hate Onboarding as Much as You Do</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Typical observability tools require a PhD and three weeks of configuration just to see a &quot;Hello World&quot; trace. We&apos;ve replaced the manual slog with a <span className="font-bold text-foreground">guided, automated experience</span>. Fast Stack is designed to meet you where you are, minimizing &quot;to-do&quot; lists and maximizing &quot;aha&quot; moments. From OTel ingestion to AI insights, we&apos;ve automated the friction out of the process.
              </p>
            </div>
          </FadeInSection>
        </div>

        {/* Core Principles Section */}
        <div className="mb-32 max-w-4xl mx-auto text-left">
          <FadeInSection delay={200}>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Core Principles</h2>
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  <span className="font-bold text-foreground text-xl block mb-1">Work Smarter, Not Harder:</span>
                  If a machine can find the root cause, an engineer shouldn&apos;t have to. We focus on high-leverage insights that actually move the needle.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  <span className="font-bold text-foreground text-xl block mb-1">Modern-First Architecture:</span>
                  We aren&apos;t pivoting a legacy product to the cloud. We built Fast Stack from the ground up for microservices, gRPC, and distributed scale.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  <span className="font-bold text-foreground text-xl block mb-1">Developer-Obsessed:</span>
                  Our roadmap isn&apos;t dictated by a boardroom; it&apos;s driven by the community. We build based on the feedback of the people actually writing the code.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  <span className="font-bold text-foreground text-xl block mb-1">Cost-Effective Intelligence:</span>
                  Scalability shouldn&apos;t be a luxury. We provide elite-level observability at a price point that makes sense for growing teams.
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>

        {/* Final Vision Section */}
        <div className="mb-32 max-w-4xl mx-auto text-left">
          <FadeInSection delay={200}>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">The Future is Fast.</h2>
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We are on a mission to create the most intuitive, effective, and community-driven observability suite on the planet. We believe that when you empower developers with better data and smarter tools, you build better software.
                </p>
                <p className="text-2xl font-bold text-gradient leading-relaxed text-center w-full pt-8 px-4">
                  We are Fast Stack. Let&apos;s build something stable together.
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>

        <FadeInSection delay={200}>


          <div className="glass-panel p-12 border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/5 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                  <p className="text-muted-foreground text-lg">
                    Have questions about the Alpha? Just want to talk observability?
                    We're always open for a conversation.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-muted-foreground hover:text-blue-400 transition-colors cursor-pointer group/item">
                    <div className="p-3 bg-blue-500/10 rounded-lg group-hover/item:scale-110 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span>hello@fastack.cloud</span>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground hover:text-blue-400 transition-colors cursor-pointer group/item">
                    <div className="p-3 bg-blue-500/10 rounded-lg group-hover/item:scale-110 transition-transform">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span>San Francisco, CA</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <Link href="#" className="p-2 text-muted-foreground hover:text-blue-400 transition-colors">
                    <Twitter className="w-6 h-6" />
                  </Link>
                  <Link href="#" className="p-2 text-muted-foreground hover:text-blue-400 transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </Link>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center text-center space-y-6 md:border-l md:border-white/5">
                <h3 className="text-xl font-bold">Join the Alpha</h3>
                <p className="text-muted-foreground">
                  Experience the next generation of application analytics today.
                </p>
                <Link
                  href="/#newsletter"
                  className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all hover:scale-105 active:scale-95"
                >
                  Join Now
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </main>
  );
}

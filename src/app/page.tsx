"use client";
import Image from "next/image";


import { useState } from "react";
import { Rocket, Box, Code2, Layout, Zap, Mail, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { FadeInSection } from "@/components/FadeInSection/FadeInSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";

interface NewsletterSignupPayload {
  name: string;
  orgName: string;
  email: string;
  comments?: string;
}

const subscribeNewsletter = async (payload: NewsletterSignupPayload) => {
  const apiBase = process.env.CONTACT_API_ENDPONT ?? "http://localhost:8080";
  const res = await fetch(`${apiBase}/api/newsletter/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed with status ${res.status}`);
  }
};

export default function Page() {
  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");

  // TanStack Query Mutation for handling the signup lifecycle
  const signupMutation = useMutation({
    mutationFn: subscribeNewsletter,
    onSuccess: () => {
      setName("");
      setOrgName("");
      setEmail("");
      setComments("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && orgName && email) {
      signupMutation.mutate({ name, orgName, email, comments });
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 pt-24 bg-transparent relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />

      <div className="max-w-4xl w-full z-10 flex flex-col items-center text-center space-y-8">
        <FadeInSection delay={100}>
          <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 animate-pulse">
            <Rocket className="w-12 h-12 text-blue-400" />
          </div>
        </FadeInSection>

        <div className="space-y-4">
          <FadeInSection delay={300}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              <span className="text-gradient">Fast Stack</span>
              <br />
              Next Generation Application Analytics
            </h1>
          </FadeInSection>
          <FadeInSection delay={500}>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Unify your raw metrics data with AI for powerful insights, uptime monitoring, and predictive analysis. Built by developers, for developers.
            </p>
          </FadeInSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12 border-b border-white/5 pb-20">
          <FadeInSection delay={600} className="h-full">
            <Link href="#alice" className="glass-panel p-6 flex flex-col items-center text-center space-y-3 h-full hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group/card border-transparent hover:border-primary/20">
              <div className="p-3 bg-blue-500/10 rounded-xl group-hover/card:bg-blue-500/20 transition-colors">
                <Box className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-bold text-lg text-foreground group-hover/card:text-blue-400 transition-colors">Meet Alice</h3>
              <p className="text-sm text-muted-foreground">Experience the power of our proactive AI assistant. Alice monitors your infrastructure 24/7, identifying anomalies before they become incidents and providing clear, actionable insights in plain, natural language.</p>
            </Link>
          </FadeInSection>

          <FadeInSection delay={700} className="h-full">
            <Link href="#otel" className="glass-panel p-6 flex flex-col items-center text-center space-y-3 h-full hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group/card border-transparent hover:border-primary/20">
              <div className="p-3 bg-cyan-500/10 rounded-xl group-hover/card:bg-cyan-500/20 transition-colors">
                <Code2 className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="font-bold text-lg text-foreground group-hover/card:text-cyan-400 transition-colors">OpenTelemetry (OTEL) Based</h3>
              <p className="text-sm text-muted-foreground">Built on the industry standard for observability. Seamlessly integrate with your existing stacks using vendor-neutral APIs. Collect, process, and export telemetry data with zero lock-in and maximum flexibility.</p>
            </Link>
          </FadeInSection>

          <FadeInSection delay={800} className="h-full">
            <Link href="#coverage" className="glass-panel p-6 flex flex-col items-center text-center space-y-3 h-full hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group/card border-transparent hover:border-primary/20">
              <div className="p-3 bg-indigo-500/10 rounded-xl group-hover/card:bg-indigo-500/20 transition-colors">
                <Zap className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="font-bold text-lg text-foreground group-hover/card:text-indigo-400 transition-colors">End to End Coverage</h3>
              <p className="text-sm text-muted-foreground">From frontend performance to backend database latencies, get a total bird's-eye view of your entire application lifecycle. Track every request, every log, and every metric across your entire distributed architecture.</p>
            </Link>
          </FadeInSection>


        </div>

        {/** Meet Alice Section */}
        <FadeInSection delay={200}>
          <div id="alice" className="mt-20 flex flex-col items-start text-left space-y-4 max-w-2xl w-full mx-auto scroll-mt-24">
            <h2 className="text-2xl font-bold">Meet Alice</h2>
            <div className="w-full flex justify-center py-4">
              <Image src="/alice-hero.png" alt="Alice Hero" width={300} height={300} className="rounded-2xl shadow-2xl shadow-blue-500/20" />
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Experience the power of our proactive AI assistant. Alice monitors your infrastructure 24/7,
              identifying anomalies before they become incidents and providing clear, actionable insights
              in plain, natural language.
            </p>
          </div>
        </FadeInSection>

        {/** OTEL Section */}
        <FadeInSection delay={200}>
          <div id="otel" className="mt-20 flex flex-col items-start text-left space-y-4 max-w-2xl w-full mx-auto scroll-mt-24 border-t border-white/5 pt-20">
            <h2 className="text-2xl font-bold">OpenTelemetry (OTEL) Based</h2>
            <div className="w-full flex justify-center py-4">
              <Image src="/otel-overview.png" alt="OpenTelemetry Overview" width={600} height={400} className="rounded-2xl shadow-2xl shadow-cyan-500/10" />
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Built on the industry standard for observability. Seamlessly integrate with your
              existing stacks using vendor-neutral APIs. Collect, process, and export telemetry
              data with zero lock-in and maximum flexibility.
            </p>
          </div>
        </FadeInSection>

        {/** Coverage Section */}
        <FadeInSection delay={200}>
          <div id="coverage" className="mt-20 flex flex-col items-start text-left space-y-4 max-w-2xl w-full mx-auto scroll-mt-24 border-t border-white/5 pt-20">
            <h2 className="text-2xl font-bold">End to End Coverage</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              From frontend performance to backend database latencies, get a total bird&apos;s-eye
              view of your entire application lifecycle. Track every request, every log, and
              every metric across your entire distributed architecture.
            </p>
          </div>
        </FadeInSection>

        {/** Newsletter Section */}
        <FadeInSection delay={400}>
          <div id="newsletter" className="mt-32 glass-panel p-10 max-w-2xl w-full mx-auto space-y-6 relative overflow-hidden group scroll-mt-24">

            {/* Subtle radial glow background */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-3 bg-blue-500/10 rounded-full">
                <Mail className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold">Join the Alpha Program</h2>
              <p className="text-muted-foreground text-lg">
                Get early access to the next generation of application analytics.
                Zero spam, just progress updates and early access links.
              </p>
            </div>

            {signupMutation.isSuccess ? (
              <div className="flex flex-col items-center space-y-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Welcome to the future of data.</h3>
                  <p className="text-muted-foreground">You'll be the first to know when we launch the beta.</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => signupMutation.reset()}
                  className="mt-4"
                >
                  Sign up another?
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg mx-auto w-full pt-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={signupMutation.isPending}
                    className="h-12 bg-background/50 border-white/10 hover:border-primary/50 transition-colors pl-4"
                  />
                  <Input
                    type="text"
                    placeholder="Organization name"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    required
                    disabled={signupMutation.isPending}
                    className="h-12 bg-background/50 border-white/10 hover:border-primary/50 transition-colors pl-4"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Textarea
                    placeholder="Any comments or questions? (optional)"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    disabled={signupMutation.isPending}
                    maxLength={1000}
                    rows={3}
                    className="bg-background/50 border-white/10 hover:border-primary/50 transition-colors pl-4 resize-none"
                  />
                  <p className={`text-xs text-right ${comments.length > 1000 ? "text-red-400" : "text-muted-foreground"}`}>
                    {comments.length} / 1000
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={signupMutation.isPending}
                    className="h-12 bg-background/50 border-white/10 hover:border-primary/50 transition-colors pl-4 flex-1"
                  />
                  <Button
                    type="submit"
                    disabled={signupMutation.isPending || !name || !orgName || !email}
                    className="h-12 px-8 bg-blue-500 hover:bg-blue-600 text-white font-bold transition-all relative overflow-hidden group/btn"
                  >
                    {signupMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Securing Spot...
                      </>
                    ) : (
                      "Join Now"
                    )}
                  </Button>
                </div>
              </form>
            )}

            {signupMutation.isError && (
              <p className="text-red-400 text-sm mt-2 text-center">
                {(signupMutation.error as Error)?.message || "Something went wrong. Please try again."}
              </p>
            )}
          </div>
        </FadeInSection>

        <FadeInSection delay={500}>
          <div className="mt-12 flex flex-col items-center space-y-4">
            <div className="text-sm font-medium px-4 py-2 bg-muted/30 rounded-full border border-border/50 text-muted-foreground">
              Start by editing <code className="text-blue-400">src/app/page.tsx</code>
            </div>
          </div>
        </FadeInSection>
      </div>
    </main>
  );
}


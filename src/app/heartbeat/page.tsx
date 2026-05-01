export default function HeartbeatPage() {
  const apiEndpoint = process.env.NEXT_PUBLIC_CONTACT_API_ENDPOINT;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-transparent relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />

      <div className="max-w-2xl w-full z-10">
        <div className="glass-panel p-8 space-y-6 relative overflow-hidden">
          <h1 className="text-3xl font-bold text-center border-b border-white/5 pb-4">
            System Heartbeat
          </h1>
          
          <div className="bg-background/50 p-6 rounded-xl border border-white/10 font-mono text-sm sm:text-base shadow-inner">
            <div className="flex flex-col space-y-4">
              <div>
                <span className="text-muted-foreground block mb-1 text-xs uppercase tracking-wider">Variable Name</span>
                <span className="text-cyan-400 break-all">NEXT_PUBLIC_CONTACT_API_ENDPOINT</span>
              </div>
              
              <div className="h-px w-full bg-white/5" />
              
              <div>
                <span className="text-muted-foreground block mb-1 text-xs uppercase tracking-wider">Current Value</span>
                {apiEndpoint ? (
                  <span className="text-emerald-400 break-all">{apiEndpoint}</span>
                ) : (
                  <span className="text-amber-400 italic">undefined</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

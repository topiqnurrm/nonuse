import { Loader2 } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { loginAction } from "@/actions/login";
import { Button } from "@/components/ui/button";
import {
Card,
CardContent,
CardDescription,
CardFooter,
CardHeader,
CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
const [state, formAction, isPending] = useActionState(loginAction, {
success: false,
message: "",
});

useEffect(() => {
if (state.message !== "") {
if (state.success) {
toast.success(state.message);
} else {
toast.error(state.message);
}
}
}, [state]);

return (
<div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden p-4">
  {/* Multi-layer gradient background */}
  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
  <div className="absolute inset-0 bg-gradient-to-tl from-indigo-900/50 via-transparent to-pink-900/50"></div>
  <div className="absolute inset-0 bg-gradient-to-tr from-purple-800/30 via-transparent to-blue-900/30"></div>
  
  {/* Subtle animated background elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
    <div className="absolute bottom-3/4 right-3/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
  </div>
  
  {/* Subtle grid pattern overlay */}
  <div className="absolute inset-0 opacity-5">
    <div className="absolute inset-0" style={{
      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
      backgroundSize: '50px 50px'
    }}></div>
  </div>

  {/* Enhanced glassmorphism card */}
  <Card className="w-full max-w-md relative backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl overflow-hidden z-10">
    {/* Card gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent pointer-events-none rounded-3xl"></div>
    <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none rounded-3xl"></div>
    
    <CardHeader className="relative z-10 text-center pb-8 pt-8">
      {/* Modern logo/icon */}
      <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-400/80 to-pink-500/80 rounded-3xl flex items-center justify-center mb-6 shadow-xl backdrop-blur-sm border border-white/20">
        <div className="w-10 h-10 bg-white/90 rounded-2xl shadow-inner"></div>
      </div>
      
      <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-2">
        Welcome Back
      </CardTitle>
      <CardDescription className="text-white/70 text-lg">
        Sign in to continue your journey
      </CardDescription>
    </CardHeader>

    <CardContent className="relative z-10 px-8">
      <form id="login" action={formAction}>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/90 font-medium text-sm">
              Email Address
            </Label>
            <div className="relative group">
              <Input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-2xl text-white placeholder:text-white/60 focus:bg-white/10 focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/30 transition-all duration-300 backdrop-blur-sm"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/90 font-medium text-sm">
              Password
            </Label>
            <div className="relative group">
              <Input
                name="password"
                type="password"
                placeholder="••••••••••"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-2xl text-white placeholder:text-white/60 focus:bg-white/10 focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/30 transition-all duration-300 backdrop-blur-sm"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </form>
    </CardContent>

    <CardFooter className="relative z-10 px-8 pb-8 pt-4">
      <Button
        type="submit"
        form="login"
        className="w-full py-3 bg-gradient-to-r from-purple-500/90 to-pink-500/90 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-purple-500/20 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none backdrop-blur-sm border border-white/10"
        disabled={isPending}
      >
        <div className="flex items-center justify-center gap-2">
          {isPending && <Loader2 className="w-5 h-5 animate-spin" />}
          <span className="text-lg">
            {isPending ? "Signing In..." : "Sign In"}
          </span>
        </div>
      </Button>

      {/* Subtle decorative elements */}
      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-purple-400/20 rounded-full"></div>
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-400/20 rounded-full"></div>
      <div className="absolute top-1/2 -left-2 w-2 h-2 bg-indigo-400/30 rounded-full"></div>
    </CardFooter>

    {/* Enhanced bottom accent */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
  </Card>
</div>
);
}
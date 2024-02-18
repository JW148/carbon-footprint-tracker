import LoginForm from "@/app/ui/login/login-form";
import Logo from "@/app/ui/login/logo";

export const metadata = {
  title: "MDC | Login",
  description: "MDC Carbon Footprint Tracker",
};

export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-red-700 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <Logo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}

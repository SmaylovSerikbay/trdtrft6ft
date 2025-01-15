"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin/brands");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Неверный email или пароль");
      } else {
        const returnUrl = searchParams.get("from") || "/admin/brands";
        toast.success("Успешный вход");
        router.push(returnUrl);
        router.refresh();
      }
    } catch (error) {
      toast.error("Произошла ошибка при входе");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Пароль
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 px-4 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50"
      >
        {isLoading ? "Вход..." : "Войти"}
      </button>
    </form>
  );
} 
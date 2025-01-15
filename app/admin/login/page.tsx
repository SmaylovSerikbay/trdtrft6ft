"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (result?.error) {
        setError("Неверный email или пароль");
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (error) {
      setError("Произошла ошибка при входе");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <div>
          <h2 className="text-center text-3xl font-bold">Вход в админ-панель</h2>
        </div>
        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-500">
            {error}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Пароль
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Пароль"
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Вход..." : "Войти"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 
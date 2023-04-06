import { AuthContext } from "@/contexts/AuthContext";
import { Inter } from "@next/font/google";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

  const handleSignIn = (data) => {
    signIn(data);
  };

  return (
    <main>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <input {...register("email")} name="email" type="email" />
        <input {...register("password")} name="password" type="password" />
        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}

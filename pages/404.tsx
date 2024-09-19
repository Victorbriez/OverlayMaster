import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";

import DefaultLayout from "@/layouts/default";

export default function Custom404() {
  const router = useRouter();

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">404 - Page Non Trouvée</h1>
        <p className="mb-4">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été
          déplacée.
        </p>
        <Button color="secondary" size="md" onClick={() => router.push("/")}>
          Retour à la page d&apos;accueil
        </Button>
      </div>
    </DefaultLayout>
  );
}

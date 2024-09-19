import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";

import { DiscordIcon } from "./icons";
import { title } from "./primitives";

import DefaultLayout from "@/layouts/default";

export const SessionUnauthenticated = () => {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Accès Restreint</h1>
          <p className="my-4">
            Vous devez être connecté pour accéder à cette page.
          </p>
          <Button
            color="secondary"
            startContent={<DiscordIcon />}
            variant="flat"
            onClick={async () => {
              await signIn("discord");
            }}
          >
            Connexion
          </Button>
        </div>
      </section>
    </DefaultLayout>
  );
};

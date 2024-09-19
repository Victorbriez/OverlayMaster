import { CircularProgress } from "@nextui-org/react";

import DefaultLayout from "@/layouts/default";

export const SessionLoading = () => {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <CircularProgress color="secondary" label="Chargement..." size="lg" />
        </div>
      </section>
    </DefaultLayout>
  );
};

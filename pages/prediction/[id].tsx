import { useRouter } from "next/router";
import { CircularProgress } from "@nextui-org/react";

import { PredictionComponent } from "@/components/Prediction/PredictionComponent";

export default function PredictionPage() {
  const router = useRouter();

  const {
    id,
    name,
    color_bg_header,
    color_text_header,
    color_bg_body,
    color_bg_left,
    color_bg_right,
    color_text_options_body,
    color_text_results_body,
    color_bg_footer,
    color_text_footer,
    direction,
  } = router.query;

  if (!router.isReady) {
    return (
      <CircularProgress color="secondary" label="Chargement..." size="lg" />
    );
  }

  const prediction = {
    id: Number(id),
    name: name as string,
    color_bg_header: color_bg_header as string,
    color_text_header: color_text_header as string,
    color_bg_body: color_bg_body as string,
    color_bg_left: color_bg_left as string,
    color_bg_right: color_bg_right as string,
    color_text_options_body: color_text_options_body as string,
    color_text_results_body: color_text_results_body as string,
    color_bg_footer: color_bg_footer as string,
    color_text_footer: color_text_footer as string,
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <PredictionComponent
        direction={direction as string}
        prediction={prediction}
      />
    </div>
  );
}

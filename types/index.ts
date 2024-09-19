import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface PredictionInterface {
  id: number;
  name: string;
  color_bg_header: string;
  color_text_header: string;
  color_bg_body: string;
  color_bg_left: string;
  color_bg_right: string;
  color_text_options_body: string;
  color_text_results_body: string;
  color_bg_footer: string;
  color_text_footer: string;
}

export interface PredictionCardProps {
  prediction: PredictionInterface;
  onPredictionUpdate: (updatedPrediction: PredictionInterface) => void;
}

export interface PredictionComponentProps {
  prediction: PredictionInterface;
  direction: string;
}

export interface PredictionEditModalProps {
  prediction: PredictionInterface;
  onSave: (prediction: PredictionInterface) => void;
}

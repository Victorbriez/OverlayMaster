import React from "react";

import { PredictionComponentOverviewProps } from "@/types";

const ProgressBar: React.FC<{ width: number; color: string }> = ({
  width,
  color,
}) => (
  <div
    className="h-full"
    style={{
      width: `${width}%`,
      backgroundColor: color,
    }}
  />
);

interface StatItemProps {
  label: string;
  value: string;
  color: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, color }) => (
  <div className="text-center">
    <p className="text-sm font-bold">{label}</p>
    <p className="text-lg font-bold" style={{ color }}>
      {value}
    </p>
  </div>
);

interface OptionProps {
  label: string;
  percentage: number;
  total: string;
  color: string;
  bgColor: string;
}

const Option: React.FC<OptionProps> = ({
  label,
  percentage,
  total,
  color,
  bgColor,
}) => (
  <div className="mb-4">
    <div className="flex items-center justify-between font-bold">
      <span style={{ color }}>{label}</span>
    </div>
    <div className="relative h-6 w-full rounded-lg overflow-hidden flex">
      <ProgressBar color={bgColor} width={percentage} />
    </div>
    <div className="flex items-center justify-between text-sm font-bold">
      <span>{`${percentage}% - ${total}`}</span>
    </div>
  </div>
);

export const PredictionComponentOverview: React.FC<
  PredictionComponentOverviewProps
> = ({ prediction, direction }) => {
  const options = [
    { label: "BLEU", percentage: 7.98, total: "2.7k" },
    { label: "Violet", percentage: 9.1, total: "3.6k" },
    { label: "Or", percentage: 82.91, total: "15.6k" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto rounded-lg shadow-lg overflow-hidden">
      <div
        className="text-center py-4 px-4"
        style={{
          backgroundColor: prediction.color_bg_header,
          color: prediction.color_text_header,
        }}
      >
        <h1 className="text-2xl font-bold">
          De quelle couleur sera l&apos;alpha pack ?
        </h1>
      </div>

      <div
        className="py-6 px-4"
        style={{
          backgroundColor: prediction.color_bg_body,
        }}
      >
        {direction === "vertical" ? (
          options.map((option) => (
            <Option
              key={option.label}
              bgColor={prediction.color_bg_left}
              color={prediction.color_text_options_body}
              label={option.label}
              percentage={option.percentage}
              total={option.total}
            />
          ))
        ) : (
          <>
            <div className="flex items-center justify-between font-bold">
              <span style={{ color: prediction.color_text_options_body }}>
                Violet
              </span>
              <span style={{ color: prediction.color_text_results_body }}>
                Bleu
              </span>
            </div>
            <div className="relative h-6 w-full rounded-lg overflow-hidden flex">
              <ProgressBar color={prediction.color_bg_left} width={60} />
              <ProgressBar color={prediction.color_bg_right} width={40} />
            </div>
            <div className="flex items-center justify-between text-sm font-bold">
              <span style={{ color: prediction.color_text_options_body }}>
                60% - 6.6k
              </span>
              <span style={{ color: prediction.color_text_results_body }}>
                40% - 13.4k
              </span>
            </div>
          </>
        )}
      </div>

      <div
        className="flex justify-between items-center px-6 py-4"
        style={{
          backgroundColor: prediction.color_bg_footer,
          color: prediction.color_text_footer,
        }}
      >
        <StatItem
          color={prediction.color_text_footer}
          label="Participants"
          value="714"
        />
        <StatItem
          color={prediction.color_text_footer}
          label="Temps restant"
          value="31 min 07 s"
        />
        <StatItem
          color={prediction.color_text_footer}
          label="Total"
          value="20.1K"
        />
      </div>
    </div>
  );
};

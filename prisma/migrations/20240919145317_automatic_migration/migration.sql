/*
  Warnings:

  - You are about to drop the `PollOverlay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PredictionOverlay` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `PollOverlay`;

-- DropTable
DROP TABLE `PredictionOverlay`;

-- CreateTable
CREATE TABLE `Prediction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `color_bg_header` VARCHAR(7) NOT NULL,
    `color_text_header` VARCHAR(7) NOT NULL,
    `color_bg_body` VARCHAR(7) NOT NULL,
    `color_bg_left` VARCHAR(7) NOT NULL,
    `color_bg_right` VARCHAR(7) NOT NULL,
    `color_text_options_body` VARCHAR(7) NOT NULL,
    `color_text_results_body` VARCHAR(7) NOT NULL,
    `color_bg_footer` VARCHAR(7) NOT NULL,
    `color_text_footer` VARCHAR(7) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Poll` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `color_bg_header` VARCHAR(7) NOT NULL,
    `color_text_header` VARCHAR(7) NOT NULL,
    `color_bg_body` VARCHAR(7) NOT NULL,
    `color_bg_left` VARCHAR(7) NOT NULL,
    `color_bg_right` VARCHAR(7) NOT NULL,
    `color_text_options_body` VARCHAR(7) NOT NULL,
    `color_text_results_body` VARCHAR(7) NOT NULL,
    `color_bg_footer` VARCHAR(7) NOT NULL,
    `color_text_footer` VARCHAR(7) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

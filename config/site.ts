export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "OverlayMaster",
  description:
    "Transformer chaque stream en une expérience unique grâce à des overlays dynamiques et facilement personnalisables.",
  navItems: [
    {
      label: "Accueil",
      href: "/",
    },
    {
      label: "Prédiction",
      href: "/prediction",
    },
    {
      label: "Sondage",
      href: "/poll",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://www.twitch.tv/",
    twitter: "https://www.twitch.tv/",
    docs: "https://www.twitch.tv/",
    discord: "https://www.twitch.tv/",
    sponsor: "https://www.twitch.tv/",
  },
};

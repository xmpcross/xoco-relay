export const categories = [
  "Devices",
  "Apps & Tools",
  "Platforms",
  "Security",
  "Robotics",
  "Culture",
] as const;

export type Category = (typeof categories)[number];

/**
 * Controls how each category page presents its posts:
 * - "featured": a large lead story followed by a card grid
 * - "grid": the standard card grid
 * - "list": one image-led editorial row per post
 */
export type CategoryLayout = "featured" | "grid" | "list";

export const categoryLayouts: Record<Category, CategoryLayout> = {
  Devices: "featured",
  "Apps & Tools": "grid",
  Platforms: "list",
  Security: "list",
  Robotics: "featured",
  Culture: "grid",
};

export const categorySlug = (category: Category) =>
  category
    .toLowerCase()
    .replace(/\s*&\s*/g, "-")
    .replace(/\s+/g, "-");

export const categoryMeta: Record<Category, { description: string }> = {
  Devices: {
    description:
      "Phones, wearables, and the hardware decisions that decide how a product feels in the hand.",
  },
  "Apps & Tools": {
    description:
      "The software people actually keep open all day, and what its design says about how we work.",
  },
  Platforms: {
    description:
      "Networks, runtimes, and the invisible infrastructure that decides whether anything loads.",
  },
  Security: {
    description:
      "Authentication, privacy, surveillance, and the trade-offs behind everyday digital safety.",
  },
  Robotics: {
    description:
      "Machines that move: humanoids, factory arms, drones, and the software that steers them.",
  },
  Culture: {
    description:
      "How technology teams talk, gather, argue, and write — the human side of building things.",
  },
};

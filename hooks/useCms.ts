import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export type CmsImage = { src: string; slug: string };

export type PetToysContent = {
  title: string;
  description: string;
  features: string[];
  button_text: string;
  button_link: string;
  images: CmsImage[];
};

export type FoodContent = {
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
  button_text: string;
  button_link: string;
  image: string;
};

export type WhyChooseFeature = {
  title: string;
  description: string;
};

export type WhyChooseContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  features: WhyChooseFeature[];
};

export type BannerContent = {
  image: string;
  link: string;
};




export type AboutImage = {
  key: string;
  src: string;
};

export type AboutStat = {
  value: string;
  label: string;
};

export type AboutTeamMember = {
  name: string;
  role: string;
  image: string;
};

export type AboutContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  stats: AboutStat[];
  mission: {
    eyebrow: string;
    title: string;
    description_one: string;
    description_two: string;
    button_text: string;
    button_link: string;
  };
  team: {
    eyebrow: string;
    title: string;
    members: AboutTeamMember[];
  };
  images: AboutImage[];
};


export type HeroFeature = {
  line_one: string;
  line_two: string;
  icon: "shield" | "heart" | "paw" | "truck";
};

export type HeroContent = {
  badge_text: string;
  title_line_one: string;
  title_line_two: string;
  title_highlight: string;
  tagline: string;
  button_text: string;
  button_link: string;
  image: string;
  features: HeroFeature[];
};



export type CategoryItem = { name: string; slug: string; image: string; count?: number };
export type CategoryContent = {
  title: string;
  subtitle: string;
  categories: CategoryItem[];
};

type CmsResponse<T> = { status: boolean; data: { key: string; content: T } };

export function useCmsSection<T = any>(key: string) {
  return useQuery<CmsResponse<T>>({
    queryKey: ["cms", key],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/cms/${key}`);
      return data;
    },
    enabled: !!key,
  });
}

/**
 * Save CMS section. `payload` can be:
 *   - plain object (JSON)
 *   - FormData (for image uploads)
 */
export function useUpdateCmsSection<T = any>(key: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: T | FormData) => {
      const isForm = payload instanceof FormData;
      const { data } = isForm
        ? await axiosInstance.post(`/admin/cms/${key}`, payload, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await axiosInstance.post(`/admin/cms/${key}`, { content: payload });
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", key] });
    },
  });
}

import { EMAIL, GITHUB_PAGE } from "@/constants";
import useSettingStore from "@/store/settingStore";

import { Iconify } from "@/components/Icon";
import { Github, Mail } from "lucide-react";

type SocialMedia = {
  icon: React.ReactNode;
  label: string;
  link: string;
};

export const useSocialMediaList = (): SocialMedia[] => {
  const { themeMode } = useSettingStore();
  return [
    {
      icon:
        themeMode === "light" ? (
          <Iconify icon="skill-icons:github-light" size={20} />
        ) : (
          <Iconify icon="skill-icons:github-dark" size={20} />
        ),
      label: "Github",
      link: GITHUB_PAGE,
    },
    {
      icon:
        themeMode === "light" ? (
          <Iconify icon="skill-icons:gmail-light" size={20} />
        ) : (
          <Iconify icon="skill-icons:gmail-dark" size={20} />
        ),
      label: "Gmail",
      link: `mailto:${EMAIL}`,
    },
  ];
};

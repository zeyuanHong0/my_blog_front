import { EMAIL, GITHUB_PAGE } from "@/constants";

import { Iconify } from "@/components/Icon";

export const socialMediaList: {
  icon: React.ReactNode;
  label: string;
  link: string;
}[] = [
  {
    icon: <Iconify icon="akar-icons:github-fill" size={20} />,
    label: "Github",
    link: GITHUB_PAGE,
  },
  {
    icon: (
      <>
        <Iconify icon="logos:google-gmail" size={20} />
      </>
    ),
    label: "Gmail",
    link: `mailto:${EMAIL}`,
  },
];

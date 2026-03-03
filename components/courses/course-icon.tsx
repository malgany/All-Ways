import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBookOpen,
  faChartLine,
  faComments,
  faLaptopCode,
  faPlaneDeparture,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { CourseIconKey } from "@/lib/types";

type CourseIconProps = {
  icon: CourseIconKey;
  className?: string;
};

const COURSE_ICON_MAP: Record<CourseIconKey, IconDefinition> = {
  travel: faPlaneDeparture,
  technology: faLaptopCode,
  conversation: faComments,
  business: faBookOpen,
  certification: faChartLine,
  kids: faRocket,
};

export function CourseIcon({ icon, className }: CourseIconProps) {
  return (
    <FontAwesomeIcon
      icon={COURSE_ICON_MAP[icon]}
      className={className}
      fixedWidth
      aria-hidden
    />
  );
}

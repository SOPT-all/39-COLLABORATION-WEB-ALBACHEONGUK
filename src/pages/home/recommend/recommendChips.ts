import shortTimeDefaultIcon from '../../../assets/icons/select-chip/short-time-default.svg';
import shortTimeHoverIcon from '../../../assets/icons/select-chip/short-time-hover.svg';
import shortTimeSelectedIcon from '../../../assets/icons/select-chip/short-time-selected.svg';
import shortTermDefaultIcon from '../../../assets/icons/select-chip/short-term-default.svg';
import shortTermHoverIcon from '../../../assets/icons/select-chip/short-term-hover.svg';
import shortTermSelectedIcon from '../../../assets/icons/select-chip/short-term-selected.svg';
import urgentDefaultIcon from '../../../assets/icons/select-chip/urgent-default.svg';
import urgentHoverIcon from '../../../assets/icons/select-chip/urgent-hover.svg';
import urgentSelectedIcon from '../../../assets/icons/select-chip/urgent-selected.svg';
import easyDefaultIcon from '../../../assets/icons/select-chip/easy-default.svg';
import easyHoverIcon from '../../../assets/icons/select-chip/easy-hover.svg';
import easySelectedIcon from '../../../assets/icons/select-chip/easy-selected.svg';
import brandDefaultIcon from '../../../assets/icons/select-chip/brand-default.svg';
import brandHoverIcon from '../../../assets/icons/select-chip/brand-hover.svg';
import brandSelectedIcon from '../../../assets/icons/select-chip/brand-selected.svg';
import callCenterDefaultIcon from '../../../assets/icons/select-chip/call-center-default.svg';
import callCenterHoverIcon from '../../../assets/icons/select-chip/call-center-hover.svg';
import callCenterSelectedIcon from '../../../assets/icons/select-chip/call-center-selected.svg';
import middleAgedDefaultIcon from '../../../assets/icons/select-chip/middle-aged-default.svg';
import middleAgedHoverIcon from '../../../assets/icons/select-chip/middle-aged-hover.svg';
import middleAgedSelectedIcon from '../../../assets/icons/select-chip/middle-aged-selected.svg';
import foreignerDefaultIcon from '../../../assets/icons/select-chip/foreigner-default.svg';
import foreignerHoverIcon from '../../../assets/icons/select-chip/foreigner-hover.svg';
import foreignerSelectedIcon from '../../../assets/icons/select-chip/foreigner-selected.svg';
import collegeDefaultIcon from '../../../assets/icons/select-chip/college-default.svg';
import collegeHoverIcon from '../../../assets/icons/select-chip/college-hover.svg';
import collegeSelectedIcon from '../../../assets/icons/select-chip/college-selected.svg';
import teenDefaultIcon from '../../../assets/icons/select-chip/teen-default.svg';
import teenHoverIcon from '../../../assets/icons/select-chip/teen-hover.svg';
import teenSelectedIcon from '../../../assets/icons/select-chip/teen-selected.svg';
import homemakerDefaultIcon from '../../../assets/icons/select-chip/homemaker-default.svg';
import homemakerHoverIcon from '../../../assets/icons/select-chip/homemaker-hover.svg';
import homemakerSelectedIcon from '../../../assets/icons/select-chip/homemaker-selected.svg';
import disabledDefaultIcon from '../../../assets/icons/select-chip/disabled-default.svg';
import disabledHoverIcon from '../../../assets/icons/select-chip/disabled-hover.svg';
import disabledSelectedIcon from '../../../assets/icons/select-chip/disabled-selected.svg';
import type { SelectChipIcon } from '../../../components/SelectChip.tsx';

export type ChipOption = {
  label: string;
  icon?: SelectChipIcon;
};

export const REGION_OPTIONS: ChipOption[] = [
  { label: '서울' },
  { label: '경기' },
  { label: '인천' },
  { label: '부산' },
  { label: '대구' },
  { label: '대전' },
  { label: '광주' },
  { label: '울산' },
  { label: '세종' },
  { label: '강원' },
  { label: '충북' },
  { label: '충남' },
  { label: '전북' },
  { label: '전남' },
  { label: '경북' },
  { label: '경남' },
  { label: '제주' },
  { label: '전국' },
];

export const THEME_OPTIONS: ChipOption[] = [
  {
    label: '단시간 알바',
    icon: {
      default: shortTimeDefaultIcon,
      hover: shortTimeHoverIcon,
      selected: shortTimeSelectedIcon,
    },
  },
  {
    label: '단기알바',
    icon: {
      default: shortTermDefaultIcon,
      hover: shortTermHoverIcon,
      selected: shortTermSelectedIcon,
    },
  },
  {
    label: '급구알바',
    icon: { default: urgentDefaultIcon, hover: urgentHoverIcon, selected: urgentSelectedIcon },
  },
  {
    label: '꿀알바',
    icon: { default: easyDefaultIcon, hover: easyHoverIcon, selected: easySelectedIcon },
  },
  {
    label: '브랜드알바',
    icon: { default: brandDefaultIcon, hover: brandHoverIcon, selected: brandSelectedIcon },
  },
  {
    label: '콜센터',
    icon: {
      default: callCenterDefaultIcon,
      hover: callCenterHoverIcon,
      selected: callCenterSelectedIcon,
    },
  },
];

export const TARGET_OPTIONS: ChipOption[] = [
  {
    label: '중장년',
    icon: {
      default: middleAgedDefaultIcon,
      hover: middleAgedHoverIcon,
      selected: middleAgedSelectedIcon,
    },
  },
  {
    label: '외국인',
    icon: {
      default: foreignerDefaultIcon,
      hover: foreignerHoverIcon,
      selected: foreignerSelectedIcon,
    },
  },
  {
    label: '대학생',
    icon: { default: collegeDefaultIcon, hover: collegeHoverIcon, selected: collegeSelectedIcon },
  },
  {
    label: '청소년',
    icon: { default: teenDefaultIcon, hover: teenHoverIcon, selected: teenSelectedIcon },
  },
  {
    label: '주부',
    icon: {
      default: homemakerDefaultIcon,
      hover: homemakerHoverIcon,
      selected: homemakerSelectedIcon,
    },
  },
  {
    label: '장애인',
    icon: {
      default: disabledDefaultIcon,
      hover: disabledHoverIcon,
      selected: disabledSelectedIcon,
    },
  },
];

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRouter } from 'next/navigation';

import { ArrowLeftIcon } from '@radix-ui/react-icons';
import {
  Box,
  Heading,
  Text,
} from '@radix-ui/themes';

type CompProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;

  onBack?: () => void;
};

const SubHeader: React.FC<CompProps> = ({
  title,
  description,
  children,
  onBack,
}) => {
  const router = useRouter();
  const back = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <Box>
      <button
        type="button"
        className="flex items-center gap-2 mb-3 text-sm cursor-pointer"
        onClick={back}
      >
        <ArrowLeftIcon />
        <span>Back</span>
      </button>
      <Heading as="h1" size="6" weight="medium">
        {title}
      </Heading>
      {description && (
        <Text weight="light" size="2">
          {description}
        </Text>
      )}
    </Box>
  );
};

export default SubHeader;

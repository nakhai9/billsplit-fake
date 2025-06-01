"use client";
import React from 'react';

import { useRouter } from 'next/navigation';

import { CameraIcon } from '@radix-ui/react-icons';
import {
  Box,
  Button,
  Heading,
} from '@radix-ui/themes';

import AppLayout from './ui/Layout';
import ScanIcon from './ui/ScanIcon';

export default function Home() {
  const router = useRouter();
  return (
    <AppLayout>
      <Box>
        <div className="flex justify-center my-5">
          <ScanIcon size="lg" />
        </div>
        <Heading as="h1" size="8" weight="medium" align="center">
          Scan. Tap. Split
        </Heading>
        <p className="max-w-xs sm:max-w-sm text-[#4a5565] text-sm sm:text-base text-center">
          Snap the receipt, tap your items, see who owes what. No sign-ups, no
          math, no drama.
        </p>
      </Box>
      <Button
        color="orange"
        variant="solid"
        onClick={() => router.push("/scan")}
      >
        <CameraIcon /> Scan Receipt
      </Button>
      <Button color="gray" variant="surface">
        Enter Manually
      </Button>
    </AppLayout>
  );
}

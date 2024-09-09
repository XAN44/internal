import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { AlertTriangle, CheckCircleIcon } from "lucide-react";
import { cn } from "../../../lib/utils";
const bannerVariansts = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 border-yellow-30 text-primary",
        success: "bg-emerald-700 border-emerald-800 text-secondary",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
);

interface BannerProps extends VariantProps<typeof bannerVariansts> {
  label: string;
}

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

function Banner({ label, variant }: BannerProps) {
  const Icon = iconMap[variant || "warning"];
  return (
    <div className={cn(bannerVariansts({ variant }))}>
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </div>
  );
}

export default Banner;

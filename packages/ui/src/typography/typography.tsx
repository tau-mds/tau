import { cx } from "@tau/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { Slot } from "radix-ui";
import type React from "react";

const textVariants = cva("", {
  variants: {
    size: {
      xsmall: "",
      small: "",
      base: "",
      large: "",
      xlarge: "",
    },
    weight: {
      regular: "font-normal",
      plus: "font-medium",
    },
    family: {
      sans: "font-sans",
      mono: "font-mono",
    },
    leading: {
      normal: "",
      compact: "",
    },
  },
  defaultVariants: {
    family: "sans",
    size: "base",
    weight: "regular",
    leading: "normal",
  },
  compoundVariants: [
    {
      size: "xsmall",
      leading: "normal",
      className: "txt-xsmall",
    },
    {
      size: "xsmall",
      leading: "compact",
      className: "txt-compact-xsmall",
    },
    {
      size: "small",
      leading: "normal",
      className: "txt-small",
    },
    {
      size: "small",
      leading: "compact",
      className: "txt-compact-small",
    },
    {
      size: "base",
      leading: "normal",
      className: "txt-medium",
    },
    {
      size: "base",
      leading: "compact",
      className: "txt-compact-medium",
    },
    {
      size: "large",
      leading: "normal",
      className: "txt-large",
    },
    {
      size: "large",
      leading: "compact",
      className: "txt-compact-large",
    },
    {
      size: "xlarge",
      leading: "normal",
      className: "txt-xlarge",
    },
    {
      size: "xlarge",
      leading: "compact",
      className: "txt-compact-xlarge",
    },
  ],
});

export namespace Text {
  export type Variant = VariantProps<typeof textVariants>;
  export type Props = React.ComponentProps<"p"> &
    Variant & {
      asChild?: boolean;
      as?: "p" | "span" | "div";
    };
}

export const Text = ({
  className,
  /**
   * Whether to remove the wrapper `button` element and use the
   * passed child element instead.
   */
  asChild = false,
  /**
   * The wrapper element to use when `asChild` is disabled.
   */
  as = "p",
  /**
   * The text's size.
   */
  size = "base",
  /**
   * The text's font weight.
   */
  weight = "regular",
  /**
   * The text's font family.
   */
  family = "sans",
  /**
   * The text's line height.
   */
  leading = "normal",
  children,
  ...props
}: Text.Props) => {
  const Component = asChild ? Slot.Root : as;

  return (
    <Component
      className={cx(textVariants({ size, weight, family, leading }), className)}
      {...props}
    >
      {children}
    </Component>
  );
};

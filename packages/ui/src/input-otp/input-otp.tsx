import React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import Dash from "~icons/radix-icons/dash";

import { cx } from "@tau/utils";

export namespace InputOTP {
  export type Props = React.ComponentProps<typeof OTPInput> & {
    containerClassName?: string;
  };
}
export function InputOTP({
  className,
  containerClassName,
  ...props
}: InputOTP.Props) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cx(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName,
      )}
      className={cx("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

export namespace InputOTPGroup {
  export type Props = React.ComponentProps<"div">;
}
export function InputOTPGroup({ className, ...props }: InputOTPGroup.Props) {
  return (
    <div
      data-slot="input-otp-group"
      className={cx("flex items-center", className)}
      {...props}
    />
  );
}

export namespace InputOTPSlot {
  export type Props = React.ComponentProps<"div"> & {
    index: number;
  };
}
export function InputOTPSlot({
  index,
  className,
  ...props
}: InputOTPSlot.Props) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cx(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive border bg-accent relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

export namespace InputOTPSeparator {
  export type Props = React.ComponentProps<"div">;
}
export function InputOTPSeparator(props: InputOTPSeparator.Props) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <Dash />
    </div>
  );
}

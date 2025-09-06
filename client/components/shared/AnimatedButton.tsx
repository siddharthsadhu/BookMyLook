import { Button, ButtonProps } from "@/components/ui/button";
import { motion } from "framer-motion";
import { forwardRef } from "react";

const MotionButton = motion(Button as any);

const AnimatedButton = forwardRef<HTMLButtonElement, ButtonProps & {glow?: boolean}>(
  ({ children, glow = true, ...props }, ref) => {
    return (
      <MotionButton
        whileHover={{ y: -2, boxShadow: glow ? "0 10px 25px -10px hsl(266 72% 50%)" : undefined }}
        whileTap={{ scale: 0.98 }}
        ref={ref}
        {...props}
      >
        {children}
      </MotionButton>
    );
  }
);

export default AnimatedButton;

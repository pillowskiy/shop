import type { FC, PropsWithChildren } from "react"
import { cn } from "@lib/utils"

export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const Anchor: FC<PropsWithChildren<AnchorProps>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <a
      className={cn(
        "cursor-pointer text-primary transition-all",
        "hover:underline hover:text-secondary-foreground",
        className
      )}
      {...props}
    >{children}</a>
  )
}

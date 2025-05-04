import { Card } from "@tau/ui";
import React from "react";

interface CardDescriptionInterviewRoundProps {
  description?: string | null;
}

export function CardDescriptionInterviewRound({
  description,
}: CardDescriptionInterviewRoundProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (el) {
      setIsOverflow(el.scrollHeight > el.clientHeight);
    }
  }, [description]);

  return (
    <Card.Description
      ref={ref}
      className="h-11 overflow-hidden"
      //   style={{ height: "2.75rem" }} // 2.75rem = 44px, same as h-11
    >
      {description || "No description provided"}
      {isOverflow && (
        <span className="ml-2 text-xs text-muted-foreground">(truncated)</span>
      )}
    </Card.Description>
  );
}

import { Card } from "@tau/ui";

interface CardDescriptionInterviewRoundProps {
  description?: string | null;
  maxLength?: number;
}

export function CardDescriptionInterviewRound({
  description,
  maxLength = 60,
}: CardDescriptionInterviewRoundProps) {
  const displayText =
    description && description.length > maxLength
      ? `${description.slice(0, maxLength)}...`
      : description || "No description provided";

  return (
    <Card.Description className="h-11 overflow-hidden" style={{ height: "2.75rem" }}>
      {displayText}
    </Card.Description>
  );
}

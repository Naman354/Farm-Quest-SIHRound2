import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { CaseStudy } from "@/lib/case-studies-data"

interface CaseStudyCardProps {
  study: CaseStudy;
  onReadMore: () => void;
}

export function CaseStudyCard({ study, onReadMore }: CaseStudyCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg">
      <img src={study.image} alt={study.farmerName} className="w-full h-48 object-cover" />
      <CardContent className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-2">{study.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-grow">{study.summary}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {study.results.slice(0, 2).map((result) => (
            <Badge key={result.label} variant="secondary">
              {`${result.label}: ${result.value}`}
            </Badge>
          ))}
        </div>
        <Button onClick={onReadMore} className="w-full mt-auto">
          Read Full Story
        </Button>
      </CardContent>
    </Card>
  );
}

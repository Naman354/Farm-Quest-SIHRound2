import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { CaseStudy } from "@/lib/case-studies-data"
import { Award, Bug, Calendar, ClipboardList, CloudRain, Droplets, HeartPulse, Layers, Leaf, Recycle, RefreshCw, ShieldOff, ShoppingCart, Sprout, Store, TrendingDown, TrendingUp, Users, ArrowDownUp } from "lucide-react"

interface CaseStudyDetailProps {
  study: CaseStudy | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const iconMap: { [key: string]: React.ElementType } = {
  Sprout,
  Leaf,
  Users,
  TrendingUp,
  ClipboardList,
  ShieldOff,
  RefreshCw,
  ShoppingCart,
  Bug,
  TrendingDown,
  Award,
  HeartPulse,
  Layers,
  Store,
  Recycle,
  Calendar,
  CloudRain,
  ArrowDownUp,
  Droplets,
};

export function CaseStudyDetail({ study, isOpen, onOpenChange }: CaseStudyDetailProps) {
  if (!study) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4">
            <img src={study.image} alt={study.farmerName} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <DialogTitle className="text-3xl font-bold text-white">{study.title}</DialogTitle>
              <DialogDescription className="text-base text-white/90">
                {study.farmerName}, {study.location}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="p-6 pt-0">
          <blockquote className="border-l-4 border-primary pl-4 py-2 mb-6 bg-muted/50 rounded-r-lg">
            <p className="text-lg italic text-foreground">“{study.quote}”</p>
          </blockquote>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-xl mb-4 text-primary">Challenges Faced</h4>
              <ul className="list-disc list-inside space-y-2">
                {study.challenges.map((challenge, index) => (
                  <li key={index} className="text-muted-foreground">{challenge}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-xl mb-4 text-primary">Key Results</h4>
              <div className="space-y-3">
                {study.results.map((result) => {
                  const Icon = iconMap[result.icon] || Sprout;
                  return (
                    <div key={result.label} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{result.label}</p>
                        <p className="text-xl font-bold text-foreground">{result.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="font-semibold text-xl mb-4 text-primary">Solutions Implemented</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {study.solutions.map((solution) => {
                const Icon = iconMap[solution.icon] || Sprout;
                return (
                  <div key={solution.title} className="p-4 border rounded-lg bg-card">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-5 h-5 text-primary" />
                      <h5 className="font-semibold">{solution.title}</h5>
                    </div>
                    <p className="text-sm text-muted-foreground">{solution.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

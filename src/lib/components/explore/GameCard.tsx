import type { Game } from "@/lib/domain/models";
import { Button } from "@/lib/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/lib/ui/card";
import { motion } from "framer-motion";
import { StarIcon } from "lucide-react";

interface Props {
  value: Game;
}

export function GameCard({ value }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:border-emerald-500 transition-colors">
        <CardHeader className="p-0 relative">
          <img
            src={value.background_image}
            alt={value.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <h3 className="font-medium text-white line-clamp-2">
              {value.name}
            </h3>
          </div>
        </CardHeader>

        <CardContent className="p-4 flex-1">
          <div className="flex flex-wrap gap-2 mb-3">
            {value.genres.slice(0, 3).map((genre) => (
              <span
                key={genre.name}
                className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <StarIcon className="h-4 w-4 text-amber-500" />
              <span className="font-medium">{value.rating}</span>
              <span className="text-muted-foreground">/5</span>
            </div>
            <span className="text-muted-foreground">
              {new Date(value.released).toLocaleDateString()}
            </span>
          </div>
        </CardContent>

        <CardFooter className="border-t p-4">
          <Button variant="outline" className="w-full" size="sm">
            Ver Detalles
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

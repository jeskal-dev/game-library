import { useService } from "@/core";
import type { Game } from "@/lib/domain/models/game/Model";
import { RAWGService } from "@/lib/domain/services/RAWGService";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/ui/accordion";
import { Button } from "@/lib/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/lib/ui/card";
import { Input } from "@/lib/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/lib/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/lib/ui/tabs";
import { cn } from "@/lib/utils";
import { signal, useSignal } from "@preact-signals/safe-react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  FilterIcon,
  SearchIcon,
  StarIcon,
} from "lucide-react";

export const Route = createFileRoute("/(app)/_app/explore")({
  component: RouteComponent,
});

const games = signal<Game[]>([]);
const selectedGenres = signal<string[]>([]);
const searchQuery = signal("");
function RouteComponent() {
  const service = useService(RAWGService);
  const isFilterOpen = useSignal(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8 space-y-6"
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Descubre Nuevos Juegos
        </h1>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar juegos..."
              className="pl-10 pr-4 h-12 rounded-lg bg-background"
              value={searchQuery.value}
              onChange={(e) => (searchQuery.value = e.target.value)}
            />
          </div>

          <Sheet
            open={isFilterOpen.value}
            onOpenChange={(value) => (isFilterOpen.value = value)}
          >
            <SheetTrigger asChild>
              <Button variant="outline" className="h-12 px-4">
                <FilterIcon className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-full sm:max-w-md lg:max-w-xs p-6"
            >
              <SheetHeader className="mb-6">
                <SheetTitle className="text-xl">Filtros Avanzados</SheetTitle>
              </SheetHeader>
              <FilterSection />
            </SheetContent>
          </Sheet>
        </div>
      </motion.header>
      <div className="flex flex-row overflow-hidden">
        <MainSection />
        <TabsSection />
      </div>
    </div>
  );
}

function MainSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1"
    >
      {games.value
        .filter(
          (game) =>
            game.name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
            (selectedGenres.value.length === 0 ||
              game.genres.some((g) => selectedGenres.value.includes(g.name)))
        )
        .map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}

      {games.value.length === 0 && (
        <div className="col-span-full text-center text-muted-foreground py-12">
          No se encontraron resultados
        </div>
      )}
    </motion.div>
  );
}

function TabsSection() {
  const activeTab = useSignal("trending");
  const isCollapsed = useSignal(false);
  const tabs = [
    { value: "trending", label: "🔥 Tendencias" },
    { value: "new", label: "🆕 Nuevos" },
    { value: "upcoming", label: "🚀 Próximos" },
  ];
  return (
    <motion.aside
      initial={{ x: 20 }}
      animate={{ x: 0 }}
      className={cn(
        `relative hidden lg:block h-fit transition-all duration-300`,
        isCollapsed.value ? "w-12" : "w-fit"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -left-12 top-2 z-10"
        onClick={() => (isCollapsed.value = !isCollapsed.value)}
      >
        {isCollapsed.value ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      <AnimatePresence mode="wait">
        {!isCollapsed.value && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-background rounded-lg border p-4"
          >
            <Tabs
              value={activeTab.value}
              onValueChange={(value) => (activeTab.value = value)}
            >
              <TabsList>
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    <span className="truncate">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="mt-4 space-y-2">
                {[...Array(5)].map((_, i) => (
                  <CompactGameCard key={i} />
                ))}
              </div>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}

function FilterSection() {
  const genres = ["Action", "RPG", "Adventure", "Indie", "Strategy"];

  return (
    <Accordion type="multiple" defaultValue={["genres"]} className="space-y-4">
      <AccordionItem value="genres">
        <AccordionTrigger className="text-base">Géneros</AccordionTrigger>
        <AccordionContent className="mt-2 space-y-2">
          {genres.map((genre) => (
            <Button
              key={genre}
              variant={
                selectedGenres.value.includes(genre) ? "secondary" : "ghost"
              }
              className="w-full justify-start font-normal"
              onClick={() =>
                (selectedGenres.value = selectedGenres.value.includes(genre)
                  ? selectedGenres.value.filter((g) => g !== genre)
                  : [...selectedGenres.value, genre])
              }
            >
              {genre}
            </Button>
          ))}
        </AccordionContent>
      </AccordionItem>

      {/* Placeholder para futuros filtros */}
      <div className="opacity-50 text-sm text-muted-foreground">
        Más filtros próximamente...
      </div>
    </Accordion>
  );
}

function GameCard({ game }: { game: Game }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:border-emerald-500 transition-colors">
        <CardHeader className="p-0 relative">
          <img
            src={game.background_image}
            alt={game.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <h3 className="font-medium text-white line-clamp-2">{game.name}</h3>
          </div>
        </CardHeader>

        <CardContent className="p-4 flex-1">
          <div className="flex flex-wrap gap-2 mb-3">
            {game.genres.slice(0, 3).map((genre) => (
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
              <span className="font-medium">{game.rating}</span>
              <span className="text-muted-foreground">/5</span>
            </div>
            <span className="text-muted-foreground">
              {new Date(game.released).toLocaleDateString()}
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

function CompactGameCard() {
  return (
    <motion.div whileHover={{ translateX: 4 }} className="group cursor-pointer">
      <Card className="p-2 hover:border-emerald-500 transition-colors">
        <div className="flex gap-3">
          <div className="w-16 h-16 rounded-md bg-muted overflow-hidden">
            <img
              src="https://via.placeholder.com/80"
              alt="Game"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h4 className="text-sm font-medium line-clamp-1 mb-1">
              Nombre del Juego
            </h4>
            <div className="flex items-center gap-2">
              <StarIcon className="h-3 w-3 text-amber-500" />
              <span className="text-xs text-muted-foreground">4.8/5</span>
            </div>
            <span className="text-xs text-muted-foreground">
              Action • Adventure
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

import { useService } from "@/core";
import { GameCard } from "@/lib/components/explore/GameCard";
import { TabsSection } from "@/lib/components/explore/TabsSection";
import type { Game } from "@/lib/domain/models/game/Model";
import type { Ordering } from "@/lib/domain/request/RAWGRequest";
import { RAWGService } from "@/lib/domain/services/RAWGService";
import { Accordion } from "@/lib/ui/accordion";
import { Button } from "@/lib/ui/button";
import { Input } from "@/lib/ui/input";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/lib/ui/sheet";
import { signal, useComputed, useSignal } from "@preact-signals/safe-react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FilterIcon, GamepadIcon, SearchIcon, XIcon } from "lucide-react";
import { VirtualRWAGSection } from "../../lib/components/virtualizer/VirtualRWAGSection";

export const Route = createFileRoute("/(app)/_app/explore")({
  component: RouteComponent,
});

const games = signal<Game[]>([]);
const selectedGenres = signal<string[]>([]);
const searchQuery = signal("");
interface FilterState {
  page: number;
  page_size: number;
  search: string;
  genres: number[];
  tags: number[];
  publishers: number[];
  platforms: number[];
  ordering: Ordering;
}

const initialFilters: FilterState = {
  page: 1,
  page_size: 20,
  search: "",
  genres: [],
  tags: [],
  publishers: [],
  platforms: [],
  ordering: "-rating",
};

function RouteComponent() {
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
              <div className="flex-1 overflow-y-auto">
                <FilterSection />
              </div>
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
  const gamesList = useComputed(() =>
    games.value
      .filter(
        (game) =>
          game.name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
          (selectedGenres.value.length === 0 ||
            game.genres.some((g) => selectedGenres.value.includes(g.name)))
      )
      .map((game) => <GameCard key={game.slug} value={game} />)
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1"
    >
      {gamesList}

      {gamesList.value.length === 0 && (
        <div className="col-span-full text-center text-muted-foreground py-12">
          No se encontraron resultados
        </div>
      )}
    </motion.div>
  );
}

function FilterSection() {
  return (
    <Accordion type="multiple" className="space-y-4">
      <GenresSection />
      {/* <TagsSection />
      <PublishersSection />
      <PlatformsSection /> */}
    </Accordion>
  );
}

export const GenresSection = () => {
  const service = useService(RAWGService);
  return (
    <VirtualRWAGSection
      sectionKey="genres"
      title="Géneros"
      fetchFn={(params, config) => service.fetchGenres(params, config)}
      icon={GamepadIcon}
      renderItem={(item) => (
        <Button variant="ghost" className="w-full justify-start font-normal">
          {item.name}
        </Button>
      )}
    />
  );
};

export const TagsSection = () => {
  const service = useService(RAWGService);
  return (
    <VirtualRWAGSection
      sectionKey="tags"
      title="Tags"
      fetchFn={(params, config) => service.fetchTags(params, config)}
      icon={GamepadIcon}
      renderItem={(item) => (
        <Button variant="ghost" className="w-full justify-start font-normal">
          {item.name}
        </Button>
      )}
    />
  );
};

export const PublishersSection = () => {
  const service = useService(RAWGService);
  return (
    <VirtualRWAGSection
      sectionKey="publishers"
      title="Editoriales"
      fetchFn={(params, config) => service.fetchPublishers(params, config)}
      icon={GamepadIcon}
      renderItem={(item) => (
        <Button variant="ghost" className="w-full justify-start font-normal">
          {item.name}
        </Button>
      )}
    />
  );
};

export const PlatformsSection = () => {
  const service = useService(RAWGService);
  return (
    <VirtualRWAGSection
      sectionKey="platforms"
      title="Plataformas"
      fetchFn={(params, config) => service.fetchPlatforms(params, config)}
      icon={GamepadIcon}
      renderItem={(item) => (
        <Button variant="ghost" className="w-full justify-start font-normal">
          {item.name}
        </Button>
      )}
    />
  );
};

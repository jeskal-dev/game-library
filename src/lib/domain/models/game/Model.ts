export class Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  rating: number;
  background_image: string;
  genres: Array<{ name: string }>;

  constructor(model: Game) {
    this.id = model.id;
    this.slug = model.slug;
    this.name = model.name;
    this.released = model.released;
    this.rating = model.rating;
    this.background_image = model.background_image;
    this.genres = model.genres;
  }

  static parseList(models: Game[]) {
    return models.map((model) => new Game(model));
  }
}

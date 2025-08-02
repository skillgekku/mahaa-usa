

export type ViewMode = 'home' | 'schedule' | 'player' | 'usa-playlist'

export type State = {
  id: string;
  name: string;
  color: string;
  events: number;
  type: string;
  image?: string;
}
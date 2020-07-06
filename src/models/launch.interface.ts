export interface Launch {
  id: number;
  name: string;
  status: number;
  location: {
    pads: {
      id: number;
      name: string;
      latitude: number;
      longitude: number;
      agencies: any[];
    }[];
  };
}

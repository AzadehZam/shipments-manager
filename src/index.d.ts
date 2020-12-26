interface ICargo {
    type: string;
    description: string;
    volume: string;
  }

  interface IService {
    type: string;
    value?: string;
  }

interface AppState {
    id: string;
    name: string;
    cargo: ICargo[];
    mode: string;
    type: string;
    destination: string;
    origin: string;
    services : IService[];
    total: string;
    status: string;
    userId: string;
  }
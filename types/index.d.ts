export {}

declare global {
    interface IPersonaje {
        _id: string;
        name: string;
        image: string;
        status: string;
        species: string;
        gender: string;
        origin: string;
        location: string;
        episode: string;
        url: string;
        created: string;
    }    
}
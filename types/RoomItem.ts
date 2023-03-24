export interface RoomItem{
    id: string|number;
    name?: string;
    username: string;
    email?: string;
    address?: {
        street?: string;
        squite?: string;
        city?: string;
        zipcode?: string;
        geo?: {
            lat: string;
            lng: string;
        }
    };
    phone?: string;
    website?: string;
    company?: {
        name?: string;
        catchPhrase?: string;
        bs?: string
    }
}
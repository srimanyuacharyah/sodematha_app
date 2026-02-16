export interface Room {
    id: string;
    name: string;
    description: string;
    price: number;
    capacity: number;
    amenities: string[];
    image: string; // Placeholder or actual path
}

export const ROOMS: Room[] = [
    {
        id: "r1",
        name: "Yatri Nivas AC Room",
        description: "Comfortable air-conditioned room for families. Located near the main temple complex.",
        price: 1500,
        capacity: 3,
        amenities: ["AC", "Attached Bath", "Hot Water", "Double Bed"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574&auto=format&fit=crop"
    },
    {
        id: "r2",
        name: "Standard Non-AC Room",
        description: "Budget-friendly accommodation with essential amenities.",
        price: 800,
        capacity: 3,
        amenities: ["Fan", "Attached Bath", "Hot Water", "Single Beds"],
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: "r3",
        name: "Dormitory Hall",
        description: "Large hall accommodation suitable for groups and large families.",
        price: 200,
        capacity: 10,
        amenities: ["Common Bath", "Floor Mats", "Locker Facility"],
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2669&auto=format&fit=crop"
    },
    {
        id: "r4",
        name: "VIP Guest Suite",
        description: "Premium spiritual stay experience with modern amenities and temple view.",
        price: 3500,
        capacity: 2,
        amenities: ["AC", "TV", "Living Area", "Temple View", "Room Service"],
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2670&auto=format&fit=crop"
    }
];

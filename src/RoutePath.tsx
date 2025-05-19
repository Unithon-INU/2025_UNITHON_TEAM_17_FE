export const RoutePath = {
    main: "/home/main",
    editLocation : "/edit-location",
    postWrite : "/post-write",
    cart : "/cart",
    chat: "/home/chat",
    favorites: "/home/favorites",
    warehouse: "/home/warehouse",
    warehouseDetail: (id: string | null) =>{
        if(id == null)
            return "/home/warehouse/:locationName"
        else
            return`/home/warehouse/${id}`
        },
    my: "/home/my",
    temp: "/temp"
}
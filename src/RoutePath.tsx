export const RoutePath = {
    main: "/home/main",
    mainPage: {
        postWrite: "/home/main/post-write",
        editLocation: "/home/main/edit-location",
        cart : "/home/main/cart",
      },
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
export const RoutePath = {
    main: "/home/main",
    splash: "/splash",
    login: "/login",
    signUp: "/signup",
    editLocation : "/edit-location",
    postWrite : "/post-write",
    cart : "/cart",
    mainPage: {
        postWrite: "/home/main/post-write",
        editLocation: "/home/main/edit-location",
        cart : "/home/main/cart",
      },
    chat: "/home/chat",
    favorites: "/home/favorites",
    warehouse: "/home/warehouse",
    warehouseCreate: "/home/warehouse/add-location",
    warehouseDetail: (id: string | null) =>{
        if(id == null)
            return "/home/warehouse/:locationName"
        else
            return`/home/warehouse/${id}`
        },
    my: "/home/my",
    temp: "/temp"
}
import {Location} from "./type/Warehouse";

export const RoutePath = {
    main: "/home/main",
    splash: "/splash",
    login: "/login",
    signUp: "/signup",
    mainPage: {
        postWrite: "/home/main/post-write",
        editLocation: (id : Location["id"] | null) => {
            if (id == null)
                return "/home/main/edit-location/:id"
            else
                return `/home/main/edit-location/${id}`
        },
      },
    guide: "/home/guide",
    favorites: "/home/favorites",
    warehouse: "/home/warehouse",
    warehouseCreate: "/home/warehouse/add-location",
    warehouseDetail: (id: string | null) =>{
        if(id == null)
            return "/home/warehouse/:locationName"
        else
            return`/home/warehouse/${id}`
        },

    itemCreate: "/item/add",
    my: "/home/my",
    temp: "/temp"
}
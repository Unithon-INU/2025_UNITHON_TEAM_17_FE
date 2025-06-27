import {Location} from "./type/Warehouse";

export const RoutePath = {
    main: "/home/main",
    splash: "/splash",
    login: "/login",
    signUp: "/signup",
    mainPage: {
        postWrite: "/home/main/post-write",
        editLocation: (id: Location["locationId"] | null) => {
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
    dday: "/home/warehouse/d-day",

    warehouseDetail: (id: string | null) => {
        if (id == null)
            return "/home/warehouse/:locationName"
        else
            return `/home/warehouse/${id}`
    },

    itemCreate: "/item/add",
    itemUpdate: (id: string | null) => {
        if (id == null)
            return "/item/update/:id"
        else
            return `/item/update/${id}`
    },
    my: "/home/my",
    temp: "/temp"
}
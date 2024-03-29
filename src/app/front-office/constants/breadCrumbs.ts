import { IBreadCrumb } from "../models/breadCrumbInteface";

export const BREADCRUMBS: IBreadCrumb[] = [
    {
        label: "Services",
        path: "services",
        class: "fa fa-list"
    },
    {
        label: "Rendez-vous",
        path: "create-rdv",
        class: "fa fa-history"
    },
    {
        label: "Employés",
        path: "preferences",
        class: "fa fa-heart-o"
    },
    {
        label: "Notifications",
        path: "notifications",
        class: "fa fa-bell-o"
    },
    {
        label: "Historique",
        path: "histo-rdv",
        class: "fa fa-history"
    },

] 
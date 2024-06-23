import { createApp } from "vue"
import Detail from "./Detail.vue"
import { Book } from "@renderer/batabase"
import {  getDialogContainer } from "@renderer/shared"

export const detailDialog = (book: Book) => {
    const dialog = createApp(Detail, {book})
    const container = getDialogContainer()
    dialog.mount(container)
}
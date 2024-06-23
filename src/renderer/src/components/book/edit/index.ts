import { createApp } from "vue"
import Edit from "./Edit.vue"
import { Book } from "@renderer/batabase"
import {  getDialogContainer } from "@renderer/shared"

export const editDialog = (book: Book) => {
    const dialog = createApp(Edit, {book})
    const container = getDialogContainer()
    dialog.mount(container)
}
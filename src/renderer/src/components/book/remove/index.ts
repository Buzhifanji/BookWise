import { createApp } from "vue"
import Remove from "./Remove.vue"
import { Book } from "@renderer/batabase"
import {  getDialogContainer } from "@renderer/shared"

export const removeDialog = (book: Book, isRecycleBin: boolean, isForce: boolean) => {
    const dialog = createApp(Remove, {book, isRecycleBin,isForce})
    const container = getDialogContainer()
    dialog.mount(container)
}
import { createApp } from "vue"
import Score from "./Score.vue"
import { Book } from "@renderer/batabase"
import {  getDialogContainer } from "@renderer/shared"

export const scroreDialog = (book: Book) => {
    const dialog = createApp(Score, {book})
    const container = getDialogContainer()
    dialog.mount(container)
}
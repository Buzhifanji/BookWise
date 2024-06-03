import { ref } from 'vue'

export const useDialog = () => {
  const dialogRef = ref<HTMLDialogElement | null>(null)

  function openDialog() {
    dialogRef.value?.showModal()
  }

  function closeDialog() {
    dialogRef.value?.close()
  }

  return { dialogRef, openDialog, closeDialog }
}

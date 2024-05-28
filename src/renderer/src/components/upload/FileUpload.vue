<script setup lang="ts">
import { Toast } from '@renderer/components/toast';
import { defineExpose, ref } from 'vue';
import { readFiles } from './read-file';

const dialogRef = ref<HTMLDialogElement | null>(null)

function open() {
    dialogRef.value?.showModal()
}

defineExpose({ open })

async function uploadFile(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files === null) return

    try {
        const result = await readFiles(Array.from(files))
        if (result.length === 0) return

        Toast({ message: '上传成功', type: 'alert-success' })

    } catch (error) {
    }

}

</script>

<template>
    <dialog class="modal" ref="dialogRef">
        <div class="modal-box">
            <h3 class="font-bold text-lg flex justify-between mb-4">
                <span>上传文件</span>
                <kbd class="kbd kbd-sm">ESC</kbd>
            </h3>
            <div class="flex items-center justify-center w-full">
                <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                    <div class="h-full w-full text-center flex flex-col  justify-center items-center  ">
                        <div class="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                            <!-- <img class="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image"> -->
                        </div>
                        <p class="pointer-none text-neutral "><span class="text-sm">Drag and drop</span> files here
                            <br /> or <a href="" id="" class="text-blue-600 hover:underline">select a file</a> from your
                            computer
                        </p>
                    </div>
                    <input type="file" multiple class="hidden" @change="uploadFile">
                </label>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>
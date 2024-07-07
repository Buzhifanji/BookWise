<script setup lang="ts">
import { Book } from '@renderer/batabase';
import { useDialog } from '@renderer/hooks';
import { Reader } from '@renderer/reader';
import { cloneBuffer, convertBlobToUint8Array, isElectron, now, toastSuccess, toastWarning } from '@renderer/shared';
import { t } from '@renderer/view/setting';
import { useToggle } from '@vueuse/core';
import { Upload } from 'lucide-vue-next';
// import { PDFPageProxy, getDocument } from 'pdfjs-dist';
import * as PDFLib from '@renderer/reader/pdf-lib';
import { v4 as uuidv4 } from 'uuid';
import { defineExpose, ref } from 'vue';
import { BookAction, BookContentAction } from '../book/action';
import { BookType } from '../book/enum';
import { readFiles } from './read-file';

const { dialogRef, openDialog, closeDialog } = useDialog();
const [isDragging, setDragging] = useToggle(false)

defineExpose({ open: openDialog })

const inputRef = ref<HTMLInputElement | null>(null)

const getPDFCover = async (page: PDFLib.PDFPageProxy) => {
    const naturalPdfSize = page.getViewport({ scale: 1 })
    const naturalPdfRatio = naturalPdfSize.width / naturalPdfSize.height
    const appRatio = innerWidth / innerHeight
    const pdfToAppResolutionRatio = appRatio / naturalPdfRatio

    const scale = devicePixelRatio * pdfToAppResolutionRatio
    const viewport = page.getViewport({ scale })

    const canvas = document.createElement('canvas')
    canvas.height = viewport.height
    canvas.width = viewport.width
    const canvasContext = canvas.getContext('2d')!
    await page.render({ canvasContext, viewport }).promise
    return await new Promise(resolve => canvas.toBlob(resolve))
}

const handleFiles = async (files: FileList) => {
    try {
        const result = await readFiles(Array.from(files))
        if (result.length === 0) return

        const books = await BookAction.getAll()

        const md5Set = new Set(books.map(book => book.md5));

        // 过滤重复添加的文件
        const newBookData = result.filter(({ hash }) => {
            if (md5Set.has(hash)) {
                toastWarning(t('file.exist'))
                return false
            } else {
                md5Set.add(hash)
                return true
            }
        })

        // 获取书本的元数据
        const bookMetadata = await Promise.all(newBookData.map(async ({ data, hash, file }) => {
            const reader = new Reader()
            await reader.open(file)

            const size = file.size

            let path = ''
            if (isElectron) {
                path = await window.api.getFilePath(file)
            }

            if (reader.book.type === 'pdf') {
                const pdf = await PDFLib.getDocument({ data: cloneBuffer(data) }).promise
                const info = (await pdf.getMetadata())?.info as any
                const blob = await getPDFCover(await pdf.getPage(1)) as Blob
                const cover = await convertBlobToUint8Array(blob)

                const metadata = {
                    title: info?.Title || file.name.replace('.pdf', ''),
                    author: info?.Author || '',
                    language: info?.Language || '',
                    publishTime: info?.CreationDate ? info.CreationDate.replace('D:', '').split('+')[0] : '',
                    publisher: info?.Producer || '',
                    description: info?.Subject || '',
                }
                const pages = pdf.numPages || 0

                return {
                    ...metadata, md5: hash, cover: cover, path, data, size, pages
                }
            } else {
                const cover = await reader.getCover()
                const pages = reader.book.sections.length
                return {
                    ...reader.getMetadata(), md5: hash, cover: await convertBlobToUint8Array(cover), path, data, size, pages
                }
            }

        }))

        // 添加到数据库
        const newBook: Book[] = bookMetadata.map(item => {
            const { author, description, language, published, publisher, title, md5, cover, path, size, pages } = item
            return {
                id: uuidv4(),
                md5: md5,
                name: title,
                author: Reader.handleAuthor(author),
                description: description || '',
                language: Reader.handleAuthor(language),
                publishTime: published || '',
                publisher: publisher || '',
                cover: cover,
                path: path,
                size,
                pages,
                status: 0,
                category: 0,
                createTime: now(),
                updateTime: now(),
                isDelete: null,
                count: 0,
                lastReadPosition: '',
                score: -1,
                progress: 0,
                groupId: '',
                groupName: '',
                isLove: false,
                isReadDone: false,
                format: '',
            }
        })

        if (newBook.length) {
            await BookAction.bulkAdd(newBook)

            // 网页版,不能获取文件路径，需要保存上传内容
            if (!isElectron) {
                const bookContents = bookMetadata.map(item => {
                    return {
                        bookId: newBook.find(e => e.md5 === item.md5)!.id,
                        content: item.data,
                        id: uuidv4(),
                    }
                })

                await BookContentAction.bulkAdd(bookContents)
            }

            newBook.map(item => toastSuccess(`${t('file.uploadSuccess')}: ${item.name}`))
        }

    } catch (error: any) {
        toastWarning(error)
        console.log(error)
    } finally {
        if (inputRef.value) {
            inputRef.value.value = ''
        }
    }
}

async function uploadFile(event: Event) {

    const files = (event.target as HTMLInputElement).files;
    if (files === null) return
    handleFiles(files)
}

const supportBookType = Object.values(BookType)
const handleDrop = (e: DragEvent) => {
    const files = e.dataTransfer?.files;
    if (files) {
        handleFiles(files);
    }
    setDragging(false)
}
</script>

<template>
    <dialog class="modal" ref="dialogRef">
        <div class="modal-box max-w-2xl">
            <h3 class="font-bold text-lg flex justify-between mb-4">
                <span>{{ t('file.upload') }}</span>
                <kbd class="kbd kbd-sm cursor-pointer" @click="closeDialog()">ESC</kbd>
            </h3>
            <div class="flex items-center justify-center w-full " :class="{ 'bg-base-200/60': isDragging }"
                @drop.prevent="handleDrop" @dragover.prevent="setDragging(true)" @dragleave="setDragging(false)">
                <label
                    class="flex flex-col rounded-lg border-4 border-dashed   cursor-pointer  w-full h-60 p-10 group text-center "
                    :class="[isDragging ? 'border-accent' : 'border-info']">
                    <div class="h-full w-full text-center flex flex-col justify-center items-center ">
                        <div class="p-5 bg-base-200 rounded-full mb-4">
                            <Upload />
                        </div>
                        <p class="pointer-none text-base-content text-lg" v-if="isDragging">
                            {{ t('file.releaseMouse') }} </p>
                        <p class="pointer-none text-base-content text-lg" v-else>
                            <span>{{ t('file.dragFile') }}</span>
                            <span class="mx-1">{{ t('common.or') }}</span>
                            <a class="text-info hover:underline">{{ t('file.choose') }}</a>
                        </p>

                        <p class="text-sm text-base-content/60 mt-2">
                            <span>{{ t('file.supportFormat') }}</span>
                            <template v-for="item, index in supportBookType">
                                <span class="mx-1">{{ item }}</span>
                                <span v-if="index < supportBookType.length - 1">/</span>
                            </template>
                        </p>
                    </div>
                    <input type="file" ref="inputRef" multiple class="hidden" @change="uploadFile">
                </label>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>
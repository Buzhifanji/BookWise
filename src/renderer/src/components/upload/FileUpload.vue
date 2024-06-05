<script setup lang="ts">
import { Reader } from '@book-wise/reader';
import { Book, db } from '@renderer/batabase';
import { Toast } from '@renderer/components/toast';
import { useDialog } from '@renderer/hooks';
import { convertBlobToUint8Array, isElectron, now } from '@renderer/shared';
import { v4 as uuidv4 } from 'uuid';
import { defineExpose } from 'vue';
import { readFiles } from './read-file';

const { dialogRef, openDialog, } = useDialog();


defineExpose({ open: openDialog })

async function uploadFile(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files === null) return

    try {
        const result = await readFiles(Array.from(files))
        if (result.length === 0) return

        const books = await db.books.toArray()

        const md5Set = new Set(books.map(book => book.md5));

        // 过滤重复添加的文件
        const newBookData = result.filter(({ hash }) => {
            if (md5Set.has(hash)) {
                console.log(hash)
                Toast({ message: '文件已存在', type: 'alert-warning' })
                return false
            } else {
                md5Set.add(hash)
                return true
            }
        })

        // 获取书本的元数据
        const bookMetadata = await Promise.all(newBookData.map(async ({ data, hash, file }) => {
            const reader = new Reader()
            await reader.open(new File([data], ''))
            const cover = await reader.getCover()
            return { ...reader.getMetadata(), md5: hash, cover: await convertBlobToUint8Array(cover), path: file.path || '', data }
        }))

        const newBook: Book[] = bookMetadata.map(item => {
            const { author, description, language, published, publisher, title, md5, cover, path } = item
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
                size: 0,
                pages: 0,
                status: 0,
                category: 0,
                createTime: now(),
                updateTime: now(),
                isDelete: null,
            }
        })



        if (newBook.length) {
            db.books.bulkAdd(newBook)

            // 网页版,不能获取文件路径，需要保存上传内容
            if (!isElectron) {
                db.bookContents.bulkAdd(bookMetadata.map(item => {
                    return {
                        bookId: newBook.find(e => e.md5 === item.md5)!.id,
                        content: item.data,
                        id: uuidv4(),
                    }
                }))
            }

            newBook.map(item => Toast({ message: `上传成功：${item.name}`, type: 'alert-success' }))
        }

    } catch (error: any) {
        Toast({ message: error, type: 'alert-warning' })
        console.log(error)
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
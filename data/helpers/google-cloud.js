const path = require("path");
const fs = require("fs")
const keyFileName = process.env.GOOGLE_APPLICATION_CREDENTIALS
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({ keyFileName });

const sharp = require("sharp")
const printBucket = "matt-d-prints"
const galleryBucket = "matt-d-gallery"

module.exports = {
    updateAllMetaData: async (bucket, keyValues) => {
        const [files] = await storage.bucket(`matt-d-${bucket}`).getFiles();
        files.forEach(async (file) => {
            try {
                const [ metadata ] = await storage
                    .bucket(`matt-d-${bucket}`)
                    .file(file.name)
                    .setMetadata(keyValues)
                console.log(metadata)
            } catch (error) { console.log(error.message) }
        })
    },

    updateOneMetadata: async (bucket, fileName, keyValues) => {
        try {
            const [metadata] = await storage.bucket(`matt-d-${bucket}`).file(fileName).setMetadata(keyValues)
            console.log(metadata)
        } catch (error) { console.log(error.message) }
    },

    convertToWebp: async (location) => {
        const bucket = `matt-d-${location}`
        const model = require(`../../models/${location}`)
        const [files] = await storage.bucket(bucket).getFiles()

        files.forEach(async (file) => {
            const name = file.name.split(/\.(?=[^\.]+$)/)[0]
            const newName = name + ".webp"
            const directory = path.join(__dirname, `../../routes/uploads/${newName}`)
            const baseURL = `${file.bucket.storage.apiEndpoint}/${file.bucket.name}/`
            const oldURL = baseURL + file.name
            const newURL = baseURL + newName
            if (file.metadata.contentType !== "image/webp") {
                try {
                    const img = await file.download()
                    await sharp(img[0]).webp().toFile(directory)
                    await storage.bucket(bucket).upload(directory, { destination: newName })
                    await model.findOneAndUpdate({ img: oldURL }, { $set: { img: newURL }})
                    await storage.bucket(bucket).file(file.name).delete()
                    console.log(`${file.name} successfully updated`)
                } catch (error) {
                    console.error(file.name, error.message)
                } finally {
                    const localFile = fs.existsSync(directory)
                    if (localFile) {
                        console.log(`Removing local copy of ${newName}`)
                        fs.unlinkSync(directory)
                    }
                }
            } else {
                console.log(file.name + " is already webp");
            }
        })
    },

    getAllFiles: async () => {
        const [prints] = await storage.bucket(printBucket).getFiles();
        const [gallery] = await storage.bucket(galleryBucket).getFiles();
        const allFiles = [...prints, ...gallery]
        fileInfo = allFiles.map(({ metadata }) => (
            {
                name: metadata.name,
                bucket: metadata.bucket,
                id: metadata.generation,
                cacheControl: metadata.cacheControl,
                size: `${(metadata.size / 1024).toFixed(2)} kB`
            }
        ))
        console.table(fileInfo)
    },

    getOneFile: async (bucket, fileName) => {
        const [metadata] = await storage.bucket(`matt-d-${bucket}`).file(fileName).getMetadata()
        const fileInfo = {
            name: metadata.name,
            bucket: metadata.bucket,
            id: metadata.generation,
            cacheControl: metadata.cacheControl,
            size: `${(metadata.size / 1024).toFixed(2)} kB`
        }
        console.table(fileInfo)
        console.log(metadata)
    },

    deleteOneFile: async (bucket, fileName) => {
        try {
            console.warn(`DELETING ${fileName} FROM GOOGLE CLOUD`)
            const res = await storage.bucket(`matt-d-${bucket}`).file(fileName).delete()
            console.log(res)
        } catch (error) {
            console.error(error.message)
        }
    }
}

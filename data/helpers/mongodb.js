const { deleteOneFile } = require("./google-cloud.js")

var mongoHelpers = {
    getAllDocuments: async (source) => {
        const model = require(`../../models/${source}`)
        try {
            const docs = await model.find({}).lean()
            console.table(docs)
            return docs
        } catch (error) {
            console.error(error.message)
        }
    },

    sharedResources: async (source) => {
        const model = require(`../../models/${source}`)
        try {
            let allDocs = await model.find({}).lean()
            let duplicateSources = []
            for (i = 0; i < allDocs.length; i++) {
                let found = []
                for (j = i + 1; j < allDocs.length; j++) {
                    if (allDocs[i].img === allDocs[j].img) {
                        found.push({...allDocs[j], index: j})
                    }
                }
                if (found.length) {
                    duplicateSources.push({
                        matches: found.length + 1,
                        names: [allDocs[i].title, ...found.map(f => f.title)],
                        url: allDocs[i].img,
                        ids: [allDocs[i]._id, ...found.map(f => f._id)]
                    })
                    for (k = found.length - 1; k >= 0; k--) allDocs.splice(found[k].index, 1)
                }
            }
            console.table(duplicateSources)
            return duplicateSources
        } catch (error) {
            console.error(error.message)
        }
    },

    hasSharedResource: async (img, source) => {
        const sharedResources = await mongoHelpers.sharedResources(source)
        let foundDup = sharedResources.find(dup => dup.url === img)
        return !!foundDup
    },

    updateAllDocuments: async (source, keyValues) => {
        const model = require(`../../models/${source}`)
        try {
            const res = await model.updateMany({}, keyValues)
            console.log(res)
        } catch (error) {
            console.error(error.message)
        }
    },

    removeSchemaField: async (source, field) => {
        const model = require(`../../models/${source}`)
        try {
            const res = await model.updateMany({}, { $unset: { [field]: 1 } })
            console.log(res)
        } catch (error) {
            console.error(error.message)
        }
    },

    removeOneSchemaField: async (source, _id, field) => {
        const model = require(`../../models/${source}`)
        try {
            const res = await model.updateOne({ _id }, { $unset: { [field]: 1 } })
            console.log(res)
        } catch (error) {
            console.error(error.message)
        }
    },

    findAllSoftDeleted: async (source) => {
        const model = require(`../../models/${source}`)
        try {
            const docs = await model.find({ deletedAt: { $ne: null } }).lean()
            console.table(docs)
        } catch (error) {
            console.error(error.message)
        }
    },

    restoreSoftDeleted: async (source, _id) => {
        const model = require(`../../models/${source}`)
        try {
            const res = await model.updateOne({ _id }, { deletedAt: null })
            console.log(res)
        } catch (error) {
            console.error(error.message)
        }
    },

    hardDeleteRecord: async (source, _id) => {
        const model = require(`../../models/${source}`)
        try {
            const doc = await model.findOne({ _id, deletedAt: { $ne: null } }).lean()
            console.table([doc])
            const isShared = await mongoHelpers.hasSharedResource(doc.img, source)
            if (!isShared) {
                const fileName = decodeURIComponent(doc.img.split(`${source}/`)[1])
                await deleteOneFile(source, fileName)
            }
            console.warn(`DELETING ${doc.title} FROM MONGODB`)
            const res = await model.deleteOne({ _id })
            console.log(res)
        } catch (error) {
            console.error(error.message)
        }
    },

    deleteOldRecords: async (source, days) => {
        const model = require(`../../models/${source}`)
        try {
            const docs = await model.find({ deletedAt: { $ne: null } }).lean()
            if (!docs.length) return console.log("No soft deleted records")

            let oldDocs = docs.filter(doc => Date.now() - doc.deletedAt > days * 24 * 60 * 60 * 1000)
            if (!oldDocs.length) return console.log(`No soft deleted records older than ${days} days`)

            const sharedResources = await mongoHelpers.sharedResources(source)
            docs.forEach(async (doc) => {
                const found = sharedResources.find(shared => shared.url === doc.img)
                if (!found) {
                    const fileName = decodeURIComponent(doc.img.split(`${source}/`)[1])
                    console.log(fileName)
                    await deleteOneFile(source, fileName)
                }
                console.warn(`DELETING ${doc.title} FROM MONGODB`)
                await model.deleteOne({ _id })
            })
        } catch (error) {
            console.error(error.message)
        }
    }

}

module.exports = mongoHelpers

module.exports = {
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

    hasSharedResource: async (source, destination) => {
        const model = require(`../../models/${destination}`)
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
                        url: allDocs[i].img
                    })
                    for (k = found.length - 1; k >= 0; k--) allDocs.splice(found[k].index, 1)
                }
            }
            console.table(duplicateSources)
            let foundDup = duplicateSources.find(dup => dup.url === source)
            return !!foundDup
        } catch (error) {
            console.error(error.message)
        }
    },

    updateAllDocuments: async (source, keyValues) => {
        const model = require(`../../models/${source}`)
        try {
            const docs = await model.updateMany({}, keyValues)
            console.table(docs)
            return docs
        } catch (error) {
            console.error(error.message)
        }
    },

    removeSchemaField: async (source, field) => {
        const model = require(`../../models/${source}`)
        try {
            const docs = await model.updateMany({}, { $unset: { [field]: 1 } })
            console.table(docs)
            return docs
        } catch (error) {
            console.error(error.message)
        }
    },

    removeOneSchemaField: async (source, _id, field) => {
        const model = require(`../../models/${source}`)
        try {
            const docs = await model.updateOne({ _id }, { $unset: { [field]: 1 } })
            console.table(docs)
            return docs
        } catch (error) {
            console.error(error.message)
        }
    }
}

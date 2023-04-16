var printModel = require("../models/prints")

function markItemsSold(items) {
  const originalIds = items.reduce((originals, item) => {
    if (item.original === true) originals.push(item._id)
    return originals
  }, [])

  return printModel.updateMany({ _id: { $in: originalIds } }, { soldOut: true })
}

module.exports = { markItemsSold }

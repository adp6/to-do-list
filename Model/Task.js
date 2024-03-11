const {Schema, model} = require ('mongoose')

const schema = new Schema ({
    task :{type: String, required: true},
    deadline: {type: Date, required: true}
})

module.exports = model('Task', schema)
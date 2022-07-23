// 'Required modules' section start    
    
    //'Downloaded modules' section start
    const mongoose =require("mongoose");
    //'Downloaded modules' section end
        
    //'Developer-defined modules' section start

    //'Developer-defined modules' section end 

// 'Required modules' section end.

// 'Group-Model Schema' section starts

    const GroupSchema=mongoose.Schema({
        name:{
            type:   String,
            required:   true
        },
        description:{
            type: String,
            required: false
        },
        image:{
                type: String,
                default:"group_logo"
            },
        admin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'

        },
        editor: [
            { 
                type : mongoose.Schema.Types.ObjectId, 
                ref: 'user' 
            }
        ],        
        date:{
            type:Date,
            default: Date.now
        }

    }
    )

// 'Group-Model Schema' section ends

//'Export' section start
    module.exports = Group = mongoose.model('group',GroupSchema);
//'Export' section end 
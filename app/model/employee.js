const mongoose = require('mongoose');
const moment = require('moment');

const employeeSchema = mongoose.Schema({
    employeeName: {
        type: String,
        required: [true, 'Employee name is required'],
        trim: true
    },
    role: {
        type: String,
        required: [true, 'Role of employee is required'],
        trim: true
    },
    startDate: {
        type: Date,
        required: [true, 'Start Date is required'],
        
    },
    endDate: {
        type: Date,
        required: [true, 'End Date is required'],
        
    },
    salary: {
        type: Number,
        required: [true, 'Salary is required'],
        validate(value){
            if(value<0){
                throw new Error("Salary should not be Negative")
            }
        }
    },
    terms: {
        type: [String],
        default: [],
        required: [true, 'Terms are required']
    },
    otherDetails: 
        {
            department: {
                type: String,
                required: [true, 'Department is required'],
                trim: true
            },
            manager: {
                type: String,
                required: [true, 'Manager name is required'],
                trim: true
            }
        }
    
},
{timestamps: true}
);

const EmployeeModel = mongoose.model('employee', employeeSchema);

module.exports = EmployeeModel;

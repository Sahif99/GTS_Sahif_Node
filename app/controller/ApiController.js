
const EmployeeModel = require('../model/employee')
const path = require('path');
const moment = require('moment');

class ApiController {

    createAgreement = async (req, res, next) => {
        try {
            const { employeeName, role, startDate, endDate, salary, terms, otherDetails } = req.body;
            const isValidstartDate = moment(startDate, 'YYYY-MM-DD', true).isValid();

            if (!isValidstartDate) {
                return res.status(400).json({ error: 'Invalid start date. Use YYYY-MM-DD format.' });
            }

            const isValidendDate = moment(endDate, 'YYYY-MM-DD', true).isValid();

            if (!isValidendDate) {
                return res.status(400).json({ error: 'Invalid end date. Use YYYY-MM-DD format.' });
            }
            if (endDate <= startDate) {
                return res.status(500).send({
                    success: false,
                    message: "Input a date which will come after start date",
                })
            };

            const employeeData = new EmployeeModel({
                employeeName, role, startDate, endDate, salary, terms, otherDetails
            });
            const edata = await employeeData.save()
            return res.status(200).json({
                success: true,
                message: "Data added successfully",
                data: edata
            })

        } catch (error) {
            next(error)
        }
    };

    retriveAgreement = async (req, res, next) => {
        try {
            const id = req.params.id
            const getsingledata = await EmployeeModel.findById(id)

            return res.status(200).json({
                success: true,
                message: "Retrive single data",
                data: getsingledata

            })

        } catch (error) {
            next(error)
        }
    };

    updateAgreement = async (req, res, next) => {
        try {
            const id = req.params.id
            let updateFields = { ...req.body };
            const isValidstartDate = moment(req.body.startDate, 'YYYY-MM-DD', true).isValid();

            if (!isValidstartDate) {
                return res.status(400).json({ error: 'Invalid start date. Use YYYY-MM-DD format.' });
            }

            const isValidendDate = moment(req.body.endDate, 'YYYY-MM-DD', true).isValid();

            if (!isValidendDate) {
                return res.status(400).json({ error: 'Invalid end date. Use YYYY-MM-DD format.' });
            }

            if (req.body.endDate <= req.body.startDate) {
                return res.status(500).send({
                    success: false,
                    message: "Input a date which will come after start date",
                })
            };

            const updatedata = await EmployeeModel.findByIdAndUpdate(id, updateFields, {
                useFindAndModify: false
            })

            return res.status(200).json({
                success: true,
                message: "Data updated successfully"
            })

        } catch (error) {
            next(error)
        }
    };

    deleteAgreement = async (req, res, next) => {
        try {
            const id = req.params.id
            const updatedata = await EmployeeModel.findByIdAndDelete(id)

            return res.status(200).json({
                success: true,
                message: "Data deleted successfully",

            })

        } catch (error) {
            next(error)
        }
    };

    listAgreement = async (req, res, next) => {
        try {
            const { employeeName, role, sort } = req.query;
            // console.log(req.query)
            const queryObject = {};

            //Filtering Items

            if (employeeName) {
                queryObject.employeeName = { $regex: employeeName, $options: 'i' };
            };
            if (role) {
                queryObject.role = { $regex: role, $options: 'i' };
            };

            let data = EmployeeModel.find(queryObject);


            // Sorting the list items

            if (sort) {
                let sortFix = sort.split(",").join(" ");
                data = data.sort(sortFix)
            }
            // Adding pagination

            let page = Number(req.query.page) || 1;
            let limit = Number(req.query.limit) || 5;
            let skip = (page - 1) * limit;

            data = data.skip(skip).limit(limit);

            const getAlldata = await data;

            return res.status(200).json({
                success: true,
                message: "Data fetched successfully",
                data: getAlldata

            })

        } catch (error) {
            next(error)
        }
    };

    searchAgreement = async (req, res, next) => {
        try {
            const { date, startDate } = req.query;
            let sdata = await EmployeeModel.find(
                {
                    "$or": [
                        { "employeeName": { $regex: req.params.key, $options: 'i' } },
                        { "role": { $regex: req.params.key, $options: 'i' } },
                        { "terms": { $regex: req.params.key, $options: 'i' } },
                        { "otherDetails.department": { $regex: req.params.key, $options: 'i' } },
                        { "otherDetails.manager": { $regex: req.params.key, $options: 'i' } }
                    ]
                }
            )

            if (sdata.length > 0) {
                return res.status(200).json({
                    success: true,
                    message: "Searched data",
                    data: sdata

                })
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: "Data not found",

                })
            }


        } catch (error) {
            next(error)
        }
    };

}

module.exports = new ApiController()
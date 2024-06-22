const express=require('express');
const ApiController = require('../app/controller/ApiController');
const { AuthCheck } = require('../app/middleware/Auth');

const EmployeeRouter=express.Router()

EmployeeRouter.post('/employment-agreements',AuthCheck,ApiController.createAgreement)
EmployeeRouter.get('/employment-agreements/:id',AuthCheck,ApiController.retriveAgreement)
EmployeeRouter.put('/employment-agreements/:id',AuthCheck,ApiController.updateAgreement)
EmployeeRouter.delete('/employment-agreements/:id',AuthCheck,ApiController.deleteAgreement)
EmployeeRouter.get('/employment-agreements',AuthCheck,ApiController.listAgreement)
EmployeeRouter.get('/employment-agreements/search/:key',AuthCheck,ApiController.searchAgreement)

module.exports=EmployeeRouter


/**
  * @swagger
  * tags:
  *   name: REST APIs
  *   description: The agreement managing API
  */

// Schemas

/**
 * @swagger
 * components:
 *   schemas:
 *     Agreements:
 *       type: object
 *       required:
 *         - employeeName
 *         - role
 *         - startDate
 *         - endDate
 *         - salary
 *         - terms
 *         - otherDetails
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the agreement
 *         employeeName:
 *           type: string
 *           description: The employee name
 *         role:
 *           type: string
 *           description: The role of the employee
 *         startDate:
 *           type: date
 *           description: The start date of the agreement
 *         endDate:
 *           type: date
 *           description: The end date of the agreement
 *         salary:
 *           type: number
 *           description: The salary of the employee
 *         terms:
 *           type: [string]
 *           description: The terms of the employee
 *         otherDetails:
 *           department:
 *                  type: string
 *                  description: The department of the employee
 *           manager:
 *                  type: string
 *                  description: The manager of the employee
 *       example:
 *         id: d5fE_asz
 *         employeeName: Alexander K. Dewdney
 *         role: Lead developer
 *         startDate: 2024-07-01
 *         endDate: 2025-06-30
 *         salary: 95000
 *         terms: Full-time, benefits included
 *         otherDetails: 
 *            department: Product
 *            manager: Sam Johns
 * 
 *     Admins:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the admin
 *         name:
 *           type: string
 *           description: The name of admin
 *         email:
 *           type: string
 *           description: The admin email
 *         password:
 *           type: string
 *           description: The admin password
 *       example:
 *         id: d5fE_asz
 *         name: Alexander K. Dewdney
 *         email: alex9@gmail.com
 *         password: alex2026@
 */

//Create Agreement - Docs

/**
 * @swagger
 * /api/employment-agreements:
 *   post:
 *     summary: Create a new agreement
 *     tags: 
 *        - Create Agreement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agreements'
 *     parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *           type: string
 *        required: true
 *        description: The authentication token
 *     responses:
 *       200:
 *         description: The agreement was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agreements'
 *       500:
 *         description: Some server error
 */

//Get agreement by ID - Docs

/**
 * @swagger
 * /api/employment-agreements/{id}:
 *   get:
 *     summary: Get single agreement
 *     tags: 
 *       - Get Agreement by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *         required: true
 *         description: The employee id
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *         required: true
 *         description: The authentication token
 *     responses:
 *       200:
 *         description: The agreement description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agreements'
 *       404:
 *         description: The agreement was not found
 */

//Update agreement by ID -Docs

/**
 * @swagger
 * /api/employment-agreements/{id}:
 *  put:
 *    summary: Update the agreement by the id
 *    tags:
 *      - Update Agreement
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The employee id
 *      - in: header
 *        name: x-access-token
 *        schema:
 *           type: string
 *        required: true
 *        description: The authentication token
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Agreements'
 *    responses:
 *      200:
 *        description: The agreement was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Agreements'
 *      404:
 *        description: The agreement was not found
 *      500:
 *        description: Some error happened
 */

//Delete agreement by ID - Docs

/**
 * @swagger
 * /api/employment-agreements/{id}:
 *   delete:
 *     summary: Remove the agreement by id
 *     tags: 
 *       - Delete Agreement
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *         required: true
 *         description: The employee id
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *         required: true
 *         description: The authentication token
 * 
 *     responses:
 *       200:
 *         description: The agreement was deleted
 *       404:
 *         description: The agreement was not found
 */

//Get all agreement list - Docs

/**
 * @swagger
 * /api/employment-agreements:
 *   get:
 *     summary: Returns the list of all the agreements
 *     tags: 
 *       - Get Agreements
 *     parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *           type: string
 *        required: true
 *        description: The authentication token
 *     responses:
 *       200:
 *         description: The list of the agreements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agreements'
 */

//Search agreement by key - Docs

/**
 * @swagger
 * /api/employment-agreements/search/{key}:
 *   get:
 *     summary: Search the agreement by key
 *     tags: 
 *       - Search Agreement
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: The search key
 *       - in: header
 *         name: x-access-token
 *         schema:
 *           type: string
 *         required: true
 *         description: The authentication token
 *     responses:
 *       200:
 *         description: The agreement description by key
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agreements'
 *       404:
 *         description: The agreement was not found
 */

//Register admin -Docs

/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     summary: Registration of admin
 *     tags: 
 *       - Registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admins'
 *     responses:
 *       200:
 *         description: The admin was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admins'
 *       500:
 *         description: Some server error
 */

//Log In of Admin

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Log In of admin
 *     tags: 
 *       - Log In
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admins'
 *     responses:
 *       200:
 *         description: The admin was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admins'
 *       500:
 *         description: Some server error
 */

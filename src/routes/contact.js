/////////////////////////////////////////
/*        import external library      */
/////////////////////////////////////////
const express = require('express');
const {param} = require('express-validator');

/////////////////////////////////////////
/*         import controllers          */
/////////////////////////////////////////
const {getAllContacts, getContactById} = require('~controllers/contact');

/////////////////////////////////////////
/*            import utils             */
/////////////////////////////////////////

/////////////////////////////////////////
/*           setup middleware          */
/////////////////////////////////////////
const router = express.Router();
const validatePageCount = require('~middlewares/validatePageCount');

/////////////////////////////////////////
/*             define routes           */
/////////////////////////////////////////
/**
 * @swagger
 * tags:
 *   - name: Contact
 *     description: Contact Resource
 */

/**
 * @swagger
 * definitions:
 *   Contact:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         example: "5dd93a8ed304dabb46699ea1"
 *       name:
 *         type: object
 *         properties:
 *           title:
 *             type: string
 *             example: "mr"
 *           first:
 *             type: string
 *             example: "carl"
 *           last:
 *             type: string
 *             example: "jacobs"
 *       location:
 *         type: object
 *         properties:
 *           coordinates:
 *             type: object
 *             properties:
 *               latitude:
 *                 type: string
 *                 example: "-29.6721"
 *               longitude:
 *                 type: string
 *                 example: "-154.6037"
 *           timezone:
 *             type: object
 *             properties:
 *               offset:
 *                 type: string
 *                 example: "-11:00"
 *               description:
 *                 type: string
 *                 example: "Midway Island, Samoa"
 *           street:
 *             type: string
 *             example: "6948 springfield road"
 *           city:
 *             type: string
 *             example: "arklow"
 *           state:
 *             type: string
 *             example: "wicklow"
 *           postcode:
 *             type: number
 *             example: 71309
 *       login:
 *         type: object
 *         properties:
 *           uuid:
 *             type: string
 *             example: "4f591981-b214-4430-9902-70bc0faa7e81"
 *           username:
 *             type: string
 *             example: "organicladybug144"
 *           password:
 *             type: string
 *             example: "hank"
 *           salt:
 *             type: string
 *             example: "PC6Ig6sD"
 *           md5:
 *             type: string
 *             example: "d94aac977512cb2bb005dfa360b40018"
 *           sha1:
 *             type: string
 *             example: "a5ffeb65557693e443e195bdf9c066dca33dc47d"
 *           sha256:
 *             type: string
 *             example: "f9aa851b943d9a8a876062e48b91b9af190a37779df009a20bc268c25ce48a7f"
 *       dob:
 *         type: object
 *         properties:
 *           date:
 *             type: string
 *             example: "1984-09-30T01:20:26Z"
 *           age:
 *             type: number
 *             example: 33
 *       registered:
 *         type: object
 *         properties:
 *           date:
 *             type: string
 *             example: "2008-10-29T02:25:24Z"
 *           age:
 *             type: number
 *             example: 9
 *       contactId:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *             example: "PPS"
 *           value:
 *             type: string
 *             example: "9806982T"
 *       picture:
 *         type: object
 *         properties:
 *           large:
 *             type: string
 *             example: "https://randomuser.me/api/portraits/men/44.jpg"
 *           medium:
 *             type: string
 *             example: "https://randomuser.me/api/portraits/med/men/44.jpg"
 *           thumbnail:
 *             type: string
 *             example: "https://randomuser.me/api/portraits/thumb/men/44.jpg"
 *       gender:
 *         type: string
 *         example: "male"
 *       email:
 *         type: string
 *         example: "carl.jacobs@example.com"
 *       phone:
 *         type: string
 *         example: "031-501-5147"
 *       cell:
 *         type: string
 *         example: "081-090-3541"
 */

/**
 * @swagger
 * /contact:
 *   get:
 *     description: Get contacts
 *     tags: [Contact]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         description: Page number
 *         in: query
 *         type: number
 *         default: 1
 *       - name: count
 *         description: Page size
 *         in: query
 *         type: number
 *         default: 100
 *     responses:
 *       200:
 *         description: Contacts data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     contacts:
 *                       type: array
 *                       items:
 *                         $ref: "#/definitions/Contact"
 *                     totalCount:
 *                       type: number
 */
router.get('/', validatePageCount, getAllContacts);

/**
 * @swagger
 * /contact/{contactId}:
 *   get:
 *     description: Get contact by id
 *     tags: [Contact]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: contactId
 *         description: Contact ID
 *         in: path
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Contacts data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   $ref: "#/definitions/Contact"
 */
router.get(
  '/:contactId',
  [
    param('contactId')
      .trim()
      .isMongoId()
      .withMessage('Please provide a valid contact id!'),
  ],
  getContactById,
);

module.exports = router;
